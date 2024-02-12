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




# 正则表达式匹配提交计数注释
commit_count_pattern = re.compile(r'// Adding a dummy sgmodule commit\((\d+)\)')

def increment_commit_count(file_content):
    # 查找现有的提交计数注释，如果找到则增加计数
    match = commit_count_pattern.search(file_content)
    if match:
        new_count = int(match.group(1)) + 1
        new_content = commit_count_pattern.sub(f'// Adding a dummy sgmodule commit({new_count})', file_content)
        return new_content, True
    return file_content, False

def add_commit_count(file_content):
    # 在文件末尾添加提交次数为1的新注释
    return file_content.rstrip() + '\n\n// Adding a dummy sgmodule commit(1)\n'

def process_file(file_path):
    with open(file_path, 'r+', encoding='utf-8') as file:
        content = file.read()

        # 更新注释次数或者添加新的注释
        updated_content, found = increment_commit_count(content)
        if not found:
            updated_content = add_commit_count(content)

        # 重写整个文件，并删除文件中原有内容的其余部分
        file.seek(0)
        file.write(updated_content)
        file.truncate()

def main():
    # 包括'.js', '.conf', '.snippet'格式的文件
    extensions = ['.js', '.conf', '.snippet']    
    for root, dirs, files in os.walk('.'):
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                file_path = os.path.join(root, file)
                process_file(file_path)
                # 把文件添加到Git暂存区
                os.system(f'git add \"{file_path}\"')

    # 提交所有待提交的更改
    os.system('git commit -m "Updated commit counts in comments"')

if __name__ == "__main__":
    main()
