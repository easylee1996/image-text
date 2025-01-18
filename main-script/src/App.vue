<script setup>
import { GM_xmlhttpRequest, GM_getResourceURL, GM_addValueChangeListener, GM_setValue, GM_getValue, GM_openInTab } from '$'
import { ref, h, onMounted } from 'vue'
import { getElementsByXPathAsync, sleep } from './utils/utils'
import Cookies from 'js-cookie'
import { throttle, debounce } from 'lodash'
import { ElMessage, ElNotification } from 'element-plus'

// 任务页
const task_titles = ref([]) // 当前任务AI生成标题列表
const now_title = ref('') // 当前页面标题
const task_titles_loading = ref(false) // 当前任务AI生成标题列表加载状态
const now_task_keyword = ref('') // 当前任务关键词
let token = Cookies.get('enterprise_yyb_token') // 企业TOKEN
let Teamid = Cookies.get('TeamId') // 团队ID
let now_page_detail_info = {
    article_project_id: 'ql3v5Roy7RaK',
}
let change_cover_image_obj = {} // 封面图片对象信息，提交时用于替换原本的封面信息
let save_is_change_cover = false // 判断本次包含，是否有封面信息需要修改，没有则不传上面的封面对象
let now_page = '' // 当前所在的网页
let globalPopup = null // 任务列表页，全局公用弹窗
const autoGetTask = ref(true) // 是否自动获取任务
const listScope = ref('all') // 任务列表范围，all：全部，firstHalf：前半部分，secondHalf：后半部分
// 小红书
let idToImageNumMap = new Map()
const imgMinNum = ref(0)

// ========================================== 公用方法 ===========================================
// 获取相关初始配置
getInitValue()
function getInitValue() {
    // 自动获取任务
    autoGetTask.value = GM_getValue('autoGetTask', true)
    // 任务列表范围
    listScope.value = GM_getValue('listScope', 'all')
}
// 切换自动获取配置
function autoGetTaskChange(e) {
    if (listScope.value !== 'all') {
        ElMessage.warning('已开启多人协作，无法启用自动获取任务')
        autoGetTask.value = false
        GM_setValue('autoGetTask', false)
        return
    }
    GM_setValue('autoGetTask', e)
}
// 多人协作配置
function listScopeChange(e) {
    if (e !== 'all') {
        ElMessage.warning('非全部任务列表，已自动关闭自动获取任务')
        GM_setValue('autoGetTask', false)
        autoGetTask.value = false
    }
    GM_setValue('listScope', e)
}
// 判断当前页面
getNowPage()
function getNowPage() {
    const url = window.location.href
    if (url.includes('www.xiaohongshu.com')) {
        now_page = 'xiaohongshu'

        // 监听页面滚动，重新获取图片数量
        listen_xiaohongshu_number()
        // 劫持请求
        interceptRequest()
        // 增加小红书左侧列表相关按钮
        add_xhs_left_list_buttons()
        // 增加小红书弹窗相关按钮
        add_xhs_dialog_list_buttons()
    } else if (url.includes('www.doubao.com')) {
        now_page = 'doubao'
    } else if (url.includes('yiyan.baidu.com')) {
        now_page = 'yiyan'
    } else if (url.includes('tongyi.aliyun.com')) {
        now_page = 'tongyi'
    } else if (url.includes('ai.openvam.com')) {
        now_page = 'task'
        // 劫持请求
        interceptRequest()
    }
}
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
// 劫持请求
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
            if (autoGetTask.value) get_task_limit()
            this.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    const res = JSON.parse(this.responseText) // 当前 xhr 对象上定义 responseText
                    Object.defineProperty(this, 'responseText', {
                        writable: true,
                    })

                    // 多人协作，一个人显示一半的任务
                    let midIndex = Math.ceil(res.data.tasks.length / 2)
                    if (listScope.value === 'firstHalf') {
                        res.data.tasks = res.data.tasks.slice(0, midIndex)
                    } else if (listScope.value === 'secondHalf') {
                        res.data.tasks = res.data.tasks.slice(midIndex)
                    }

                    this.responseText = JSON.stringify(res)

                    // 添加事件
                    listen_table_hover()
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
            // 修改封面
            if (save_is_change_cover) {
                data.contents[1] = change_cover_image_obj
                save_is_change_cover = false
            }
            arguments[0] = JSON.stringify(data)
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
    const result0 = await my_post(import.meta.env.VITE_PTYHON_API_URL + '/generate_cover', { title: now_title.value })
    console.log(result0)

    // 1.获取阿里云 oss 地址
    const result1 = await my_post(`https://yyb-api.yilancloud.com/api/ai/v1/draw/image/upload`, { file_name: result0.filename, content_type: 'image/webp' })

    // 2.上传到阿里云 oss
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
        // add_goto_xhs_button(tr)
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
const get_task_limit = throttle(get_task, 1000)

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
    await navigator.clipboard.writeText(now_title.value)

    const title_el = (await getElementsByXPathAsync('/html/body/div[1]/section/div[2]/section/main/div/div/div[1]/div/div/div[1]/div[1]/div[2]/div[1]/div/div/div[3]/div'))[0]
    title_el.focus()
    title_el.focus()

    await my_post(import.meta.env.VITE_PTYHON_API_URL + '/empty_and_paste_content')
}

