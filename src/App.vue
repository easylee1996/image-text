<script setup>
import { GM_xmlhttpRequest, GM_getResourceURL, GM_addValueChangeListener, GM_setValue, GM_getValue } from '$'
import { ref, h, nextTick } from 'vue'
import { getElementsByXPathAsync } from './utils/utils'
import Cookies from 'js-cookie'

// 变量
const now_task_keyword = ref('') // 当前任务关键词
let token = Cookies.get('enterprise_yyb_token')
let Teamid = Cookies.get('TeamId')
let now_page_detail_info = {}
let change_cover_image_obj = {}
let save_is_change_cover = false
let change_content = ''
let save_is_change_content = false

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
                      'Content-Type': 'application/json',
                      Token: token,
                      Teamid: Teamid,
                  },
            data: JSON.stringify(data),
            onload: function (response) {
                console.log('请求成功', response)
                if (response.status === 200) {
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
// 自定义 get
function my_get(url) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                Token: token,
                Teamid: Teamid,
            },
            onload: function (response) {
                console.log('请求成功', response)
                if (response.status === 200) {
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
interceptRequest()
// 监听请求
function interceptRequest() {
    // 返回劫持
    const originOpen = XMLHttpRequest.prototype.open
    XMLHttpRequest.prototype.open = function (_, url) {
        // 请求的url保留一下，以供提交劫持时使用
        this._url = url

        // 详细页面
        if (url.includes('article/recreate/detail')) {
            this.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    const res = JSON.parse(this.responseText) // 当前 xhr 对象上定义 responseText
                    Object.defineProperty(this, 'responseText', {
                        writable: true,
                    })

                    // 获取一些初始值
                    if (res.data.title) {
                        now_task_keyword.value = res.data.keyword
                        task_titles.value = []
                        task_titles.value.push('带你了解：' + now_task_keyword.value)
                        task_titles.value.push('带你了解：' + now_task_keyword.value + '是什么？')
                        task_titles.value.push('一文看懂：' + now_task_keyword.value)
                        task_titles.value.push('一文看懂：' + now_task_keyword.value + '是什么？')
                        now_title.value = res.data.title
                        replaceTitleElement()
                    }

                    now_page_detail_info = res.data

                    // 监听点击审核按钮
                    listen_submit_click()

                    this.responseText = JSON.stringify(res)
                }
            })
        }
        // 列表页面
        if (url.includes('/article/recreate/tasks')) {
            this.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    // 添加事件
                    listen_table_hover()
                }
            })
        }
        originOpen.apply(this, arguments)
    }
    // 提交劫持
    const originSend = XMLHttpRequest.prototype.send
    XMLHttpRequest.prototype.send = function () {
        if (this._url.includes('/article/recreate/update')) {
            let data = JSON.parse(arguments[0])
            // 修改标题
            data.title = now_title.value
            // 修改封面
            if (save_is_change_cover) {
                data.contents[1] = change_cover_image_obj
                save_is_change_cover = false
            }
            // 修改内容
            if (save_is_change_content) {
                data.contents[0].content = change_content
                data.contents[0].content_html = change_content
                save_is_change_content = false
            }
            arguments[0] = JSON.stringify(data)
            console.log('最终参数', arguments[0])
        }
        return originSend.apply(this, arguments)
    }
}
// ========================================== 封面图片处理 ===========================================
/**
 * 加载图片有两种方式，访问在线 url 不必多说，如果要访问本地文件，需要在google 插件管理里面将油猴脚本设置为允许访问文件(详情)，然后在油猴脚本高级设置里面，打开允许访问所有本地文件
 * 一种是GM_getResourceURL，需要先将本地文件放到 @resource 配置中，然后通过 GM_getResourceURL 获取资源 URL，这里是资源的名字，配置时，自动有个名字，在插件顶部申明文件可以查看
 * 一种是 GM_xmlhttpRequest，直接访问本地的地址即可（推荐，更灵活）
 * @param url 图片地址或本地路径
 */
