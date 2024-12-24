import random
import string
import time
from pathlib import Path

from playwright.async_api import async_playwright

browser = None
context = None
download_dir = None


async def init_browser():
    global browser, context, download_dir
    width, height = 1920, 1080
    # 设置下载目录
    current_dir = Path(__file__).resolve().parent
    download_dir = current_dir / "download"
    download_dir.mkdir(parents=True, exist_ok=True)

    playwright = await async_playwright().start()
    browser = await playwright.chromium.launch(
        headless=False, downloads_path=str(download_dir)
    )
    context = await browser.new_context(
        viewport={"width": width, "height": height},
    )


async def goto_download_cover(title):
    """打开本地封面，然后下载封面图片"""
    try:
        if not browser:
            await init_browser()

        page = await context.new_page()

        await page.goto(f"http://127.0.0.1:6174/?title={title}")

        # 生成随机文件名 规则为：时间戳+随机数
        timestamp = str(int(time.time()))
        random_str = "".join(random.choices(string.ascii_letters + string.digits, k=8))
        filename = f"{timestamp}_{random_str}.webp"

        filepath = download_dir / filename

        await page.locator("//*[@id='app']/div").screenshot(path=filepath)

        print(f"Renamed file to: {filepath}")
        return filename

    except Exception as e:
        print("发生异常 -> ", e)
    finally:
        await page.close()
