import os
import re
import requests
import json
import random
from difflib import get_close_matches

def generate_task_json():
    # GitHub 用户名和仓库名
    github_username = "czy13724"
    repository_name = "TEST"

    # GitHub Token
    github_token = os.getenv("GETGISTID")
    headers = {"Authorization": f"token {github_token}"}

    # Gist API 地址
    api_url = f"https://api.github.com/repos/{github_username}/{repository_name}/gists"

    # 发送 GET 请求获取 Gist 列表
    response = requests.get(api_url, headers=headers)
    gists = response.json()

    # 创建一个 result 字典用于存放任务信息
    result = {
        "name": "Levi任务合集订阅",
        "description": "如有侵权请联系@PMLevibot删除。tg机器人：https://t.me/PMLevibot",
        "task": []
    }

    # 遍历每个 Gist
    for gist in gists:
        gist_id = gist["id"]
        files = gist["files"]

        # 遍历每个文件
        for filename, file_data in files.items():
            # 获取文件后缀
            file_extension = filename.split(".")[-1]

            # 只处理后缀为 js 和 conf 的文件
            if file_extension in ["js", "conf"]:
                # 获取文件的 raw 链接
                raw_url = file_data["raw_url"]

                # 获取文件名，不带后缀
                file_name_without_extension = filename.rsplit(".", 1)[0]

                # 创建一个 task_entry 字典，用于表示每个脚本的信息
                task_entry = {"config": "", "addons": ""}

                # 随机生成 cron 表达式
                cron_expression = f"{random.randint(0, 59)} {random.randint(0, 23)} * * *"

                # 添加 cron 表达式到 task_entry
                task_entry["config"] += f"{cron_expression} {raw_url}, tag={file_name_without_extension}, img-url="

                # 寻找相似的图片文件名
                similar_images = get_close_matches(file_name_without_extension, os.listdir("image"), n=1)

                # 如果找到相似的图片文件名，添加图片的 raw 链接
                if similar_images:
                    image_filename = similar_images[0]
                    task_entry["config"] += f"https://raw.githubusercontent.com/{github_username}/{repository_name}/main/image/{image_filename}"

                # 添加其余信息到 task_entry
                task_entry["config"] += f", enabled=false"

                # 将 task_entry 添加到 result 字典中
                result["task"].append(task_entry)

    # 将结果输出到 JSON 文件
    output_file_path = os.path.join(os.getcwd(), "test.gallery.json")
    with open(output_file_path, "w", encoding="utf-8") as output_file:
        json.dump(result, output_file, indent=4, ensure_ascii=False)

    # 打印文件是否存在以及路径
    print(f"File exists: {os.path.exists(output_file_path)}")
    print(f"File path: {output_file_path}")

if __name__ == "__main__":
    generate_task_json()
