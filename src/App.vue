<script setup>
import { GM_xmlhttpRequest } from "$";
import { debounce } from "lodash";

import xhsIcon from "./assets/xhs-icon.png";
import addImg from "./assets/smile.png";
import { ref } from "vue";

const cityLastFix = ref("周边旅游");
const dialogVisible = ref(false);
let downloadType = ref("collage"); // collage拼图 origin原图
const maxImgLength = 4; // 拼图数量
let minHeight = 10000,
  minWidth = 10000,
  scaleValue = 0.3, // 图片缩放比例
  scaleAddSize = 50, // 图标放大尺寸
  initSmileWidth = 150, // 马赛克初始高度
  initSmileHeight = 150;
let pageInfo = {};
const allNotes = []; // 记录所有帖子
let allInputText = {}; // 记录所有输入的文案
let allImg = {}; // 记录当前帖子所有添加的图片
let activeCityName = "";
let onloadImageLength = 0; // 已经加载的图片数量
let copedNoteIds = new Set(); // 数据库保存的小红书IDs
let coverImgIndex = 0; // 封面索引

// 监听滚动，重新渲染样式
window.addEventListener("scroll", function () {
  changeListStyle();
});

// 监听复制事件，自动添加文案
addCopyTextToTextManage();

// 获取数据库保存的小红书IDs
getXHSIds();

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
function clearEvents() {
  // 清除图片监听事件
  const canvasEls = document.querySelectorAll(".canvas canvas");
  canvasEls.forEach((item) => {
    item.removeEventListener("click", listenEventLeftClick);
    item.removeEventListener("contextmenu", listenEventRightClick);
  });
}
// 1. canvas上添加点击事件
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

