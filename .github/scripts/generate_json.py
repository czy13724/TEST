import os
import json

def generate_json():
    image_folder = 'test'
    json_data = {
        "name": "TEST图标订阅",
        "description": "收集一些自己常用的图标，更新日期：xxx",
        "icons": []
    }

    for filename in os.listdir(image_folder):
        if filename.endswith(".png"):
            image_path = os.path.join(image_folder, filename)
            raw_url = f"https://raw.githubusercontent.com/{os.environ['GITHUB_REPOSITORY']}/main/{image_path}"
            icon_data = {"name": filename, "url": raw_url}
            json_data["icons"].append(icon_data)

    # Set the output path relative to the repository root
    output_path = os.path.join(os.getcwd(), 'TEST', 'test.icons.json')

    with open(output_path, 'w') as json_file:
        json.dump(json_data, json_file)

if __name__ == "__main__":
    generate_json()
