const DIMENSIONS = [
  {
    key: "energy",
    low: "S",
    high: "G",
    name: "能量来源",
    lowLabel: "独处充能",
    highLabel: "群体充能",
    note: "你更容易从独处恢复，还是从互动中获得能量。",
  },
  {
    key: "information",
    low: "R",
    high: "I",
    name: "信息处理",
    lowLabel: "现实聚焦",
    highLabel: "想象探索",
    note: "你更关注事实经验，还是可能性、灵感和趋势。",
  },
  {
    key: "decision",
    low: "H",
    high: "L",
    name: "决策依据",
    lowLabel: "关系感受",
    highLabel: "逻辑判断",
    note: "你做决定时更重视关系感受，还是逻辑结果。",
  },
  {
    key: "lifestyle",
    low: "F",
    high: "O",
    name: "生活节奏",
    lowLabel: "自由流动",
    highLabel: "秩序掌控",
    note: "你更喜欢弹性变化，还是计划稳定。",
  },
  {
    key: "state",
    low: "T",
    high: "A",
    name: "状态倾向",
    lowLabel: "敏感警觉",
    highLabel: "稳定自持",
    note: "你面对压力、评价和不确定性时的稳定程度。",
  },
];

const DIMENSION_MAP = Object.fromEntries(DIMENSIONS.map((dimension) => [dimension.key, dimension]));
const TOTAL_QUESTIONS = 24;
const ANSWER_OPTIONS = [
  { value: 1, label: "非常不同意" },
  { value: 2, label: "比较不同意" },
  { value: 3, label: "说不清 / 一半一半" },
  { value: 4, label: "比较同意" },
  { value: 5, label: "非常同意" },
];

const QUESTIONS = [
  {
    id: "Q1",
    text: "和人互动、聊天或一起做事，通常会让我更有能量。",
    dimension: "energy",
    positivePole: "G",
  },
  {
    id: "Q2",
    text: "连续社交之后，我通常需要独处一段时间才能恢复。",
    dimension: "energy",
    positivePole: "S",
  },
  {
    id: "Q3",
    text: "遇到事情时，我更倾向于先找人聊聊，而不是自己憋着想。",
    dimension: "energy",
    positivePole: "G",
  },
  {
    id: "Q4",
    text: "即使和很亲近的人在一起，我也需要保留固定的个人空间。",
    dimension: "energy",
    positivePole: "S",
  },
  {
    id: "Q5",
    text: "在陌生环境里，我通常不介意主动打开话题。",
    dimension: "energy",
    positivePole: "G",
  },
  {
    id: "Q6",
    text: "我做判断时，更相信具体事实和已有经验。",
    dimension: "information",
    positivePole: "R",
  },
  {
    id: "Q7",
    text: "我经常会从一件小事联想到更大的可能性或趋势。",
    dimension: "information",
    positivePole: "I",
  },
  {
    id: "Q8",
    text: "如果一个想法很有趣，即使暂时不现实，我也愿意继续想下去。",
    dimension: "information",
    positivePole: "I",
  },
  {
    id: "Q9",
    text: "比起抽象概念，我更喜欢清楚、具体、能落地的信息。",
    dimension: "information",
    positivePole: "R",
  },
  {
    id: "Q10",
    text: "我容易对新方法、新观点、新领域产生兴趣。",
    dimension: "information",
    positivePole: "I",
  },
  {
    id: "Q11",
    text: "做决定时，我会优先考虑逻辑、效率和长期结果。",
    dimension: "decision",
    positivePole: "L",
  },
  {
    id: "Q12",
    text: "如果一个选择会让重要的人受伤，我会很难直接做出这个选择。",
    dimension: "decision",
    positivePole: "H",
  },
  {
    id: "Q13",
    text: "讨论问题时，我更希望先把对错、责任和解决方案讲清楚。",
    dimension: "decision",
    positivePole: "L",
  },
  {
    id: "Q14",
    text: "我很容易感受到别人没说出口的委屈、尴尬或需要。",
    dimension: "decision",
    positivePole: "H",
  },
  {
    id: "Q15",
    text: "我不太喜欢为了维持表面和气而回避真正的问题。",
    dimension: "decision",
    positivePole: "L",
  },
  {
    id: "Q16",
    text: "重要事情开始前，我通常会先计划步骤和时间安排。",
    dimension: "lifestyle",
    positivePole: "O",
  },
  {
    id: "Q17",
    text: "如果计划频繁变化，我会明显感到烦躁或不安。",
    dimension: "lifestyle",
    positivePole: "O",
  },
  {
    id: "Q18",
    text: "我喜欢给生活留出弹性，不想被安排得太满。",
    dimension: "lifestyle",
    positivePole: "F",
  },
  {
    id: "Q19",
    text: "比起严格按计划走，我更喜欢根据当下状态边走边调整。",
    dimension: "lifestyle",
    positivePole: "F",
  },
  {
    id: "Q20",
    text: "我会比较在意承诺、规则和责任边界。",
    dimension: "lifestyle",
    positivePole: "O",
  },
  {
    id: "Q21",
    text: "面对批评或误解时，我通常能比较快恢复，不会被影响太久。",
    dimension: "state",
    positivePole: "A",
  },
  {
    id: "Q22",
    text: "别人语气或态度的细微变化，常常会影响我的心情。",
    dimension: "state",
    positivePole: "T",
  },
  {
    id: "Q23",
    text: "即使结果不确定，我通常也能保持相对稳定的心态。",
    dimension: "state",
    positivePole: "A",
  },
  {
    id: "Q24",
    text: "当信息不透明时，我会本能地提高警觉，反复思考可能的问题。",
    dimension: "state",
    positivePole: "T",
  },
];

