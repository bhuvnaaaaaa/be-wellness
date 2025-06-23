import { GoogleGenerativeAI } from '@google/generative-ai';

interface GeminiResponse {
  response: string;
  error?: string;
}

export class GeminiService {
  private static instance: GeminiService;
  private genAI: GoogleGenerativeAI | null = null;
  
  private constructor() {
    this.initializeClient();
  }
  
  static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  private initializeClient() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your environment variables.');
      return;
    }

    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
    } catch (error) {
      console.error('Failed to initialize Gemini client:', error);
    }
  }

  async generateJournalResponse(journalText: string): Promise<GeminiResponse> {
    if (!this.genAI) {
      return {
        response: "I'm here to listen and support you. To enable AI-powered responses, please add your Gemini API key to the environment variables.",
        error: "Gemini API not configured"
      };
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = this.createTherapeuticPrompt(journalText);
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();

      return { response: responseText };
    } catch (error) {
      console.error('Gemini API error:', error);
      
      // Fallback to empathetic response
      return {
        response: "I'm here to listen and support you. Sometimes technology has hiccups, but your feelings are always valid and important. Would you like to try sharing again?",
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private createTherapeuticPrompt(journalText: string): string {
    return `You are a compassionate, empathetic AI therapist providing supportive responses to someone's journal entry. Your role is to:

1. Validate their emotions without judgment
2. Offer gentle insights and perspective
3. Use therapeutic techniques like reflection, reframing, and grounding
4. Be warm, caring, and professional
5. Encourage self-compassion and healthy coping
6. Use metaphors and gentle language when appropriate
7. Keep responses to 2-3 paragraphs maximum
8. If someone expresses crisis-level distress, gently suggest professional help while still being supportive

Guidelines:
- Never diagnose or provide medical advice
- Focus on emotional support and validation
- Use "I" statements to show empathy ("I can sense...", "I hear...")
- Ask gentle, open-ended questions to encourage reflection
- Acknowledge their courage in sharing
- Offer hope while validating current struggles

Here is their journal entry:

"${journalText}"

Please provide a thoughtful, therapeutic response that validates their experience and offers gentle support and insight.`;
  }

  async generateFollowUpQuestions(journalText: string): Promise<string[]> {
    if (!this.genAI) {
      return [
        "What would it feel like to approach this situation with curiosity instead of judgment?",
        "If you could give yourself exactly what you need right now, what would that be?"
      ];
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Based on this journal entry, generate 2-3 thoughtful, therapeutic follow-up questions that would help the person explore their feelings deeper. The questions should be:

1. Open-ended and non-judgmental
2. Focused on self-reflection and insight
3. Encouraging of self-compassion
4. Relevant to their specific situation
5. Therapeutic in nature

Journal entry: "${journalText}"

Please provide only the questions, one per line, without numbering or bullet points.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();

      return responseText
        .split('\n')
        .filter(line => line.trim().length > 0)
        .slice(0, 3);
    } catch (error) {
      console.error('Error generating follow-up questions:', error);
      return [
        "What would it feel like to approach this situation with curiosity instead of judgment?",
        "If you could give yourself exactly what you need right now, what would that be?"
      ];
    }
  }
}

export const geminiService = GeminiService.getInstance();