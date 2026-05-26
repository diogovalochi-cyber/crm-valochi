import json
import re

log_path = r"C:\Users\diogo.freitas\.gemini\antigravity\brain\67c38086-6391-4ee6-a422-fdffbfb0f858\.system_generated\logs\transcript.jsonl"
urls = set()

try:
    with open(log_path, 'r', encoding='utf-8') as f:
        for line in f:
            # Look for netlify.app urls
            matches = re.findall(r'[a-zA-Z0-9-]+\.netlify\.app', line)
            for m in matches:
                urls.add(m)
except Exception as e:
    print("Error:", e)

print("Found Netlify URLs:")
for u in sorted(urls):
    print(f"https://{u}")
