<script setup>
import { unsafeWindow, GM_xmlhttpRequest, GM_getResourceURL, GM_addValueChangeListener, GM_setValue, GM_getValue, GM_openInTab } from '$'
import { ref, h, nextTick, onMounted } from 'vue'

const drawer = ref(false)
const selectedImages = ref([])
const images = ref([])
const all_selected = ref(false)
const isIndeterminate = ref(false)
const all_selected_label = ref('全选')

// ========================================== 公用方法 ===========================================
// 自定义post
function my_post(url, data, headers = null) {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'POST',
      url: url,
      headers: headers
        ? headers
        : {
          'Content-Type': 'application/json'
        },
      data: JSON.stringify(data),
      onload: function (response) {
        if (response.status === 200) {
          console.log("my_post请求发送成功:", response.responseText)
          resolve(JSON.parse(response.responseText))
        } else {
          reject(new Error(`Failed to fetch image: ${response.statusText}`))
        }
      },
      onerror: function (error) {
        reject(new Error(`Network error: ${error}`))
      },
    })
  })
}

// ============================================================== 无水印下载功能实现 ================================================================================
let currentUrl = window.location.href;
// 获取最新的当前地址
const get_newest_url = () => {
  let observer

  observer = new MutationObserver(function () {
    if (currentUrl !== window.location.href) {
      currentUrl = window.location.href;
    }
  });
  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);
}
get_newest_url();

// 创建无水印视频下载地址
const generateVideoUrl = note => {
  try {
    return [`https://sns-video-bd.xhscdn.com/${note.video.consumer.originVideoKey}`];
  } catch (error) {
    console.error("Error generating video URL:", error);
    return [];
  }
};

// 创建无水印图片下载地址
const generateImageUrl = note => {
  let images = note.imageList;
  const regex = /http:\/\/sns-webpic-qc\.xhscdn.com\/\d+\/[0-9a-z]+\/(\S+)!/;
  let urls = [];
  try {
    images.forEach((item) => {
      let match = item.urlDefault.match(regex);
      if (match && match[1]) {
        urls.push(`https://ci.xiaohongshu.com/${match[1]}?imageView2/format/webp`);
      }
    })
    return urls
  } catch (error) {
    console.error("Error generating image URLs:", error);
    return [];
  }
};

// 下载无水印失败
const abnormal = () => {
  alert("下载无水印作品文件失败！");
};

// 下载预处理2 - 获取文件名
const download = async (urls, type_) => {
  const name = extractName();
  console.info(`基础文件名称 ${name}`);
  if (type_ === "video") {
    await downloadVideo(urls[0], name);
  } else {
    await downloadImage(urls, name);
  }
};

// 下载预处理1 - 获取url
const exploreDeal = async note => {
  try {
    let links;
    if (note.type === "normal") {
      links = generateImageUrl(note);
      images.value = links;
      drawer.value = true;
      selectedImages.value = links;
      all_selected.value = true;
      handleCheckAllChange(true);
      return
    } else {
      links = generateVideoUrl(note);
    }
    if (links.length > 0) {
      console.info("无水印文件下载链接", links);
      await download(links, note.type);
    } else {
      abnormal()
    }
  } catch (error) {
    console.error("Error in deal function:", error);
    abnormal();
  }
};

// 从url中提取作品信息
const extractNoteInfo = () => {
  const regex = /\/explore\/([^?]+)/;
  const match = currentUrl.match(regex);
  if (match) {
    // unsafeWindow 是一个全局对象，它允许我们访问浏览器环境中的各种属性和方法，默认油猴脚本是在沙箱环境中，无法直接访问浏览器环境中的全局对象，因此需要使用 unsafeWindow 来访问这些对象。
    return unsafeWindow.__INITIAL_STATE__.note.noteDetailMap[match[1]]
  } else {
    console.error("从链接提取作品 ID 失败", currentUrl,);
  }
};

// 解析下载链接
const extractDownloadLinks = async () => {
  if (currentUrl.includes("https://www.xiaohongshu.com/explore/")) {
    let note = extractNoteInfo();
    if (note.note) {
      await exploreDeal(note.note);
    } else {
      abnormal();
    }
  }
};

