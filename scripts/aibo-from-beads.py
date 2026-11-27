"""
「相棒」像素小人：来自一张 35×35 的拼豆图纸（MARD 色号），致敬《齐木楠雄的灾难》（原作 © 麻生周一 / 集英社）。
BASE 是图纸第 6–29 行、第 6–30 列的转写，其余表情帧只在原图上改几个格子。

用法：python3 scripts/aibo-from-beads.py [--preview out.png]   （预览需要 Pillow）
输出：src/pixel/aibo.ts
"""
import pathlib, sys

# 字母 → 颜色（括号里是拼豆色号）
PAL = {
    'o': '#fefefe',  # 贴纸白边 (H2)
    'k': '#0a0a0c',  # 描边 (H7)
    'h': '#d2629a',  # 头发 (E5)
    'H': '#a22a61',  # 头发暗部 (E10)
    's': '#faf3ed',  # 皮肤 (E16)
    'S': '#f6d8dc',  # 脸颊 (E15)
    'g': '#9bf467',  # 镜片 (B2)
    'e': '#2b6621',  # 眼睛 (B15)
    'a': '#ebb8c9',  # 抑制器 (F21)
    'A': '#d89bab',  # 抑制器暗部 (F24)
    'u': '#90d0b8',  # 制服 (B10)
    'n': '#46454a',  # 领带 / 扣子 (H5)
    'b': '#4f55aa',  # 鞋 (D22)
    # 以下是表情帧额外用到的颜色
    'r': '#ff2d55',  # 读心：抑制器发光
    'R': '#ff9fb2',
    'w': '#ffffff',  # 镜片反光
    'q': '#e6ffe0',
    'p': '#ff8fb0',  # 开心的腮红
    'j': '#5a3519',  # 咖啡果冻
    'J': '#8a5530',
    'c': '#fff4dc',  # 奶油
}

BASE = [
    '........ooooooooo........',
    '...ooooookkkkkkkoooooo...',
    '..ookkokkhhhhhhhkkokkoo..',
    '..okoakhhhhhhhhhhhkaoko..',
    '..okaAhhhhhhhhhhhhhAako..',
    '.oookhoohhhhhhhhhoohkoo..',
    '.ookkhohhHHhhhhhhhohkoo..',
    '.okhhhhhHhhhhhhhhhhhhko..',
    '.ookhhhHhhhhhhhHHhhhhko..',
    '..okhhhhhhhhhhhhhHhhhkoo.',
    '..okhhhhhhhhhhshhhhhhhko.',
    '..okhhhhshsshhsshhhhhkoo.',
    '..okhhhhkkkshskkkhhhhko..',
    '..ookhshgeegggeeghshkoo..',
    '...ookshseegsgeeshskoo...',
    '....ookkSSsssssSSkkoo....',
    '.....oookkunonukkooo.....',
    '......ookuuunuuukoo......',
    '......okuuuunuuuuko......',
    '......okssuuuuussko......',
    '......ookkuukuukkoo......',
    '.......ookbbkbbkoo.......',
    '........ookkkkkoo........',
    '.........ooooooo.........',
]
EYE_TOP, EYE_BOTTOM = 13, 14  # 眼睛所在的两行


def grid():
    return [list(r) for r in BASE]


def sub(g, rows, src, dst):
    for y in rows:
        g[y] = [dst if ch == src else ch for ch in g[y]]


def put(g, x, y, ch):
    g[y][x] = ch


def frame(name):
    g = grid()
    if name == 'blink':  # 闭眼：上排变镜片色，下排变成一条线
        sub(g, [EYE_TOP], 'e', 'g'); sub(g, [EYE_BOTTOM], 'e', 'k')
    elif name in ('read', 'readBlink'):  # 读心：抑制器发红光
        sub(g, range(0, 6), 'a', 'r'); sub(g, range(0, 6), 'A', 'R')
        if name == 'readBlink':
            sub(g, [EYE_TOP], 'e', 'g'); sub(g, [EYE_BOTTOM], 'e', 'k')
    elif name == 'deadpan':  # 吐槽：半眯眼
        sub(g, [EYE_TOP], 'e', 'k')
    elif name == 'serious':  # 推眼镜：镜片反光
        sub(g, [EYE_TOP], 'e', 'w'); sub(g, [EYE_TOP], 'g', 'w')
        sub(g, [EYE_BOTTOM], 'e', 'q'); sub(g, [EYE_BOTTOM], 'g', 'q')
    elif name == 'jelly':  # 咖啡果冻：眯眼笑 + 腮红 + 捧着一杯果冻
        sub(g, [EYE_TOP], 'e', 'g'); sub(g, [EYE_BOTTOM], 'e', 'k')
        sub(g, [15], 'S', 'p')
        for x in range(11, 14): put(g, x, 16, 'c')
        for y, row in [(17, 'kccck'), (18, 'kjjjk'), (19, 'kjJjk'), (20, 'kkkkk')]:
            for i, ch in enumerate(row): put(g, 10 + i, y, ch)
        for y in (18, 19):  # 两只手
            put(g, 8, y, 's'); put(g, 9, y, 's'); put(g, 15, y, 's'); put(g, 16, y, 's')
    return [''.join(r) for r in g]


FRAMES = ['idle', 'blink', 'read', 'readBlink', 'deadpan', 'serious', 'jelly']


def to_ts(frames):
    out = [
        '// 由 scripts/aibo-from-beads.py 生成，请勿手改。',
        '// 「相棒」：拼豆图纸转写的像素小人，致敬《齐木楠雄的灾难》（原作 © 麻生周一 / 集英社）。',
        '',
        'export const aiboPalette: Record<string, string> = {',
        *[f"  {k}: '{v}'," for k, v in PAL.items()],
        '}',
        '',
        'export const aibo = {',
    ]
    for n, rows in frames.items():
        out += [f'  {n}: [', *[f"    '{r}'," for r in rows], '  ],']
    out += ['} as const', '', 'export type AiboFrame = keyof typeof aibo', '']
    return '\n'.join(out)


if __name__ == '__main__':
    frames = {n: (BASE if n == 'idle' else frame(n)) for n in FRAMES}
    root = pathlib.Path(__file__).resolve().parent.parent
    (root / 'src/pixel/aibo.ts').write_text(to_ts(frames), encoding='utf-8')
    if '--preview' in sys.argv:
        from PIL import Image
        S, W, H = 10, len(BASE[0]), len(BASE)
        img = Image.new('RGB', ((W * S + 10) * len(frames), H * S), '#0f0b0e')
        for i, rows in enumerate(frames.values()):
            for y, row in enumerate(rows):
                for x, ch in enumerate(row):
                    if ch in PAL:
                        ox = i * (W * S + 10) + x * S
                        img.paste(PAL[ch], (ox, y * S, ox + S, y * S + S))
        img.save(sys.argv[sys.argv.index('--preview') + 1])
    print('ok')
