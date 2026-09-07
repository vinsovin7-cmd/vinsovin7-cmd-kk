
import sys

def find_closing_div(filename, start_line):
    with open(filename, 'r') as f:
        lines = f.readlines()
    
    stack = 0
    found_start = False
    for i, line in enumerate(lines, 1):
        if i == start_line:
            found_start = True
            # Count openings in this line after the start
            stack += line.count('<div')
            stack -= line.count('</div')
            continue
        
        if found_start:
            stack += line.count('<div')
            stack -= line.count('</div')
            if stack <= 0:
                print(f"Closing div for line {start_line} found at line {i}")
                return i
    print("Not found")
    return None

if __name__ == "__main__":
    find_closing_div(sys.argv[1], int(sys.argv[2]))
