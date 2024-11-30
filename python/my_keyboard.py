import pyautogui
import platform
import time

def get_os_specific_keys():
    """根据操作系统返回相应的键盘快捷键"""
    system = platform.system()
    if system == 'Darwin':  # macOS
        return 'command'
    elif system == 'Windows':
        return 'ctrl'
    else:
        raise ValueError("Unsupported operating system: {}".format(system))


def paste_title():
    "粘贴标题"
    try:
        key = get_os_specific_keys()

        pyautogui.hotkey(key, 'a')
        time.sleep(0.1)

        pyautogui.hotkey(key, 'v')
    except Exception as e:
        print("Error occurred: ", e)