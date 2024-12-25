import asyncio
import atexit
import random
import string
import time
from pathlib import Path

from check_char_right import judge_char_right
from playwright.async_api import async_playwright
from screeninfo import get_monitors

# 全局变量保存 Playwright 实例、浏览器和上下文
playwright = None
browser = None
context = None
download_dir = None


async def initialize_playwright():
    global playwright, browser, context
    current_dir = Path(__file__).resolve().parent
    download_dir = current_dir / "download"
    download_dir.mkdir(parents=True, exist_ok=True)
    width, height = 1920, 1080
    playwright = await async_playwright().start()
    browser = await playwright.chromium.launch(
        headless=False, downloads_path=str(download_dir)
    )
    context = await browser.new_context(
        viewport={"width": width, "height": height},
    )
    page = await context.new_page()


async def shutdown_event():
    # 在应用关闭时关闭浏览器和上下文并停止 Playwright
    if context:
        await context.close()
    if browser:
        await browser.close()
    if playwright:
        await playwright.stop()


async def get_playwright_context():
    # 依赖注入函数，直接返回已经初始化的上下文
    return context


async def goto_download_cover(title):
    """打开本地封面，然后下载封面图片"""
    global context
    global download_dir
    try:
        # 获取当前脚本文件所在的目录
        print(download_dir)

        page = await context.new_page()

        await page.goto(f"http://127.0.0.1:6174/?title={title}")

        # 生成随机文件名 规则为：时间戳+随机数
        timestamp = str(int(time.time()))
        random_str = "".join(random.choices(string.ascii_letters + string.digits, k=8))
        filename = f"{timestamp}_{random_str}.webp"

        filepath = download_dir / filename

        await page.locator("//*[@id='app']/div").screenshot(path=filepath)

        return filename

    except Exception as e:
        print("发生异常 -> ", e)
    finally:
        await page.close()
