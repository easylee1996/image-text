export function getElementsByXPath(xpath) {
    var result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
    var nodes = []
    var node = result.iterateNext()
    while (node) {
        nodes.push(node)
        node = result.iterateNext()
    }
    return nodes
}

/**
 * 获取异步载入的元素
 *
 * @parma {string} xpath 元素选择器
 * @parma {number} [delayPerMs = 500] 轮询延时
 *
 * @Return {Promise<Element>} 载入的元素
 * */
export function getElementsByXPathAsync(xpath, delayPerMs = 500) {
    return new Promise((resolve, reject) => {
        // 轮询获取元素载入情况
        const getterTimer = setInterval(() => {
            try {
                const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
                const nodes = []
                let node = result.iterateNext()
                while (node) {
                    nodes.push(node)
                    node = result.iterateNext()
                }

                // 如果找到了至少一个元素
                if (nodes.length > 0) {
                    // 清除定时器
                    clearInterval(getterTimer)

                    // 解析 Promise
                    resolve(nodes)
                }
            } catch (error) {
                // 拒绝 Promise 并清除定时器
                clearInterval(getterTimer)
                reject(error)
            }
        }, delayPerMs)
    })
}

// 定义 sleep 函数
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
