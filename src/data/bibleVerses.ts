
export interface BibleVerse {
  reference: string;
  text: {
    english: string;
    korean: string;
  };
  topics: string[];
}

export const topics = [
  "Fear",
  "Strength",
  "Guidance",
  "Faith",
  "Hope",
  "Patience",
  "Trust",
  "Peace",
  "Prayer",
  "Love",
  "Forgiveness",
  "Anxiety",
  "Prosperity",
  "Gratitude",
  "Protection",
  "Righteousness",
  "Temptation",
  "Wisdom",
  "Healing",
  "Purpose"
];

export const bibleVerses: BibleVerse[] = [
  {
    reference: "Joshua 1:9",
    text: {
      english: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
      korean: "내가 네게 명령한 것이 아니냐 강하고 담대하라 두려워하지 말며 놀라지 말라 네가 어디로 가든지 네 하나님 여호와가 너와 함께 하느니라."
    },
    topics: ["Fear", "Strength", "Courage"]
  },
  {
    reference: "Psalm 23:4",
    text: {
      english: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
      korean: "내가 사망의 음침한 골짜기로 다닐지라도 해를 두려워하지 않을 것은 주께서 나와 함께 하심이라 주의 지팡이와 막대기가 나를 안위하시나이다."
    },
    topics: ["Fear", "Protection", "Comfort"]
  },
  {
    reference: "Isaiah 41:10",
    text: {
      english: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
      korean: "두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라 내가 너를 굳세게 하리라 참으로 너를 도와 주리라 참으로 나의 의로운 오른손으로 너를 붙들리라."
    },
    topics: ["Fear", "Strength", "Help"]
  },
  {
    reference: "Philippians 4:6-7",
    text: {
      english: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
      korean: "아무것도 염려하지 말고 다만 모든 일에 기도와 간구로, 너희 구할 것을 감사함으로 하나님께 아뢰라. 그리하면 모든 지각에 뛰어난 하나님의 평강이 그리스도 예수 안에서 너희 마음과 생각을 지키시리라."
    },
    topics: ["Anxiety", "Prayer", "Peace"]
  },
  {
    reference: "Matthew 11:28",
    text: {
      english: "Come to me, all you who are weary and burdened, and I will give you rest.",
      korean: "수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라."
    },
    topics: ["Rest", "Peace", "Comfort"]
  },
  {
    reference: "Proverbs 3:5-6",
    text: {
      english: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      korean: "너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라. 너는 범사에 그를 인정하라 그리하면 네 길을 지도하시리라."
    },
    topics: ["Trust", "Guidance", "Wisdom"]
  },
  {
    reference: "Romans 8:28",
    text: {
      english: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      korean: "우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라."
    },
    topics: ["Purpose", "Love", "Faith"]
  },
  {
    reference: "Jeremiah 29:11",
    text: {
      english: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
      korean: "여호와의 말씀이니라 너희를 향한 나의 생각은 내가 아나니 평안이요 재앙이 아니니라 너희에게 미래와 희망을 주는 것이니라."
    },
    topics: ["Hope", "Purpose", "Prosperity"]
  },
  {
    reference: "Philippians 4:13",
    text: {
      english: "I can do all this through him who gives me strength.",
      korean: "내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라."
    },
    topics: ["Strength", "Faith", "Confidence"]
  },
  {
    reference: "Psalm 46:1",
    text: {
      english: "God is our refuge and strength, an ever-present help in trouble.",
      korean: "하나님은 우리의 피난처시요 힘이시니 환난 중에 만날 큰 도움이시라."
    },
    topics: ["Strength", "Protection", "Help"]
  },
  {
    reference: "John 3:16",
    text: {
      english: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      korean: "하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라."
    },
    topics: ["Love", "Faith", "Salvation"]
  },
  {
    reference: "Romans 5:8",
    text: {
      english: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
      korean: "우리가 아직 죄인 되었을 때에 그리스도께서 우리를 위하여 죽으심으로 하나님께서 우리에 대한 자기의 사랑을 확증하셨느니라."
    },
    topics: ["Love", "Forgiveness", "Grace"]
  },
  {
    reference: "1 Corinthians 13:4-7",
    text: {
      english: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.",
      korean: "사랑은 오래 참고 사랑은 온유하며 시기하지 아니하며 사랑은 자랑하지 아니하며 교만하지 아니하며 무례히 행하지 아니하며 자기의 유익을 구하지 아니하며 성내지 아니하며 악한 것을 생각하지 아니하며 불의를 기뻐하지 아니하며 진리와 함께 기뻐하고 모든 것을 참으며 모든 것을 믿으며 모든 것을 바라며 모든 것을 견디느니라."
    },
    topics: ["Love", "Patience", "Kindness"]
  },
  {
    reference: "Psalm 119:105",
    text: {
      english: "Your word is a lamp for my feet, a light on my path.",
      korean: "주의 말씀은 내 발에 등이요 내 길에 빛이니이다."
    },
    topics: ["Guidance", "Faith", "Wisdom"]
  },
  {
    reference: "Proverbs 4:23",
    text: {
      english: "Above all else, guard your heart, for everything you do flows from it.",
      korean: "모든 지킬 만한 것 중에 더욱 네 마음을 지키라 생명의 근원이 이에서 남이니라."
    },
    topics: ["Wisdom", "Protection", "Guidance"]
  },
  {
    reference: "James 1:5",
    text: {
      english: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.",
      korean: "너희 중에 누구든지 지혜가 부족하거든 모든 사람에게 후히 주시고 꾸짖지 아니하시는 하나님께 구하라 그리하면 주시리라."
    },
    topics: ["Wisdom", "Prayer", "Faith"]
  },
  {
    reference: "Psalm 91:1-2",
    text: {
      english: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the LORD, 'He is my refuge and my fortress, my God, in whom I trust.'",
      korean: "지존자의 은밀한 곳에 거주하는 자는 전능자의 그늘 아래에 살리로다. 내가 여호와를 향하여 말하기를 그는 나의 피난처요 나의 요새요 내가 의뢰하는 하나님이라 하리니."
    },
    topics: ["Protection", "Trust", "Faith"]
  },
  {
    reference: "Isaiah 40:31",
    text: {
      english: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
      korean: "오직 여호와를 앙망하는 자는 새 힘을 얻으리니 독수리가 날개치며 올라감 같을 것이요 달음박질하여도 곤비하지 아니하겠고 걸어가도 피곤하지 아니하리로다."
    },
    topics: ["Strength", "Hope", "Faith"]
  },
  {
    reference: "Matthew 6:33",
    text: {
      english: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
      korean: "그런즉 너희는 먼저 그의 나라와 그의 의를 구하라 그리하면 이 모든 것을 너희에게 더하시리라."
    },
    topics: ["Faith", "Righteousness", "Prosperity"]
  },
  {
    reference: "Philippians 3:13-14",
    text: {
      english: "Brothers and sisters, I do not consider myself yet to have taken hold of it. But one thing I do: Forgetting what is behind and straining toward what is ahead, I press on toward the goal to win the prize for which God has called me heavenward in Christ Jesus.",
      korean: "형제들아 나는 아직 내가 잡은 줄로 여기지 아니하고 오직 한 일 즉 뒤에 있는 것은 잊어버리고 앞에 있는 것을 잡으려고 푯대를 향하여 그리스도 예수 안에서 하나님이 위에서 부르신 부름의 상을 위하여 달려가노라."
    },
    topics: ["Purpose", "Perseverance", "Hope"]
  },
  {
    reference: "Psalm 37:4",
    text: {
      english: "Take delight in the LORD, and he will give you the desires of your heart.",
      korean: "또 여호와를 기뻐하라 그가 네 마음의 소원을 네게 이루어 주시리로다."
    },
    topics: ["Faith", "Joy", "Prosperity"]
  },
  {
    reference: "Romans 12:2",
    text: {
      english: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is—his good, pleasing and perfect will.",
      korean: "너희는 이 세대를 본받지 말고 오직 마음을 새롭게 함으로 변화를 받아 하나님의 선하시고 기뻐하시고 온전하신 뜻이 무엇인지 분별하도록 하라."
    },
    topics: ["Wisdom", "Purpose", "Transformation"]
  },
  {
    reference: "2 Corinthians 5:17",
    text: {
      english: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
      korean: "그런즉 누구든지 그리스도 안에 있으면 새로운 피조물이라 이전 것은 지나갔으니 보라 새 것이 되었도다."
    },
    topics: ["Faith", "Transformation", "Hope"]
  },
  {
    reference: "Galatians 5:22-23",
    text: {
      english: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.",
      korean: "오직 성령의 열매는 사랑과 희락과 화평과 오래 참음과 자비와 양선과 충성과 온유와 절제니 이같은 것을 금지할 법이 없느니라."
    },
    topics: ["Love", "Joy", "Peace", "Patience"]
  },
  {
    reference: "James 1:2-4",
    text: {
      english: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance. Let perseverance finish its work so that you may be mature and complete, not lacking anything.",
      korean: "내 형제들아 너희가 여러 가지 시험을 만나거든 온전히 기쁘게 여기라 이는 너희 믿음의 시련이 인내를 만들어 내는 줄 너희가 앎이라 인내를 온전히 이루라 이는 너희로 온전하고 구비하여 조금도 부족함이 없게 하려 함이라."
    },
    topics: ["Joy", "Trials", "Perseverance"]
  },
  {
    reference: "Psalm 139:14",
    text: {
      english: "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
      korean: "내가 주께 감사하옴은 나를 지으심이 심히 기묘하심이라 주께서 하시는 일이 기이함을 내 영혼이 잘 아나이다."
    },
    topics: ["Gratitude", "Worth", "Creation"]
  },
  {
    reference: "Hebrews 11:1",
    text: {
      english: "Now faith is confidence in what we hope for and assurance about what we do not see.",
      korean: "믿음은 바라는 것들의 실상이요 보이지 않는 것들의 증거니."
    },
    topics: ["Faith", "Hope", "Confidence"]
  },
  {
    reference: "1 Peter 5:7",
    text: {
      english: "Cast all your anxiety on him because he cares for you.",
      korean: "너희 염려를 다 주께 맡기라 이는 그가 너희를 돌보심이라."
    },
    topics: ["Anxiety", "Trust", "Care"]
  },
  {
    reference: "Matthew 7:7",
    text: {
      english: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.",
      korean: "구하라 그리하면 너희에게 주실 것이요 찾으라 그리하면 찾아낼 것이요 문을 두드리라 그리하면 너희에게 열릴 것이니."
    },
    topics: ["Prayer", "Faith", "Guidance"]
  },
  {
    reference: "Colossians 3:15",
    text: {
      english: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful.",
      korean: "그리스도의 평강이 너희 마음을 주장하게 하라 너희는 평강을 위하여 한 몸으로 부르심을 받았나니 너희는 또한 감사하는 자가 되라."
    },
    topics: ["Peace", "Gratitude", "Unity"]
  },
  {
    reference: "Philippians 3:13",
    text: {
      english: "Forgetting what is behind and straining toward what is ahead,",
      korean: "형제들아 나는 아직 내가 잡은 줄로 여기지 아니하고 오직 한 일 즉 뒤에 있는 것은 잊어버리고 앞에 있는 것을 잡으려고."
    },
    topics: ["Purpose", "Focus", "Future"]
  }
];

export const gradients = [
  "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
  "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)",
  "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)",
  "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)",
  "linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)",
  "linear-gradient(90deg, hsla(29, 92%, 70%, 1) 0%, hsla(0, 87%, 73%, 1) 100%)",
  "linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)",
  "linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)",
  "linear-gradient(90deg, hsla(22, 100%, 78%, 1) 0%, hsla(2, 78%, 62%, 1) 100%)",
  "linear-gradient(90deg, hsla(46, 73%, 75%, 1) 0%, hsla(176, 73%, 88%, 1) 100%)",
  "linear-gradient(to top, #e6b980 0%, #eacda3 100%)",
  "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)"
];
