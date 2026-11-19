const content = {
  stories: [
    {
      id: "sarah",
      category: "cases",
      image: "memorial",
      title: ["The Walk Home — Sarah Everard", "回家路上——莎拉·埃弗拉德"],
      subtitle: ["Sarah Everard · Public court record", "莎拉·埃弗拉德 · 公开司法记录"],
      location: ["Clapham, London", "伦敦克拉珀姆"],
      date: ["3 March 2021", "2021 年 3 月 3 日"],
      paragraphs: [
        ["Sarah Everard, 33, worked in marketing. On 3 March 2021, she was walking home after visiting a friend when she was abducted near Clapham Common by a serving Metropolitan Police officer. He later pleaded guilty to kidnapping, rape and murder.", "莎拉·埃弗拉德时年 33 岁，从事市场营销工作。2021 年 3 月 3 日，她探访朋友后步行回家，在克拉珀姆公地附近被一名在职伦敦警察绑架。此人后来承认绑架、强奸和谋杀罪。"],
        ["The sentencing remarks describe how the officer misused his position and address the damage to public trust. The court imposed a whole-life order.", "量刑陈词指出，被告滥用了警察身份，也损害了公众对警察的信任。法院判处其终身监禁，不得假释。"],
      ],
      insight: ["What happens to the freedom to travel when an institution people are expected to trust becomes a source of harm?", "当人们原本应当信赖的公共机构成为伤害的来源，出行自由会受到怎样的影响？"],
      source: {
        label: ["Court sentencing remarks · PDF", "法院量刑陈词 · PDF"],
        url: "https://www.judiciary.uk/wp-content/uploads/2021/09/Wayne-Couzens-Sentencing-Remarks.pdf",
      },
    },
    {
      id: "sabina",
      category: "cases",
      image: "memorial",
      title: ["The Journey That Never Ended — Sabina Nessa", "未走完的旅程——萨比娜·内萨"],
      subtitle: ["Sabina Nessa · Public court record", "萨比娜·内萨 · 公开司法记录"],
      location: ["Kidbrooke, London", "伦敦基德布鲁克"],
      date: ["17 September 2021", "2021 年 9 月 17 日"],
      paragraphs: [
        ["Sabina Nessa was a 28-year-old primary school teacher. On 17 September 2021, she was walking through Cator Park in Kidbrooke to meet a friend when she was murdered.", "萨比娜·内萨是一名 28 岁的小学教师。2021 年 9 月 17 日，她步行穿过基德布鲁克的卡托公园去见朋友，途中遇害。"],
        ["The offender pleaded guilty to murder and received a life sentence with a minimum term of 36 years. The sentencing remarks also record what her loss meant to her family, school and pupils.", "被告承认谋杀罪，被判处终身监禁，最低服刑期为 36 年。量刑陈词也记录了她的离世给家人、学校和学生带来的影响。"],
      ],
      insight: ["How can an archive remember a person’s life and still confront the conditions that shape who feels able to use public space?", "档案如何在纪念一个人生命的同时，追问哪些条件影响着不同的人使用公共空间？"],
      source: {
        label: ["Court sentencing remarks · PDF", "法院量刑陈词 · PDF"],
        url: "https://www.judiciary.uk/wp-content/uploads/2022/07/R-v-Koci-Selmaj-sentencing-remarks-080422.pdf",
      },
    },
    {
      id: "vigilance",
      category: "voices",
      image: "street",
      title: ["Everyday Vigilance", "日常警觉"],
      subtitle: ["Small decisions that add up after dark", "入夜后不断累积的小决定"],
      location: ["An imagined London street", "虚构的伦敦街道"],
      date: ["Fictional vignette", "虚构片段"],
      paragraphs: [
        ["At the end of a late shift, a walker has two ways home. The shortcut is quiet. The longer street has bus stops and shopfronts, some still lit. She chooses the longer one and sees her arrival time move back again.", "下晚班后，一位行人有两条路可以回家。近路很安静，远路上有公交站，也有几家商铺还亮着灯。她走了远路，预计到家时间又推迟了几分钟。"],
        ["A map records the extra minutes. The decisions behind those minutes are harder to see. The quotations here are fictional scenarios written for the prototype.", "地图能记下多走的几分钟，却很难呈现背后的反复权衡。本页引语均为原型创作的虚构情境。"],
      ],
      insight: ["How would a route planner change if it could account for the effort of staying alert?", "如果路线规划能体现保持警觉所耗费的精力，它会怎样改变？"],
    },
    {
      id: "unlit",
      category: "field",
      image: "unlit",
      title: ["The Unlit Street", "缺少照明的街道"],
      subtitle: ["An example field note about visibility", "关于视野的示例观察笔记"],
      location: ["Illustrative map · C2", "示意地图 · C2"],
      date: ["Sample observation", "示例观察"],
      paragraphs: [
        ["In this demonstration note, the light at a busy junction drops away as the path turns a corner. Signs that are easy to read at the junction become difficult to make out a few metres further on.", "在这则演示笔记里，小路拐过街角后，热闹路口的灯光逐渐消失。刚才还能看清的路牌，走出几米就难以辨认。"],
        ["A field note can describe when and where conditions change. Observations from other times and walkers would be needed to understand how the street is experienced more broadly.", "实地笔记可以记录条件在何时何地发生变化。要理解更多人在这条街上的体验，还需要收集不同时段和不同步行者的观察。"],
      ],
      insight: ["Which features would you record if you were mapping how easy it is to see and be seen?", "如果要记录一条路上「看见」和「被看见」的条件，你会观察哪些要素？"],
    },
    {
      id: "waiting",
      category: "voices",
      image: "waiting",
      title: ["Someone Is Waiting", "有人在等"],
      subtitle: ["Care and connection on the way home", "回家路上的关心与联系"],
      location: ["An imagined home", "虚构的家中场景"],
      date: ["Fictional vignette", "虚构片段"],
      paragraphs: [
        ["From a lit kitchen window, a friend watches the last bus go by. A short message arrives a minute later. “I’m nearly home.” She leaves the kettle on for two.", "一位朋友从亮着灯的厨房窗口看着末班车驶过。一分钟后，一条短消息到了：「我快到家了。」她把水烧上，准备泡两杯茶。"],
        ["The person making the journey chooses whether and when to check in. The interaction below lets you try those choices locally.", "是否报平安、何时报平安，由走在路上的人决定。你可以在下方体验这些选择。"],
      ],
      insight: ["What would a check-in tool look like if the person travelling could set every boundary?", "如果所有分享边界都由出行者自己设定，报平安工具会是什么样？"],
    },
    {
      id: "detour",
      category: "field",
      image: "street",
      title: ["Five More Minutes", "多走五分钟"],
      subtitle: ["A comparison of two sample routes", "两条示例路线的比较"],
      location: ["Illustrative map · C1–C4", "示意地图 · C1–C4"],
      date: ["Sample observation", "示例观察"],
      paragraphs: [
        ["One sample route follows a narrow side street. The other passes a late-opening shop and a bus stop before looping back to the same destination. Their walking times are different, and so are the possibilities along the way.", "一条示例路线穿过狭窄的支路，另一条途经营业到很晚的商铺和公交站，最后回到同一个终点。两条路用时不同，途中可做的选择也不同。"],
        ["Comparing the routes shows how a single priority such as travel time can hide other aspects of a journey. The options on this map use illustrative times and conditions.", "对照路线能看出，只关注用时会遮住出行体验的其他部分。地图上的路线用时和环境条件均为演示设定。"],
      ],
      insight: ["When a route is labelled optimal, whose priorities determine what that means?", "当一条路线被标为最优时，谁的需求决定了「最优」的含义？"],
    },
  ],
  voices: [
    {
      quote: ["I take the longer way after my shift. I can see the bus stop from the shop, and someone is usually still there.", "下班后我会绕远一点。从那家店能看见公交站，站上通常还有人。"],
      note: ["Fictional vignette · After a late shift", "虚构情境 · 晚班之后"],
    },
    {
      quote: ["At the corner I put my phone away. The pavement is uneven, and I want to see who’s coming the other way.", "走到街角我就把手机收起来。人行道不平，我也想看清迎面走来的人。"],
      note: ["Fictional vignette · Turning onto a quiet street", "虚构情境 · 拐进安静的街道"],
    },
    {
      quote: ["Sometimes my friend meets me at the stop. Other nights we just send a quick message when we get home.", "有时朋友会来车站接我。其他时候，我们到家后就互发一条简短的消息。"],
      note: ["Fictional vignette · Checking in", "虚构情境 · 互报平安"],
    },
  ],
  glossary: [
    {
      term: ["Feminist HCI", "女性主义人机交互"],
      summary: ["Designing technology with attention to gender, power and different lived experiences.", "在技术设计中关注性别、权力和不同的生活经验。"],
      detail: ["In navigation design, this can mean inviting people with different routines and needs to decide together what a map should show.", "在导航设计中，这可以体现为邀请作息和需求不同的人，共同决定地图应该呈现哪些信息。"],
    },
    {
      term: ["Critical Design", "批判性设计"],
      summary: ["Using a design proposal to question assumptions that often go unnoticed.", "用设计提案追问平时容易被忽略的假设。"],
      detail: ["NightWalk turns a familiar navigation interface into a prompt to examine what gets counted as a good route.", "NightWalk 借熟悉的导航界面提出一个问题：什么样的路线会被系统视为好路线？"],
    },
    {
      term: ["Data Feminism", "数据女性主义"],
      summary: ["Looking at who has power over how data is collected, interpreted and used.", "审视谁掌握数据收集、解读和使用的权力。"],
      detail: ["An incident map depends on whose experiences make it into the records and how those records are classified. Missing data deserve attention too.", "事件地图取决于谁的经历被纳入记录，以及记录如何分类。未被记录的经历也值得关注。"],
    },
    {
      term: ["Ethics of Care", "关怀伦理"],
      summary: ["An approach that takes relationships, needs and responsibilities seriously.", "重视人与人的关系、彼此的需要和承担的责任。"],
      detail: ["For an optional check-in, this means making it easy to ask for support while keeping the person making the journey in control of what they share.", "在可选的报平安功能里，这意味着让求助更容易，同时由出行者掌控分享的内容。"],
    },
  ],
};
