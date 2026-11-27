"""
把两套中文字体裁成「只含本站用到的字」，输出到 src/assets/fonts/：

- 缝合像素 Fusion Pixel 12px（标题、导航、印章）：保留 src 里出现过的全部字符
- 站酷快乐体 ZCOOL KuaiLe（内心 OS）：只保留 OS 文案里出现的字

改了文案后重新运行：  npm run fonts
依赖：python3 + fonttools + brotli（pip install fonttools brotli）
两套字体都是 SIL OFL 1.1，首次运行时自动下载到 .font-src/（已 gitignore）
"""
import io, pathlib, re, subprocess, zipfile
from fontTools import subset

root = pathlib.Path(__file__).resolve().parent.parent
src_dir = root / '.font-src'
out_dir = root / 'src/assets/fonts'

FP_VER = '2026.11.10'
FONTS = {
    'fusion-pixel-12': {
        'file': 'fusion-pixel-12px-proportional-zh_hans.otf.woff2',
        'zip': f'https://github.com/TakWolf/fusion-pixel-font/releases/download/{FP_VER}/fusion-pixel-font-12px-proportional-otf.woff2-v{FP_VER}.zip',
        'license': 'OFL-fusion-pixel.txt',
    },
    'zcool-kuaile': {
        'file': 'ZCOOLKuaiLe-Regular.ttf',
        'url': 'https://raw.githubusercontent.com/google/fonts/main/ofl/zcoolkuaile/ZCOOLKuaiLe-Regular.ttf',
        'license_url': 'https://raw.githubusercontent.com/google/fonts/main/ofl/zcoolkuaile/OFL.txt',
        'license': 'OFL-zcool-kuaile.txt',
    },
}

def curl(url):
    return subprocess.run(['curl', '-fsSL', url], check=True, capture_output=True).stdout

def ensure(name, meta):
    path = src_dir / meta['file']
    if path.exists():
        return path
    print(f'下载 {name} 源字体…')
    src_dir.mkdir(exist_ok=True)
    lic = out_dir / meta['license']
    if 'zip' in meta:
        with zipfile.ZipFile(io.BytesIO(curl(meta['zip']))) as z:
            for n in z.namelist():
                if n.endswith(meta['file']):
                    path.write_bytes(z.read(n))
                elif n == 'OFL.txt':
                    lic.write_bytes(z.read(n))
    else:
        path.write_bytes(curl(meta['url']))
        lic.write_bytes(curl(meta['license_url']))
    return path

BASE = set(chr(c) for c in range(0x20, 0x7F)) | set('，。、；：？！「」『』（）《》【】…—～·“”‘’▶▼▲→←↑↓✦')

def source_files():
    return list((root / 'src').rglob('*.ts')) + list((root / 'src').rglob('*.tsx')) + [root / 'index.html']

def all_chars():
    chars = set(BASE)
    for f in source_files():
        chars |= set(f.read_text(encoding='utf-8'))
    return chars

def os_chars():
    """profile.ts 里 os / coverOs 字段的字（单行字符串）"""
    chars = set(BASE)
    text = (root / 'src/data/profile.ts').read_text(encoding='utf-8')
    for m in re.finditer(r"\b(?:os|coverOs):\s*'([^']*)'", text):
        chars |= set(m.group(1))
    return chars

def build(name, chars):
    src = ensure(name, FONTS[name])
    chars = {c for c in chars if c.isprintable()}
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['*']
    opts.notdef_outline = True
    font = subset.load_font(str(src), opts)
    sub = subset.Subsetter(opts)
    sub.populate(text=''.join(sorted(chars)))
    sub.subset(font)
    out = out_dir / f'{name}.woff2'
    subset.save_font(font, str(out), opts)
    print(f'{name}: {len(chars)} 个字符 → {out.relative_to(root)}（{out.stat().st_size // 1024} KB）')

if __name__ == '__main__':
    out_dir.mkdir(parents=True, exist_ok=True)
    build('fusion-pixel-12', all_chars())
    build('zcool-kuaile', os_chars())
