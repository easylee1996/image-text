import platform
import time
from pynput.keyboard import Controller, Key


# 初始化键盘控制器
keyboard = Controller()

def get_os_specific_keys():
    """根据操作系统返回相应的键盘快捷键"""
    system = platform.system()
    if system == 'Darwin':  # macOS
        return Key.cmd
    elif system == 'Windows':
        return Key.ctrl
    else:
        raise ValueError("Unsupported operating system: {}".format(system))

# 切换标题
def paste_title():
    try:
        key = get_os_specific_keys()

        # 执行全选 (Ctrl+A 或 Command+A)
        with keyboard.pressed(key):
            keyboard.tap('a')

        # 执行粘贴 (Ctrl+V 或 Command+V)
        with keyboard.pressed(key):
            keyboard.tap('v')
    except Exception as e:
        print("Error occurred: ", e)

# ai输入
def input_ai():
    try:
        key = get_os_specific_keys()

        # 粘贴
        with keyboard.pressed(key):
            keyboard.tap('v')

        time.sleep(0.1)

        # 回车
        keyboard.tap(Key.enter)
        
    except Exception as e:
        print("Error occurred: ", e)

# 小红书搜索
def search_xhs():
    try:
        key = get_os_specific_keys()

        # 执行全选 (Ctrl+A 或 Command+A)
        with keyboard.pressed(key):
            keyboard.tap('a')

        # 执行粘贴 (Ctrl+V 或 Command+V)
        with keyboard.pressed(key):
            keyboard.tap('v')

        time.sleep(0.1)

        # 回车
        keyboard.tap(Key.enter)

    except Exception as e:
        print("Error occurred: ", e)

