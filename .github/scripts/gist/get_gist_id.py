import os
import requests

# 获取环境变量中的 PAT
pat = os.environ.get("GETGISTID")
if not pat:
    raise ValueError("GETGISTID environment variable is not set.")

# 用户名
username = "czy13724"

# 获取 Gist 列表的 API 地址
api_url = f"https://api.github.com/users/{username}/gists"

# 设置请求头，包含 PAT
headers = {"Authorization": f"token {pat}"}

# 发送请求，获取 Gist 列表
response = requests.get(api_url, headers=headers)

# 检查请求是否成功
if response.status_code == 200:
    # 解析响应的 JSON
    gists = response.json()
    
    # 遍历 Gist 列表，输出 Gist ID
    for gist in gists:
        print(f"Gist ID: {gist['id']}")
else:
    print(f"Failed to retrieve Gist list. Status code: {response.status_code}")