// ========================================== 页面跳转 和 进入页面 ===========================================
// 详情页跳转到小红书
async function goto_xhs(keyword) {
    GM_setValue('xhs', 'true')
    await navigator.clipboard.writeText(now_task_keyword.value)
    const urlPart = 'www.xiaohongshu.com'
    chrome.runtime.sendMessage(import.meta.env.VITE_CHROME_PLUGIN_ID, { action: 'activateTab', urlPart: urlPart }, response => {
        GM_setValue('xhsBackTabId', response.tabId)
        GM_setValue('xhsBackWindowId', response.windowId)
    })
}
// 跳转文心一言
async function goto_yiyan() {
    GM_setValue('yiyan', 'true')
    await navigator.clipboard.writeText(now_task_keyword.value)
    const urlPart = 'yiyan.baidu.com'
    chrome.runtime.sendMessage(import.meta.env.VITE_CHROME_PLUGIN_ID, { action: 'activateTab', urlPart: urlPart }, response => {
        GM_setValue('aiBackTabId', response.tabId)
        GM_setValue('aiBackWindowId', response.windowId)
    })
}
// 跳转豆包
async function goto_doubao() {
    GM_setValue('doubao', 'true')
    await navigator.clipboard.writeText(now_task_keyword.value)
    const urlPart = 'www.doubao.com'
    chrome.runtime.sendMessage(import.meta.env.VITE_CHROME_PLUGIN_ID, { action: 'activateTab', urlPart: urlPart }, response => {
        GM_setValue('aiBackTabId', response.tabId)
        GM_setValue('aiBackWindowId', response.windowId)
    })
}
// 跳转通义千问
async function goto_qianwen() {
    GM_setValue('tongyi', 'true')
    await navigator.clipboard.writeText(now_task_keyword.value)
    const urlPart = 'tongyi.aliyun.com'
    chrome.runtime.sendMessage(import.meta.env.VITE_CHROME_PLUGIN_ID, { action: 'activateTab', urlPart: urlPart }, response => {
        GM_setValue('aiBackTabId', response.tabId)
        GM_setValue('aiBackWindowId', response.windowId)
    })
}
// 从豆包跳转到上一个标签tab - 复制内容
async function go_back_tab_from_doubao() {
    GM_setValue('ai_content', 'true')
    if (!GM_getValue('aiBackTabId') || !GM_getValue('aiBackWindowId')) {
        ElMessage.error('没有找到上一个标签页')
        return
    }
    chrome.runtime.sendMessage(
        import.meta.env.VITE_CHROME_PLUGIN_ID,
        { action: 'backTab', tabId: GM_getValue('aiBackTabId'), windowId: GM_getValue('aiBackWindowId') },
        response => {},
    )
}
// 从豆包跳转到上一个标签tab - 不复制内容
async function go_back_tab_from_doubao_no_copy() {
    if (!GM_getValue('aiBackTabId') || !GM_getValue('aiBackWindowId')) {
        ElMessage.error('没有找到上一个标签页')
        return
    }
    chrome.runtime.sendMessage(
        import.meta.env.VITE_CHROME_PLUGIN_ID,
        { action: 'backTab', tabId: GM_getValue('aiBackTabId'), windowId: GM_getValue('aiBackWindowId') },
        response => {},
    )
}
// 从小红书跳转回文章详情页
async function go_back_tab_from_xhs() {
    if (!GM_getValue('xhsBackTabId') || !GM_getValue('xhsBackWindowId')) {
        ElMessage.error('没有找到上一个标签页')
        return
    }
    chrome.runtime.sendMessage(
        import.meta.env.VITE_CHROME_PLUGIN_ID,
        { action: 'backTab', tabId: GM_getValue('xhsBackTabId'), windowId: GM_getValue('xhsBackWindowId') },
        response => {},
    )
}
// 监听从主页面跳转过来，自动执行输入操作
listen_auto_input()
async function listen_auto_input() {
    document.addEventListener('visibilitychange', async () => {
        if (document.visibilityState === 'visible') {
            // 监听来自主页的标题 - 小红书
            if (GM_getValue('xhs') == 'true') {
                GM_setValue('xhs', 'false')
                // 搜索内容
                const editableDiv = (await getElementsByXPathAsync("//input[@id='search-input']"))[0]
                editableDiv.focus()
                editableDiv.focus()
                await my_post(import.meta.env.VITE_PTYHON_API_URL + '/xhs_search')

                // 清空小红书上次的残余数据
                idToImageNumMap = new Map()
                // 删除下载目录
                empty_download_dir()
            }
            // 监听来自主页的标题 - 豆包
            if (GM_getValue('doubao') == 'true') {
                GM_setValue('doubao', 'false')
                const editableDiv = (await getElementsByXPathAsync("//textarea[@data-testid='chat_input_input']"))[0]
                editableDiv.focus()
                editableDiv.focus()
                await my_post(import.meta.env.VITE_PTYHON_API_URL + '/empty_paste_and_enter')
            }
            // 监听来自主页的标题 - 文心一言
            if (GM_getValue('yiyan') == 'true') {
                GM_setValue('yiyan', 'false')
                const editableDiv = (await getElementsByXPathAsync("//*[@id='eb_model_footer']/div[4]/div[3]/div/div/div/div[3]/div[1]/div/div"))[0]
                editableDiv.focus()
                editableDiv.focus()
                await my_post(import.meta.env.VITE_PTYHON_API_URL + '/empty_paste_and_enter')
            }
            // 监听来自主页的标题 - 通义千问    存在偶发无法注入脚本问题，后期再解决，暂时没有使用千问进行生成
            if (GM_getValue('tongyi') == 'true') {
                GM_setValue('tongyi', 'false')
                const editableDiv = (await getElementsByXPathAsync("//*[@id='tongyiPageLayout']/div[3]/div/div[2]/div[1]/div[3]/div[2]/div/div[2]/div/textarea"))[0]
                editableDiv.focus()
                editableDiv.focus()
                await my_post(import.meta.env.VITE_PTYHON_API_URL + '/empty_paste_and_enter')
            }
            // 监听来自AI页面的内容 - 任务页面
            if (GM_getValue('ai_content') == 'true') {
                GM_setValue('ai_content', 'false')
                const editableDiv = (
                    await getElementsByXPathAsync('/html/body/div[1]/section/div[2]/section/main/div/div/div[1]/div/div/div[1]/div[1]/div[3]/div[1]/div/div[3]/div')
                )[0]
                editableDiv.focus()
                editableDiv.focus()
                await my_post(import.meta.env.VITE_PTYHON_API_URL + '/empty_and_paste_content')
            }
        }
    })
}

