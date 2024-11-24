from pathlib import Path
import random
from flask import Flask, request, jsonify, send_from_directory
import json

from cover import goto_download_cover

app = Flask(__name__)

# JSON 文件路径
JSON_FILE_PATH = 'title.json'

# 初始化 JSON 文件，如果文件不存在
try:
    with open(JSON_FILE_PATH, 'r', encoding='utf-8') as file:
        title_data = json.load(file)
except (FileNotFoundError, json.JSONDecodeError):
    title_data = {"received_title": "标题传递不正确，请重试"}
    with open(JSON_FILE_PATH, 'w', encoding='utf-8') as file:
        json.dump(title_data, file, ensure_ascii=False, indent=4)

# 全局设置 CORS 头部
@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# 处理 OPTIONS 请求
@app.route('/<path:path>', methods=['OPTIONS'])
def handle_options(path):
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response, 200

# 定义 POST 接口
@app.route('/api/template/submit_title', methods=['POST'])
async def submit_title():
    if request.method == 'POST':
        # 获取 POST 请求中的 JSON 数据
        data = request.json
        if data and 'title' in data:
            title = data['title']
            # 更新 JSON 文件中的标题
            title_data['received_title'] = title
            with open(JSON_FILE_PATH, 'w', encoding='utf-8') as file:
                json.dump(title_data, file, ensure_ascii=False, indent=4)
                # 下载封面文件
                await goto_download_cover()

            return jsonify({"status":"true","message": "成功传递标题", "title": title}), 200
        else:
            return jsonify({"error": "标题传递不正确"}), 400

# 定义 GET 接口，从本地 JSON 文件中读取数据并返回
@app.route('/api/template/templateList', methods=['GET'])
def get_data():
    if request.method == 'GET':
        try:
            # 读取本地的 JSON 文件
            with open('templateData.json', 'r', encoding='utf-8') as file:
                data = json.load(file)
                choice_one_data = random.choice(data['list'])
                choice_one_data['json']['children'][1]['text'] = title_data['received_title']
                need_data =  {
                    "success": True,
                    "code": 200,
                    "msg": "操作成功",
                    "data": {
                        "records": [
                            choice_one_data
                        ],
                        "total": 1
                    }
                }
            return jsonify(need_data), 200
        except FileNotFoundError:
            return jsonify({"error": "JSON file not found"}), 404
        except json.JSONDecodeError:
            return jsonify({"error": "Failed to parse JSON file"}), 500

# 暴露下载的文件
@app.route('/api/cover/<filename>', methods=['GET'])
def serve_cover(filename):
    current_dir = Path(__file__).resolve().parent
    download_dir = current_dir / "download"
    return send_from_directory(download_dir, filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6174, debug=True)