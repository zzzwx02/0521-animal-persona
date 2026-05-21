const DIMENSIONS = [
  { key: "agency", code: "A", name: "行动力", note: "主动、推进、掌控、竞争、解决问题。" },
  { key: "novelty", code: "N", name: "探索性", note: "好奇、变化、创意、新鲜感、灵活。" },
  { key: "social", code: "S", name: "亲和力", note: "共情、连接、陪伴、合作、关系感。" },
  { key: "method", code: "M", name: "秩序感", note: "计划、稳定、责任、规则、长期主义。" },
  { key: "sensitivity", code: "R", name: "敏感度", note: "观察、警觉、细腻、风险感知、自我保护。" },
];

const dimKeys = DIMENSIONS.map((dim) => dim.key);
const TOTAL_QUESTIONS = 18;

const QUESTIONS = [
  {
    id: "q1",
    text: "你刚加入一个新群或新团队，通常会怎么做？",
    options: [
      { text: "先观察大家的说话方式和关系结构", dim: "sensitivity" },
      { text: "主动发言，让别人尽快认识我", dim: "agency" },
      { text: "找一个看起来好相处的人先聊起来", dim: "social" },
      { text: "看群规、流程和已有信息，先搞清楚规则", dim: "method" },
      { text: "先看看有没有有趣的话题，再决定参不参与", dim: "novelty" },
    ],
  },
  {
    id: "q2",
    text: "周末突然空出一整天，你最可能怎么安排？",
    options: [
      { text: "做一件一直拖着但该完成的事", dim: "method" },
      { text: "约朋友吃饭、聊天或一起活动", dim: "social" },
      { text: "去尝试一家新店、一个新地方或新活动", dim: "novelty" },
      { text: "休息、整理状态，不想被太多人打扰", dim: "sensitivity" },
      { text: "安排运动、学习或推进个人目标", dim: "agency" },
    ],
  },
  {
    id: "q3",
    text: "小组任务进展很慢，你通常最先做什么？",
    options: [
      { text: "直接推动大家定目标、分任务", dim: "agency" },
      { text: "先弄清楚卡在哪里，再调整流程", dim: "method" },
      { text: "关心大家是不是有情绪或沟通问题", dim: "social" },
      { text: "提出一个不同思路，换个方法试试", dim: "novelty" },
      { text: "观察谁靠谱，避免自己被低效拖累", dim: "sensitivity" },
    ],
  },
  {
    id: "q4",
    text: "朋友临时取消了和你的约定，你第一反应更接近？",
    options: [
      { text: "理解对方，问问是不是遇到什么事", dim: "social" },
      { text: "有点在意，会想是不是自己哪里不重要", dim: "sensitivity" },
      { text: "马上改成自己的其他安排", dim: "agency" },
      { text: "觉得计划被打乱，心里不太舒服", dim: "method" },
      { text: "刚好可以换个新安排或临时找点乐子", dim: "novelty" },
    ],
  },
  {
    id: "q5",
    text: "面对一个重要选择，你通常更依赖什么？",
    options: [
      { text: "哪个选择能让我更快往前走", dim: "agency" },
      { text: "哪个选择更有新鲜感和可能性", dim: "novelty" },
      { text: "哪个选择对我和身边人的关系影响更好", dim: "social" },
      { text: "哪个选择更稳定、更可控", dim: "method" },
      { text: "哪个选择风险最低、后患最少", dim: "sensitivity" },
    ],
  },
  {
    id: "q6",
    text: "当你收到一条让你不舒服的消息时，你通常会？",
    options: [
      { text: "直接回复，把问题说清楚", dim: "agency" },
      { text: "先放一放，等情绪稳定再处理", dim: "method" },
      { text: "反复琢磨对方到底什么意思", dim: "sensitivity" },
      { text: "尝试缓和语气，不想把关系弄僵", dim: "social" },
      { text: "换个角度想，也许可以用轻松方式化解", dim: "novelty" },
    ],
  },
  {
    id: "q7",
    text: "学一个新技能时，你更像哪种人？",
    options: [
      { text: "先报课、列计划，按步骤学", dim: "method" },
      { text: "直接上手，边做边调整", dim: "agency" },
      { text: "找朋友一起学，更容易坚持", dim: "social" },
      { text: "先到处看案例，找灵感和玩法", dim: "novelty" },
      { text: "先评估难度和坑点，避免白花力气", dim: "sensitivity" },
    ],
  },
  {
    id: "q8",
    text: "聚会或饭局中，你通常更像？",
    options: [
      { text: "负责带动气氛或开启话题的人", dim: "agency" },
      { text: "和熟悉的人待在一起，维持舒服互动", dim: "social" },
      { text: "观察大家的关系和情绪变化", dim: "sensitivity" },
      { text: "对新鲜话题、新人或新玩法更感兴趣", dim: "novelty" },
      { text: "更在意时间、地点、流程是否安排妥当", dim: "method" },
    ],
  },
  {
    id: "q9",
    text: "你最受不了哪种工作或学习状态？",
    options: [
      { text: "没有人负责推进，事情一直停着", dim: "agency" },
      { text: "每天重复，没有新东西", dim: "novelty" },
      { text: "人际气氛很差，大家互相消耗", dim: "social" },
      { text: "规则混乱，临时变化太多", dim: "method" },
      { text: "信息不透明，总觉得有潜在风险", dim: "sensitivity" },
    ],
  },
  {
    id: "q10",
    text: "别人夸你时，你最希望听到哪一句？",
    options: [
      { text: "“你真的很有行动力。”", dim: "agency" },
      { text: "“你很有意思，总能带来新想法。”", dim: "novelty" },
      { text: "“和你相处很舒服。”", dim: "social" },
      { text: "“你很靠谱，让人放心。”", dim: "method" },
      { text: "“你看问题很准，很敏锐。”", dim: "sensitivity" },
    ],
  },
  {
    id: "q11",
    text: "当计划突然被打乱，你更常见的反应是？",
    options: [
      { text: "马上重新安排，先把事情推下去", dim: "agency" },
      { text: "觉得也不错，说不定有新的可能", dim: "novelty" },
      { text: "先看大家的状态，尽量照顾所有人", dim: "social" },
      { text: "有点烦，需要重新建立秩序", dim: "method" },
      { text: "会担心后续连锁问题，先排查风险", dim: "sensitivity" },
    ],
  },
  {
    id: "q12",
    text: "在亲密关系或友情中，你最看重什么？",
    options: [
      { text: "双方能一起成长、一起行动", dim: "agency" },
      { text: "关系里有趣、有变化、有新鲜感", dim: "novelty" },
      { text: "被理解、被回应、彼此照顾", dim: "social" },
      { text: "稳定、承诺和长期可靠", dim: "method" },
      { text: "安全感、边界感和情绪稳定", dim: "sensitivity" },
    ],
  },
  {
    id: "q13",
    text: "你遇到压力时，最常用的恢复方式是？",
    options: [
      { text: "做点实际的事，让局面重新动起来", dim: "agency" },
      { text: "换环境、看新东西、转移注意力", dim: "novelty" },
      { text: "找信任的人说一说", dim: "social" },
      { text: "整理房间、列清单、恢复节奏", dim: "method" },
      { text: "独处，减少刺激，慢慢消化", dim: "sensitivity" },
    ],
  },
  {
    id: "q14",
    text: "如果别人误解了你，你通常会？",
    options: [
      { text: "直接解释清楚，不想拖着", dim: "agency" },
      { text: "用轻松方式带过去，不想太沉重", dim: "novelty" },
      { text: "认真沟通，希望对方理解你的感受", dim: "social" },
      { text: "梳理事实和前因后果，一条条说清楚", dim: "method" },
      { text: "先退一步观察，判断对方是否值得解释", dim: "sensitivity" },
    ],
  },
  {
    id: "q15",
    text: "你更喜欢哪种生活节奏？",
    options: [
      { text: "有目标、有挑战，每天有推进感", dim: "agency" },
      { text: "保持变化，可以随时尝试新东西", dim: "novelty" },
      { text: "和喜欢的人保持稳定连接", dim: "social" },
      { text: "有规律、有计划、可预期", dim: "method" },
      { text: "安静、有边界，不被过度打扰", dim: "sensitivity" },
    ],
  },
  {
    id: "q16",
    text: "当你加入一个项目，你最自然承担的角色是？",
    options: [
      { text: "推进者：负责让事情跑起来", dim: "agency" },
      { text: "创意者：负责提出新方向和新玩法", dim: "novelty" },
      { text: "协调者：负责照顾沟通和关系", dim: "social" },
      { text: "规划者：负责流程、时间和质量", dim: "method" },
      { text: "观察者：负责发现问题和潜在风险", dim: "sensitivity" },
    ],
  },
  {
    id: "q17",
    text: "你更容易被哪类人吸引？",
    options: [
      { text: "有魄力、敢行动的人", dim: "agency" },
      { text: "有趣、特别、不按套路的人", dim: "novelty" },
      { text: "温暖、真诚、会照顾人的人", dim: "social" },
      { text: "稳定、靠谱、有责任感的人", dim: "method" },
      { text: "清醒、敏锐、有分寸感的人", dim: "sensitivity" },
    ],
  },
  {
    id: "q18",
    text: "下面哪句话最像你？",
    options: [
      { text: "“先做起来，很多问题会在行动中解决。”", dim: "agency" },
      { text: "“生活需要一点未知，不然太无聊。”", dim: "novelty" },
      { text: "“关系舒服，比赢输重要。”", dim: "social" },
      { text: "“稳定和秩序会让我更安心。”", dim: "method" },
      { text: "“我很容易察觉到别人没注意到的细节。”", dim: "sensitivity" },
    ],
  },
];

