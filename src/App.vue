<script setup>
import xhsIcon from './assets/xhs-icon.png'
import { ref } from 'vue'

const cityLastFix = ref('周边旅游')
const dialogVisible = ref(false)
let downloadType = ref('collage') // collage拼图 origin原图
const maxImgLength = 4
let minHeight = 10000,
  minWidth = 10000,
  scaleValue = 0.3 // 图片缩放比例
let pageInfo = {}
const allItem = [] // 记录所有帖子
let allInputText = {} // 记录所有输入的文案

// 监听滚动，重新渲染样式
window.addEventListener('scroll', function () {
  changeListStyle()
})

// 监听请求
interceptRequest()

// 获取文案
function getNoteContent() {
  setTimeout(() => {
    const noteContent = document.querySelector('.note-content')
    const noteNeedContent = document.querySelector('.note-need-content')
    noteNeedContent.innerHTML = noteContent.innerHTML
  }, 0)
}

// 复制文案
function copyArticle() {
  let element = document.querySelector('.note-need-content')
  // 去除不需要的内容
  const titleEl = element.querySelector('.title')
  titleEl.remove()
  const bottomContainerEl = element.querySelector('.bottom-container')
  bottomContainerEl.remove()
  // 去除话题
  const descEl = element.querySelector('.desc')
  const tags = descEl.querySelectorAll('.tag')
  tags.forEach(item => {
    item.remove()
  })
  // 去除@
  let refers = descEl.querySelectorAll('.note-content-user')
  refers.forEach(item => {
    item.remove()
  })

  navigator.clipboard
    .writeText(element.innerText)
    .then(() => {
      console.log('文本已复制到剪贴板')
    })
    .catch(err => {
      console.error('复制文本失败：', err)
    })
  element.innerHTML = document.querySelector('.note-content').innerHTML
}

// 改变图片预览时的样式 - 拼图
function changeImgStyle() {
  // 缩小canvas图片显示，不更改原canvas大小
  const leftContentEl = document.querySelector('.dialog-content > .left-content')
  const coverCanvasEl = document.querySelector('#cover-canvas')
  const canvaEls = document.querySelectorAll('.canvas canvas')
  scaleValue = leftContentEl?.clientWidth / (minWidth * 2) - 0.1
  if (downloadType === 'collage') coverCanvasEl.style.zoom = scaleValue
  canvaEls.forEach(item => {
    item.style.zoom = scaleValue
  })
  // 设置右侧操作按钮宽度
  const addTextEls = document.querySelectorAll('.add-text')
  addTextEls.forEach(item => {
    item.style.width = leftContentEl?.clientWidth - minWidth * 2 * scaleValue + 'px'
    item.style.maxWidth = 200 + 'px'
  })
}
// 改变图片预览时的样式 - 原图
function changeOriginImgStyle(i) {
  // 缩小canvas图片显示，不更改原canvas大小
  const leftContentEl = document.querySelector('.dialog-content > .left-content')
  const canvasEls = document.querySelectorAll('.canvas canvas')
  const scaleValue = leftContentEl?.clientWidth / pageInfo.image_list[i].width - 0.2
  canvasEls[i].style.zoom = scaleValue
  // 设置右侧操作按钮宽度
  const addTextEls = document.querySelectorAll('.add-text')
  addTextEls[i].style.width = leftContentEl?.clientWidth - pageInfo.image_list[i].width * scaleValue + 'px'
  addTextEls[i].style.maxWidth = 200 + 'px'
}

// 文字管理器 type:添加 删除
function textManage(type, id, text = null) {
  // 添加
  if (type) {
    // 创建id对应文字列表
    if (!allInputText.hasOwnProperty(id)) {
      allInputText[id] = []
    }
    if (allInputText[id].length === 3) {
      alert('最多添加3个文案')
      return false
    }
    if (text === '') {
      return false
    }
    allInputText[id].push(text)
  } else {
    // 将文字保存
    if (allInputText.hasOwnProperty(id) && allInputText[id].length > 0) {
      allInputText[id].pop()
    }
  }
  // 重新渲染图片
  if (downloadType.value === 'collage') {
    getCollage(true)
  } else {
    getOriginImg(true)
  }
  // 图片渲染之后再渲染文字
  setTimeout(() => {
    for (let id in allInputText) {
      createCanvasText(id)
    }
  }, 1000)
}

