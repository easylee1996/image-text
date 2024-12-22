from pathlib import Path

def clear_download_directory():
    """清空 download 目录"""
    current_dir = Path(__file__).resolve().parent
    download_dir = current_dir / "download"
    
    if download_dir.exists():
        for file in download_dir.glob("*"):
            try:
                file.unlink()
                print(f"Deleted {file}")
            except Exception as e:
                print(f"Error deleting {file}: {e}")

def on_starting(server):
    """Gunicorn 启动时执行的钩子"""
    clear_download_directory()

# 其他 Gunicorn 配置项
bind = "0.0.0.0:6174"
workers = 3