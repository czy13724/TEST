import os
import re
import requests
import json
import random

# GitHub 用户名
github_username = "czy13724"

# Gist Token
gist_token = "GETGISTID"

def fetch_script(script_url):
    response = requests.get(script_url)
    return response.text if response.status_code == 200 else None

def execute_script(script_url):
    script_content = fetch_script(script_url)
    if script_content:
        # 替换URL为注释，避免语法错误
        script_content = script_content.replace("https://", "# https://")

        # 在脚本开头添加导入语句
        script_content = f"""
import re
import requests

{script_content}
"""

        print(f"Executing script:\n{script_content}")
        exec(script_content, globals(), {})

def get_gist_info(username, token):
    headers = {
        "Authorization": f"token {token}"
    }

    file_path = os.path.join(os.getcwd(), "gist_ids.txt")
    print(f"Trying to open file: {file_path}")
    
    # 从文件中加载 Gist ID
    with open(os.path.join(os.getcwd(), "gist_ids.txt"), "r") as id_file:
        gist_ids = [line.strip() for line in id_file]

    gist_info = {}

    # 遍历 Gist ID
    for gist_id in gist_ids:
        # 获取 Gist 信息
        gist_url = f"https://api.github.com/gists/{gist_id}"
        response = requests.get(gist_url, headers=headers)

        if response.status_code == 200:
            gist_data = response.json()
            gist_files = gist_data["files"]

            # 遍历 Gist 中的文件
            for filename, file_info in gist_files.items():
                if filename.endswith((".js", ".conf")):
                    # 文件名作为字典的 key，值为包含 Raw URL 和 Gist ID 的元组
                    gist_info[filename] = {
                        "raw_url": file_info["raw_url"],
                        "gist_id": gist_id
                    }

    return gist_info

def generate_task_json(gist_info):
    result = {
        "name": "Levi's Task Collection Subscription",
        "description": "Contact @PMLevibot to delete in case of infringement. Telegram bot: https://t.me/PMLevibot",
        "task": []
    }

    # 遍历 JavaScript 文件
    js_files = [file for file in os.listdir("TEST/javascript") if file.endswith(".js")]

    for js_file in js_files:
        # 获取 Gist 信息
        gist_key = f"{js_file}"
        gist_data = gist_info.get(gist_key)

        if gist_data:
            raw_url = gist_data["raw_url"]
            gist_id = gist_data["gist_id"]

            # 创建一个 task_entry 字典，用于表示每个脚本的信息
            task_entry = {"config": "", "addons": ""}

            # 随机生成 cron 表达式
            cron_expression = f"{random.randint(0, 59)} {random.randint(0, 23)} * * *"

            # 添加 cron 表达式到 task_entry
            task_entry["config"] += f"{cron_expression} {raw_url}, tag={js_file[:-3]}, img-url=https://raw.githubusercontent.com/czy13724/TEST/main/image/{js_file[:-3]}.png, enabled=false"

            # 判断是否有配置文件，决定是否添加 addons 字段
            if conf_files:
        # 如果有配置文件，则添加 addons 字段
                conf_file = conf_files[0]  # 只取第一个配置文件，你的需求是一个脚本对应一个配置文件
                task_entry["addons"] = f"https://raw.githubusercontent.com/czy13724/TEST/main/conf/{conf_file}, tag={js_file[:-3]}"

        # 判断 addons 是否为空，若为空则移除 addons 字段
            if not task_entry["addons"]:
                task_entry.pop("addons")

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
    # 获取 Gist 信息
    gist_info = get_gist_info(github_username, gist_token)

    # 生成任务 JSON
    generate_task_json(gist_info)
