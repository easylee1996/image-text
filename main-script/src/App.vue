<script setup>
import { GM_xmlhttpRequest, GM_getResourceURL, GM_addValueChangeListener, GM_setValue, GM_getValue, GM_openInTab } from '$'
import { ref, h, nextTick, onMounted } from 'vue'
import { getElementsByXPathAsync, sleep } from './utils/utils'
import Cookies from 'js-cookie'
import { throttle, debounce } from 'lodash'

console.log(111111111111111, import.meta.env)

// 变量
const now_task_keyword = ref('') // 当前任务关键词
let token = Cookies.get('enterprise_yyb_token')
let Teamid = Cookies.get('TeamId')
let now_page_detail_info = {
    article_project_id: 'ql3v5Roy7RaK',
}
let change_cover_image_obj = {}
let save_is_change_cover = false
let change_content = ''
let save_is_change_content = false
// 小红书
const idToImageNumMap = new Map()
const imgMinNum = ref(0)
// 标题相关
const task_titles = ref([]) // 当前任务AI生成标题列表
const now_title = ref('')
const task_titles_loading = ref(false) // 当前任务AI生成标题列表加载状态
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
                if (response.status === 200) {
                    console.log('my_post请求发送成功:', response.responseText)
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
                if (response.status === 200) {
                    console.log('my_get请求发送成功:', response.responseText)
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
    // 限制领取任务反复执行
    const get_task_limit = debounce(get_task, 1000)
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
                        task_titles.value.push('速看：' + now_task_keyword.value)
                        task_titles.value.push('速看：' + now_task_keyword.value + '是什么？')
                        now_title.value = res.data.title
                    }

                    now_page_detail_info = res.data

                    this.responseText = JSON.stringify(res)

                    // 自动提交审核-监听事件
                    listen_save_check()

                    // 进入详情页的默认操作
                    detail_init_todos()
                }
            })
        }
        // 列表页面
        if (url.includes('/article/recreate/tasks')) {
            // 先获取任务
            get_task_limit()
            this.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    // 添加事件
                    listen_table_hover()
                    // 增加领取任务按钮
                    add_get_task_button()
                }
            })
        }
        //小红书列表页面，这里需要开启注入脚本时机为document-start，否则小红书的默认加载接口会过快，但开启后会导致脚本注入失败，暂时未开启
        if (url.includes('/api/sns/web/v1/search/notes')) {
            this.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    const res = JSON.parse(this.responseText) // 当前 xhr 对象上定义 responseText

                    res.data.items.forEach(item => {
                        idToImageNumMap.set(item.id, item?.note_card?.image_list?.length || 0)
                    })
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
        }
        return originSend.apply(this, arguments)
    }
}
// 模拟react input change，直接变更input的value值是不会生效的,仅限于input标签可以生效
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
    const result0 = await my_post(import.meta.env.VITE_PTYHON_API_URL + '/api/template/submit_title', { title: now_title.value })
    console.log(result0)

    // 1.获取阿里云 oss 地址
    const result1 = await my_post(`https://yyb-api.yilancloud.com/api/ai/v1/draw/image/upload`, { file_name: result0.filename, content_type: 'image/webp' })

    // 2.上传到阿里云 oss
    // const filePath = 'file:///Users/miao/Downloads/cover.webp';
    const filePath = import.meta.env.VITE_PTYHON_API_URL + '/api/cover/' + result0.filename
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