// TODO: 关闭窗口时解除监听，包含拼图原图

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
        item.width = item.width + scaleAddSize;
        item.height = item.height + scaleAddSize;
      }
    });
    if (!isExist) {
      allImg[id].push({ x, y, width: initSmileWidth, height: initSmileHeight });
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

  // 防抖
  const debounceDoRender = debounce(function () {
    // 重新渲染图片
    if (downloadType.value === "collage") {
      getCollage(true);
    } else {
      getOriginImg(true);
    }
    // 图片渲染之后再渲染添加的图标
    let timer = setInterval(() => {
      if (onloadImageLength >= pageInfo.canvasLength) {
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
  debounceDoRender();
}

// 获取文案
function getNoteContent() {
  setTimeout(() => {
    const noteContent = document.querySelector(".note-content");
    const noteNeedContent = document.querySelector(".note-need-content");
    noteNeedContent.innerHTML = noteContent.innerHTML;
  }, 0);
}

// 切换首图
function changeIndexImg() {
  if (downloadType.value === "collage") {
    createCover(true);
  } else {
    createOriginImgs(0, true);
  }
}

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

// 改变图片预览时的样式 - 拼图
function changeImgStyle() {
  const leftContentEl = document.querySelector(
    ".dialog-content > .left-content"
  );
  const canvasEls = document.querySelectorAll(".canvas canvas");
  const canvasWidth = leftContentEl?.clientWidth - 200;
  scaleValue = canvasWidth / (minWidth * 2);

  canvasEls.forEach((item) => {
    item.style.width = canvasWidth + "px";
    item.style.height = scaleValue * minHeight * 2 + "px";
  });
  // 设置右侧操作按钮宽度
  const addTextEls = document.querySelectorAll(".add-text");
  addTextEls.forEach((item) => {
    item.style.width = 200 + "px";
  });
}
// 改变图片预览时的样式 - 原图
function changeOriginImgStyle(i) {
  const leftContentEl = document.querySelector(
    ".dialog-content > .left-content"
  );
  const canvasEls = document.querySelectorAll(".canvas canvas");
  const canvasWidth = leftContentEl?.clientWidth - 200;
  scaleValue = canvasWidth / (minWidth * 2);
  canvasEls[i].style.width = canvasWidth + "px";
  canvasEls[i].style.height = scaleValue * minHeight * 2 + "px";

  // 设置右侧操作按钮宽度
  const addTextEls = document.querySelectorAll(".add-text");
  addTextEls[i].style.width = 200 + "px";
}

// 文字管理器 type:添加 删除
function textManage(type, id, text = null) {
  // 添加
  if (type) {
    for (let key in allInputText) {
      if (allInputText[key].includes(text)) {
        alert("文案重复");
        return false;
      }
    }
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
    allInputText[id].push(text);
  } else {
    // 将文字保存
    if (allInputText.hasOwnProperty(id) && allInputText[id].length > 0) {
      allInputText[id].pop();
    }
    if (allInputText.hasOwnProperty(id) && allInputText[id].length === 0) {
      delete allInputText[id];
    }
  }

  // 防抖
  const debounceDoRender = debounce(function () {
    // 重新渲染图片
    if (downloadType.value === "collage") {
      getCollage(true);
    } else {
      getOriginImg(true);
    }
    // 图片渲染之后再渲染文字
    let timer = setInterval(() => {
      if (onloadImageLength >= pageInfo.canvasLength) {
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
  debounceDoRender();
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

  // 添加文字到管理器
  textManage(true, id, text);

  input.value = "";
}
// 绘制文字
function createCanvasText(id) {
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
  ctx.font = `italic bold ${fontSize}px 黑体`;
  ctx.lineWidth = 24;

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
    y = textBaseY - 200;
    points.push({ x, y });

    metrics = ctx.measureText(texts[1]);
    x =
      textBaseX -
      (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2;
    textHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    y = textBaseY + 200;
    points.push({ x, y });
  } else if (texts.length === 3) {
    metrics = ctx.measureText(texts[0]);
    x =
      textBaseX -
      (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2;
    textHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    y = textBaseY - 300;
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
    y = textBaseY + 300;
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
    ctx.fillStyle = "#ECE474";
    ctx.fillText(text, point.x, point.y);
  }
}

// 获取拼图
function getCollage(reRender = false) {
  downloadType.value = "collage";
  getNoteContent();
  if (!reRender) {
    allInputText = {};
    allImg = {};
    coverImgIndex = 0;
  }
  // 1.对图片数量进行随机增加()
  let imageListLength = pageInfo?.image_list?.length || 0;

  // 支持生成几张4宫格
  pageInfo.canvasLength = Math.floor(imageListLength / maxImgLength);
  // 最后一张拼图剩余几张原图
  pageInfo.lastCanvasLength = imageListLength % maxImgLength;

  // 拼图少于4张，随机增加原图
  if (
    pageInfo.canvasLength < 4 &&
    imageListLength >= 12 &&
    imageListLength < 16
  ) {
    // 少了4张
    if (pageInfo.lastCanvasLength === 0) {
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list));
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list));
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list));
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list));
      // 少3张
    } else if (pageInfo.lastCanvasLength === 1) {
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list));
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list));
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list));
      // 少2张
    } else if (pageInfo.lastCanvasLength === 2) {
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list));
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list));
      // 少1张
    } else if (pageInfo.lastCanvasLength === 3) {
      pageInfo.image_list.push(getRandomElement(pageInfo.image_list));
    }
  }
  // 重新获取拼图数量
  imageListLength = pageInfo?.image_list?.length || 0;
  pageInfo.canvasLength = Math.floor(imageListLength / maxImgLength);

  // 2.显示弹窗
  dialogVisible.value = true;

  // 3.显示dialog之后，再在canvas内添加图片
  // TODO: 此处应该裁剪图片，目前采用的是所有图设置为列表中最短的一张宽度，高度为最短的一张高度，两者可以不是一张图
  minWidth = 10000; // 重置最短宽高，否则会使用上一个帖子的最短宽高
  minHeight = 10000;
  pageInfo?.image_list?.forEach((item) => {
    minWidth = Math.min(minWidth, item.width);
    minHeight = Math.min(minHeight, item.height);
  });
  onloadImageLength = 0;
  setTimeout(() => {
    // 生成封面
    createCover();
    // 生成拼图
    for (let i = 0; i < pageInfo.canvasLength; i++) {
      createImgs(i);
    }
    // 监听点击事件
    addImgToCanvasEvent("cover");
    for (let i = 0; i < pageInfo.canvasLength; i++) {
      addImgToCanvasEvent(i);
    }
    // 获取最低宽高之后，设置缩放比例
    changeImgStyle();
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
  }
  // 1.获取canvas数量
  let imageListLength = pageInfo?.image_list?.length || 0;
  pageInfo.canvasLength = imageListLength;

  // 2.显示弹窗
  dialogVisible.value = true;

  // 3.显示之后，再在canvas内添加图片
  minWidth = 10000; // 重置最短宽高，否则会使用上一个帖子的最短宽高
  minHeight = 10000;
  pageInfo?.image_list?.forEach((item) => {
    minWidth = Math.min(minWidth, item.width);
    minHeight = Math.min(minHeight, item.height);
  });

  onloadImageLength = 0;
  setTimeout(() => {
    for (let i = 0; i < pageInfo.canvasLength; i++) {
      // 创建图片
      createOriginImgs(i);
      // 监听点击事件
      for (let i = 0; i < pageInfo.canvasLength; i++) {
        addImgToCanvasEvent(i);
      }
      // 设置缩放比例
      changeOriginImgStyle(i);
    }
  }, 0);
}