// 增加文字
function createText(id) {
  let input
  if (id === 'cover') {
    input = document.getElementById('cover-input')
  } else {
    input = document.getElementById(`input${id}`)
  }

  const text = input.value

  // 添加文字到管理器
  textManage(true, id, text)

  input.value = ''
}
// 绘制文字
function createCanvasText(id) {
  let canvas
  if (id === 'cover') {
    canvas = document.getElementById('cover-canvas')
  } else {
    canvas = document.getElementById(`canvas${id}`)
  }
  // 根据拼图还是原图获取文字的基准位置
  let textBaseX = 0,
    textBaseY = 0
  if (downloadType === 'collage') {
    textBaseX = minWidth
    textBaseY = minHeight
  } else {
    textBaseX = canvas?.clientWidth / 2
    textBaseY = canvas?.clientHeight / 2
  }
  // 获取canvas上下文对象，可理解为：使用画布的权限
  const ctx = canvas.getContext('2d')
  //先设置文字字体和大小, 必须先设置，才可以读取文字的宽高
  const fontSize = textBaseX * 0.16
  ctx.font = `italic bold ${fontSize}px 黑体`
  ctx.lineWidth = 24

  const texts = allInputText[id]
  // 所有绘制文字的点位
  const points = []

  // 根据文案数量为1，2，3分别排布文案的不同位置
  let metrics, x, y, textHeight
  if (texts.length === 1) {
    metrics = ctx.measureText(texts[0])
    x = textBaseX - (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2
    y = textBaseY
    points.push({ x, y })
  } else if (texts.length === 2) {
    metrics = ctx.measureText(texts[0])
    x = textBaseX - (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2
    textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    y = textBaseY - 200
    points.push({ x, y })

    metrics = ctx.measureText(texts[1])
    x = textBaseX - (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2
    textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    y = textBaseY + 200
    points.push({ x, y })
  } else if (texts.length === 3) {
    metrics = ctx.measureText(texts[0])
    x = textBaseX - (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2
    textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    y = textBaseY - 300
    points.push({ x, y })

    metrics = ctx.measureText(texts[1])
    x = textBaseX - (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2
    textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    y = textBaseY
    points.push({ x, y })

    metrics = ctx.measureText(texts[2])
    x = textBaseX - (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2
    textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    y = textBaseY + 300
    points.push({ x, y })
  }

  points.forEach((item, index) => {
    doCreateText(ctx, texts[index], item)
  })

  function doCreateText(ctx, text, point) {
    // 设置高度的基准线为中间
    ctx.textBaseline = 'middle'
    ctx.strokeStyle = '#000000'
    ctx.strokeText(text, point.x, point.y)
    ctx.fillStyle = '#ECE474'
    ctx.fillText(text, point.x, point.y)
  }
}

// 获取拼图
function getCollage(reRender = false) {
  downloadType.value = 'collage'
  getNoteContent()
  if (!reRender) allInputText = {}
  // 1.对图片数量进行随机增加()
  let imageListLength = pageInfo?.image_list?.length || 0

  // 支持生成几张4宫格
  pageInfo.canvasLength = Math.floor(imageListLength / maxImgLength)
  // 最后一张拼图剩余几张原图
  pageInfo.lastCanvasLength = imageListLength % maxImgLength

  // 拼图少于4张，随机增加原图
  if (pageInfo.canvasLength < 4 && imageListLength >= 12 && imageListLength < 16) {
    // 少了4张
    if (pageInfo.lastCanvasLength === 0) {
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list))
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list))
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list))
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list))
      // 少3张
    } else if (pageInfo.lastCanvasLength === 1) {
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list))
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list))
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list))
      // 少2张
    } else if (pageInfo.lastCanvasLength === 2) {
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list))
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list))
      // 少1张
    } else if (pageInfo.lastCanvasLength === 3) {
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list))
    }
  }
  // 重新获取拼图数量
  imageListLength = pageInfo?.image_list?.length || 0
  pageInfo.canvasLength = Math.floor(imageListLength / maxImgLength)

  // 2.显示弹窗
  dialogVisible.value = true

  // 3.显示dialog之后，再在canvas内添加图片
  // TODO: 此处应该裁剪图片，目前采用的是所有图设置为列表中最短的一张宽度，高度为最短的一张高度，两者可以不是一张图
  minWidth = 10000 // 重置最短宽高，否则会使用上一个帖子的最短宽高
  minHeight = 10000
  pageInfo?.image_list?.forEach(item => {
    minWidth = Math.min(minWidth, item.width)
    minHeight = Math.min(minHeight, item.height)
  })

  setTimeout(() => {
    // 生成封面
    createCover()
    // 生成拼图
    for (let i = 0; i < pageInfo.canvasLength; i++) {
      createImgs(i)
    }
    // 获取最低宽高之后，设置缩放比例
    changeImgStyle()
  }, 0)
}

