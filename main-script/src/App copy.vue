<script setup>
import { GM_xmlhttpRequest } from "$";
import { add, debounce } from "lodash";

import xhsIcon from "./assets/xhs-icon.png";
import addImg from "./assets/smile.png";
import { ref } from "vue";

let pageInfo = {};
const allNotes = []; // 记录所有帖子
let allInputText = {}; // 记录所有输入的文案
let allImg = {}; // 记录当前帖子所有添加的图片
let activeCityName = "";
let onloadImageLength = 0; // 已经加载的图片数量，用于加载完毕后再渲染文字和表情
let copedNoteIds = new Set(); // 数据库保存的小红书IDs
let coverImgIndex = 0; // 封面索引
let imgListNum = ref(8); // 获取图片数量限制
let initWidth = 900; // 初始宽高比例：9:16，太长了，改为1400，更符合小红书的图片
let initHeight = 1400;

// 响应式参数
const placeAiList = ref([]);
const showAiContentLoading = ref(false);
const showMenu = ref(true);
const cityLastFix = ref("周边旅游");
const dialogVisible = ref(false);
let downloadType = ref("collage"); // collage拼图 origin原图
const cityList = reactive([
  { city: "佛山", active: false },
  { city: "湛江", active: false },
  { city: "广州", active: false },
  { city: "泉州", active: false },
  { city: "温州", active: false },
  { city: "北京", active: false },
  { city: "南宁", active: false },
  { city: "无锡", active: false },
  { city: "杭州", active: false },
  { city: "石家庄", active: false },
  { city: "大连", active: false },
  { city: "郑州", active: false },
  { city: "长沙", active: false },
  { city: "青岛", active: false },
  { city: "沈阳", active: false },
  { city: "哈尔滨", active: false },
  { city: "贵阳", active: false },
  { city: "上海", active: false },
  { city: "苏州", active: false },
  { city: "重庆", active: false },
  { city: "天津", active: false },
  { city: "济南", active: false },
  { city: "成都", active: false },
  { city: "宁波", active: false },
  { city: "合肥", active: false },
  { city: "西安", active: false },
  { city: "南京", active: false },
  { city: "武汉", active: false },
  { city: "深圳", active: false },
  { city: "东莞", active: false },
  { city: "福州", active: false },
]);
const imgNum = ref(4); // 总共几张图片，包含封面

const initTextLineHeight = ref(0); // 文字行高比例
const initTextLineHeightScale = ref(0.04);

const scaleAddSize = ref(40); // 图标放大尺寸
const initSmileWidth = ref(0); // 马赛克初始大小
const initSmileHeight = ref(0);
const initSmileScale = ref(0.05); // 马赛克占canvas(真实尺寸)的百分比

listenScrollToChangeStyle();
// 监听滚动，重新渲染样式
function listenScrollToChangeStyle() {
  window.addEventListener("scroll", function () {
    changeListStyle();
  });
}

// ============================================== 列表样式和保存已采集
getXHSIds();
// 获取数据库中的小红书ID
function getXHSIds() {
  GM_xmlhttpRequest({
    method: "POST",
    url: "http://60.205.226.243:3003/getXHSIds",
    headers: {
      "Content-Type": "application/json",
    },
    onload: function (response) {
      let res = JSON.parse(response.responseText);
      let ids = res.data.map((item) => item.xhsid);
      copedNoteIds = new Set(ids);
      // 监听请求
      interceptRequest();
    },
  });
}

// 将ID保存到数据库
function addXHSId() {
  // 缓存当前ID，不再显示这个帖子
  let currentUrl = window.location.href;
  let currentUrlArr = currentUrl.split("/");
  let noteId = currentUrlArr[currentUrlArr.length - 1];
  if (noteId.includes("?")) {
    noteId = noteId.split("?")[0];
  }

  if (copedNoteIds.has(noteId)) {
    console.log("已保存");
    return;
  }

  GM_xmlhttpRequest({
    method: "POST",
    url: "http://60.205.226.243:3003/addXHSId",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      xhsid: noteId,
    }),
    onload: function (response) {
      console.log("已保存");
    },
  });
}

// 列表样式修改，标注数量
function changeListStyle() {
  const list = document.querySelectorAll(".note-item");
  list.forEach((item) => {
    // 根据页面元素的id，在所有json元素中，获取当前元素的数据，
    let id = "";
    try {
      id = item.children[0].children[0].href.split("/");
      id = id[id.length - 1];
    } catch (error) {
      id = "";
    }

    allNotes.forEach((item1) => {
      if (id === item1.id) {
        if (item.querySelector("img-count") === null) {
          const countEl = document.createElement("div");
          item1?.note_card?.image_list.length >= imgListNum.value
            ? countEl.setAttribute("class", "img-count")
            : countEl.setAttribute("class", "img-count img-count-default"); // 设置 class 属性
          countEl.textContent = item1?.note_card?.image_list.length; // 使用 textContent 添加文本内容
          item.appendChild(countEl);
        }

        if (item1?.note_card?.image_list.length >= imgListNum.value) {
          item.classList.add("need-item");
        }
      }
    });
  });
}

