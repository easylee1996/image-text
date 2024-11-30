from pathlib import Path

from cover import goto_download_cover
from flask import Flask, jsonify, request, send_from_directory
from my_keyboard import paste_title

app = Flask(__name__, static_folder="cover-generate/dist", static_url_path="")


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


# 定义 POST 接口
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

@app.route('/paste_title', methods=['POST'])
def change_title():
    paste_title()
    return jsonify({"status": "true"}), 200


if __name__ == "__main__":
    # 清空 download 目录
    current_dir = Path(__file__).resolve().parent
    download_dir = current_dir / "download"
    for file in download_dir.glob("*"):
        file.unlink()

    app.run(host="0.0.0.0", port=6174, debug=True)