// 增加领取任务按钮
async function add_get_task_button() {
    const formEL = (await getElementsByXPathAsync("//div[@class='get-task-container']"))[0]
    if (formEL) {
        if (document.querySelector('.my-get-task-button-div')) return

        const my_button_div = document.createElement('div')
        my_button_div.classList.add('my-get-task-button-div')

        // 创建免答题按钮
        // const get_task_button_no_question = document.createElement('button')
        // get_task_button_no_question.textContent = '领取任务(免答题)'
        // get_task_button_no_question.classList.add('my-get-task-button') // 可以添加样式类
        // get_task_button_no_question.addEventListener('click', async event => {
        //     const max_task_num_input = (await getElementsByXPathAsync("//input[@id='max_task_num']"))[0]
        //     const max_task_num = max_task_num_input.value

        //     const result = await my_post('https://yyb-api.yilancloud.com/api/article/v1/article/creative/alloc', {
        //         strategy: 0,
        //         max_task_num: max_task_num,
        //         article_project_id: now_page_detail_info.article_project_id,
        //     })

        //     if (!result.data) {
        //         ElMessage.error(result.msg)
        //         return
        //     }
        //     ElMessage.success('领取成功')
        //     window.location.reload()
        // })
        // my_button_div.appendChild(get_task_button_no_question)

        // 创建一键领取50条任务按钮
        const task_50_button = document.createElement('button')
        task_50_button.textContent = '领取任务(50条)'
        task_50_button.classList.add('my-get-task-button') // 可以添加样式类
        const get_task_limit = debounce(get_task, 1000)
        task_50_button.addEventListener('click', () => get_task_limit())

        my_button_div.appendChild(task_50_button)
        formEL.appendChild(my_button_div)
    }
}

// 领取任务方法
async function get_task(num = 50) {
    const result = await my_post('https://yyb-api.yilancloud.com/api/article/v1/article/creative/alloc', {
        strategy: 0,
        max_task_num: num,
        article_project_id: now_page_detail_info.article_project_id,
    })
    if (!result.data) {
        ElMessage.error(result.msg)
        return
    }
    ElMessage.success('领取成功')
}

// ========================================== 标题相关处理 ===========================================
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
async function changeTitle(title) {
    now_title.value = title

    await inputTitle()
}

// 通过python模拟输入标题，js无法改变react的state
async function inputTitle() {
    const title_el = (await getElementsByXPathAsync('/html/body/div[1]/section/div[2]/section/main/div/div/div[1]/div/div/div[1]/div[1]/div[2]/div[1]/div/div/div[3]/div'))[0]
    title_el.focus()
    title_el.focus()

    // 复制标题到剪贴板
    await navigator.clipboard.writeText(now_title.value)

    await my_post(import.meta.env.VITE_PTYHON_API_URL + '/paste_title')
}
// 监听文本框输入变化   暂时无法实现，因为输入会报错，导致代码无法执行
// listen_title_change()
// async function listen_title_change() {
//     // 获取可编辑的 div 元素
//     const editableDiv = (await getElementsByXPathAsync("(//div[@class='w-e-scroll'])[1]//span[text()]"))[0]

//     // 创建 MutationObserver 实例
//     const observer = new MutationObserver(function (mutations) {
//         // 获取当前 div 内的文本内容
//         const text = editableDiv.innerText || editableDiv.textContent;

//         console.log(text)
//     });

//     // 配置观察选项
//     const config = {
//         childList: true,  // 观察子节点的变化
//         subtree: true,    // 观察所有子节点的变化
//         characterData: true,  // 观察字符数据的变化
//     };

