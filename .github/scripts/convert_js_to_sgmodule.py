# author:Levi
# 搭配convert js to sgmodule.yml使用。可将qx的js文件转换为sgmodule文件。使用方法见博客。

import os
import re
import subprocess

def insert_append(content):
    # Insert %APPEND% after the first '=' sign
    return re.sub(r'=', '= %APPEND%', content, count=1)

def js_to_sgmodule(js_content):
    # Extract information from the JS content
    name_match = re.search(r'项目名称：(.*?)\n', js_content)
    desc_match = re.search(r'使用说明：(.*?)\n', js_content)
    mitm_match = re.search(r'\[mitm\]\s*([^=\n]+=[^\n]+)\s*', js_content, re.DOTALL | re.IGNORECASE)
    hostname_match = re.search(r'hostname\s*=\s*([^=\n]+=[^\n]+)\s*', js_content, re.DOTALL | re.IGNORECASE)

    # If there is no project name and description, use the last part of the matched URL as the project name
    if not (name_match and desc_match):
        url_pattern = r'url\s+script-(?:response-body|request-body|echo-response|request-header|response-header|analyze-echo-response)\s+(\S+.*?)$'
        last_part_match = re.search(url_pattern, js_content, re.MULTILINE)
        if last_part_match:
            project_name = os.path.splitext(os.path.basename(last_part_match.group(1).strip()))[0]
        else:
            raise ValueError("Invalid JS file format")

        project_desc = f"Generated from {project_name}"

    else:
        project_name = name_match.group(1).strip()
        project_desc = desc_match.group(1).strip()

    mitm_content = mitm_match.group(1).strip() if mitm_match else ''
    hostname_content = hostname_match.group(1).strip() if hostname_match else ''

    # Insert %APPEND% into mitm and hostname content
    mitm_content_with_append = insert_append(mitm_content)

    # Generate sgmodule content
    sgmodule_content = f"""#!name={project_name}
#!desc={project_desc}
[MITM]
{mitm_content_with_append}

[Script]
"""

    # Regex pattern to find rewrite_local
    rewrite_local_pattern = r'^(.*?)\s*url\s+script-(response-body|request-body|echo-response|request-header|response-header|analyze-echo-response)\s+(\S+)'
    rewrite_local_matches = re.finditer(rewrite_local_pattern, js_content, re.MULTILINE)

    for match in rewrite_local_matches:
        pattern = match.group(1).strip()
        script_type = match.group(2).replace('-body', '').replace('-header', '').strip()
        script_path = match.group(3).strip()

        # Append the rewrite rule to the SGModule content
        sgmodule_content += f"{project_name} = type=http-{script_type},pattern={pattern},script-path={script_path}\n"

    return sgmodule_content

def main():
    # Process each file in the 'qxjs' folder
    qx_folder_path = 'qxjs'
    if not os.path.exists(qx_folder_path):
        print(f"Error: {qx_folder_path} does not exist.")
        return

    for file_name in os.listdir(qx_folder_path):
        if file_name.endswith(".js"):
            file_path = os.path.join(qx_folder_path, file_name)
            with open(file_path, 'r', encoding='utf-8') as js_file:
                js_content = js_file.read()
                sgmodule_content = js_to_sgmodule(js_content)

                # Write sgmodule content to surge folder
                surge_folder_path = 'surge'
                os.makedirs(surge_folder_path, exist_ok=True)
                sgmodule_file_path = os.path.join(surge_folder_path, f"{os.path.splitext(file_name)[0]}.sgmodule")
                with open(sgmodule_file_path, "w", encoding="utf-8") as sgmodule_file:
                    sgmodule_file.write(sgmodule_content)

                print(f"Generated {sgmodule_file_path}")



import os
import re
import subprocess

# 从Git中获取文件的提交次数
def get_commit_count(file_name):
    # Git命令获取提交次数
    cmd = ['git', 'rev-list', '--count', 'HEAD', file_name]
    commit_count = subprocess.run(cmd, stdout=subprocess.PIPE, text=True).stdout.strip()
    return commit_count

# 更新文件的提交计数注释
def update_commit_count(file_name, commit_count):
    # 正则表达式匹配提交计数注释
    commit_count_pattern = re.compile(r'// Adding a dummy sgmodule change to trigger git commit\(\d+\)\n')

    # 读取原始文件内容
    with open(file_name, 'r', encoding='utf-8') as file:
        file_content = file.read()

    # 如果文件中已经有注释，则更新第一个注释并删除其余的注释
    if commit_count_pattern.search(file_content):
        # 替换第一个注释的计数，并删除后续所有匹配的注释
        updated_content, _ = commit_count_pattern.subn(f'// Adding a dummy sgmodule change to trigger git commit({commit_count})\n', file_content, count=1)
        updated_content = commit_count_pattern.sub('', updated_content)
    else:
        # 如果没有找到注释，追加一个新的注释到文件的末尾
        updated_content = file_content + f'// Adding a dummy sgmodule change to trigger git commit({commit_count})\n'

    # 将更新后的内容写回文件
    with open(file_name, 'w', encoding='utf-8') as file:
        file.write(updated_content)

# 主函数
def main():
    # 设定目录
    qx_dir = 'qxjs'
    os.chdir(qx_dir)

    # 处理所有.js文件
    for file_name in os.listdir('.'):
        if file_name.endswith('.js'):
            commit_count = get_commit_count(file_name)
            update_commit_count(file_name, commit_count)
            # 添加改动到Git
            os.system(f'git add {file_name}')

    # 提交所有改动
    os.system('git commit -m "Updated commit counts in comments"')

if __name__ == "__main__":
    main()
