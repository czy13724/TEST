import os
import re
import requests
import json
from random import randint

# 仓库根目录路径，包含上传的 JavaScript 和配置文件
repo_root = os.path.join(os.getcwd(), "TEST", "TEST")

# 文件夹路径，包含上传的 JavaScript 和配置文件
scripts_folder = os.path.join(repo_root, "javascript")
image_folder = os.path.join(repo_root, "image")
conf_folder = os.path.join(repo_root, "conf")

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
    result = []

    # 遍历 JavaScript 文件
    js_files = [file for file in os.listdir(scripts_folder) if file.endswith(".js")]

    for js_file in js_files:
        # 通过正则匹配对应的配置文件
        pattern = re.compile(f"{os.path.splitext(js_file)[0]}.*\.conf")
        conf_files = [file for file in os.listdir(conf_folder) if pattern.match(file)]

        if conf_files:
            # 如果有对应的配置文件，则生成包含 config 和 addons 的信息
            for conf_file in conf_files:
                # 随机生成 cron 表达式，每天随机一个小时触发
                cron_expression = f"{randint(0, 23)} {randint(0, 59)} * * *"

                # 构建配置信息
                config_info = {
                    "config": f"{cron_expression} https://raw.githubusercontent.com/czy13724/TEST/main/javascript/{js_file}, tag=image_url_here, img-url=https://raw.githubusercontent.com/czy13724/TEST/main/image/{js_file.replace('.js', '.png')}, enabled=false",
                    "addons": f"https://raw.githubusercontent.com/czy13724/TEST/main/conf/{conf_file}, tag=image_url_here"
                }
                result.append(config_info)
        else:
            # 如果没有对应的配置文件，则生成仅包含 config 的信息
            # 随机生成 cron 表达式，每天随机一个小时触发
            cron_expression = f"{randint(0, 23)} {randint(0, 59)} * * *"

            config_info = {
                "config": f"{cron_expression} https://raw.githubusercontent.com/czy13724/TEST/main/javascript/{js_file}, tag=image_url_here, img-url=https://raw.githubusercontent.com/czy13724/TEST/main/image/{js_file.replace('.js', '.png')}, enabled=false",
                "addons": ""
            }
            result.append(config_info)

    # 将结果输出到 JSON 文件
    output_file_path = os.path.join(repo_root, "test.gallery.json")
    with open(output_file_path, "w") as output_file:
        json.dump(result, output_file, indent=4)

if __name__ == "__main__":
    generate_task_json()
