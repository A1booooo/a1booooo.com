/**
 * ★ 个人网站唯一的数据源 ★
 *
 * 页面上所有文案都来自这里，组件内不写任何个人信息或中文文案。
 * 数据来源：两份最新版简历（AI 前端 / AI 全栈）+ knowledge 知识库里的学习主线与学习报告。
 *
 * - 修改技能等级：skillCategories[].skills[].level（1-10 → 10 格像素条）
 * - 修改修炼进度：training[].progress（0-100，自评估算，建议每周更新）
 * - 标了「示例，待替换」的是资料里没有、先占位的内容
 * - 图标 key 见 src/pixel/icons.ts
 */
import type { Profile } from './types'

const RESUME_FRONTEND = '/resume/chenyueqing-ai-frontend.pdf'
const RESUME_FULLSTACK = '/resume/chenyueqing-ai-fullstack.pdf'
const EMAIL = '2034293341@qq.com'

export const profile: Profile = {
  meta: {
    title: '陈玥青 · AI 前端开发 · 进阶 AI 全栈',
    description:
      '陈玥青的个人主页：AI 前端开发实习生，正在进阶 AI 全栈与 Agent 开发，东莞理工学院计科 2028 届。技能、实习经历与项目。',
    lang: 'zh-CN',
  },

  /* ============================== 界面文案 ============================== */
  ui: {
    brand: 'YUEQING.DEV',
    nav: [
      { id: 'status', label: 'STATUS', sub: '状态' },
      { id: 'about', label: 'PROFILE', sub: '档案' },
      { id: 'skills', label: 'SKILLS', sub: '技能' },
      { id: 'training', label: 'TRAINING', sub: '修炼' },
      { id: 'quests', label: 'QUESTS', sub: '履历' },
      { id: 'projects', label: 'LOOT', sub: '项目' },
      { id: 'log', label: 'LOG', sub: '日志' },
    ],
    navAria: { main: '主导航', mobile: '快捷导航' },
    navCta: '组队',
    sections: {
      status: { eyebrow: '01 · STATUS', title: '角色状态' },
      about: {
        eyebrow: '02 · PROFILE',
        title: '角色档案',
        desc: '关于我，以及我做事的方式。',
      },
      skills: {
        eyebrow: '03 · SKILLS',
        title: '已掌握技能',
        desc: '悬停查看实战说明，点击可固定详情。等级按简历措辞如实评定，不注水。',
      },
      training: {
        eyebrow: '04 · TRAINING',
        title: '修炼中',
        desc: '正在充能的新技能。进度为自评估算，跟着学习记录持续更新。',
      },
      quests: {
        eyebrow: '05 · QUESTS',
        title: '冒险履历',
        desc: '实习经历、教育背景与荣誉。面试官可以直接从这里下载简历。',
      },
      projects: {
        eyebrow: '06 · LOOT',
        title: '项目战利品',
        desc: '独立完成的作品，以及支撑我学习的工具。',
      },
      log: {
        eyebrow: '07 · LOG',
        title: '背包与日志',
        desc: '下班后的我，以及最近在忙什么。',
      },
      contact: {
        eyebrow: '08 · PARTY',
        title: '组队邀请',
        desc: '正在寻找 AI 前端 / AI 全栈实习 —— 立即到岗，可实习一年以上。',
      },
    },
    hero: {
      hello: 'HELLO, WORLD! 我是',
      vitalsTitle: 'STATUS',
      attributesTitle: 'ATTRIBUTES',
      scrollHint: 'SCROLL',
    },
    skills: {
      detailTitle: '技能详情',
      hoverHint: '← 悬停或点击任意技能，查看实战说明',
      highlightsLabel: '实战说明',
      relatedLabel: '出处',
      pinnedLabel: '已固定',
      unpin: '取消固定',
      levelPrefix: 'Lv.',
      allLabel: 'ALL',
    },
    training: {
      badge: 'TRAINING',
      stageLabel: '当前阶段',
      startedLabel: '开始于',
      nextLabel: '下一里程碑',
      whyLabel: '为什么练',
      resourcesLabel: '修炼资料',
      logLabel: '修炼日志',
      charge: '注入经验',
      expPopup: '+EXP',
      expand: '展开详情',
      collapse: '收起',
    },
    about: {
      principlesTitle: '做事方式',
      factsTitle: '基础信息',
    },
    quests: {
      mainQuest: '主线任务',
      sideQuest: '支线任务',
      stackLabel: '技术栈',
      educationTitle: '教育经历',
      awardsTitle: '荣誉成就',
      resumeTitle: '下载简历',
    },
    projects: {
      roleLabel: '角色',
      stackLabel: '技术栈',
      highlightsLabel: '关键实现',
    },
    log: {
      inventoryTitle: '背包 · 兴趣爱好',
      inventoryDesc: '悬停物品查看说明',
      rarity: { common: '普通', rare: '稀有', epic: '史诗', legendary: '传说' },
      updatesTitle: 'PATCH NOTES · 近期动态',
      latest: 'NEW',
    },
    contact: {
      copy: '复制邮箱',
      copied: '已复制！期待你的来信 ✦',
      emailLabel: 'EMAIL',
    },
    mascot: {
      name: 'Bit',
      hint: '点我',
      lines: [
        '嗨！我是 Bit，玥青的像素伙伴。',
        '技能卡可以点击固定，慢慢看～',
        '修炼区的经验条，点一下会充能！',
        '悄悄告诉你：试试 ↑↑↓↓←→←→BA',
        'AI PPT 平台已经部署上线啦 ✦',
        '玥青最近在追《我心危》，市川和山田太好了！',
        'PS5 已就位，就等《GTA6》了。',
        '面试官你好！简历在「冒险履历」里下载。',
      ],
    },
    konami: {
      title: 'GOD MODE ON',
      text: '全部技能临时 +1 —— 彩蛋被你发现啦！',
    },
    footer: '© 2026 陈玥青 · Made with React, pixels & ☕ · Icons by pixelarticons',
    consoleGreeting: '你好，同行！对这个像素小站或实习机会感兴趣？欢迎来信：',
    backToTop: '回到顶部',
  },

  /* ============================== 角色 ============================== */
  character: {
    name: '陈玥青',
    nameEn: 'Chen Yueqing',
    level: 'LV.03',
    levelNote: '大三 · 2028 届',
    status: '立即到岗 · 可实习一年以上',
    mainClass: {
      label: 'AI 前端',
      title: 'AI 前端开发实习生',
      summary:
        '专注复杂交互与体验：滚动叙事、移动端弱网优化、跨端动态表单，以及 AI 产品里的画布编辑与流式交互。',
      tags: [
        { label: 'React / TypeScript', accent: 'blue' },
        { label: '动效交互', accent: 'amber' },
        { label: '性能优化', accent: 'mint' },
        { label: 'Taro / Expo 跨端', accent: 'lilac' },
        { label: 'Playwright', accent: 'gray' },
      ],
    },
    advance: {
      title: 'CLASS UP · 转职任务',
      label: 'AI 全栈',
      status: '进阶中',
      progress: 60,
      note: '已有全栈实习与独立全栈项目实践，正在深入 Agent 工程与工具设计。',
      mainTagsLabel: '主修',
      tagsLabel: '进阶',
      tags: [
        { label: 'LangGraph', accent: 'lilac' },
        { label: 'FastAPI', accent: 'mint' },
        { label: 'Node.js / MySQL', accent: 'blue' },
        { label: 'Redis / ARQ', accent: 'coral' },
        { label: '并发与幂等', accent: 'amber' },
      ],
    },
    resumes: [
      { label: '下载简历 · AI 前端版', url: RESUME_FRONTEND, icon: 'download' },
      { label: '下载简历 · AI 全栈版', url: RESUME_FULLSTACK, icon: 'download' },
    ],
    taglines: [
      '把复杂的 AI 能力，做成顺手的交互。',
      '滚动叙事、弱网优化、画布编辑 —— 在细节里打磨体验。',
      '先想失败路径：重试、中断、迟到回调，一个都不放过。',
      'AI 前端出发，进阶 AI 全栈与 Agent 开发。',
      '正在修炼：Agent 工程 & MCP 工具设计。',
    ],
    bio: '东莞理工学院计算机科学与技术 2028 届本科生。做过面向海外移动端的 Shopify 品牌站、覆盖 H5 / 小程序 / 原生端的多端协作平台，也独立开发并上线了一个 AI PPT 生成与编辑平台。',
    vitals: [
      { key: 'HP', label: '精力', value: 96, max: 100, accent: 'coral', note: '立即到岗，状态满格' },
      { key: 'MP', label: '灵感', value: 82, max: 100, accent: 'blue', note: '刚完成 AI PPT 全站交互改版 · 靠漫画回蓝' },
      { key: 'EXP', label: '实习月数', value: 6, max: 12, accent: 'amber', note: '2026.06 – 2026.11 · 目标：一年以上' },
    ],
    attributes: [
      { label: '交互实现', value: 86, note: '六幕滚动叙事、16:9 画布拖拽编辑' },
      { label: '工程稳健', value: 82, note: '幂等、版本校验、失败恢复是默认动作' },
      { label: '性能意识', value: 78, note: '弱网首幕图片体积 -66.7%' },
      { label: 'AI 编排', value: 72, note: 'LangGraph + Tool Calling + Pydantic' },
      { label: '学习力', value: 90, note: '五条学习主线并行推进' },
    ],
    infoRows: [
      { icon: 'school', label: 'Guild', value: '东莞理工学院 · 计科' },
      { icon: 'calendar', label: 'Since', value: '2024.09 入学 · 2028 届' },
      { icon: 'briefcase', label: 'Last Quest', value: '全栈开发实习 · 6 个月' },
    ],
  },

  /* ============================== 已掌握技能 ============================== */
  skillCategories: [
    {
      id: 'frontend',
      label: '前端核心',
      icon: 'code',
      accent: 'blue',
      skills: [
        {
          id: 'ts',
          name: 'TypeScript / JavaScript',
          icon: 'braces',
          level: 7,
          rank: '熟练',
          summary: '日常主力语言，多端项目与个人项目全量 TypeScript。',
          highlights: [
            '鸿毛合创用 Schema 定义字段显隐、联动与校验，以稳定字段标识关联输入、附件与权限。',
            'AI PPT 前后端共享布局与主题数据结构，预览与 PPTX 导出同源。',
          ],
          related: ['鸿毛合创', 'AI PPT 平台'],
        },
        {
          id: 'react',
          name: 'React',
          icon: 'react',
          level: 7,
          rank: '熟练',
          summary: '复杂编辑器级交互：画布、拖拽、原位编辑、撤销重做。',
          highlights: [
            '基于 16:9 DOM 画布统一复用编辑、缩略图与演示视图，支持固定模板与灵活布局树求解及等比缩放。',
            '实现原位文本编辑、分隔线拖拽调权与块跨容器重排。',
          ],
          related: ['AI PPT 平台'],
        },
        {
          id: 'css-motion',
          name: 'HTML / CSS & 动效',
          icon: 'sparkles',
          level: 7,
          rank: '熟练',
          summary: '滚动叙事、媒体动效、布局稳定性，动效尊重「减少动态效果」。',
          highlights: [
            '实现 Shopify 首页六幕滚动叙事，以统一进度驱动图层动画，管理视频循环、顺播与定格。',
            '结合首帧就绪与播放代次校验，解决快速往返滚动中的错播和闪帧。',
            '为延迟加载图片预留尺寸修复布局跳动；AI PPT 中用 GSAP / Anime.js 做粒子与交错入场。',
          ],
          related: ['Shopify 品牌站', 'AI PPT 平台'],
        },
        {
          id: 'tailwind',
          name: 'Tailwind CSS',
          icon: 'palette',
          level: 6,
          rank: '进阶',
          summary: 'AI PPT 全站样式与主题 token 体系。',
          highlights: ['用 Tailwind 搭建 AI PPT 工作台、大纲页与编辑器，适配 320 – 1440 px 多尺寸。'],
          related: ['AI PPT 平台'],
        },
        {
          id: 'react-query',
          name: 'React Query',
          icon: 'sync',
          level: 6,
          rank: '进阶',
          summary: '乐观更新、撤销 / 重做与版本冲突控制。',
          highlights: [
            '结合 React Query 乐观更新与撤销 / 重做提升编辑响应。',
            '通过按页串行队列与 revision 校验，控制块级更新顺序及版本冲突。',
          ],
          related: ['AI PPT 平台'],
        },
        {
          id: 'perf',
          name: '浏览器渲染 & 性能',
          icon: 'speed',
          level: 6,
          rank: '进阶',
          summary: '理解事件循环与渲染流水线，先测量再优化。',
          highlights: [
            '通过 Performance 与请求瀑布定位首幕瓶颈，移除隐藏图片请求、切至 WebP 并调整资源优先级。',
            '模拟 4G 弱网 + CPU 降速 + 冷缓存：首幕核心图片体积降 66.7%，完整露出耗时中位数降 40.2%。',
            'AI PPT 工作台路由延迟加载，入口 JS gzip 从 267 kB 降到 109 kB。',
            '围绕 LCP / CLS / INP 指标，用本地 Lighthouse 复盘 Shopify 首屏与交互性能。',
          ],
          related: ['Shopify 品牌站', 'AI PPT 平台'],
        },
      ],
    },
    {
      id: 'cross',
      label: '跨端开发',
      icon: 'phone',
      accent: 'lilac',
      skills: [
        {
          id: 'taro',
          name: 'Taro 小程序',
          icon: 'phone',
          level: 5,
          rank: '上手',
          summary: '有完整业务项目经验，覆盖 H5 与微信小程序。',
          highlights: ['在 Taro 与 Expo 间复用表单规则和提交流程，分别适配各端文件与存储能力。'],
          related: ['鸿毛合创'],
        },
        {
          id: 'expo',
          name: 'React Native / Expo',
          icon: 'laptop',
          level: 5,
          rank: '上手',
          summary: '原生端业务开发与多端能力适配。',
          highlights: ['资料保存、附件上传与公开发布分阶段处理，保存本地输入并复用已完成步骤，应对上传中断。'],
          related: ['鸿毛合创'],
        },
      ],
    },
    {
      id: 'ai',
      label: 'AI / Agent',
      icon: 'robot',
      accent: 'coral',
      skills: [
        {
          id: 'langgraph',
          name: 'LangGraph 编排',
          icon: 'branch',
          level: 6,
          rank: '进阶',
          summary: '大纲与单页生成的结构化工作流。',
          highlights: ['使用 LangGraph 编排大纲与单页生成，通过 Pydantic 与业务规则校验输出。'],
          related: ['AI PPT 平台'],
        },
        {
          id: 'tool-calling',
          name: 'Tool Calling',
          icon: 'tools',
          level: 6,
          rank: '进阶',
          summary: '自然语言改稿：模型提案、校验、用户确认后应用。',
          highlights: [
            '经工具调用生成修改提案，校验内容块类型与锁定状态后，由用户逐项确认应用。',
            '工具先改副本，提案与落库边界清晰。',
          ],
          related: ['AI PPT 平台'],
        },
        {
          id: 'pydantic',
          name: 'Pydantic 结构化输出',
          icon: 'shield',
          level: 6,
          rank: '进阶',
          summary: '判别联合 + 校验修复回路，防御 LLM 输出错误。',
          highlights: ['设计结构化输出的三层防御与校验修复回路，并用离线夹具做对照实验。'],
          related: ['AI PPT 平台'],
        },
        {
          id: 'ai-coding',
          name: 'AI 辅助开发 · Skills',
          icon: 'wand',
          level: 7,
          rank: '熟练',
          summary: '使用 Claude Code / Codex 辅助开发，把高频流程封装为 Skills。',
          highlights: [
            '用 AGENTS.md + Skills 搭建个人学习知识库的陪学工作流。',
            '让 Agent 在多尺寸下用浏览器自动化做交互验收，再发布上线。',
          ],
          related: ['学习知识库', 'AI PPT 平台'],
        },
      ],
    },
    {
      id: 'eng',
      label: '工程化 & 后端',
      icon: 'tools',
      accent: 'mint',
      skills: [
        {
          id: 'playwright',
          name: 'Playwright 测试',
          icon: 'test',
          level: 6,
          rank: '进阶',
          summary: '用测试控制加载时机，验证交互与布局稳定。',
          highlights: [
            '以 Playwright 控制图片加载时机，验证布局跳动修复。',
            '在 320 / 360 / 768 / 1440 px 下回归 AI PPT 的关键交互。',
          ],
          related: ['Shopify 品牌站', 'AI PPT 平台'],
        },
        {
          id: 'vite',
          name: 'Vite / 质量工具链',
          icon: 'zap',
          level: 6,
          rank: '进阶',
          summary: 'Vite 构建，TypeScript + ESLint + Prettier 保障代码质量。',
          highlights: ['工作台路由按需加载，登录页不再请求工作台代码。'],
          related: ['AI PPT 平台'],
        },
        {
          id: 'node-mysql',
          name: 'Node.js + MySQL',
          icon: 'server',
          level: 5,
          rank: '上手',
          summary: '业务接口、事务与并发控制。',
          highlights: [
            '实现商务对接、报价与合作确认：MySQL 事务内以行锁串行化确认。',
            '校验参与角色、当前状态与报价版本，结合幂等防止按过期报价成单。',
          ],
          related: ['鸿毛合创'],
        },
        {
          id: 'fastapi',
          name: 'FastAPI + PostgreSQL',
          icon: 'database',
          level: 5,
          rank: '上手',
          summary: '异步 AI 应用服务与数据层。',
          highlights: ['为 AI PPT 构建生成、改稿与导出接口，Alembic 管理数据库迁移。'],
          related: ['AI PPT 平台'],
        },
        {
          id: 'redis-arq',
          name: 'Redis + ARQ 异步任务',
          icon: 'package',
          level: 5,
          rank: '上手',
          summary: '多页并发生成、失败重试与断线恢复。',
          highlights: [
            '使用 ARQ 管理多页生成并发并支持失败页重试。',
            '通过 Redis Pub/Sub 与 SSE 推送进度，断线重连后读取状态快照恢复前端展示。',
          ],
          related: ['AI PPT 平台'],
        },
        {
          id: 'docker',
          name: 'Docker Compose 部署',
          icon: 'docker',
          level: 4,
          rank: '入门',
          summary: '把个人项目完整部署到自己的服务器。',
          highlights: ['Compose 编排 PostgreSQL、Redis、API、Worker 与 Nginx，Redis 开启 AOF 持久化。'],
          related: ['AI PPT 平台'],
        },
      ],
    },
    {
      id: 'cs',
      label: '计算机基础',
      icon: 'algorithm',
      accent: 'sky',
      skills: [
        {
          id: 'dsa',
          name: '数据结构与算法',
          icon: 'algorithm',
          level: 6,
          rank: '进阶',
          summary: '蓝桥杯省一，主力语言 JavaScript。',
          highlights: [
            '第 16 届蓝桥杯算法赛省一等奖（2025.04）。',
            '实现 LRU 缓存（哈希表 + 双向链表）与 Morris O(1) 空间中序遍历。',
          ],
          related: ['蓝桥杯', 'LeetCode'],
        },
        {
          id: 'network',
          name: '计算机网络',
          icon: 'globe',
          level: 6,
          rank: '进阶',
          summary: 'HTTP / HTTPS、TCP/IP 与缓存机制。',
          highlights: ['在弱网优化中实际运用资源优先级与缓存策略。'],
          related: ['Shopify 品牌站'],
        },
        {
          id: 'os',
          name: '操作系统',
          icon: 'circuit',
          level: 4,
          rank: '入门',
          summary: '了解进程、线程、内存等基本原理。',
          highlights: ['在异步任务与并发控制的实践中持续加深理解。'],
          related: ['计算机基础'],
        },
      ],
    },
  ],

  /* ============================== 修炼中 ==============================
   * progress 为自评估算，按实际学习情况调整即可。 */
  training: [
    {
      id: 'agent',
      name: 'Agent 工程',
      icon: 'robot',
      accent: 'coral',
      progress: 35,
      startedAt: '2026.10',
      stage: 'Agent 架构、上下文管理与工具调度；精读 Pi-Agent 源码，拆解消息结构与工具调度机制',
      nextMilestone: '把 AI PPT 的改稿流程升级为多步 Agent：规划、调用工具、自检后再生成提案',
      why: 'AI 全栈的上限取决于对 Agent 机制的理解，而不只是会调用 API。',
      resources: [
        { label: 'CS146S · The Modern Software Developer', url: 'https://themodernsoftware.dev/' },
        { label: 'dg-ai-notes · Pi 双轨教程', url: 'https://github.com/buchidonggua/dg-ai-notes' },
      ],
      log: [
        { date: '10-29', text: '梳理 Coding Agent 的整体架构：Agent 循环、工具与上下文。' },
        { date: '11-02', text: 'Pi-Agent 源码：消息结构、工具并行准备与单项拦截。' },
        { date: '11-13', text: '多 Agent：Planner / Executor / Reviewer 分工、通信、共享状态与工具权限。' },
        { date: '11-17', text: 'Agent Harness：终止判断、约束恢复与 Agent 评估流程。' },
      ],
    },
    {
      id: 'mcp',
      name: 'MCP 与工具设计',
      icon: 'plug',
      accent: 'sky',
      progress: 45,
      startedAt: '2026.10',
      stage: 'MCP 协议与工具设计：服务适配、与 workflow / Skill 的分工、Sandbox 隔离',
      nextMilestone: '为 AI PPT 写一个 MCP 服务，开放生成与改稿工具，并接入 OAuth',
      why: '工具设计决定 Agent 能做什么、做得多稳。',
      resources: [{ label: 'CS146S · MCP 与工具设计', url: 'https://themodernsoftware.dev/' }],
      log: [
        { date: '10-30', text: '对比 MCP 与传统 API 适配、Function Calling 的差异。' },
        { date: '10-31', text: '梳理 MCP 与 workflow、Skill 的分工，以及 Sandbox 隔离。' },
      ],
    },
    {
      id: 'verification',
      name: 'Agent 验证 & 代码质量',
      icon: 'test',
      accent: 'mint',
      progress: 30,
      startedAt: '2026.11',
      stage: '验证闭环：类型 / lint / 行为测试 / 运行时校验各防什么错；判断 AI 写的测试是否有效；深模块设计与单向门 / 双向门决策',
      nextMilestone: '在 AI PPT 里从一个真实 bug 走完「复现 → 修复 → 验证 → 留下有效检查」，沉淀项目专用的验证 Skill',
      why: 'Agent 能自动化到哪一步，取决于验证和环境——好的仓库结构与有效的检查，是 AI 写出好代码的前提。',
      resources: [
        { label: 'Stryker Mutator · 变异测试', url: 'https://stryker-mutator.io/' },
        { label: 'typescript-eslint · no-floating-promises', url: 'https://typescript-eslint.io/rules/no-floating-promises/' },
      ],
      log: [
        { date: '11 月', text: 'Poteto 访谈 + pstack：验证是 Agent 循环的关键反馈；内循环执行任务，外循环吸收 issue 与新反馈、调整目标。' },
        { date: '11 月', text: '判断 AI 写的测试：预期来自需求而非当前实现；故意改错看检查会不会失败；确认 Mock 没替换掉真正要验证的部分。' },
        { date: '11 月', text: '重复纠错沉淀进环境：能改结构就改结构，否则补类型、lint 或测试，并证明它能抓住旧错误。' },
        { date: '11 月', text: '深模块 vs 浅模块：小接口藏住复杂实现，好的仓库结构让 AI 更容易写对。' },
        { date: '11 月', text: '好测试与坏测试的区别；单向门 / 双向门：不可逆的改动先慎重验证，可逆的改动快速试错。' },
      ],
    },
    {
      id: 'motion',
      name: '动效工程',
      icon: 'sparkles',
      accent: 'blue',
      progress: 40,
      startedAt: '2026.11',
      stage: '在 AI PPT 中落地 GSAP 粒子、Anime.js 交错入场、React Bits 聚光卡',
      nextMilestone: '沉淀可复用的动效组件，减少动态效果下稳定降级',
      why: '好的动效让用户「看懂」状态变化，而不只是好看。',
      resources: [
        { label: 'Anime.js', url: 'https://animejs.com/' },
        { label: 'React Bits', url: 'https://reactbits.dev/' },
        { label: 'Uiverse', url: 'https://uiverse.io/' },
      ],
      log: [
        { date: '11-26', text: '大纲生成与 AI 改稿加入 Canvas 粒子带。' },
        { date: '11-27', text: '全站侧栏与列表交错入场改版。' },
      ],
    },
  ],

  /* ============================== 档案 ============================== */
  about: {
    paragraphs: [
      '我是陈玥青，东莞理工学院计算机科学与技术专业 2028 届本科生，方向是 AI 前端 / AI 全栈。',
      '在深圳意思网络的全栈实习里，我做过移动端访问占比超 80% 的海外 Shopify 品牌站，也做过覆盖 H5、微信小程序与原生端的多端协作平台。我很在意那些容易被忽略的细节：快速往返滚动时视频会不会错播，上传中断后能不能接着来，旧页面会不会覆盖新数据。',
      '课余我独立开发了 AI PPT 生成与编辑平台，从 LangGraph 结构化生成、ARQ 异步任务，到 16:9 画布编辑与可编辑 PPTX 导出，并部署到了自己的服务器上。我也用 Claude Code / Codex 搭了一套个人学习知识库，把高频流程沉淀成 Skills。',
      '接下来，我想以 AI 前端为根基，继续深入 AI 全栈与 Agent 开发：Agent 架构、上下文管理与工具调度。我相信技术要服务于业务，而不是单纯堆叠。',
      '下班后的我是个漫画和游戏爱好者：喜欢搞笑、人物鲜活、感情发展自然的故事，也刚入手了 PS5。',
    ],
    principles: [
      { icon: 'shield', title: '先想失败路径', text: '重试、中断、迟到回调、旧页面覆盖 —— 幂等与版本校验是默认动作。' },
      { icon: 'chart', title: '用数据说话', text: '性能优化先测再改：弱网、CPU 降速、冷缓存，取中位数对比。' },
      { icon: 'check', title: '验证闭环', text: '改完在多尺寸下跑一遍自动化再说「完成」；不只看测试通过，还要问真实错误出现时它会不会失败。' },
      { icon: 'target', title: '技术服务业务', text: '先弄清业务要解决什么问题，再决定方案的轻重，不为堆技术而堆技术。' },
    ],
    facts: [
      { label: '学校', value: '东莞理工学院' },
      { label: '专业', value: '计算机科学与技术（本科）' },
      { label: '届别', value: '2028 届' },
      { label: '方向', value: 'AI 前端 → 进阶 AI 全栈 / Agent' },
      { label: '到岗', value: '立即到岗 · 可实习一年以上' },
      { label: '荣誉', value: '蓝桥杯算法赛省一等奖' },
    ],
  },

  /* ============================== 履历 ============================== */
  experience: [
    {
      id: 'yisi',
      org: '深圳意思网络有限公司',
      role: '全栈开发实习生',
      period: '2026.06 – 2026.11',
      kind: 'main',
      quests: [
        {
          title: 'Shopify 品牌站与营销活动页',
          context:
            '面向移动端访问占比超 80% 的海外独立站，参与品牌站与营销活动页开发，覆盖 PC / 移动端动效交互、媒体加载优化及布局适配。',
          stack: ['JavaScript', 'CSS 动效', 'Performance', 'WebP', 'Playwright'],
          achievements: [
            {
              title: '滚动叙事与视频控制',
              text: '实现首页六幕滚动叙事，以统一进度驱动图层动画，管理视频循环、顺播与定格；结合首帧就绪与播放代次校验，解决快速往返滚动中的错播和闪帧。',
            },
            {
              title: '移动端弱网优化',
              text: '通过 Performance 与请求瀑布定位首幕瓶颈，移除隐藏图片请求、切至 WebP 并调整资源优先级；在模拟 4G 弱网、CPU 降速及冷缓存下，首幕核心图片体积降 66.7%，完整露出耗时中位数降 40.2%。',
            },
            {
              title: '媒体加载与布局稳定性',
              text: '预加载角色视频首帧封面，待视频可显示后切换并校验当前角色，隔离迟到回调；为延迟加载图片预留尺寸修复布局跳动，以 Playwright 控制加载时机验证。',
            },
          ],
        },
        {
          title: '鸿毛合创 · 多端资源与项目协作平台',
          context: '负责核心业务开发与多端落地，覆盖 H5、微信小程序与原生端，支持资源发布、商务对接及合作推进。',
          stack: ['TypeScript', 'React', 'React Native / Expo', 'Taro', 'Node.js', 'MySQL'],
          achievements: [
            {
              title: '动态表单与跨端复用',
              text: '面向不同主体与资源类目，通过 Schema 配置字段显隐、联动与校验；以稳定字段标识关联输入和附件，在 Taro、Expo 间复用表单与提交流程，适配各端文件及存储能力。',
            },
            {
              title: '发布交互与失败恢复',
              text: '将资料保存、附件上传与公开发布分阶段处理，保存本地输入并复用已完成步骤；结合幂等和编辑版本校验，处理重复提交、上传中断与旧页面覆盖。',
            },
            {
              title: '合作流程与并发处理',
              text: '实现商务对接、报价与合作确认，结合 MySQL 事务、行锁与报价版本校验处理并发确认，防止按过期报价成单，并以幂等机制防止重复成单。',
            },
          ],
        },
      ],
    },
  ],

  /* ============================== 项目 ============================== */
  projects: [
    {
      id: 'ai-ppt',
      name: 'AI PPT 生成与编辑平台',
      period: '2026.09 – 2026.11',
      role: '独立开发 · 全栈',
      tagline: '从一句主题到可编辑 PPTX 的 AI 演示文稿工作台',
      description:
        '支持主题 / 文档生成、自然语言受控改稿、在线画布编辑与可编辑 PPTX 导出，已用 Docker Compose 部署上线。',
      icon: 'slides',
      accent: 'blue',
      metrics: [
        { label: '入口 JS（gzip）', value: '267→109 kB' },
        { label: '页级并发 1→3 · 耗时中位数', value: '39.9→15.2 s' },
        { label: '多尺寸交互回归', value: '320–1440 px' },
      ],
      highlights: [
        {
          title: '画布渲染与版式编辑',
          text: '16:9 DOM 画布统一复用编辑、缩略图与演示视图；支持固定模板与灵活布局树求解，预览与 PPTX 导出共享数据结构。',
        },
        {
          title: '编辑保存与版本控制',
          text: 'React Query 乐观更新 + 撤销 / 重做；按页串行队列与 revision 校验控制块级更新顺序与版本冲突。',
        },
        {
          title: '受控改稿与流式恢复',
          text: 'LangGraph + Pydantic 编排结构化生成，工具调用生成修改提案，校验后由用户确认应用；SSE + ARQ 管理并发生成、失败重试与断线快照恢复。',
        },
      ],
      stack: ['React', 'TypeScript', 'React Query', 'Tailwind CSS', 'Vite', 'FastAPI', 'LangGraph', 'PostgreSQL', 'Redis', 'ARQ'],
      // 有线上地址或仓库后，在这里加：{ label: '在线体验', url: 'https://...', icon: 'external' }
      links: [],
    },
    {
      id: 'knowledge',
      name: 'AI 陪学知识库',
      period: '2026.10 – 至今',
      role: '个人 · 工作流设计',
      tagline: '让 Agent 陪我学：知识卡、主题地图与五条学习主线',
      description:
        '用 AGENTS.md 约定写入权限与证据规则，用 Skills 封装高频学习流程；知识卡沉淀机制与卡点，学习报告保留真实停点。',
      icon: 'library',
      accent: 'mint',
      metrics: [
        { label: '原子知识卡', value: '40 张' },
        { label: '学习主线', value: '5 条' },
        { label: '学习报告', value: '90+ 篇' },
      ],
      highlights: [
        { title: '可信的进度', text: '只记录有证据的进展：自述、提示与独立验证分开记录，不把「看过」记成「掌握」。' },
        { title: '主题地图', text: '围绕真实问题（异步任务一致性、Agent 输出防御等）把知识卡串成可练习的地图。' },
      ],
      stack: ['Claude Code', 'Codex', 'Skills', 'Markdown', 'Git'],
      links: [],
    },
  ],

  education: [
    { school: '东莞理工学院', major: '计算机科学与技术', degree: '本科', period: '2024.09 – 2028.06' },
  ],

  awards: [{ title: '第 16 届蓝桥杯算法赛 · 省一等奖', date: '2025.04', icon: 'trophy' }],

  /* ============================== 兴趣 ============================== */
  hobbies: [
    {
      id: 'bokuyaba',
      name: '《我心危》',
      icon: 'heart',
      rarity: 'legendary',
      desc: '追完了目前的全部漫画，最喜欢市川和山田。看到市川为理想的学校努力，也给了我为理想实习努力的动力。',
    },
    { id: 'motion-hunt', name: '收集动效灵感', icon: 'sparkles', rarity: 'legendary', desc: '在 Uiverse、React Bits 里淘好看的交互，再想办法用到自己的项目里。' },
    { id: 'seitokai', name: '《学生会也有洞！》', icon: 'star', rarity: 'epic', desc: '最喜欢有栖，收集了黑白头像和作者插画。' },
    {
      id: 'ps5',
      name: 'PS5',
      icon: 'gamepad',
      rarity: 'epic',
      desc: '新入手！玩过《巫师3》，想补《蜘蛛侠》系列，正在等《GTA6》和《影之刃零》。',
    },
    { id: 'notes', name: '写学习笔记', icon: 'notebook', rarity: 'epic', desc: '知识卡 + 主题地图，把学过的东西讲给未来的自己听。' },
    {
      id: 'anime',
      name: '漫画 & 动画',
      icon: 'film',
      rarity: 'rare',
      desc: '偏爱搞笑、人物鲜活、配角有魅力、感情发展自然的作品。《月刊少女野崎君》动画很好笑，《辉夜大小姐》看到一半先存档。',
    },
    {
      id: 'hardware',
      name: '数码折腾',
      icon: 'monitor',
      rarity: 'rare',
      desc: '排查过拯救者的游戏降频（CPU 频率、功耗限制、性能模式），研究显示器刷新率与 HDMI / DP 接口。',
    },
    { id: 'reader', name: '漫画阅读器', icon: 'phone', rarity: 'common', desc: '折腾 Tachimanga，把阅读体验调到顺手。' },
  ],

  /* ============================== 近期动态 ============================== */
  updates: [
    {
      date: '2026-11-27',
      version: 'v2.3',
      kind: { label: '交互', accent: 'amber' },
      title: 'AI PPT 全站交互与侧栏改版',
      text: '参考 Uiverse、React Bits 与 Anime.js，为登录、侧栏、项目列表与编辑器加入过渡和交错入场，并在桌面与手机尺寸下验证。',
    },
    {
      date: '2026-11-27',
      version: 'v2.2',
      kind: { label: '求职', accent: 'blue' },
      title: '两版简历更新',
      text: '整理出 AI 前端版与 AI 全栈版两份简历，可在「冒险履历」中下载。',
    },
    {
      date: '2026-11-26',
      version: 'v2.1',
      kind: { label: '上线', accent: 'mint' },
      title: 'AI PPT 部署上线',
      text: 'Docker Compose 编排 PostgreSQL、Redis、API、Worker 与 Nginx；工作台路由延迟加载，入口 JS gzip 267 → 109 kB。',
    },
    {
      date: '2026-11-26',
      version: 'v2.0',
      kind: { label: '动效', accent: 'lilac' },
      title: '大纲生成与 AI 改稿粒子动效',
      text: 'GSAP 驱动 Canvas 粒子带；标签页不可见或离开视口时暂停，减少动态效果模式下显示静态图案。',
    },
    {
      date: '2026-11-18',
      version: 'v1.9',
      kind: { label: '架构', accent: 'sky' },
      title: '复杂表单架构复盘',
      text: '围绕鸿毛合创梳理 Schema 表单设计、配置与状态分离，以及多端业务逻辑复用。',
    },
    {
      date: '2026-11-17',
      version: 'v1.8',
      kind: { label: 'Agent', accent: 'coral' },
      title: 'Agent Harness 与评估',
      text: '学习终止判断、约束恢复与 Agent 评估流程；此前（11-13）梳理了多 Agent 的角色划分与通信机制。',
    },
    {
      date: '2026-11-02',
      version: 'v1.7',
      kind: { label: '源码', accent: 'sky' },
      title: 'Pi-Agent 源码精读 1–3 章',
      text: '整理疑问与勘误，核对工具并行准备与单项拦截。',
    },
    {
      date: '2026-10-29',
      version: 'v1.6',
      kind: { label: '开坑', accent: 'gray' },
      title: '开始 CS146S',
      text: '读完「Building a Coding Agent」，以 CS146S 为阅读主线、dg-ai-notes 为实现参考。',
    },
  ],

  /* ============================== 联系 ============================== */
  contact: {
    blurb: '如果你在找一位细节控、会测、能把 AI 能力做成好用交互的实习生 —— 我们聊聊吧！',
    email: EMAIL,
    links: [
      { label: '发邮件', url: `mailto:${EMAIL}`, icon: 'mail' },
      { label: 'AI 前端版简历', url: RESUME_FRONTEND, icon: 'download' },
      { label: 'AI 全栈版简历', url: RESUME_FULLSTACK, icon: 'download' },
      // { label: 'GitHub', url: 'https://github.com/你的用户名', icon: 'github' },
    ],
  },
}
