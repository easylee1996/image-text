import platform
import time

from pynput.keyboard import Controller, Key

# 初始化键盘控制器
keyboard = Controller()


def get_os_specific_keys():
    """根据操作系统返回相应的键盘快捷键"""
    system = platform.system()
    if system == "Darwin":  # macOS
        return Key.cmd
    elif system == "Windows":
        return Key.ctrl
    else:
        raise ValueError("Unsupported operating system: {}".format(system))


# 清空原内容再粘贴内容
def empty_and_paste_content():
    try:
        key = get_os_specific_keys()

        # 执行全选 (Ctrl+A 或 Command+A)
        with keyboard.pressed(key):
            keyboard.tap("a")

        # 执行粘贴 (Ctrl+V 或 Command+V)
        with keyboard.pressed(key):
            keyboard.tap("v")
    except Exception as e:
        print("Error occurred: ", e)


# 清空、粘贴并回车
def empty_paste_and_enter():
    try:
        key = get_os_specific_keys()

        # 执行全选 (Ctrl+A 或 Command+A)
        with keyboard.pressed(key):
            keyboard.tap("a")

        # 粘贴
        with keyboard.pressed(key):
            keyboard.tap("v")

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
            keyboard.tap("a")

        # 执行粘贴 (Ctrl+V 或 Command+V)
        with keyboard.pressed(key):
            keyboard.tap("v")

        time.sleep(0.1)

        # 回车
        keyboard.tap(Key.enter)

    except Exception as e:
        print("Error occurred: ", e)