// 具体下载方法 模拟点击下载
const downloadFile = async (link, filename) => {
  try {
    // 使用 fetch 获取文件数据
    let response = await fetch(link, {
      method: "GET",
    });

    // 检查响应状态码
    if (!response.ok) {
      console.error(`请求失败，状态码: ${response.status}`, response.status);
      return false
    }

    let blob = await response.blob();

    // 创建 Blob 对象的 URL
    let blobUrl = window.URL.createObjectURL(blob);

    // 创建一个临时链接元素
    let tempLink = document.createElement('a');
    tempLink.href = blobUrl;
    tempLink.download = filename;

    // 模拟点击链接
    tempLink.click();

    // 清理临时链接元素
    window.URL.revokeObjectURL(blobUrl);

    return true
  } catch (error) {
    console.error(`下载失败 (${filename}):`, error);
    return false
  }
}

// 解析文件名
const extractName = () => {
  let name = document.title.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "");
  let match = currentUrl.match(/\/([^\/]+)$/);
  let id = match ? match[1] : null;
  return name === "" ? id : name
};

// 下载无水印视频
const downloadVideo = async (url, name) => {
  if (!await downloadFile(url, `${name}.mp4`)) {
    abnormal();
  }
};

// 下载无水印图片
const downloadImage = async (urls, name) => {
  let result = [];
  for (const [index, url] of urls.entries()) {
    result.push(await downloadFile(url, `${name}_${index + 1}.webp`));
  }
  if (!result.every(item => item === true)) {
    abnormal();
  }
};
// ========================================== 其他功能 ===========================================
// 删除下载目录
async function delete_download_dir() {
  await my_post(import.meta.env.VITE_API_URL + '/delete_download')
}
// 全选
function handleCheckAllChange(val) {
  selectedImages.value = val ? images.value : [];
  isIndeterminate.value = false;
  all_selected_label.value = val ? "全选(" + images.value.length + ")" : "全选";
}
// 选中变化
function handleCheckedChange(value) {
  const checkedCount = value.length;
  all_selected.value = checkedCount === images.value.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < images.value.length;

  all_selected_label.value = selectedImages.value.length > 0 ? "全选(" + selectedImages.value.length + ")" : "全选"

}
</script>

<template>
  <div class="xhs-download-container">
    <el-button type="danger" @click="extractDownloadLinks()">无水印下载</el-button>
  </div>
  <el-drawer title="图片预览与下载" v-model="drawer" direction="rtl" size="50%">
    <el-checkbox-group v-model="selectedImages" @change="handleCheckedChange">
      <div class="img-list">

        <el-checkbox :label="image" v-for="(image, index) in images" :key="index">
          <div class="item">
            <img :src="image" alt="预览图片" />
          </div>
        </el-checkbox>

      </div>
    </el-checkbox-group>
    <template #footer>
      <div class="btns">
        <el-checkbox v-model="all_selected" :indeterminate="isIndeterminate" :label="all_selected_label" size="default"
          border @change="handleCheckAllChange" style="margin-right: 10px;" />
        <el-button type="danger" @click="delete_download_dir">清空下载目录</el-button>
        <el-button type="primary" @click="download(selectedImages, 'normal')">下载资源</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="less">
.xhs-download-container {
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  position: fixed;
  left: 0%;
  top: 300px;
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

  .el-button+.el-button {
    margin-left: 0px;
  }
}
</style>
<style>
.img-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: #eee
}

.img-list .el-checkbox {
  position: relative;
  width: 100%;
  height: 100%
}

.img-list .el-checkbox .el-checkbox__input {
  position: absolute;
  top: 0;
  left: 0
}

.img-list .el-checkbox .el-checkbox__label {
  height: 100%;
  padding: 0;
  margin: 0
}

.img-list .item {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  border-radius: 8px;
  overflow: hidden
}

.img-list .item .progress,
.img-list .item .live {
  position: absolute;
  background-color: #00000080;
  color: #fff;
  padding: 5px 10px
}

.img-list .item .live {
  right: 0;
  bottom: 0;
  border-top-left-radius: 10px
}

.img-list .item .progress {
  top: 0;
  right: 0;
  border-bottom-left-radius: 10px
}

.img-list .item img {
  width: 100%;
  height: 100%;
  object-fit: cover
}

.btns {
  display: flex;
  justify-content: center
}
</style>
