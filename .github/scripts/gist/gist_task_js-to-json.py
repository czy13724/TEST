import os
import re
import requests
import json
import random
from github import Github  # 这里需要安装 PyGithub 库，可以使用 pip install PyGithub 安装

# GitHub Token，用于访问 Gist 仓库
github_token = os.environ.get("GETGISTID")
if not github_token:
    raise ValueError("GETGISTID environment variable is not set.")

g = Github(github_token)

# 仓库根目录路径，包含上传的 JavaScript 和配置文件
repo_root = os.path.join(os.getcwd(), "..")

# 文件夹路径，包含上传的 JavaScript 和配置文件
scripts_folder = os.path.join(repo_root, "TEST", "javascript")
image_folder = os.path.join(repo_root, "TEST", "image")
conf_folder = os.path.join(repo_root, "TEST", "conf")

# 获取 Gist 仓库
gist_repo = g.get_user().get_repo("Gist仓库的名称")

def fetch_script(script_url):
    response = requests.get(script_url)
    return response.text if response.status_code == 200 else None

def fetch_gist_raw_url(gist_id, file_name):
    gist = gist_repo.get_gist(gist_id)
    if file_name in gist.files:
        return gist.files[file_name].raw_url
    return None

def fetch_image_raw_url(file_name):
    image_path = os.path.join(image_folder, f"{file_name[:-3]}.png")
    if os.path.exists(image_path):
        return f"https://raw.githubusercontent.com/czy13724/TEST/main/image/{file_name[:-3]}.png"
    return None

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

def generate_task_json(gists):
    result = {
        "name": "Levi任务合集订阅",
        "description": "如有侵权请联系@PMLevibot删除。tg机器人：https://t.me/PMLevibot",
        "task": []
    }

    for gist_id, file_name in gists:
        # 创建一个 task_entry 字典，用于表示每个脚本的信息
        task_entry = {"config": "", "addons": ""}

        # 随机生成 cron 表达式
        cron_expression = f"{random.randint(0, 59)} {random.randint(0, 23)} * * *"

        # 添加 cron 表达式到 task_entry
        raw_url = fetch_gist_raw_url(gist_id, file_name)
        if raw_url:
            task_entry["config"] += f"{cron_expression} {raw_url}, tag={file_name[:-3]}, img-url={fetch_image_raw_url(file_name)}, enabled=false"

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
    # 获取 Gist 仓库的文件列表
    gists = []
    for gist in gist_repo.get_gists():
        for file_name in gist.files:
            if file_name.endswith(('.js', '.conf')):
                gists.append((gist.id, file_name))

    generate_task_json(gists)
