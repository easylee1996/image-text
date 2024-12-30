// 监听来自油猴脚本的消息 这里必须使用onMessageExternal，监听插件自己的消息使用onMessage
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    if (message.action === 'activateTab') {
        activateExistingTab(message.urlPart, sender, sendResponse)
        // 确保在上面的方法执行完成之前，不中断消息通道
        return true
    } else if (message.action === 'backTab') {
        backTab(message, sender, sendResponse)
        return true
    } else if (message.action === 'clearCache') {
        clearCache(message, sender, sendResponse)
        return true
    }
})

// 根据url，打开某个tab
function activateExistingTab(urlPart, sender, sendResponse) {
    chrome.tabs.query({}, tabs => {
        for (let tab of tabs) {
            // 检查URL是否包含指定的字符串
            if (tab.url && tab.url.includes(urlPart)) {
                chrome.tabs.update(tab.id, { active: true })
                chrome.windows.update(tab.windowId, { focused: true })
                sendResponse({ found: true, tabId: sender.tab.id, windowId: sender.tab.windowId })
                return
            }
        }

        // 如果没有找到匹配的标签页，则打开新标签页
        chrome.tabs.create({ url: `https://${urlPart}`, active: true }, () => {
            sendResponse({ found: false })
        })
    })

    return true
}

// 返回上一个tab
function backTab(message, sender, sendResponse) {
    chrome.tabs.update(message.tabId, { active: true })
    chrome.windows.update(message.windowId, { focused: true })

    return true
}

// 清除浏览器缓存
function clearCache(message, sender, sendResponse) {
    const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 30
    const ago = new Date().getTime() - millisecondsPerWeek
    const siteOrigin = 'https://www.xiaohongshu.com' // 指定你想清除数据的网站原点
    chrome.browsingData.remove(
        {
            since: ago,
            origins: [siteOrigin],
        },
        {
            appcache: true, // 有的类型原点是不支持的
            cookies: true,
            fileSystems: true,
            indexedDB: true,
            localStorage: true,
            pluginData: false,
            serviceWorkers: true,
        },
        () => {
            console.log('Cache cleared success')
            sendResponse({ status: 'success' })
        },
    )
    return true
}