// 拦截请求
function interceptRequest() {
  const originOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (_, url) {
    // 列表url拦截
    if (url.includes("notes")) {
      this.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          const res = JSON.parse(this.responseText); // 当前 xhr 对象上定义 responseText
          Object.defineProperty(this, "responseText", {
            writable: true,
          });
          const allNeedItems = [];

          res.data.items.forEach((item) => {
            // 去除图片数量不足的
            if (item?.note_card?.image_list?.length >= imgListNum.value) {
              // 去除已经采集过的图片
              if (!copedNoteIds.has(item.id)) {
                allNeedItems.push(item);
                allNotes.push(item);
              } else {
                console.log(item.id + "已经采集过");
              }
            }
          });

          res.data.items = allNeedItems;
          changeListStyle();
          this.responseText = JSON.stringify(res);
        }
      });
    }
    // 详情url拦截-获取帖子详情信息
    if (url.includes("feed")) {
      this.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          const res = JSON.parse(this.responseText); // 当前 xhr 对象上定义 responseText
          Object.defineProperty(this, "responseText", {
            writable: true,
          });
          pageInfo = {};
          pageInfo =
            (res &&
              res.data &&
              res.data.items &&
              res.data.items[0] &&
              res.data.items[0]?.note_card) ||
            {};

          this.responseText = JSON.stringify(res);
        }
      });
    }
    originOpen.apply(this, arguments);
  };
}

// 关闭弹窗
function closeDialog() {
  allInputText = {};
  dialogVisible.value = false;
  showAiContentLoading.value = false;
  showMenu.value = true;
  placeAiList.value = [];
  // 清除点击监听事件
  clearEvents();
}

// ============================================== 图片绘制马赛克相关
// 加载要添加的图片
const overlayImage = new Image();
overlayImage.crossOrigin = "Anonymous";
overlayImage.src = addImg;

// 绘制图片
function createCanvasImg(id) {
  let canvas = document.getElementById(id);
  // 获取canvas上下文对象，可理解为：使用画布的权限
  const ctx = canvas.getContext("2d");

  allImg[id].forEach((item) => {
    doRenderImg(item);
  });

  function doRenderImg(item) {
    // NOTE: 以点击的中心点绘制，但是存储和之前所有计算的点位都是左上角，只是最后绘制的时候偏移一下，这样不会影响计算逻辑，只是展示的时候偏移
    ctx.drawImage(
      overlayImage,
      item.x - item.width / 2,
      item.y - item.height / 2,
      item.width,
      item.height
    );
  }
}

// 清除图片监听事件
function clearEvents() {
  const canvasEls = document.querySelectorAll(".canvas canvas");
  canvasEls.forEach((item) => {
    item.removeEventListener("click", listenEventLeftClick);
    item.removeEventListener("contextmenu", listenEventRightClick);
  });
}
// canvas上添加点击事件
function addImgToCanvasEvent(id) {
  let canvas = null;
  if (id === "cover") {
    canvas = document.getElementById("cover-canvas");
  } else {
    canvas = document.getElementById(`canvas${id}`);
  }

  canvas.addEventListener("click", listenEventLeftClick);
  canvas.addEventListener("contextmenu", listenEventRightClick);
}

// 2. 监听事件具名函数(方便解除监听,同时避免多次监听同一个元素，具名函数可以保证只监听一次)
function listenEventLeftClick(event) {
  const x = event.clientX;
  const y = event.clientY;
  const id = event.target.id;

  // 添加到图片管理器
  imgManage(true, id, x, y);
}
function listenEventRightClick(event) {
  const x = event.clientX;
  const y = event.clientY;
  const id = event.target.id;
  imgManage(false, id, x, y);
  event.preventDefault();
}

// 图片管理器 type:添加 删除, id: canvas的id，xy：标注图片的鼠标点击位置
function imgManage(type, id, x, y) {
  if (!id || !x || !y) {
    return false;
  }

  // 获取鼠标相对于canvas的坐标
  const canvas = document.getElementById(id);
  const rect = canvas.getBoundingClientRect();
  // 应该使用width而不是clientWidth
  const scale = canvas.width / canvas.clientWidth;
  x = x - rect.left;
  y = y - rect.top;
  x = x * scale;
  y = y * scale;

  // 添加
  if (type) {
    // 创建id对应图片
    if (!allImg.hasOwnProperty(id)) {
      allImg[id] = [];
    }

    // 如果已经存在，则放大
    let isExist = false;

    allImg[id].forEach((item) => {
      if (
        x <= item.x + item.width / 2 &&
        x >= item.x - item.width / 2 &&
        y <= item.y + item.height / 2 &&
        y >= item.y - item.height / 2
      ) {
        isExist = true;
        item.width = item.width + parseInt(scaleAddSize.value);
        item.height = item.height + parseInt(scaleAddSize.value);
      }
    });
    if (!isExist) {
      allImg[id].push({
        x,
        y,
        width: initSmileWidth.value,
        height: initSmileHeight.value,
      });
    }
  } else {
    if (allImg.hasOwnProperty(id) && allImg[id].length > 0) {
      allImg[id] = allImg[id].filter((item) => {
        return !(
          x <= item.x + item.width / 2 &&
          x >= item.x - item.width / 2 &&
          y <= item.y + item.height / 2 &&
          y >= item.y - item.height / 2
        );
      });
    }
  }
  debounceDoRender();
}

