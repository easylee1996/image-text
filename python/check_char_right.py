import asyncio
import logging

import cv2
from paddleocr import PaddleOCR, draw_ocr

logging.getLogger("ppocr").setLevel(logging.ERROR)


async def merge_lines(ocr_result):
    """
    合并多行的文字在一行  有时候明显是一行的却被分为了两行
    :param ocr_result: OCR结果
    :return: 合并后的文字列表
    """
    merged_lines = []
    prev_line_height = None
    threshold = 10
    for index, line in enumerate(ocr_result):
        merged_line = ""
        # 通过右下角座标高度来判断
        if prev_line_height == None:
            prev_line_height = abs(line[0][3][1])
            merged_line = [line[0], [line[1][0], line[1][1]]]
            merged_lines.append(merged_line)
        else:
            if abs(abs(line[0][3][1]) - prev_line_height) < threshold:
                merged_lines[index - 1][1][0] += line[1][0]
            else:
                merged_line = [line[0], [line[1][0], line[1][1]]]
                merged_lines.append(merged_line)
    return merged_lines


async def get_chars():
    # 使用默认参数初始化OCR
    ocr = PaddleOCR(
        use_angle_cls=True, lang="ch"
    )  # 这里设置为中文，如果需要其他语言可以更改lang参数

    img_path = "screenshot.png"  # 将这里的路径替换为您图片的实际路径
    # img_path = "test.png"  # 将这里的路径替换为您图片的实际路径
    cv2.imread(img_path)

    result = ocr.ocr(img_path, cls=True)
    merged_result = await merge_lines(result[0])

    # 统计行数和每行的字符数
    char_counts_per_line = []

    for line in merged_result:
        if line[1][0]:
            char_counts_per_line.append(line[1][0])
    print("原始文字排版：", char_counts_per_line)
    return char_counts_per_line


async def judge_char_right():
    # 在这里编写判断字符是否在正确位置的逻辑
    chars = await get_chars()
    ignore_chars = "，。！？：；!?.-_"
    result = {}
    # 最后一行剩下两个字符
    if len(chars[-1]) == 2:
        # 包含符号，那就把最后一行设置为3个字
        last_two_line = chars[-2] + chars[-1]
        if any(char in ignore_chars for char in chars[-1]):
            chars[-2] = last_two_line[:-3]
            chars[-1] = last_two_line[-3:]
            result = {"right": False, "chars": chars}
        else:
            result = {"right": True}
    # 最后一行剩下一个字符
    elif len(chars[-1]) == 1:
        last_two_line = chars[-2] + chars[-1]
        if chars[-1] in ignore_chars:
            chars[-2] = last_two_line[:-3]
            chars[-1] = last_two_line[-3:]
            result = {"right": False, "chars": chars}
        else:
            chars[-2] = last_two_line[:-2]
            chars[-1] = last_two_line[-2:]
            result = {"right": False, "chars": chars}
    else:
        result = {"right": True}

    return result


# asyncio.run(judge_char_right())
