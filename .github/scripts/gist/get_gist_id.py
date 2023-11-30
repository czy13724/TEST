import requests
import os

# 设置GitHub用户名和Gist访问令牌
username = "czy13724"
token = "GETGISTID"

# 创建一个空的gist_ids.txt文件
with open("gist_ids.txt", "w") as file:
    pass

# GitHub 用户名
github_username = "czy13724"

# Gist Token
gist_token = "GETGISTID"


# 从环境变量中获取个人访问令牌
token = os.environ.get("GETGISTID")

# 设置请求头，包含个人访问令牌
headers = {
    "Authorization": f"Bearer {token}"
}

# 发送请求
response = requests.get("https://api.github.com/user", headers=headers)

# 检查响应状态码
if response.status_code == 200:
    # 请求成功，处理响应数据
    data = response.json()
    print(data)
else:
    # 请求失败，打印错误信息
    print("请求失败:", response.status_code, response.text)

def get_private_gist_id(username, token):
    headers = {
        "Authorization": f"token {token}"
    }

    # 获取用户的 Gists 列表
    gists_url = f"https://api.github.com/users/{username}/gists"
    response = requests.get(gists_url, headers=headers)

    if response.status_code != 200:
        print(f"Failed to fetch Gists: {response.text}")
        return

    print(f"GitHub Token: {github_token}")
    print(f"Fetching Gists from: {gists_url}")
    
    gists = response.json()

    # 遍历 Gists，并将每个 Gist 的 ID 写入文件
    with open("gist_ids.txt", "w") as id_file:
        for gist in gists:
            gist_id = gist["id"]
            id_file.write(f"{gist_id}\n")

if __name__ == "__main__":
    # 获取私有 Gist 的 ID
    get_private_gist_id(github_username, gist_token)
