// 改变标题
export function changeTitle(title) {
    now_title.value = title
    replaceTitleElement()
}

// 替换原生的标题输入框
export function replaceTitleElement() {
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
// 监听标题点击事件
export addTitleEventListener()
function addTitleEventListener() {
    let originElement = null
    const timer = setInterval(() => {
        originElement = document.querySelector('#w-e-textarea-1')
        if (originElement && now_title.value) {
            replaceTitleElement()
            clearInterval(timer)
        }
    }, 100)
}