const ANIMALS = [
  {
    id: "lion",
    name: "狮子型",
    title: "掌控推进者",
    color: "#f5b84b",
    keywords: ["行动力", "掌控感", "目标驱动", "结果意识"],
    summary: "你像一只狮子，习惯在混乱中站出来，让事情重新往前走。",
    description:
      "你是很典型的行动型人格。当局面混乱、没人拍板、大家都在观望时，你很容易进入“我来推动”的状态。你不喜欢事情一直停留在讨论里，也不喜欢责任模糊。比起把所有细节想清楚，你更相信先行动，再在过程中修正。",
    strength: "推进力强，目标感清晰，敢承担责任，能在压力下做决定，适合带动团队或项目从 0 到 1。",
    blindspot: "你可能太快进入解决模式。当别人还在消化情绪、理解背景或确认安全感时，你已经开始催促下一步。",
    relation: "在关系里，你会自然表现出保护欲和主导感。你喜欢两个人一起成长、一起解决问题，而不是长期停在情绪里打转。",
    work: "适合项目负责人、创业者、销售负责人、增长负责人、团队 leader、活动组织者。",
    stress: "压力大时，你可能会更急躁，更想控制局面，对低效的人失去耐心，也不太愿意听解释。",
    growth: "推进之前，先确认别人是否已经跟上。",
  },
  {
    id: "wolf",
    name: "狼型",
    title: "团队守护者",
    color: "#8e9aa6",
    keywords: ["团队", "忠诚", "承诺", "共同承担"],
    summary: "你像一只狼，重视阵营、信任和长期并肩作战。",
    description:
      "你不是单纯喜欢社交，而是很看重“我们是不是一队”。你对关系中的信任、承诺和责任感非常敏感。一旦你认定某个人、团队或目标，你会认真投入，并愿意为了共同目标付出很多。",
    strength: "团队意识强，有责任感，重视承诺，协作能力强，能在长期关系中持续投入。",
    blindspot: "你容易过度承担。当别人不负责时，你可能第一反应不是退出，而是补位、兜底、继续扛。",
    relation: "你看重忠诚和共同面对问题。你可以接受别人不完美，但很难接受不真诚、不负责、不站在你这边。",
    work: "适合团队管理、项目协作、社群运营、用户运营、活动统筹、合伙型岗位。",
    stress: "压力大时，你可能会替别人操心，对不靠谱的人失望，明明很累还继续扛，表面冷静，内心委屈。",
    growth: "忠诚不是无限消耗，责任也不等于替所有人收拾烂摊子。",
  },
  {
    id: "fox",
    name: "狐狸型",
    title: "策略观察者",
    color: "#ef8d58",
    keywords: ["策略", "判断", "灵活", "洞察"],
    summary: "你像一只狐狸，擅长看局势、读规则，并找到更聪明的路径。",
    description:
      "你反应快，观察力强，也很擅长发现事情背后的逻辑。你不一定是最冲的人，但通常能判断什么时候该进、什么时候该退。你喜欢有策略地解决问题，不喜欢粗糙、低效、没有脑子的处理方式。",
    strength: "会读空气，策略感强，反应灵活，能处理复杂局面，善于寻找更聪明的方法。",
    blindspot: "你容易想太多。别人一句话、一个表情，你可能会自动开始分析背后的意思。",
    relation: "你慢热，不喜欢太快被看透。你喜欢有分寸、有趣、有脑子的人。真正信任一个人后，你会展现出幽默、保护欲和少见的柔软。",
    work: "适合产品经理、策略运营、市场营销、商务谈判、内容策划、用户研究。",
    stress: "压力大时，你可能会过度分析、提高防备、不直接表达需求，用玩笑或冷静掩盖真实情绪。",
    growth: "不是所有关系都需要推理，有些真诚可以直接接住。",
  },
  {
    id: "cat",
    name: "猫型",
    title: "独立边界者",
    color: "#e0b6c7",
    keywords: ["独立", "边界", "自由", "选择性亲近"],
    summary: "你像一只猫，不是不需要关系，而是需要按照自己的节奏靠近。",
    description:
      "你很重视个人空间、自由和自我节奏。你不是冷漠，也不是不在乎别人。你只是很清楚：如果一段关系或环境让你持续被消耗、被安排、被干涉，你会很快想要逃离。",
    strength: "自洽，有边界感，审美和偏好清晰，不容易被群体压力带跑，适合独立思考和创作。",
    blindspot: "你容易让别人觉得难靠近。你只是需要空间，但别人可能理解成你冷淡、不在乎、故意疏远。",
    relation: "你需要自由，也需要尊重。你不喜欢被逼问、被绑定、被持续要求回应。但当你真正认定一个人，你会有很稳定的偏爱。",
    work: "适合设计师、内容创作者、自由职业者、品牌策划、艺术相关岗位、独立研究或技术岗位。",
    stress: "压力大时，你可能会失联、冷处理、不解释，想逃离所有人，表面没事，内心抗拒。",
    growth: "你不需要放弃边界，但可以练习把沉默翻译成一句简单说明。",
  },
  {
    id: "golden_retriever",
    name: "金毛犬型",
    title: "热情陪伴者",
    color: "#efc765",
    keywords: ["热情", "真诚", "陪伴", "回应"],
    summary: "你像一只金毛犬，真诚、直接，也愿意给身边人很多能量。",
    description:
      "你是很温暖、直接、愿意表达善意的人。你喜欢人与人之间简单一点、真诚一点，不喜欢冷暴力和猜来猜去。你很容易主动关心别人，也希望自己的关心能被回应。",
    strength: "真诚，有感染力，善于陪伴，容易建立信任，能给别人情绪支持。",
    blindspot: "你容易过度付出。你可能会以为“我对你好，你也会这样对我”，但不是所有人都用同一种方式表达在乎。",
    relation: "你在关系里需要回应。你不怕主动，但怕热情落空。对方一句冷淡的话、一次长时间不回复，都可能让你不安。",
    work: "适合社群运营、用户服务、教育培训、销售、活动执行、品牌传播。",
    stress: "压力大时，你可能会委屈，怀疑自己不够好，用更热情的方式换取回应，对冷淡的人特别受伤。",
    growth: "真诚是你的天赋，但不是每个人都值得你无限热情。",
  },
  {
    id: "owl",
    name: "猫头鹰型",
    title: "理性洞察者",
    color: "#9b8bc2",
    keywords: ["理性", "洞察", "分析", "深度"],
    summary: "你像一只猫头鹰，习惯安静观察，并从复杂信息里看出规律。",
    description:
      "你习惯先理解事情的逻辑，再决定要不要行动。你不喜欢被情绪推着走，也不喜欢没有依据的判断。你看问题通常比较深，也比较长远。你可能不常表达，但一旦开口，通常能说到关键点。",
    strength: "分析力强，判断冷静，能处理复杂问题，对信息和逻辑敏感，适合长期深度思考。",
    blindspot: "你容易想太久。当你试图把所有信息都弄清楚时，机会可能已经过去。你也可能因为表达太理性，让别人觉得你不够有温度。",
    relation: "你喜欢有深度的关系。相比频繁聊天，你更看重高质量交流。你不喜欢太浅、太吵、太没有逻辑的互动。",
    work: "适合研究员、咨询顾问、数据分析、技术开发、风控、知识产品设计。",
    stress: "压力大时，你可能会反复分析、推迟行动、对外界变冷、用理性压住情绪、不愿意求助。",
    growth: "有些答案不是想出来的，是做出来的。",
  },
  {
    id: "dolphin",
    name: "海豚型",
    title: "社交连接者",
    color: "#69c9d0",
    keywords: ["社交", "共情", "连接", "氛围感"],
    summary: "你像一只海豚，擅长连接人和人，让气氛自然流动起来。",
    description:
      "你很擅长感受到场上的氛围，也知道如何让大家更自然地互动。你不是单纯外向，而是对关系流动很敏感。你能接话、暖场，也能感知谁被冷落、谁需要回应。",
    strength: "会接话，会暖场，适应新环境快，能快速建立关系，有较强共情和互动能力。",
    blindspot: "你可能太在意气氛。有时候你会为了让场子舒服，而忽略自己的真实感受。",
    relation: "你喜欢有互动感的关系。你需要回应、分享、玩笑和情绪流动。如果一段关系长期没有反馈，你会觉得自己像在对空气讲话。",
    work: "适合公关、社群运营、品牌传播、主持、用户增长、活动策划。",
    stress: "压力大时，你可能会更想找人说话，害怕被孤立，用热闹掩盖疲惫，明明累了还继续社交。",
    growth: "你不需要负责所有人的气氛。",
  },
  {
    id: "panda",
    name: "熊猫型",
    title: "松弛治愈者",
    color: "#d8e1dd",
    keywords: ["温和", "松弛", "陪伴", "低压"],
    summary: "你像一只熊猫，温和、低攻击性，让人觉得相处起来很放松。",
    description:
      "你给人的感觉通常是舒服、稳定、没有攻击性。你愿意陪伴别人，但不喜欢被高强度消耗。你的力量不是冲击力，而是让人放松的稳定感。你不太喜欢卷入强竞争，也不喜欢被频繁催促。",
    strength: "温和，有陪伴感，低攻击性，让人容易放松，适合长期稳定关系。",
    blindspot: "你容易拖延或逃避压力。你可能会用“我不急”“顺其自然”来掩盖自己不想面对的问题。",
    relation: "你喜欢自然发生的关系。太强烈、太刺激、太不稳定的关系会消耗你。你需要的是舒服、稳定、不用表演。",
    work: "适合内容运营、社区维护、用户陪伴型岗位、教育辅助、行政支持、生活方式类内容创作。",
    stress: "压力大时，你可能会躺平、回避沟通、拖延处理、假装没事，用吃喝娱乐安抚自己。",
    growth: "松弛不是停滞，舒服也不等于逃避。",
  },
  {
    id: "rabbit",
    name: "兔子型",
    title: "敏感感知者",
    color: "#f2b8c6",
    keywords: ["细腻", "敏感", "共情", "安全感"],
    summary: "你像一只兔子，能捕捉到很多别人忽略的情绪和细节。",
    description:
      "你对环境、语气、关系变化和潜在风险很敏感。你不是脆弱，而是感知系统比较发达。你能捕捉到很多细节，也很容易注意到别人没有说出口的情绪。你需要安全感、稳定感和温柔明确的回应。",
    strength: "细腻，共情力强，感知力强，适合观察用户和关系，能发现别人忽略的问题。",
    blindspot: "你容易内耗。别人一句无心的话，你可能会想很久。当信息不明确时，你的大脑会自动补全很多可能性，其中不少是负面的。",
    relation: "你需要温柔、稳定、明确的关系。你不一定需要对方时时刻刻陪你，但你需要知道自己是被在意的。",
    work: "适合用户体验、内容创作、设计、心理陪伴类工作、客服质检、用户研究。",
    stress: "压力大时，你可能会退缩、想太多、不敢直接问、自我怀疑，对外界刺激更敏感。",
    growth: "不要把所有细节都当成危险信号。敏感是天赋，但需要和事实校准。",
  },
  {
    id: "turtle",
    name: "乌龟型",
    title: "长线稳定者",
    color: "#8dbb80",
    keywords: ["稳定", "长期主义", "秩序", "安全感"],
    summary: "你像一只乌龟，慢热但稳定，重视长期积累和安全边界。",
    description:
      "你相信慢慢来，也相信稳定积累。你不喜欢被迫快速变化，更不喜欢没有准备就冲出去。你的核心不是慢，而是稳。你更愿意选择可靠、可控、可长期推进的路径。",
    strength: "稳定，有耐心，重视安全，适合长期积累，不容易被短期诱惑带跑。",
    blindspot: "你容易过度保守。你可能不是没有能力，而是总觉得“还没准备好”。于是有些机会可能会在等待中错过。",
    relation: "你在关系里慢热，但稳定。你不会轻易开始，也不轻易结束。一旦确认关系，你通常会认真经营。",
    work: "适合财务、法务、工程、研究、运营管理、长周期项目执行。",
    stress: "压力大时，你可能会缩回自己的壳里、拒绝变化、拖延决定、只想守住现状、对外界建议产生抵触。",
    growth: "稳定不是永远不变，而是在变化中仍然保持自己。",
  },
  {
    id: "elephant",
    name: "大象型",
    title: "可靠承担者",
    color: "#b8b2a4",
    keywords: ["可靠", "承担", "责任", "长期关系"],
    summary: "你像一只大象，稳重、可靠，是别人眼里值得信任的长期支持者。",
    description:
      "你很有责任感和承载力。你重视承诺、稳定、关系和长期安全。你未必话多，但别人容易觉得你可靠、有分量、值得信任。你不喜欢轻率承诺，也不喜欢没有责任感的人。",
    strength: "稳重，说到做到，有承载力，能给别人安全感，能在混乱中稳定局面。",
    blindspot: "你容易把太多责任背到自己身上。你可能习惯说“没事，我来”，但长期下来会很累。",
    relation: "你在关系里重视长期稳定。你表达爱意的方式通常不是夸张浪漫，而是实际承担。",
    work: "适合管理者、人力资源、教育工作者、行政统筹、家庭或团队核心角色、组织建设岗位。",
    stress: "压力大时，你可能会沉默、硬撑、不愿示弱、自己消化问题、对不负责的人失望。",
    growth: "可靠不等于永远不能倒下。你也有被支持、被照顾的权利。",
  },
  {
    id: "monkey",
    name: "猴子型",
    title: "好奇探索者",
    color: "#d79a5a",
    keywords: ["好奇", "灵活", "新鲜感", "创意"],
    summary: "你像一只猴子，对新鲜事物反应很快，喜欢变化、尝试和有趣的东西。",
    description:
      "你对新东西很敏感，也很容易被有趣的想法吸引。你不是不能认真，而是很难长期忍受无聊、重复、没有变化的环境。你喜欢边做边试，也擅长在变化中找到机会。",
    strength: "点子多，反应快，喜欢新鲜感，擅长临场调整，能给沉闷环境带来活力。",
    blindspot: "你容易开很多头，但不一定收尾。一旦进入重复执行，就会快速失去动力。",
    relation: "你喜欢有趣、有变化、能一起探索的关系。你不喜欢被管太死，也不喜欢每天都按固定模式相处。",
    work: "适合创意策划、新媒体、内容创作、产品创新、活动策划、趋势研究。",
    stress: "压力大时，你可能会想逃离、到处找新刺激、很难专注、用玩乐转移焦虑、对长期承诺产生压力。",
    growth: "给灵感配一个完成机制。新鲜感负责点火，结构感负责落地。",
  },
];

