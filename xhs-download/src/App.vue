<script setup>
import { unsafeWindow, GM_getValue, GM_setValue } from '$'
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'

const showDialog = ref(false)
const selectedImages = ref([])
const images = ref([])
const all_selected = ref(false)
const isIndeterminate = ref(false)
const all_selected_label = ref('全选')
const autoShowDownloadExplore = ref(true)

// ========================================== 公用方法 ===========================================
// 获取相关初始配置
getInitValue()
function getInitValue() {
    // 自动弹出弹窗
    autoShowDownloadExplore.value = GM_getValue('autoShowDownloadExplore', true)
}
// 切换自动弹出弹窗
function autoShowDownloadExploreChange(e) {
    GM_setValue('autoShowDownloadExplore', e)
}
// ============================================================== 无水印下载功能实现 ================================================================================
let currentUrl = window.location.href
// 获取最新的当前地址，小红书点击帖子时，url会变化，需要从url中获取ID等信息
const get_newest_url = () => {
    let observer

    observer = new MutationObserver(function () {
        if (currentUrl !== window.location.href) {
            currentUrl = window.location.href
        }
    })
    const config = { childList: true, subtree: true }
    observer.observe(document.body, config)
}
get_newest_url()

// 劫持请求
interceptRequest()
function interceptRequest() {
    // 返回劫持
    const originOpen = XMLHttpRequest.prototype.open
    XMLHttpRequest.prototype.open = function (_, url) {
        // 请求的url保留一下，以供提交劫持时使用
        this._url = url

        // 等待点击帖子，请求完这个帖子的图片列表后，再执行
        if (url.includes('/api/sns/web/v1/feed')) {
            this.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    if (autoShowDownloadExplore.value) {
                        setTimeout(() => {
                            extractDownloadLinks()
                        })
                    }
                }
            })
        }
        originOpen.apply(this, arguments)
    }
}

// 创建无水印视频下载地址
const generateVideoUrl = note => {
    try {
        return [`https://sns-video-bd.xhscdn.com/${note.video.consumer.originVideoKey}`]
    } catch (error) {
        console.error('Error generating video URL:', error)
        return []
    }
}

// 创建无水印图片下载地址
const generateImageUrl = images => {
    const regex = /http:\/\/sns-webpic-qc\.xhscdn.com\/\d+\/[0-9a-z]+\/(\S+)!/
    let urls = []
    try {
        images.forEach(item => {
            let match = item.match(regex)
            if (match && match[1]) {
                urls.push(`https://ci.xiaohongshu.com/${match[1]}?imageView2/format/webp`)
            }
        })
        return urls
    } catch (error) {
        console.error('Error generating image URLs:', error)
        return []
    }
}

// 下载无水印失败
const abnormal = () => {
    alert('下载无水印作品文件失败！')
}

// 下载预处理2 - 获取文件名,然后开始下载
const downloadResource = async urls => {
    const name = extractName()
    console.info(`基础文件名称 ${name}`)

    // 获取无水印url
    urls = await generateImageUrl(urls)
    await downloadImage(urls, name)
}

// 下载并关闭按钮
const downloadFileAndClose = () => {
    downloadResource(selectedImages.value)
    closeWindow()
}

// 下载预处理1 - 获取url
const exploreDeal = async note => {
    try {
        let links
        if (note.type === 'normal') {
            links = note.imageList.map(item => item.urlDefault)
            images.value = links
            showDialog.value = true
            selectedImages.value = links
            all_selected.value = true
            handleCheckAllChange(true)
        } else {
            // 视频浏览器标签页打开查看，这是最快的方式
            links = generateVideoUrl(note)
            window.open(links[0])
        }
    } catch (error) {
        console.error('Error in deal function:', error)
        abnormal()
    }
}

// 从url中提取作品信息，包含了图片列表
const extractNoteInfo = () => {
    const regex = /\/explore\/([^?]+)/
    const match = currentUrl.match(regex)
    if (match) {
        // unsafeWindow 是一个全局对象，它允许我们访问浏览器环境中的各种属性和方法，默认油猴脚本是在沙箱环境中，无法直接访问浏览器环境中的全局对象，因此需要使用 unsafeWindow 来访问这些对象。
        return unsafeWindow.__INITIAL_STATE__.note.noteDetailMap[match[1]]
    } else {
        console.error('从链接提取作品 ID 失败', currentUrl)
    }
}

// 解析当前帖子的url，从中获取图片列表url等信息，解析完成开始预处理
const extractDownloadLinks = async () => {
    if (currentUrl.includes('https://www.xiaohongshu.com/explore/')) {
        let note = extractNoteInfo()
        if (note.note) {
            await exploreDeal(note.note)
        } else {
            abnormal()
        }
    }
}

