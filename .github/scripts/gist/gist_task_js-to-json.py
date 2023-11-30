import os
import requests
import json

def get_gist_raw_links(username, token, repository, file_extension):
    # GitHub API 地址
    api_url = f"https://api.github.com/repos/{username}/{repository}/gists"

    # 请求头部，包含 GitHub Token
    headers = {"Authorization": f"token {token}"}

    # 发送 GET 请求获取 Gist 列表
    response = requests.get(api_url, headers=headers)
    gists = response.json()

    # 打印 gists 查看具体内容
    print("Gists Response:")
    print(json.dumps(gists, indent=2))

    # 存储符合条件的文件的 raw 链接
    raw_links = []

    # 遍历每个 Gist
    for gist in gists:
        # 打印 gist 查看具体内容
        print("Gist:")
        print(json.dumps(gist, indent=2))
        
        files = gist["files"]
        
        # 遍历每个文件
        for filename, file_data in files.items():
            # 获取文件后缀
            file_extension_in_gist = filename.split(".")[-1]

            # 只处理指定后缀的文件
            if file_extension_in_gist == file_extension:
                # 获取文件的 raw 链接
                raw_url = file_data["raw_url"]
                raw_links.append(raw_url)

    return raw_links

if __name__ == "__main__":
    # GitHub 用户名和仓库名
    github_username = "czy13724"
    repository_name = "TEST"

    # GitHub Token
    github_token = os.getenv("GETGISTID")

    # 获取 conf 和 js 文件的 raw 链接
    conf_raw_links = get_gist_raw_links(github_username, github_token, repository_name, "conf")
    js_raw_links = get_gist_raw_links(github_username, github_token, repository_name, "js")

    # 打印结果
    print("Conf Raw Links:")
    for link in conf_raw_links:
        print(link)

    print("\nJS Raw Links:")
    for link in js_raw_links:
        print(link)