const ANIMAL_MAP = {
  "G-R-L-O": "lion",
  "G-R-L-F": "lion",
  "G-R-H-O": "wolf",
  "G-R-H-F": "golden_retriever",
  "G-I-L-O": "fox",
  "G-I-L-F": "monkey",
  "G-I-H-O": "dolphin",
  "G-I-H-F": "dolphin",
  "S-R-L-O": "turtle",
  "S-R-L-F": "owl",
  "S-R-H-O": "elephant",
  "S-R-H-F": "panda",
  "S-I-L-O": "owl",
  "S-I-L-F": "cat",
  "S-I-H-O": "rabbit",
  "S-I-H-F": "cat",
};

const STATE_TYPES = {
  A: {
    name: "稳定版",
    label: "稳定自持",
    description:
      "你面对评价、变化和不确定性时，通常能保持相对稳定。你不是没有情绪，而是不太容易被外界长期牵着走。",
  },
  T: {
    name: "敏锐版",
    label: "敏感警觉",
    description:
      "你对语气、细节、风险和关系变化更加敏感。你可能更容易多想，但也更容易提前发现问题。",
  },
  X: {
    name: "平衡版",
    label: "平衡状态",
    description:
      "你在稳定和敏感之间比较平衡。有些场景下你能快速恢复，有些场景下你也会捕捉到很多细节。",
  },
};

