import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, SkipBack, SkipForward, Volume2, BookOpen, AlertCircle, FolderOpen } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import { Meditation } from '../types/meditation';

const meditations: Meditation[] = [
  {
    id: 'breathe-calm',
    title: 'Breathe Into Calm',
    duration: 5,
    description: 'A gentle journey to peace through mindful breathing',
    imageUrl: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    audioUrl: '/audio/Breathe.mp3',
    script: 'Find a comfortable position and close your eyes. Take a deep breath in through your nose, feeling your lungs expand fully. Hold for a moment, then slowly exhale through your mouth, releasing any tension you may be holding. Continue this rhythm, allowing each breath to bring you deeper into a state of calm and peace. With each inhale, imagine drawing in serenity and light. With each exhale, release any worries or stress from your day. Feel your body becoming more relaxed with every breath. Notice how your shoulders drop, your jaw softens, and your mind begins to quiet. You are safe in this moment, surrounded by peace and tranquility.'
  },
  {
    id: 'let-go',
    title: 'Let Go of Stress',
    duration: 10,
    description: 'Release tension and find your center',
    imageUrl: 'https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    audioUrl: '/audio/LetGoOfStress.mp3',
    script: 'Allow yourself to settle into this moment of peace. Notice where you hold stress in your body - perhaps in your shoulders, your jaw, or your stomach. With each exhale, imagine releasing this tension, letting it flow out of your body like water. You are safe, you are supported, and you can let go. Visualize stress as a dark cloud that has been following you. With each breath, see this cloud becoming lighter and lighter until it dissolves completely. Feel the warmth of relaxation spreading through your entire body, from the top of your head down to your toes. You have the power to release what no longer serves you. Trust in your ability to find peace within yourself.'
  },
  {
    id: 'safe-space',
    title: 'Safe Space Visualization',
    duration: 5,
    description: 'Create your personal sanctuary of peace',
    imageUrl: 'https://images.unsplash.com/photo-1520179432903-03d08e6ef07a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    audioUrl: '/audio/SafeSpace.mp3',
    script: 'Imagine a place where you feel completely safe and at peace. This might be a real place from your memory, or somewhere entirely from your imagination. See the colors, feel the textures, hear the sounds. This is your sanctuary, and you can return here whenever you need comfort and peace. Perhaps it\'s a cozy cabin by a lake, a beautiful garden filled with flowers, or a peaceful beach at sunset. Notice every detail of this special place. Feel how secure and loved you are here. This is your inner sanctuary, always available to you whenever you need to find peace and safety within yourself.'
  },
  {
    id: 'sleep-soothe',
    title: 'Sleep & Soothe',
    duration: 10,
    description: 'Drift into peaceful, restorative sleep',
    imageUrl: 'https://images.unsplash.com/photo-1661002404350-17520a5f0f2a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    audioUrl: '/audio/SleepAndSoothe.mp3',
    script: 'As you prepare for sleep, let your body sink into comfort. Feel the weight of the day lifting from your shoulders. Your breathing naturally slows and deepens. Each exhale takes you further into relaxation, preparing your mind and body for restorative, peaceful sleep. Imagine yourself floating on a cloud of pure comfort and safety. Feel all tension melting away from your muscles. Your mind is becoming quiet and still, like a peaceful lake at twilight. You are ready to drift into deep, healing sleep, knowing that you will wake refreshed and renewed.'
  },
  {
    id: 'self-love',
    title: 'Self-Love Activation',
    duration: 5,
    description: 'Nurture your inner light and cultivate self-compassion',
    imageUrl: 'https://images.unsplash.com/photo-1498026474556-93048b8493d8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    audioUrl: '/audio/SelfLove.mp3',
    script: 'Place your hand on your heart and feel its gentle rhythm. This heart has carried you through every moment of your life. Send love and gratitude to yourself - for your strength, your resilience, your unique gifts. You are worthy of love, especially from yourself. Speak to yourself with the same kindness you would offer a dear friend. Acknowledge all the ways you have grown and all the challenges you have overcome. You are enough, exactly as you are. Feel this love radiating from your heart, filling every cell of your being with warmth and acceptance.'
  },
  {
    id: 'healing-heart',
    title: 'Healing Through the Heart',
    duration: 10,
    description: 'Open your heart to healing and renewal',
    imageUrl: 'https://images.unsplash.com/photo-1556647034-7aa9a4ea7437?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    audioUrl: '/audio/Healing.mp3',
    script: 'Breathe into your heart space and feel it expanding with love. If there are wounds that need healing, send them gentle compassion. Your heart has an infinite capacity for healing and renewal. Trust in your ability to heal and grow stronger through love. Visualize a warm, golden light emanating from your heart center. This light has the power to heal any pain, to mend any wounds, to restore your spirit. Allow this healing energy to flow through every part of your being, bringing peace, wholeness, and renewal. You are resilient, you are strong, and you are capable of profound healing.'
  }
];

