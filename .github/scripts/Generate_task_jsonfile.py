import os
import requests
import json
import re

def fetch_script(script_url):
    response = requests.get(script_url)
    if response.status_code == 200:
        return response.text
    else:
        print(f"Failed to fetch script from {script_url}")
        return None

def fetch_image_url(script_name, image_folder):
    image_file = f"{script_name}.png"  # 假设图片文件的格式为png
    image_path = os.path.join(image_folder, image_file)

    if os.path.exists(image_path):
        return f"https://raw.githubusercontent.com/czy13724/TEST/main/image/{image_file}"
    else:
        print(f"Image file {image_file} not found in the image folder.")
        return None

def execute_script(script_url):
    script_content = fetch_script(script_url)
    if script_content:
        # 替换URL为注释，避免语法错误
        script_content = script_content.replace("https://", "# https://")
        exec(script_content, globals())

# 仓库根目录路径，包含上传的 JavaScript 和配置文件
repo_root = os.path.join(os.getcwd(), "..")

# 文件夹路径，包含上传的 JavaScript 和配置文件
scripts_folder = os.path.join(repo_root, "TEST", "javascript")
image_folder = os.path.join(repo_root, "TEST", "image")
conf_folder = os.path.join(repo_root, "TEST", "conf")

# 获取文件夹中所有文件
js_files = [file for file in os.listdir(scripts_folder) if file.endswith(".js")]

# 匹配相似的 .js 和 .conf 文件，并整合
results = {
    "name": "Levi任务合集订阅",
    "description": "如有侵权请联系@PMLevibot删除。tg机器人：https://t.me/PMLevibot",
    "task": []
}

for js_file in js_files:
    pattern = re.compile(f"{os.path.splitext(js_file)[0]}.*\.conf")
    matching_conf_files = [file for file in os.listdir(conf_folder) if pattern.match(file)]

    result = {
        "config": "",
        "addons": "",
    }

    result["config"] += f"{js_file}的cron表达式\n{js_file}的js链接，{js_file}的tag=https://raw.githubusercontent.com/czy13724/TEST/main/image/{os.path.splitext(js_file)[0]}.png, enabled=false"

    if matching_conf_files:
        conf_file = matching_conf_files[0]
        conf_url = f"https://raw.githubusercontent.com/czy13724/TEST/main/conf/{conf_file}"
        result["addons"] += f"{conf_file}的conf链接，{conf_file}的tag"
        execute_script(conf_url)

    # 只在存在 addons 时写入 JSON
    if result["addons"]:
        results["task"].append(result)
    else:
        # 如果不存在 addons，只写入 config 部分
        result.pop("addons")
        results["task"].append(result)

# 将结果写入 JSON 文件
output_file = os.path.join(repo_root, "TEST", "test.gallery.json")
with open(output_file, 'w') as json_file:
    json.dump(results, json_file, indent=2)

print(f"脚本执行完成，并将结果保存到 {output_file} 文件中。")
