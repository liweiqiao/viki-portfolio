/**
 * 站点内容源 —— 全站文案集中在这里
 * 想改文字只需要动这一个文件，不用碰组件。
 *
 * 资料依据：《我的作品/李伟桥-个人简历2026V1.1.pdf》
 * 二维码来源：简历第 2 页「作品展示」区的前两个码（互联网文案 / 政府项目文案）
 */

import qrInternet from '../assets/works/qr-internet.png'
import qrGovernment from '../assets/works/qr-government.png'

export const site = {
  brand: {
    monogram: '字',
    name: '李伟桥的写字台',
    shortName: '写字台'
  },

  nav: [
    { label: '关于我', href: '#about' },
    { label: '作品', href: '#works' },
    { label: '能帮上什么', href: '#services' },
    { label: '联系', href: '#contact' }
  ],

  hero: {
    eyebrow: '文案 · 脚本 · 视频剪辑',
    // 标题拆成两行，第二行做荧光笔涂抹
    headlineTop: '写了十年文案',
    headlineHighlight: '还在写',
    lede: '汉语言文学科班出身，做内容十年。给品牌写过双微，给政府写过汇报材料和宣传片脚本，剪辑和平面也能自己上手。你把要说的交给我，我负责把它写成有人愿意读完的样子。',
    primaryCta: { label: '看看作品', href: '#works' },
    secondaryCta: { label: '聊聊合作', href: '#contact' },
    reassure: '长期接受文案、脚本与内容策划合作',
    platformsLabel: '做过这些',
    platforms: ['品牌双微', '政务宣导', '宣传片脚本', '新媒体运营']
  },

  about: {
    eyebrow: '关于我',
    title: '写字这件事，\n我干了十年',
    paragraphs: [
      '我叫李伟桥，湘潭大学汉语言文学专业，做内容十年了。',
      '前几年在品牌和平台那边：给绿箭、益达、高露洁、美赞臣、佳能这些牌子写双微，也在「广州潮生活 V」做编辑，看着它从 50 万粉丝长到 110 万。',
      '后来转到政务和公益方向：为政府及事业单位做全案宣导，写汇报材料、品牌手册、海报文案，也写领导讲话稿、主持稿和宣传片脚本。有几篇新闻稿被学习强国、党媒等平台收录，单篇最高阅读量 82 万。',
      '中间还做过一段自由撰稿，给广告公司供双微文案，帮情感号做来信整理和原创润色。写字之外，我会剪片、能改图、做 H5，这两年也把 AI 工具用进了日常工作流。'
    ],
    tags: ['品牌双微', '政务宣导', '宣传片脚本', '新媒体运营', '视频剪辑', 'AIGC 应用'],
    // 两张便签卡：颜色由 DESIGN.md 的糖果色承担，一排不并排第三张
    notes: [
      {
        tone: 'mint',
        title: '我在意的',
        items: ['少用行话和套话', '文案要对结果负责', '交稿时间和质量一样重要']
      },
      {
        tone: 'teal',
        title: '我在做的',
        items: ['品牌与政务双线文案', '宣传片脚本与后期剪辑', '用 AI 工具给自己提效']
      }
    ],
    stats: [
      { value: '10', label: '年内容创作经验' },
      { value: '110万', label: '头部大号编辑经历' },
      { value: '82万', label: '单篇最高阅读量' }
    ]
  },

  works: {
    eyebrow: '作品',
    title: '两个作品集，和一些片子',
    lede: '两个二维码是整理好的完整作品集，扫码或者点开都能看。视频作品还在整理，位置先留出来。',

    // 二维码作品集 —— 数据齐了直接改这里就行
    collections: [
      {
        id: 'c1',
        label: '互联网文案作品集',
        meta: '品牌双微 · 话题创意 · 商业文案',
        desc: '品牌双微日常文案、话题创意与商业推广稿。服务过瑞士美度表、东芝、佳能、绿箭、高露洁、美赞臣等品牌。',
        tags: ['双微文案', '话题创意', '商业推广'],
        qr: qrInternet,
        href: 'https://v.xiumius.cn/board/v5/3Pchj/231423583'
      },
      {
        id: 'c2',
        label: '政府项目文案作品集',
        meta: '政务宣导 · 汇报材料 · 宣传片脚本',
        desc: '政府及事业单位全案宣导：汇报材料、品牌手册、海报文案、新闻稿与宣传片脚本，多篇新闻稿被学习强国、党媒平台收录。',
        tags: ['汇报材料', '新闻稿', '宣传片脚本'],
        qr: qrGovernment,
        href: 'https://qr61.cn/onT7cz/qwmafO4'
      }
    ],

    // 视频作品预留位：拿到片子后给对应 slot 填上 src（mp4 链接或本地文件）即可自动换成播放器
    videos: {
      eyebrow: '视频作品',
      title: '视频剪辑作品',
      note: '这一块还在整理，先留三个位置，陆续补上。',
      slots: [
        { id: 'v1', label: '视频作品 01', hint: '宣传片 / 活动片剪辑', src: '', poster: '' },
        { id: 'v2', label: '视频作品 02', hint: '短视频脚本与成片', src: '', poster: '' },
        { id: 'v3', label: '视频作品 03', hint: '口播文案与剪辑', src: '', poster: '' }
      ]
    }
  },

  services: {
    eyebrow: '能帮上什么',
    title: '这三件事，我做了十年',
    lede: '品牌、政务、新媒体三个方向的内容需求，都可以直接找我。',
    // 三张便签卡，颜色各不相同且彼此留出奶油色间隔
    items: [
      {
        tone: 'mint',
        index: '01',
        title: '品牌与新媒体文案',
        desc: '双微日常运营、话题创意、商业推广稿与产品文案，做过快消、母婴、服装多个品类。',
        points: ['双微运营', '话题创意', '商业稿件']
      },
      {
        tone: 'teal',
        index: '02',
        title: '政务与公益宣导',
        desc: '汇报材料、品牌手册、海报文案、新闻稿与讲话稿撰写，熟悉公文的语气分寸与合规边界。',
        points: ['汇报材料', '新闻稿', '讲话稿']
      },
      {
        tone: 'blush',
        index: '03',
        title: '脚本与视觉落地',
        desc: '宣传片脚本、分镜与后期剪辑，平面物料设计与 AI 出图提效，一个人也能跟完全程。',
        points: ['视频脚本', '剪辑成片', '平面设计']
      }
    ]
  },

  contact: {
    eyebrow: '联系',
    title: '有话想聊，\n随时写信',
    lede: '品牌文案、政务宣导、视频脚本都可以聊。写得具体一点，我回得也会具体一点。',
    email: 'aaaaa@qq.com',
    wechatLabel: '微信', // TODO 换成真实微信号
    wechat: 'your-wechat-id',
    primaryCta: { label: '写封邮件', href: 'mailto:aaaaa@qq.com' },
    secondaryCta: { label: '回到顶部', href: '#top' }
  },

  footer: {
    note: '个人作品集，内容均为原创。',
    meta: '© 2026 李伟桥'
  }
}