const ANIMALS = [
  {
    id: "lion",
    name: "狮子型",
    title: "掌控推进者",
    color: "#f5b84b",
    vector: [35, 10, 20, 25, 10],
    keywords: ["主动", "掌控", "目标感"],
    summary: "你是行动导向人格。遇到问题时，你更倾向于先站出来、先推动、先让事情发生。",
    strength: "你的优势是推进力，能让事情从 0 变成 1，适合负责项目、增长、销售、组织和团队推进。",
    blindspot: "你容易把快和对混在一起。身边人还没准备好时，可能会被你的节奏压到。",
    relation: "在关系里容易表现为保护型、主导型，希望关系有明确方向，也希望对方能一起成长。",
    stress: "压力大时会更强势、更急躁，更想控制局面，也更难听见别人的情绪。",
    growth: "在推进之前，先确认别人是否已经跟上。",
    compatible: ["大象型", "狼型", "金毛犬型"],
    conflict: ["猫型", "熊猫型", "兔子型"],
  },
  {
    id: "wolf",
    name: "狼型",
    title: "团队守护者",
    color: "#8e9aa6",
    vector: [25, 10, 30, 25, 10],
    keywords: ["忠诚", "协作", "责任"],
    summary: "你很重视关系、承诺和团队，不是单纯讨好别人，而是看重我们是不是一队。",
    strength: "你的优势是协作与守护，愿意为了共同目标投入，也能在团队里稳定补位。",
    blindspot: "你容易过度承担，久而久之变成团队里的默认兜底人。",
    relation: "你很看重忠诚，可以接受不完美，但很难接受不真诚、不负责、不站在你这边。",
    stress: "压力大时会替别人操心，明明很累还继续扛，表面冷静，内心委屈。",
    growth: "忠诚不是无限消耗，责任也不等于替所有人收拾烂摊子。",
    compatible: ["狮子型", "大象型", "金毛犬型"],
    conflict: ["猫型", "猴子型", "狐狸型"],
  },
  {
    id: "fox",
    name: "狐狸型",
    title: "策略观察者",
    color: "#ef8d58",
    vector: [20, 25, 10, 15, 30],
    keywords: ["聪明", "灵活", "会判断"],
    summary: "你擅长观察局势，通常能看出很多别人没看出的东西。",
    strength: "你的优势是策略感，适合处理复杂、人多、信息不透明的场景。",
    blindspot: "你容易过度分析，把简单表达也拆成动机、利益和风险。",
    relation: "你慢热，喜欢有分寸的人，不喜欢太黏、太直白、太没有边界的关系。",
    stress: "压力大时会想太多，变得防备，用玩笑或冷静掩盖真实情绪。",
    growth: "不是所有关系都需要推理，有些真诚可以直接接住。",
    compatible: ["猫型", "猫头鹰型", "猴子型"],
    conflict: ["金毛犬型", "大象型", "狼型"],
  },
  {
    id: "cat",
    name: "猫型",
    title: "独立边界者",
    color: "#e0b6c7",
    vector: [15, 30, 10, 15, 30],
    keywords: ["自洽", "自由", "边界"],
    summary: "你不是冷漠，而是很重视自己的空间和选择权。",
    strength: "你的优势是自洽和边界感，不太容易因为群体压力而改变自己。",
    blindspot: "你容易让别人觉得难靠近。你只是需要空间，别人却可能理解成冷淡。",
    relation: "你需要自由，喜欢自然靠近，不喜欢被逼问、被绑定、被过度管理。",
    stress: "压力大时容易失联、冷处理、不解释，表面没事，内心已经想逃离所有人。",
    growth: "把沉默翻译成一句简单说明，会让关系少很多误会。",
    compatible: ["狐狸型", "猫头鹰型", "熊猫型"],
    conflict: ["狮子型", "金毛犬型", "狼型"],
  },
  {
    id: "golden_retriever",
    name: "金毛犬型",
    title: "热情陪伴者",
    color: "#efc765",
    vector: [25, 10, 40, 15, 10],
    keywords: ["真诚", "支持", "亲和"],
    summary: "你是真诚、温暖、愿意给别人能量的人，喜欢直接表达喜欢，也希望关系不要太复杂。",
    strength: "你的优势是陪伴和感染力，能让低气压的人重新振作，也能快速破冰。",
    blindspot: "你容易过度付出，以为我对你好，你也会同样回应我。",
    relation: "你很需要回应。长时间不回复或一句冷淡的话，都可能让你不安。",
    stress: "压力大时会变委屈，怀疑自己不够好，也可能用更热情的方式换回应。",
    growth: "真诚是你的天赋，但不是每个人都值得你无限热情。",
    compatible: ["海豚型", "熊猫型", "狼型"],
    conflict: ["猫型", "狐狸型", "猫头鹰型"],
  },
  {
    id: "owl",
    name: "猫头鹰型",
    title: "理性洞察者",
    color: "#9b8bc2",
    vector: [10, 15, 10, 35, 30],
    keywords: ["冷静", "分析", "深度"],
    summary: "你习惯先理解事情的逻辑，再决定要不要行动。",
    strength: "你的优势是洞察和判断力，适合需要理性、系统、耐心和准确性的事情。",
    blindspot: "你容易想太久，也可能因为表达太理性，让别人觉得不够有温度。",
    relation: "你喜欢有深度的关系，相比频繁聊天，更看重高质量交流。",
    stress: "压力大时会反复分析、推迟行动、对外界变冷，用理性压住情绪。",
    growth: "有些答案不是想出来的，是做出来的。",
    compatible: ["狐狸型", "猫型", "乌龟型"],
    conflict: ["海豚型", "金毛犬型", "猴子型"],
  },
  {
    id: "dolphin",
    name: "海豚型",
    title: "社交连接者",
    color: "#69c9d0",
    vector: [20, 25, 35, 10, 10],
    keywords: ["活跃", "共情", "会带气氛"],
    summary: "你擅长连接人和人，能快速感受到场上的气氛，也知道如何让互动更自然。",
    strength: "你的优势是社交连接能力，能让陌生人变熟，让团队气氛变轻松。",
    blindspot: "你可能太在意气氛，为了让场子舒服而忽略自己的真实感受。",
    relation: "你喜欢有互动感的关系，需要回应、分享、玩笑和情绪流动。",
    stress: "压力大时更想找人说话，也可能用热闹掩盖疲惫。",
    growth: "你不需要负责所有人的气氛。",
    compatible: ["金毛犬型", "猴子型", "熊猫型"],
    conflict: ["猫头鹰型", "猫型", "乌龟型"],
  },
  {
    id: "panda",
    name: "熊猫型",
    title: "松弛治愈者",
    color: "#d8e1dd",
    vector: [10, 15, 35, 25, 15],
    keywords: ["温和", "稳定", "低攻击性"],
    summary: "你给人的感觉通常舒服、温和、没有攻击性，不喜欢高压竞争和过度消耗的关系。",
    strength: "你的优势是低压陪伴，很多人在你身边可以卸下防备。",
    blindspot: "你容易拖延或逃避压力，用顺其自然掩盖自己不想面对的问题。",
    relation: "你喜欢自然发生的关系，太强烈、太刺激、太不稳定都会消耗你。",
    stress: "压力大时会躺平、拖延处理、回避沟通，用吃喝娱乐安抚自己。",
    growth: "松弛不是停滞，舒服也不等于逃避。",
    compatible: ["金毛犬型", "猫型", "海豚型"],
    conflict: ["狮子型", "猴子型", "狼型"],
  },
  {
    id: "rabbit",
    name: "兔子型",
    title: "敏感感知者",
    color: "#f2b8c6",
    vector: [10, 10, 25, 20, 35],
    keywords: ["细腻", "警觉", "安全感"],
    summary: "你对环境、语气、关系变化和潜在风险很敏感，能捕捉很多别人忽略的细节。",
    strength: "你的优势是细腻感知，适合体察、审美、观察和风险预判相关的事情。",
    blindspot: "你容易内耗，别人一句无心的话，也可能在脑子里补全出很多负面可能。",
    relation: "你需要温柔、稳定、明确的关系，需要知道自己是被在意的。",
    stress: "压力大时会退缩、想太多、不敢直接问，也更容易自我怀疑。",
    growth: "不要把所有细节都当成危险信号，敏感需要和事实校准。",
    compatible: ["大象型", "熊猫型", "金毛犬型"],
    conflict: ["狮子型", "猴子型", "狐狸型"],
  },
  {
    id: "turtle",
    name: "乌龟型",
    title: "长线稳定者",
    color: "#8dbb80",
    vector: [10, 10, 15, 45, 20],
    keywords: ["慢热", "稳健", "长期主义"],
    summary: "你相信慢慢来，也相信稳定积累。不喜欢被迫快速变化，更不喜欢没有准备就冲出去。",
    strength: "你的优势是长期主义，适合需要持续投入、稳定推进和耐心的事情。",
    blindspot: "你容易过度保守，机会可能会在等待准备好的过程中溜走。",
    relation: "你慢热但稳定，不轻易开始，也不轻易结束，一旦确认就会认真经营。",
    stress: "压力大时会缩回自己的壳里，拒绝变化，只想守住现状。",
    growth: "稳定不是永远不变，而是有能力在变化中保持自己。",
    compatible: ["猫头鹰型", "大象型", "熊猫型"],
    conflict: ["猴子型", "海豚型", "狮子型"],
  },
  {
    id: "elephant",
    name: "大象型",
    title: "可靠承担者",
    color: "#b8b2a4",
    vector: [15, 10, 30, 30, 15],
    keywords: ["责任", "保护", "厚重"],
    summary: "你很有责任感和承载力，重视承诺、稳定、关系和长期安全。",
    strength: "你的优势是可靠和承载力，能给别人安全感，也能在混乱时稳定住局面。",
    blindspot: "你容易把太多责任背到自己身上，别人也可能默认你不需要被照顾。",
    relation: "你重视长期稳定，不喜欢轻浮、反复、没有责任感的人。",
    stress: "压力大时会沉默、硬撑、不愿示弱，自己消化问题。",
    growth: "可靠不等于永远不能倒下，你也有被支持、被照顾的权利。",
    compatible: ["兔子型", "狼型", "乌龟型"],
    conflict: ["猴子型", "狐狸型", "猫型"],
  },
  {
    id: "monkey",
    name: "猴子型",
    title: "好奇探索者",
    color: "#d79a5a",
    vector: [20, 40, 20, 10, 10],
    keywords: ["灵活", "好玩", "新鲜感"],
    summary: "你对新鲜事物反应很快，喜欢变化、灵感、尝试和好玩的东西。",
    strength: "你的优势是探索和创新，能发现新机会，也能给沉闷环境带来活力。",
    blindspot: "你容易开很多头，但不一定收尾。一旦进入重复执行，就会快速失去动力。",
    relation: "你喜欢有趣、有变化、能一起探索的关系，不喜欢被管太死。",
    stress: "压力大时会想逃离、找新刺激，很难专注，也会用玩乐转移焦虑。",
    growth: "给灵感配一个完成机制，新鲜感才会真正落地。",
    compatible: ["海豚型", "狐狸型", "金毛犬型"],
    conflict: ["乌龟型", "大象型", "猫头鹰型"],
  },
];