const CONFIDENCE_TEXT = {
  high: "你的结果倾向比较清晰，动物塑匹配度较高。",
  medium: "你的部分维度接近中间值，说明你会根据场景切换。当前结果代表你最常见的整体倾向。",
  low: "你的结果比较均衡，可能更像“场景切换型”。建议把这个结果看作当前状态，而不是固定标签。",
};

const STORAGE_KEY = "animalPersonaV5Progress";
const RESULT_KEY = "animalPersonaV5Result";
const VISITOR_KEY = "animalPersonaV2VisitorId";
const API_RESULTS_ENDPOINT = "/api/results";

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

const state = {
  current: 0,
  answers: {},
  nickname: "",
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

function $(selector) {
  return document.querySelector(selector);
}

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
    // Storage can be blocked in some preview modes; the test still works without it.
  }
}

function storageRemove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Storage is optional.
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

function sanitizeNickname(value) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, 24);
}

function spriteStyle(id) {
  const [column, row] = SPRITE_POSITIONS[id] || [0, 0];
  return `--sprite-x:${column * 50}%; --sprite-y:${row * (100 / 3)}%;`;
}

function animalIcon(animalOrId, label = "") {
  const id = typeof animalOrId === "string" ? animalOrId : animalOrId.id;
  const name = typeof animalOrId === "string" ? label : animalOrId.name;
  return `<span class="animal-sprite animal-sprite-${id}" role="img" aria-label="${name}" style="${spriteStyle(id)}"></span>`;
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
      nickname: state.nickname,
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
    state.nickname = sanitizeNickname(parsed.nickname);
    state.startedAt = parsed.startedAt || Date.now();
    state.sessionId = parsed.sessionId || createId("session");
    const nicknameInput = $("#nicknameInput");
    if (nicknameInput && state.nickname) nicknameInput.value = state.nickname;
    return true;
  } catch {
    storageRemove(STORAGE_KEY);
    return false;
  }
}

