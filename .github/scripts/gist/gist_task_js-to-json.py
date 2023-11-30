import os
import requests
import json
from difflib import get_close_matches

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

# 存储 Gist ID
gist_ids = []

# 检查请求是否成功
if response.status_code == 200:
    # 解析响应的 JSON
    gists = response.json()

    # 遍历 Gist 列表，输出 Gist ID，并存储到列表中
    for gist in gists:
        gist_id = gist["id"]
        gist_ids.append(gist_id)
        print(f"Gist ID: {gist_id}")
else:
    print(f"Failed to retrieve Gist list. Status code: {response.status_code}")

# 存储结果的列表
result_data = []

# 遍历每个 Gist ID
for gist_id in gist_ids:
    # 获取 Gist 详情的 API 地址
    gist_detail_api_url = f"https://api.github.com/gists/{gist_id}"

    # 发送请求，获取 Gist 详情
    response_detail = requests.get(gist_detail_api_url, headers=headers)

    # 检查请求是否成功
    if response_detail.status_code == 200:
        # 解析响应的 JSON
        gist_detail = response_detail.json()

        files = gist_detail["files"]

        # 遍历每个文件
        for filename, file_data in files.items():
            # 获取文件后缀
            file_extension = filename.split(".")[-1]

            # 只处理后缀为 js 和 conf 的文件
            if file_extension in ["js", "conf"]:
                # 获取文件的 raw 链接
                raw_url = file_data["raw_url"]

                # 获取文件名，不带后缀
                file_name_without_extension = filename.rsplit(".", 1)[0]

                # 查找相似的图片文件名
                similar_images = get_close_matches(file_name_without_extension, os.listdir("image"), n=1)

                # 如果找到相似的图片文件名，添加图片的 raw 链接
                if similar_images:
                    image_filename = similar_images[0]
                    image_raw_url = f"https://raw.githubusercontent.com/{username}/{gist_id}/main/image/{image_filename}"

                    # 存储数据
                    result_data.append({
                        "gist_id": gist_id,
                        "script_name": file_name_without_extension,
                        "script_raw_url": raw_url,
                        "image_raw_url": image_raw_url
                    })
                else:
                    # 如果没有找到相似的图片文件名，只存储脚本的 raw 链接
                    result_data.append({
                        "gist_id": gist_id,
                        "script_name": file_name_without_extension,
                        "script_raw_url": raw_url,
                        "image_raw_url": None
                    })

    else:
        print(f"Failed to retrieve Gist details. Status code: {response_detail.status_code}")

# 将结果保存为 JSON 文件
output_json_path = "result_data.json"
with open(output_json_path, "w") as json_file:
    json.dump(result_data, json_file, indent=2)

print(f"数据已保存到 {output_json_path}")
