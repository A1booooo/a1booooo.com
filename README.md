# 个人网站 · 像素 RPG 角色面板

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 产物在 dist/，可直接部署到任意静态托管
```

## 改内容只需要动一个文件

`src/data/profile.ts` —— 所有文案、技能、修炼进度、履历、项目、动态、联系方式都在这里，类型定义见 `src/data/types.ts`。

- 技能等级：`skillCategories[].skills[].level`（1–10）
- 修炼进度：`training[].progress`（0–100）
- 简历 PDF：`public/resume/`
- 图标 key：`src/pixel/icons.ts`（来自 pixelarticons，MIT）
- 吉祥物 / 云 / 地景像素画：`src/pixel/sprites.ts`、`src/components/layout/PixelLandscape.tsx`

彩蛋：在页面上按 ↑↑↓↓←→←→BA。