function startQuiz() {
  const nicknameInput = $("#nicknameInput");
  const nextNickname = sanitizeNickname(nicknameInput?.value);
  if (!nextNickname) {
    showToast("请先输入昵称");
    nicknameInput?.focus();
    return;
  }

  const hasProgress = restoreProgress();
  state.nickname = nextNickname;
  if (!hasProgress) {
    state.current = 0;
    state.answers = {};
    state.startedAt = Date.now();
    state.sessionId = createId("session");
  }

  saveProgress();
  renderQuestion();
  showPage("quizPage");
}

function restartQuiz() {
  state.current = 0;
  state.answers = {};
  state.nickname = sanitizeNickname($("#nicknameInput")?.value || state.nickname);
  state.startedAt = Date.now();
  state.sessionId = createId("session");
  state.lastResult = null;
  storageRemove(STORAGE_KEY);
  storageRemove(RESULT_KEY);
  renderQuestion();
  showPage(state.nickname ? "quizPage" : "homePage");
}

function renderQuestion() {
  const question = QUESTIONS[state.current];
  const selected = state.answers[question.id];

  $("#questionTitle").textContent = question.text;
  $("#currentCount").textContent = String(state.current + 1);
  $("#progressFill").style.width = `${Math.round(((state.current + 1) / QUESTIONS.length) * 100)}%`;

  $("#optionList").innerHTML = ANSWER_OPTIONS.map((option) => {
    const selectedClass = selected === option.value ? " is-selected" : "";
    return `
      <button class="option-button${selectedClass}" type="button" data-option="${option.value}">
        <span class="option-key">${option.value}</span>
        <span>${option.label}</span>
      </button>
    `;
  }).join("");
}

