// AI Service for generating therapeutic journal responses
// This can be easily switched between different AI providers

interface AIResponse {
  response: string;
  error?: string;
}

// Mock AI service that simulates real AI responses
// Replace this with actual API calls to OpenAI, Claude, or other AI services
export class AIService {
  private static instance: AIService;
  
  private constructor() {}
  
  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateJournalResponse(journalText: string): Promise<AIResponse> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
      
      // Analyze the journal entry for emotional context
      const analysis = this.analyzeEmotionalContext(journalText);
      
      // Generate contextual response based on analysis
      const response = this.generateContextualResponse(journalText, analysis);
      
      return { response };
    } catch (error) {
      return { 
        response: "I'm here to listen and support you. Sometimes technology has hiccups, but your feelings are always valid and important.",
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private analyzeEmotionalContext(text: string): {
    emotions: string[];
    intensity: 'low' | 'medium' | 'high';
    themes: string[];
    needsSupport: boolean;
  } {
    const lowerText = text.toLowerCase();
    const words = lowerText.split(/\s+/);
    
    // Emotional keyword detection with intensity scoring
    const emotionalKeywords = {
      anxiety: {
        words: ['anxious', 'worried', 'nervous', 'stress', 'overwhelmed', 'fear', 'scared', 'panic', 'uncertain', 'restless'],
        intensity: 2
      },
      sadness: {
        words: ['sad', 'down', 'depressed', 'unhappy', 'terrible', 'bad', 'lonely', 'miserable', 'hurt', 'pain', 'crying', 'tears'],
        intensity: 2
      },
      anger: {
        words: ['angry', 'mad', 'frustrated', 'upset', 'annoyed', 'rage', 'hate', 'furious', 'irritated'],
        intensity: 2
      },
      joy: {
        words: ['happy', 'joy', 'excited', 'great', 'wonderful', 'good', 'amazing', 'fantastic', 'blessed', 'peaceful', 'grateful'],
        intensity: 1
      },
      fatigue: {
        words: ['tired', 'exhausted', 'drained', 'fatigue', 'burnout', 'worn', 'weary'],
        intensity: 1
      },
      hope: {
        words: ['hope', 'optimistic', 'better', 'improving', 'healing', 'growing', 'progress'],
        intensity: 1
      }
    };

    const themes = {
      relationships: ['relationship', 'partner', 'friend', 'family', 'love', 'breakup', 'marriage', 'dating'],
      work: ['work', 'job', 'career', 'boss', 'colleague', 'office', 'project', 'deadline'],
      health: ['health', 'sick', 'doctor', 'medicine', 'therapy', 'exercise', 'sleep'],
      personal: ['myself', 'identity', 'confidence', 'self-worth', 'goals', 'dreams', 'future'],
      loss: ['loss', 'grief', 'death', 'goodbye', 'missing', 'memorial', 'funeral']
    };

    let detectedEmotions: string[] = [];
    let totalIntensity = 0;
    let detectedThemes: string[] = [];

    // Detect emotions and calculate intensity
    Object.entries(emotionalKeywords).forEach(([emotion, data]) => {
      const matches = words.filter(word => data.words.includes(word)).length;
      if (matches > 0) {
        detectedEmotions.push(emotion);
        totalIntensity += matches * data.intensity;
      }
    });

    // Detect themes
    Object.entries(themes).forEach(([theme, keywords]) => {
      const matches = words.filter(word => keywords.includes(word)).length;
      if (matches > 0) {
        detectedThemes.push(theme);
      }
    });

    // Determine overall intensity
    let intensity: 'low' | 'medium' | 'high' = 'low';
    if (totalIntensity > 5) intensity = 'high';
    else if (totalIntensity > 2) intensity = 'medium';

    // Determine if extra support is needed
    const needsSupport = detectedEmotions.some(emotion => 
      ['anxiety', 'sadness', 'anger'].includes(emotion)
    ) && intensity !== 'low';

    return {
      emotions: detectedEmotions,
      intensity,
      themes: detectedThemes,
      needsSupport
    };
  }

  private generateContextualResponse(text: string, analysis: any): string {
    const { emotions, intensity, themes, needsSupport } = analysis;
    
    // Crisis support responses for high-intensity negative emotions
    if (needsSupport && intensity === 'high') {
      const crisisResponses = [
        "I can sense you're going through something really difficult right now. Your feelings are completely valid, and I want you to know that you're not alone. Sometimes when emotions feel overwhelming, it can help to reach out to someone you trust or a professional counselor. In this moment, let's focus on your breathing - can you take three slow, deep breaths with me?",
        "What you're experiencing sounds incredibly challenging, and I'm honored that you've shared this with me. When we're in intense emotional pain, it's important to remember that these feelings, while very real and valid, are temporary. You've survived difficult times before, and you have the strength to get through this too. Would it help to think of one small thing you can do right now to take care of yourself?",
        "I hear the depth of pain in your words, and I want you to know that reaching out by writing here shows incredible courage. Sometimes our darkest moments can feel endless, but like the night sky, even in the deepest darkness, there are still stars. If these feelings become too overwhelming, please consider talking to a counselor, trusted friend, or calling a support helpline. Right now, you're safe, and you matter."
      ];
      return crisisResponses[Math.floor(Math.random() * crisisResponses.length)];
    }

    // Emotion-specific responses
    if (emotions.includes('anxiety')) {
      const anxietyResponses = [
        "I can feel the weight of worry in your words. Anxiety often feels like carrying the weight of tomorrow's problems today. What if we tried to anchor ourselves in this present moment? Notice five things you can see around you, four things you can touch, three things you can hear. Your nervous system is trying to protect you, but right now, in this moment, you are safe.",
        "Anxiety can feel like a storm in your mind, with thoughts swirling and spinning. But remember, you are not your anxiety - you are the observer of these thoughts. Like clouds passing through the sky, these worried thoughts will move through you. What's one thing that usually helps you feel more grounded?",
        "The anxious mind often travels to futures that may never happen. Your brain is trying to solve problems that don't exist yet. Can we bring your attention back to right now? What's one thing going well in your life today, even if it's small?"
      ];
      return anxietyResponses[Math.floor(Math.random() * anxietyResponses.length)];
    }

    if (emotions.includes('sadness')) {
      const sadnessResponses = [
        "I can feel the heaviness in your heart through your words. Sadness is like rain - it feels overwhelming when you're in it, but it also nourishes growth. Your tears are not a sign of weakness; they're a sign of your deep capacity to feel and love. It's okay to sit with this sadness for a while. What would comfort feel like for you right now?",
        "There's a profound tenderness in sadness that shows how deeply you care. Like the moon's phases, our emotions have their own cycles. This sadness you're feeling is valid and temporary. You don't have to rush through it or fix it - sometimes we need to honor our sadness as part of our healing journey.",
        "Sadness can feel like being underwater, where everything is muffled and heavy. But even in the deepest ocean, there's still light filtering down from above. Your sadness tells a story of something that mattered to you. Can you be gentle with yourself as you navigate these deep waters?"
      ];
      return sadnessResponses[Math.floor(Math.random() * sadnessResponses.length)];
    }

    if (emotions.includes('anger')) {
      const angerResponses = [
        "I can sense the fire of anger in your words. Anger often carries important messages - it tells us when our boundaries have been crossed or when something matters deeply to us. Like a volcano, this energy needs a healthy way to be expressed. What is your anger trying to tell you? What boundary or value is it protecting?",
        "Anger can feel like lightning - intense, powerful, and demanding attention. It's okay to feel angry; it means you care about something important. The key is channeling this energy in a way that serves you. Can you feel where this anger lives in your body? Sometimes acknowledging its physical presence can help us understand its message.",
        "Your anger is valid, and it's telling you something important about what you value and need. Like fire, anger can be destructive or it can be the spark that ignites positive change. What would it look like to honor this anger while also taking care of yourself?"
      ];
      return angerResponses[Math.floor(Math.random() * angerResponses.length)];
    }

    if (emotions.includes('joy')) {
      const joyResponses = [
        "I can feel the light radiating from your words! Joy is like sunshine - it not only brightens your own world but also warms everyone around you. These moments of happiness are gifts to be savored. What do you think has contributed to this beautiful feeling? How can you carry a piece of this joy with you?",
        "Your happiness is contagious, even through text! Joy reminds us of life's magic and possibility. Like a flower blooming, your joy is a natural expression of your inner light. What aspects of this joyful experience do you want to remember and revisit when you need a boost?",
        "There's something so beautiful about witnessing someone's joy. Your positive energy is like ripples in a pond, spreading outward in ways you might not even realize. How does it feel to be in this space of happiness? What gratitude is arising for you?"
      ];
      return joyResponses[Math.floor(Math.random() * joyResponses.length)];
    }

    if (emotions.includes('fatigue')) {
      const fatigueResponses = [
        "I can hear the weariness in your words, like you're carrying a heavy backpack that you've been wearing for too long. Exhaustion is your body and mind's way of asking for rest and restoration. You don't have to earn the right to be tired - it's okay to acknowledge that you need to slow down. What would true rest look like for you?",
        "Feeling drained is like a phone battery that's been running too many apps for too long. Your energy is precious, and it sounds like you've been giving a lot of yourself. What if we thought about what activities or people actually recharge you versus what depletes you? You deserve to prioritize your own restoration.",
        "Tiredness can be physical, emotional, or spiritual - and it sounds like you might be experiencing all three. Like a garden that needs both sun and rest to grow, you need periods of activity and periods of restoration. What's one small way you could be gentler with yourself today?"
      ];
      return fatigueResponses[Math.floor(Math.random() * fatigueResponses.length)];
    }

    // Theme-specific responses
    if (themes.includes('relationships')) {
      const relationshipResponses = [
        "Relationships are like gardens - they require attention, patience, and sometimes weathering storms together. Whether you're celebrating connection or navigating challenges, remember that healthy relationships involve two whole people choosing to grow together. What does your heart need most in your relationships right now?",
        "The people we love have the power to bring us our greatest joy and sometimes our deepest challenges. This is the beautiful, complex nature of human connection. Your feelings about your relationships are valid, whatever they may be. What would love look like in this situation - both love for others and love for yourself?",
        "Relationships mirror back to us parts of ourselves we might not otherwise see. Whether you're experiencing harmony or conflict, there are gifts in every relationship dynamic. What is this relationship teaching you about yourself? How can you show up authentically while also honoring your own needs?"
      ];
      return relationshipResponses[Math.floor(Math.random() * relationshipResponses.length)];
    }

    // Default empathetic responses for mixed or unclear emotions
    const defaultResponses = [
      "Thank you for trusting me with your thoughts and feelings. I can sense there's a lot happening in your inner world right now. Like a complex piece of music, our emotions often have multiple layers and melodies playing at once. What feels most important for you to explore or understand right now?",
      "Your willingness to share your inner experience shows such courage and self-awareness. Life rarely fits into neat categories, and neither do our feelings. You're navigating something real and meaningful. What support do you need as you move through this experience?",
      "I'm holding space for everything you're feeling right now - the complexity, the contradictions, the uncertainty. Sometimes we don't need to figure everything out; sometimes we just need to be witnessed and understood. You are seen, you are heard, and your experience matters.",
      "There's wisdom in taking time to reflect on your inner world like this. Your thoughts and feelings are like weather patterns - constantly shifting and changing. What would it feel like to approach yourself with the same compassion you'd offer a dear friend going through something similar?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  // Method to generate follow-up questions for deeper exploration
  generateFollowUpQuestions(analysis: any): string[] {
    const { emotions, themes } = analysis;
    
    const questions = [];
    
    if (emotions.includes('anxiety')) {
      questions.push(
        "What would it feel like if you could let go of trying to control this situation?",
        "When you imagine your wisest, most compassionate self, what advice would they give you?",
        "What's one small step you could take today that would feel nurturing?"
      );
    }
    
    if (emotions.includes('sadness')) {
      questions.push(
        "What would you want to say to this sadness if it were a friend visiting you?",
        "How can you honor what you're grieving while also caring for your present self?",
        "What does your heart need most right now?"
      );
    }
    
    if (themes.includes('relationships')) {
      questions.push(
        "What boundaries would serve you well in this relationship?",
        "How can you show up authentically while also protecting your energy?",
        "What would love look like in this situation?"
      );
    }
    
    // Default questions
    if (questions.length === 0) {
      questions.push(
        "What would it feel like to approach this situation with curiosity instead of judgment?",
        "If you could give yourself exactly what you need right now, what would that be?",
        "What's one thing you're grateful for, even in the midst of this challenge?"
      );
    }
    
    return questions.slice(0, 2); // Return up to 2 questions
  }
}

export const aiService = AIService.getInstance();