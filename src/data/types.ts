import type { IconKey } from '../pixel/icons'

/**
 * 内心 OS：「心灵感应模式」打开时才显示的心声（第一人称，建议用全角括号包起来）。
 * 写的时候守住底线：不吐槽前公司和同事，不贬低自己的能力——自嘲过程，不自嘲结果。
 */
export type Os = string

export type SectionId = 'cover' | 'profile' | 'skills' | 'works' | 'quests' | 'extra' | 'contact'

export interface NavItem {
  id: SectionId
  /** 导航上的短名，如「人物设定」 */
  label: string
  /** 话数，如「1」「番外」 */
  no: string
}

export interface SectionCopy {
  /** 话数标签，如「第 1 话」「番外篇」「最终话」 */
  chapter: string
  title: string
  desc?: string
}

export interface LinkItem {
  label: string
  url: string
  icon?: IconKey
}

/* ---------------- 主角 ---------------- */

export interface Vital {
  key: string
  label: string
  value: number
  max: number
  note: string
}

/** 转职进度：AI 前端 → AI 全栈 */
export interface ClassAdvance {
  from: string
  to: string
  /** 0 - 100 */
  progress: number
  note: string
  fromTags: string[]
  toTags: string[]
  os?: Os
}

export interface Character {
  name: string
  nameEn: string
  /** 封面副标题，如「AI 前端 → 进阶 AI 全栈」 */
  role: string
  /** 到岗状态（只在履历章和最终话出现） */
  status: string
  /** 打字机轮播的台词 */
  taglines: string[]
  /** 封面上的那句心声 */
  coverOs: Os
  /** 封面角落的「角色介绍栏」 */
  vitals: Vital[]
  advance: ClassAdvance
  resumes: LinkItem[]
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
  summary: string
  /** 实战说明（展开后显示） */
  highlights: string[]
  /** 出处：关联的经历或项目名 */
  related: string[]
  os?: Os
}

export interface SkillCategory {
  id: string
  label: string
  icon: IconKey
  skills: Skill[]
}

export interface TrainingSkill {
  id: string
  name: string
  icon: IconKey
  /** 0 - 100 的修炼进度（自评估算） */
  progress: number
  startedAt: string
  stage: string
  nextMilestone: string
  why: string
  resources: LinkItem[]
  log: { date: string; text: string }[]
  os?: Os
}

/* ---------------- 人物设定 ---------------- */

export interface AboutInfo {
  paragraphs: { text: string; os?: Os }[]
  facts: { label: string; value: string }[]
  /** 做事的小执念 */
  quirks: { icon: IconKey; title: string; text: string; os?: Os }[]
  /** 域名由来 */
  domain: { title: string; text: string; os?: Os }
}

/* ---------------- 履历 / 作品 ---------------- */

export interface Achievement {
  title: string
  text: string
  os?: Os
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
  metrics: { label: string; value: string }[]
  highlights: Achievement[]
  stack: string[]
  links: LinkItem[]
  os?: Os
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
  os?: Os
}

/* ---------------- 番外 / 联系 ---------------- */

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'

export interface Hobby {
  id: string
  name: string
  icon: IconKey
  rarity: Rarity
  desc: string
  /** 在第 1 话「人物设定」里作为「喜欢的东西」展示 */
  favorite?: boolean
  os?: Os
}

export interface Update {
  date: string
  version: string
  kind: string
  title: string
  text: string
  link?: LinkItem
}

export interface Contact {
  blurb: string
  os?: Os
  email: string
  links: LinkItem[]
}

/* ---------------- 界面文案 ---------------- */

export interface UiCopy {
  brand: string
  /** 像素印章上的四个字，按印章习惯从右列往左列读 */
  stamp: string
  nav: NavItem[]
  navAria: { main: string; mobile: string }
  sections: Record<SectionId, SectionCopy>
  telepathy: {
    /** 开关上的名字 */
    label: string
    on: string
    off: string
    /** 屏幕阅读器用 */
    aria: string
    /** 切换时相棒说的话 */
    onLine: string
    offLine: string
  }
  cover: {
    hello: string
    vitalsTitle: string
    scrollHint: string
    tocLabel: string
  }
  profile: {
    factsTitle: string
    likesTitle: string
    quirksTitle: string
  }
  skills: {
    advanceTitle: string
    allLabel: string
    levelPrefix: string
    highlightsLabel: string
    relatedLabel: string
    expand: string
    collapse: string
    trainingTitle: string
    trainingDesc: string
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
  works: {
    highlightsLabel: string
  }
  quests: {
    stackLabel: string
    educationTitle: string
    awardsTitle: string
    resumeTitle: string
  }
  extra: {
    inventoryTitle: string
    rarity: Record<Rarity, string>
    updatesTitle: string
    latest: string
  }
  contact: {
    copy: string
    copied: string
    emailLabel: string
  }
  aibo: {
    name: string
    hint: string
    /** 点击时轮流说的台词 */
    lines: string[]
    /** 连点 5 次掏出咖啡果冻时说的话 */
    jellyLine: string
  }
  konami: string
  footer: string[]
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
  about: AboutInfo
  experience: Experience[]
  projects: Project[]
  education: Education[]
  awards: Award[]
  hobbies: Hobby[]
  updates: Update[]
  contact: Contact
}