function chooseOption(value) {
  if (state.isAdvancing) return;
  state.isAdvancing = true;

  const selectedQuestionIndex = state.current;
  const question = QUESTIONS[state.current];
  state.answers[question.id] = value;
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
  }, 220);
}

function getOppositePole(question) {
  const dimension = DIMENSION_MAP[question.dimension];
  return question.positivePole === dimension.low ? dimension.high : dimension.low;
}

function calculateScores() {
  const poleScores = {
    S: 0,
    G: 0,
    R: 0,
    I: 0,
    H: 0,
    L: 0,
    F: 0,
    O: 0,
    T: 0,
    A: 0,
  };

  QUESTIONS.forEach((question) => {
    const answer = Number(state.answers[question.id]);
    if (!answer) return;
    const oppositePole = getOppositePole(question);
    poleScores[question.positivePole] += answer;
    poleScores[oppositePole] += 6 - answer;
  });

  const scores = {
    energy: Math.round((poleScores.G / (poleScores.G + poleScores.S)) * 100),
    information: Math.round((poleScores.I / (poleScores.I + poleScores.R)) * 100),
    decision: Math.round((poleScores.L / (poleScores.L + poleScores.H)) * 100),
    lifestyle: Math.round((poleScores.O / (poleScores.O + poleScores.F)) * 100),
    state: Math.round((poleScores.A / (poleScores.A + poleScores.T)) * 100),
  };

  return { poleScores, scores };
}

function getForcedLetter(score, lowLetter, highLetter) {
  if (score < 45) return lowLetter;
  if (score > 55) return highLetter;
  return score >= 50 ? highLetter : lowLetter;
}

function getDisplayLetter(score, lowLetter, highLetter) {
  if (score < 45) return lowLetter;
  if (score > 55) return highLetter;
  return "X";
}

function getDimensionLabel(score, dimension) {
  if (score < 45) return dimension.lowLabel;
  if (score > 55) return dimension.highLabel;
  return `中间型，略偏${score >= 50 ? dimension.highLabel : dimension.lowLabel}`;
}