// ========================================== 详情页相关处理 ===========================================
// 监听点击审核，自动执行后续操作
async function listen_save_check() {
    const check_el = (await getElementsByXPathAsync("//*[@id='root']/section/div[2]/section/main/div/div/div[1]/div/div/div[1]/div[2]/button[2]"))[0]

    check_el.addEventListener('click', async () => {
        // 确定元素
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

// 监听小红书帖子列表变化
async function listen_xiaohongshu_number() {
    const targetNode = document.body
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
// 增加小红书左侧列表相关按钮
async function add_xhs_left_list_buttons() {
    const clearEl = document.querySelector('.xhs-clear-cache')
    if (!clearEl) {
        // 清除小红书缓存
        const clearCacheButton = document.createElement('button')
        clearCacheButton.className = 'xhs-clear-cache el-button el-button--danger'
        clearCacheButton.textContent = '清除小红书缓存'
        clearCacheButton.addEventListener('click', async () => {
            chrome.runtime.sendMessage(import.meta.env.VITE_CHROME_PLUGIN_ID, { action: 'clearCache' }, response => {
                ElMessage.success('清除成功')
            })
        })
        // 增加返回主页按钮
        const goBackButton = document.createElement('button')
        goBackButton.className = 'xhs-clear-cache el-button el-button--success'
        goBackButton.textContent = '返回主页文章'
        goBackButton.addEventListener('click', async () => {
            go_back_tab_from_xhs()
        })

        const xhsButtonList = (await getElementsByXPathAsync("//div[contains(@class, 'xhs-download-container')]"))[0]
        xhsButtonList.appendChild(clearCacheButton)
        xhsButtonList.appendChild(goBackButton)
    }
}
// 增加小红书弹窗内相关按钮
async function add_xhs_dialog_list_buttons() {
    const clearEl = document.querySelector('.empty-download-file')
    if (!clearEl) {
        // 清空下载目录
        const emptyBtn = document.createElement('button')
        emptyBtn.className = 'empty-download-file el-button el-button--danger'
        emptyBtn.textContent = '清空下载目录'
        emptyBtn.addEventListener('click', async () => {
            empty_download_dir()
        })

        const xhsButtonList = (await getElementsByXPathAsync("//div[@class='xhs-btns']"))[0]
        xhsButtonList.appendChild(emptyBtn)
    }
}
// ========================================== 其它功能处理 ===========================================

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

// 复制豆包文案
async function copy_doubao() {
    const copyButtons = document.querySelectorAll("button[data-testid='message_action_copy']")
    if (copyButtons.length > 0) {
        copyButtons[copyButtons.length - 1].click()
        const result = await my_post(import.meta.env.VITE_PTYHON_API_URL + '/change_markdown')
        ElMessage.success('复制完成')
    }
}
// 复制豆包文案并返回上一次的页面
async function copy_doubao_and_back() {
    await copy_doubao()
    await go_back_tab_from_doubao()
}

// 清空下载目录
async function empty_download_dir() {
    await my_post(import.meta.env.VITE_PTYHON_API_URL + '/delete_download')
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
    <div class="image-text-container" v-if="now_page === 'task' || now_page === 'doubao'">
        <template v-if="now_page === 'task'">
            <div class="auto-get">
                <span>协作</span>
                <el-radio-group v-model="listScope" size="small" @change="listScopeChange">
                    <el-radio-button :value="'all'">全部</el-radio-button>
                    <el-radio-button :value="'firstHalf'">前</el-radio-button>
                    <el-radio-button :value="'secondHalf'">后</el-radio-button>
                </el-radio-group>
            </div>
            <div class="auto-get">
                <span>自动获取</span>
                <el-radio-group v-model="autoGetTask" size="small" @change="autoGetTaskChange">
                    <el-radio-button :value="true">是</el-radio-button>
                    <el-radio-button :value="false">否</el-radio-button>
                </el-radio-group>
            </div>
            <!-- 获取衍生AI标题 -->
            <!-- <el-button type="success" @click="getTitles()" v-loading="task_titles_loading" :disabled="task_titles_loading">获取延伸标题</el-button> -->
            <div class="title-list">
                <div class="title-one" v-for="item in task_titles" :key="item" @click="changeTitle(item)">
                    {{ item }}
                </div>
            </div>
            <el-button type="success" @click="changeTitle(now_title)">修改标题</el-button>
            <div class="title-input">
                <el-input v-model="now_title" placeholder="请输入标题"></el-input>
            </div>
            <el-button type="danger" @click="change_cover()" v-loading="cover_loading" :disabled="cover_loading">修改封面</el-button>
            <el-button type="primary" @click="goto_xhs()">跳转到小红书</el-button>
            <el-button type="primary" @click="goto_doubao()">跳转豆包</el-button>
            <!-- <el-button type="primary" @click="goto_qianwen()">跳转通义千问</el-button> -->
            <!-- <el-button type="primary" @click="goto_yiyan()">跳转文心一言</el-button> -->
            <!-- <el-button type="success" @click="get_task_limit()">领取50条任务</el-button> -->
            <el-button type="danger" @click="abandon_task()">放弃任务</el-button>
        </template>
        <template v-else-if="now_page === 'doubao'">
            <el-button type="primary" @click="copy_doubao()">复制最后一条文案</el-button>
            <el-button type="success" @click="go_back_tab_from_doubao_no_copy()">返回主页文章</el-button>
            <el-button type="success" @click="copy_doubao_and_back()">复制文案并跳转</el-button>
        </template>
    </div>
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
        margin-bottom: 8px;
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
.xhs-clear-cache {
    width: 98%;
    margin-left: 0px !important;
    margin-top: 5px;
}

.auto-get {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

    & > span {
        margin-right: 10px;
        font-size: 16px;
    }
}
</style>
