"""
生成「相棒」像素小人（48×48，原创，致敬《齐木楠雄的灾难》的齐木风：粉发、绿眼镜、头顶抑制器、面瘫）。
用法：python scripts/draw-aibo.py [--preview out.png]
输出：src/pixel/aibo.ts（各状态帧的字符矩阵）
"""
import sys, math, pathlib

W = H = 48
PAL = {
    'k': '#1c1917',  # 描边
    'h': '#f59bc3', 'H': '#d9709f', 'i': '#ffd0e4',  # 头发
    's': '#fde5d2', 'S': '#f1c3a5',  # 皮肤
    'g': '#a6e8c0', 'q': '#e2fbec', 'G': '#2f7a55',  # 镜片 / 高光 / 镜框
    'a': '#3a3a46', 'A': '#6c6c7c', 'r': '#e0452b', 'R': '#ffb4a3',  # 抑制器 / 读心发光
    'w': '#ffffff', 'W': '#d9d4ca',  # 衬衫
    'u': '#3e4260', 'U': '#2a2d45',  # 制服
    'p': '#f5a39a',  # 腮红
    'j': '#4a2c18', 'J': '#7a4c2c', 'c': '#fff3d6', 'x': '#cfe7ee', 'X': '#9cc6d3',  # 咖啡果冻
    'm': '#b03a2e',  # 嘴
}

def blank():
    return [['.'] * W for _ in range(H)]

def put(g, x, y, c):
    if 0 <= x < W and 0 <= y < H:
        g[y][x] = c

def ellipse(g, cx, cy, rx, ry, c, cond=None):
    for y in range(H):
        for x in range(W):
            if ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1 and (cond is None or cond(x, y)):
                g[y][x] = c

def rect(g, x0, y0, x1, y1, c):
    for y in range(y0, y1 + 1):
        for x in range(x0, x1 + 1):
            put(g, x, y, c)

def outline(g, inner='k'):
    """给所有非透明区域外圈描一像素黑边"""
    out = [row[:] for row in g]
    for y in range(H):
        for x in range(W):
            if g[y][x] != '.':
                continue
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < W and 0 <= ny < H and g[ny][nx] not in ('.', 'k'):
                    out[y][x] = inner
                    break
    return out

HEAD_CX, HEAD_CY = 24, 19

