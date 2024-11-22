<script setup>
import { GM_xmlhttpRequest } from '$'
import { ref, h, nextTick } from 'vue'

// 变量
const now_task_keyword = ref('') // 当前任务关键词

interceptRequest()

// 监听请求
function interceptRequest() {
    // 返回劫持
    const originOpen = XMLHttpRequest.prototype.open
    XMLHttpRequest.prototype.open = function (_, url) {
        // 请求的url保留一下，以供提交劫持时使用
        this._url = url

        // 详细页面
        if (url.includes('detail')) {
            this.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    const res = JSON.parse(this.responseText) // 当前 xhr 对象上定义 responseText
                    Object.defineProperty(this, 'responseText', {
                        writable: true,
                    })

                    // 获取一些初始值
                    now_task_keyword.value = res.data.keyword
                    now_title.value = res.data.title

                    this.responseText = JSON.stringify(res)
                }
            })
        }
        originOpen.apply(this, arguments)
    }
    // 提交劫持
    const originSend = XMLHttpRequest.prototype.send
    XMLHttpRequest.prototype.send = function () {
        if (this._url.includes('update')) {
            let data = JSON.parse(arguments[0])
            data.title = now_title.value
            arguments[0] = JSON.stringify(data)
        }
        return originSend.apply(this, arguments)
    }
}
// ========================================== 封面处理 ===========================================
/**
 * 进入详情页：https://yyb-api.yilancloud.com/api/cms/v1/article/recreate/detail?yyb_article_id=VjdvBm7bGay8
 * 接口获取重绘封面历史：https://yyb-api.yilancloud.com/api/cms/v1/article/redraw_history/list?slot_id=W1M2B0JkLMdJ&redraw_class_id=3XLnj3gejJ6g
 * 保存更新标题和文章的接口：https://yyb-api.yilancloud.com/api/cms/v1/article/recreate/update 这里面有redraw_class_id和redraw_id以及slot_id
 * 保存封面的接口：https://yyb-api.yilancloud.com/api/ai/v1/draw/image/upload 传递file_name
 *
 * 目前来看无法通过接口的形式模拟，原因在于：1.修改是直接通过canvas画的，不是什么接口传参 2.最终保存的接口传递的都是创客贴的参数，而不是传一个路径，这些参数虽然可以模拟，但是没有意义，因为最底层的canvas是直接画图画的
 *
 *
 *
 *
 */

function gotoCover() {
    // 点击编辑图片
    // const xpath = "//span[text()='编辑图片']"
    // const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    // const targetSpan = result.singleNodeValue
    // if (targetSpan) {
    //     targetSpan.click()
    // }

    // 使用 GM_addValueChangeListener 传递

    // 定义 XPath 表达式
    const xpath2 = "//div[@class='bottom-tool-item-tips' and text()='图层']"

    // 使用 document.evaluate 在 iframe 内部执行 XPath 查询
    const result2 = iframeDocument.evaluate(xpath2, iframeDocument, null, XPathResult.ANY_TYPE, null)

    // 点击图层
    const targetSpan2 = result2.singleNodeValue
    if (targetSpan2) {
        targetSpan2.click()
    }
    console.log(33333, targetSpan2)

    // 点击文本框
    const xpath3 = "//span[@class='elem-type-text' and not(contains(text(), '['))]"

    // 右键点击当前选中框
    const xpath4 = "//div[@class='ckt-editor-box']"
}

// ========================================== 标题相关处理 ===========================================
const task_titles = ref([]) // 当前任务AI生成标题列表
const now_title = ref('')
const task_titles_loading = ref(false) // 当前任务AI生成标题列表加载状态
// 通过AI获取延伸话题
function getTitles() {
    task_titles_loading.value = true
    task_titles.value = []
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'https://api.coze.cn/v1/workflow/run',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer pat_hZYDpQzgCRxVqb8LHN8pTb4w2R9T00bGjUQr2vfiBVf8S3dk97Pjl1kKZSShBz4I',
        },
        data: JSON.stringify({
            workflow_id: '7438579954335989823',
            parameters: {
                BOT_USER_INPUT: now_task_keyword.value,
            },
        }),
        onload: function (res) {
            let parse_res = JSON.parse(res.responseText)
            task_titles.value = JSON.parse(parse_res.data).output
            task_titles_loading.value = false
        },
        onerror: function (err) {
            console.log(err)
            task_titles_loading.value = false
        },
    })
}

// 点击修改标题
function changeTitle(title) {
    now_title.value = title
    replaceTitleElement()
}

/**
 * 等待标题出现
 *
 * 因为标题是异步加载的，所以需要等待标题出现后再替换，默认替换的原因是为了将标题栏完整的交由自己控制
 * 否则如果用户直接修改了原本的标题，无法监听到
 */
delayTitleVisible()
function delayTitleVisible() {
    let originElement = null
    const timer = setInterval(() => {
        originElement = document.querySelector('#w-e-textarea-1')
        if (originElement && now_title.value) {
            replaceTitleElement()
            clearInterval(timer)
        }
    }, 100)
}
// 替换原生的标题输入框
function replaceTitleElement() {
    const originElement = document.querySelector('#w-e-textarea-1')
    const input = document.createElement('input')
    input.id = 'w-e-textarea-1'
    input.type = 'text'
    input.value = now_title.value
    input.addEventListener('input', event => {
        now_title.value = event.target.value
    })
    originElement.parentNode.replaceChild(input, originElement)
}
</script>

<template>
    <div class="image-text-container">
        <el-button type="success" @click="getTitles()" v-loading="task_titles_loading" :disabled="task_titles_loading">获取延伸标题</el-button>
        <div class="title-list">
            <div class="title-one" v-for="item in task_titles" :key="item" @click="changeTitle(item)">
                {{ item }}
            </div>
        </div>
        <el-button type="danger">获取内容</el-button>
        <el-button type="danger" @click="gotoCover()">修改封面</el-button>
    </div>
    <!-- <el-dialog v-model="dialogVisible" title="" width="100%" :destroy-on-close="true">
        <div class="dialog-content"></div>
    </el-dialog> -->
</template>

<style lang="less" scoped>
.image-text-container {
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    position: fixed;
    left: 0%;
    top: 22%;
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

    .title-list {
        margin-bottom: 10px;
        width: 100%;
        .title-one {
            border: 1px solid #999;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            font-size: 14px;
            margin-bottom: 5px;
        }
    }
}
</style>
<style>
#w-e-textarea-1 {
    width: 100%;
}
</style>