const STORAGE_KEY = "animalPersonaV2Progress";
const RESULT_KEY = "animalPersonaV2Result";
const VISITOR_KEY = "animalPersonaV2VisitorId";
const API_RESULTS_ENDPOINT = "/api/results";

function storageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // file:// previews or privacy settings can block storage; the quiz should still work.
  }
}

function storageRemove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Storage is optional for the MVP preview.
  }
}

function createId(prefix) {
  const randomPart = window.crypto?.randomUUID
    ? window.crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  return `${prefix}_${randomPart}`;
}

function getVisitorId() {
  const existing = storageGet(VISITOR_KEY);
  if (existing) return existing;

  const nextId = createId("visitor");
  storageSet(VISITOR_KEY, nextId);
  return nextId;
}

const state = {
  current: 0,
  answers: {},
  startedAt: null,
  sessionId: null,
  lastResult: null,
  isAdvancing: false,
  cardUrl: null,
  cardUrlIsObject: false,
  toastTimer: null,
};

let animalSpriteImage = null;
if (typeof Image !== "undefined") {
  animalSpriteImage = new Image();
  animalSpriteImage.onload = () => {
    if (state.lastResult) {
      renderShareCardPreview(state.lastResult);
      drawShareCard(state.lastResult);
    }
  };
  animalSpriteImage.src = "assets/animal-icons-sassy.png";
}

const ICON_PROFILES = {
  lion: { face: "#f0b957", accent: "#7a4b2a", light: "#ffe1a3", dark: "#2f2520" },
  wolf: { face: "#8e9aa6", accent: "#596571", light: "#d8dde2", dark: "#27313a" },
  fox: { face: "#ef8d58", accent: "#9f4e2a", light: "#fff0d5", dark: "#2f2520" },
  cat: { face: "#d9a8bb", accent: "#7a5b79", light: "#ffe9ee", dark: "#29232d" },
  golden_retriever: { face: "#efc765", accent: "#b17934", light: "#fff1bf", dark: "#40311e" },
  owl: { face: "#9b8bc2", accent: "#5d4f87", light: "#fff3c6", dark: "#29243d" },
  dolphin: { face: "#69c9d0", accent: "#287e98", light: "#d8fbff", dark: "#173f52" },
  panda: { face: "#f7f3e8", accent: "#24282d", light: "#ffffff", dark: "#24282d" },
  rabbit: { face: "#f2b8c6", accent: "#b66a86", light: "#fff0f3", dark: "#3a2931" },
  turtle: { face: "#8dbb80", accent: "#3f7f55", light: "#d7edb0", dark: "#203b2b" },
  elephant: { face: "#b8b2a4", accent: "#75736e", light: "#ebe6da", dark: "#34332f" },
  monkey: { face: "#d79a5a", accent: "#815332", light: "#ffd9a5", dark: "#33251b" },
};

const SPRITE_POSITIONS = {
  lion: [0, 0],
  wolf: [1, 0],
  fox: [2, 0],
  cat: [0, 1],
  golden_retriever: [1, 1],
  owl: [2, 1],
  dolphin: [0, 2],
  panda: [1, 2],
  rabbit: [2, 2],
  turtle: [0, 3],
  elephant: [1, 3],
  monkey: [2, 3],
};

function spriteStyle(id) {
  const [column, row] = SPRITE_POSITIONS[id] || [0, 0];
  return `--sprite-x:${column * 50}%; --sprite-y:${row * (100 / 3)}%;`;
}

function $(selector) {
  return document.querySelector(selector);
}

function iconProfile(animalOrId) {
  const id = typeof animalOrId === "string" ? animalOrId : animalOrId.id;
  return ICON_PROFILES[id] || ICON_PROFILES.lion;
}