const Meditations: React.FC = () => {
  const [selectedMeditation, setSelectedMeditation] = useState<Meditation | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [useTextMode, setUseTextMode] = useState(false);
  const [showAudioHelp, setShowAudioHelp] = useState(false);
  const { audioState, loadAudio, play, pause, stop, seek, setVolume: setAudioVolume, clearError } = useAudio();

  const handlePlay = async (meditation: Meditation) => {
    try {
      setSelectedMeditation(meditation);
      setUseTextMode(false);
      clearError();
      
      await loadAudio(meditation.id, meditation.audioUrl);
      await play();
    } catch (error) {
      console.error('Error playing meditation:', error);
      // Auto-switch to text mode if audio fails
      setUseTextMode(true);
    }
  };

  const handleTextMode = (meditation: Meditation) => {
    setSelectedMeditation(meditation);
    setUseTextMode(true);
    stop(); // Stop any playing audio
  };

  const handlePause = () => {
    pause();
  };

  const handleStop = () => {
    stop();
    setSelectedMeditation(null);
    setUseTextMode(false);
  };

  const handleSeek = (direction: 'forward' | 'backward') => {
    const seconds = direction === 'forward' ? 10 : -10;
    seek(seconds);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setAudioVolume(newVolume);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRetry = () => {
    if (selectedMeditation) {
      clearError();
      handlePlay(selectedMeditation);
    }
  };

  return (
    <div className="space-bg min-h-screen p-4 pt-12 pb-24 relative overflow-hidden">
      {/* Floating Nebulae */}
      <div className="nebula celestial-object w-96 h-96 top-10 -left-20 animate-nebula opacity-30" />
      <div className="nebula celestial-object w-80 h-80 bottom-20 -right-20 animate-nebula opacity-25" 
           style={{ animationDelay: '5s' }} />
      <div className="nebula celestial-object w-64 h-64 top-1/2 left-1/3 animate-nebula opacity-20" 
           style={{ animationDelay: '10s' }} />

      {/* Celestial Objects */}
      <div className="celestial-object planet w-24 h-24 top-1/4 left-1/4 animate-orbit opacity-40" />
      <div className="celestial-object planet w-16 h-16 bottom-1/4 right-1/4 animate-orbit-reverse opacity-30" />
      <div className="celestial-object w-3 h-3 bg-purple-300 top-1/3 right-1/3 animate-twinkle" />
      <div className="celestial-object w-2 h-2 bg-pink-300 bottom-1/3 left-1/3 animate-twinkle" />
      <div className="celestial-object w-4 h-4 bg-blue-300 top-2/3 left-2/3 animate-twinkle" 
           style={{ animationDelay: '1s' }} />
      <div className="celestial-object w-2 h-2 bg-indigo-300 top-1/5 right-1/5 animate-twinkle" 
           style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto space-y-8 relative z-10"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-display font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-200 animate-glow mb-12 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Guided Meditations
        </motion.h1>

        {/* Audio Setup Help Banner */}
        <AnimatePresence>
          {showAudioHelp && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 mb-8"
            >
              <div className="flex items-start gap-4">
                <FolderOpen className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-display font-semibold text-blue-200 mb-2">Audio Files Setup Required</h3>
                  <p className="text-blue-300 mb-4 leading-relaxed">
                    To enable audio playback, please add the meditation MP3 files to the <code className="bg-blue-800/30 px-2 py-1 rounded text-blue-200">public/audio/</code> folder:
                  </p>
                  <ul className="text-blue-300 space-y-1 mb-4 text-sm">
                    <li>• <strong>Breathe.mp3</strong> - "Breathe Into Calm" meditation</li>
                    <li>• <strong>LetGoOfStress.mp3</strong> - "Let Go of Stress" meditation</li>
                    <li>• <strong>SafeSpace.mp3</strong> - "Safe Space Visualization" meditation</li>
                    <li>• <strong>SleepAndSoothe.mp3</strong> - "Sleep & Soothe" meditation</li>
                    <li>• <strong>SelfLove.mp3</strong> - "Self-Love Activation" meditation</li>
                    <li>• <strong>Healing.mp3</strong> - "Healing Through the Heart" meditation</li>
                  </ul>
                  <p className="text-blue-300 text-sm">
                    Until then, you can use the "Read Script" feature to access the meditation content.
                  </p>
                </div>
                <button
                  onClick={() => setShowAudioHelp(false)}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Player */}
        <AnimatePresence>
          {selectedMeditation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-8 shadow-[0_0_30px_rgba(167,139,250,0.2)] border border-white/10"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/3">
                  <motion.img
                    src={selectedMeditation.imageUrl}
                    alt={selectedMeditation.title}
                    className="w-full h-48 object-cover rounded-2xl shadow-lg"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-display font-semibold text-purple-200 tracking-wide">{selectedMeditation.title}</h3>
                  <p className="text-purple-300/80 font-body leading-relaxed tracking-wide">{selectedMeditation.description}</p>
                  
                  {useTextMode ? (
                    <div className="bg-white/5 rounded-xl p-6 max-h-64 overflow-y-auto">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-display font-medium text-purple-200">Meditation Script</h4>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handlePlay(selectedMeditation)}
                            className="px-3 py-1 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-colors text-sm"
                          >
                            Try Audio
                          </button>
                          <button
                            onClick={handleStop}
                            className="px-3 py-1 bg-gray-600/30 hover:bg-gray-600/50 rounded-lg transition-colors text-sm"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                      <p className="text-purple-300 font-body leading-relaxed text-lg">{selectedMeditation.script}</p>
                    </div>
                  ) : (
                    <>
                      {/* Time Display */}
                      <div className="flex justify-between text-sm text-purple-300 font-body">
                        <span>{formatTime(audioState.currentTime)}</span>
                        <span>{formatTime(audioState.duration)}</span>
                      </div>
                      
                      {/* Enhanced Progress Bar */}
                      <div className="relative h-3 bg-purple-900/30 rounded-full overflow-hidden backdrop-blur-sm">
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-[0_0_10px_rgba(167,139,250,0.5)]"
                          style={{ width: `${audioState.progress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      {/* Volume Control */}
                      <div className="flex items-center gap-3">
                        <Volume2 className="w-4 h-4 text-purple-300" />
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                          className="flex-1 h-2 bg-purple-900/30 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      {/* Enhanced Error Display */}
                      {audioState.error && (
                        <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-amber-400 text-sm font-medium mb-2">Audio Not Available</p>
                              <p className="text-amber-300 text-sm mb-3">{audioState.error}</p>
                              <div className="flex gap-2">
                                <button
                                  onClick={handleRetry}
                                  className="px-4 py-2 bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 rounded-lg transition-colors text-sm font-body"
                                >
                                  Try Again
                                </button>
                                <button
                                  onClick={() => setUseTextMode(true)}
                                  className="px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 rounded-lg transition-colors text-sm font-body"
                                >
                                  Read Script
                                </button>
                                <button
                                  onClick={() => setShowAudioHelp(true)}
                                  className="px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 rounded-lg transition-colors text-sm font-body"
                                >
                                  Setup Help
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Controls */}
                      <div className="flex items-center justify-center gap-6">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleSeek('backward')}
                          className="p-3 text-purple-300 hover:text-purple-200 hover:bg-white/10 rounded-full transition-all duration-200"
                          disabled={audioState.isLoading || !!audioState.error}
                        >
                          <SkipBack className="w-6 h-6" />
                        </motion.button>
                        
                        {audioState.isLoading ? (
                          <div className="w-14 h-14 rounded-full border-4 border-purple-300/20 border-t-purple-300 animate-spin" />
                        ) : audioState.isPlaying ? (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handlePause}
                            className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-sm rounded-full text-white shadow-[0_0_25px_rgba(167,139,250,0.4)] hover:shadow-[0_0_35px_rgba(167,139,250,0.6)] transition-all duration-300"
                            disabled={!!audioState.error}
                          >
                            <Pause className="w-6 h-6" />
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handlePlay(selectedMeditation)}
                            className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-sm rounded-full text-white shadow-[0_0_25px_rgba(167,139,250,0.4)] hover:shadow-[0_0_35px_rgba(167,139,250,0.6)] transition-all duration-300"
                          >
                            <Play className="w-6 h-6" />
                          </motion.button>
                        )}
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleSeek('forward')}
                          className="p-3 text-purple-300 hover:text-purple-200 hover:bg-white/10 rounded-full transition-all duration-200"
                          disabled={audioState.isLoading || !!audioState.error}
                        >
                          <SkipForward className="w-6 h-6" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleStop}
                          className="p-3 text-purple-300 hover:text-purple-200 hover:bg-white/10 rounded-full transition-all duration-200"
                        >
                          <Square className="w-6 h-6" />
                        </motion.button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Meditation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meditations.map((meditation, index) => (
            <motion.div
              key={meditation.id}
              className="group"
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(167,139,250,0.2)] hover:shadow-[0_0_40px_rgba(167,139,250,0.3)] transition-all duration-300 border border-white/10 group-hover:border-white/20">
                <div className="relative overflow-hidden">
                  <img
                    src={meditation.imageUrl}
                    alt={meditation.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-display font-semibold text-purple-200 group-hover:text-purple-100 transition-colors tracking-wide">
                    {meditation.title}
                  </h3>
                  <p className="text-purple-300/80 text-sm leading-relaxed font-body tracking-wide">
                    {meditation.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-300 bg-purple-900/30 px-3 py-1 rounded-full backdrop-blur-sm font-body">
                      {meditation.duration} minutes
                    </span>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleTextMode(meditation)}
                        className="p-2 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 backdrop-blur-sm rounded-full text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all duration-300"
                        title="Read meditation script"
                      >
                        <BookOpen className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handlePlay(meditation)}
                        className="p-3 bg-gradient-to-r from-purple-500/50 to-pink-500/50 backdrop-blur-sm rounded-full text-white shadow-[0_0_20px_rgba(167,139,250,0.3)] hover:shadow-[0_0_30px_rgba(167,139,250,0.5)] transition-all duration-300 group-hover:from-purple-500/70 group-hover:to-pink-500/70"
                      >
                        <Play className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Help Button */}
        <div className="text-center">
          <button
            onClick={() => setShowAudioHelp(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl text-blue-200 transition-colors"
          >
            <FolderOpen className="w-5 h-5" />
            Audio Setup Help
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Meditations;