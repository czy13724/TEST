import os
import requests
from urllib.parse import urljoin

def convert_to_surge_module(js_script):
    # 将 JavaScript 脚本包装在 Surge Module 的 init 中
    return f'script:\n  init: |\n    {js_script}'

def fetch_and_convert(remote_script_url):
    try:
        # 从远程 URL 获取 JavaScript 脚本内容
        response = requests.get(remote_script_url)
        js_script = response.text
        # 调用转换函数，将 JavaScript 脚本转换为 Surge Module 格式
        surge_module_script = convert_to_surge_module(js_script)
        return surge_module_script
    except requests.RequestException as e:
        # 处理获取远程脚本失败的情况
        print(f'Error fetching remote script: {e}')
        return None

def process_repository(username, repo):
    # 设置远程 JavaScript 脚本的基础 URL
    base_remote_url = f'https://raw.githubusercontent.com/{username}/{repo}/main/javascript/'
    # 设置目标保存 Surge Module 的文件夹
    target_folder = '../TEST/sgmodule'

    try:
        # 获取 javascript 文件夹下所有文件的列表
        js_files = os.listdir('javascript')

        for js_file in js_files:
            # 构建远程 JavaScript 文件的完整 URL
            remote_script_url = urljoin(base_remote_url, js_file)
            # 获取并转换远程 JavaScript 文件
            surge_module_script = fetch_and_convert(remote_script_url)

            if surge_module_script:
                # 构建 Surge Module 文件的保存路径
                surge_module_path = os.path.join(target_folder, js_file.replace('.js', '.sgmodule'))
                # 将 Surge Module 脚本保存到文件
                with open(surge_module_path, 'w') as surge_module_file:
                    surge_module_file.write(surge_module_script)
                print(f'Converted and saved: {surge_module_path}')
    except OSError as e:
        # 处理读取 javascript 文件夹失败的情况
        print(f'Error reading javascript folder: {e}')

if __name__ == '__main__':
    # 请将以下用户名和仓库名替换为实际的值
    username = 'czy13724'  # 你的 GitHub 用户名
    repo = 'TEST'  # 你的 GitHub 仓库名

    # 调用处理函数，开始处理 GitHub 仓库中的 JavaScript 脚本
    process_repository(username, repo)