// 获取原图
function getOriginImg(reRender = false) {
  downloadType.value = 'origin'
  getNoteContent()
  if (!reRender) allInputText = {}
  // 1.获取canvas数量
  let imageListLength = pageInfo?.image_list?.length || 0
  pageInfo.canvasLength = imageListLength

  // 2.显示弹窗
  dialogVisible.value = true

  // 3.显示之后，再在canvas内添加图片
  setTimeout(() => {
    for (let i = 0; i < pageInfo.canvasLength; i++) {
      // 创建图片
      createOriginImgs(i)
      // 设置缩放比例
      changeOriginImgStyle(i)
    }
  }, 0)
}

// 生成封面
function createCover() {
  const canvas = document.getElementById('cover-canvas')
  const ctx = canvas.getContext('2d')

  let originImages = pageInfo?.image_list[0].url_default ?? '' // 原始图片

  let image = new Image()
  image.crossOrigin = 'Anonymous'
  image.src = originImages
  image.onload = function () {
    canvas.width = minWidth * 2
    canvas.height = minHeight * 2
    ctx.drawImage(image, 0, 0, minWidth * 2, minHeight * 2)
  }
}

// 生成原图
function createOriginImgs(index) {
  const canvas = document.getElementById('canvas' + index)
  const ctx = canvas.getContext('2d')

  let originImages = pageInfo.image_list ?? [] // 原始图片

  let image = new Image()
  image.crossOrigin = 'Anonymous'
  image.src = originImages[index].url_default
  image.onload = function () {
    canvas.width = originImages[index].width
    canvas.height = originImages[index].height
    ctx.drawImage(image, 0, 0, originImages[index].width, originImages[index].height)
  }
}

// 生成拼图
function createImgs(index) {
  const canvas = document.getElementById('canvas' + index)
  const ctx = canvas.getContext('2d')

  let nowImages = [], // 当前这张生成图片
    loadCount = 0,
    originImages = pageInfo.image_list ?? '' // 原始图片
  for (let i = index * maxImgLength; i < originImages.length; i++) {
    let image = new Image()
    image.crossOrigin = 'Anonymous'
    image.src = originImages[i].url_default
    image.onload = function () {
      loadCount++
      nowImages.push(image)

      // 4宫格
      if (loadCount === maxImgLength) {
        canvas.width = minWidth * 2
        canvas.height = minHeight * 2
        nowImages.forEach((item, index) => {
          let heightIndex = index === 0 || index === 1 ? 0 : 1
          ctx.drawImage(item, (index % 2) * minWidth, heightIndex * minHeight, minWidth, minHeight)
        })
      }
    }

    // 每次生成一张图片，中断循环，下一张图片是新的循环
    if ((i + 1) % maxImgLength === 0 && i !== 0) {
      break
    }
  }
}

// 导出图片
function handDownload() {
  // 清空文字
  if (downloadType.value === 'collage') {
    const canvas1 = document.getElementById('cover-canvas')
    download(canvas1, 'cover.png')
  }
  for (let i = 0; i < pageInfo.canvasLength; i++) {
    const canvas = document.getElementById('canvas' + i)
    download(canvas, i + 1 + '.png')
  }

  function download(canvasEl, imgName) {
    const dataURL = canvasEl.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = dataURL
    link.download = imgName
    link.click()
  }
}
// 关闭弹窗
function closeDialog() {
  allInputText = {}
  dialogVisible.value = false
}

