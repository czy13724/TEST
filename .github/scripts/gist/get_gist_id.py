import requests
import os

# 设置GitHub用户名和Gist访问令牌
username = "czy13724"
token = "GETGISTID"

# 创建一个空的gist_ids.txt文件
with open("gist_ids.txt", "w") as file:
    pass

# 发送GET请求获取用户的私有Gists列表
url = f"https://api.github.com/users/{username}/gists"
headers = {"Authorization": f"Token {token}"}
response = requests.get(url, headers=headers)

# 解析响应并提取每个私有Gist的raw链接
if response.status_code == 200:
    gists = response.json()
    for gist in gists:
        gist_id = gist["id"]
        files = gist["files"]
        for file in files.values():
            filename = file["filename"]
            if filename.endswith((".js", ".conf")):
                raw_url = file["raw_url"]
                # 将Gist ID写入gist_ids.txt文件
                with open("gist_ids.txt", "a") as file:
                    file.write(gist_id + "\n")
                print(f"{filename}的Raw链接：{raw_url}")
else:
    print("无法获取Gists。")