function animalIcon(animalOrId, label = "") {
  const id = typeof animalOrId === "string" ? animalOrId : animalOrId.id;
  const name = typeof animalOrId === "string" ? label : animalOrId.name;
  return `<span class="animal-sprite animal-sprite-${id}" role="img" aria-label="${name}" style="${spriteStyle(id)}"></span>`;

  const p = iconProfile(id);
  const commonEyes = `
    <circle cx="47" cy="55" r="3.4" fill="${p.dark}"/>
    <circle cx="73" cy="55" r="3.4" fill="${p.dark}"/>
    <path d="M53 72c4 4 10 4 14 0" fill="none" stroke="${p.dark}" stroke-width="3" stroke-linecap="round"/>
  `;

  const headBase = `
    <circle cx="60" cy="60" r="52" fill="${p.face}" opacity=".22"/>
    <path d="M31 102c4-17 15-27 29-27s25 10 29 27" fill="${p.accent}" opacity=".92"/>
  `;

  const faces = {
    lion: `
      ${headBase}
      <circle cx="60" cy="54" r="35" fill="${p.accent}"/>
      <circle cx="60" cy="57" r="27" fill="${p.face}"/>
      <circle cx="36" cy="42" r="9" fill="${p.accent}"/>
      <circle cx="84" cy="42" r="9" fill="${p.accent}"/>
      <ellipse cx="60" cy="68" rx="17" ry="12" fill="${p.light}"/>
      ${commonEyes}
      <path d="M56 65h8l-4 5Z" fill="${p.dark}"/>
    `,
    wolf: `
      ${headBase}
      <path d="M34 29 48 48 59 32 72 48 86 29 80 74c-3 16-12 24-20 24s-17-8-20-24Z" fill="${p.face}"/>
      <path d="M42 34 51 55 60 40 69 55 78 34 72 70c-2 12-8 19-12 19s-10-7-12-19Z" fill="${p.light}" opacity=".62"/>
      <ellipse cx="60" cy="72" rx="16" ry="11" fill="${p.light}"/>
      ${commonEyes}
      <path d="M56 67h8l-4 5Z" fill="${p.dark}"/>
    `,
    fox: `
      ${headBase}
      <path d="M31 26 52 48 60 36 68 48 89 26 79 75c-4 15-12 22-19 22s-15-7-19-22Z" fill="${p.face}"/>
      <path d="M42 53c7 7 11 12 18 27 7-15 11-20 18-27-3 27-11 39-18 39S45 80 42 53Z" fill="${p.light}"/>
      ${commonEyes}
      <path d="M56 66h8l-4 5Z" fill="${p.dark}"/>
    `,
    cat: `
      ${headBase}
      <path d="M34 31 50 50 60 43 70 50 86 31 82 76c-3 15-12 23-22 23s-19-8-22-23Z" fill="${p.face}"/>
      <path d="M41 38 50 52M79 38 70 52" stroke="${p.light}" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="60" cy="71" rx="14" ry="10" fill="${p.light}" opacity=".82"/>
      ${commonEyes}
      <path d="M56 67h8l-4 4Z" fill="${p.dark}"/>
      <path d="M40 69H27M42 75H30M80 69h13M78 75h12" stroke="${p.dark}" stroke-width="2.4" stroke-linecap="round"/>
    `,
    golden_retriever: `
      ${headBase}
      <path d="M33 50c0-16 11-27 27-27s27 11 27 27v22c0 16-11 27-27 27S33 88 33 72Z" fill="${p.face}"/>
      <path d="M32 48c-12 6-13 32-2 42 9-10 11-28 8-42ZM88 48c12 6 13 32 2 42-9-10-11-28-8-42Z" fill="${p.accent}"/>
      <ellipse cx="60" cy="72" rx="17" ry="12" fill="${p.light}"/>
      ${commonEyes}
      <path d="M56 67h8l-4 5Z" fill="${p.dark}"/>
    `,
    owl: `
      ${headBase}
      <path d="M31 30c11 2 16 5 29 5s18-3 29-5c-5 11-7 22-7 37 0 20-10 31-22 31S38 87 38 67c0-15-2-26-7-37Z" fill="${p.face}"/>
      <circle cx="48" cy="58" r="14" fill="${p.light}"/>
      <circle cx="72" cy="58" r="14" fill="${p.light}"/>
      <circle cx="48" cy="58" r="5" fill="${p.dark}"/>
      <circle cx="72" cy="58" r="5" fill="${p.dark}"/>
      <path d="M56 72 60 81 64 72Z" fill="#eaa43f"/>
      <path d="M43 83c9 7 25 7 34 0" fill="none" stroke="${p.dark}" stroke-width="3" stroke-linecap="round"/>
    `,
    dolphin: `
      <circle cx="60" cy="60" r="52" fill="${p.face}" opacity=".22"/>
      <path d="M24 77c18-35 55-43 73-18-15-2-23 3-32 15 14-2 24 2 31 11-28 7-55 1-72-8Z" fill="${p.face}"/>
      <path d="M58 38c8-14 19-18 31-18-8 10-13 18-15 29Z" fill="${p.accent}"/>
      <path d="M45 76c9 11 22 17 37 17" fill="none" stroke="${p.light}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="77" cy="58" r="3.4" fill="${p.dark}"/>
      <path d="M26 94c17 6 47 6 67 0" fill="none" stroke="${p.accent}" stroke-width="5" stroke-linecap="round" opacity=".65"/>
    `,
    panda: `
      ${headBase}
      <circle cx="42" cy="36" r="12" fill="${p.accent}"/>
      <circle cx="78" cy="36" r="12" fill="${p.accent}"/>
      <circle cx="60" cy="62" r="33" fill="${p.light}"/>
      <ellipse cx="48" cy="58" rx="10" ry="13" fill="${p.accent}" transform="rotate(-16 48 58)"/>
      <ellipse cx="72" cy="58" rx="10" ry="13" fill="${p.accent}" transform="rotate(16 72 58)"/>
      <circle cx="48" cy="58" r="3.2" fill="${p.light}"/>
      <circle cx="72" cy="58" r="3.2" fill="${p.light}"/>
      <ellipse cx="60" cy="72" rx="15" ry="10" fill="#eee5d8"/>
      <path d="M56 68h8l-4 5Z" fill="${p.dark}"/>
      <path d="M54 77c4 4 8 4 12 0" fill="none" stroke="${p.dark}" stroke-width="3" stroke-linecap="round"/>
    `,
    rabbit: `
      ${headBase}
      <path d="M45 38c-9-27 1-34 11-6M75 38c9-27-1-34-11-6" fill="${p.face}" stroke="${p.accent}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="60" cy="62" r="30" fill="${p.face}"/>
      <ellipse cx="60" cy="76" rx="16" ry="11" fill="${p.light}"/>
      ${commonEyes}
      <path d="M56 70h8l-4 5Z" fill="${p.dark}"/>
    `,
    turtle: `
      <circle cx="60" cy="60" r="52" fill="${p.face}" opacity=".22"/>
      <ellipse cx="60" cy="66" rx="34" ry="28" fill="${p.accent}"/>
      <path d="M33 68c8-22 46-22 54 0-8 19-46 19-54 0Z" fill="${p.light}" opacity=".72"/>
      <path d="M60 40v50M40 57h40M45 80c8-8 22-8 30 0" stroke="${p.accent}" stroke-width="4" stroke-linecap="round" opacity=".7"/>
      <circle cx="60" cy="34" r="15" fill="${p.face}"/>
      <circle cx="54" cy="32" r="3" fill="${p.dark}"/>
      <circle cx="66" cy="32" r="3" fill="${p.dark}"/>
      <path d="M55 39c3 3 7 3 10 0" fill="none" stroke="${p.dark}" stroke-width="2.5" stroke-linecap="round"/>
    `,
    elephant: `
      ${headBase}
      <circle cx="32" cy="62" r="20" fill="${p.face}"/>
      <circle cx="88" cy="62" r="20" fill="${p.face}"/>
      <circle cx="60" cy="59" r="30" fill="${p.light}"/>
      <path d="M54 70c2 18 3 27-7 30 17 7 29-3 23-30Z" fill="${p.light}"/>
      ${commonEyes}
      <path d="M55 88c6 4 15 3 20-4" fill="none" stroke="${p.accent}" stroke-width="4" stroke-linecap="round"/>
    `,
    monkey: `
      ${headBase}
      <circle cx="34" cy="58" r="13" fill="${p.accent}"/>
      <circle cx="86" cy="58" r="13" fill="${p.accent}"/>
      <circle cx="60" cy="59" r="30" fill="${p.accent}"/>
      <path d="M39 62c0-16 10-28 21-28s21 12 21 28c0 17-10 30-21 30S39 79 39 62Z" fill="${p.light}"/>
      <circle cx="49" cy="57" r="3.4" fill="${p.dark}"/>
      <circle cx="71" cy="57" r="3.4" fill="${p.dark}"/>
      <ellipse cx="60" cy="72" rx="15" ry="11" fill="#ffc486"/>
      <path d="M54 72c4 5 8 5 12 0" fill="none" stroke="${p.dark}" stroke-width="3" stroke-linecap="round"/>
    `,
  };

  return `
    <svg class="animal-icon animal-icon-${id}" viewBox="0 0 120 120" role="img" aria-label="${name}">
      <circle cx="60" cy="60" r="57" fill="#fffaf0"/>
      <circle cx="60" cy="60" r="52" fill="${p.face}" opacity=".18"/>
      ${faces[id] || faces.lion}
      <path d="M28 102c13 8 51 8 64 0" fill="none" stroke="rgba(29,40,48,.12)" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `;
}

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => page.classList.remove("page-active"));
  $(`#${pageId}`).classList.add("page-active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
}