// 列表样式修改，标注数量
function changeListStyle() {
  const list = document.querySelectorAll('.note-item')
  list.forEach(item => {
    // 根据页面元素的id，在所有json元素中，获取当前元素的数据，
    let id = ''
    try {
      id = item.children[0].children[0].href.split('/')
      id = id[id.length - 1]
    } catch (error) {
      id = ''
    }

    allItem.forEach(item1 => {
      if (id === item1.id) {
        if (item.querySelector('img-count') === null) {
          const countEl = document.createElement('div')
          item1?.note_card?.image_list.length >= 12
            ? countEl.setAttribute('class', 'img-count')
            : countEl.setAttribute('class', 'img-count img-count-default') // 设置 class 属性
          countEl.textContent = item1?.note_card?.image_list.length // 使用 textContent 添加文本内容
          item.appendChild(countEl)
        }

        if (item1?.note_card?.image_list.length >= 12) {
          item.classList.add('need-item')
        }
      }
    })
  })
}

// 拦截请求
function interceptRequest() {
  const originOpen = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function (_, url) {
    // 列表url拦截
    if (url.includes('notes')) {
      this.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          const res = JSON.parse(this.responseText) // 当前 xhr 对象上定义 responseText
          Object.defineProperty(this, 'responseText', {
            writable: true,
          })
          res.data.items.forEach(item => {
            allItem.push(item)
          })
          changeListStyle()
          this.responseText = JSON.stringify(res)
        }
      })
    }
    // 详情url拦截
    if (url.includes('feed')) {
      this.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          const res = JSON.parse(this.responseText) // 当前 xhr 对象上定义 responseText
          Object.defineProperty(this, 'responseText', {
            writable: true,
          })
          pageInfo = {}
          pageInfo = (res && res.data && res.data.items[0] && res.data.items[0]?.note_card) || {}

          this.responseText = JSON.stringify(res)
        }
      })
    }
    originOpen.apply(this, arguments)
  }
}

// 自定义搜索
const handleSearch = value => {
  const searchEl = document.querySelector('#search-input')
  changeReactInputValue(searchEl, value + cityLastFix.value)
  const searchBtn = document.querySelector('.search-icon')
  triggerClick(searchBtn)
  cityList.forEach((item, index) => {
    item.active = false
    if (item.city === value) {
      item.active = true
    }
  })
}

// 触发点击，普通元素是没有click事件的
function triggerClick(el) {
  if (el.click) {
    el.click()
  } else {
    try {
      var evt = document.createEvent('Event')
      evt.initEvent('click', true, true)
      el.dispatchEvent(evt)
    } catch (e) {
      alert(e)
    }
  }
}

// 模拟react input change，直接变更input的value值是不会生效的
function changeReactInputValue(inputDom, newText) {
  let lastValue = inputDom.value
  inputDom.value = newText
  let event = new Event('input', { bubbles: true })
  event.simulated = true
  let tracker = inputDom._valueTracker
  if (tracker) {
    tracker.setValue(lastValue)
  }
  inputDom.dispatchEvent(event)
}

// 城市列表
const cityList = reactive([
  { city: '佛山', active: false },
  { city: '湛江', active: false },
  { city: '广州', active: false },
  { city: '泉州', active: false },
  { city: '温州', active: false },
  { city: '北京', active: false },
  { city: '南宁', active: false },
  { city: '无锡', active: false },
  { city: '杭州', active: false },
  { city: '石家庄', active: false },
  { city: '大连', active: false },
  { city: '郑州', active: false },
  { city: '长沙', active: false },
  { city: '青岛', active: false },
  { city: '沈阳', active: false },
  { city: '哈尔滨', active: false },
  { city: '贵阳', active: false },
  { city: '上海', active: false },
  { city: '苏州', active: false },
  { city: '重庆', active: false },
  { city: '天津', active: false },
  { city: '济南', active: false },
  { city: '成都', active: false },
  { city: '宁波', active: false },
  { city: '合肥', active: false },
  { city: '西安', active: false },
  { city: '南京', active: false },
  { city: '武汉', active: false },
  { city: '深圳', active: false },
  { city: '东莞', active: false },
  { city: '福州', active: false },
])

// 获取数组随机元素
function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}
</script>

