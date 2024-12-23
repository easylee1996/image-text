import platform
from pathlib import Path

import send2trash
from copy_markdown import change_markdown
from cover import goto_download_cover
from flask import Flask, jsonify, request, send_from_directory
from my_keyboard import input_ai, paste_title, search_xhs

app = Flask(__name__, static_folder="dist", static_url_path="")


# 全局设置 CORS 头部
@app.after_request
def add_cors_headers(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    return response


# 处理 OPTIONS 请求
@app.route("/<path:path>", methods=["OPTIONS"])
def handle_options(path):
    response = jsonify({})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    return response, 200


# 生成封面并返回标题
@app.route("/api/template/submit_title", methods=["POST"])
async def submit_title():
    if request.method == "POST":
        # 获取 POST 请求中的 JSON 数据
        data = request.json
        if data and "title" in data:
            title = data["title"]

            # 下载封面文件
            filename = await goto_download_cover(title)

            return (
                jsonify(
                    {
                        "status": "true",
                        "message": "成功传递标题",
                        "title": title,
                        "filename": filename,
                    }
                ),
                200,
            )
        else:
            return jsonify({"error": "标题传递不正确"}), 400


# 生成的封面
@app.route("/api/cover/<filename>", methods=["GET"])
def serve_cover(filename):
    current_dir = Path(__file__).resolve().parent
    download_dir = current_dir / "download"
    return send_from_directory(download_dir, filename)


# 提供静态文件，访问封面生成器
@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")


# 切换标题
@app.route("/paste_title", methods=["POST"])
def change_title():
    paste_title()
    return jsonify({"status": "true"}), 200


# 豆包模拟输入
@app.route("/input_ai", methods=["POST"])
def change_ai():
    input_ai()
    return jsonify({"status": "true"}), 200


# 小红书搜索
@app.route("/xhs_search", methods=["POST"])
def xhs_search():
    search_xhs()
    return jsonify({"status": "true"}), 200


# 改变markdown内容
@app.route("/change_markdown", methods=["POST"])
def change_markdown_http():
    change_markdown()
    return jsonify({"status": "true"}), 200


# 删除下载目录
@app.route("/delete_download", methods=["POST"])
def delete_download():
    # 检测操作系统类型
    os_name = platform.system()

    if os_name == "Windows":
        # Windows系统的下载目录
        download_dir = Path.home() / "Downloads"
    elif os_name == "Darwin":  # 'Darwin' 是 macOS 的内部名称
        # macOS系统的下载目录
        download_dir = Path.home() / "Downloads"
    else:
        # 对于其他操作系统，你可以选择不执行任何操作，或者指定一个默认路径
        return (
            jsonify(
                {"status": "unsupported_os", "message": "Unsupported operating system"}
            ),
            400,
        )

    # 确保目录存在
    if not download_dir.exists():
        return (
            jsonify(
                {"status": "error", "message": "Download directory does not exist"}
            ),
            400,
        )

    # 删除下载目录中的所有文件，移动到回收站
    for file in download_dir.glob("*"):
        try:
            if file.is_file():  # 只处理文件
                send2trash.send2trash(str(file))  # 使用 send2trash 将文件移动到回收站
            elif file.is_dir():
                # 如果你想删除目录及其内容，请确保这是你想要的行为
                # 并且在生产环境中谨慎使用
                send2trash.send2trash(str(file))  # 使用 send2trash 将目录移动到回收站
        except Exception as e:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": f"Failed to move {file} to trash: {e}",
                    }
                ),
                500,
            )

    return jsonify({"status": "success", "message": "All files moved to trash"}), 200


# if __name__ == "__main__":
#     # 清空 download 目录
#     current_dir = Path(__file__).resolve().parent
#     download_dir = current_dir / "download"
#     for file in download_dir.glob("*"):
#         file.unlink()

#     app.run(host="0.0.0.0", port=6174, debug=True)
