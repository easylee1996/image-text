<template>
    <div class="container">
        <div class="content" :style="contentStyle">
            <div class="text-box" :style="textBoxStyleComputed">{{ textContent }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const coverTextStyleList = [
    {
        id: 0,
        top: '100px',
        left: '40px',
        fontStyle: 'Arial',
        fontSize: '120px',
        width: '1140px',
        height: '500px',
        lineHeight: 1.4,
        notLength: [10, 19],
        macNotLength: [11, 21],
    },
    {
        id: 1,
        top: '450px',
        left: '200px',
        fontStyle: 'Arial',
        fontSize: '120px',
        width: '850px',
        height: '660px',
        lineHeight: 1.4,
        notLength: [8, 15, 22],
        macNotLength: [8, 15, 22],
    },
    {
        id: 2,
        top: '450px',
        left: '240px',
        fontStyle: 'Arial',
        fontSize: '120px',
        width: '820px',
        height: '680px',
        lineHeight: 1.4,
        notLength: [7, 13, 19],
        macNotLength: [8, 15, 22],
    },
    {
        id: 3,
        top: '300px',
        left: '180px',
        fontStyle: 'Arial',
        fontSize: '110px',
        width: '900px',
        height: '620px',
        lineHeight: 1.4,
        notLength: [9, 17],
        macNotLength: [9, 17],
    },
    {
        id: 4,
        top: '120px',
        left: '50px',
        fontStyle: 'Arial',
        fontSize: '120px',
        width: '1150px',
        height: '520px',
        lineHeight: 1.4,
        notLength: [10, 19],
        macNotLength: [11, 21],
    },
    {
        id: 5,
        top: '100px',
        left: '50px',
        fontStyle: 'Arial',
        fontSize: '120px',
        width: '1150px',
        height: '520px',
        lineHeight: 1.4,
        notLength: [10, 19],
        macNotLength: [11, 21],
    },
    {
        id: 6,
        top: '520px',
        left: '130px',
        fontStyle: 'Arial',
        fontSize: '120px',
        width: '980px',
        height: '720px',
        lineHeight: 1.4,
        notLength: [9, 17],
        macNotLength: [9, 17],
    },
    {
        id: 7,
        top: '320px',
        left: '100px',
        fontStyle: 'Arial',
        fontSize: '120px',
        width: '1040px',
        height: '720px',
        lineHeight: 1.4,
        notLength: [9, 17],
        macNotLength: [10, 19],
    },
    {
        id: 8,
        top: '420px',
        left: '160px',
        fontStyle: 'Arial',
        fontSize: '120px',
        width: '1000px',
        height: '720px',
        lineHeight: 1.4,
        transform: 'rotate(6deg)',
        notLength: [9, 17],
        macNotLength: [9, 17],
    },
    {
        id: 9,
        top: '320px',
        left: '100px',
        fontStyle: 'Arial',
        fontSize: '120px',
        width: '1060px',
        height: '680px',
        lineHeight: 1.3,
        notLength: [9, 17],
        macNotLength: [10, 19],
    },
    {
        id: 10,
        top: '500px',
        left: '130px',
        fontStyle: 'Arial',
        fontSize: '120px',
        width: '950px',
        height: '680px',
        lineHeight: 1.6,
        notLength: [8, 15, 22],
        macNotLength: [9, 17, 25],
    },
    {
        id: 11,
        top: '500px',
        left: '200px',
        fontStyle: 'Arial',
        fontSize: '120px',
        width: '800px',
        height: '680px',
        lineHeight: 1.6,
        notLength: [7, 13, 19],
        macNotLength: [8, 15, 22],
    },
]

// 初始化数据
const textContent = ref('')
const textBoxStyle = ref({})
const imageSrc = ref('')

// 获取接口数据
onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const params = {}
    for (const [key, value] of urlParams.entries()) {
        params[key] = value
    }

    textContent.value = params.title

    // 判断电脑系统版本, mac无头模式，字体排版样式不一样，导致换行的字数不一样,所以必须分别设置
    const userAgent = navigator.userAgent.toLowerCase()
    const isMac = userAgent.includes('mac') ? true : false

    console.log(11111, isMac, textContent.value.length)

    const filterCoverTextStyleList = coverTextStyleList.filter(item => {
        if (isMac) return !item.macNotLength.includes(textContent.value.length)
        return !item.notLength.includes(textContent.value.length)
    })

    // 随机获取coverTextStyleList中的一个
    const randomIndex = Math.floor(Math.random() * filterCoverTextStyleList.length)
    const randomId = filterCoverTextStyleList[randomIndex].id
    imageSrc.value = `/cover_images/${randomId}.jpeg`
    textBoxStyle.value = filterCoverTextStyleList[randomIndex]
})

// 背景样式
const contentStyle = computed(() => ({
    backgroundImage: `url(${imageSrc.value})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}))

// 文字样式
const textBoxStyleComputed = computed(() => ({
    ...textBoxStyle.value,
}))
</script>

<style scoped>
.container {
    width: 1242px;
    height: 1660px;
    position: relative;
}

.content {
    width: 100%;
    height: 100%;
    position: relative;
}

.text-box {
    position: absolute;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
