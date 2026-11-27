import type { IconKey } from '../pixel/icons'

/** 全站统一的点缀色。卡片描边、标签、进度条都从这里取色。 */
export type Accent = 'blue' | 'mint' | 'amber' | 'lilac' | 'coral' | 'sky' | 'gray'

export type SectionId =
  | 'status'
  | 'about'
  | 'skills'
  | 'training'
  | 'quests'
  | 'projects'
  | 'log'
  | 'contact'

export interface NavItem {
  id: SectionId
  /** 像素字体显示的短英文标签，如 SKILLS */
  label: string
  /** 中文小字说明 */
  sub: string
}

export interface SectionCopy {
  /** 像素小标签，如 "02 · SKILLS" */
  eyebrow: string
  title: string
  desc?: string
}

export interface LinkItem {
  label: string
  url: string
  icon?: IconKey
}

/* ---------------- 角色 ---------------- */

export interface ClassTag {
  label: string
  accent: Accent
}

/** 当前主职业 */
export interface CharacterClass {
  /** 短名，如「AI 前端」 */
  label: string
  /** 职业全称，如「AI 前端开发实习生」 */
  title: string
  /** 一句话介绍 */
  summary: string
  /** 主修标签 */
  tags: ClassTag[]
}

/** 正在进阶的目标职业（转职任务） */
export interface ClassAdvance {
  /** 卡片小标题，如「转职任务」 */
  title: string
  /** 目标职业短名，如「AI 全栈」 */
  label: string
  /** 状态徽章，如「进阶中」 */
  status: string
  /** 0 - 100，渲染为分段进度条（不显示数字） */
  progress: number
  note: string
  /** 进阶方向标签 */
  tags: ClassTag[]
  /** 标签组的小标题 */
  tagsLabel: string
  mainTagsLabel: string
}

export interface Vital {
  /** HP / MP / EXP 等 */
  key: string
  label: string
  value: number
  max: number
  accent: Accent
  note: string
}

export interface Attribute {
  label: string
  /** 0 - 100 */
  value: number
  note: string
}

export interface InfoRow {
  icon: IconKey
  label: string
  value: string
  /** 高亮为参考图那种蓝底信息条 */
  highlight?: boolean
}

export interface Character {
  name: string
  nameEn: string
  level: string
  levelNote: string
  status: string
  mainClass: CharacterClass
  advance: ClassAdvance
  /** Hero 区的简历下载按钮，第一个为主按钮 */
  resumes: LinkItem[]
  /** 打字机轮播的台词 */
  taglines: string[]
  bio: string
  vitals: Vital[]
  attributes: Attribute[]
  infoRows: InfoRow[]
}

/* ---------------- 技能 ---------------- */

export interface Skill {
  id: string
  name: string
  icon: IconKey
  /** 1 - 10，渲染为 10 格像素条 */
  level: number
  /** 熟练度称号，如「熟练」 */
  rank: string
  /** 一句话概括 */
  summary: string
  /** 实战说明（悬停 / 点击时展示） */
  highlights: string[]
  /** 关联的经历或项目名 */
  related: string[]
}

export interface SkillCategory {
  id: string
  label: string
  icon: IconKey
  accent: Accent
  skills: Skill[]
}

export interface TrainingSkill {
  id: string
  name: string
  icon: IconKey
  accent: Accent
  /** 0 - 100 的修炼进度（自行估算） */
  progress: number
  startedAt: string
  /** 当前阶段描述 */
  stage: string
  nextMilestone: string
  why: string
  resources: LinkItem[]
  log: { date: string; text: string }[]
}

/* ---------------- 档案 / 履历 / 项目 ---------------- */

export interface About {
  paragraphs: string[]
  principles: { icon: IconKey; title: string; text: string }[]
  facts: { label: string; value: string }[]
}

export interface Achievement {
  title: string
  text: string
}

export interface Quest {
  title: string
  context: string
  stack: string[]
  achievements: Achievement[]
}

export interface Experience {
  id: string
  org: string
  role: string
  period: string
  location?: string
  /** 'main' 主线任务 / 'side' 支线任务 */
  kind: 'main' | 'side'
  quests: Quest[]
}

export interface Project {
  id: string
  name: string
  period: string
  role: string
  tagline: string
  description: string
  icon: IconKey
  accent: Accent
  metrics: { label: string; value: string }[]
  highlights: Achievement[]
  stack: string[]
  links: LinkItem[]
}

export interface Education {
  school: string
  major: string
  degree: string
  period: string
}

export interface Award {
  title: string
  date: string
  icon: IconKey
}

/* ---------------- 兴趣 / 动态 / 联系 ---------------- */

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'

export interface Hobby {
  id: string
  name: string
  icon: IconKey
  rarity: Rarity
  desc: string
}

export interface Update {
  date: string
  version: string
  kind: { label: string; accent: Accent }
  title: string
  text: string
  link?: LinkItem
}

export interface Contact {
  blurb: string
  email: string
  links: LinkItem[]
}

/* ---------------- 界面文案 ---------------- */

export interface UiCopy {
  brand: string
  nav: NavItem[]
  /** 屏幕阅读器用的导航名称 */
  navAria: { main: string; mobile: string }
  /** 导航右侧的行动按钮（跳到联系区） */
  navCta: string
  sections: Record<SectionId, SectionCopy>
  hero: {
    hello: string
    vitalsTitle: string
    attributesTitle: string
    scrollHint: string
  }
  skills: {
    detailTitle: string
    hoverHint: string
    highlightsLabel: string
    relatedLabel: string
    pinnedLabel: string
    unpin: string
    levelPrefix: string
    allLabel: string
  }
  training: {
    badge: string
    stageLabel: string
    startedLabel: string
    nextLabel: string
    whyLabel: string
    resourcesLabel: string
    logLabel: string
    charge: string
    expPopup: string
    expand: string
    collapse: string
  }
  about: {
    principlesTitle: string
    factsTitle: string
  }
  quests: {
    mainQuest: string
    sideQuest: string
    stackLabel: string
    educationTitle: string
    awardsTitle: string
    resumeTitle: string
  }
  projects: {
    roleLabel: string
    stackLabel: string
    highlightsLabel: string
  }
  log: {
    inventoryTitle: string
    inventoryDesc: string
    rarity: Record<Rarity, string>
    updatesTitle: string
    latest: string
  }
  contact: {
    copy: string
    copied: string
    emailLabel: string
  }
  mascot: {
    name: string
    lines: string[]
    hint: string
  }
  konami: {
    title: string
    text: string
  }
  footer: string
  consoleGreeting: string
  backToTop: string
}

export interface Meta {
  title: string
  description: string
  lang: string
}

export interface Profile {
  meta: Meta
  ui: UiCopy
  character: Character
  skillCategories: SkillCategory[]
  training: TrainingSkill[]
  about: About
  experience: Experience[]
  projects: Project[]
  education: Education[]
  awards: Award[]
  hobbies: Hobby[]
  updates: Update[]
  contact: Contact
}