// 将图片转为 Blob

function fetchImageAsBlob(url) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: 'get',
            responseType: 'blob',
            url: url,
            onload: function (response) {
                console.log('图片请求成功', response)
                if (response.status === 200) {
                    resolve(response.response)
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

// 上传图片到 oss
function put_image_to_oss(result1, imageBlob) {
    return new Promise((resolve, reject) => {
        // 上传图片
        GM_xmlhttpRequest({
            method: 'PUT',
            url: result1.data.post_url,
            headers: {
                'Content-Type': 'image/webp',
            },
            data: imageBlob,
            onload: function (response2) {
                resolve()
            },
            onerror: function (error) {
                reject(new Error(`Network error: ${error}`))
            },
        })
    })
}

// 改变封面
const cover_loading = ref(false)
async function change_cover() {
    cover_loading.value = true
    ElMessage.warning('正在修改封面...')
    // 0.首先创建封面图片
    const result0 = await my_post(import.meta.env.VITE_API_URL + '/api/template/submit_title', { title: now_title.value })
    console.log(result0)

    // 1.获取阿里云 oss 地址
    const result1 = await my_post(`https://yyb-api.yilancloud.com/api/ai/v1/draw/image/upload`, { file_name: result0.filename, content_type: 'image/webp' })

    // 2.上传到阿里云 oss
    // const filePath = 'file:///Users/miao/Downloads/cover.webp';
    const filePath = import.meta.env.VITE_API_URL + '/api/cover/' + result0.filename
    const imageBlob = await fetchImageAsBlob(filePath)
    await put_image_to_oss(result1, imageBlob)

    // 3.创建图片槽位
    console.log({ op_image_jobid: result1.data.file_id, yyb_article_id: now_page_detail_info.yyb_article_id, team_id: Teamid })
    const result2 = await my_post(`https://yyb-api.yilancloud.com/api/cms/v1/article/redraw/slot/create`, {
        op_image_jobid: result1.data.file_id,
        yyb_article_id: now_page_detail_info.yyb_article_id,
        team_id: Teamid,
    })

    // 4.保存图片槽位
    // 获取封面的 redraw_id
    let redraw_id = ''
    let redraw_class_id = ''
    for (const item of now_page_detail_info.contents) {
        if (item.tp === 2 && item?.select_image) {
            redraw_id = item.select_image.redraw_id
            redraw_class_id = item.select_image.redraw_class_id
        }
    }
    await my_post(`https://yyb-api.yilancloud.com/api/cms/v1/article/redraw_history/custom_save`, {
        slot_id: result2.data.slot_id,
        op_image_jobid: result1.data.file_id,
        redraw_class_id: redraw_class_id,
        yyb_article_id: now_page_detail_info.yyb_article_id,
        team_id: Teamid,
    })

    // 5.组装上传的图片对象
    change_cover_image_obj = {
        tp: 2,
        content: '',
        content_html: '',
        method_id: '0',
        op_image_jobid: result1.data.file_id,
        slot_id: result2.data.slot_id,
        redraw_id: redraw_id,
        redraw_class_id: redraw_class_id,
        redraw_class_name: '自定义',
        design_id: '',
        template_id: '',
        template_file_id: '',
    }

    // 6.点击保存按钮
    save_is_change_cover = true
    const save_el = (await getElementsByXPathAsync("//button/span[text()='保 存']/parent::button"))[0]
    save_el.click()

    cover_loading.value = false
}
// ========================================== 列表相关处理 ===========================================
// 列表获取文章详情内容
let globalPopup = null
async function listen_table_hover() {
    // 等待列表元素加载完成
    const trs = await getElementsByXPathAsync("//tr[contains(@class,'ant-table-row')]")
    // 获取详情弹窗
    function get_article_pop(tr) {
        const elm = tr.querySelector('td:nth-child(2)')

        if (elm._handleMouseEnter) {
            elm.removeEventListener('mouseenter', elm._handleMouseEnter)
        }
        if (elm._handleMouseLeave) {
            elm.removeEventListener('mouseleave', elm._handleMouseLeave)
        }

        async function handleMouseEnter(event) {
            if (globalPopup) {
                globalPopup.classList.remove('show')
                document.body.removeChild(globalPopup)
            }

            const articel_id = tr.querySelector('td:nth-child(1)').innerText
            globalPopup = document.createElement('div')
            globalPopup.className = 'popup'
            globalPopup.innerHTML = `<h1>正在获取数据中...</h1>`
            document.body.appendChild(globalPopup)
            globalPopup.classList.add('show')
            const rect = elm.getBoundingClientRect()
            globalPopup.style.top = `${rect.top + window.scrollY}px`
            globalPopup.style.left = `${rect.right + window.scrollX}px`
            await get_article_detail(articel_id, globalPopup)
        }

        function handleMouseLeave(event) {
            if (globalPopup) {
                globalPopup.classList.remove('show')
            }
        }

        elm._handleMouseEnter = handleMouseEnter
        elm._handleMouseLeave = handleMouseLeave

        elm.addEventListener('mouseenter', handleMouseEnter)
        elm.addEventListener('mouseleave', handleMouseLeave)
    }
    // 增加跳转小红书按钮
    function add_goto_xhs_button(tr) {
        const elm = tr.querySelector('td:nth-child(6) > div')

        // 检查按钮是否已经存在
        const existingButton = elm.querySelector('.goto_xhs_button')
        if (existingButton) {
            return
        }

        const button = document.createElement('button')
        button.innerText = '小红书'
        button.className = 'goto_xhs_button'
        button.addEventListener('click', () => {
            let query = tr.querySelector('td:nth-child(2) > div').innerText
            query = query.replace('任务query：', '')
            query = query.replace('"', '')
            goto_xhs(query)
        })
        elm.appendChild(button)
    }
    trs.forEach(tr => {
        get_article_pop(tr)
        add_goto_xhs_button(tr)
    })
}

// 发送请求，获取详细信息
async function get_article_detail(article_id, popup) {
    const result = await my_get(`https://yyb-api.yilancloud.com/api/cms/v1/article/recreate/detail?yyb_article_id=${article_id}`)
    const articles = result?.data?.query_articles
    let html = ''
    articles.forEach(article => {
        // 这里要判断状态
        if (article.pre_audit_status !== 0 || article.audit_status !== 0) {
            html += `
                        <h2>${article.title}</h2>
                    `
        }
    })
    if (html === '') html = '<h1>暂无人提交数据</h1>'
    popup.innerHTML = html
}

// ========================================== 标题相关处理 ===========================================
const task_titles = ref([]) // 当前任务AI生成标题列表
const now_title = ref('')
const task_titles_loading = ref(false) // 当前任务AI生成标题列表加载状态
// 通过AI获取延伸话题
async function getTitles() {
    task_titles_loading.value = true
    task_titles.value = []
    const result = await my_post(
        'https://api.coze.cn/v1/workflow/run',
        {
            workflow_id: '7440838063737225243',
            parameters: {
                BOT_USER_INPUT: now_task_keyword.value,
            },
        },
        {
            'Content-Type': 'application/json',
            Authorization: 'Bearer pat_gmrxgGDTRBV2cnGPx9vrhOHx4IMiShHUBKTXkVn8ql66xMuG7219YySM8P26rSR8',
        },
    )

    task_titles.value = JSON.parse(result.data).output
    task_titles_loading.value = false
}

// 点击修改标题
function changeTitle(title) {
    now_title.value = title
    replaceTitleElement()
}

// 替换原生的标题输入框
async function replaceTitleElement() {
    const input = document.createElement('input')
    input.id = 'manual-edit-id'
    input.type = 'text'
    input.style.width = '100%'
    input.value = now_title.value
    input.addEventListener('input', event => {
        now_title.value = event.target.value
    })
    let originElement = document.querySelector('#manual-edit-id')
    if (originElement) {
        originElement.parentNode.replaceChild(input, originElement)
    } else {
        originElement = (await getElementsByXPathAsync("(//div[contains(@class,'ai-assistant-input__edit')])[1]"))[0]
        originElement.style.display = 'none'
        originElement.parentNode.appendChild(input)
    }
}
// ========================================== 内容相关处理 ===========================================
// 跳转文心一言
function goto_yiyan() {
    const yiyan_url = `https://yiyan.baidu.com/`
    window.open(yiyan_url)
}
// 监听来自详情页的标题
listen_title()
async function listen_title() {
    // 监听文心一言加载完成，传递标题过去
    if (location.href.includes('ai.openvam.com')) {
        GM_addValueChangeListener('yiyan_loaded', function (name, old_value, new_value, remote) {
            if (new_value === 'true') {
                let need_title = ''
                try {
                    need_title = now_title.value.split('：')[1]
                } catch {
                    need_title = now_title.value
                }
                GM_setValue('yiyan_content', need_title)
                GM_setValue('yiyan_loaded', 'false')
            }
        })
    }
    // 监听来自主页的标题
    if (location.href.includes('yiyan.baidu.com')) {
        GM_addValueChangeListener('yiyan_content', async function (name, old_value, new_value, remote) {
            if (new_value !== '') {
                // contenteditable文本，输入内容，这是一种方法
                const editableDiv = document.querySelector('.yc-editor')
                if (editableDiv) {
                    var inputEvent = new InputEvent('input', {
                        data: new_value,
                        inputType: 'insertText',
                        bubbles: true,
                        cancelable: true,
                    })
                    editableDiv.dispatchEvent(inputEvent)
                }
                GM_setValue('yiyan_content', '')

                // 点击发送
                const sendBtn = (await getElementsByXPathAsync("//span[@id='sendBtn']"))[0]
                if (sendBtn) {
                    sendBtn.click()
                }
            }
        })

        await getElementsByXPathAsync("//span[@id='sendBtn']")
        GM_setValue('yiyan_loaded', 'true')
    }
}

// ========================================== 保存、审核相关处理 ===========================================
// 提交前判断是否保存
async function listen_submit_click() {
    const submit_el = (await getElementsByXPathAsync("//button/span[text()='提交审核']/parent::button"))[0]
    const save_el = (await getElementsByXPathAsync("//button/span[text()='保 存']/parent::button"))[0]
    const origin_title_el = (await getElementsByXPathAsync("(//div[contains(@class,'ai-assistant-input__edit')])[1]//span/span/span"))[0]

    // 点击审核后，刷新
    submit_el.addEventListener('click', async event => {
        if (now_title.value !== origin_title_el.innerText) {
            ElMessage.warning('未提前保存，自动保存中....')
            save_el.click()

            await getElementsByXPathAsync("//div[@class='ant-message']//span[text()='保存成功']")
            window.location.reload()
        }
    })
}
// ========================================== 其他功能 ===========================================
// 详情页跳转到小红书
function goto_xhs(keyword) {
    if (keyword) {
        window.open(`https://www.xiaohongshu.com/search_result?keyword=${keyword}`)
    } else {
        window.open(`https://www.xiaohongshu.com/search_result?keyword=${now_task_keyword.value}`)
    }
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
        <el-button type="primary" @click="goto_yiyan()">跳转文心一言</el-button>
        <el-button type="danger" @click="change_cover()" v-loading="cover_loading" :disabled="cover_loading">修改封面</el-button>
        <el-button type="warning" @click="goto_xhs()">跳转到小红书</el-button>
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
    left: -10px;
    /* 向左移动10px，使三角形完全显示 */
    transform: translateY(-50%);
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #dedede;
    /* 三角形的边框颜色 */
    z-index: 1001;
    /* 确保三角形位于浮层之上 */
}

.popup.show {
    display: block;
}
.goto_xhs_button {
    border: none;
    background: none;
    cursor: pointer;
    color: red;
}
</style>
