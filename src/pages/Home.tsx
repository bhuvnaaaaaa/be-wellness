import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Volume2, VolumeX, Rocket, RefreshCw, Save } from 'lucide-react';

// Expanded AI affirmation collection organized by themes - all in first person "I" perspective
const getAffirmationFromAI = () => {
  const affirmationCategories = {
    selfLove: [
      "I am worthy of love, respect, and all the beautiful things life has to offer.",
      "My heart is a sanctuary of peace, and I deserve to treat myself with infinite kindness.",
      "I am enough, exactly as I am, in this very moment.",
      "My soul radiates a unique light that no one else in the universe can shine.",
      "I deserve the same compassion I so freely give to others.",
      "My imperfections are not flaws—they are the brushstrokes that make me a masterpiece.",
      "I am my own best friend, and I choose to speak to myself with love.",
      "My worth is not determined by my achievements—I am valuable simply because I exist."
    ],
    strength: [
      "I have survived 100% of my difficult days so far—I am stronger than I know.",
      "Like a diamond formed under pressure, my challenges are creating something beautiful within me.",
      "I carry within me the power to overcome any obstacle that stands in my way.",
      "My resilience is like the ocean—vast, deep, and capable of weathering any storm.",
      "Every challenge I face is preparing me for a victory I can't yet imagine.",
      "I am not just surviving—I am thriving, growing, and becoming more powerful each day.",
      "My courage doesn't always roar; sometimes it's the quiet voice that says 'I'll try again tomorrow.'",
      "I have the strength of mountains and the flexibility of rivers flowing toward my dreams."
    ],
    abundance: [
      "The universe is conspiring to bring me everything I need at the perfect time.",
      "I am a magnet for miracles, opportunities, and abundant blessings.",
      "My potential is infinite, just like the stars that light up the endless sky.",
      "Prosperity flows to me easily and effortlessly from multiple sources.",
      "I deserve abundance in all areas of my life—love, health, wealth, and joy.",
      "Every door that closes is making space for something even more wonderful to enter my life.",
      "I am aligned with the frequency of abundance and success.",
      "The universe celebrates my dreams and supports my highest good."
    ],
    peace: [
      "In this moment, I choose peace over worry, love over fear, and trust over doubt.",
      "My breath is an anchor that brings me back to the calm center of my being.",
      "Like a still lake reflecting the sky, my mind can find perfect tranquility.",
      "I release what I cannot control and embrace the serenity of acceptance.",
      "Peace is not the absence of storms—it's finding calm within them, and I have that power.",
      "My inner sanctuary is always available to me, no matter what chaos surrounds me.",
      "I am safe, I am loved, and I am exactly where I need to be.",
      "With each exhale, I release tension; with each inhale, I welcome peace."
    ],
    growth: [
      "Every experience, whether joyful or challenging, is helping me evolve into my highest self.",
      "I am not the same person I was yesterday—I am constantly growing and expanding.",
      "My journey is unique, and I trust the process of my own unfolding.",
      "Like a tree reaching toward the sun, I naturally grow toward my greatest potential.",
      "I embrace change as the universe's way of guiding me toward something better.",
      "My willingness to learn and grow makes me unstoppable.",
      "Every setback is a setup for an even greater comeback in my life.",
      "I am becoming the person I was always meant to be."
    ],
    cosmic: [
      "I am made of stardust and carry the wisdom of the cosmos within my soul.",
      "Like the moon influences the tides, my presence creates ripples of positive change.",
      "I am a unique constellation in the galaxy of humanity, shining my own special light.",
      "The same force that moves planets and creates galaxies flows through me.",
      "I am both a drop in the ocean and the entire ocean in a drop.",
      "My energy is connected to every star, every planet, every living being in existence.",
      "I am a cosmic miracle, a perfect expression of the universe experiencing itself.",
      "Like the aurora dancing across the sky, my spirit is a beautiful display of divine energy."
    ],
    purpose: [
      "My life has meaning and purpose that extends far beyond what I can currently see.",
      "I am here for a reason, and the world needs exactly what I have to offer.",
      "My unique gifts and talents are meant to be shared with the world.",
      "Every step I take is leading me closer to my divine purpose.",
      "I make a difference simply by being authentically myself.",
      "My story matters, my voice matters, and my presence matters.",
      "I am exactly where I need to be on my journey of purpose and meaning.",
      "The universe has invested in me because I have something special to contribute."
    ],
    gratitude: [
      "My heart overflows with gratitude for all the blessings, seen and unseen, in my life.",
      "Every breath is a gift, every heartbeat a miracle, every moment a treasure that I cherish.",
      "I attract more of what I appreciate, and my gratitude multiplies my joy.",
      "Even in difficult times, I can find something to be thankful for.",
      "My grateful heart is a magnet for abundance and happiness.",
      "I appreciate the journey as much as the destination.",
      "Gratitude transforms what I have into enough, and more than enough.",
      "My thankful spirit illuminates the beauty in ordinary moments."
    ]
  };

  // Randomly select a category and then a random affirmation from that category
  const categories = Object.keys(affirmationCategories);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const categoryAffirmations = affirmationCategories[randomCategory as keyof typeof affirmationCategories];
  
  return categoryAffirmations[Math.floor(Math.random() * categoryAffirmations.length)];
};