<template>
  <div class="xhs-menu-container">
    <el-button type="danger" @click="getCollage(false)">获取拼图</el-button>
    <el-button type="danger" @click="getOriginImg(false)">获取原图</el-button>
    <div class="citys">
      <div class="title">自动搜索关键字</div>

      <el-input class="input" v-model="cityLastFix" size="small" placeholder="关键词后缀">
        <template #prepend>后缀</template>
      </el-input>

      <div
        class="city-one"
        :class="item.active ? 'active-city-one' : ''"
        v-for="item in cityList"
        :key="item.city"
        @click="handleSearch(item.city)"
      >
        {{ item.city }}
      </div>
    </div>
    <div class="bottom">
      <img :src="xhsIcon" alt="" />
      <span>XHS-Download-Plus</span>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="" width="98%" :before-close="closeDialog">
    <div class="dialog-content">
      <div class="left-content">
        <h2 class="canvas-title">图片预览</h2>
        <div class="canvas">
          <div v-if="downloadType === 'collage'" class="canvas-one">
            <canvas id="cover-canvas"></canvas>
            <div class="add-text">
              <input id="cover-input" type="text" placeholder="请输入文案" @keyup.enter="createText('cover')" />
              <el-button type="primary" @click="createText('cover')">增加文案</el-button>
              <el-button type="danger" @click="textManage(false, 'cover')">删除文案</el-button>
            </div>
          </div>
          <div class="canvas-one" v-for="(item, index) in pageInfo.canvasLength" :key="index">
            <canvas :id="'canvas' + index"></canvas>
            <div class="add-text">
              <input type="text" placeholder="请输入文案" :id="`input${index}`" @keyup.enter="createText(index)" />
              <el-button type="primary" @click="createText(index)">增加文案</el-button>
              <el-button type="danger" @click="textManage(false, index)">删除文案</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="right-content">
        <h2 class="canvas-title">文案区域</h2>
        <div class="outer-need-content">
          <div class="content-btns">
            <el-button type="success" @click="copyArticle">复制文案</el-button>
            <el-button type="primary" @click="closeDialog">关闭弹窗</el-button>
          </div>
          <div class="note-need-content"></div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="handDownload">全部下载</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.xhs-menu-container {
  width: 210px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  position: fixed;
  bottom: 15%;
  background-color: #fff;
  color: #2f3542;
  padding: 10px 10px;

  border-radius: 0 32px 32px 0;
  box-shadow: 0 3.2px 12px #00000014, 0 5px 24px #0000000a;
  text-align: center;
  font-size: 14px;
  z-index: 99999;

  .el-button {
    width: 98%;
    margin-bottom: 3px;
  }
  .el-button + .el-button {
    margin-left: 0px;
  }

  .citys {
    width: 98%;
    border: 2px solid red;
    border-radius: 5px;
    margin: 5px 0;
    padding: 5px;
    text-align: left;

    .title {
      font-weight: 700;
      font-size: 14px;
    }
    .input {
      margin: 5px 0;
    }

    .city-one {
      width: 31%;
      border: 1px solid #eee;
      border-radius: 5px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin: 2px 2px;
      font-size: 12px;
      padding: 2px;
    }
    .city-one:hover {
      background-color: #f56c6d;
      color: #fff;
    }
    .active-city-one {
      background-color: #f56c6d;
      color: #fff;
    }
  }

  .bottom {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 5px;
    }
    span {
      font-size: 16px;
      font-weight: 700;
    }
  }
}
.dialog-content {
  margin-left: 210px;
  width: calc(100% - 210px);
  border-radius: 5px;
  display: flex;
  border: 4px solid red;

  .left-content {
    width: 60%;

    h2 {
      font-size: 28px;
      text-align: center;
    }
    .canvas {
      .canvas-one {
        border-top: 4px solid red;
        display: flex;
        justify-content: space-between;

        .add-text {
          min-width: 120px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          input {
            border: 2px solid red;
            width: 90%;
            height: 36px;
            border-radius: 5px;
            padding-left: 10px;
          }
          input::placeholder {
            // padding-left: 5px;
          }
          .el-button--danger {
            margin-left: 0px !important;
            width: 90%;
          }
          .el-button--primary {
            margin: 10px 0;
            width: 90%;
          }
        }
      }
    }
  }
  .right-content {
    width: 40%;
    border-left: 4px solid red;

    h2 {
      font-size: 28px;
      text-align: center;
    }
  }
}
.outer-need-content {
  padding: 20px;
  padding-top: 20px;
  position: sticky;
  top: 0;
}

.content-btns {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}
</style>
<style>
.need-item {
  border: 4px solid red;
  overflow: hidden;
}
.img-count {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 3px;
  right: 3px;
  border-radius: 50%;
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #fff;
  font-weight: 700;
}
.img-count-default {
  background: #aaa;
}
.note-need-content .note-content-emoji {
  width: 16px;
  height: 16px;
}
</style>