// 生成封面
function createCover(changeIndexImg = false) {
  const canvas = document.getElementById("cover-canvas");
  const ctx = canvas.getContext("2d");

  if (changeIndexImg) {
    let randomIndex = Math.floor(Math.random() * pageInfo?.image_list?.length);
    randomIndex = randomIndex + 1;
    coverImgIndex = randomIndex;
  }

  let originImages = pageInfo?.image_list[coverImgIndex].url_default ?? ""; // 原始图片

  let image = new Image();
  image.crossOrigin = "Anonymous";
  image.src = originImages;
  image.onload = function () {
    if (!changeIndexImg) onloadImageLength++;
    // 此处仍然使用原本的宽度，是为了图片的分辨率，生成图片之后再缩小
    canvas.width = minWidth * 2;
    canvas.height = minHeight * 2;
    ctx.drawImage(image, 0, 0, minWidth * 2, minHeight * 2);
  };
}

// 生成原图
function createOriginImgs(index, changeIndexImg = false) {
  const canvas = document.getElementById("canvas" + index);
  const ctx = canvas.getContext("2d");

  let originImages = pageInfo.image_list ?? []; // 原始图片

  let image = new Image();
  image.crossOrigin = "Anonymous";
  if (changeIndexImg) {
    let randomIndex = Math.floor(Math.random() * pageInfo?.image_list?.length);
    coverImgIndex = randomIndex + 1;
  }

  // 封面使用外部变量
  if (index === 0) {
    image.src = originImages[coverImgIndex].url_default;
  } else {
    image.src = originImages[index].url_default;
  }

  image.onload = function () {
    if (!changeIndexImg) onloadImageLength++;
    canvas.width = originImages[index].width;
    canvas.height = originImages[index].height;
    ctx.drawImage(
      image,
      0,
      0,
      originImages[index].width,
      originImages[index].height
    );
  };
}

// 生成拼图
function createImgs(index) {
  const canvas = document.getElementById("canvas" + index);
  const ctx = canvas.getContext("2d");

  let nowImages = [], // 当前这张生成图片
    loadCount = 0,
    originImages = pageInfo.image_list ?? ""; // 原始图片

  for (let i = index * maxImgLength; i < originImages.length; i++) {
    let image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = originImages[i].url_default;
    nowImages.push(image);
    image.onload = function () {
      loadCount++;

      // 4宫格
      if (loadCount === maxImgLength) {
        onloadImageLength++;
        canvas.width = minWidth * 2;
        canvas.height = minHeight * 2;
        nowImages.forEach((item, index) => {
          let heightIndex = index === 0 || index === 1 ? 0 : 1;
          ctx.drawImage(
            item,
            (index % 2) * minWidth,
            heightIndex * minHeight,
            minWidth,
            minHeight
          );
        });
      }
    };

    // 每次生成一张图片，中断循环，下一张图片是新的循环
    if ((i + 1) % maxImgLength === 0 && i !== 0) {
      break;
    }
  }
}

