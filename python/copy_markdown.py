import re

import pyperclip


# 去除空白行和只包含空白字符的行
def remove_blank_lines(text):
    lines = text.splitlines()
    non_blank_lines = [line for line in lines if line.strip()]
    return "\n".join(non_blank_lines)


# 处理markdown中不需要的样式
def clean_and_adjust_markdown(text):
    text = remove_blank_lines(text)

    # 1.去除不要的格式
    # 去除所有的 ** (无论是作为粗体还是斜体标记)
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)
    # 去除所有的 "   - "
    text = re.sub(r"^\s*- ", "", text, flags=re.MULTILINE)

    # 2.只允许有一个模式前面加空行，匹配到之后，其余不再匹配
    matched = False

    # 匹配###标题开头的，前面加一行空行
    pattern = r"^(###\s.*)"
    matches = re.findall(pattern, text, flags=re.MULTILINE)
    if matches:
        text = re.sub(r"(\n|^)(###\s.*)", r"\1\n\2", text, flags=re.MULTILINE)
        matched = True
        # 去除###
        pattern_remove_heading = r"^(###\s*)"
        text = re.sub(pattern_remove_heading, "", text, flags=re.MULTILINE)

    # 匹配##标题开头的，前面加一行空行
    pattern = r"^(##\s.*)"
    matches = re.findall(pattern, text, flags=re.MULTILINE)
    if matches:
        text = re.sub(r"(\n|^)(##\s.*)", r"\1\n\2", text, flags=re.MULTILINE)
        matched = True
        # 去除##
        pattern_remove_heading = r"^(##\s*)"
        text = re.sub(pattern_remove_heading, "", text, flags=re.MULTILINE)

    # 匹配#标题开头的，前面加一行空行
    pattern = r"^(#\s.*)"
    matches = re.findall(pattern, text, flags=re.MULTILINE)
    if matches:
        text = re.sub(r"(\n|^)(#\s.*)", r"\1\n\2", text, flags=re.MULTILINE)
        matched = True
        # 去除#
        pattern_remove_heading = r"^(#\s*)"
        text = re.sub(pattern_remove_heading, "", text, flags=re.MULTILINE)

    # 匹配“中文数字、” 开头的行，前面加一行空行
    pattern = r"(?=\n([一二三四五六七八九十零〇百千]+、))"
    matches = re.findall(pattern, text, flags=re.MULTILINE)
    if matches and not matched:
        text = re.sub(pattern, r"\n", text, flags=re.MULTILINE)
        matched = True

    # 匹配1,2,3.开头的行，前面加一行空行
    pattern = r"^(?=\d+\.\s)"
    matches = re.findall(pattern, text, flags=re.MULTILINE)
    if matches and not matched:
        text = re.sub(pattern, r"\n", text, flags=re.MULTILINE)
        matched = True

    return text.strip()


# 更改剪贴板中的 Markdown 内容
def change_markdown():
    # 从剪贴板获取内容
    clipboard_content = pyperclip.paste()

    # 清理并调整 Markdown 内容
    cleaned_content = clean_and_adjust_markdown(clipboard_content)

    # # 将清理后的内容打印到控制台或复制回剪贴板
    # print("-------------------------origin----------------------------")
    # print(clipboard_content)
    # print("\n-----------------------clean-----------------------------")
    # print(cleaned_content)

    # 如果需要将清理后的内容复制回剪贴板，取消下面这行的注释
    pyperclip.copy(cleaned_content)


# change_markdown()
