import asyncio
import json

import aiohttp
from playwright.async_api import async_playwright
from screeninfo import get_monitors


async def save_storage_state():
    """登录并保存缓存登录信息"""
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)  # 启动浏览器
        context = await browser.new_context()
        page = await context.new_page()

        # 打开网站并执行登录操作
        await page.goto("https://ai.openvam.com/vam/login")

        await page.fill("#mobile", "18523136802")

        await page.pause()

        # 保存所有本地信息，包含cookie、localStorage、sessionStorage等
        await context.storage_state(path="storage.json")

        await browser.close()


async def load_storage_state():
    """"""
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)  # 启动浏览器
        context = await browser.new_context(storage_state="storage.json")

        # 使用带有 storage_state 的上下文打开页面
        page = await context.new_page()
        await page.goto(
            "https://ai.openvam.com/vam/ai/tools/text/secondCreation/ql3v5Roy7RaK?secondCreationType=task"
        )

        await page.pause()

        await browser.close()


async def get_task_list():
    """获取任务列表"""

    global task_list
    task_list = []
    # 提取cookie中的teamid和token
    token = None
    with open("storage.json", "r") as file:
        storage_state = json.load(file)
    cookies = storage_state.get("cookies", [])
    for cookie in cookies:
        if cookie["name"] == "enterprise_yyb_token":
            token = cookie["value"]

    # 发起请求
    url = "https://yyb-api.yilancloud.com/api/cms/v1/article/recreate/tasks?audit_status=0&article_project_id=ql3v5Roy7RaK"
    headers = {
        "teamid": "klNjqg9ayQDo",
        "token": token,
    }
    payload = {}
    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers, data=payload) as response:
            # 等待响应内容完全加载
            response_text = await response.json()

    task_list = response_text.get("data", [])["tasks"]
    print(task_list)
    await goto_task_detail(task_list[13])
    # 多线程不支持，研究一下，怎么操作


async def goto_task_detail(task):
    """打开某个指定的详情页面"""

    # 获取屏幕分辨率
    monitor = get_monitors()[0]
    width, height = monitor.width, monitor.height
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(
            storage_state="storage.json",
            permissions=["clipboard-read"],
            viewport={"width": width, "height": height},
        )
        page = await context.new_page()
        await page.goto(
            f"https://ai.openvam.com/vam/ai/tools/text/secondCreation/ql3v5Roy7RaK?secondCreationType=poster&yybArticleId={task['yyb_article_id']}"
        )

        # 关闭ai工具弹窗
        await page.locator(
            "//span[contains(@class,'ai-graphic-original-material__btn-packup')]"
        ).click()

        # 点击编辑图片
        await page.locator("//span[text()='编辑图片']").click()

        # 进入iframe
        now_frame = page.frame_locator("//iframe[@id='chuangkit-design-iframe']")

        # 点击图层按钮
        await now_frame.locator(
            "//div[@class='bottom-tool-item-tips' and text() = '图层']/parent::div"
        ).click()

        # 点击文字图层
        spans = await now_frame.locator("//span[@class='elem-type-text']").all()
        longest_text = ""  # 必须获取最长的文字，因为文字一段被改变，接口中没有了
        error_chars = "/|\\|<|>|?|:|"  # 有的图有一些这种装饰的字符
        for span in spans:
            text = await span.text_content()
            if len(text) > len(longest_text) and not any(
                char in error_chars for char in text
            ):
                longest_text = text

        await now_frame.locator(
            f"//span[@class='elem-type-text' and text() = '{longest_text}']/parent::div"
        ).click()

        # 更改文字
        await asyncio.sleep(5)  # canvas内部的文字，不是元素，无法通过元素来等待
        await now_frame.locator(
            "//div[contains(@class, 'editor-container')]"
        ).dblclick()
        await now_frame.locator(
            "//div[contains(@class, 'editor-container')]"
        ).dblclick()
        await page.keyboard.press("Backspace")
        await page.keyboard.type(task["title"])
        await asyncio.sleep(2)  # 等待写完

        # 对元素进行截图
        await now_frame.locator(
            "//div[contains(@class, 'editor-container')]"
        ).screenshot(path="screenshot.png")

        # 保存
        await now_frame.locator(
            "//span[@class='design-header__control-text' and text() = '下载']"
        ).click()
        await asyncio.sleep(2)
        await now_frame.locator(
            "//span[@class='design-header__control-text' and text() = '下载']"
        ).click(
            timeout=3000
        )  # 3秒没点击，那说明第一次已经成功了

        await page.pause()

        await browser.close()


# 运行异步函数
asyncio.run(get_task_list())
