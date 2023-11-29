import requests
import json
import os

# GitHub 用户名
github_username = "czy13724"

# Gist Token
gist_token = "GETGISTID"

def get_private_gist_info(username, token):
    headers = {
        "Authorization": f"token {token}"
    }

    # 获取用户的 Gists 列表
    gists_url = f"https://api.github.com/users/{username}/gists"
    response = requests.get(gists_url, headers=headers)

    if response.status_code != 200:
        print(f"Failed to fetch Gists: {response.text}")
        return

    gists = response.json()

    # 遍历 Gists
    for gist in gists:
        gist_id = gist["id"]
        gist_files = gist["files"]

        # 遍历 Gist 中的文件
        for filename, file_info in gist_files.items():
            if filename.endswith((".js", ".conf")):
                # 文件名
                print(f"Filename: {filename}")

                # Raw 链接
                raw_url = file_info["raw_url"]
                print(f"Raw URL: {raw_url}")

                # Gist ID
                print(f"Gist ID: {gist_id}")

                print("-" * 30)

if __name__ == "__main__":
    get_private_gist_info(github_username, gist_token)
