export interface BibleVerse {
  reference: string;
  text: {
    english: string;
    korean: string;
    spanish?: string;
    french?: string;
    german?: string;
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
      korean: "내가 네게 명령한 것이 아니냐 강하고 담대하라 두려워하지 말며 놀라지 말라 네가 어디로 가든지 네 하나님 여호와가 너와 함께 하느니라.",
      spanish: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.",
      french: "Ne t'ai-je pas donné cet ordre: Fortifie-toi et prends courage? Ne t'effraie point et ne t'épouvante point, car l'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.",
      german: "Habe ich dir nicht geboten, dass du getrost und unverzagt sein sollst? Lass dir nicht grauen und entsetze dich nicht; denn der HERR, dein Gott, ist mit dir in allem, was du tun wirst."
    },
    topics: ["Fear", "Strength", "Courage"]
  },
  {
    reference: "Psalm 23:4",
    text: {
      english: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
      korean: "내가 사망의 음침한 골짜기로 다닐지라도 해를 두려워하지 않을 것은 주께서 나와 함께 하심이라 주의 지팡이와 막대기가 나를 안위하시나이다.",
      spanish: "Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo; tu vara y tu cayado me infundirán aliento.",
      french: "Quand je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal, car tu es avec moi: ta houlette et ton bâton me rassurent.",
      german: "Und ob ich schon wanderte im finstern Tal, fürchte ich kein Unglück; denn du bist bei mir, dein Stecken und Stab trösten mich."
    },
    topics: ["Fear", "Protection", "Comfort"]
  },
  {
    reference: "Isaiah 41:10",
    text: {
      english: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
      korean: "두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라 내가 너를 굳세게 하리라 참으로 너를 도와 주리라 참으로 나의 의로운 오른손으로 너를 붙들리라.",
      spanish: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.",
      french: "Ne crains rien, car je suis avec toi; ne promène pas des regards inquiets, car je suis ton Dieu; je te fortifie, je viens à ton secours, je te soutiens de ma droite triomphante.",
      german: "Fürchte dich nicht, ich bin mit dir; weiche nicht, denn ich bin dein Gott. Ich stärke dich, ich helfe dir auch, ich halte dich durch die rechte Hand meiner Gerechtigkeit."
    },
    topics: ["Fear", "Strength", "Help"]
  },
  {
    reference: "Philippians 4:6-7",
    text: {
      english: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
      korean: "아무것도 염려하지 말고 다만 모든 일에 기도와 간구로, 너희 구할 것을 감사함으로 하나님께 아뢰라. 그리하면 모든 지각에 뛰어난 하나님의 평강이 그리스도 예수 안에서 너희 마음과 생각을 지키시리라.",
      spanish: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias. Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.",
      french: "Ne vous inquiétez de rien; mais en toute chose, par la prière et la supplication, avec des actions de grâce, faites connaître vos demandes à Dieu. Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs et vos pensées en Jésus-Christ.",
      german: "Sorgt euch um nichts, sondern in allen Dingen lasst durch Gebet und Flehen mit Danksagung eure Anliegen vor Gott kundwerden. Und der Frieden Gottes, der allen Verstand übersteigt, wird eure Herzen und eure Gedanken in Christus Jesus bewahren."
    },
    topics: ["Anxiety", "Prayer", "Peace"]
  },
  {
    reference: "Matthew 11:28",
    text: {
      english: "Come to me, all you who are weary and burdened, and I will give you rest.",
      korean: "수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라.",
      spanish: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.",
      french: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.",
      german: "Kommt her zu mir, alle, die ihr mühselig und beladen seid; ich will euch erquicken."
    },
    topics: ["Rest", "Peace", "Comfort"]
  },
  {
    reference: "Proverbs 3:5-6",
    text: {
      english: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      korean: "너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라. 너는 범사에 그를 인정하라 그리하면 네 길을 지도하시리라.",
      spanish: "Confía en Jehová con todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.",
      french: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse. Reconnaît-le dans toutes tes voies, et il aplanira tes sentiers.",
      german: "Vertraue auf den HERRN von ganzem Herzen und verlasse dich nicht auf deinen Verstand. Erkenne ihn auf allen deinen Wegen, so wird er deine Pfade ebnen."
    },
    topics: ["Trust", "Guidance", "Wisdom"]
  },
  {
    reference: "Romans 8:28",
    text: {
      english: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      korean: "우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라.",
      spanish: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.",
      french: "Nous savons, en effet, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.",
      german: "Wir wissen aber, dass denen, die Gott lieben, alle Dinge zum Besten dienen, denen, die nach seinem Vorsatz berufen sind."
    },
    topics: ["Purpose", "Love", "Faith"]
  },
  {
    reference: "Jeremiah 29:11",
    text: {
      english: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
      korean: "여호와의 말씀이니라 너희를 향한 나의 생각은 내가 아나니 평안이요 재앙이 아니니라 너희에게 미래와 희망을 주는 것이니라.",
      spanish: "Porque yo sé los planes que tengo para ustedes, declara el SEÑOR, planes de bienestar y no de calamidad, para darles un futuro y una esperanza.",
      french: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.",
      german: "Denn ich weiß, was ich für Gedanken über euch habe, spricht der HERR, Gedanken des Friedens und nicht des Unheils, um euch eine Zukunft und eine Hoffnung zu geben."
    },
    topics: ["Hope", "Purpose", "Prosperity"]
  },
  {
    reference: "Philippians 4:13",
    text: {
      english: "I can do all this through him who gives me strength.",
      korean: "내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라.",
      spanish: "Todo lo puedo en Cristo que me fortalece.",
      french: "Je puis tout par celui qui me fortifie.",
      german: "Ich vermag alles durch den, der mich mächtig macht."
    },
    topics: ["Strength", "Faith", "Confidence"]
  },
  {
    reference: "Psalm 46:1",
    text: {
      english: "God is our refuge and strength, an ever-present help in trouble.",
      korean: "하나님은 우리의 피난처시요 힘이시니 환난 중에 만날 큰 도움이시라.",
      spanish: "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.",
      french: "Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse.",
      german: "Gott ist unsere Zuflucht und Stärke, eine Hilfe in den großen Nöten."
    },
    topics: ["Strength", "Protection", "Help"]
  },
  {
    reference: "John 3:16",
    text: {
      english: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      korean: "하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라.",
      spanish: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
      french: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
      german: "Denn so hat Gott die Welt geliebt, dass er seinen eingeborenen Sohn gab, damit jeder, der an ihn glaubt, nicht verloren gehe, sondern das ewige Leben habe."
    },
    topics: ["Love", "Faith", "Salvation"]
  },
  {
    reference: "Romans 5:8",
    text: {
      english: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
      korean: "우리가 아직 죄인 되었을 때에 그리스도께서 우리를 위하여 죽으심으로 하나님께서 우리에 대한 자기의 사랑을 확증하셨느니라.",
      spanish: "Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros.",
      french: "Mais Dieu prouve son amour envers nous, en ce que, lorsque nous étions encore des pécheurs, Christ est mort pour nous.",
      german: "Gott aber beweist seine Liebe zu uns dadurch, dass Christus für uns gestorben ist, als wir noch Sünder waren."
    },
    topics: ["Love", "Forgiveness", "Grace"]
  },
  {
    reference: "1 Corinthians 13:4-7",
    text: {
      english: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.",
      korean: "사랑은 오래 참고 사랑은 온유하며 시기하지 아니하며 사랑은 자랑하지 아니하며 교만하지 아니하며 무례히 행하지 아니하며 자기의 유익을 구하지 아니하며 성내지 아니하며 악한 것을 생각하지 아니하며 불의를 기뻐하지 아니하며 진리와 함께 기뻐하고 모든 것을 참으며 모든 것을 믿으며 모든 것을 바라며 모든 것을 견디느니라.",
      spanish: "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece; no hace nada indebido, no busca lo suyo, no se irrita, no guarda rencor; no se alegra de la injusticia, mas se alegra de la verdad; todo lo sufre, todo lo cree, todo lo espera, todo lo soporta.",
      french: "L'amour est patient, l'amour est plein de bonté; l'amour n'est point envieux; l'amour ne se vante point, ne s'enfle point d'orgueil; il ne fait rien de malhonnête, il ne cherche point son intérêt, il ne s'irrite point, il ne soupçonne point le mal; il ne se réjouit point de l'injustice, mais il se réjouit de la vérité; il excuse tout, il croit tout, il espère tout, il supporte tout.",
      german: "Die Liebe ist langmütig und freundlich; die Liebe neidet nicht; die Liebe prahlt nicht, sie bläht sich nicht auf; sie verhält sich nicht ungebührlich, sie sucht nicht das Ihre, sie lässt sich nicht erbittern, sie rechnet das Böse nicht zu; sie freut sich nicht über die Ungerechtigkeit, sondern freut sich an der Wahrheit; sie erträgt alles, sie glaubt alles, sie hofft alles, sie duldet alles."
    },
    topics: ["Love", "Patience", "Kindness"]
  },
  {
    reference: "Psalm 119:105",
    text: {
      english: "Your word is a lamp for my feet, a light on my path.",
      korean: "주의 말씀은 내 발에 등이요 내 길에 빛이니이다.",
      spanish: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.",
      french: "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.",
      german: "Dein Wort ist eine Leuchte für meinen Fuß und ein Licht auf meinem Weg."
    },
    topics: ["Guidance", "Faith", "Wisdom"]
  },
  {
    reference: "Proverbs 4:23",
    text: {
      english: "Above all else, guard your heart, for everything you do flows from it.",
      korean: "모든 지킬 만한 것 중에 더욱 네 마음을 지키라 생명의 근원이 이에서 남이니라.",
      spanish: "Sobre toda cosa guardada, guarda tu corazón; porque de él mana la vida.",
      french: "Garde ton cœur plus que toute autre chose, car de lui viennent les sources de la vie.",
      german: "Mehr als alles andere behüte dein Herz; denn daraus quillt das Leben."
    },
    topics: ["Wisdom", "Protection", "Guidance"]
  },
  {
    reference: "James 1:5",
    text: {
      english: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.",
      korean: "너희 중에 누구든지 지혜가 부족하거든 모든 사람에게 후히 주시고 꾸짖지 아니하시는 하나님께 구하라 그리하면 주시리라.",
      spanish: "Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche, y le será dada.",
      french: "Si quelqu'un d'entre vous manque de sagesse, qu'il la demande à Dieu, qui donne à tous libéralement et sans reproche, et elle lui sera donnée.",
      german: "Wenn aber jemand von euch Weisheit mangelt, so bitte er Gott, der allen gerne und ohne Vorwurf gibt, und sie wird ihm gegeben werden."
    },
    topics: ["Wisdom", "Prayer", "Faith"]
  },
  {
    reference: "Psalm 91:1-2",
    text: {
      english: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the LORD, 'He is my refuge and my fortress, my God, in whom I trust.'",
      korean: "지존자의 은밀한 곳에 거주하는 자는 전능자의 그늘 아래에 살리로다. 내가 여호와를 향하여 말하기를 그는 나의 피난처요 나의 요새요 내가 의뢰하는 하나님이라 하리니.",
      spanish: "El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente. Diré yo a Jehová: 'Refugio mío y fortaleza mía, mi Dios, en quien confiaré.'",
      french: "Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout-Puissant. Je dis à l'Éternel: 'Mon refuge et ma forteresse, mon Dieu, en qui je me confie.'",
      german: "Wer im geheimen Ort des Höchsten sitzt, der wird wohnen im Schatten des Allmächtigen. Ich sage von dem HERRN: 'Er ist meine Zuflucht und meine Burg, mein Gott, auf den ich hoffe.'"
    },
    topics: ["Protection", "Trust", "Faith"]
  },
  {
    reference: "Isaiah 40:31",
    text: {
      english: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
      korean: "오직 여호와를 앙망하는 자는 새 힘을 얻으리니 독수리가 날개치며 올라감 같을 것이요 달음박질하여도 곤비하지 아니하겠고 걸어가도 피곤하지 아니하리로다.",
      spanish: "Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.",
      french: "Mais ceux qui se confient en l'Éternel renouvellent leur force; ils s'élèvent avec des ailes comme les aigles; ils courent, et ne se fatiguent point; ils marchent, et ne se lassent point.",
      german: "Aber die auf den HERRN harren, erhalten neue Kraft; sie heben die Flügel empor wie die Adler; sie laufen und werden nicht müde; sie gehen und werden nicht matt."
    },
    topics: ["Strength", "Hope", "Faith"]
  },
  {
    reference: "Matthew 6:33",
    text: {
      english: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
      korean: "그런즉 너희는 먼저 그의 나라와 그의 의를 구하라 그리하면 이 모든 것을 너희에게 더하시리라.",
      spanish: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.",
      french: "Mais cherchez d'abord le royaume de Dieu et sa justice, et toutes ces choses vous seront données par-dessus.",
      german: "Trachtet zuerst nach dem Reich Gottes und nach seiner Gerechtigkeit, so wird euch das alles zufallen."
    },
    topics: ["Faith", "Righteousness", "Prosperity"]
  },
  {
    reference: "Philippians 3:13-14",
    text: {
      english: "Brothers and sisters, I do not consider myself yet to have taken hold of it. But one thing I do: Forgetting what is behind and straining toward what is ahead, I press on toward the goal to win the prize for which God has called me heavenward in Christ Jesus.",
      korean: "형제들아 나는 아직 내가 잡은 줄로 여기지 아니하고 오직 한 일 즉 뒤에 있는 것은 잊어버리고 앞에 있는 것을 잡으려고 푯대를 향하여 그리스도 예수 안에서 하나님이 위에서 부르신 부름의 상을 위하여 달려가노라.",
      spanish: "Hermanos, yo mismo no pretendo haberlo ya alcanzado; pero una cosa hago: olvidando lo que queda atrás y extendiéndome a lo que está delante, prosigo a la meta, al premio del supremo llamamiento de Dios en Cristo Jesús.",
      french: "Frères et sœurs, je ne pense pas l'avoir saisi; mais une chose je fais: oubliant ce qui est en arrière et me portant vers ce qui est en avant, je cours vers le but, pour remporter le prix de l'appel céleste de Dieu en Jésus-Christ.",
      german: "Brüder, ich halte mich selbst nicht dafür, dass ich es ergriffen habe; eines aber tue ich: Ich vergesse, was dahinten ist, und strecke mich aus nach dem, was vorne ist, und jage nach dem Ziel, dem Preis der himmlischen Berufung Gottes in Christus Jesus."
    },
    topics: ["Purpose", "Perseverance", "Hope"]
  },
  {
    reference: "Psalm 37:4",
    text: {
      english: "Take delight in the LORD, and he will give you the desires of your heart.",
      korean: "또 여호와를 기뻐하라 그가 네 마음의 소원을 네게 이루어 주시리로다.",
      spanish: "Deléitate a sí mismo en Jehová, y él te concederá las peticiones de tu corazón.",
      french: "Fais de l'Éternel tes délices, et il te donnera ce que ton cœur désire.",
      german: "Habe deine Lust am HERRN, so wird er dir geben, was dein Herz begehrt."
    },
    topics: ["Faith", "Joy", "Prosperity"]
  },
  {
    reference: "Romans 12:2",
    text: {
      english: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is—his good, pleasing and perfect will.",
      korean: "너희는 이 세대를 본받지 말고 오직 마음을 새롭게 함으로 변화를 받아 하나님의 선하시고 기뻐하시고 온전하신 뜻이 무엇인지 분별하도록 하라.",
      spanish: "No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento, para que comprobéis cuál sea la buena voluntad de Dios, agradable y perfecta.",
      french: "Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de votre esprit, afin que vous discerniez quelle est la bonne volonté de Dieu, agréable et parfaite.",
      german: "Und stellt euch nicht dieser Welt gleich, sondern lasst euch verwandeln durch die Erneuerung eures Sinnes, damit ihr prüfen könnt, was der gute und wohlgefällige und vollkommene Wille Gottes ist."
    },
    topics: ["Wisdom", "Purpose", "Transformation"]
  },
  {
    reference: "2 Corinthians 5:17",
    text: {
      english: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
      korean: "그런즉 누구든지 그리스도 안에 있으면 새로운 피조물이라 이전 것은 지나갔으니 보라 새 것이 되었도다.",
      spanish: "De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí, todas son hechas nuevas.",
      french: "Si quelqu'un est en Christ, il est une nouvelle créature. Les choses anciennes sont passées; voici, toutes choses sont devenues nouvelles.",
      german: "Darum, wenn jemand in Christus ist, so ist er eine neue Kreatur; das Alte ist vergangen, siehe, alles ist neu geworden."
    },
    topics: ["Faith", "Transformation", "Hope"]
  },
  {
    reference: "Galatians 5:22-23",
    text: {
      english: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.",
      korean: "오직 성령의 열매는 사랑과 희락과 화평과 오래 참음과 자비와 양선과 충성과 온유와 절제니 이같은 것을 금지할 법이 없느니라.",
      spanish: "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza; contra tales cosas no hay ley.",
      french: "Mais le fruit de l'Esprit est amour, joie, paix, patience, bonté, fidélité, douceur, maîtrise de soi. La loi n'est pas contre ces choses.",
      german: "Die Frucht des Geistes aber ist Liebe, Freude, Frieden, Langmut, Freundlichkeit, Güte, Treue, Sanftmut, Selbstbeherrschung; gegen solche Dinge gibt es kein Gesetz."
    },
    topics: ["Love", "Joy", "Peace", "Patience"]
  },
  {
    reference: "James 1:2-4",
    text: {
      english: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance. Let perseverance finish its work so that you may be mature and complete, not lacking anything.",
      korean: "내 형제들아 너희가 여러 가지 시험을 만나거든 온전히 기쁘게 여기라 이는 너희 믿음의 시련이 인내를 만들어 내는 줄 너희가 앎이라 인내를 온전히 이루라 이는 너희로 온전하고 구비하여 조금도 부족함이 없게 하려 함이라.",
      spanish: "Consideradlo como un gran gozo, hermanos míos, el que os halléis en diversas pruebas; sabiendo que la prueba de vuestra fe produce paciencia. Y la paciencia tiene su perfecto resultado, para que seáis perfectos y cabales, sin que os falte cosa alguna.",
      french: "Mes frères, regardez comme un sujet de joie complète les diverses épreuves auxquelles vous pouvez être exposés, sachant que l'épreuve de votre foi produit la patience. Mais la patience doit avoir une œuvre parfaite, afin que vous soyez parfaits et accomplis, sans faillir en rien.",
      german: "Haltet es für lauter Freude, meine Brüder, wenn ihr in mancherlei Versuchungen fallet; wisset ihr doch, dass die Bewährung eures Glaubens Geduld wirkt. Die Geduld aber soll ein vollkommenes Werk haben, damit ihr vollkommen und vollständig seid und in nichts Mangel habt."
    },
    topics: ["Joy", "Trials", "Perseverance"]
  },
  {
    reference: "Psalm 139:14",
    text: {
      english: "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
      korean: "내가 주께 감사하옴은 나를 지으심이 심히 기묘하심이라 주께서 하시는 일이 기이함을 내 영혼이 잘 아나이다.",
      spanish: "Te alabaré; porque formidables, maravillosas son tus obras; estoy maravillado, y mi alma lo sabe muy bien.",
      french: "Je te loue de ce que je suis une créature si merveilleuse. Tes œuvres sont admirables, et mon âme le sait bien.",
      german: "Ich danke dir dafür, dass ich wunderbar gemacht bin; wunderbar sind deine Werke, das erkennt meine Seele wohl."
    },
    topics: ["Gratitude", "Worth", "Creation"]
  },
  {
    reference: "Hebrews 11:1",
    text: {
      english: "Now faith is confidence in what we hope for and assurance about what we do not see.",
      korean: "믿음은 바라는 것들의 실상이요 보이지 않는 것들의 증거니.",
      spanish: "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.",
      french: "Or, la foi est une ferme assurance des choses que l'on espère, une démonstration de celles que l'on ne voit pas.",
      german: "Der Glaube aber ist eine feste Zuversicht auf das, was man hofft, und ein Nichtzweifeln an dem, was man nicht sieht."
    },
    topics: ["Faith", "Hope", "Confidence"]
  },
  {
    reference: "1 Peter 5:7",
    text: {
      english: "Cast all your anxiety on him because he cares for you.",
      korean: "너희 염려를 다 주께 맡기라 이는 그가 너희를 돌보심이라.",
      spanish: "Echad toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.",
      french: "Déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous.",
      german: "Alle eure Sorge werft auf ihn; denn er sorgt für euch."
    },
    topics: ["Anxiety", "Trust", "Care"]
  },
  {
    reference: "Matthew 7:7",
    text: {
      english: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.",
      korean: "구하라 그리하면 너희에게 주실 것이요 찾으라 그리하면 찾아낼 것이요 문을 두드리라 그리하면 너희에게 열릴 것이니.",
      spanish: "Pedid, y se os dará; buscad, y hallaréis; llamad, y se os abrirá.",
      french: "Demandez, et l'on vous donnera; cherchez, et vous trouverez; frappez, et l'on vous ouvrira.",
      german: "Bittet, so wird euch gegeben; suchet, so werdet ihr finden; klopft an, so wird euch geöffnet."
    },
    topics: ["Prayer", "Faith", "Guidance"]
  },
  {
    reference: "Colossians 3:15",
    text: {
      english: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful.",
      korean: "그리스도의 평강이 너희 마음을 주장하게 하라 너희는 평강을 위하여 한 몸으로 부르심을 받았나니 너희는 또한 감사하는 자가 되라.",
      spanish: "Y la paz de Dios gobierne en vuestros corazones, a la que asimismo fuisteis llamados en un solo cuerpo; y sed agradecidos.",
      french: "Et que la paix de Christ, à laquelle vous avez été appelés en un seul corps, règne dans vos cœurs; et soyez reconnaissants.",
      german: "Und der Friede Christi regiere in euren Herzen, zu dem ihr auch berufen seid in einem Leib; und seid dankbar."
    },
    topics: ["Peace", "Gratitude", "Unity"]
  },
  {
    reference: "Philippians 3:13",
    text: {
      english: "Forgetting what is behind and straining toward what is ahead,",
      korean: "형제들아 나는 아직 내가 잡은 줄로 여기지 아니하고 오직 한 일 즉 뒤에 있는 것은 잊어버리고 앞에 있는 것을 잡으려고.",
      spanish: "Olvidando lo que queda atrás y extendiéndome a lo que está delante.",
      french: "Oubliant ce qui est en arrière et me portant vers ce qui est en avant.",
      german: "Ich vergesse, was dahinten ist, und strecke mich aus nach dem, was vorne ist."
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