//     // 开始观察
//     observer.observe(editableDiv, config);
// }
// ========================================== AI生成文章相关 ===========================================
// 跳转文心一言
async function goto_yiyan() {
    // GM_openInTab(yiyan_url, { active: false, insert: true, setParent: true })
    await navigator.clipboard.writeText(now_task_keyword.value)
    const urlPart = 'yiyan.baidu.com'
    chrome.runtime.sendMessage('lgmogdnlnnnlkcmdbofiniokkfblflff', { action: 'activateTab', urlPart: urlPart }, response => {
        GM_setValue('yiyan', 'true')
    })
}
// 跳转豆包
async function goto_doubao() {
    await navigator.clipboard.writeText(now_task_keyword.value)
    const urlPart = 'www.doubao.com'
    chrome.runtime.sendMessage('lgmogdnlnnnlkcmdbofiniokkfblflff', { action: 'activateTab', urlPart: urlPart }, response => {
        GM_setValue('doubao', 'true')
    })
}
// 跳转通义千问
async function goto_qianwen() {
    // GM_openInTab(yiyan_url, { active: false, insert: true, setParent: true })
    await navigator.clipboard.writeText(now_task_keyword.value)
    const urlPart = 'tongyi.aliyun.com'
    chrome.runtime.sendMessage('lgmogdnlnnnlkcmdbofiniokkfblflff', { action: 'activateTab', urlPart: urlPart }, response => {
        GM_setValue('tongyi', 'true')
    })
}
// 监听从主页面跳转过来，自动执行输入操作
listen_auto_input()
async function listen_auto_input() {
    // 默认设置为false，避免设置为true的时候，页面本身没打开，导致一直为true
    GM_setValue('xhs', 'false')
    GM_setValue('doubao', 'false')
    GM_setValue('yiyan', 'false')
    GM_setValue('tongyi', 'false')

    // 监听来自主页的标题 - 小红书
    if (location.href.includes('www.xiaohongshu.com')) {
        GM_addValueChangeListener('xhs', async (name, old_value, new_value, remote) => {
            if (new_value == 'true') {
                const editableDiv = (await getElementsByXPathAsync("//input[@id='search-input']"))[0]
                // 两次聚焦，避免第一次聚焦存在延迟，导致全选选中了整个网页
                editableDiv.focus()
                editableDiv.focus()
                await my_post(import.meta.env.VITE_PTYHON_API_URL + '/xhs_search')
                GM_setValue('xhs', 'false')
            }
        })
    }
    // 监听来自主页的标题 - 豆包
    if (location.href.includes('www.doubao.com')) {
        GM_addValueChangeListener('doubao', async (name, old_value, new_value, remote) => {
            if (new_value == 'true') {
                const editableDiv = (
                    await getElementsByXPathAsync("//*[@id='root']/div[1]/div/div[2]/div[1]/div[1]/div/div/div[3]/div/div/div/div[3]/div[1]/div/div[1]/div/textarea")
                )[0]
                // 两次聚焦，避免第一次聚焦存在延迟，导致全选选中了整个网页
                editableDiv.focus()
                editableDiv.focus()
                await my_post(import.meta.env.VITE_PTYHON_API_URL + '/input_ai')
                GM_setValue('doubao', 'false')
            }
        })
    }
    // 监听来自主页的标题 - 文心一言
    if (location.href.includes('yiyan.baidu.com')) {
        GM_addValueChangeListener('yiyan', async (name, old_value, new_value, remote) => {
            if (new_value == 'true') {
                const editableDiv = (await getElementsByXPathAsync("//*[@id='eb_model_footer']/div[4]/div[3]/div/div/div/div[3]/div[1]/div/div"))[0]
                // 两次聚焦，避免第一次聚焦存在延迟，导致全选选中了整个网页
                editableDiv.focus()
                editableDiv.focus()
                await my_post(import.meta.env.VITE_PTYHON_API_URL + '/input_ai')
                GM_setValue('yiyan', 'false')
            }
        })
    }
    // 监听来自主页的标题 - 通义千问    存在偶发无法注入脚本问题，后期再解决，暂时没有使用千问进行生成
    if (location.href.includes('tongyi.aliyun.com')) {
        GM_addValueChangeListener('tongyi', async (name, old_value, new_value, remote) => {
            if (new_value == 'true') {
                const editableDiv = (await getElementsByXPathAsync("//*[@id='tongyiPageLayout']/div[3]/div/div[2]/div[1]/div[3]/div[2]/div/div[2]/div/textarea"))[0]
                editableDiv.focus()
                editableDiv.focus()
                await my_post(import.meta.env.VITE_PTYHON_API_URL + '/input_ai')
                GM_setValue('tongyi', 'false')
            }
        })
    }
}

// ========================================== 详情页相关处理 ===========================================
// 监听点击审核，自动执行后续操作

