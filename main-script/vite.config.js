import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import monkey, { cdn, util } from 'vite-plugin-monkey'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': pathSrc,
        },
    },
    plugins: [
        vue(),
        // bug: 本身是不需要引入的，但是不引入，弹窗提示之类的没有样式，只能引入一下
        ElementPlus(),
        AutoImport({
            // Auto import functions from Vue, e.g. ref, reactive, toRef...
            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ['vue'],

            // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
            // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
            resolvers: [
                ElementPlusResolver(),

                // Auto import icon components
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon',
                }),
            ],

            dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
        }),

        Components({
            resolvers: [
                // Auto register icon components
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
                // Auto register Element Plus components
                // 自动导入 Element Plus 组件
                ElementPlusResolver(),
            ],

            dts: path.resolve(pathSrc, 'components.d.ts'),
        }),

        Icons({
            autoInstall: true,
        }),
        monkey({
            entry: 'src/main.js',
            userscript: {
                icon: 'https://vitejs.dev/logo.svg',
                namespace: 'npm/vite-plugin-monkey',
                match: [
                    'http*://ai.openvam.com/*',
                    'http*://*.chuangkit.com/*',
                    'http*://yiyan.baidu.com/*',
                    'http*://*.xiaohongshu.com/*',
                    'http*://*.doubao.com/*',
                    'http*://tongyi.aliyun.com/',
                ],
                connect: ['api.coze.cn', 'yyb-api.yilancloud.com', 'vam-img.oss-cn-beijing.aliyuncs.com', 'vam-material.oss-cn-beijing.aliyuncs.com', 'localhost'], // 不能填写 http 协议和后缀，只能填纯域名
            },
            build: {
                externalGlobals: {
                    vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js').concat(util.dataUrl(';window.Vue=Vue;')),
                    'element-plus': cdn.jsdelivr('ElementPlus', 'dist/index.full.min.js'),
                },
            },
        }),
    ],
})
