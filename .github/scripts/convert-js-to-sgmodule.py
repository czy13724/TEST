import os
import requests
from urllib.parse import urljoin

def convert_to_surge_module(js_script, name, desc, script_path, mitm_hostname):
    surge_module_script = f'''\
#!name={name}
#!desc={desc}

[Script]
{name} = type=http-request,pattern={script_path},requires-body=1,max-size=0,script-path={script_path}
[MITM]
hostname= %APPEND% {mitm_hostname}
'''

    return surge_module_script

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
    target_folder = '../TEST/sgmodule'

    try:
        js_files = os.listdir('javascript')

        for js_file in js_files:
            remote_script_url = urljoin(base_remote_url, js_file)
            js_script = fetch_and_convert(remote_script_url)

            if js_script:
                name = js_file.replace('.js', '')
                desc = f'Description for {name}'  # 你可以自定义描述
                script_path = remote_script_url
                mitm_hostname = 'license.pdfexpert.com'  # 你的 MITM 主机名

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
