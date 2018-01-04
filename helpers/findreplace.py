#!/usr/bin/env python
# Usage: python findreplace.py <file name(s)>

import re
import sys


filenames = sys.argv[1:]

# `testString`.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

find = '''find'''

replace = ''


for filename in filenames:
    print filename;
    f = open(filename, 'r+')
    text = f.read()
    
    result = re.sub(find, replace, text)
    
    f.seek(0)
    f.write(result)
    f.truncate()
    
    f.close()