// 导出图片
function handDownload() {
  addXHSId();
  // 清空文字
  if (downloadType.value === "collage") {
    const canvas1 = document.getElementById("cover-canvas");
    downloadCanvasAsync(canvas1, activeCityName + "-cover.webp");
  }
  for (let i = 0; i < pageInfo.canvasLength; i++) {
    const canvas = document.getElementById("canvas" + i);
    downloadCanvasAsync(canvas, activeCityName + "-" + (i + 1) + ".webp");
  }

  // 异步下载图片
  function downloadCanvasAsync(canvasEl, imgName) {
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
        }, 100);
      },
      "image/webp",
      0.8
    );
  }
}

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
// 导出txt文件
function handDownloadTxt() {
  let element = document.querySelector(".note-need-content");
  // 去除不需要的内容
  const titleEl = element.querySelector(".title");
  if (titleEl) titleEl.remove();
  const bottomContainerEl = element.querySelector(".bottom-container");
  if (bottomContainerEl) bottomContainerEl.remove();
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

  downloadText(element.innerText);

  element.innerHTML = document.querySelector(".note-content").innerHTML;

  function downloadText(textToDownload) {
    // 创建Blob对象
    let blob = new Blob([textToDownload], { type: "text/plain;charset=utf-8" });

    // 创建Object URL
    let url = URL.createObjectURL(blob);

    // 创建一个隐藏的<a>标签
    let downloadLink = document.createElement("a");
    downloadLink.href = url;
    console.log(activeCityName);
    downloadLink.download = activeCityName + ".txt"; // 下载文件的名称

    // 模拟点击<a>标签来触发下载
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // 下载完成后移除<a>标签
    document.body.removeChild(downloadLink);

    // 释放Object URL
    URL.revokeObjectURL(url);
  }
}
// 关闭弹窗
function closeDialog() {
  allInputText = {};
  dialogVisible.value = false;
  // 清除点击监听事件
  clearEvents();
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
          item1?.note_card?.image_list.length >= 12
            ? countEl.setAttribute("class", "img-count")
            : countEl.setAttribute("class", "img-count img-count-default"); // 设置 class 属性
          countEl.textContent = item1?.note_card?.image_list.length; // 使用 textContent 添加文本内容
          item.appendChild(countEl);
        }

        if (item1?.note_card?.image_list.length >= 12) {
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
            // 去除图片数量不足12
            if (item?.note_card?.image_list?.length >= 12) {
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

// 城市列表
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

// 获取数组随机元素
function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
</script>

<template>
  <div class="xhs-menu-container">
    <el-button type="danger" @click="getCollage(false)">获取拼图</el-button>
    <el-button type="danger" @click="getOriginImg(false)">获取原图</el-button>
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
    width="98%"
    :before-close="closeDialog"
    :destroy-on-close="true"
  >
    <div class="dialog-content">
      <div class="left-content">
        <h2 class="canvas-title">图片预览</h2>
        <div class="canvas">
          <div v-if="downloadType === 'collage'" class="canvas-one">
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
          <div
            class="canvas-one"
            v-for="(item, index) in pageInfo.canvasLength"
            :key="index"
          >
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
        <div class="outer-need-content">
          <div class="content-btns">
            <el-button type="success" @click="handDownloadTxt"
              >下载文案</el-button
            >
            <el-button type="primary" @click="handDownload">下载图片</el-button>
            <el-button type="success" @click="copyArticle">复制文案</el-button>
            <el-button type="success" @click="changeIndexImg"
              >切换首图</el-button
            >
            <el-button type="primary" @click="closeDialog">关闭弹窗</el-button>
            <el-button type="primary" @click="addXHSId">标记为已下载</el-button>
          </div>
          <div class="note-need-content"></div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="success" @click="handDownloadTxt">下载文案</el-button>
        <el-button type="primary" @click="handDownload">下载图片</el-button>
        <el-button type="success" @click="copyArticle">复制文案</el-button>
        <el-button type="success" @click="changeIndexImg">切换首图</el-button>
        <el-button type="primary" @click="closeDialog">关闭弹窗</el-button>
        <el-button type="primary" @click="addXHSId">标记为已下载</el-button>
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
.note-need-content .desc {
  color: #333 !important;
}
.note-need-content .date {
  color: #666 !important;
}
.note-need-content .tag {
  color: #666 !important;
}
</style>
