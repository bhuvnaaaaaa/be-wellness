import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, MessageCircle, Lightbulb, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { geminiService } from '../utils/geminiService';

const Journal: React.FC = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (isLoading || !journalEntry.trim()) return;
    
    setIsLoading(true);
    setAiResponse(null);
    setFollowUpQuestions([]);
    setShowQuestions(false);
    setApiError(null);
    
    try {
      const result = await geminiService.generateJournalResponse(journalEntry);
      
      if (result.error) {
        setApiError(result.error);
      }
      
      setAiResponse(result.response);
      
      // Generate follow-up questions after a brief delay
      setTimeout(async () => {
        setIsLoadingQuestions(true);
        try {
          const questions = await geminiService.generateFollowUpQuestions(journalEntry);
          setFollowUpQuestions(questions);
        } catch (error) {
          console.error('Error generating follow-up questions:', error);
          // Provide fallback questions
          setFollowUpQuestions([
            "What would it feel like to approach this situation with curiosity instead of judgment?",
            "If you could give yourself exactly what you need right now, what would that be?"
          ]);
        } finally {
          setIsLoadingQuestions(false);
        }
      }, 1000);
      
    } catch (error) {
      console.error('Error generating AI response:', error);
      setAiResponse("I'm here to listen and support you. Sometimes technology has hiccups, but your feelings are always valid and important. Would you like to try sharing again?");
      setApiError("Unable to connect to AI service");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewEntry = () => {
    setJournalEntry('');
    setAiResponse(null);
    setFollowUpQuestions([]);
    setShowQuestions(false);
    setApiError(null);
  };

  const toggleQuestions = () => {
    setShowQuestions(!showQuestions);
  };

  return (
    <div className="space-bg min-h-screen flex flex-col items-center justify-start p-4 pt-12 pb-24 relative overflow-hidden">
      {/* Celestial Objects */}
      <div className="celestial-object planet w-24 h-24 top-1/4 left-1/4 animate-orbit opacity-30" />
      <div className="celestial-object planet w-16 h-16 bottom-1/4 right-1/4 animate-orbit-reverse opacity-20" />
      <div className="celestial-object w-2 h-2 bg-purple-300 top-1/3 right-1/3 animate-twinkle" />
      <div className="celestial-object w-2 h-2 bg-pink-300 bottom-1/3 left-1/3 animate-twinkle" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto space-y-8 relative z-10"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-display font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-200 animate-glow tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          How are you feeling today?
        </motion.h1>

        {/* API Configuration Notice */}
        {!import.meta.env.VITE_GEMINI_API_KEY && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-500/10 backdrop-blur-lg rounded-xl p-4 border border-amber-500/20"
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-200">
                <p className="font-medium mb-1">AI Integration Available</p>
                <p>To enable Gemini AI responses, add your Google API key to the environment variables as <code className="bg-amber-500/20 px-1 rounded">VITE_GEMINI_API_KEY</code>. Currently using fallback responses.</p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Share what's on your mind... I'm here to listen with empathy and understanding."
            className="w-full h-48 bg-white/10 backdrop-blur-lg rounded-xl p-6 text-purple-100 placeholder-purple-300/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-[0_0_30px_rgba(167,139,250,0.2)] font-body text-lg leading-relaxed tracking-wide elegant-body"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 -z-10 blur-xl" />
        </motion.div>

        <motion.button
          onClick={handleSubmit}
          className="group relative w-full px-8 py-4 text-xl font-display font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(167,139,250,0.5)] focus:outline-none disabled:opacity-50 tracking-wide"
          disabled={isLoading || !journalEntry.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <Heart className="w-6 h-6 animate-pulse" />
            <span>{isLoading ? "Listening with care..." : "Share with Me"}</span>
          </div>
        </motion.button>

        <AnimatePresence>
          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-[0_0_30px_rgba(167,139,250,0.2)] border border-white/10">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-display font-semibold text-purple-200">
                        {import.meta.env.VITE_GEMINI_API_KEY ? 'Gemini AI Response' : 'Thoughtful Response'}
                      </h3>
                      {import.meta.env.VITE_GEMINI_API_KEY && (
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      )}
                    </div>
                    <p className="text-lg text-purple-100 leading-relaxed font-body tracking-wide elegant-body whitespace-pre-wrap">{aiResponse}</p>
                    {apiError && (
                      <div className="mt-3 text-sm text-amber-300 bg-amber-500/10 p-2 rounded-lg">
                        Note: Using fallback response due to API configuration
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Follow-up Questions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/5"
              >
                <button
                  onClick={toggleQuestions}
                  className="flex items-center space-x-2 text-purple-200 hover:text-purple-100 transition-colors mb-4"
                  disabled={isLoadingQuestions}
                >
                  <Lightbulb className="w-5 h-5" />
                  <span className="font-display font-medium">
                    {isLoadingQuestions ? 'Generating Reflection Questions...' : 'Reflection Questions'}
                  </span>
                  {isLoadingQuestions ? (
                    <div className="w-4 h-4 border-2 border-purple-300/20 border-t-purple-300 rounded-full animate-spin" />
                  ) : (
                    <motion.div
                      animate={{ rotate: showQuestions ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4 transform rotate-90" />
                    </motion.div>
                  )}
                </button>
                
                <AnimatePresence>
                  {showQuestions && followUpQuestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      {followUpQuestions.map((question, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-3 flex-shrink-0" />
                          <p className="text-purple-200 font-body elegant-body leading-relaxed">{question}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="space-y-4">
                <p className="text-center text-xl text-purple-200 font-display elegant-italic">
                  Would you like to try a calming meditation?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    onClick={() => navigate('/meditations')}
                    className="px-6 py-3 bg-purple-600/30 hover:bg-purple-600/50 rounded-full flex items-center justify-center space-x-2 transition-colors font-body tracking-wide"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Guide me to peace</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={handleNewEntry}
                    className="px-6 py-3 bg-pink-600/30 hover:bg-pink-600/50 rounded-full flex items-center justify-center space-x-2 transition-colors font-body tracking-wide"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Write another entry</span>
                    <Sparkles className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Journal;