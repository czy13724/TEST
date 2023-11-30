import os
import requests

def get_gist_id(token, gist_filename):
    headers = {
        "Authorization": f"token {token}"
    }

    response = requests.get(f"https://api.github.com/gists/{gist_filename}", headers=headers)

    if response.status_code == 200:
        gist_data = response.json()
        return gist_data["id"]
    else:
        print(f"Failed to fetch Gist ID for {gist_filename}")
        return None

if __name__ == "__main__":
    # 从环境变量中获取 PAT
    pat_token = os.getenv("PAT_TOKEN")

    # Gist 文件名，假设为 gist_task.js
    gist_filename = "gist_task.js"

    # 获取 Gist ID
    gist_id = get_gist_id(pat_token, gist_filename)

    # 输出结果
    if gist_id:
        print(f"Gist ID for {gist_filename}: {gist_id}")
    else:
        print("Gist ID retrieval failed.")