async function listen_save_check() {
    const check_el = (await getElementsByXPathAsync("//*[@id='root']/section/div[2]/section/main/div/div/div[1]/div/div/div[1]/div[2]/button[2]"))[0]

    check_el.addEventListener('click', async () => {
        console.log('监听到点击审核')
        // 设置封面 - 被做过的帖子，封面会不正确
        const cover_button = (await getElementsByXPathAsync("(//button//span[text()='设为封面']/..)[1]"))[0]
        cover_button.click()

        await sleep(2000)

        // 确定元素  这里会点击多次，所以需要判断
        const comfirm_el = (await getElementsByXPathAsync("//div[@class='xhs-edit__info-footer']//span[text()='确 定']/.."))[0]
        comfirm_el.click()
        await sleep(2000)

        // 再次确定
        const comfirm_twice_el = (await getElementsByXPathAsync("//div[@class='ant-modal-confirm-btns']//span[text()='确 定']/.."))[0]
        comfirm_twice_el.click()
        await sleep(2000)

        // 返回列表页
        const goto_list_el = (await getElementsByXPathAsync("//div[@class='ant-modal-confirm-btns']//span[text()='前往我的任务']/.."))[0]
        goto_list_el.click()
    })
}

// 放弃当前任务
async function abandon_task() {
    const result = await my_post(`https://yyb-api.yilancloud.com/api/article/v1/creative/abandon`, {
        yyb_article_id: now_page_detail_info.yyb_article_id,
        article_project_id: now_page_detail_info.article_project_id,
    })
    // 返回上一页
    window.history.back()
}

// ========================================== 小红书相关 ===========================================
// 详情页跳转到小红书
async function goto_xhs(keyword) {
    await navigator.clipboard.writeText(now_task_keyword.value)
    const urlPart = 'www.xiaohongshu.com'
    chrome.runtime.sendMessage(import.meta.env.VITE_CHROME_PLUGIN_ID, { action: 'activateTab', urlPart: urlPart }, response => {
        GM_setValue('xhs', 'true')
    })
}
// 监听页面变化，页面滚动后需要重新加载
function setupMutationObserver() {
    const targetNode = document.body // 监听整个body的变化
    const config = { childList: true, subtree: true }

    const throttledChangeXhsListStyle = throttle(changeXhsListStyle, 1000)

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length > 0) {
                throttledChangeXhsListStyle()
            }
        })
    })

    observer.observe(targetNode, config)
}
setupMutationObserver()
// 添加图片数量
function changeXhsListStyle() {
    const list = document.querySelectorAll('.note-item')

    list.forEach(item => {
        let id = ''
        try {
            id = item.children[0].children[0].href.split('/')
            id = id[id.length - 1]
        } catch (error) {
            // console.error('Error extracting ID:', error)
        }

        const imageNum = idToImageNumMap.get(id) // 通过ID快速查找image_num
        if (imageNum !== undefined && item.querySelector('.img-count') === null) {
            const countEl = document.createElement('div')
            countEl.className = imageNum >= imgMinNum.value ? 'img-count' : 'img-count img-count-default'
            countEl.textContent = imageNum
            item.appendChild(countEl)
        }
    })
}
// ========================================== 其它功能处理 ===========================================
// 是否显示menu菜单
const show_menu = ref(true)
show_menu_if()
function show_menu_if() {
    if (location.href.includes('ai.openvam.com')) {
        show_menu.value = true
    } else {
        show_menu.value = false
    }
}

// 进入详情页的默认操作
async function detail_init_todos() {
    // 1.设置标题
    await changeTitle(task_titles.value[0])

    ElMessage.success('即将跳转到小红书...')

    await sleep(1000)

    // 2.跳转小红书
    goto_xhs()

    // 3.修改封面
    change_cover()
}

