import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 兼容处理
// 当开启 document-start之后，脚本会在document.body出现之前出现，会报错
// 所以这里做一个兼容处理，如果document.body不存在，则等待50毫秒后再次尝试挂载
// 必须要开启document-start的原因是小红书的接口请求优先级很高，所以需要尽早请求
// 这里50毫秒就重新请求，也是为了快于小红书的接口请求
try {
    createApp(App).mount(
        (() => {
            const app = document.createElement('div')
            document.body.append(app)
            return app
        })(),
    )
} catch (e) {
    console.error(e)
    const timer = setInterval(() => {
        if (document?.body) {
            createApp(App).mount(
                (() => {
                    const app = document.createElement('div')
                    document.body.append(app)
                    return app
                })(),
            )
            clearInterval(timer)
        }
    }, 50)
}