function saveProgress() {
  storageSet(
    STORAGE_KEY,
    JSON.stringify({
      current: state.current,
      answers: state.answers,
      startedAt: state.startedAt,
      sessionId: state.sessionId,
    }),
  );
}

function restoreProgress() {
  const saved = storageGet(STORAGE_KEY);
  if (!saved) return false;

  try {
    const parsed = JSON.parse(saved);
    state.current = Math.min(parsed.current || 0, QUESTIONS.length - 1);
    state.answers = parsed.answers || {};
    state.startedAt = parsed.startedAt || Date.now();
    state.sessionId = parsed.sessionId || createId("session");
    return true;
  } catch {
    storageRemove(STORAGE_KEY);
    return false;
  }
}

function startQuiz() {
  const hasProgress = restoreProgress();
  if (!hasProgress) {
    state.current = 0;
    state.answers = {};
    state.startedAt = Date.now();
    state.sessionId = createId("session");
    saveProgress();
  }
  renderQuestion();
  showPage("quizPage");
}

function restartQuiz() {
  state.current = 0;
  state.answers = {};
  state.startedAt = Date.now();
  state.sessionId = createId("session");
  state.lastResult = null;
  storageRemove(STORAGE_KEY);
  storageRemove(RESULT_KEY);
  renderQuestion();
  showPage("quizPage");
}

function getQuestionOptions(question) {
  return question.options;
}

function renderQuestion() {
  const question = QUESTIONS[state.current];
  const selected = state.answers[question.id];

  $("#questionTitle").textContent = question.text;
  $("#currentCount").textContent = String(state.current + 1);
  $("#progressFill").style.width = `${Math.round(((state.current + 1) / QUESTIONS.length) * 100)}%`;

  $("#optionList").innerHTML = question.options
    .map((option, index) => {
      const letter = String.fromCharCode(65 + index);
      const selectedClass = selected === index ? " is-selected" : "";
      return `
        <button class="option-button${selectedClass}" type="button" data-option="${index}">
          <span class="option-key">${letter}</span>
          <span>${option.text}</span>
        </button>
      `;
    })
    .join("");
}

function chooseOption(index) {
  if (state.isAdvancing) return;
  state.isAdvancing = true;

  const selectedQuestionIndex = state.current;
  const question = QUESTIONS[state.current];
  state.answers[question.id] = index;
  saveProgress();
  renderQuestion();

  window.setTimeout(() => {
    if (state.current !== selectedQuestionIndex) {
      state.isAdvancing = false;
      return;
    }

    if (state.current < QUESTIONS.length - 1) {
      state.current += 1;
      state.isAdvancing = false;
      saveProgress();
      renderQuestion();
      return;
    }

    state.isAdvancing = false;
    finishQuiz();
  }, 260);
}

function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, value, index) => sum + value * b[index], 0);
  const magA = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0));
  const magB = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0));
  if (!magA || !magB) return 0;
  return dot / (magA * magB);
}

function maxConsecutiveSameAnswer() {
  let maxStreak = 1;
  let streak = 1;
  let previous = null;

  QUESTIONS.forEach((question) => {
    const answer = state.answers[question.id];
    if (answer === undefined) return;

    if (answer === previous) {
      streak += 1;
    } else {
      streak = 1;
      previous = answer;
    }
    maxStreak = Math.max(maxStreak, streak);
  });

  return maxStreak;
}

function calculateResult() {
  const rawScores = Object.fromEntries(dimKeys.map((key) => [key, 0]));

  QUESTIONS.forEach((question) => {
    const answerIndex = state.answers[question.id];
    if (answerIndex === undefined) return;
    const option = question.options[answerIndex];
    rawScores[option.dim] += 1;
  });

  const scores = Object.fromEntries(
    dimKeys.map((key) => [key, Math.round((rawScores[key] / TOTAL_QUESTIONS) * 100)]),
  );
  const userVector = dimKeys.map((key) => scores[key]);

  const matches = ANIMALS.map((animal) => {
    const similarity = cosineSimilarity(userVector, animal.vector);
    return {
      animal,
      similarity,
      match: Math.round(similarity * 100),
    };
  }).sort((a, b) => b.similarity - a.similarity);

  const durationSeconds = state.startedAt ? Math.round((Date.now() - state.startedAt) / 1000) : 0;
  const rawValues = Object.values(rawScores);
  const isBalanced = rawValues.every((value) => value >= 3 && value <= 4);
  const dominantDimension = dimKeys.find((key) => rawScores[key] >= 10);
  const maxStreak = maxConsecutiveSameAnswer();
  const isMixed = matches[0].match - matches[1].match < 3;

  return {
    scores,
    rawScores,
    primary: matches[0].animal,
    secondary: matches[1].animal,
    match: matches[0].match,
    secondMatch: matches[1].match,
    isMixed,
    isBalanced,
    dominantDimension,
    maxStreak,
    durationSeconds,
  };
}

function serializableResult(result) {
  return {
    ...result,
    primary: { id: result.primary.id },
    secondary: { id: result.secondary.id },
  };
}

function getAnswerDetails() {
  return Object.fromEntries(
    QUESTIONS.map((question) => {
      const answerIndex = state.answers[question.id];
      const option = question.options[answerIndex];
      return [
        question.id,
        {
          index: answerIndex,
          choice: String.fromCharCode(65 + answerIndex),
          dim: option?.dim || null,
          text: option?.text || "",
        },
      ];
    }),
  );
}

function buildResultPayload(result) {
  return {
    result_id: result.resultId,
    visitor_id: result.visitorId,
    session_id: result.sessionId,
    created_at: result.createdAt,
    primary_animal: result.primary.id,
    primary_animal_name: result.primary.name,
    secondary_animal: result.secondary.id,
    secondary_animal_name: result.secondary.name,
    match: result.match,
    second_match: result.secondMatch,
    scores: result.scores,
    raw_scores: result.rawScores,
    duration_seconds: result.durationSeconds,
    is_mixed: result.isMixed,
    is_balanced: result.isBalanced,
    dominant_dimension: result.dominantDimension || null,
    max_streak: result.maxStreak,
    answers: getAnswerDetails(),
  };
}

async function submitResult(result) {
  if (!window.fetch || window.location.protocol === "file:") return;

  try {
    const response = await fetch(API_RESULTS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildResultPayload(result)),
    });

    if (!response.ok) throw new Error("Result submission failed");
  } catch (error) {
    console.warn("Result submission skipped:", error);
  }
}

function finishQuiz() {
  const unanswered = QUESTIONS.find((question) => state.answers[question.id] === undefined);
  if (unanswered) {
    state.current = QUESTIONS.indexOf(unanswered);
    renderQuestion();
    return;
  }

  const result = {
    ...calculateResult(),
    resultId: createId("result"),
    visitorId: getVisitorId(),
    sessionId: state.sessionId || createId("session"),
    createdAt: new Date().toISOString(),
  };
  state.lastResult = result;
  storageSet(RESULT_KEY, JSON.stringify(serializableResult(result)));
  storageRemove(STORAGE_KEY);
  renderResult(result);
  showPage("resultPage");
  submitResult(result);
}

