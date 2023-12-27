# 脚本不完全使用，禁止直接使用。支持修改代码或使用scripthub
# 作者: Levi


import os
import requests
import re
from urllib.parse import urljoin

def convert_to_surge_module(js_script, name, desc, script_path, mitm_hostname):
    # 提取 JavaScript 脚本中的链接或正则表达式
    js_patterns = extract_patterns(js_script)

    # 将链接或正则表达式转换为 Surge Module 中的 pattern
    patterns = [convert_pattern(pattern) for pattern in js_patterns]

    # 构建 Surge Module 脚本
    surge_module_script = f'''\
#!name={name}
#!desc={desc}

[Script]
{name} = type=http-request,pattern={'|'.join(patterns)},requires-body=1,max-size=0,script-path={script_path}
[MITM]
hostname= %APPEND% {mitm_hostname}
'''

    return surge_module_script

def extract_patterns(js_script):
    # 从 JavaScript 脚本中提取链接或正则表达式
    # 这里使用正则表达式来匹配 url script-response-body 行前面的内容
    pattern_matches = re.findall(r'\burl\s+script-response-body\s+([^\n]+)', js_script)
    return [match.strip() for match in pattern_matches]

def convert_pattern(pattern):
    # 将链接转换为正则表达式
    if re.match(r'^https?://', pattern):
        return f'^{re.escape(pattern)}'
    return pattern

def fetch_and_convert(remote_script_url):
    try:
        response = requests.get(remote_script_url)
        js_script = response.text
        return js_script
    except requests.RequestException as e:
        print(f'Error fetching remote script: {e}')
        return None

def process_repository(username, repo):
    base_remote_url = f'https://raw.githubusercontent.com/{username}/{repo}/main/javascript/'
    target_folder = f'../{repo}/sgmodule'  # 更新目标保存路径

    try:
        js_files = os.listdir('javascript')

        for js_file in js_files:
            remote_script_url = urljoin(base_remote_url, js_file)
            js_script = fetch_and_convert(remote_script_url)

            if js_script:
                name = js_file.replace('.js', '')
                desc = f'Description for {name}'  # 你可以自定义描述

                # 提取 MITM 主机名信息
                mitm_matches = re.findall(r'\bhostname\s*=\s*([^\n]+)', js_script)
                mitm_hostname = mitm_matches[0].strip() if mitm_matches else ''

                script_path = remote_script_url

                surge_module_script = convert_to_surge_module(js_script, name, desc, script_path, mitm_hostname)

                surge_module_path = os.path.join(target_folder, js_file.replace('.js', '.sgmodule'))
                with open(surge_module_path, 'w') as surge_module_file:
                    surge_module_file.write(surge_module_script)

                print(f'Converted and saved: {surge_module_path}')
    except OSError as e:
        print(f'Error reading javascript folder: {e}')

if __name__ == '__main__':
    # 请将以下用户名和仓库名替换为实际的值
    username = 'czy13724'  # 你的 GitHub 用户名
    repo = 'TEST'  # 你的 GitHub 仓库名

    process_repository(username, repo)
