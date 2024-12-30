import platform
import random
import string
import time
from pathlib import Path

import send2trash
import uvicorn
from copy_markdown import change_markdown
from fastapi import Depends, FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from my_keyboard import empty_and_paste_content, empty_paste_and_enter, search_xhs
from my_tools import clear_download_directory
from playwright.async_api import async_playwright

app = FastAPI()

# 添加 CORS 中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 全局变量保存 Playwright 实例、浏览器和上下文，跨文件有问题，暂时就放在一个文件中处理
playwright = None
browser = None
context = None
download_dir = None


async def initialize_playwright():
    """初始化浏览器实例"""
    global playwright, browser, context, download_dir
    current_dir = Path(__file__).resolve().parent
    download_dir = current_dir / "download"
    download_dir.mkdir(parents=True, exist_ok=True)
    width, height = 1920, 1080
    playwright = await async_playwright().start()
    browser = await playwright.chromium.launch(
        headless=True, downloads_path=str(download_dir)
    )
    context = await browser.new_context(
        viewport={"width": width, "height": height},
    )
    # 初始化打开一个页面更好，要不然空页面的时候，浏览器会隐藏，每次打开新页面又会显示，浪费时间
    await context.new_page()


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


@app.on_event("startup")
async def startup_event():
    # 清空封面下载目录
    clear_download_directory()
    # 初始化浏览器实例
    await initialize_playwright()


@app.on_event("shutdown")
async def shutdown_event_app():
    await shutdown_event()


# 生成封面
@app.post("/generate_cover")
async def generate_cover(request: Request, context=Depends(get_playwright_context)):
    global download_dir
    data = await request.json()
    title = data.get("title")
    if not title:
        raise HTTPException(status_code=400, detail="标题传递不正确")

    # 下载封面文件
    page = await context.new_page()

    await page.goto(f"http://127.0.0.1:6174/?title={title}")

    # 生成随机文件名 规则为：时间戳+随机数
    timestamp = str(int(time.time()))
    random_str = "".join(random.choices(string.ascii_letters + string.digits, k=8))
    filename = f"{timestamp}_{random_str}.webp"

    filepath = download_dir / filename

    await page.locator("//*[@id='app']/div").screenshot(path=filepath)
    await page.close()

    return JSONResponse(
        content={
            "status": "true",
            "message": "成功传递标题",
            "title": title,
            "filename": filename,
        },
        status_code=200,
    )


# 获取封面图片
@app.get("/api/cover/{filename}")
async def serve_cover(filename: str):
    current_dir = Path(__file__).resolve().parent
    download_dir = current_dir / "download"
    file_path = download_dir / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="文件未找到")
    return FileResponse(file_path)


# 清空内容并粘贴内容
@app.post("/empty_and_paste_content")
async def change_content():
    empty_and_paste_content()
    return JSONResponse(content={"status": "true"}, status_code=200)


# 清空、粘贴并回车
@app.post("/empty_paste_and_enter")
async def change_ai():
    empty_paste_and_enter()
    return JSONResponse(content={"status": "true"}, status_code=200)


@app.post("/xhs_search")
async def xhs_search():
    search_xhs()
    return JSONResponse(content={"status": "true"}, status_code=200)


@app.post("/change_markdown")
async def change_markdown_http():
    change_markdown()
    return JSONResponse(content={"status": "true"}, status_code=200)


@app.post("/delete_download")
async def delete_download():
    os_name = platform.system()

    if os_name == "Windows":
        download_dir = Path.home() / "Downloads"
    elif os_name == "Darwin":  # 'Darwin' 是 macOS 的内部名称
        download_dir = Path.home() / "Downloads"
    else:
        return JSONResponse(
            content={
                "status": "unsupported_os",
                "message": "Unsupported operating system",
            },
            status_code=400,
        )

    if not download_dir.exists():
        return JSONResponse(
            content={"status": "error", "message": "Download directory does not exist"},
            status_code=400,
        )

    for file in download_dir.glob("*"):
        try:
            if file.is_file() or file.is_dir():  # 处理文件或目录
                send2trash.send2trash(str(file))
        except Exception as e:
            return JSONResponse(
                content={
                    "status": "error",
                    "message": f"Failed to move {file} to trash: {e}",
                },
                status_code=500,
            )

    return JSONResponse(
        content={"status": "success", "message": "All files moved to trash"},
        status_code=200,
    )


# 挂载静态文件目录 - 因为路由直接是/，所有要最后挂在，要不然前面的都无效了
app.mount(
    "/", StaticFiles(directory=Path(__file__).parent / "dist", html=True), name="static"
)

if __name__ == "__main__":
    uvicorn.run(
        app="index:app",
        host="0.0.0.0",
        port=6174,
        log_level="error",
        workers=1,
        reload=False,
    )