// 豆包添加复制按钮
add_doubao_copy_button()
async function add_doubao_copy_button() {
    if (location.href.includes('www.doubao.com')) {
        // 创建一个 MutationObserver 实例
        const observer = new MutationObserver(mutationsList => {
            mutationsList.forEach(mutation => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const copyButton = node.querySelector("button[data-testid='message_action_copy']")
                            if (copyButton && !copyButton.hasAttribute('copy-button-added')) {
                                // 创建并插入新的按钮
                                const button = document.createElement('button')
                                button.innerText = '复制文案'
                                button.className = 'copy-markdown-button'
                                button.addEventListener('click', async () => {
                                    copyButton.click()
                                    const result = await my_post(import.meta.env.VITE_PTYHON_API_URL + '/change_markdown')
                                    ElMessage.success('复制完成')
                                })
                                copyButton.parentNode.appendChild(button)
                                copyButton.parentNode.style.height = '20px'
                                copyButton.setAttribute('copy-button-added', 'true')
                            }
                        }
                    })
                }
            })
        })

        // 配置观察选项
        const config = { childList: true, subtree: true }

        // 选择目标节点（通常是包含动态内容的父容器）
        const targetNode = (await getElementsByXPathAsync("//div[contains(@class,'container')]/div[contains(@class,'inter-')]//div[contains(@class,'inter-')]"))[0]

        // 开始观察
        if (targetNode) {
            observer.observe(targetNode, config)
        } else {
            console.error('Target node not found')
        }
    }
}

onMounted(() => {
    // 详情页面给输入框的按键监听了一些东西，导致无法左右移动，这里处理一下
    const inputElements = document.querySelectorAll('.el-input__inner') // 获取输入框的 DOM 元素
    inputElements.forEach(inputElement => {
        inputElement.addEventListener(
            'keyup',
            event => {
                event.stopPropagation()
            },
            true,
        )
        inputElement.addEventListener(
            'keydown',
            event => {
                event.stopPropagation()
            },
            true,
        )
    })
})
</script>

<template>
    <div class="image-text-container" v-if="show_menu">
        <el-button type="success" @click="getTitles()" v-loading="task_titles_loading" :disabled="task_titles_loading">获取延伸标题</el-button>
        <div class="title-list">
            <div class="title-one" v-for="item in task_titles" :key="item" @click="changeTitle(item)">
                {{ item }}
            </div>
        </div>
        <div class="title-input">
            <el-input v-model="now_title" placeholder="请输入标题"></el-input>
            <el-button size="small" @click="changeTitle(now_title)">修改标题</el-button>
        </div>

        <el-button type="danger" @click="change_cover()" v-loading="cover_loading" :disabled="cover_loading">修改封面</el-button>
        <el-button type="warning" @click="goto_xhs()">跳转到小红书</el-button>
        <el-button type="primary" @click="goto_doubao()">跳转豆包</el-button>
        <!-- <el-button type="primary" @click="goto_qianwen()">跳转通义千问</el-button> -->
        <el-button type="primary" @click="goto_yiyan()">跳转文心一言</el-button>
        <el-button type="danger" @click="abandon_task()">放弃任务</el-button>
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

.my-get-task-button {
    border: none;
    background: #0099ff;
    color: #fff;
    height: 32px;
    margin-left: 20px;
    cursor: pointer;
    width: 120px;
    /* display: inline-block; */
}

.my-get-task-button:nth-of-type(1) {
    width: 150px;
    margin-left: 0px;
}

.title-input {
    margin-bottom: 10px;
    width: 100%;

    .el-input {
        width: 100%;
        margin-bottom: 2px;

        .el-input__inner {
            font-size: 10px;
            width: 100%;
        }
    }
}

.delete-download-dir-btn {
    border: 1px solid red;
    border-radius: 5px;
    width: 100px;
    margin-right: 5px;
    margin-left: 5px;
    cursor: pointer;
    background-color: crimson;
    color: #fff;
}
.copy-markdown-button {
    width: 120px;
    height: 30px;
    background-color: #0099ff;
    color: #fff;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    overflow: visible;
    z-index: 999;
}
</style>