function getMiddleDimensions(scores) {
  return DIMENSIONS.filter((dimension) => scores[dimension.key] >= 45 && scores[dimension.key] <= 55).map(
    (dimension) => dimension.key,
  );
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

function getConfidence({ middleDimensions, durationSeconds, maxStreak }) {
  const answers = QUESTIONS.map((question) => Number(state.answers[question.id]));
  const allSame = answers.every((answer) => answer === answers[0]);
  const allMiddle = answers.every((answer) => answer === 3);
  const allExtreme = allSame && (answers[0] === 1 || answers[0] === 5);
  const abnormal = durationSeconds < 60 || maxStreak >= 12 || allMiddle || allExtreme;

  if (middleDimensions.length >= 3 || abnormal) return "low";
  if (middleDimensions.length === 2) return "medium";
  return "high";
}

function calculateResult() {
  const { poleScores, scores } = calculateScores();
  const forcedLetters = Object.fromEntries(
    DIMENSIONS.map((dimension) => [
      dimension.key,
      getForcedLetter(scores[dimension.key], dimension.low, dimension.high),
    ]),
  );
  const displayLetters = Object.fromEntries(
    DIMENSIONS.map((dimension) => [
      dimension.key,
      getDisplayLetter(scores[dimension.key], dimension.low, dimension.high),
    ]),
  );
  const dimensionLabels = Object.fromEntries(
    DIMENSIONS.map((dimension) => [dimension.key, getDimensionLabel(scores[dimension.key], dimension)]),
  );
  const coreCode = [
    forcedLetters.energy,
    forcedLetters.information,
    forcedLetters.decision,
    forcedLetters.lifestyle,
  ].join("-");
  const stateType = displayLetters.state;
  const code = `${coreCode}-${stateType}`;
  const animal = ANIMALS.find((item) => item.id === ANIMAL_MAP[coreCode]) || ANIMALS[0];
  const stateVersion = STATE_TYPES[stateType] || STATE_TYPES.X;
  const middleDimensions = getMiddleDimensions(scores);
  const durationSeconds = state.startedAt ? Math.round((Date.now() - state.startedAt) / 1000) : 0;
  const maxStreak = maxConsecutiveSameAnswer();
  const confidence = getConfidence({ middleDimensions, durationSeconds, maxStreak });
  const clarity = confidence === "high" ? 92 : confidence === "medium" ? 78 : 64;

  return {
    nickname: state.nickname,
    animal,
    stateType,
    stateName: stateVersion.name,
    stateLabel: stateVersion.label,
    stateDescription: stateVersion.description,
    fullName: `${stateVersion.name}${animal.name}`,
    code,
    coreCode,
    scores,
    poleScores,
    letters: displayLetters,
    forcedLetters,
    dimensionLabels,
    middleDimensions,
    confidence,
    confidenceText: CONFIDENCE_TEXT[confidence],
    match: clarity,
    maxStreak,
    durationSeconds,
  };
}

function serializableResult(result) {
  return {
    ...result,
    animal: { id: result.animal.id },
  };
}

function getAnswerDetails() {
  return Object.fromEntries([
    [
      "_meta",
      {
        nickname: state.nickname,
        version: "v5.0",
      },
    ],
    ...QUESTIONS.map((question) => {
      const score = Number(state.answers[question.id]);
      const option = ANSWER_OPTIONS.find((item) => item.value === score);
      return [
        question.id,
        {
          score,
          label: option?.label || "",
          dimension: question.dimension,
          positivePole: question.positivePole,
          text: question.text,
        },
      ];
    }),
  ]);
}

function buildResultPayload(result) {
  return {
    result_id: result.resultId,
    visitor_id: result.visitorId,
    session_id: result.sessionId,
    created_at: result.createdAt,
    nickname: result.nickname,
    primary_animal: result.animal.id,
    primary_animal_name: result.fullName,
    secondary_animal: result.coreCode,
    secondary_animal_name: result.animal.name,
    full_name: result.fullName,
    animal_name: result.animal.name,
    state_type: result.stateType,
    state_name: result.stateName,
    code: result.code,
    core_code: result.coreCode,
    match: result.match,
    second_match: 0,
    scores: result.scores,
    raw_scores: result.poleScores,
    duration_seconds: result.durationSeconds,
    confidence: result.confidence,
    middle_dimensions: result.middleDimensions,
    is_mixed: result.middleDimensions.length >= 2,
    is_balanced: result.middleDimensions.length >= 3,
    dominant_dimension: null,
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

function renderShareCardPreview(result) {
  const preview = $("#shareCardPreview");
  if (!preview) return;

  preview.style.setProperty("--badge-bg", result.animal.color);
  preview.innerHTML = `
    <div class="share-card-inner">
      <div class="share-card-brand">
        <strong>动物塑</strong>
        <span>${result.nickname}</span>
      </div>
      <div class="share-card-animal">${animalIcon(result.animal)}</div>
      <div>
        <h4 class="share-card-title">${result.fullName}</h4>
        <p class="share-card-subtitle">${result.animal.title}</p>
      </div>
      <div class="share-card-tags">
        ${result.animal.keywords.slice(0, 3).map((keyword) => `<span>${keyword}</span>`).join("")}
      </div>
      <p class="share-card-summary">${result.animal.summary}</p>
      <div>
        <div class="share-card-meta">
          <strong>动物代码 ${result.code}</strong>
          <span>${result.stateLabel} · ${result.confidenceText}</span>
        </div>
        <div class="share-card-note">24 题真实生活量表，仅供娱乐与自我探索。</div>
      </div>
    </div>
  `;
}

function renderResult(result) {
  const animal = result.animal;
  document.documentElement.style.setProperty("--badge-bg", animal.color);

  $("#resultAnimalCard").style.setProperty("--badge-bg", animal.color);
  $("#resultAnimalCard").innerHTML = `<div class="animal-badge">${animalIcon(animal)}</div>`;
  $("#resultName").textContent = result.fullName;
  $("#resultSummary").textContent = animal.summary;
  $("#matchPercent").textContent = `动物代码：${result.code}`;
  $("#secondaryAnimal").textContent = `昵称：${result.nickname}`;
  $("#confidenceText").textContent = `置信度：${result.confidence === "high" ? "高" : result.confidence === "medium" ? "中" : "低"}`;
  $("#keywordTags").innerHTML = animal.keywords.map((tag) => `<span>${tag}</span>`).join("");

  $("#scoreList").innerHTML = DIMENSIONS.map((dimension) => {
    const score = result.scores[dimension.key];
    const displayLetter = result.letters[dimension.key];
    const label = result.dimensionLabels[dimension.key];
    const scoreText =
      dimension.key === "state" && score < 50
        ? `敏感指数 ${100 - score}`
        : dimension.key === "state"
          ? `稳定指数 ${score}`
          : `${score}`;
    return `
      <div class="score-row">
        <div class="score-top">
          <span>${dimension.name}：${label}</span>
          <span>${displayLetter} · ${scoreText}</span>
        </div>
        <div class="score-bar"><span style="--score:${score}%"></span></div>
        <small>${dimension.note}</small>
      </div>
    `;
  }).join("");

  const manualItems = [
    ["你的核心气质", animal.description],
    ["你的优势", animal.strength],
    ["你的关系模式", animal.relation],
    ["你的工作模式", animal.work],
    ["你的压力状态", animal.stress],
    ["你的成长建议", animal.growth],
    ["你的盲区", animal.blindspot],
  ];

  $("#manualList").innerHTML = manualItems
    .map(([label, value]) => `<div class="manual-item"><strong>${label}</strong><span>${value}</span></div>`)
    .join("");

  const middleNotice =
    result.middleDimensions.length >= 2
      ? `<div class="compat-item"><strong>中间型提示</strong><span>你的多个维度接近中间值，说明你不是固定使用某一种策略，而是会根据场景切换。你的动物塑代表你当前最接近的整体倾向。</span></div>`
      : "";

  $("#compatList").innerHTML = `
    <div class="compat-item"><strong>状态版本</strong><span>${result.stateName}：${result.stateDescription}</span></div>
    <div class="compat-item"><strong>结果置信度</strong><span>${result.confidenceText}</span></div>
    ${middleNotice}
    <div class="compat-item"><strong>代码解释</strong><span>${result.code}：${result.dimensionLabels.energy} × ${result.dimensionLabels.information} × ${result.dimensionLabels.decision} × ${result.dimensionLabels.lifestyle} × ${result.stateLabel}</span></div>
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

function drawFallbackBadge(ctx, animal, x, y, size) {
  ctx.fillStyle = "#fffaf0";
  drawRoundedRect(ctx, x, y, size, size, 34);
  ctx.fill();
  ctx.fillStyle = animal.color;
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size * 0.32, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1d2830";
  ctx.font = '800 52px "PingFang SC", system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(animal.name.slice(0, 1), x + size / 2, y + size / 2 + 2);
  ctx.textBaseline = "alphabetic";
}

function drawAnimalSpriteCanvasIcon(ctx, animal, x, y, size) {
  if (!animalSpriteImage || !animalSpriteImage.complete || !animalSpriteImage.naturalWidth) return false;

  const [column, row] = SPRITE_POSITIONS[animal.id] || [0, 0];
  const tileWidth = animalSpriteImage.naturalWidth / 3;
  const tileHeight = animalSpriteImage.naturalHeight / 4;
  const sourceX = column * tileWidth;
  const sourceY = row * tileHeight;

  ctx.save();
  drawRoundedRect(ctx, x, y, size, size, 34);
  ctx.clip();
  ctx.drawImage(animalSpriteImage, sourceX, sourceY, tileWidth, tileHeight, x, y, size, size);
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
  const animal = result.animal;
  const useSprite = options.useSprite !== false;

  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#fff5db");
  bg.addColorStop(0.54, animal.color);
  bg.addColorStop(1, "#dff1e9");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255,250,240,0.9)";
  drawRoundedRect(ctx, 78, 78, width - 156, height - 156, 28);
  ctx.fill();

  ctx.fillStyle = "#1d2830";
  ctx.font = '800 42px "PingFang SC", system-ui, sans-serif';
  ctx.fillText("动物塑", 122, 160);

  ctx.textAlign = "right";
  ctx.font = '600 25px "PingFang SC", system-ui, sans-serif';
  ctx.fillStyle = "#61707b";
  ctx.fillText(result.nickname, width - 122, 157);
  ctx.textAlign = "left";

  const avatarSize = 292;
  const avatarX = width / 2 - avatarSize / 2;
  const avatarY = 218;
  if (!useSprite || !drawAnimalSpriteCanvasIcon(ctx, animal, avatarX, avatarY, avatarSize)) {
    drawFallbackBadge(ctx, animal, avatarX, avatarY, avatarSize);
  }

  ctx.textAlign = "center";
  ctx.font = '800 58px "PingFang SC", system-ui, sans-serif';
  ctx.fillStyle = "#1d2830";
  ctx.fillText(result.fullName, width / 2, 594);

  ctx.font = '650 31px "PingFang SC", system-ui, sans-serif';
  ctx.fillStyle = "#40505a";
  ctx.fillText(animal.title, width / 2, 640);

  ctx.font = '650 28px "PingFang SC", system-ui, sans-serif';
  animal.keywords.slice(0, 3).forEach((keyword, index) => {
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
  ctx.fillText(`动物代码 ${result.code}`, 128, 1062);
  ctx.fillStyle = "#40505a";
  ctx.font = '600 28px "PingFang SC", system-ui, sans-serif';
  ctx.fillText(`${result.stateName} · ${result.confidence === "high" ? "高置信度" : result.confidence === "medium" ? "中置信度" : "低置信度"}`, 128, 1108);

  ctx.font = '500 23px "PingFang SC", system-ui, sans-serif';
  ctx.fillStyle = "#66737d";
  ctx.fillText("24 题真实生活量表，仅供娱乐与自我探索。", 128, 1150);

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
  const text = `${result.nickname} 的动物塑是「${result.fullName}：${result.animal.title}」，动物代码 ${result.code}。${result.animal.summary}`;
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
  const previewGrid = $("#previewGrid");
  if (!previewGrid) return;
  previewGrid.innerHTML = ANIMALS.map(
    (animal) => `
      <article class="animal-preview" style="--badge-bg:${animal.color}">
        <div class="animal-badge">${animalIcon(animal)}</div>
        <strong>${animal.name}</strong>
        <span>${animal.keywords.slice(0, 3).join(" · ")}</span>
      </article>
    `,
  ).join("");
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

const nicknameInput = $("#nicknameInput");
if (nicknameInput) {
  nicknameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") startQuiz();
  });
}

renderStageIcons();
renderPreview();
restoreProgress();

const savedResult = storageGet(RESULT_KEY);
if (savedResult) {
  try {
    const parsed = JSON.parse(savedResult);
    const animal = ANIMALS.find((item) => item.id === parsed.animal?.id);
    if (!animal || !parsed.scores) {
      storageRemove(RESULT_KEY);
    } else {
      state.lastResult = { ...parsed, animal };
      renderResult(state.lastResult);
    }
  } catch {
    storageRemove(RESULT_KEY);
  }
}
