/**
 * 站点内容源 —— 全站文案集中在这里
 * 想改文字只需要动这一个文件，不用碰组件。
 * 带 TODO 标记的地方是我用占位信息填的，请替换成真实内容。
 */

export const site = {
  brand: {
    monogram: '想',
    name: '妈妈还在想这件事',
    shortName: '还在想'
  },

  nav: [
    { label: '关于我', href: '#about' },
    { label: '作品', href: '#works' },
    { label: '能帮上什么', href: '#services' },
    { label: '联系', href: '#contact' }
  ],

  hero: {
    eyebrow: '内容创作者 · 亲子与女性议题',
    // 标题拆成两行，第二行做荧光笔涂抹
    headlineTop: '妈妈还在想',
    headlineHighlight: '这件事',
    lede: '写社会新闻里被忽略的女性视角，也写育儿那些不太好说出口的时刻。不提供标准答案，只把我真实想过的，摊开来说。',
    primaryCta: { label: '看看我写了什么', href: '#works' },
    secondaryCta: { label: '聊聊合作', href: '#contact' },
    reassure: '长期接受选题共创与品牌内容合作',
    platformsLabel: '发布平台',
    platforms: ['微信公众号', '小红书', '视频号', '社群']
  },

  about: {
    eyebrow: '关于我',
    title: '先是个妈妈，\n然后才是写作者',
    paragraphs: [
      '我叫 Viki，两个孩子的妈妈，现在住在广东清远。',
      '我是我们村第一个考上大学的人。先读书，再离乡，一路靠自己拼出今天的生活——这件事塑造了我看世界的方式，也决定了我写东西的立场。',
      '离开学校快十年了。公众号「妈妈还在想这件事」是在这里长出来的：写社会新闻里那些常被跳过的细节，也写育儿中那些不太方便说出口的部分——辅导作业时的失控、跟孩子道歉的别扭、看到别人家孩子时一闪而过的比较心。',
      '我不打算给你标准答案。我只是一直在想，然后把想明白的和没想明白的，都写下来。'
    ],
    tags: ['亲子沟通', '女性处境', '教育选择', '青少年心理', '社会热点'],
    // 两张便签卡：颜色由 DESIGN.md 的糖果色承担，一排不并排第三张
    notes: [
      {
        tone: 'mint',
        title: '我在意的',
        items: ['说教味越少越好', '把抽象的立场落回具体场景', '对读者保持平视']
      },
      {
        tone: 'teal',
        title: '我在做的',
        items: ['公众号长文每周更新', '长文改编成小红书图文卡片', '公益项目宣推与视频脚本']
      }
    ],
    stats: [
      { value: '2', label: '个孩子' },
      { value: '3', label: '个内容平台' },
      { value: '∞', label: '还在想' }
    ]
  },

  works: {
    eyebrow: '作品',
    title: '写过的东西',
    lede: '按平台和类型分了几类。点标签筛选，也可以直接往下看。',
    filters: [
      { key: 'all', label: '全部' },
      { key: 'wechat', label: '公众号长文' },
      { key: 'xhs', label: '小红书图文' },
      { key: 'public', label: '公益宣推' },
      { key: 'plan', label: '策划方案' }
    ],
    items: [
      {
        id: 'w1',
        category: 'wechat',
        platform: '公众号',
        type: '长文 · 教育观',
        topic: '寒门与底气',
        title: '普通家庭怎么给孩子兜底',
        desc: '借北大寒门女孩与数学家的两条人生路径，聊普通家庭真正能给的到底是资源，还是底气。',
        tone: 'cream'
      },
      {
        id: 'w2',
        category: 'wechat',
        platform: '公众号',
        type: '长文 · 亲子反思',
        topic: '诚实与身教',
        title: '教了孩子要诚实，我自己先翻车了',
        desc: '从一条社会热点里看见自己的双标：要求孩子诚实的那套话，我自己并没有做到。',
        tone: 'cream'
      },
      {
        id: 'w3',
        category: 'wechat',
        platform: '公众号',
        type: '长文 · 政策观察',
        topic: '育儿补贴',
        title: '国家给我转了 3600 块',
        desc: '老大出生时没有补贴，老二赶上政策。同一件事落在两个孩子身上的不同版本。',
        tone: 'cream'
      },
      {
        id: 'w4',
        category: 'wechat',
        platform: '公众号',
        type: '长文 · 社会热点',
        topic: '公共事件中的愤怒',
        title: '手术刀与炸弹',
        desc: '公共事件里，愤怒是一种资源。把它用在哪儿，决定了我们最后能改变什么。',
        tone: 'cream'
      },
      {
        id: 'w5',
        category: 'xhs',
        platform: '小红书',
        type: '图文卡片 · 1080×1440',
        topic: '长文改编',
        title: '公众号长文 → 小红书卡片',
        desc: '把 1600 字长文拆成封面加正文卡片组，封面主标题居中、正文长句居左，标题另起角度。',
        tone: 'cream'
      },
      {
        id: 'w6',
        category: 'xhs',
        platform: '小红书',
        type: '账号运营',
        topic: '银发议题',
        title: '银发 Lab',
        desc: '面向中老年生活方式的独立账号，从选题到视觉规范独立搭建与运营。',
        tone: 'cream'
      },
      {
        id: 'w7',
        category: 'public',
        platform: '公益项目',
        type: '招募宣推 · 视频脚本',
        topic: '青少年心理',
        title: '满天星心理服务志愿者招募',
        desc: '招募文案与 1–2 分钟招募视频脚本，串联「每颗星，都有自己的故事」的整体语气。',
        tone: 'cream'
      },
      {
        id: 'w8',
        category: 'public',
        platform: '公益项目',
        type: '推文 + 视频脚本',
        topic: '青少年心理',
        title: '恰同学少年 · 乐学安心运动团体',
        desc: '为 8 周 40 场的运动团体活动撰写系列推文与视频脚本，记录孩子的变化。',
        tone: 'cream'
      },
      {
        id: 'w9',
        category: 'plan',
        platform: '活动策划',
        type: '方案',
        topic: '青少年成长',
        title: '2026 清城少年志 活动方案',
        desc: '基于上一届复盘重新设计流程与志愿者分工，把踩过的坑写成这一版的检查项。',
        tone: 'cream'
      },
      {
        id: 'w10',
        category: 'plan',
        platform: '新媒体运营',
        type: '运营方案',
        topic: '流量与转化',
        title: '粤心安 2026 流量行动营',
        desc: '面向公益同行的内容增长训练方向整理，从选题到发布的完整链路。',
        tone: 'cream'
      },
      {
        id: 'w11',
        category: 'public',
        platform: '公益项目',
        type: '培训物料',
        topic: '志愿者成长',
        title: '满天星中阶培训 宣推系列',
        desc: '培训访谈系列、宣推文案与视频脚本，统一品牌标语与语气。',
        tone: 'cream'
      },
      {
        id: 'w12',
        category: 'plan',
        platform: '项目策划',
        type: '营会策划',
        topic: '学能提升',
        title: '阳朔学能提升训练营',
        desc: '面向 2026 暑假的营会策划，包含课程结构与带队志愿者培训安排。',
        tone: 'cream'
      }
    ]
  },

  services: {
    eyebrow: '能帮上什么',
    title: '这几件事我做得比较顺',
    lede: '如果你也在做亲子、女性或心理相关的表达，下面这三件事可以直接找我。',
    // 三张便签卡，颜色各不相同且彼此留出奶油色间隔
    items: [
      {
        tone: 'mint',
        index: '01',
        title: '公众号长文撰稿',
        desc: '热点切入 + 亲子/女性视角，控制在 1600 字以内的可读完篇幅。擅长把抽象立场落回具体场景。',
        points: ['选题共创', '结构打磨', '语气统一']
      },
      {
        tone: 'teal',
        index: '02',
        title: '小红书图文策划',
        desc: '长文改编成 1080×1440 卡片组，封面与正文分开设计，标题与文章标题各起一个角度。',
        points: ['卡片设计', '标题策略', '跨平台改写']
      },
      {
        tone: 'blush',
        index: '03',
        title: '公益项目宣推',
        desc: '招募文案、活动推文、1–2 分钟视频脚本与口播文案，熟悉公益语气的分寸感与合规边界。',
        points: ['招募文案', '视频脚本', '活动推文']
      }
    ]
  },

  contact: {
    eyebrow: '联系',
    title: '有话想聊，\n随时写信',
    lede: '选题合作、内容共创、公益项目宣推都可以。写得具体一点，我回得也会具体一点。',
    email: 'hello@example.com', // TODO 换成真实邮箱
    wechatLabel: '微信', // TODO 换成真实微信号
    wechat: 'your-wechat-id',
    primaryCta: { label: '写封邮件', href: 'mailto:hello@example.com' }, // TODO 同步替换
    secondaryCta: { label: '回到顶部', href: '#top' }
  },

  footer: {
    note: '内容均为原创，转载与合作请联系上述邮箱。',
    meta: '© 2026 妈妈还在想这件事'
  }
}
