import os
import re
import requests
import json
import random
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# 获取 GITHUB_TOKEN 和 GIST_ID 的值
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GIST_ID = os.getenv("GIST_ID")

# 仓库根目录路径，包含上传的 JavaScript 和配置文件
repo_root = os.path.join(os.getcwd(), "..")

# 文件夹路径，包含上传的 JavaScript 和配置文件
scripts_folder = os.path.join(repo_root, "TEST", "javascript")
image_folder = os.path.join(repo_root, "TEST", "image")
conf_folder = os.path.join(repo_root, "TEST", "conf")

# 获取 Gist ID 的函数
def get_gist_id(token, gist_name):
    headers = {"Authorization": f"token {token}"}
    response = requests.get(f"https://api.github.com/gists/{GIST_ID}", headers=headers)
    if response.status_code == 200:
        gist_info = response.json()
        for file_name, file_info in gist_info["files"].items():
            if file_name == gist_name:
                return file_info["raw_url"]
    return None

# 获取图片文件的 raw URL 的函数
def fetch_image_raw_url(image_file_name):
    # 构建图片文件的 raw URL
    raw_url = f"https://raw.githubusercontent.com/czy13724/TEST/main/image/{image_file_name}"
    return raw_url

# 获取 Gist 文件的 raw URL 的函数
def fetch_gist_raw_url(gist_id, file_name):
    return f"https://gist.githubusercontent.com/czy13724/{gist_id}/raw/{file_name}"

# 执行 JavaScript 脚本的函数
def execute_script(script_url):
    script_content = fetch_script(script_url)
    if script_content:
        # 替换 URL 为注释，避免语法错误
        script_content = script_content.replace("https://", "# https://")

        # 在脚本开头添加导入语句
        script_content = f"""
import re
import requests

{script_content}
"""

        print(f"Executing script:\n{script_content}")
        exec(script_content, globals(), {})

# 获取 JavaScript 脚本的函数
def fetch_script(script_url):
    response = requests.get(script_url)
    return response.text if response.status_code == 200 else None

# 创建一个 result 字典用于存放任务信息
def generate_task_json(gists):
    result = {
        "name": "Levi Task Collection Subscription",
        "description": "Contact @PMLevibot to delete if there is any infringement. Telegram bot: https://t.me/PMLevibot",
        "task": []
    }

    # 遍历获取到的 Gist 信息
    for gist in gists:
        # 获取 Gist 的文件信息
        files = gist["files"]

        # 检查是否有 JavaScript 文件
        js_files = [file_name for file_name in files if file_name.endswith(".js")]

        # 如果没有 JavaScript 文件，则跳过
        if not js_files:
            continue

        # 取第一个 JavaScript 文件，你的需求是一个 Gist 对应一个 JavaScript 文件
        js_file = js_files[0]

        # 获取 cron 表达式
        cron_expression = f"{random.randint(0, 59)} {random.randint(0, 23)} * * *"

        # 创建一个 task_entry 字典，用于表示每个脚本的信息
        task_entry = {"config": "", "addons": ""}

        # 添加 cron 表达式到 task_entry
        task_entry["config"] += f"{cron_expression} {fetch_gist_raw_url(GIST_ID, js_file)}, tag={js_file[:-3]}, img-url={fetch_image_raw_url(js_file)}, enabled=false"

        # 判断是否有配置文件，决定是否添加 addons 字段
        conf_file = js_file[:-2] + "conf"
        if conf_file in files:
            # 如果有配置文件，则添加 addons 字段
            task_entry["addons"] = f"{fetch_gist_raw_url(GIST_ID, conf_file)}, tag={js_file[:-3]}"

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
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    response = requests.get(f"https://api.github.com/gists/{GIST_ID}", headers=headers)
    if response.status_code == 200:
        gists = response.json()
        # 生成任务 JSON
        generate_task_json(gists)
    else:
        print(f"Error getting Gist ID. Aborting.")
