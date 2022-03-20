import pathlib
p = pathlib.Path('./')
cm = cr = fn = cl = ls = fc = 0
for f in p.rglob(('*.js')):
    if str(f).startswith("venv"):
        continue
    fc += 1
    with f.open(encoding="utf-8", errors="ignore") as of:
        for l in of.readlines():
            l = l.strip()
            if l.startswith('class'):
                cl += 1
            if l.startswith('function'):
                fn += 1
            if l.startswith('async function'):
                cr += 1
            if '//' in l:
                cm += 1
            ls += 1
print(f"Total js files: {fc}\nLines of code: {ls:,}\nClasses: {cl}\nFunctions: {fn}\nCoroutines: {cr}\nComments: {cm:,}\nLunish#8888")