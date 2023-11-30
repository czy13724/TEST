import os
import re
import requests
import json
import random
from random import randint

# 仓库根目录路径，包含上传的 JavaScript 和配置文件
repo_root = os.path.join(os.getcwd(), "..")

# 文件夹路径，包含上传的 JavaScript 和配置文件
scripts_folder = os.path.join(repo_root, "TEST", "javascript")
image_folder = os.path.join(repo_root, "TEST", "image")
conf_folder = os.path.join(repo_root, "TEST", "conf")

# 修改这里的 GIST_URL，用于获取 Gist 列表，替换为你的 Gist URL
GIST_URL = "https://api.github.com/users/czy13724/gists"
GIST_HEADERS = {
    "Authorization": f"Bearer {os.environ['GETGISTID']}"
}

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

def get_gist_id(gist_url):
    # 匹配 Gist URL 中的 Gist ID
    match = re.search(r'/([a-f0-9]+)/', gist_url)
    return match.group(1) if match else None

def fetch_gist_raw_url(gist_id, file_name):
    # 构建 Gist 文件的 raw URL
    raw_url = f"https://gist.githubusercontent.com/{os.environ['GITHUB_ACTOR']}/{gist_id}/raw/{file_name}"
    return raw_url

def generate_task_json(gists):
    result = {
        "name": "Levi任务合集订阅",
        "description": "如有侵权请联系@PMLevibot删除。tg机器人：https://t.me/PMLevibot",
        "task": []
    }

    for gist in gists:
        # 遍历 Gist 中的每个文件
        for gist_file in gist["files"].values():
            file_name = gist_file["filename"]
            if file_name.endswith((".js", ".conf")):
                # 创建一个 task_entry 字典，用于表示每个脚本的信息
                task_entry = {"config": "", "addons": ""}

                # 随机生成 cron 表达式
                cron_expression = f"{random.randint(0, 59)} {random.randint(0, 23)} * * *"

                # 添加 cron 表达式到 task_entry
                task_entry["config"] += f"{cron_expression} {fetch_gist_raw_url(gist['id'], file_name)}, tag={file_name[:-3]}, img-url={fetch_image_raw_url(file_name)}, enabled=false"

                # 判断是否有配置文件，决定是否添加 addons 字段
                conf_files = [conf_file for conf_file in os.listdir(conf_folder) if conf_file.startswith(file_name[:-3]) and conf_file.endswith(".conf")]
                if conf_files:
                    # 如果有配置文件，则添加 addons 字段
                    conf_file = conf_files[0]  # 只取第一个配置文件，你的需求是一个脚本对应一个配置文件
                    task_entry["addons"] = f"{fetch_gist_raw_url(gist['id'], conf_file)}, tag={file_name[:-3]}"

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
    # 获取用户的 Gists
    response = requests.get(GIST_URL, headers=GIST_HEADERS)
    gists = response.json()

    # 生成任务 JSON
    generate_task_json(gists)
