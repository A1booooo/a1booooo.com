# a1booooo.com · 陈玥青的个人网站

黑白网点 + 朱红的漫画风个人站。打开右上角的「心灵感应」开关，可以读到我的内心 OS。

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 产物在 dist/，可直接部署到任意静态托管
```

## 改内容只需要动一个文件

`src/data/profile.ts` —— 所有文案、技能、修炼进度、履历、作品、背包、动态、联系方式都在这里，类型定义见 `src/data/types.ts`。

- **内心 OS**：各处的 `os` 字段，心灵感应模式打开时显示。标了 `// TODO: 待确认` 的是推测的主观感受，请本人确认。
- 技能等级：`skillCategories[].skills[].level`（1–10）
- 修炼进度：`training[].progress`（0–100）
- 简历 PDF：`public/resume/`
- 图标 key：`src/pixel/icons.ts`（来自 pixelarticons，MIT）

## 改了文案以后：重新裁剪字体

标题用的「缝合像素」和 OS 用的「站酷快乐体」都只打包了页面上用到的字（合计约 64 KB）。
新增的字如果没裁进去，会退回系统字体显示。改完文案后运行：

```bash
pip install fonttools brotli   # 只需一次
npm run fonts
```

## 相棒

封面上的像素小人「相棒」由 `scripts/draw-aibo.py` 生成（`python3 scripts/draw-aibo.py --preview out.png` 可导出预览图，需要 Pillow）。
它是致敬《齐木楠雄的灾难》的原创像素画，原作 © 麻生周一 / 集英社。

彩蛋：连点相棒 5 次；在页面上按 ↑↑↓↓←→←→BA。

## 字体与素材许可

- 缝合像素字体 Fusion Pixel（SIL OFL 1.1）：`src/assets/fonts/OFL-fusion-pixel.txt`
- 站酷快乐体 ZCOOL KuaiLe（SIL OFL 1.1）：`src/assets/fonts/OFL-zcool-kuaile.txt`
- 图标 pixelarticons（MIT）
