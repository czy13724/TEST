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





# 定义正则表达式，匹配注释行形式，包括任何尾随的空白字符或新行
commit_pattern = re.compile(r'// Adding a dummy sgmodule commit\(\d+\)\s*\n?')

# 获取文件的Git提交次数
def get_git_commit_count(file_path):
    cmd = ["git", "rev-list", "--count", "HEAD", file_path]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        return result.stdout.strip()
    else:
        raise Exception(f"Error getting commit count: {result.stderr}")

# 更新文件中的计数注释
def update_file_with_commit_count(file_path, commit_count):
    with open(file_path, 'r+', encoding='utf-8') as file:
        content = file.read()
        
        # 替换文件中所有匹配的注释
        content = commit_pattern.sub('', content).rstrip()
        
        # 在文件末尾添加带有正确计数的注释
        content += f'\n// Adding a dummy sgmodule commit({commit_count})\n'

        # 重新写入文件
        file.seek(0)
        file.write(content)
        file.truncate()

# 处理目录中的所有文件
def process_files(directory):
    for root, dirs, files in os.walk(directory):
        for file_name in files:
            if file_name.endswith(('.js', '.conf', '.snippet')):
                file_path = os.path.join(root, file_name)
                commit_count = get_git_commit_count(file_path)
                update_file_with_commit_count(file_path, commit_count)
                print(f"Updated {file_path} with commit count {commit_count}")

def main():
    # 假设当前目录为代码所在目录
    process_files('.')
    # 执行Git添加和提交操作
    os.system('git add .')
    os.system('git commit -m "Updated commit counts in comments"')

if __name__ == "__main__":
    main()
