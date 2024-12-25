from pathlib import Path


def clear_download_directory():
    """清空 download 目录"""
    current_dir = Path(__file__).resolve().parent
    download_dir = current_dir / "download"

    if download_dir.exists():
        for file in download_dir.glob("*"):
            try:
                file.unlink()
            except Exception as e:
                print(f"Error deleting {file}: {e}")
