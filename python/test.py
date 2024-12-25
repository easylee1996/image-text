import asyncio
from pathlib import Path

from fastapi import Depends, FastAPI
from playwright.async_api import async_playwright

app = FastAPI()

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
    playwright = await async_playwright().start()
    browser = await playwright.chromium.launch(headless=False)
    context = await browser.new_context()


@app.on_event("startup")
async def startup_event():
    # 在应用启动时初始化 Playwright、浏览器和上下文
    await initialize_playwright()


@app.on_event("shutdown")
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


@app.get("/")
async def index(context=Depends(get_playwright_context)):
    page = await context.new_page()
    await page.goto("https://www.baidu.com")
    content = await page.content()
    await page.close()
    return {"content": content}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=6174, log_level="info")
