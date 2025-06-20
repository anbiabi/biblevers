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
    
    // Create a unique hash based on verse reference to ensure consistency
    const verseHash = this.createVerseHash(verse.reference);
    
    // Analyze verse content for themes and generate appropriate response
    let phraseData: { type: ContextualPhrase['type'], phrases: { [key: string]: string } };
    
    // COMFORT themes
    if (text.includes('comfort') || text.includes('peace') || text.includes('rest') || 
        text.includes('weep') || text.includes('mourn') || text.includes('trouble') ||
        topics.includes('comfort') || topics.includes('peace')) {
      
      if (text.includes('valley') || text.includes('shadow')) {
        phraseData = {
          type: 'comfort',
          phrases: {
            english: "Even in life's darkest valleys, God's presence illuminates the path ahead. His comfort transforms our deepest sorrows into testimonies of His unfailing love.",
            korean: "인생의 가장 어두운 골짜기에서도 하나님의 임재가 앞길을 밝혀주십니다. 그분의 위로는 우리의 깊은 슬픔을 그분의 변함없는 사랑의 증거로 바꾸어 주십니다.",
            spanish: "Incluso en los valles más oscuros de la vida, la presencia de Dios ilumina el camino por delante. Su consuelo transforma nuestras tristezas más profundas en testimonios de Su amor infalible.",
            french: "Même dans les vallées les plus sombres de la vie, la présence de Dieu illumine le chemin à suivre. Son réconfort transforme nos tristesses les plus profondes en témoignages de Son amour infaillible.",
            german: "Selbst in den dunkelsten Tälern des Lebens erleuchtet Gottes Gegenwart den Weg nach vorn. Sein Trost verwandelt unsere tiefsten Sorgen in Zeugnisse Seiner unfehlbaren Liebe."
          }
        };
      } else if (text.includes('cast') && text.includes('care')) {
        phraseData = {
          type: 'comfort',
          phrases: {
            english: "Release every burden into God's capable hands. He who crafted the universe with precision holds your concerns with infinite tenderness and perfect understanding.",
            korean: "모든 짐을 하나님의 능하신 손에 맡기십시오. 우주를 정밀하게 창조하신 그분이 무한한 부드러움과 완전한 이해로 당신의 걱정을 붙들고 계십니다.",
            spanish: "Entrega cada carga en las manos capaces de Dios. Él que creó el universo con precisión sostiene tus preocupaciones con ternura infinita y comprensión perfecta.",
            french: "Remets chaque fardeau entre les mains capables de Dieu. Celui qui a créé l'univers avec précision tient tes préoccupations avec une tendresse infinie et une compréhension parfaite.",
            german: "Lege jede Last in Gottes fähige Hände. Er, der das Universum mit Präzision erschuf, hält deine Sorgen mit unendlicher Zärtlichkeit und perfektem Verständnis."
          }
        };
      } else if (text.includes('peace')) {
        phraseData = {
          type: 'comfort',
          phrases: {
            english: "God's peace transcends human comprehension, settling deep within your spirit like calm waters after a storm. Let this divine tranquility anchor your troubled heart.",
            korean: "하나님의 평강은 인간의 이해를 초월하여, 폭풍 후의 고요한 물처럼 당신의 영 깊은 곳에 자리잡습니다. 이 신성한 평온이 당신의 근심하는 마음을 붙들게 하십시오.",
            spanish: "La paz de Dios trasciende la comprensión humana, asentándose profundamente en tu espíritu como aguas tranquilas después de una tormenta. Deja que esta tranquilidad divina ancle tu corazón turbado.",
            french: "La paix de Dieu transcende la compréhension humaine, s'installant profondément dans ton esprit comme des eaux calmes après une tempête. Laisse cette tranquillité divine ancrer ton cœur troublé.",
            german: "Gottes Friede übersteigt menschliches Verstehen und lässt sich tief in deinem Geist nieder wie ruhige Wasser nach einem Sturm. Lass diese göttliche Ruhe dein beunruhigtes Herz verankern."
          }
        };
      } else {
        phraseData = {
          type: 'comfort',
          phrases: {
            english: "In your moment of need, God draws near with healing in His wings. His compassionate heart beats in rhythm with yours, bringing restoration to every broken place.",
            korean: "당신이 필요한 순간에 하나님은 그분의 날개에 치유를 가지고 가까이 오십니다. 그분의 자비로운 마음이 당신의 마음과 함께 뛰며, 모든 상한 곳에 회복을 가져다 주십니다.",
            spanish: "En tu momento de necesidad, Dios se acerca con sanidad en Sus alas. Su corazón compasivo late al ritmo del tuyo, trayendo restauración a cada lugar quebrantado.",
            french: "Dans ton moment de besoin, Dieu s'approche avec la guérison dans Ses ailes. Son cœur compatissant bat au rythme du tien, apportant la restauration à chaque endroit brisé.",
            german: "In deinem Moment der Not naht sich Gott mit Heilung in Seinen Flügeln. Sein mitfühlendes Herz schlägt im Rhythmus mit deinem und bringt Wiederherstellung an jeden zerbrochenen Ort."
          }
        };
      }
    }
    
    // EMPOWERMENT themes
    else if (text.includes('strength') || text.includes('power') || text.includes('mighty') ||
             text.includes('overcome') || text.includes('victory') || text.includes('conquer') ||
             topics.includes('strength') || topics.includes('power')) {
      
      if (text.includes('all things') || text.includes('everything')) {
        phraseData = {
          type: 'empowerment',
          phrases: {
            english: "Divine strength courses through your spirit, enabling you to rise above every circumstance. What seems impossible becomes achievable through God's limitless power working within you.",
            korean: "신성한 힘이 당신의 영을 통해 흘러, 모든 상황을 뛰어넘을 수 있게 합니다. 불가능해 보이는 것이 당신 안에서 역사하시는 하나님의 무한한 능력을 통해 성취 가능해집니다.",
            spanish: "La fuerza divina fluye a través de tu espíritu, permitiéndote elevarte por encima de toda circunstancia. Lo que parece imposible se vuelve alcanzable a través del poder ilimitado de Dios obrando dentro de ti.",
            french: "La force divine coule à travers ton esprit, te permettant de t'élever au-dessus de toute circonstance. Ce qui semble impossible devient réalisable grâce au pouvoir illimité de Dieu qui œuvre en toi.",
            german: "Göttliche Kraft fließt durch deinen Geist und ermöglicht es dir, dich über jede Umstände zu erheben. Was unmöglich erscheint, wird durch Gottes grenzenlose Macht, die in dir wirkt, erreichbar."
          }
        };
      } else if (text.includes('mountain') || text.includes('move')) {
        phraseData = {
          type: 'empowerment',
          phrases: {
            english: "Faith unleashes God's mountain-moving power through your prayers and declarations. Obstacles that appear immovable bow before the authority Christ has given you.",
            korean: "믿음은 당신의 기도와 선포를 통해 하나님의 산을 옮기는 능력을 발휘합니다. 움직일 수 없어 보이는 장애물들이 그리스도께서 당신에게 주신 권세 앞에 굴복합니다.",
            spanish: "La fe desata el poder de Dios que mueve montañas a través de tus oraciones y declaraciones. Los obstáculos que parecen inamovibles se inclinan ante la autoridad que Cristo te ha dado.",
            french: "La foi libère le pouvoir de Dieu qui déplace les montagnes à travers tes prières et déclarations. Les obstacles qui semblent immobiles s'inclinent devant l'autorité que Christ t'a donnée.",
            german: "Der Glaube entfesselt Gottes bergeversetzendes Kraft durch deine Gebete und Erklärungen. Hindernisse, die unbeweglich erscheinen, beugen sich vor der Autorität, die Christus dir gegeben hat."
          }
        };
      } else {
        phraseData = {
          type: 'empowerment',
          phrases: {
            english: "You carry heaven's authority within you. Rise with confidence, knowing that the same power that conquered death flows through your veins, empowering you for victory.",
            korean: "당신은 하늘의 권세를 안에 지니고 있습니다. 죽음을 정복한 그 동일한 능력이 당신의 혈관을 통해 흘러 승리를 위해 당신을 능력있게 하신다는 것을 알고 확신을 가지고 일어나십시오.",
            spanish: "Llevas la autoridad del cielo dentro de ti. Levántate con confianza, sabiendo que el mismo poder que conquistó la muerte fluye por tus venas, empoderándote para la victoria.",
            french: "Tu portes l'autorité du ciel en toi. Lève-toi avec confiance, sachant que le même pouvoir qui a conquis la mort coule dans tes veines, te donnant le pouvoir pour la victoire.",
            german: "Du trägst die Autorität des Himmels in dir. Erhebe dich mit Zuversicht, wissend, dass dieselbe Macht, die den Tod besiegte, durch deine Adern fließt und dich für den Sieg stärkt."
          }
        };
      }
    }
    
    // ENCOURAGEMENT themes
    else if (text.includes('hope') || text.includes('future') || text.includes('promise') ||
             text.includes('faith') || text.includes('trust') || text.includes('believe') ||
             topics.includes('hope') || topics.includes('faith') || topics.includes('trust')) {
      
      if (text.includes('plans') || text.includes('future')) {
        phraseData = {
          type: 'encouragement',
          phrases: {
            english: "God's blueprint for your life surpasses your wildest dreams. Trust His timing and methods as He unfolds a future filled with purpose, blessing, and divine appointments.",
            korean: "하나님의 당신의 삶을 위한 청사진은 당신의 가장 큰 꿈을 뛰어넘습니다. 그분이 목적과 축복, 그리고 신성한 만남으로 가득한 미래를 펼쳐가실 때 그분의 때와 방법을 신뢰하십시오.",
            spanish: "El plan de Dios para tu vida supera tus sueños más salvajes. Confía en Su tiempo y métodos mientras despliega un futuro lleno de propósito, bendición y citas divinas.",
            french: "Le plan de Dieu pour ta vie dépasse tes rêves les plus fous. Fais confiance à Son timing et à Ses méthodes alors qu'Il déploie un avenir rempli de but, de bénédiction et de rendez-vous divins.",
            german: "Gottes Plan für dein Leben übertrifft deine kühnsten Träume. Vertraue Seinem Timing und Seinen Methoden, während Er eine Zukunft voller Zweck, Segen und göttlicher Termine entfaltet."
          }
        };
      } else if (text.includes('faith') || text.includes('believe')) {
        phraseData = {
          type: 'encouragement',
          phrases: {
            english: "Your faith is the key that unlocks heaven's treasures. Stand firm in belief, for God honors every step of trust with demonstrations of His faithfulness.",
            korean: "당신의 믿음은 하늘의 보물을 여는 열쇠입니다. 믿음에 굳게 서십시오. 하나님은 신뢰의 모든 걸음을 그분의 신실하심의 증명으로 존중하십니다.",
            spanish: "Tu fe es la llave que abre los tesoros del cielo. Mantente firme en la creencia, porque Dios honra cada paso de confianza con demostraciones de Su fidelidad.",
            french: "Ta foi est la clé qui ouvre les trésors du ciel. Reste ferme dans la croyance, car Dieu honore chaque pas de confiance avec des démonstrations de Sa fidélité.",
            german: "Dein Glaube ist der Schlüssel, der die Schätze des Himmels öffnet. Stehe fest im Glauben, denn Gott ehrt jeden Schritt des Vertrauens mit Beweisen Seiner Treue."
          }
        };
      } else if (text.includes('wait') || text.includes('patient')) {
        phraseData = {
          type: 'encouragement',
          phrases: {
            english: "In waiting, your character is refined like gold. God uses these seasons to prepare you for the greater things He has in store. Your breakthrough is being perfected.",
            korean: "기다림 중에 당신의 성품이 금처럼 정제됩니다. 하나님은 이런 계절들을 사용하여 그분이 예비하신 더 큰 일들을 위해 당신을 준비시키십니다. 당신의 돌파구가 완성되고 있습니다.",
            spanish: "En la espera, tu carácter se refina como el oro. Dios usa estas temporadas para prepararte para las cosas más grandes que tiene reservadas. Tu avance está siendo perfeccionado.",
            french: "Dans l'attente, ton caractère est raffiné comme l'or. Dieu utilise ces saisons pour te préparer aux plus grandes choses qu'Il a en réserve. Ta percée est en cours de perfectionnement.",
            german: "Im Warten wird dein Charakter wie Gold verfeinert. Gott nutzt diese Zeiten, um dich auf die größeren Dinge vorzubereiten, die Er bereithält. Dein Durchbruch wird perfektioniert."
          }
        };
      } else {
        phraseData = {
          type: 'encouragement',
          phrases: {
            english: "Hold fast to hope, for God's promises never fail. What He has spoken over your life will come to pass in His perfect timing and beautiful way.",
            korean: "소망을 굳게 붙잡으십시오. 하나님의 약속은 결코 실패하지 않습니다. 그분이 당신의 삶에 대해 말씀하신 것은 그분의 완전한 때와 아름다운 방법으로 이루어질 것입니다.",
            spanish: "Aférrate a la esperanza, porque las promesas de Dios nunca fallan. Lo que Él ha hablado sobre tu vida se cumplirá en Su tiempo perfecto y de manera hermosa.",
            french: "Accroche-toi à l'espoir, car les promesses de Dieu ne faillissent jamais. Ce qu'Il a dit sur ta vie s'accomplira en Son temps parfait et de manière magnifique.",
            german: "Halte fest an der Hoffnung, denn Gottes Verheißungen versagen nie. Was Er über dein Leben gesprochen hat, wird zu Seiner perfekten Zeit und auf wunderbare Weise geschehen."
          }
        };
      }
    }
    
    // WISDOM themes
    else if (text.includes('wisdom') || text.includes('understand') || text.includes('know') ||
             text.includes('truth') || text.includes('word') || text.includes('teach') ||
             topics.includes('wisdom') || topics.includes('truth')) {
      
      if (text.includes('word') || text.includes('scripture')) {
        phraseData = {
          type: 'wisdom',
          phrases: {
            english: "God's Word is your compass in life's journey, providing direction when paths seem unclear. Let divine truth illuminate every decision and transform your perspective.",
            korean: "하나님의 말씀은 인생 여정의 나침반으로, 길이 불분명해 보일 때 방향을 제시합니다. 신성한 진리가 모든 결정을 밝히고 당신의 관점을 변화시키게 하십시오.",
            spanish: "La Palabra de Dios es tu brújula en el viaje de la vida, proporcionando dirección cuando los caminos parecen inciertos. Deja que la verdad divina ilumine cada decisión y transforme tu perspectiva.",
            french: "La Parole de Dieu est ta boussole dans le voyage de la vie, fournissant une direction quand les chemins semblent incertains. Laisse la vérité divine illuminer chaque décision et transformer ta perspective.",
            german: "Gottes Wort ist dein Kompass auf der Lebensreise und gibt Richtung, wenn Wege unklar erscheinen. Lass göttliche Wahrheit jede Entscheidung erleuchten und deine Perspektive verwandeln."
          }
        };
      } else if (text.includes('seek') || text.includes('ask')) {
        phraseData = {
          type: 'wisdom',
          phrases: {
            english: "Heavenly wisdom awaits those who earnestly seek it. God delights in revealing His mysteries to hearts that hunger for understanding and truth.",
            korean: "하늘의 지혜는 간절히 구하는 자들을 기다립니다. 하나님은 이해와 진리에 굶주린 마음에 그분의 신비를 계시하시는 것을 기뻐하십니다.",
            spanish: "La sabiduría celestial espera a aquellos que la buscan fervientemente. Dios se deleita en revelar Sus misterios a los corazones que tienen hambre de entendimiento y verdad.",
            french: "La sagesse céleste attend ceux qui la cherchent ardemment. Dieu se réjouit de révéler Ses mystères aux cœurs qui ont faim de compréhension et de vérité.",
            german: "Himmlische Weisheit wartet auf die, die sie ernsthaft suchen. Gott freut sich daran, Seine Geheimnisse Herzen zu offenbaren, die nach Verständnis und Wahrheit hungern."
          }
        };
      } else {
        phraseData = {
          type: 'wisdom',
          phrases: {
            english: "Divine understanding surpasses earthly knowledge. Allow God's wisdom to guide your thoughts, decisions, and responses, bringing clarity to life's complexities.",
            korean: "신성한 이해는 세상의 지식을 뛰어넘습니다. 하나님의 지혜가 당신의 생각, 결정, 그리고 반응을 인도하여 삶의 복잡함에 명료함을 가져다주게 하십시오.",
            spanish: "El entendimiento divino supera el conocimiento terrenal. Permite que la sabiduría de Dios guíe tus pensamientos, decisiones y respuestas, trayendo claridad a las complejidades de la vida.",
            french: "La compréhension divine surpasse la connaissance terrestre. Permets à la sagesse de Dieu de guider tes pensées, décisions et réponses, apportant de la clarté aux complexités de la vie.",
            german: "Göttliches Verständnis übertrifft irdisches Wissen. Erlaube Gottes Weisheit, deine Gedanken, Entscheidungen und Antworten zu leiten und Klarheit in die Komplexitäten des Lebens zu bringen."
          }
        };
      }
    }
    
    // LOVE themes
    else if (text.includes('love') || text.includes('beloved') || topics.includes('love')) {
      phraseData = {
        type: 'encouragement',
        phrases: {
          english: "You are cherished beyond measure by the Creator of all things. His love for you is not based on performance but on His unchanging character and covenant faithfulness.",
          korean: "당신은 만물의 창조주에 의해 측량할 수 없을 만큼 소중히 여겨집니다. 당신에 대한 그분의 사랑은 행위에 기초하지 않고 그분의 변하지 않는 성품과 언약의 신실하심에 기초합니다.",
          spanish: "Eres querido más allá de toda medida por el Creador de todas las cosas. Su amor por ti no se basa en el rendimiento sino en Su carácter inmutable y fidelidad del pacto.",
          french: "Tu es chéri au-delà de toute mesure par le Créateur de toutes choses. Son amour pour toi n'est pas basé sur la performance mais sur Son caractère immuable et Sa fidélité d'alliance.",
          german: "Du bist über alle Maßen geliebt vom Schöpfer aller Dinge. Seine Liebe zu dir basiert nicht auf Leistung, sondern auf Seinem unveränderlichen Charakter und Bundestreue."
        }
      };
    }
    
    // DEFAULT wisdom response for other verses
    else {
      phraseData = {
        type: 'wisdom',
        phrases: {
          english: "Let this divine truth take root in your heart, transforming how you see yourself, others, and your circumstances. God's Word never returns empty but accomplishes His purposes.",
          korean: "이 신성한 진리가 당신의 마음에 뿌리내려, 당신이 자신과 다른 사람들, 그리고 당신의 상황을 보는 방식을 변화시키게 하십시오. 하나님의 말씀은 결코 빈 손으로 돌아가지 않고 그분의 목적을 성취합니다.",
          spanish: "Deja que esta verdad divina eche raíces en tu corazón, transformando cómo te ves a ti mismo, a otros y a tus circunstancias. La Palabra de Dios nunca regresa vacía sino que cumple Sus propósitos.",
          french: "Laisse cette vérité divine prendre racine dans ton cœur, transformant la façon dont tu te vois, les autres et tes circonstances. La Parole de Dieu ne revient jamais vide mais accomplit Ses desseins.",
          german: "Lass diese göttliche Wahrheit in deinem Herzen Wurzeln schlagen und verwandle, wie du dich selbst, andere und deine Umstände siehst. Gottes Wort kehrt nie leer zurück, sondern erfüllt Seine Absichten."
        }
      };
    }
    
    // Use the verse hash to select a consistent variation for this specific verse
    const variations = Object.keys(phraseData.phrases);
    const selectedVariation = variations[verseHash % variations.length];
    
    return {
      type: phraseData.type,
      phrase: phraseData.phrases[language] || phraseData.phrases.english,
      language: language
    };
  }

  private createVerseHash(reference: string): number {
    let hash = 0;
    for (let i = 0; i < reference.length; i++) {
      const char = reference.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}

export const aiVerseAnalyzer = new AIVerseAnalyzer();