function confidenceLabel(result) {
  if (result.maxStreak >= 8) return "置信度：疑似机械作答";
  if (result.durationSeconds < 60) return "置信度：偏直觉型";
  if (result.dominantDimension) {
    const dim = DIMENSIONS.find((item) => item.key === result.dominantDimension);
    return `人格状态：强${dim.name}型`;
  }
  if (result.isBalanced) return "人格状态：均衡适应型";
  if (result.isMixed) return "人格状态：混合型";
  return "置信度：稳定";
}

function resultSummary(result) {
  if (result.isBalanced) {
    return `${result.primary.summary} 你的五个维度比较均衡，说明你会根据关系和环境切换不同策略。`;
  }

  if (result.isMixed) {
    return `${result.primary.summary} 你也带有${result.secondary.name}的气质，既有主动物塑的核心倾向，也会在特定场景切换到副动物塑策略。`;
  }

  return result.primary.summary;
}

function renderShareCardPreview(result) {
  const preview = $("#shareCardPreview");
  if (!preview) return;

  const animal = result.primary;
  preview.style.setProperty("--badge-bg", animal.color);
  preview.innerHTML = `
    <div class="share-card-inner">
      <div class="share-card-brand">
        <strong>动物塑</strong>
        <span>Animal Persona</span>
      </div>
      <div class="share-card-animal">${animalIcon(animal)}</div>
      <div>
        <h4 class="share-card-title">${animal.name}</h4>
        <p class="share-card-subtitle">${animal.title}</p>
      </div>
      <div class="share-card-tags">
        ${animal.keywords.map((keyword) => `<span>${keyword}</span>`).join("")}
      </div>
      <p class="share-card-summary">${animal.summary}</p>
      <div>
        <div class="share-card-meta">
          <strong>匹配度 ${result.match}%</strong>
          <span>${result.isMixed ? `隐藏副塑 ${result.secondary.name}` : `第二接近 ${result.secondary.name}`}</span>
        </div>
        <div class="share-card-note">18 题真实生活选择题，仅供娱乐与自我探索。</div>
      </div>
    </div>
  `;
}