const Home: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [affirmation, setAffirmation] = useState<string | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleGetAffirmation = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    if (!isMuted && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    // Simulate API call with timeout
    setTimeout(() => {
      setAffirmation(getAffirmationFromAI());
      setIsLoading(false);
    }, 2000);
  };

  const handleRegenerate = () => {
    setAffirmation(null);
    handleGetAffirmation();
  };

  const handleSave = () => {
    // Placeholder for save functionality
    alert('Affirmation saved! (Placeholder functionality)');
  };

  const handleRocketClick = () => {
    if (!isLaunching) {
      setIsLaunching(true);
      setTimeout(() => setIsLaunching(false), 2500);
    }
  };

  return (
    <div className="space-bg min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <audio ref={audioRef} src="/sounds/space-dive.mp3" />
      
      {/* Celestial Objects */}
      <div className="celestial-object planet w-24 h-24 top-1/4 left-1/4 animate-orbit opacity-30" />
      <div className="celestial-object planet w-16 h-16 bottom-1/4 right-1/4 animate-orbit-reverse opacity-20" />
      <div className="celestial-object w-2 h-2 bg-purple-300 top-1/3 right-1/3 animate-twinkle" />
      <div className="celestial-object w-2 h-2 bg-pink-300 bottom-1/3 left-1/3 animate-twinkle" />
      <div className="celestial-object w-3 h-3 bg-blue-300 top-2/3 left-2/3 animate-twinkle" />
      
      {/* Asteroid Belt */}
      <div className="absolute w-full h-full pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="celestial-object bg-gray-400/20 animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-4xl w-full mx-auto text-center space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-7xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-200 animate-glow tracking-tight">
            Be
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 font-body font-light elegant-italic tracking-wide">
            A daily boost for your soul
          </p>
        </div>

        {/* Floating Rocket Avatar */}
        <motion.div 
          className="my-12 relative cursor-pointer"
          initial={{ y: 0 }}
          animate={
            isLaunching 
              ? {
                  y: [-50, -200, -400, -600],
                  scale: [1, 0.9, 0.7, 0.5],
                  transition: { 
                    duration: 2,
                    times: [0, 0.3, 0.6, 1],
                    ease: "easeOut"
                  }
                }
              : isLoading 
              ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                  transition: { duration: 2, ease: "easeInOut", repeat: Infinity }
                }
              : {
                  y: [0, -20, 0],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }
          }
          onClick={handleRocketClick}
        >
          <AnimatePresence>
            {isLaunching && (
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-32"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0, 1, 0.8],
                  scale: [0.5, 1.2, 1],
                  y: [0, 20, 10]
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, repeat: 4 }}
              >
                <div className="w-full h-full bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent opacity-75 rounded-full blur-md" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-400/20 rounded-full blur-xl transform scale-150" />
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-pink-400 shadow-[0_0_100px_rgba(167,139,250,0.3)] flex items-center justify-center backdrop-blur-sm">
            <motion.div
              animate={
                isLaunching 
                  ? { rotate: [-45, -45] }
                  : { rotate: [-45, -43, -45] }
              }
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Rocket className="w-16 h-16 md:w-20 md:h-20 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Affirmation Card */}
        <AnimatePresence mode="wait">
          {affirmation ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-[0_0_50px_rgba(167,139,250,0.2)] relative overflow-hidden"
            >
              <motion.p 
                className="text-2xl text-purple-100 leading-relaxed font-body tracking-wide elegant-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {affirmation}
              </motion.p>
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  onClick={handleRegenerate}
                  className="px-4 py-2 flex items-center space-x-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-full transition-colors font-body"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Regenerate</span>
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 flex items-center space-x-2 bg-pink-600/30 hover:bg-pink-600/50 rounded-full transition-colors font-body"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.button
              onClick={handleGetAffirmation}
              className="group relative px-8 py-4 text-xl font-display font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(167,139,250,0.5)] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent backdrop-blur-sm disabled:opacity-50 tracking-wide"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="w-6 h-6 animate-twinkle" />
                <span>{isLoading ? "Channeling cosmic energy..." : "Give Me My Affirmation"}</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Footer text */}
        <p className="text-purple-300/80 text-sm mt-12 font-body elegant-italic tracking-wide">
          Take a moment to breathe and center yourself in this cosmic journey
        </p>
      </div>
    </div>
  );
};

export default Home;