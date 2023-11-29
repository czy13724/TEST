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

def generate_task_json():
    result = {
        "name": "Levi任务合集订阅",
        "description": "如有侵权请联系@PMLevibot删除。tg机器人：https://t.me/PMLevibot",
        "task": []
    }

    # 遍历 JavaScript 文件
    js_files = [file for file in os.listdir(scripts_folder) if file.endswith(".js")]

    for js_file in js_files:
        pattern = re.compile(f"{os.path.splitext(js_file)[0]}.*\.conf")
        conf_files = [conf_file for conf_file in os.listdir(conf_folder) if pattern.match(conf_file)]

        # 创建一个 task_entry 字典，用于表示每个脚本的信息
        task_entry = {"config": "", "addons": ""}

        # 随机生成 cron 表达式
        cron_expression = f"{random.randint(0, 59)} {random.randint(0, 23)} * * *"

        # 添加 cron 表达式到 task_entry
        task_entry["config"] += f"{cron_expression}\n"

        # 添加 js 文件的链接、tag、img_url 和 enabled 到 task_entry
        task_entry["config"] += f"https://raw.githubusercontent.com/czy13724/TEST/main/javascript/{js_file}, tag={js_file[:-3]}, img-url=https://raw.githubusercontent.com/czy13724/TEST/main/image/{js_file[:-3]}.png, enabled=false"

        # 判断是否有配置文件，决定是否添加 addons 字段
        if conf_files:
            # 如果有配置文件，则添加 addons 字段
            task_entry["addons"] = [
                f"https://raw.githubusercontent.com/czy13724/TEST/main/conf/{conf_file}, tag={js_file[:-3]}"
                for conf_file in conf_files
            ]

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