function renderResult(result) {
  const animal = result.primary;
  document.documentElement.style.setProperty("--badge-bg", animal.color);

  $("#resultAnimalCard").style.setProperty("--badge-bg", animal.color);
  $("#resultAnimalCard").innerHTML = `<div class="animal-badge">${animalIcon(animal)}</div>`;
  $("#resultName").textContent = `${animal.name}：${animal.title}`;
  $("#resultSummary").textContent = resultSummary(result);
  $("#matchPercent").textContent = `匹配度 ${result.match}%`;
  $("#secondaryAnimal").textContent = result.isMixed
    ? `隐藏副塑：${result.secondary.name}`
    : `第二接近：${result.secondary.name}`;
  $("#confidenceText").textContent = confidenceLabel(result);
  $("#keywordTags").innerHTML = animal.keywords.map((tag) => `<span>${tag}</span>`).join("");

  $("#scoreList").innerHTML = DIMENSIONS.map((dim) => {
    const percent = result.scores[dim.key];
    const raw = result.rawScores[dim.key];
    return `
      <div class="score-row">
        <div class="score-top">
          <span>${dim.code} ${dim.name}</span>
          <span>${raw}/18 · ${percent}%</span>
        </div>
        <div class="score-bar"><span style="--score:${percent}%"></span></div>
        <small>${dim.note}</small>
      </div>
    `;
  }).join("");

  const manualItems = [
    ["核心优势", animal.strength],
    ["潜在盲区", animal.blindspot],
    ["关系模式", animal.relation],
    ["压力状态", animal.stress],
    ["成长建议", animal.growth],
  ];

  $("#manualList").innerHTML = manualItems
    .map(([label, value]) => `<div class="manual-item"><strong>${label}</strong><span>${value}</span></div>`)
    .join("");

  $("#compatList").innerHTML = `
    <div class="compat-item"><strong>适配动物</strong><span>${animal.compatible.join("、")}</span></div>
    <div class="compat-item"><strong>容易冲突</strong><span>${animal.conflict.join("、")}</span></div>
    <div class="compat-item"><strong>沟通提醒</strong><span>先说真实需求，再说判断和建议。你的动物塑会更容易被理解。</span></div>
  `;

  renderShareCardPreview(result);
  drawShareCard(result);
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function fillCircle(ctx, x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function fillEllipse(ctx, x, y, radiusX, radiusY, color, rotation = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(radiusX, radiusY);
  ctx.beginPath();
  ctx.arc(0, 0, 1, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function fillPath(ctx, color, path) {
  ctx.beginPath();
  path(ctx);
  ctx.fillStyle = color;
  ctx.fill();
}

function strokePath(ctx, color, width, path) {
  ctx.beginPath();
  path(ctx);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
}

function drawBasicEyes(ctx, dark) {
  fillCircle(ctx, -13, -5, 3.2, dark);
  fillCircle(ctx, 13, -5, 3.2, dark);
  strokePath(ctx, dark, 3, (p) => {
    p.moveTo(-6, 16);
    p.quadraticCurveTo(0, 21, 6, 16);
  });
}

function drawAnimalSpriteCanvasIcon(ctx, animal, centerX, centerY, size) {
  if (!animalSpriteImage || !animalSpriteImage.complete || !animalSpriteImage.naturalWidth) return false;

  const [column, row] = SPRITE_POSITIONS[animal.id] || [0, 0];
  const tileWidth = animalSpriteImage.naturalWidth / 3;
  const tileHeight = animalSpriteImage.naturalHeight / 4;
  const sourceX = column * tileWidth;
  const sourceY = row * tileHeight;
  const targetX = centerX - size / 2;
  const targetY = centerY - size / 2;

  ctx.save();
  drawRoundedRect(ctx, targetX, targetY, size, size, 36);
  ctx.clip();
  ctx.drawImage(animalSpriteImage, sourceX, sourceY, tileWidth, tileHeight, targetX, targetY, size, size);
  ctx.restore();
  return true;
}

function ensureAnimalSpriteReady() {
  if (!animalSpriteImage) return Promise.resolve(false);
  if (animalSpriteImage.complete && animalSpriteImage.naturalWidth) return Promise.resolve(true);

  return new Promise((resolve) => {
    let settled = false;
    const done = (ready) => {
      if (settled) return;
      settled = true;
      resolve(ready);
    };

    animalSpriteImage.addEventListener("load", () => done(true), { once: true });
    animalSpriteImage.addEventListener("error", () => done(false), { once: true });
    window.setTimeout(() => done(Boolean(animalSpriteImage.naturalWidth)), 1200);
  });
}

function drawAnimalCanvasIcon(ctx, animal, centerX, centerY, scale = 1) {
  const p = iconProfile(animal);
  const dark = p.dark;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.scale(scale, scale);

  fillCircle(ctx, 0, 0, 58, "#fffaf0");
  fillCircle(ctx, 0, 0, 52, p.face);
  ctx.globalAlpha = 0.2;
  fillCircle(ctx, 0, 0, 52, "#ffffff");
  ctx.globalAlpha = 1;

  fillPath(ctx, p.accent, (path) => {
    path.moveTo(-31, 43);
    path.quadraticCurveTo(-18, 20, 0, 20);
    path.quadraticCurveTo(18, 20, 31, 43);
    path.lineTo(31, 57);
    path.lineTo(-31, 57);
    path.closePath();
  });

  switch (animal.id) {
    case "lion":
      fillCircle(ctx, 0, -9, 34, p.accent);
      fillCircle(ctx, 0, -6, 27, p.face);
      fillCircle(ctx, -25, -20, 9, p.accent);
      fillCircle(ctx, 25, -20, 9, p.accent);
      fillEllipse(ctx, 0, 10, 17, 12, p.light);
      drawBasicEyes(ctx, dark);
      fillPath(ctx, dark, (path) => {
        path.moveTo(-4, 7);
        path.lineTo(4, 7);
        path.lineTo(0, 13);
        path.closePath();
      });
      break;
    case "wolf":
      fillPath(ctx, p.face, (path) => {
        path.moveTo(-30, -36);
        path.lineTo(-12, -12);
        path.lineTo(0, -30);
        path.lineTo(12, -12);
        path.lineTo(30, -36);
        path.lineTo(22, 18);
        path.quadraticCurveTo(13, 41, 0, 41);
        path.quadraticCurveTo(-13, 41, -22, 18);
        path.closePath();
      });
      fillEllipse(ctx, 0, 14, 16, 11, p.light);
      drawBasicEyes(ctx, dark);
      break;
    case "fox":
      fillPath(ctx, p.face, (path) => {
        path.moveTo(-34, -38);
        path.lineTo(-9, -13);
        path.lineTo(0, -28);
        path.lineTo(9, -13);
        path.lineTo(34, -38);
        path.lineTo(22, 20);
        path.quadraticCurveTo(12, 41, 0, 41);
        path.quadraticCurveTo(-12, 41, -22, 20);
        path.closePath();
      });
      fillPath(ctx, p.light, (path) => {
        path.moveTo(-18, 1);
        path.quadraticCurveTo(-8, 13, 0, 33);
        path.quadraticCurveTo(8, 13, 18, 1);
        path.quadraticCurveTo(12, 38, 0, 38);
        path.quadraticCurveTo(-12, 38, -18, 1);
        path.closePath();
      });
      drawBasicEyes(ctx, dark);
      break;
    case "cat":
      fillPath(ctx, p.face, (path) => {
        path.moveTo(-30, -32);
        path.lineTo(-12, -12);
        path.lineTo(0, -20);
        path.lineTo(12, -12);
        path.lineTo(30, -32);
        path.lineTo(25, 21);
        path.quadraticCurveTo(16, 40, 0, 40);
        path.quadraticCurveTo(-16, 40, -25, 21);
        path.closePath();
      });
      fillEllipse(ctx, 0, 13, 14, 10, p.light);
      drawBasicEyes(ctx, dark);
      strokePath(ctx, dark, 2.2, (path) => {
        path.moveTo(-22, 10);
        path.lineTo(-38, 6);
        path.moveTo(-22, 17);
        path.lineTo(-36, 17);
        path.moveTo(22, 10);
        path.lineTo(38, 6);
        path.moveTo(22, 17);
        path.lineTo(36, 17);
      });
      break;
    case "golden_retriever":
      fillEllipse(ctx, -31, -1, 12, 31, p.accent);
      fillEllipse(ctx, 31, -1, 12, 31, p.accent);
      fillEllipse(ctx, 0, -3, 29, 36, p.face);
      fillEllipse(ctx, 0, 14, 17, 12, p.light);
      drawBasicEyes(ctx, dark);
      break;
    case "owl":
      fillPath(ctx, p.face, (path) => {
        path.moveTo(-34, -34);
        path.quadraticCurveTo(-15, -24, 0, -28);
        path.quadraticCurveTo(15, -24, 34, -34);
        path.quadraticCurveTo(22, -3, 24, 15);
        path.quadraticCurveTo(20, 42, 0, 42);
        path.quadraticCurveTo(-20, 42, -24, 15);
        path.quadraticCurveTo(-22, -3, -34, -34);
        path.closePath();
      });
      fillCircle(ctx, -13, -2, 14, p.light);
      fillCircle(ctx, 13, -2, 14, p.light);
      fillCircle(ctx, -13, -2, 5, dark);
      fillCircle(ctx, 13, -2, 5, dark);
      fillPath(ctx, "#eaa43f", (path) => {
        path.moveTo(-5, 15);
        path.lineTo(0, 24);
        path.lineTo(5, 15);
        path.closePath();
      });
      break;
    case "dolphin":
      fillPath(ctx, p.face, (path) => {
        path.moveTo(-36, 17);
        path.quadraticCurveTo(-4, -46, 38, -10);
        path.quadraticCurveTo(17, -13, 1, 14);
        path.quadraticCurveTo(27, 9, 44, 25);
        path.quadraticCurveTo(4, 34, -36, 17);
        path.closePath();
      });
      fillPath(ctx, p.accent, (path) => {
        path.moveTo(-2, -31);
        path.quadraticCurveTo(13, -53, 36, -52);
        path.quadraticCurveTo(19, -36, 15, -16);
        path.closePath();
      });
      fillCircle(ctx, 21, -8, 3.2, dark);
      strokePath(ctx, p.light, 6, (path) => {
        path.moveTo(-16, 17);
        path.quadraticCurveTo(3, 34, 31, 31);
      });
      break;
    case "panda":
      fillCircle(ctx, -23, -26, 13, p.accent);
      fillCircle(ctx, 23, -26, 13, p.accent);
      fillCircle(ctx, 0, 1, 33, p.light);
      fillEllipse(ctx, -13, -3, 10, 13, p.accent, -0.25);
      fillEllipse(ctx, 13, -3, 10, 13, p.accent, 0.25);
      fillCircle(ctx, -13, -3, 3, p.light);
      fillCircle(ctx, 13, -3, 3, p.light);
      fillEllipse(ctx, 0, 13, 15, 10, "#eee5d8");
      strokePath(ctx, dark, 3, (path) => {
        path.moveTo(-6, 21);
        path.quadraticCurveTo(0, 25, 6, 21);
      });
      break;
    case "rabbit":
      strokePath(ctx, p.face, 13, (path) => {
        path.moveTo(-14, -20);
        path.quadraticCurveTo(-27, -66, -3, -32);
        path.moveTo(14, -20);
        path.quadraticCurveTo(27, -66, 3, -32);
      });
      fillCircle(ctx, 0, 1, 31, p.face);
      fillEllipse(ctx, 0, 15, 16, 11, p.light);
      drawBasicEyes(ctx, dark);
      break;
    case "turtle":
      fillEllipse(ctx, 0, 8, 35, 29, p.accent);
      fillEllipse(ctx, 0, 8, 28, 21, p.light);
      strokePath(ctx, p.accent, 4, (path) => {
        path.moveTo(0, -16);
        path.lineTo(0, 32);
        path.moveTo(-23, 0);
        path.lineTo(23, 0);
      });
      fillCircle(ctx, 0, -28, 15, p.face);
      fillCircle(ctx, -6, -30, 3, dark);
      fillCircle(ctx, 6, -30, 3, dark);
      break;
    case "elephant":
      fillCircle(ctx, -31, 0, 20, p.face);
      fillCircle(ctx, 31, 0, 20, p.face);
      fillCircle(ctx, 0, -2, 31, p.light);
      fillPath(ctx, p.light, (path) => {
        path.moveTo(-6, 8);
        path.quadraticCurveTo(-1, 49, -20, 45);
        path.quadraticCurveTo(8, 60, 12, 12);
        path.closePath();
      });
      drawBasicEyes(ctx, dark);
      break;
    case "monkey":
      fillCircle(ctx, -29, -2, 13, p.accent);
      fillCircle(ctx, 29, -2, 13, p.accent);
      fillCircle(ctx, 0, -1, 31, p.accent);
      fillEllipse(ctx, 0, 3, 22, 31, p.light);
      fillCircle(ctx, -11, -4, 3.2, dark);
      fillCircle(ctx, 11, -4, 3.2, dark);
      fillEllipse(ctx, 0, 14, 15, 11, "#ffc486");
      strokePath(ctx, dark, 3, (path) => {
        path.moveTo(-6, 14);
        path.quadraticCurveTo(0, 19, 6, 14);
      });
      break;
    default:
      fillCircle(ctx, 0, -4, 30, p.face);
      drawBasicEyes(ctx, dark);
  }

  strokePath(ctx, "rgba(29,40,48,.13)", 4, (path) => {
    path.moveTo(-32, 48);
    path.quadraticCurveTo(0, 58, 32, 48);
  });

  ctx.restore();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
  const chars = Array.from(text);
  let line = "";
  let lines = 0;

  chars.forEach((char, index) => {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      if (lines < maxLines) ctx.fillText(line, x, y + lines * lineHeight);
      line = char;
      lines += 1;
    } else {
      line = test;
    }

    if (index === chars.length - 1 && lines < maxLines) {
      ctx.fillText(line, x, y + lines * lineHeight);
    }
  });
}

function drawShareCard(result, options = {}) {
  const canvas = $("#shareCanvas");
  if (!canvas) return;

  const width = canvas.width;
  const height = canvas.height;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  const animal = result.primary;
  const useSprite = options.useSprite !== false;

  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#fff5db");
  bg.addColorStop(0.54, animal.color);
  bg.addColorStop(1, "#dff1e9");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255,255,255,0.16)";
  drawRoundedRect(ctx, 34, 34, width - 68, height - 68, 32);
  ctx.fill();

  ctx.fillStyle = "rgba(255,250,240,0.9)";
  drawRoundedRect(ctx, 78, 78, width - 156, height - 156, 28);
  ctx.fill();

  ctx.fillStyle = "#1d2830";
  ctx.font = '800 42px "PingFang SC", system-ui, sans-serif';
  ctx.fillText("动物塑", 122, 160);

  ctx.textAlign = "right";
  ctx.font = '600 25px "PingFang SC", system-ui, sans-serif';
  ctx.fillStyle = "#61707b";
  ctx.fillText("Animal Persona", width - 122, 157);
  ctx.textAlign = "left";

  const avatarSize = 292;
  const avatarX = width / 2 - avatarSize / 2;
  const avatarY = 218;
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  drawRoundedRect(ctx, avatarX - 10, avatarY - 10, avatarSize + 20, avatarSize + 20, 26);
  ctx.fill();

  if (!useSprite || !drawAnimalSpriteCanvasIcon(ctx, animal, width / 2, avatarY + avatarSize / 2, avatarSize)) {
    drawAnimalCanvasIcon(ctx, animal, width / 2, avatarY + avatarSize / 2, 1.84);
  }

  ctx.textAlign = "center";
  ctx.font = '800 64px "PingFang SC", system-ui, sans-serif';
  ctx.fillStyle = "#1d2830";
  ctx.fillText(animal.name, width / 2, 594);

  ctx.font = '650 31px "PingFang SC", system-ui, sans-serif';
  ctx.fillStyle = "#40505a";
  ctx.fillText(animal.title, width / 2, 640);

  ctx.font = '650 29px "PingFang SC", system-ui, sans-serif';
  animal.keywords.forEach((keyword, index) => {
    const x = 134 + index * 220;
    const y = 715;
    ctx.fillStyle = "rgba(255,255,255,0.76)";
    drawRoundedRect(ctx, x, y, 178, 62, 18);
    ctx.fill();
    ctx.fillStyle = "#1d2830";
    ctx.fillText(keyword, x + 89, y + 42);
  });

  ctx.textAlign = "left";
  ctx.font = '500 31px "PingFang SC", system-ui, sans-serif';
  ctx.fillStyle = "#33434d";
  wrapText(ctx, animal.summary, 128, 850, width - 256, 58, 4);

  ctx.fillStyle = "#1d2830";
  ctx.font = '700 29px "PingFang SC", system-ui, sans-serif';
  ctx.fillText(`匹配度 ${result.match}%`, 128, 1062);
  ctx.fillStyle = "#40505a";
  ctx.font = '600 28px "PingFang SC", system-ui, sans-serif';
  ctx.fillText(result.isMixed ? `隐藏副塑 ${result.secondary.name}` : `第二接近 ${result.secondary.name}`, 128, 1108);

  ctx.font = '500 23px "PingFang SC", system-ui, sans-serif';
  ctx.fillStyle = "#66737d";
  ctx.fillText("18 题真实生活选择题，仅供娱乐与自我探索。", 128, 1150);

  const link = $("#cardFallbackLink");
  if (link && !options.keepFeedback) link.classList.add("is-hidden");
  const copyFallback = $("#copyFallback");
  if (copyFallback && !options.keepFeedback) {
    copyFallback.value = "";
    copyFallback.classList.add("is-hidden");
  }

  const objectUrlApi = window.URL || window.webkitURL;
  if (!options.keepFeedback && state.cardUrl && state.cardUrlIsObject && objectUrlApi) {
    objectUrlApi.revokeObjectURL(state.cardUrl);
    state.cardUrl = null;
    state.cardUrlIsObject = false;
  }
}

async function saveShareCard() {
  const canvas = $("#shareCanvas");
  const fallbackLink = $("#cardFallbackLink");
  const objectUrlApi = window.URL || window.webkitURL;

  const finish = (url, isObjectUrl = false, message = "图片已生成，可点链接打开保存") => {
    if (state.cardUrl && state.cardUrlIsObject && objectUrlApi) {
      objectUrlApi.revokeObjectURL(state.cardUrl);
    }
    state.cardUrl = url;
    state.cardUrlIsObject = isObjectUrl;

    if (fallbackLink) {
      fallbackLink.href = url;
      fallbackLink.download = "animal-persona-card.png";
      fallbackLink.textContent = "图片已生成，点这里打开/保存";
      fallbackLink.classList.remove("is-hidden");
    }

    const link = document.createElement("a");
    link.download = "animal-persona-card.png";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast(message);
  };

  if (state.lastResult) {
    const spriteReady = await ensureAnimalSpriteReady();
    drawShareCard(state.lastResult, { useSprite: spriteReady, keepFeedback: true });
  }

  try {
    finish(canvas.toDataURL("image/png"));
    return;
  } catch {
    if (state.lastResult) {
      try {
        drawShareCard(state.lastResult, { useSprite: false, keepFeedback: true });
        finish(canvas.toDataURL("image/png"), false, "浏览器限制原图，已生成兼容版图片");
        return;
      } catch {
        // Fall back to Blob below.
      }
    }
  }

  if (canvas.toBlob && objectUrlApi) {
    try {
      canvas.toBlob((blob) => {
        if (blob) finish(objectUrlApi.createObjectURL(blob), true);
        else showToast("图片生成失败，请直接截屏保存");
      }, "image/png");
    } catch {
      showToast("当前浏览器限制保存，请直接截屏保存");
    }
    return;
  }

  showToast("当前浏览器限制保存，请直接截屏保存");
}

function copyWithTextarea(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  textarea.remove();
  return copied;
}

async function copyResult() {
  const result = state.lastResult;
  if (!result) return;
  const text = `我的动物塑是「${result.primary.name}：${result.primary.title}」，匹配度 ${result.match}%。${result.primary.summary}`;
  const fallback = $("#copyFallback");

  if (fallback) {
    fallback.value = text;
    fallback.classList.add("is-hidden");
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      showToast("结果已复制");
      return;
    }
  } catch {
    // Try the older copy path below.
  }

  if (copyWithTextarea(text)) {
    showToast("结果已复制");
    return;
  }

  if (fallback) {
    fallback.classList.remove("is-hidden");
    fallback.focus();
    fallback.select();
  }
  showToast("文案已展开，可手动复制");
}

function renderPreview() {
  const picks = ANIMALS.map((animal) => animal.id);
  $("#previewGrid").innerHTML = picks
    .map((id) => ANIMALS.find((animal) => animal.id === id))
    .map(
      (animal) => `
        <article class="animal-preview" style="--badge-bg:${animal.color}">
          <div class="animal-badge">${animalIcon(animal)}</div>
          <strong>${animal.name}</strong>
          <span>${animal.keywords.join(" · ")}</span>
        </article>
      `,
    )
    .join("");
}

function renderStageIcons() {
  document.querySelectorAll("[data-stage-animal]").forEach((target) => {
    const animal = ANIMALS.find((item) => item.id === target.dataset.stageAnimal);
    if (animal) target.innerHTML = animalIcon(animal);
  });
}

document.addEventListener("click", (event) => {
  const optionButton = event.target.closest("[data-option]");
  if (optionButton) {
    chooseOption(Number(optionButton.dataset.option));
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  const action = actionButton.dataset.action;
  if (action === "home") showPage("homePage");
  if (action === "start") startQuiz();
  if (action === "restart") restartQuiz();
  if (action === "prev") {
    state.current = Math.max(0, state.current - 1);
    saveProgress();
    renderQuestion();
  }
  if (action === "saveCard") saveShareCard();
  if (action === "copyResult") copyResult();
});

renderStageIcons();
renderPreview();

const savedResult = storageGet(RESULT_KEY);
if (savedResult) {
  try {
    const parsed = JSON.parse(savedResult);
    const primary = ANIMALS.find((animal) => animal.id === parsed.primary?.id);
    const secondary = ANIMALS.find((animal) => animal.id === parsed.secondary?.id);
    if (!primary || !secondary || !parsed.rawScores) {
      storageRemove(RESULT_KEY);
    } else {
      state.lastResult = { ...parsed, primary, secondary };
      renderResult(state.lastResult);
    }
  } catch {
    storageRemove(RESULT_KEY);
  }
}
