# Be - AI-Powered Wellness App

A beautiful, space-themed wellness application that provides daily affirmations, AI-powered journal responses, and guided meditations.

## Features

- **Daily Affirmations**: Cosmic-themed affirmations organized by categories (self-love, strength, abundance, peace, growth, cosmic, purpose, gratitude)
- **AI-Powered Journal**: Therapeutic responses powered by Google Gemini AI with follow-up reflection questions
- **Guided Meditations**: Collection of calming meditations with audio playback
- **Elegant Design**: Space-themed UI with smooth animations and responsive design

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Gemini AI (Optional)**
   - Copy `.env.example` to `.env`
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add your key to the `.env` file:
     ```
     VITE_GEMINI_API_KEY=your_api_key_here
     ```
   - Restart the development server

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## AI Integration

The journal feature uses Google's Gemini AI to provide therapeutic, empathetic responses to user entries. The AI:

- Validates emotions without judgment
- Offers gentle insights and perspective
- Uses therapeutic techniques like reflection and reframing
- Generates personalized follow-up questions
- Maintains a warm, caring, and professional tone

If no API key is provided, the app falls back to pre-written therapeutic responses.

## Technologies Used

- **React 18** with TypeScript
- **Vite** for development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Google Gemini AI** for journal responses
- **Lucide React** for icons

## Production Notes

For production deployment:
- Move API calls to a backend server for security
- Never expose API keys in client-side code
- Consider implementing user authentication
- Add proper error handling and monitoring

## License

This project is for educational and personal use.