import asyncio
import json
import random
import string
import time
from pathlib import Path

import aiohttp
from check_char_right import judge_char_right
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

    # 修改标题
    for task in task_list:
        await goto_task_change_cover(task)
    # check_right = await goto_task_change_cover(task_list[-1])


async def goto_task_change_cover(task):
    """打开某个指定的详情页面
    :param task: 任务信息
    :param check_right: 字符检测不通过，需要重新排版
    """

    # 获取屏幕分辨率
    # monitor = get_monitors()[0]
    # width, height = monitor.width, monitor.height
    try:
        width, height = 1920, 1080
        async with async_playwright() as p:
            # browser = await p.chromium.launch(headless=False)
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(
                storage_state="storage.json",
                permissions=["clipboard-read"],
                viewport={"width": width, "height": height},
            )
            page = await context.new_page()

            await page.goto(
                f"https://ai.openvam.com/vam/ai/tools/text/secondCreation/ql3v5Roy7RaK?secondCreationType=poster&yybArticleId={task['yyb_article_id']}"
            )
            print("进入页面 -> ", task["title"])

            # 1.关闭ai工具弹窗
            await page.locator(
                "//span[contains(@class,'ai-graphic-original-material__btn-packup')]"
            ).click()

            # 2.点击编辑图片
            await page.locator("//span[text()='编辑图片']").click()

            # 进入iframe
            now_frame = page.frame_locator("//iframe[@id='chuangkit-design-iframe']")
            print("进入创客贴 ->", task["title"])

            # 3.点击图层按钮
            await now_frame.locator(
                "//div[@class='bottom-tool-item-tips' and text() = '图层']/parent::div"
            ).click()

            # 4.点击文字图层
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

            # 5.更改文字
            await asyncio.sleep(8)  # canvas内部的文字，需要等待加载字体
            await now_frame.locator(
                "//div[contains(@class, 'editor-container')]"
            ).dblclick()
            await now_frame.locator(
                "//div[contains(@class, 'editor-container')]"
            ).dblclick()

            await page.keyboard.press("Backspace")
            await page.keyboard.type(task["title"])
            await asyncio.sleep(2)  # 不等待，还没输入完，就执行后面了
            print("首次更改文字 -> ", task["title"])

            # 6.对元素进行截图，用于检测，不正确需要重复输入正确排版文字
            await now_frame.locator(
                "//div[contains(@class, 'editor-container')]"
            ).screenshot(path="screenshot.png")

            # 获取排版信息
            check_right = await judge_char_right()
            print("排版检测结果 -> ", task["title"], ": ", check_right)

            if check_right["right"] == False:
                # 点击文字图层 重新获取，因为文字变化了
                spans = await now_frame.locator("//span[@class='elem-type-text']").all()
                longest_text = ""
                error_chars = "/|\\|<|>|?|:|"
                for span in spans:
                    text = await span.text_content()
                    if len(text) > len(longest_text) and not any(
                        char in error_chars for char in text
                    ):
                        longest_text = text

                await now_frame.locator(
                    f"//span[@class='elem-type-text' and text() = '{longest_text}']/parent::div"
                ).click()

                # 选中文字选框
                await now_frame.locator(
                    "//div[contains(@class, 'editor-container')]"
                ).dblclick()
                await now_frame.locator(
                    "//div[contains(@class, 'editor-container')]"
                ).dblclick()

                await page.keyboard.press("Backspace")
                for index, char in enumerate(check_right["chars"]):
                    await page.keyboard.type(char)
                    if index != len(check_right["chars"]) - 1:
                        await page.keyboard.press("Enter")
                await asyncio.sleep(2)
                print("二次更改文字 -> ", task["title"])

            # 7.保存图片
            await now_frame.locator(
                "//span[@class='design-header__control-text' and text() = '下载']"
            ).click()
            await asyncio.sleep(1)
            await now_frame.locator(
                "//span[@class='design-header__control-text' and text() = '下载']"
            ).click(timeout=5000)
            print("保存图片中 ->", task["title"])

            # 8.保存帖子
            await asyncio.sleep(5)
            await page.locator("//span[text()='保 存']").click()
            await asyncio.sleep(2)
            print("保存帖子 -> ", task["title"])

            await browser.close()
            print(
                f"------------------------- {task['title']}结束 ----------------------------------"
            )
    except Exception as e:
        print(
            f"------------------------- {task['title']}结束 ----------------------------------"
        )
        print("发生异常 -> ", task["title"], ":", e)


async def goto_download_cover(title):
    """打开本地封面，然后下载封面图片"""
    try:
        # 获取当前脚本文件所在的目录
        current_dir = Path(__file__).resolve().parent
        download_dir = current_dir / "download"
        download_dir.mkdir(parents=True, exist_ok=True)

        width, height = 1920, 1080
        async with async_playwright() as p:
            # browser = await p.chromium.launch(
            #     headless=False, downloads_path=str(download_dir)
            # )
            browser = await p.chromium.launch(
                headless=True, downloads_path=str(download_dir)
            )
            context = await browser.new_context(
                viewport={"width": width, "height": height},
            )
            page = await context.new_page()

            await page.goto(f"http://127.0.0.1:6174/?title={title}")

            # 生成随机文件名 规则为：时间戳+随机数
            timestamp = str(int(time.time()))
            random_str = "".join(
                random.choices(string.ascii_letters + string.digits, k=8)
            )
            filename = f"{timestamp}_{random_str}.webp"

            filepath = download_dir / filename

            await page.locator("//*[@id='app']/div").screenshot(path=filepath)

            print(f"Renamed file to: {filepath}")
            return filename

    except Exception as e:
        print("发生异常 -> ", e)


# 运行异步函数
# asyncio.run(goto_download_cover())
