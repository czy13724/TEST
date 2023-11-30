import os
import requests
import json
import random
from difflib import get_close_matches
from fuzzywuzzy import fuzz

def generate_task_json():
    # GitHub 用户名
    github_username = "czy13724"

    # 获取 GitHub Token
    github_token = os.getenv("GETGISTID")
    headers = {"Authorization": f"token {github_token}"}

    # 获取 Gist 列表的 API 地址
    api_url = f"https://api.github.com/users/{github_username}/gists"

    # 发送请求，获取 Gist 列表
    response = requests.get(api_url, headers=headers)

    # 检查请求是否成功
    if response.status_code == 200:
        # 解析响应的 JSON
        gists = response.json()

        # 创建一个 result 字典用于存放任务信息
        result = {
            "name": "Levi任务合集订阅",
            "description": "如有侵权请联系@PMLevibot删除。tg机器人：https://t.me/PMLevibot",
            "task": []
        }

        # 遍历 Gist 列表
    for gist in gists:
        gist_id = gist["id"]
        files = gist["files"]

        # 提取文件信息
        js_file = None
        conf_file = None

        for filename, file_data in files.items():
            file_extension = filename.split(".")[-1]

            if file_extension == "js":
                js_file = {"filename": filename, "raw_url": file_data["raw_url"]}
            elif file_extension == "conf":
                conf_file = {"filename": filename, "raw_url": file_data["raw_url"]}

        # 如果存在 js 文件，创建 task_entry
        if js_file:
            # 获取文件名，不带后缀
            file_name_without_extension = js_file["filename"].rsplit(".", 1)[0]

            # 创建一个 task_entry 字典，用于表示每个脚本的信息
            task_entry = {"config": "", "addons": ""}

            # 随机生成 cron 表达式
            cron_expression = f"{random.randint(0, 59)} {random.randint(0, 23)} * * *"

            # 添加 cron 表达式到 task_entry
            task_entry["config"] += f"{cron_expression} "

            # 寻找相似的配置文件名
            conf_files = [conf["filename"] for conf in files.values() if conf["filename"].endswith(".conf")]

            # 判断是否有配置文件，决定是否添加 addons 字段
            if conf_files:
                # 如果有配置文件，则使用相似性算法匹配
                matching_conf = max(conf_files, key=lambda x: fuzz.ratio(file_name_without_extension, x.rsplit(".", 1)[0]))

                # 添加 addons 字段
                task_entry["addons"] = f"https://gist.githubusercontent.com/{github_username}/{gist_id}/raw/main/{matching_conf}, tag={file_name_without_extension}"

            # 判断 addons 是否为空，若为空则移除 addons 字段
            if not task_entry["addons"]:
                del task_entry["addons"]

            # 寻找相似的图片文件名
            similar_images = [image for image in os.listdir("image") if image.startswith(file_name_without_extension)]

            # 如果找到相似的图片文件名，添加图片的 raw 链接
            if similar_images:
                image_filename = similar_images[0]

            # 添加其余信息到 task_entry
            task_entry["config"] += f"https://gist.githubusercontent.com/{github_username}/{gist_id}/raw/main/{js_file['filename']}, tag={file_name_without_extension}, img-url=https://raw.githubusercontent.com/{github_username}/{gist_id}/main/image/{image_filename}, enabled=false"

            # 将 task_entry 添加到 result 字典中
            result["task"].append(task_entry)

    # ... （后面的代码保持不变）

if __name__ == "__main__":
    generate_task_json()