def base(glow=False, arm='down'):
    g = blank()
    # ---- 身体（制服）----
    rect(g, 16, 33, 31, 43, 'u')
    for y in range(33, 44):  # 两侧收一点
        if y > 40:
            put(g, 16, y, '.'); put(g, 31, y, '.')
    for y in range(33, 44):
        put(g, 30, y, 'U')
    # 衬衫 V 领
    for i in range(6):
        for x in range(24 - (5 - i), 24 + (5 - i)):
            put(g, x, 33 + i, 'w')
    put(g, 23, 39, 'w'); put(g, 24, 39, 'w')
    for y in range(33, 39):
        put(g, 23 - (38 - y) // 1 + (38 - y) - (38 - y), y, g[y][23])
    # 领带红点
    put(g, 23, 34, 'r'); put(g, 24, 34, 'r'); put(g, 23, 35, 'r'); put(g, 24, 35, 'r')
    # 纽扣
    put(g, 23, 41, 'U'); put(g, 24, 41, 'U')
    # 手臂
    if arm == 'down':
        rect(g, 13, 34, 15, 41, 'u'); rect(g, 32, 34, 34, 41, 'U')
        rect(g, 13, 42, 15, 43, 's'); rect(g, 32, 42, 34, 43, 's')
    # 腿和鞋
    rect(g, 18, 44, 22, 45, 'U'); rect(g, 25, 44, 29, 45, 'U')
    rect(g, 17, 46, 22, 46, 'a'); rect(g, 25, 46, 30, 46, 'a')

    # ---- 头 ----
    rect(g, 21, 30, 26, 32, 'S')  # 脖子
    ellipse(g, HEAD_CX, HEAD_CY + 0.5, 14.5, 12.3, 's')
    # 下颌两侧一点阴影
    ellipse(g, HEAD_CX, HEAD_CY + 0.5, 14.5, 12.3, 'S', cond=lambda x, y: y >= 28 and abs(x + 0.5 - HEAD_CX) > 7)
    # 头发：上半 + 两侧鬓角 + 刘海锯齿
    ellipse(g, HEAD_CX, HEAD_CY - 1, 16, 13.5, 'h', cond=lambda x, y: y <= 15)
    ellipse(g, HEAD_CX, HEAD_CY, 16, 14, 'h', cond=lambda x, y: (x <= 11 or x >= 36) and y <= 27)
    fringe = [16, 17, 18, 16, 15, 17, 18, 17, 15, 16, 18, 17, 16, 15, 17, 18, 16, 15, 17, 18, 16, 17]
    for i, x in enumerate(range(13, 35)):
        for y in range(10, fringe[i]):
            if g[y][x] in ('s', 'S'):
                g[y][x] = 'h'
    # 头发暗部与高光
    for y in range(H):
        for x in range(W):
            if g[y][x] == 'h' and ((x + 0.5 - (HEAD_CX - 3)) / 15.5) ** 2 + ((y + 0.5 - (HEAD_CY - 3)) / 13) ** 2 > 1:
                g[y][x] = 'H'
    # 刘海下沿的阴影线
    for x in range(12, 36):
        for y in range(10, 20):
            if g[y][x] == 'h' and g[y + 1][x] in ('s', 'S'):
                g[y][x] = 'H'
                break
    for (x, y) in [(15, 8), (16, 8), (17, 7), (18, 7), (19, 7), (16, 9), (17, 9), (20, 6), (21, 6)]:
        put(g, x, y, 'i')
    # 呆毛
    for (x, y) in [(25, 4), (26, 3), (27, 2), (28, 2), (26, 4)]:
        put(g, x, y, 'h')

    # ---- 抑制器（头顶两侧的天线）----
    tip = 'r' if glow else 'A'
    for (x0, y0, dx) in [(13, 9, -1), (34, 9, 1)]:
        for t in range(5):
            put(g, x0 + dx * (t // 2), y0 - t, 'a')
            put(g, x0 + dx * (t // 2) + 1, y0 - t, 'a')
        kx, ky = x0 + dx * 2, y0 - 6
        rect(g, kx - 1 + (1 if dx > 0 else 0), ky - 1, kx + 1 + (1 if dx > 0 else 0), ky + 1, 'a')
        put(g, kx + (1 if dx > 0 else 0), ky, tip)
        if glow:
            put(g, kx + (1 if dx > 0 else 0), ky - 1, 'R')

    # ---- 眼镜 ----
    for cx in (18, 29):
        rect(g, cx - 4, 19, cx + 4, 24, 'g')
        rect(g, cx - 4, 19, cx + 4, 19, 'G'); rect(g, cx - 4, 24, cx + 4, 24, 'G')
        rect(g, cx - 4, 19, cx - 4, 24, 'G'); rect(g, cx + 4, 19, cx + 4, 24, 'G')
        put(g, cx - 3, 20, 'q'); put(g, cx - 2, 20, 'q'); put(g, cx - 3, 21, 'q')
    rect(g, 23, 20, 24, 20, 'G')  # 鼻梁
    rect(g, 10, 20, 13, 20, 'G'); rect(g, 34, 20, 37, 20, 'G')
    return g

def eyes(g, kind):
    """眼睛画在镜片里"""
    for cx in (18, 29):
        if kind == 'open':      # 面瘫：竖条小眼
            rect(g, cx, 21, cx, 22, 'k'); put(g, cx + 1, 21, 'k'); put(g, cx + 1, 22, 'k')
        elif kind == 'blink':
            rect(g, cx - 1, 22, cx + 2, 22, 'k')
        elif kind == 'half':    # 半眯眼（吐槽）
            rect(g, cx - 2, 21, cx + 2, 21, 'G'); rect(g, cx, 22, cx + 1, 22, 'k')
        elif kind == 'happy':   # ^ ^
            put(g, cx - 1, 22, 'k'); put(g, cx, 21, 'k'); put(g, cx + 1, 21, 'k'); put(g, cx + 2, 22, 'k')

def mouth(g, kind):
    if kind == 'flat':
        rect(g, 23, 28, 25, 28, 'k')
    elif kind == 'small':
        rect(g, 23, 28, 24, 28, 'k')
    elif kind == 'smile':
        put(g, 22, 27, 'k'); rect(g, 23, 28, 25, 28, 'k'); put(g, 26, 27, 'k'); put(g, 24, 28, 'm')

def blush(g):
    for cx in (15, 32):
        rect(g, cx - 1, 26, cx + 1, 26, 'p')

def jelly(g):
    """胸前捧着一杯咖啡果冻"""
    # 杯子（玻璃）
    rect(g, 18, 35, 29, 44, 'x'); rect(g, 28, 35, 29, 44, 'X'); rect(g, 18, 35, 18, 44, 'X')
    rect(g, 19, 39, 27, 44, 'j'); rect(g, 19, 39, 27, 40, 'J')  # 咖啡冻
    put(g, 21, 42, 'J'); put(g, 25, 41, 'J')
    rect(g, 19, 36, 27, 38, 'c'); rect(g, 21, 34, 25, 35, 'c'); put(g, 23, 33, 'c')  # 奶油
    rect(g, 17, 45, 30, 45, 'X')  # 杯底
    # 双手捧着
    rect(g, 14, 39, 18, 42, 's'); rect(g, 29, 39, 33, 42, 's')
    rect(g, 13, 34, 15, 41, '.'); rect(g, 32, 34, 34, 41, '.')
    rect(g, 13, 42, 15, 43, '.'); rect(g, 32, 42, 34, 43, '.')

def push_glasses(g):
    """右手推眼镜（正经）"""
    rect(g, 32, 34, 34, 43, '.')
    for y in range(27, 37):      # 小臂斜向上
        x = 33 + (y - 27) // 4
        rect(g, x - 1, y, x + 1, y, 'U')
    rect(g, 30, 22, 34, 26, 's')  # 手
    rect(g, 30, 22, 30, 24, 'S')
    put(g, 33, 21, 's'); put(g, 32, 21, 's')  # 食指抵住镜框

def frame(name):
    if name == 'idle':
        g = base(); eyes(g, 'open'); mouth(g, 'flat')
    elif name == 'blink':
        g = base(); eyes(g, 'blink'); mouth(g, 'flat')
    elif name == 'read':
        g = base(glow=True); eyes(g, 'open'); mouth(g, 'small')
    elif name == 'readBlink':
        g = base(glow=True); eyes(g, 'blink'); mouth(g, 'small')
    elif name == 'deadpan':
        g = base(); eyes(g, 'half'); mouth(g, 'flat')
    elif name == 'serious':
        g = base(); eyes(g, 'open'); mouth(g, 'flat'); push_glasses(g)
    elif name == 'jelly':
        g = base(); eyes(g, 'happy'); mouth(g, 'smile'); blush(g); jelly(g)
    return outline(g)

FRAMES = ['idle', 'blink', 'read', 'readBlink', 'deadpan', 'serious', 'jelly']

def to_ts(frames):
    lines = [
        '// 由 scripts/draw-aibo.py 生成，请勿手改。',
        '// 「相棒」：原创像素小人，致敬《齐木楠雄的灾难》（原作 © 麻生周一 / 集英社）。',
        '',
        'export const aiboPalette: Record<string, string> = {',
    ]
    for k, v in PAL.items():
        lines.append(f"  {k}: '{v}',")
    lines += ['}', '', 'export const aibo = {']
    for n, g in frames.items():
        lines.append(f'  {n}: [')
        for row in g:
            lines.append(f"    '{''.join(row)}',")
        lines.append('  ],')
    lines += ['} as const', '', 'export type AiboFrame = keyof typeof aibo', '']
    return '\n'.join(lines)

if __name__ == '__main__':
    frames = {n: frame(n) for n in FRAMES}
    root = pathlib.Path(__file__).resolve().parent.parent
    (root / 'src/pixel/aibo.ts').write_text(to_ts(frames), encoding='utf-8')
    if '--preview' in sys.argv:
        from PIL import Image
        out = sys.argv[sys.argv.index('--preview') + 1]
        S = 8
        img = Image.new('RGB', (W * S * len(frames) + 8 * (len(frames) - 1), H * S), '#fbfaf6')
        for i, g in enumerate(frames.values()):
            for y in range(H):
                for x in range(W):
                    c = g[y][x]
                    if c in PAL:
                        img.paste(PAL[c], (i * (W * S + 8) + x * S, y * S, i * (W * S + 8) + x * S + S, y * S + S))
        img.save(out)
    print('ok')
