// 监听来自油猴脚本的消息 这里必须使用onMessageExternal，监听插件自己的消息使用onMessage
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    console.log(message);
    if (message.action === 'activateTab') {
        activateExistingTab(message.urlPart, sendResponse);
        return true; // 表示异步响应
    }
});

function activateExistingTab(urlPart, sendResponse) {
    chrome.tabs.query({}, (tabs) => {
        for (let tab of tabs) {
            // 检查URL是否包含指定的字符串
            if (tab.url && tab.url.includes(urlPart)) {
                chrome.tabs.update(tab.id, { active: true });
                chrome.windows.update(tab.windowId, { focused: true });
                sendResponse({ found: true });
                return;
            }
        }

        // 如果没有找到匹配的标签页，则打开新标签页
        chrome.tabs.create({ url: `https://${urlPart}`, active: true }, () => {
            sendResponse({ found: false });
        });
    });

    // 返回false以确保异步操作完成后可以发送响应
    return true;
}