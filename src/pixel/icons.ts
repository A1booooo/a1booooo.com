// 像素图标注册表 —— 图标来自 pixelarticons（MIT, © Gerrit Halfmann）
// 数据文件里只写 key（如 'react'），组件统一通过 <Icon name="react" /> 渲染。
import { Algorithm } from 'pixelarticons/react/Algorithm.js'
import { Backpack } from 'pixelarticons/react/Backpack.js'
import { BookOpen } from 'pixelarticons/react/BookOpen.js'
import { Braces } from 'pixelarticons/react/Braces.js'
import { Briefcase } from 'pixelarticons/react/Briefcase.js'
import { Brush } from 'pixelarticons/react/Brush.js'
import { Calendar } from 'pixelarticons/react/Calendar.js'
import { Camera } from 'pixelarticons/react/Camera.js'
import { Chart } from 'pixelarticons/react/Chart.js'
import { CheckDouble } from 'pixelarticons/react/CheckDouble.js'
import { Chess } from 'pixelarticons/react/Chess.js'
import { CircuitBoard } from 'pixelarticons/react/CircuitBoard.js'
import { Clapperboard } from 'pixelarticons/react/Clapperboard.js'
import { Clock } from 'pixelarticons/react/Clock.js'
import { Code } from 'pixelarticons/react/Code.js'
import { Coffee } from 'pixelarticons/react/Coffee.js'
import { ColorsSwatch } from 'pixelarticons/react/ColorsSwatch.js'
import { Copy } from 'pixelarticons/react/Copy.js'
import { Crown } from 'pixelarticons/react/Crown.js'
import { Database } from 'pixelarticons/react/Database.js'
import { DiamondGem } from 'pixelarticons/react/DiamondGem.js'
import { Docker } from 'pixelarticons/react/Docker.js'
import { Download } from 'pixelarticons/react/Download.js'
import { ExternalLink } from 'pixelarticons/react/ExternalLink.js'
import { Feather } from 'pixelarticons/react/Feather.js'
import { Fire } from 'pixelarticons/react/Fire.js'
import { Flag } from 'pixelarticons/react/Flag.js'
import { Gamepad } from 'pixelarticons/react/Gamepad.js'
import { GitBranch } from 'pixelarticons/react/GitBranch.js'
import { Github } from 'pixelarticons/react/Github.js'
import { Globe } from 'pixelarticons/react/Globe.js'
import { Headphone } from 'pixelarticons/react/Headphone.js'
import { Heart } from 'pixelarticons/react/Heart.js'
import { Laptop } from 'pixelarticons/react/Laptop.js'
import { Leaf } from 'pixelarticons/react/Leaf.js'
import { Library } from 'pixelarticons/react/Library.js'
import { Lightbulb } from 'pixelarticons/react/Lightbulb.js'
import { Link } from 'pixelarticons/react/Link.js'
import { Mail } from 'pixelarticons/react/Mail.js'
import { MagicEdit } from 'pixelarticons/react/MagicEdit.js'
import { MapPin } from 'pixelarticons/react/MapPin.js'
import { Monitor } from 'pixelarticons/react/Monitor.js'
import { Music } from 'pixelarticons/react/Music.js'
import { Notebook } from 'pixelarticons/react/Notebook.js'
import { Package } from 'pixelarticons/react/Package.js'
import { Plug } from 'pixelarticons/react/Plug.js'
import { Potion } from 'pixelarticons/react/Potion.js'
import { Presentation } from 'pixelarticons/react/Presentation.js'
import { React as ReactIcon } from 'pixelarticons/react/React.js'
import { Refresh } from 'pixelarticons/react/Refresh.js'
import { Robot } from 'pixelarticons/react/Robot.js'
import { Script } from 'pixelarticons/react/Script.js'
import { Server } from 'pixelarticons/react/Server.js'
import { Shield } from 'pixelarticons/react/Shield.js'
import { Smartphone } from 'pixelarticons/react/Smartphone.js'
import { Sparkles } from 'pixelarticons/react/Sparkles.js'
import { SpeedFast } from 'pixelarticons/react/SpeedFast.js'
import { Star } from 'pixelarticons/react/Star.js'
import { Sword } from 'pixelarticons/react/Sword.js'
import { Target } from 'pixelarticons/react/Target.js'
import { Teach } from 'pixelarticons/react/Teach.js'
import { Terminal } from 'pixelarticons/react/Terminal.js'
import { TestTube } from 'pixelarticons/react/TestTube.js'
import { Tools } from 'pixelarticons/react/Tools.js'
import { TrendingUp } from 'pixelarticons/react/TrendingUp.js'
import { Trophy } from 'pixelarticons/react/Trophy.js'
import { University } from 'pixelarticons/react/University.js'
import { User } from 'pixelarticons/react/User.js'
import { Wand } from 'pixelarticons/react/Wand.js'
import { Zap } from 'pixelarticons/react/Zap.js'

export const icons = {
  algorithm: Algorithm,
  backpack: Backpack,
  book: BookOpen,
  braces: Braces,
  briefcase: Briefcase,
  brush: Brush,
  calendar: Calendar,
  camera: Camera,
  chart: Chart,
  check: CheckDouble,
  chess: Chess,
  circuit: CircuitBoard,
  film: Clapperboard,
  clock: Clock,
  code: Code,
  coffee: Coffee,
  palette: ColorsSwatch,
  copy: Copy,
  crown: Crown,
  database: Database,
  gem: DiamondGem,
  docker: Docker,
  download: Download,
  external: ExternalLink,
  feather: Feather,
  fire: Fire,
  flag: Flag,
  gamepad: Gamepad,
  branch: GitBranch,
  github: Github,
  globe: Globe,
  headphone: Headphone,
  heart: Heart,
  laptop: Laptop,
  leaf: Leaf,
  library: Library,
  bulb: Lightbulb,
  link: Link,
  mail: Mail,
  magic: MagicEdit,
  pin: MapPin,
  monitor: Monitor,
  music: Music,
  notebook: Notebook,
  package: Package,
  plug: Plug,
  potion: Potion,
  slides: Presentation,
  react: ReactIcon,
  sync: Refresh,
  robot: Robot,
  script: Script,
  server: Server,
  shield: Shield,
  phone: Smartphone,
  sparkles: Sparkles,
  speed: SpeedFast,
  star: Star,
  sword: Sword,
  target: Target,
  teach: Teach,
  terminal: Terminal,
  test: TestTube,
  tools: Tools,
  trend: TrendingUp,
  trophy: Trophy,
  school: University,
  user: User,
  wand: Wand,
  zap: Zap,
} as const

export type IconKey = keyof typeof icons
