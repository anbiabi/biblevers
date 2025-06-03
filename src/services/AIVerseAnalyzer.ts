
import { BibleVerse } from '@/data/bibleVerses';

export interface ContextualPhrase {
  type: 'comfort' | 'encouragement' | 'empowerment' | 'wisdom';
  phrase: string;
}

class AIVerseAnalyzer {
  generateContextualPhrase(verse: BibleVerse): ContextualPhrase {
    const text = verse.text.english.toLowerCase();
    const topics = verse.topics.map(t => t.toLowerCase());
    
    // Analyze verse content for themes and generate appropriate response
    
    // COMFORT themes
    if (text.includes('comfort') || text.includes('peace') || text.includes('rest') || 
        text.includes('weep') || text.includes('mourn') || text.includes('trouble') ||
        topics.includes('comfort') || topics.includes('peace')) {
      
      if (text.includes('valley') || text.includes('shadow')) {
        return {
          type: 'comfort',
          phrase: "Even in life's darkest valleys, God's presence illuminates the path ahead. His comfort transforms our deepest sorrows into testimonies of His unfailing love."
        };
      } else if (text.includes('cast') && text.includes('care')) {
        return {
          type: 'comfort',
          phrase: "Release every burden into God's capable hands. He who crafted the universe with precision holds your concerns with infinite tenderness and perfect understanding."
        };
      } else if (text.includes('peace')) {
        return {
          type: 'comfort',
          phrase: "God's peace transcends human comprehension, settling deep within your spirit like calm waters after a storm. Let this divine tranquility anchor your troubled heart."
        };
      } else {
        return {
          type: 'comfort',
          phrase: "In your moment of need, God draws near with healing in His wings. His compassionate heart beats in rhythm with yours, bringing restoration to every broken place."
        };
      }
    }
    
    // EMPOWERMENT themes
    else if (text.includes('strength') || text.includes('power') || text.includes('mighty') ||
             text.includes('overcome') || text.includes('victory') || text.includes('conquer') ||
             topics.includes('strength') || topics.includes('power')) {
      
      if (text.includes('all things') || text.includes('everything')) {
        return {
          type: 'empowerment',
          phrase: "Divine strength courses through your spirit, enabling you to rise above every circumstance. What seems impossible becomes achievable through God's limitless power working within you."
        };
      } else if (text.includes('mountain') || text.includes('move')) {
        return {
          type: 'empowerment',
          phrase: "Faith unleashes God's mountain-moving power through your prayers and declarations. Obstacles that appear immovable bow before the authority Christ has given you."
        };
      } else {
        return {
          type: 'empowerment',
          phrase: "You carry heaven's authority within you. Rise with confidence, knowing that the same power that conquered death flows through your veins, empowering you for victory."
        };
      }
    }
    
    // ENCOURAGEMENT themes
    else if (text.includes('hope') || text.includes('future') || text.includes('promise') ||
             text.includes('faith') || text.includes('trust') || text.includes('believe') ||
             topics.includes('hope') || topics.includes('faith') || topics.includes('trust')) {
      
      if (text.includes('plans') || text.includes('future')) {
        return {
          type: 'encouragement',
          phrase: "God's blueprint for your life surpasses your wildest dreams. Trust His timing and methods as He unfolds a future filled with purpose, blessing, and divine appointments."
        };
      } else if (text.includes('faith') || text.includes('believe')) {
        return {
          type: 'encouragement',
          phrase: "Your faith is the key that unlocks heaven's treasures. Stand firm in belief, for God honors every step of trust with demonstrations of His faithfulness."
        };
      } else if (text.includes('wait') || text.includes('patient')) {
        return {
          type: 'encouragement',
          phrase: "In waiting, your character is refined like gold. God uses these seasons to prepare you for the greater things He has in store. Your breakthrough is being perfected."
        };
      } else {
        return {
          type: 'encouragement',
          phrase: "Hold fast to hope, for God's promises never fail. What He has spoken over your life will come to pass in His perfect timing and beautiful way."
        };
      }
    }
    
    // WISDOM themes
    else if (text.includes('wisdom') || text.includes('understand') || text.includes('know') ||
             text.includes('truth') || text.includes('word') || text.includes('teach') ||
             topics.includes('wisdom') || topics.includes('truth')) {
      
      if (text.includes('word') || text.includes('scripture')) {
        return {
          type: 'wisdom',
          phrase: "God's Word is your compass in life's journey, providing direction when paths seem unclear. Let divine truth illuminate every decision and transform your perspective."
        };
      } else if (text.includes('seek') || text.includes('ask')) {
        return {
          type: 'wisdom',
          phrase: "Heavenly wisdom awaits those who earnestly seek it. God delights in revealing His mysteries to hearts that hunger for understanding and truth."
        };
      } else {
        return {
          type: 'wisdom',
          phrase: "Divine understanding surpasses earthly knowledge. Allow God's wisdom to guide your thoughts, decisions, and responses, bringing clarity to life's complexities."
        };
      }
    }
    
    // LOVE themes
    else if (text.includes('love') || text.includes('beloved') || topics.includes('love')) {
      return {
        type: 'encouragement',
        phrase: "You are cherished beyond measure by the Creator of all things. His love for you is not based on performance but on His unchanging character and covenant faithfulness."
      };
    }
    
    // DEFAULT wisdom response for other verses
    else {
      return {
        type: 'wisdom',
        phrase: "Let this divine truth take root in your heart, transforming how you see yourself, others, and your circumstances. God's Word never returns empty but accomplishes His purposes."
      };
    }
  }
}

export const aiVerseAnalyzer = new AIVerseAnalyzer();
