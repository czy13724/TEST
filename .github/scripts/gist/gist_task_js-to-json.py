# .github/scripts/gist/gist_task_js-to-json.py

import os
import json
import requests

# 获取 Gist ID 的函数
def get_gist_id(token, username):
    url = f'https://api.github.com/users/{username}/gists'
    headers = {'Authorization': f'token {token}'}
    response = requests.get(url, headers=headers)
    gists = response.json()

    # 遍历 Gist 列表
    for gist in gists:
        if not gist['public'] and any(file.endswith(('.js', '.conf')) for file in gist['files']):
            return gist['id']

    return None

# 从环境变量中获取 GitHub 用户名和 Personal Access Token
github_username = os.getenv('GITHUB_USERNAME')
github_token = os.getenv('GETGISTID')

# 获取 Gist ID
gist_id = get_gist_id(github_token, github_username)

# 生成 JSON 文件
result = {
    "name": "Your Task Name",
    "description": "Your Task Description",
    "task": []
}

# 示例 task_entry，用于演示如何将 Gist ID 动态填写到链接中
task_entry = {
    "config": f"0 0 * * * https://gist.githubusercontent.com/{github_username}/{gist_id}/raw/your_script.js, tag=your_tag, img-url=your_image_url, enabled=true",
    "addons": ""
}

result["task"].append(task_entry)

# 输出到 JSON 文件
output_file_path = os.path.join(os.getcwd(), "test.gallery.json")
with open(output_file_path, "w", encoding="utf-8") as output_file:
    json.dump(result, output_file, indent=4, ensure_ascii=False)

print(f"File exists: {os.path.exists(output_file_path)}")
print(f"File path: {output_file_path}")
