import { BibleVerse } from '@/data/bibleVerses';

export interface ContextualPhrase {
  type: 'comfort' | 'encouragement' | 'empowerment' | 'wisdom';
  phrase: string;
  language: string;
}

class AIVerseAnalyzer {
  generateContextualPhrase(verse: BibleVerse, language: string = 'english'): ContextualPhrase {
    const text = verse.text.english.toLowerCase();
    const topics = verse.topics.map(t => t.toLowerCase());
    
    // Create a unique hash based on verse reference AND text to ensure each verse gets unique commentary
    const verseHash = this.createVerseHash(verse.reference + verse.text.english);
    
    // Analyze verse content for themes and generate appropriate response
    let phraseData: { type: ContextualPhrase['type'], phrases: { [key: string]: string[] } };
    
    // COMFORT themes
    if (text.includes('comfort') || text.includes('peace') || text.includes('rest') || 
        text.includes('weep') || text.includes('mourn') || text.includes('trouble') ||
        topics.includes('comfort') || topics.includes('peace')) {
      
      phraseData = {
        type: 'comfort',
        phrases: {
          english: [
            "Even in life's darkest valleys, God's presence illuminates the path ahead. His comfort transforms our deepest sorrows into testimonies of His unfailing love.",
            "Release every burden into God's capable hands. He who crafted the universe with precision holds your concerns with infinite tenderness and perfect understanding.",
            "God's peace transcends human comprehension, settling deep within your spirit like calm waters after a storm. Let this divine tranquility anchor your troubled heart.",
            "In your moment of need, God draws near with healing in His wings. His compassionate heart beats in rhythm with yours, bringing restoration to every broken place.",
            "The Lord's comfort is not merely the absence of pain, but the presence of His healing love that transforms wounds into wisdom and scars into strength."
          ],
          korean: [
            "인생의 가장 어두운 골짜기에서도 하나님의 임재가 앞길을 밝혀주십니다. 그분의 위로는 우리의 깊은 슬픔을 그분의 변함없는 사랑의 증거로 바꾸어 주십니다.",
            "모든 짐을 하나님의 능하신 손에 맡기십시오. 우주를 정밀하게 창조하신 그분이 무한한 부드러움과 완전한 이해로 당신의 걱정을 붙들고 계십니다.",
            "하나님의 평강은 인간의 이해를 초월하여, 폭풍 후의 고요한 물처럼 당신의 영 깊은 곳에 자리잡습니다. 이 신성한 평온이 당신의 근심하는 마음을 붙들게 하십시오.",
            "당신이 필요한 순간에 하나님은 그분의 날개에 치유를 가지고 가까이 오십니다. 그분의 자비로운 마음이 당신의 마음과 함께 뛰며, 모든 상한 곳에 회복을 가져다 주십니다.",
            "주님의 위로는 단순히 고통이 없는 것이 아니라, 상처를 지혜로, 흉터를 힘으로 바꾸시는 그분의 치유하는 사랑의 임재입니다."
          ],
          spanish: [
            "Incluso en los valles más oscuros de la vida, la presencia de Dios ilumina el camino por delante. Su consuelo transforma nuestras tristezas más profundas en testimonios de Su amor infalible.",
            "Entrega cada carga en las manos capaces de Dios. Él que creó el universo con precisión sostiene tus preocupaciones con ternura infinita y comprensión perfecta.",
            "La paz de Dios trasciende la comprensión humana, asentándose profundamente en tu espíritu como aguas tranquilas después de una tormenta. Deja que esta tranquilidad divina ancle tu corazón turbado.",
            "En tu momento de necesidad, Dios se acerca con sanidad en Sus alas. Su corazón compasivo late al ritmo del tuyo, trayendo restauración a cada lugar quebrantado.",
            "El consuelo del Señor no es meramente la ausencia de dolor, sino la presencia de Su amor sanador que transforma heridas en sabiduría y cicatrices en fortaleza."
          ],
          french: [
            "Même dans les vallées les plus sombres de la vie, la présence de Dieu illumine le chemin à suivre. Son réconfort transforme nos tristesses les plus profondes en témoignages de Son amour infaillible.",
            "Remets chaque fardeau entre les mains capables de Dieu. Celui qui a créé l'univers avec précision tient tes préoccupations avec une tendresse infinie et une compréhension parfaite.",
            "La paix de Dieu transcende la compréhension humaine, s'installant profondément dans ton esprit comme des eaux calmes après une tempête. Laisse cette tranquillité divine ancrer ton cœur troublé.",
            "Dans ton moment de besoin, Dieu s'approche avec la guérison dans Ses ailes. Son cœur compatissant bat au rythme du tien, apportant la restauration à chaque endroit brisé.",
            "Le réconfort du Seigneur n'est pas simplement l'absence de douleur, mais la présence de Son amour guérisseur qui transforme les blessures en sagesse et les cicatrices en force."
          ],
          german: [
            "Selbst in den dunkelsten Tälern des Lebens erleuchtet Gottes Gegenwart den Weg nach vorn. Sein Trost verwandelt unsere tiefsten Sorgen in Zeugnisse Seiner unfehlbaren Liebe.",
            "Lege jede Last in Gottes fähige Hände. Er, der das Universum mit Präzision erschuf, hält deine Sorgen mit unendlicher Zärtlichkeit und perfektem Verständnis.",
            "Gottes Friede übersteigt menschliches Verstehen und lässt sich tief in deinem Geist nieder wie ruhige Wasser nach einem Sturm. Lass diese göttliche Ruhe dein beunruhigtes Herz verankern.",
            "In deinem Moment der Not naht sich Gott mit Heilung in Seinen Flügeln. Sein mitfühlendes Herz schlägt im Rhythmus mit deinem und bringt Wiederherstellung an jeden zerbrochenen Ort.",
            "Des Herrn Trost ist nicht nur die Abwesenheit von Schmerz, sondern die Gegenwart Seiner heilenden Liebe, die Wunden in Weisheit und Narben in Stärke verwandelt."
          ]
        }
      };
    }
    
    // EMPOWERMENT themes
    else if (text.includes('strength') || text.includes('power') || text.includes('mighty') ||
             text.includes('overcome') || text.includes('victory') || text.includes('conquer') ||
             topics.includes('strength') || topics.includes('power')) {
      
      phraseData = {
        type: 'empowerment',
        phrases: {
          english: [
            "Divine strength courses through your spirit, enabling you to rise above every circumstance. What seems impossible becomes achievable through God's limitless power working within you.",
            "Faith unleashes God's mountain-moving power through your prayers and declarations. Obstacles that appear immovable bow before the authority Christ has given you.",
            "You carry heaven's authority within you. Rise with confidence, knowing that the same power that conquered death flows through your veins, empowering you for victory.",
            "God's strength is perfected in your weakness, transforming your limitations into launching pads for His miraculous intervention in your life.",
            "The Spirit of the Almighty dwells within you, making you more than a conqueror. Every challenge becomes an opportunity to demonstrate His overwhelming power."
          ],
          korean: [
            "신성한 힘이 당신의 영을 통해 흘러, 모든 상황을 뛰어넘을 수 있게 합니다. 불가능해 보이는 것이 당신 안에서 역사하시는 하나님의 무한한 능력을 통해 성취 가능해집니다.",
            "믿음은 당신의 기도와 선포를 통해 하나님의 산을 옮기는 능력을 발휘합니다. 움직일 수 없어 보이는 장애물들이 그리스도께서 당신에게 주신 권세 앞에 굴복합니다.",
            "당신은 하늘의 권세를 안에 지니고 있습니다. 죽음을 정복한 그 동일한 능력이 당신의 혈관을 통해 흘러 승리를 위해 당신을 능력있게 하신다는 것을 알고 확신을 가지고 일어나십시오.",
            "하나님의 힘은 당신의 약함에서 온전해지며, 당신의 한계를 그분의 기적적인 개입을 위한 발판으로 바꾸어 놓습니다.",
            "전능하신 분의 영이 당신 안에 거하시어, 당신을 정복자보다 나은 자로 만드십니다. 모든 도전이 그분의 압도적인 능력을 보여주는 기회가 됩니다."
          ],
          spanish: [
            "La fuerza divina fluye a través de tu espíritu, permitiéndote elevarte por encima de toda circunstancia. Lo que parece imposible se vuelve alcanzable a través del poder ilimitado de Dios obrando dentro de ti.",
            "La fe desata el poder de Dios que mueve montañas a través de tus oraciones y declaraciones. Los obstáculos que parecen inamovibles se inclinan ante la autoridad que Cristo te ha dado.",
            "Llevas la autoridad del cielo dentro de ti. Levántate con confianza, sabiendo que el mismo poder que conquistó la muerte fluye por tus venas, empoderándote para la victoria.",
            "La fuerza de Dios se perfecciona en tu debilidad, transformando tus limitaciones en plataformas de lanzamiento para Su intervención milagrosa en tu vida.",
            "El Espíritu del Todopoderoso mora dentro de ti, haciéndote más que vencedor. Cada desafío se convierte en una oportunidad para demostrar Su poder abrumador."
          ],
          french: [
            "La force divine coule à travers ton esprit, te permettant de t'élever au-dessus de toute circonstance. Ce qui semble impossible devient réalisable grâce au pouvoir illimité de Dieu qui œuvre en toi.",
            "La foi libère le pouvoir de Dieu qui déplace les montagnes à travers tes prières et déclarations. Les obstacles qui semblent immobiles s'inclinent devant l'autorité que Christ t'a donnée.",
            "Tu portes l'autorité du ciel en toi. Lève-toi avec confiance, sachant que le même pouvoir qui a conquis la mort coule dans tes veines, te donnant le pouvoir pour la victoire.",
            "La force de Dieu se perfectionne dans ta faiblesse, transformant tes limitations en rampes de lancement pour Son intervention miraculeuse dans ta vie.",
            "L'Esprit du Tout-Puissant demeure en toi, te rendant plus que vainqueur. Chaque défi devient une opportunité de démontrer Sa puissance écrasante."
          ],
          german: [
            "Göttliche Kraft fließt durch deinen Geist und ermöglicht es dir, dich über jede Umstände zu erheben. Was unmöglich erscheint, wird durch Gottes grenzenlose Macht, die in dir wirkt, erreichbar.",
            "Der Glaube entfesselt Gottes bergeversetzendes Kraft durch deine Gebete und Erklärungen. Hindernisse, die unbeweglich erscheinen, beugen sich vor der Autorität, die Christus dir gegeben hat.",
            "Du trägst die Autorität des Himmels in dir. Erhebe dich mit Zuversicht, wissend, dass dieselbe Macht, die den Tod besiegte, durch deine Adern fließt und dich für den Sieg stärkt.",
            "Gottes Kraft wird in deiner Schwachheit vollkommen und verwandelt deine Grenzen in Startrampen für Seine wunderbare Intervention in deinem Leben.",
            "Der Geist des Allmächtigen wohnt in dir und macht dich zu mehr als einem Überwinder. Jede Herausforderung wird zu einer Gelegenheit, Seine überwältigende Macht zu demonstrieren."
          ]
        }
      };
    }
    
    // ENCOURAGEMENT themes
    else if (text.includes('hope') || text.includes('future') || text.includes('promise') ||
             text.includes('faith') || text.includes('trust') || text.includes('believe') ||
             topics.includes('hope') || topics.includes('faith') || topics.includes('trust')) {
      
      phraseData = {
        type: 'encouragement',
        phrases: {
          english: [
            "God's blueprint for your life surpasses your wildest dreams. Trust His timing and methods as He unfolds a future filled with purpose, blessing, and divine appointments.",
            "Your faith is the key that unlocks heaven's treasures. Stand firm in belief, for God honors every step of trust with demonstrations of His faithfulness.",
            "In waiting, your character is refined like gold. God uses these seasons to prepare you for the greater things He has in store. Your breakthrough is being perfected.",
            "Hold fast to hope, for God's promises never fail. What He has spoken over your life will come to pass in His perfect timing and beautiful way.",
            "Every step of faith you take creates a pathway for God's miracles. Your trust today becomes tomorrow's testimony of His goodness and provision."
          ],
          korean: [
            "하나님의 당신의 삶을 위한 청사진은 당신의 가장 큰 꿈을 뛰어넘습니다. 그분이 목적과 축복, 그리고 신성한 만남으로 가득한 미래를 펼쳐가실 때 그분의 때와 방법을 신뢰하십시오.",
            "당신의 믿음은 하늘의 보물을 여는 열쇠입니다. 믿음에 굳게 서십시오. 하나님은 신뢰의 모든 걸음을 그분의 신실하심의 증명으로 존중하십니다.",
            "기다림 중에 당신의 성품이 금처럼 정제됩니다. 하나님은 이런 계절들을 사용하여 그분이 예비하신 더 큰 일들을 위해 당신을 준비시키십니다. 당신의 돌파구가 완성되고 있습니다.",
            "소망을 굳게 붙잡으십시오. 하나님의 약속은 결코 실패하지 않습니다. 그분이 당신의 삶에 대해 말씀하신 것은 그분의 완전한 때와 아름다운 방법으로 이루어질 것입니다.",
            "당신이 내딛는 믿음의 모든 걸음이 하나님의 기적을 위한 길을 만듭니다. 오늘의 신뢰가 내일의 그분의 선하심과 공급하심에 대한 증거가 됩니다."
          ],
          spanish: [
            "El plan de Dios para tu vida supera tus sueños más salvajes. Confía en Su tiempo y métodos mientras despliega un futuro lleno de propósito, bendición y citas divinas.",
            "Tu fe es la llave que abre los tesoros del cielo. Mantente firme en la creencia, porque Dios honra cada paso de confianza con demostraciones de Su fidelidad.",
            "En la espera, tu carácter se refina como el oro. Dios usa estas temporadas para prepararte para las cosas más grandes que tiene reservadas. Tu avance está siendo perfeccionado.",
            "Aférrate a la esperanza, porque las promesas de Dios nunca fallan. Lo que Él ha hablado sobre tu vida se cumplirá en Su tiempo perfecto y de manera hermosa.",
            "Cada paso de fe que das crea un camino para los milagros de Dios. Tu confianza de hoy se convierte en el testimonio de mañana de Su bondad y provisión."
          ],
          french: [
            "Le plan de Dieu pour ta vie dépasse tes rêves les plus fous. Fais confiance à Son timing et à Ses méthodes alors qu'Il déploie un avenir rempli de but, de bénédiction et de rendez-vous divins.",
            "Ta foi est la clé qui ouvre les trésors du ciel. Reste ferme dans la croyance, car Dieu honore chaque pas de confiance avec des démonstrations de Sa fidélité.",
            "Dans l'attente, ton caractère est raffiné comme l'or. Dieu utilise ces saisons pour te préparer aux plus grandes choses qu'Il a en réserve. Ta percée est en cours de perfectionnement.",
            "Accroche-toi à l'espoir, car les promesses de Dieu ne faillissent jamais. Ce qu'Il a dit sur ta vie s'accomplira en Son temps parfait et de manière magnifique.",
            "Chaque pas de foi que tu fais crée un chemin pour les miracles de Dieu. Ta confiance d'aujourd'hui devient le témoignage de demain de Sa bonté et de Sa provision."
          ],
          german: [
            "Gottes Plan für dein Leben übertrifft deine kühnsten Träume. Vertraue Seinem Timing und Seinen Methoden, während Er eine Zukunft voller Zweck, Segen und göttlicher Termine entfaltet.",
            "Dein Glaube ist der Schlüssel, der die Schätze des Himmels öffnet. Stehe fest im Glauben, denn Gott ehrt jeden Schritt des Vertrauens mit Beweisen Seiner Treue.",
            "Im Warten wird dein Charakter wie Gold verfeinert. Gott nutzt diese Zeiten, um dich auf die größeren Dinge vorzubereiten, die Er bereithält. Dein Durchbruch wird perfektioniert.",
            "Halte fest an der Hoffnung, denn Gottes Verheißungen versagen nie. Was Er über dein Leben gesprochen hat, wird zu Seiner perfekten Zeit und auf wunderbare Weise geschehen.",
            "Jeder Schritt des Glaubens, den du machst, schafft einen Weg für Gottes Wunder. Dein Vertrauen heute wird zu morgigem Zeugnis Seiner Güte und Versorgung."
          ]
        }
      };
    }
    
    // WISDOM themes
    else if (text.includes('wisdom') || text.includes('understand') || text.includes('know') ||
             text.includes('truth') || text.includes('word') || text.includes('teach') ||
             topics.includes('wisdom') || topics.includes('truth')) {
      
      phraseData = {
        type: 'wisdom',
        phrases: {
          english: [
            "God's Word is your compass in life's journey, providing direction when paths seem unclear. Let divine truth illuminate every decision and transform your perspective.",
            "Heavenly wisdom awaits those who earnestly seek it. God delights in revealing His mysteries to hearts that hunger for understanding and truth.",
            "Divine understanding surpasses earthly knowledge. Allow God's wisdom to guide your thoughts, decisions, and responses, bringing clarity to life's complexities.",
            "The fear of the Lord is the beginning of wisdom, opening your heart to receive the deep truths that transform ordinary living into extraordinary purpose.",
            "God's wisdom is not merely information but transformation. As you apply His truth, you become a living demonstration of His perfect ways."
          ],
          korean: [
            "하나님의 말씀은 인생 여정의 나침반으로, 길이 불분명해 보일 때 방향을 제시합니다. 신성한 진리가 모든 결정을 밝히고 당신의 관점을 변화시키게 하십시오.",
            "하늘의 지혜는 간절히 구하는 자들을 기다립니다. 하나님은 이해와 진리에 굶주린 마음에 그분의 신비를 계시하시는 것을 기뻐하십니다.",
            "신성한 이해는 세상의 지식을 뛰어넘습니다. 하나님의 지혜가 당신의 생각, 결정, 그리고 반응을 인도하여 삶의 복잡함에 명료함을 가져다주게 하십시오.",
            "여호와를 경외하는 것이 지혜의 시작이며, 평범한 삶을 특별한 목적으로 변화시키는 깊은 진리를 받을 수 있도록 당신의 마음을 열어줍니다.",
            "하나님의 지혜는 단순한 정보가 아니라 변화입니다. 그분의 진리를 적용할 때, 당신은 그분의 완전한 방법의 살아있는 증명이 됩니다."
          ],
          spanish: [
            "La Palabra de Dios es tu brújula en el viaje de la vida, proporcionando dirección cuando los caminos parecen inciertos. Deja que la verdad divina ilumine cada decisión y transforme tu perspectiva.",
            "La sabiduría celestial espera a aquellos que la buscan fervientemente. Dios se deleita en revelar Sus misterios a los corazones que tienen hambre de entendimiento y verdad.",
            "El entendimiento divino supera el conocimiento terrenal. Permite que la sabiduría de Dios guíe tus pensamientos, decisiones y respuestas, trayendo claridad a las complejidades de la vida.",
            "El temor del Señor es el principio de la sabiduría, abriendo tu corazón para recibir las verdades profundas que transforman la vida ordinaria en propósito extraordinario.",
            "La sabiduría de Dios no es meramente información sino transformación. Al aplicar Su verdad, te conviertes en una demostración viviente de Sus caminos perfectos."
          ],
          french: [
            "La Parole de Dieu est ta boussole dans le voyage de la vie, fournissant une direction quand les chemins semblent incertains. Laisse la vérité divine illuminer chaque décision et transformer ta perspective.",
            "La sagesse céleste attend ceux qui la cherchent ardemment. Dieu se réjouit de révéler Ses mystères aux cœurs qui ont faim de compréhension et de vérité.",
            "La compréhension divine surpasse la connaissance terrestre. Permets à la sagesse de Dieu de guider tes pensées, décisions et réponses, apportant de la clarté aux complexités de la vie.",
            "La crainte du Seigneur est le commencement de la sagesse, ouvrant ton cœur pour recevoir les vérités profondes qui transforment la vie ordinaire en but extraordinaire.",
            "La sagesse de Dieu n'est pas seulement de l'information mais de la transformation. En appliquant Sa vérité, tu deviens une démonstration vivante de Ses voies parfaites."
          ],
          german: [
            "Gottes Wort ist dein Kompass auf der Lebensreise und gibt Richtung, wenn Wege unklar erscheinen. Lass göttliche Wahrheit jede Entscheidung erleuchten und deine Perspektive verwandeln.",
            "Himmlische Weisheit wartet auf die, die sie ernsthaft suchen. Gott freut sich daran, Seine Geheimnisse Herzen zu offenbaren, die nach Verständnis und Wahrheit hungern.",
            "Göttliches Verständnis übertrifft irdisches Wissen. Erlaube Gottes Weisheit, deine Gedanken, Entscheidungen und Antworten zu leiten und Klarheit in die Komplexitäten des Lebens zu bringen.",
            "Die Furcht des Herrn ist der Anfang der Weisheit und öffnet dein Herz, um die tiefen Wahrheiten zu empfangen, die gewöhnliches Leben in außergewöhnlichen Zweck verwandeln.",
            "Gottes Weisheit ist nicht nur Information, sondern Transformation. Wenn du Seine Wahrheit anwendest, wirst du zu einer lebendigen Demonstration Seiner vollkommenen Wege."
          ]
        }
      };
    }
    
    // LOVE themes
    else if (text.includes('love') || text.includes('beloved') || topics.includes('love')) {
      phraseData = {
        type: 'encouragement',
        phrases: {
          english: [
            "You are cherished beyond measure by the Creator of all things. His love for you is not based on performance but on His unchanging character and covenant faithfulness.",
            "God's love is the foundation upon which your identity rests. In His eyes, you are precious, honored, and deeply valued beyond human comprehension.",
            "The depth of God's love cannot be measured by earthly standards. It reaches into your deepest need and highest aspiration, covering every aspect of your being.",
            "Divine love is not a feeling but a commitment. God's love for you remains constant through every season, every failure, and every triumph of your life.",
            "You are the object of God's eternal affection. His love pursued you before you knew Him and will continue long after time itself has ended."
          ],
          korean: [
            "당신은 만물의 창조주에 의해 측량할 수 없을 만큼 소중히 여겨집니다. 당신에 대한 그분의 사랑은 행위에 기초하지 않고 그분의 변하지 않는 성품과 언약의 신실하심에 기초합니다.",
            "하나님의 사랑은 당신의 정체성이 쉬는 기초입니다. 그분의 눈에 당신은 소중하고, 존귀하며, 인간의 이해를 뛰어넘어 깊이 가치있는 존재입니다.",
            "하나님의 사랑의 깊이는 세상의 기준으로 측량할 수 없습니다. 그것은 당신의 가장 깊은 필요와 가장 높은 열망에 닿아, 당신 존재의 모든 면을 덮습니다.",
            "신성한 사랑은 감정이 아니라 헌신입니다. 당신에 대한 하나님의 사랑은 당신 삶의 모든 계절, 모든 실패, 모든 승리를 통해 변함없이 남아있습니다.",
            "당신은 하나님의 영원한 애정의 대상입니다. 그분의 사랑은 당신이 그분을 알기 전부터 당신을 추구했고, 시간 자체가 끝난 후에도 계속될 것입니다."
          ],
          spanish: [
            "Eres querido más allá de toda medida por el Creador de todas las cosas. Su amor por ti no se basa en el rendimiento sino en Su carácter inmutable y fidelidad del pacto.",
            "El amor de Dios es el fundamento sobre el cual descansa tu identidad. A Sus ojos, eres precioso, honrado y profundamente valorado más allá de la comprensión humana.",
            "La profundidad del amor de Dios no puede medirse por estándares terrenales. Alcanza tu necesidad más profunda y tu aspiración más alta, cubriendo cada aspecto de tu ser.",
            "El amor divino no es un sentimiento sino un compromiso. El amor de Dios por ti permanece constante a través de cada temporada, cada fracaso y cada triunfo de tu vida.",
            "Eres el objeto del afecto eterno de Dios. Su amor te persiguió antes de que lo conocieras y continuará mucho después de que el tiempo mismo haya terminado."
          ],
          french: [
            "Tu es chéri au-delà de toute mesure par le Créateur de toutes choses. Son amour pour toi n'est pas basé sur la performance mais sur Son caractère immuable et Sa fidélité d'alliance.",
            "L'amour de Dieu est le fondement sur lequel repose ton identité. À Ses yeux, tu es précieux, honoré et profondément valorisé au-delà de la compréhension humaine.",
            "La profondeur de l'amour de Dieu ne peut être mesurée par les standards terrestres. Il atteint ton besoin le plus profond et ton aspiration la plus haute, couvrant chaque aspect de ton être.",
            "L'amour divin n'est pas un sentiment mais un engagement. L'amour de Dieu pour toi reste constant à travers chaque saison, chaque échec et chaque triomphe de ta vie.",
            "Tu es l'objet de l'affection éternelle de Dieu. Son amour t'a poursuivi avant que tu Le connaisses et continuera longtemps après que le temps lui-même ait pris fin."
          ],
          german: [
            "Du bist über alle Maßen geliebt vom Schöpfer aller Dinge. Seine Liebe zu dir basiert nicht auf Leistung, sondern auf Seinem unveränderlichen Charakter und Bundestreue.",
            "Gottes Liebe ist das Fundament, auf dem deine Identität ruht. In Seinen Augen bist du kostbar, geehrt und tief geschätzt jenseits menschlichen Verständnisses.",
            "Die Tiefe von Gottes Liebe kann nicht mit irdischen Maßstäben gemessen werden. Sie erreicht dein tiefstes Bedürfnis und deine höchste Sehnsucht und bedeckt jeden Aspekt deines Seins.",
            "Göttliche Liebe ist kein Gefühl, sondern eine Verpflichtung. Gottes Liebe zu dir bleibt konstant durch jede Jahreszeit, jeden Fehler und jeden Triumph deines Lebens.",
            "Du bist der Gegenstand von Gottes ewiger Zuneigung. Seine Liebe verfolgte dich, bevor du Ihn kanntest, und wird lange nach dem Ende der Zeit selbst fortbestehen."
          ]
        }
      };
    }
    
    // DEFAULT wisdom response for other verses
    else {
      phraseData = {
        type: 'wisdom',
        phrases: {
          english: [
            "Let this divine truth take root in your heart, transforming how you see yourself, others, and your circumstances. God's Word never returns empty but accomplishes His purposes.",
            "Scripture is not merely ancient text but living truth that speaks directly to your current situation. Allow its power to reshape your thoughts and actions.",
            "This verse contains seeds of transformation. As you meditate on its truth, watch how God uses it to bring change in unexpected areas of your life.",
            "God's Word is both mirror and lamp - revealing who you are while illuminating the path forward. Let this truth guide your next steps.",
            "Every word from God carries the power to create and transform. Receive this verse as a personal message from your Heavenly Father to you today."
          ],
          korean: [
            "이 신성한 진리가 당신의 마음에 뿌리내려, 당신이 자신과 다른 사람들, 그리고 당신의 상황을 보는 방식을 변화시키게 하십시오. 하나님의 말씀은 결코 빈 손으로 돌아가지 않고 그분의 목적을 성취합니다.",
            "성경은 단순한 고대 문서가 아니라 당신의 현재 상황에 직접 말씀하시는 살아있는 진리입니다. 그 능력이 당신의 생각과 행동을 재형성하게 하십시오.",
            "이 구절은 변화의 씨앗을 담고 있습니다. 그 진리를 묵상할 때, 하나님이 그것을 사용하여 당신 삶의 예상치 못한 영역에 변화를 가져오시는 것을 지켜보십시오.",
            "하나님의 말씀은 거울이자 등불입니다 - 당신이 누구인지 드러내면서 앞으로 나아갈 길을 밝혀줍니다. 이 진리가 당신의 다음 걸음을 인도하게 하십시오.",
            "하나님으로부터 오는 모든 말씀은 창조하고 변화시키는 능력을 가지고 있습니다. 이 구절을 오늘 당신에게 주시는 하늘 아버지의 개인적인 메시지로 받으십시오."
          ],
          spanish: [
            "Deja que esta verdad divina eche raíces en tu corazón, transformando cómo te ves a ti mismo, a otros y a tus circunstancias. La Palabra de Dios nunca regresa vacía sino que cumple Sus propósitos.",
            "La Escritura no es meramente texto antiguo sino verdad viviente que habla directamente a tu situación actual. Permite que su poder remodele tus pensamientos y acciones.",
            "Este versículo contiene semillas de transformación. Mientras meditas en su verdad, observa cómo Dios lo usa para traer cambio en áreas inesperadas de tu vida.",
            "La Palabra de Dios es tanto espejo como lámpara - revelando quién eres mientras ilumina el camino hacia adelante. Deja que esta verdad guíe tus próximos pasos.",
            "Cada palabra de Dios lleva el poder de crear y transformar. Recibe este versículo como un mensaje personal de tu Padre Celestial para ti hoy."
          ],
          french: [
            "Laisse cette vérité divine prendre racine dans ton cœur, transformant la façon dont tu te vois, les autres et tes circonstances. La Parole de Dieu ne revient jamais vide mais accomplit Ses desseins.",
            "L'Écriture n'est pas simplement un texte ancien mais une vérité vivante qui parle directement à ta situation actuelle. Permets à sa puissance de remodeler tes pensées et tes actions.",
            "Ce verset contient des graines de transformation. Alors que tu médites sur sa vérité, observe comment Dieu l'utilise pour apporter du changement dans des domaines inattendus de ta vie.",
            "La Parole de Dieu est à la fois miroir et lampe - révélant qui tu es tout en illuminant le chemin à suivre. Laisse cette vérité guider tes prochains pas.",
            "Chaque parole de Dieu porte le pouvoir de créer et de transformer. Reçois ce verset comme un message personnel de ton Père Céleste pour toi aujourd'hui."
          ],
          german: [
            "Lass diese göttliche Wahrheit in deinem Herzen Wurzeln schlagen und verwandle, wie du dich selbst, andere und deine Umstände siehst. Gottes Wort kehrt nie leer zurück, sondern erfüllt Seine Absichten.",
            "Die Schrift ist nicht nur alter Text, sondern lebendige Wahrheit, die direkt zu deiner aktuellen Situation spricht. Erlaube ihrer Kraft, deine Gedanken und Handlungen umzugestalten.",
            "Dieser Vers enthält Samen der Transformation. Während du über seine Wahrheit meditierst, beobachte, wie Gott ihn verwendet, um Veränderung in unerwarteten Bereichen deines Lebens zu bringen.",
            "Gottes Wort ist sowohl Spiegel als auch Lampe - es offenbart, wer du bist, während es den Weg nach vorn erleuchtet. Lass diese Wahrheit deine nächsten Schritte leiten.",
            "Jedes Wort von Gott trägt die Kraft zu erschaffen und zu verwandeln. Empfange diesen Vers als persönliche Botschaft von deinem himmlischen Vater an dich heute."
          ]
        }
      };
    }
    
    // Use the verse hash to select a consistent variation for this specific verse
    const languagePhrases = phraseData.phrases[language] || phraseData.phrases.english;
    const selectedPhrase = languagePhrases[verseHash % languagePhrases.length];
    
    return {
      type: phraseData.type,
      phrase: selectedPhrase,
      language: language
    };
  }

  private createVerseHash(input: string): number {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}

export const aiVerseAnalyzer = new AIVerseAnalyzer();