// 防抖渲染
const debounceDoRender = debounce(function () {
  // 重新渲染图片
  if (downloadType.value === "collage") {
    getCollage(true);
  } else {
    getOriginImg(true);
  }
  // 图片渲染之后再渲染添加的图标
  let timer = setInterval(() => {
    if (onloadImageLength >= imgNum.value) {
      // 图标
      for (let id in allImg) {
        createCanvasImg(id);
      }

      // 文案
      for (let id in allInputText) {
        createCanvasText(id);
      }
      clearInterval(timer);
      timer = null;
    }
  }, 500);
  // 暂定1秒，看是否出错，仍然不加载文字，则加长时间
}, 1000);

// ============================================== 文案管理相关
// 获取文案
function getNoteContent() {
  setTimeout(() => {
    const noteContent = document.querySelector(".note-content");
    const noteNeedContent = document.querySelector(".note-need-content");
    noteNeedContent.innerHTML = noteContent.innerHTML;

    // 去除不需要的内容
    // 暂时不去除标题，里面包含很多需要的信息
    // const titleEl = element.querySelector(".title");
    // if (titleEl) titleEl.remove();
    const bottomContainerEl =
      noteNeedContent.querySelector(".bottom-container");
    if (bottomContainerEl) bottomContainerEl.remove();
    // 去除话题
    const descEl = noteNeedContent.querySelector(".desc");
    const tags = descEl.querySelectorAll(".tag");
    tags.forEach((item) => {
      item.remove();
    });
    // 去除@
    let refers = descEl.querySelectorAll(".note-content-user");
    refers.forEach((item) => {
      item.remove();
    });
  }, 0);
}

// 复制文案
function copyArticle() {
  let element = document.querySelector(".note-need-content");
  // 去除不需要的内容
  const titleEl = element.querySelector(".title");
  titleEl.remove();
  const bottomContainerEl = element.querySelector(".bottom-container");
  bottomContainerEl.remove();
  // 去除话题
  const descEl = element.querySelector(".desc");
  const tags = descEl.querySelectorAll(".tag");
  tags.forEach((item) => {
    item.remove();
  });
  // 去除@
  let refers = descEl.querySelectorAll(".note-content-user");
  refers.forEach((item) => {
    item.remove();
  });

  navigator.clipboard
    .writeText(element.innerText)
    .then(() => {
      console.log("文本已复制到剪贴板");
    })
    .catch((err) => {
      console.error("复制文本失败：", err);
    });
  element.innerHTML = document.querySelector(".note-content").innerHTML;
}

addCopyTextToTextManage();
// 监听复制事件，自动添加文案
function addCopyTextToTextManage() {
  document.addEventListener("copy", function (e) {
    // 自动给1-4张拼图添加文字,原图暂不支持
    if (dialogVisible.value === true && downloadType.value === "collage") {
      let clipboardData = e.clipboardData || window.clipboardData;
      if (!clipboardData) return;
      let text = window.getSelection().toString();
      if (text) {
        e.preventDefault();

        let id = "";
        for (let key in allInputText) {
          id = Number(key);
        }
        if (id === "") {
          id = 0;
        } else {
          id = id + 1;
        }
        if (id >= 0 && id <= 3) {
          textManage(true, id, text);
        }

        // 恢复复制
        clipboardData.setData("text/plain", text);
      }
    }
  });
}

// 文字管理器 type:添加 删除
function textManage(type, id, text = null) {
  // 添加
  if (type) {
    // for (let key in allInputText) {
    //   if (allInputText[key].includes(text)) {
    //     alert("文案重复");
    //     return false;
    //   }
    // }
    if (text === "") {
      return false;
    }
    // 创建id对应文字列表
    if (!allInputText.hasOwnProperty(id)) {
      allInputText[id] = [];
    }
    if (allInputText[id].length === 3) {
      alert("最多添加3个文案");
      return false;
    }
    // 给文字统一添加括号，除了封面的后面两张图
    if (id !== "cover" || text.includes("周边游")) {
      allInputText[id].push("(" + text + ")");
    } else {
      allInputText[id].push(text);
    }
  } else {
    if (allInputText.hasOwnProperty(id) && allInputText[id].length > 0) {
      allInputText[id].pop();
    }
    if (allInputText.hasOwnProperty(id) && allInputText[id].length === 0) {
      delete allInputText[id];
    }
  }

  debounceDoRender();
}

// 自动增加封面图文字
function addCoverText(text) {
  textManage(true, "cover", text);
}

// 增加文字
function createText(id) {
  let input;
  if (id === "cover") {
    input = document.getElementById("cover-input");
  } else {
    input = document.getElementById(`input${id}`);
  }

  const text = input.value;

  textManage(true, id, text);

  input.value = "";
}

