import sys

def check_brackets(filename):
    with open(filename, 'r') as f:
        content = f.read()
    
    # We only care about scripts
    import re
    scripts = re.findall(r'<script>(.*?)</script>', content, re.DOTALL)
    
    for i, script in enumerate(scripts):
        print(f"Checking Script {i+1}...")
        stack = []
        for line_num, line in enumerate(script.split('\n'), 1):
            for char_num, char in enumerate(line, 1):
                if char == '(':
                    stack.append(('(', line_num, char_num))
                elif char == ')':
                    if not stack:
                        print(f"Extra closing parenthesis at Script {i+1}, line {line_num}, col {char_num}")
                        print(f"Line content: {line.strip()[:100]}...")
                    else:
                        stack.pop()
                elif char == '{':
                    stack.append(('{', line_num, char_num))
                elif char == '}':
                    if not stack or stack[-1][0] != '{':
                        print(f"Mismatched closing brace at Script {i+1}, line {line_num}, col {char_num}")
                    else:
                        stack.pop()
                elif char == '[':
                    stack.append(('[', line_num, char_num))
                elif char == ']':
                    if not stack or stack[-1][0] != '[':
                        print(f"Mismatched closing bracket at Script {i+1}, line {line_num}, col {char_num}")
                    else:
                        stack.pop()
        
        while stack:
            char, l, c = stack.pop()
            print(f"Unclosed {char} from Script {i+1}, line {l}, col {c}")

if __name__ == "__main__":
    check_brackets(sys.argv[1])