// 具体下载方法 模拟点击下载
const downloadFile = async (link, filename) => {
    try {
        // 使用 fetch 获取文件数据
        let response = await fetch(link, {
            method: 'GET',
        })

        // 检查响应状态码
        if (!response.ok) {
            console.error(`请求失败，状态码: ${response.status}`, response.status)
            return false
        }

        let blob = await response.blob()

        // 创建 Blob 对象的 URL
        let blobUrl = window.URL.createObjectURL(blob)

        // 创建一个临时链接元素
        let tempLink = document.createElement('a')
        tempLink.href = blobUrl
        tempLink.download = filename

        // 模拟点击链接
        tempLink.click()

        // 清理临时链接元素
        window.URL.revokeObjectURL(blobUrl)

        return true
    } catch (error) {
        console.error(`下载失败 (${filename}):`, error)
        return false
    }
}

// 解析文件名
const extractName = () => {
    let name = document.title.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '')
    let match = currentUrl.match(/\/([^\/]+)$/)
    let id = match ? match[1] : null
    return name === '' ? id : name
}

// 下载所有选中的无水印图片
const downloadImage = async (urls, name) => {
    let result = []
    for (const [index, url] of urls.entries()) {
        result.push(await downloadFile(url, `${name}_${index + 1}.webp`))
    }
    if (!result.every(item => item === true)) {
        abnormal()
    }
}
// ========================================== 其他功能 ===========================================
// 全选
function handleCheckAllChange(val) {
    selectedImages.value = val ? images.value : []
    isIndeterminate.value = false
    all_selected_label.value = val ? '全选(' + images.value.length + ')' : '全选'
}
// 选中变化
function handleCheckedChange(value) {
    const checkedCount = value.length
    all_selected.value = checkedCount === images.value.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < images.value.length

    all_selected_label.value = selectedImages.value.length > 0 ? '全选(' + selectedImages.value.length + ')' : '全选'
}
// 关闭窗口
function closeWindow() {
    showDialog.value = false
    document.querySelector('.close-circle').click()
}
onMounted(() => {
    window.closeWindow = closeWindow
})
</script>

<template>
    <div class="xhs-download-container" v-show="!showDialog">
        <div class="auto-show">
            <span>自动弹出</span>
            <el-radio-group v-model="autoShowDownloadExplore" size="small" @change="autoShowDownloadExploreChange">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
            </el-radio-group>
        </div>
        <el-button type="primary" @click="extractDownloadLinks()">无水印下载</el-button>
    </div>
    <el-drawer title="图片预览与下载" v-model="showDialog" direction="ttb" size="100%">
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
            <div class="xhs-btns">
                <el-checkbox
                    v-model="all_selected"
                    :indeterminate="isIndeterminate"
                    :label="all_selected_label"
                    size="default"
                    border
                    @change="handleCheckAllChange"
                    style="margin-right: 10px"
                />
                <el-button type="primary" @click="downloadFileAndClose">下载并关闭</el-button>
                <el-button type="primary" @click="downloadResource(selectedImages)">下载资源</el-button>
                <el-button type="danger" @click="closeWindow">关闭窗口</el-button>
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

    .el-button + .el-button {
        margin-left: 0px;
    }
}
</style>
<style>
.img-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    padding: 10px;
    border-radius: 8px;
    background-color: #eee;
}

.img-list .el-checkbox {
    position: relative;
    width: 100%;
    height: 100%;
}

.img-list .el-checkbox .el-checkbox__input {
    position: absolute;
    top: 0;
    left: 0;
}

.img-list .el-checkbox .el-checkbox__label {
    height: 100%;
    padding: 0;
    margin: 0;
}

.img-list .item {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
}

.img-list .item .progress,
.img-list .item .live {
    position: absolute;
    background-color: #00000080;
    color: #fff;
    padding: 5px 10px;
}

.img-list .item .live {
    right: 0;
    bottom: 0;
    border-top-left-radius: 10px;
}

.img-list .item .progress {
    top: 0;
    right: 0;
    border-bottom-left-radius: 10px;
}

.img-list .item img {
    width: 100%;
    height: auto;
    object-fit: contain;
}

.xhs-btns {
    display: flex;
    justify-content: center;
}

.el-drawer__header {
    margin-bottom: 0px !important;
}
.auto-show {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 10px;

    span {
        margin-right: 10px;
        font-size: 16px;
    }
}
</style>
