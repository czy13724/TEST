import requests
import json

def get_all_gists(token):
    headers = {"Authorization": f"token {token}"}
    response = requests.get("https://api.github.com/gists", headers=headers)
    if response.status_code == 200:
        return response.json()
    return None

def extract_gist_info(gist_data):
    result = []
    for gist in gist_data:
        gist_id = gist["id"]
        files = gist["files"]
        for file_name, file_info in files.items():
            if file_name.endswith((".js", ".conf")):
                raw_url = file_info["raw_url"]
                result.append({"file_name": file_name, "raw_url": raw_url, "gist_id": gist_id})
    return result

def main():
    # 替换为你的 Gist token
    gist_token = "GETGISTID"
    
    gist_data = get_all_gists(gist_token)
    
    if gist_data:
        extracted_info = extract_gist_info(gist_data)
        for info in extracted_info:
            print(f"Gist ID: {info['gist_id']}")
            print(f"File Name: {info['file_name']}")
            print(f"Raw URL: {info['raw_url']}")
            print("=" * 30)
    else:
        print("Failed to fetch Gists.")

if __name__ == "__main__":
    main()