// 绘制文字
async function createCanvasText(id) {
  let canvas;
  if (id === "cover") {
    canvas = document.getElementById("cover-canvas");
  } else {
    canvas = document.getElementById(`canvas${id}`);
  }
  // 根据获取文字的基准位置
  let textBaseX = canvas?.width / 2;
  let textBaseY = canvas?.height / 2;

  // 获取canvas上下文对象，可理解为：使用画布的权限
  const ctx = canvas.getContext("2d");
  //先设置文字字体和大小, 必须先设置，才可以读取文字的宽高

  const fontSize = textBaseX * 0.16;
  ctx.font = `italic bold ${fontSize}px 黑体, Hei`;
  ctx.lineWidth = 10; // 设置投影

  const texts = allInputText[id];
  // 所有绘制文字的点位
  const points = [];

  // 根据文案数量为1，2，3分别排布文案的不同位置
  let metrics, x, y, textHeight;
  if (texts.length === 1) {
    metrics = ctx.measureText(texts[0]);
    x =
      textBaseX -
      (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2;
    y = textBaseY;
    points.push({ x, y });
  } else if (texts.length === 2) {
    metrics = ctx.measureText(texts[0]);
    x =
      textBaseX -
      (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2;
    textHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    y = textBaseY - initTextLineHeight.value;
    points.push({ x, y });

    metrics = ctx.measureText(texts[1]);
    x =
      textBaseX -
      (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2;
    textHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    y = textBaseY + initTextLineHeight.value;
    points.push({ x, y });
  } else if (texts.length === 3) {
    metrics = ctx.measureText(texts[0]);
    x =
      textBaseX -
      (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2;
    textHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    y = textBaseY - initTextLineHeight.value * 2;
    points.push({ x, y });

    metrics = ctx.measureText(texts[1]);
    x =
      textBaseX -
      (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2;
    textHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    y = textBaseY;
    points.push({ x, y });

    metrics = ctx.measureText(texts[2]);
    x =
      textBaseX -
      (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2;
    textHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    y = textBaseY + initTextLineHeight.value * 2;
    points.push({ x, y });
  }

  points.forEach((item, index) => {
    doCreateText(ctx, texts[index], item);
  });

  function doCreateText(ctx, text, point) {
    // 设置高度的基准线为中间
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "#000000";
    ctx.strokeText(text, point.x, point.y);
    // ctx.fillStyle = "#ECE474";
    // ()使用不同颜色
    if (text.includes("(") || text.includes(")")) {
      const colorForBrackets = "#FD7933"; // 括号的颜色
      const colorForContent = "#ffffff"; // 括号内文本的颜色

      // 绘制左括号
      ctx.fillStyle = colorForBrackets;
      ctx.fillText("(", point.x, point.y);

      // 计算左括号的宽度
      const bracketWidth = ctx.measureText("(").width;

      // 绘制括号内的文本
      ctx.fillStyle = colorForContent;
      ctx.fillText(
        text.substring(1, text.length - 1),
        point.x + bracketWidth,
        point.y
      );

      // 计算括号内文本的宽度
      const contentWidth = ctx.measureText(
        text.substring(1, text.length - 1)
      ).width;

      // 绘制右括号
      ctx.fillStyle = colorForBrackets;
      ctx.fillText(")", point.x + bracketWidth + contentWidth, point.y);
    } else {
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, point.x, point.y);
    }
  }
}

// ============================================== 获取生成图片相关
// 获取拼图
function getCollage(reRender = false) {
  downloadType.value = "collage";
  getNoteContent();
  if (!reRender) {
    allInputText = {};
    allImg = {};
    coverImgIndex = 0;
    showMenu.value = false;
  }

  // 支持生成几张图片
  imgNum.value = 4;

  // 2.显示弹窗
  dialogVisible.value = true;

  // 3.显示dialog之后，再在canvas内添加图片
  onloadImageLength = 0;
  setTimeout(() => {
    // 生成封面
    createCover();
    // 生成拼图 (暂不去除封面)
    // const needImgList = pageInfo?.image_list.filter((_, index) => {
    //   return index !== coverImgIndex;
    // });
    const needImgList = pageInfo?.image_list;
    createImgs(needImgList);

    // 监听点击事件
    addImgToCanvasEvent("cover");
    for (let i = 0; i < imgNum.value; i++) {
      addImgToCanvasEvent(i);
    }
  }, 0);
}

// 获取原图
function getOriginImg(reRender = false) {
  downloadType.value = "origin";
  getNoteContent();
  if (!reRender) {
    allInputText = {};
    allImg = {};
    coverImgIndex = 0;
    showMenu.value = false;
  }

  // 1.获取canvas数量
  let imageListLength = pageInfo?.image_list?.length || 0;
  imgNum.value = imageListLength - 1; // 去除封面

  // 2.显示弹窗
  dialogVisible.value = true;

  // 3.显示之后，再在canvas内添加图片
  onloadImageLength = 0;

  setTimeout(() => {
    // 生成封面
    createCover();

    // 创建图片(去除封面)
    const needImgList = pageInfo?.image_list.filter((_, index) => {
      return index !== coverImgIndex;
    });

    createOriginImgs(needImgList);

    // 监听点击事件
    addImgToCanvasEvent("cover");
    for (let i = 0; i < imgNum.value; i++) {
      addImgToCanvasEvent(i);
    }
  }, 0);
}

// 生成封面
async function createCover(change = false) {
  const canvas = document.getElementById("cover-canvas");
  const ctx = canvas.getContext("2d");

  if (change) {
    if (coverImgIndex < pageInfo?.image_list?.length - 1) {
      coverImgIndex = coverImgIndex + 1;
    } else {
      coverImgIndex = 0;
    }
  }

  let originImages = pageInfo?.image_list[coverImgIndex].url_default ?? ""; // 原始图片

  let image = await loadImage(originImages);

  // 图片裁剪
  const needImageInfo = calcImgWidthAndHeight(image);
  canvas.width = initWidth;
  canvas.height = initHeight;
  ctx.drawImage(
    image,
    needImageInfo.startX,
    needImageInfo.startY,
    needImageInfo.width,
    needImageInfo.height,
    0,
    0,
    initWidth,
    initHeight
  );

  // 如果是原图模式，需要去除封面的那张图，而拼图则不需要，拼图内可以使用封面
  if (downloadType.value === "origin") {
    // 创建图片(去除封面)
    const needImgList = pageInfo?.image_list.filter((_, index) => {
      return index !== coverImgIndex;
    });

    createOriginImgs(needImgList);
  }

  changeImgStyle();
}

// 生成原图
async function createOriginImgs(allImgList) {
  for (let index = 0; index < allImgList.length; index++) {
    const canvas = document.getElementById("canvas" + index);
    const ctx = canvas.getContext("2d");

    let image = await loadImage(allImgList[index].url_default);

    // 图片裁剪
    const needImageInfo = calcImgWidthAndHeight(image);
    canvas.width = initWidth;
    canvas.height = initHeight;
    ctx.drawImage(
      image,
      needImageInfo.startX,
      needImageInfo.startY,
      needImageInfo.width,
      needImageInfo.height,
      0,
      0,
      initWidth,
      initHeight
    );

    onloadImageLength++;
  }
  // 设置缩放比例
  changeImgStyle();
}

// 生成拼图
async function createImgs(allImgList) {
  const imgNumType = distributeImages(allImgList.length);
  let startIndex = 0;
  imgNumType.forEach((item1, index1) => {
    // 获取当前这张拼图需要的图片
    let needImgs = allImgList.slice(startIndex, startIndex + item1);
    const promises = needImgs.map((item2) => {
      return loadImage(item2.url_default);
    });

    // 等待当前这张拼图的所有图片加载完成
    Promise.all(promises).then((images) => {
      createCollageImg(images, index1);
      onloadImageLength++;
    });
    startIndex = startIndex + item1;
  });
  changeImgStyle();
}

// 创建2，3，4宫格图片
function createCollageImg(imgs, id) {
  const canvas = document.getElementById("canvas" + id);
  const ctx = canvas.getContext("2d");

  // 先设置canvas的宽高
  canvas.width = initWidth * 2;
  canvas.height = initHeight * 2;

  // 4拼
  if (imgs.length === 4) {
    imgs.forEach((item, index) => {
      const needImageInfo = calcImgWidthAndHeight(item);
      let heightIndex = index === 0 || index === 1 ? 0 : 1;
      ctx.drawImage(
        item,
        needImageInfo.startX,
        needImageInfo.startY,
        needImageInfo.width,
        needImageInfo.height,
        (index % 2) * initWidth,
        heightIndex * initHeight,
        initWidth,
        initHeight
      );
    });
    // 3拼
  } else if (imgs.length === 3) {
    let needImageInfo = calcImgWidthAndHeight(imgs[0]);
    ctx.drawImage(
      imgs[0],
      needImageInfo.startX,
      needImageInfo.height * 0.25,
      needImageInfo.width,
      needImageInfo.height * 0.5,
      0,
      0,
      initWidth * 2,
      initHeight
    );
    needImageInfo = calcImgWidthAndHeight(imgs[1]);
    ctx.drawImage(
      imgs[1],
      needImageInfo.startX,
      needImageInfo.startY,
      needImageInfo.width,
      needImageInfo.height,
      0,
      initHeight,
      initWidth,
      initHeight
    );
    needImageInfo = calcImgWidthAndHeight(imgs[2]);
    ctx.drawImage(
      imgs[2],
      needImageInfo.startX,
      needImageInfo.startY,
      needImageInfo.width,
      needImageInfo.height,
      initWidth,
      initHeight,
      initWidth,
      initHeight
    );
    // 2拼
  } else if (imgs.length === 2) {
    let needImageInfo = calcImgWidthAndHeight(imgs[0]);
    ctx.drawImage(
      imgs[0],
      needImageInfo.startX,
      needImageInfo.height * 0.25,
      needImageInfo.width,
      needImageInfo.height * 0.5,
      0,
      0,
      initWidth * 2,
      initHeight
    );
    needImageInfo = calcImgWidthAndHeight(imgs[1]);
    ctx.drawImage(
      imgs[1],
      needImageInfo.startX,
      needImageInfo.height * 0.25,
      needImageInfo.width,
      needImageInfo.height * 0.5,
      0,
      initHeight,
      initWidth * 2,
      initHeight
    );
  }
}

// 根据图片数量(排除首图)生成拼图组合
function distributeImages(totalImages) {
  // 定义可能的图片组合
  const validCombinations = {
    20: [4, 4, 4, 4],
    19: [4, 4, 4, 4],
    18: [4, 4, 4, 4],
    17: [4, 4, 4, 4],
    16: [4, 4, 4, 4],
    15: [4, 4, 4, 3],
    14: [4, 4, 3, 3],
    13: [4, 3, 3, 3],
    12: [4, 3, 3, 2],
    11: [4, 3, 2, 2],
    10: [3, 3, 2, 2],
    9: [3, 2, 2, 2],
    8: [2, 2, 2, 2],
    7: [3, 2, 2],
    6: [2, 2, 2],
    5: [3, 2],
    4: [2, 2],
    3: [3],
    2: [2],
  };
  return validCombinations[totalImages];
}

// 计算拼图图片的起始位置和宽度
function calcImgWidthAndHeight(image) {
  // 保证宽度和高度都要高于initWidth和initHeight，可以放大或者缩小
  // 获取缩放倍数因子，要求缩放后最终宽度和高度都要大于初始宽高
  let scaleWidth = image.width / initWidth;
  let scaleHeight = image.height / initHeight;
  let scale = Math.min(scaleWidth, scaleHeight);
  image.width = image.width / scale;
  image.height = image.height / scale;
  // drawImage使用说明：第一个参数是图片对象，2-5是裁剪图片的qi矩形，6-9是绘制图片的位置
  // 2-5参数先工作，反正先用这4个参数把要裁剪的图片确定，然后再是后面4个参数
  // 后面4个参数再确定绘制的位置和宽高和缩放，如果比确定裁剪的图像大就会缩放
  // 两者是独立的
  return {
    startX: (image.width - initWidth) / 2,
    startY: (image.height - initHeight) / 2,
    width: initWidth * scale,
    height: initHeight * scale,
  };
}

// 加载图片
function loadImage(src) {
  return new Promise((resolve) => {
    let image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = src;
    image.onload = () => resolve(image);
  });
}

// 改变图片预览时的样式
function changeImgStyle() {
  const leftContentEl = document.querySelector(
    ".dialog-content > .left-content"
  );
  const canvasEls = document.querySelectorAll(".canvas canvas");
  const canvasWidth = leftContentEl?.clientWidth - 200;
  const canvasHeight = leftContentEl?.clientHeight;

  canvasEls.forEach((item) => {
    item.style.width = canvasWidth + "px";
  });

  initSmileWidth.value = initSmileHeight.value =
    canvasWidth * initSmileScale.value;

  initTextLineHeight.value = canvasHeight * initTextLineHeightScale.value;

  // 设置右侧操作按钮宽度
  const addTextEls = document.querySelectorAll(".add-text");
  addTextEls.forEach((item, index) => {
    item.style.width = 200 + "px";
  });
}

// ============================================== 下载导出相关
// 导出图片
async function handDownload() {
  addXHSId();

  const canvas1 = document.getElementById("cover-canvas");
  downloadCanvasAsync(canvas1, activeCityName + "-cover.webp");

  for (let i = 0; i < imgNum.value; i++) {
    const canvas = document.getElementById("canvas" + i);
    await downloadCanvasAsync(canvas, activeCityName + "-" + (i + 1) + ".webp");
  }

  // 异步下载图片
  function downloadCanvasAsync(canvasEl, imgName) {
    return new Promise((resolve, reject) => {
      canvasEl.toBlob(
        function (blob) {
          const url = URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = imgName;

          document.body.appendChild(link);

          // 由于是异步，可能需要延迟执行，以确保元素已经添加到文档中
          setTimeout(() => {
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            resolve();
          }, 0);
        },
        "image/webp",
        0.8
      );
    });
  }
}

// 导出txt文件
function handDownloadTxt() {
  let element = document.querySelector(".note-need-content");
  // 去除不需要的内容
  // const titleEl = element.querySelector(".title");
  // if (titleEl) titleEl.remove();

  downloadText(element.innerText);
}

// 导出txt文件AI
function handDownloadTxtAi() {
  let element = document.querySelector(".note-need-content-ai");

  downloadText(element.innerText);
}

// 下载文本文件
function downloadText(textToDownload) {
  // 创建Blob对象
  let blob = new Blob([textToDownload], { type: "text/plain;charset=utf-8" });

  // 创建Object URL
  let url = URL.createObjectURL(blob);

  // 创建一个隐藏的<a>标签
  let downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = activeCityName + ".txt"; // 下载文件的名称

  // 模拟点击<a>标签来触发下载
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // 下载完成后移除<a>标签
  document.body.removeChild(downloadLink);

  // 释放Object URL
  URL.revokeObjectURL(url);
}

// ============================================== 搜索相关
// 自定义搜索
const handleSearch = (value) => {
  const searchEl = document.querySelector("#search-input");
  changeReactInputValue(searchEl, value + cityLastFix.value);
  const searchBtn = document.querySelector(".search-icon");
  triggerClick(searchBtn);
  cityList.forEach((item, index) => {
    item.active = false;
    if (item.city === value) {
      item.active = true;
      activeCityName = item.city;
    }
  });
};

// 触发点击，普通元素是没有click事件的
function triggerClick(el) {
  if (el.click) {
    el.click();
  } else {
    try {
      var evt = document.createEvent("Event");
      evt.initEvent("click", true, true);
      el.dispatchEvent(evt);
    } catch (e) {
      alert(e);
    }
  }
}

// 模拟react input change，直接变更input的value值是不会生效的
function changeReactInputValue(inputDom, newText) {
  let lastValue = inputDom.value;
  inputDom.value = newText;
  let event = new Event("input", { bubbles: true });
  event.simulated = true;
  let tracker = inputDom._valueTracker;
  if (tracker) {
    tracker.setValue(lastValue);
  }
  inputDom.dispatchEvent(event);
}

// ============================================== ai相关功能
// ai识别景点和户外活动
function aiFn() {
  showAiContentLoading.value = true;
  placeAiList.value = [];
  allInputText = {};

  // 获取文案
  let originElement = document.querySelector(".note-need-content");
  let content = originElement.innerText;
  let aiElement = document.querySelector(".note-need-content-ai");

  // content = "你是谁";

  // fastgpt-dia5RGcsjKXfCZO8UQ4SjaixJdnwOXVNqcEgb4Ri3GEv0JXqDder9X1v2mQu9sKQ
  // 从deepseek获取内容改写
  GM_xmlhttpRequest({
    method: "POST",
    url: "https://api.deepseek.com/chat/completions",
    headers: {
      Authorization: "Bearer sk-feec788847764a0ea44e1487a4312a26",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "改写旅游内容，并添加一些emoji",
        },
        {
          role: "user",
          content: content,
        },
      ],
      stream: false,
    }),
    onload: function (response) {
      showAiContentLoading.value = false;
      const result = JSON.parse(response.response);
      console.log(111, result);
      if (result?.choices?.[0]?.message?.content) {
        // 对ai数据进行处理
        let contentStripped = result?.choices?.[0]?.message?.content?.replace(
          /\*\*/g,
          ""
        );
        contentStripped = contentStripped.replace(/- /g, "• ");

        if (contentStripped) {
          aiElement.innerText = contentStripped;
        }
      }
    },
  });

  // 获取城市关键字
  GM_xmlhttpRequest({
    method: "POST",
    url: "https://api.coze.cn/open_api/v2/chat",
    headers: {
      Authorization:
        "Bearer pat_SQEDtuwfbazgIEEcEpUzndPkMeCbJh1eN4Dt7Om8RJ3ReMFHf4tdt2hrDrWtwmEW",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      conversation_id: "",
      bot_id: "7392030733609091123",
      user: "29032201862555",
      stream: false,
      query: content,
    }),
    onload: function (response) {
      const result = JSON.parse(response.response);
      console.log(222, result);
      if (result?.messages?.[0].content) {
        // 对ai数据进行处理
        // let contentStripped = result?.messages?.[0].content.replace(/\n/g, "");
        let contentStripped = result?.messages?.[0].content;

        let completeTxt = JSON.parse(contentStripped);

        if (completeTxt?.key_words) {
          placeAiList.value = completeTxt.key_words;
          // 去除城市名
          placeAiList.value = placeAiList.value.filter((item) => {
            return item !== activeCityName;
          });
          // 关键字添加到图片上
          addCoverText(activeCityName + "周边游");

          // 拼图，封面3行，其它一行
          if (downloadType.value === "collage") {
            let id = 0;
            placeAiList.value.forEach((item, index) => {
              // 添加封面图
              if (item && index >= 0 && index < 2) {
                addCoverText(item);
              }
              // 添加其它图
              if (item && index >= 0 && index < 4) {
                if (id >= 0 && id <= 3) {
                  textManage(true, id, item);
                }
                id = id + 1;
              }
            });
            // 原图，只添加到封面
          } else {
            placeAiList.value.forEach((item, index) => {
              // 添加封面图
              if (item && index >= 0 && index < 2) {
                addCoverText(item);
              }
            });
          }
        }
      }
    },
  });
}
</script>

<template>
  <div class="xhs-menu-container" v-if="showMenu">
    <el-button type="success" @click="getOriginImg(false)">获取原图</el-button>
    <el-button type="danger" @click="getCollage(false)">获取拼图</el-button>
    <el-button type="primary" @click="addXHSId">标记为已下载</el-button>
    <el-input
      class="input"
      v-model="initSmileScale"
      placeholder="请输入马赛克大小缩放比例"
    >
      <template #prepend>笑脸比例</template>
    </el-input>
    <el-input
      class="input"
      v-model="scaleAddSize"
      placeholder="请输入马赛克每次放大像素"
    >
      <template #prepend>每次放大</template>
    </el-input>
    <el-input
      class="input"
      v-model="initTextLineHeightScale"
      placeholder="请输入文案间距缩放比例"
    >
      <template #prepend>文案比例</template>
    </el-input>
    <el-input class="input" v-model="imgListNum" placeholder="请输入图片数量">
      <template #prepend>图片数量</template>
    </el-input>
    <div class="citys">
      <div class="title">自动搜索关键字</div>

      <el-input
        class="input"
        v-model="cityLastFix"
        size="small"
        placeholder="关键词后缀"
      >
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
  <el-dialog
    v-model="dialogVisible"
    title=""
    width="100%"
    :before-close="closeDialog"
    :destroy-on-close="true"
  >
    <div class="dialog-content">
      <div class="left-content">
        <h2 class="canvas-title">图片预览</h2>
        <div class="canvas">
          <div class="canvas-one">
            <canvas id="cover-canvas"></canvas>
            <div class="add-text">
              <input
                id="cover-input"
                type="text"
                placeholder="请输入文案"
                @keyup.enter="createText('cover')"
              />
              <el-button type="primary" @click="createText('cover')"
                >增加文案</el-button
              >
              <el-button type="danger" @click="textManage(false, 'cover')"
                >删除文案</el-button
              >
            </div>
          </div>
          <div class="canvas-one" v-for="(item, index) in imgNum" :key="index">
            <canvas :id="'canvas' + index"></canvas>
            <div class="add-text">
              <input
                type="text"
                placeholder="请输入文案"
                :id="`input${index}`"
                @keyup.enter="createText(index)"
              />
              <el-button type="primary" @click="createText(index)"
                >增加文案</el-button
              >
              <el-button type="danger" @click="textManage(false, index)"
                >删除文案</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="right-content">
        <h2 class="canvas-title">文案区域</h2>
        <div class="content-btns">
          <div class="not-used">
            <el-button type="primary" @click="handDownloadTxt"
              >下载文案(原)</el-button
            >
            <el-button type="success" @click="createCover(true)"
              >切换首图</el-button
            >
            <!-- <el-button type="primary" @click="addXHSId">标记为已下载</el-button> -->
            <el-button type="success" @click="copyArticle">复制文案</el-button>
            <el-button type="primary" @click="getCollage(false)"
              >获取拼图</el-button
            >
            <el-button type="success" @click="getOriginImg(false)"
              >获取原图</el-button
            >
          </div>
          <div class="used">
            <el-button type="primary" @click="aiFn">AI改写生成</el-button>
            <el-button type="success" @click="handDownloadTxtAi"
              >下载文案(AI)</el-button
            >
            <el-button type="primary" @click="handDownload">下载图片</el-button>
            <el-button type="danger" @click="closeDialog">关闭弹窗</el-button>
          </div>
        </div>
        <div class="bottom-content-text">
          <div class="note-need-content" contenteditable="true"></div>
          <div
            class="note-need-content-ai"
            contenteditable="true"
            v-loading="showAiContentLoading"
          >
            请使用AI生成...
          </div>
          <div class="places">
            <span>关键字：</span>
            <span v-if="!placeAiList.length && !showAiContentLoading"
              >请使用AI生成...</span
            >
            <span v-if="showAiContentLoading">识别中...</span>
            <span v-if="placeAiList.length" v-for="item in placeAiList"
              >{{ item }} |
            </span>
            <span v-if="placeAiList.length"
              >length: {{ placeAiList.length }}</span
            >
          </div>
        </div>
      </div>
    </div>
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
  left: 10px;
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
  width: 100vw;
  height: 100vh;
  border-radius: 5px;
  display: flex;
  border: 4px solid red;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;

  .left-content {
    width: 55%;
    height: 100%;

    h2 {
      font-size: 28px;
      text-align: center;
      width: 100%;
      height: 20px;
      line-height: 20px;
    }
    .canvas {
      height: 100%;
      overflow: scroll;
      width: 100%;

      .canvas-one {
        border-top: 4px solid red;
        display: flex;
        justify-content: space-between;

        .add-text {
          min-width: 100px;
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
    width: 45%;
    border-left: 4px solid red;

    h2 {
      font-size: 28px;
      text-align: center;
      width: 100%;
      height: 20px;
      line-height: 20px;
    }

    .content-btns {
      width: 100%;
      height: 100px;
      border-top: 4px solid red;
      padding: 10px 20px;
      border-bottom: 4px solid red;
      .not-used,
      .used {
        height: 40px;
        line-height: 40px;
        .el-button {
          margin-right: 5px;
        }
      }
    }
    .bottom-content-text {
      width: 100%;
      height: calc(100% - 144px);

      .note-need-content {
        width: 100%;
        height: 40%;
        padding: 10px;
        overflow: scroll;
        border-bottom: 4px solid red;
      }
      .note-need-content-ai {
        width: 100%;
        height: 50%;
        padding: 10px;
        overflow: scroll;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        color: var(--color-primary-label);
        white-space: pre-wrap;
        overflow-wrap: break-word;
        // padding-bottom: 20px;
        border-bottom: 4px solid red;
      }
      .places {
        width: 100%;
        height: 10%;
        color: blue;
        padding-left: 10px;
        vertical-align: middle;
      }
    }
  }
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
.note-need-content .desc {
  color: #333 !important;
}
.note-need-content .date {
  color: #666 !important;
}
.note-need-content .tag {
  color: #666 !important;
}
.places {
  font-size: 24px;
  margin: 10px 0px;
  color: blue;
}
</style>
