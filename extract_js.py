import sys
import re

with open(sys.argv[1], 'r') as f:
    content = f.read()

scripts = re.findall(r'<script>(.*?)</script>', content, re.DOTALL)
if len(scripts) >= 3:
    with open('script3.js', 'w') as f:
        f.write(scripts[2])
    print("Script 3 extracted to script3.js")
else:
    print(f"Only found {len(scripts)} scripts")
