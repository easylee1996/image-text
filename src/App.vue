<script setup>
import { GM_xmlhttpRequest } from '$'
import { ref, h, nextTick } from 'vue'
import { getElementsByXPathAsync } from './utils/utils'

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
// ========================================== 列表相关处理 ===========================================
listen_table_hover()
async function listen_table_hover() {
    const trs = await getElementsByXPathAsync("//tr[contains(@class,'ant-table-row')]")
    trs.forEach(tr => {
        const elm = tr.querySelector('td:nth-child(2)')
        const articel_id = tr.querySelector('td:nth-child(1)').innerText
        // 获取详细信息

        // 创建浮层元素
        const popup = document.createElement('div')
        popup.className = 'popup'
        popup.innerHTML = `<div>
            <div>123</div>
            </div>`
        document.body.appendChild(popup)
        elm.addEventListener('mouseover', function (event) {
            get_article_detail(articel_id)
            popup.classList.add('show')
            const rect = elm.getBoundingClientRect()
            popup.style.top = `${rect.top + window.scrollY}px`
            popup.style.left = `${rect.right + window.scrollX}px`
        })
        elm.addEventListener('mouseout', function (event) {
            popup.classList.remove('show')
        })
    })
}
// 发送请求，获取详细信息
async function get_article_detail(article_id) {
    GM_xmlhttpRequest({
        method: 'POST',
        url: `https://yyb-api.yilancloud.com/api/cms/v1/article/recreate/detail?yyb_article_id=${article_id}`,
        headers: {
            'Content-Type': 'application/json',
        },
        onload: function (response) {
            console.log(5555, response)
        },
    })
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
.popup {
    display: none;
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    margin-left: 20px;
}

.popup::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -10px; /* 向左移动10px，使三角形完全显示 */
    transform: translateY(-50%);
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #dedede; /* 三角形的边框颜色 */
    z-index: 1001; /* 确保三角形位于浮层之上 */
}

.popup.show {
    display: block;
}
</style>
