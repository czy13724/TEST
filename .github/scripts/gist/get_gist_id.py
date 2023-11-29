import os
import requests

script_folder = os.path.dirname(os.path.abspath(__file__))
print(f"Script folder: {script_folder}")

# 之后再执行文件的其他部分


# GitHub 用户名
github_username = "czy13724"

# Gist Token
gist_token = "GETGISTID"

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

    gists = response.json()

    # 遍历 Gists，并将每个 Gist 的 ID 写入文件
    with open("gist_ids.txt", "w") as id_file:
        for gist in gists:
            gist_id = gist["id"]
            id_file.write(f"{gist_id}\n")

if __name__ == "__main__":
    # 获取私有 Gist 的 ID
    get_private_gist_id(github_username, gist_token)
