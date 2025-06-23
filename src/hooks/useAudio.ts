import { useState, useEffect, useCallback } from 'react';
import { audioManager } from '../utils/audioManager';
import { AudioState } from '../types/meditation';

export const useAudio = () => {
  const [audioState, setAudioState] = useState<AudioState>({
    isLoading: false,
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    duration: 0,
    error: null,
  });

  useEffect(() => {
    audioManager.onProgress((progress) => {
      setAudioState(prev => ({
        ...prev,
        progress: isNaN(progress) ? 0 : progress,
        currentTime: audioManager.getCurrentTime(),
        duration: audioManager.getDuration(),
      }));
    });

    audioManager.onEnd(() => {
      setAudioState(prev => ({
        ...prev,
        isPlaying: false,
        progress: 0,
      }));
    });

    audioManager.onError((error) => {
      setAudioState(prev => ({
        ...prev,
        isLoading: false,
        isPlaying: false,
        error,
      }));
    });

    return () => {
      audioManager.destroy();
    };
  }, []);

  const loadAudio = useCallback(async (meditationId: string, audioUrl: string) => {
    setAudioState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await audioManager.loadMeditation(meditationId, audioUrl);
      setAudioState(prev => ({
        ...prev,
        isLoading: false,
        duration: audioManager.getDuration(),
      }));
    } catch (error) {
      console.warn('Failed to load audio (handled):', error);
      const errorMessage = error instanceof Error ? error.message : 'Audio file not found. Please add the required MP3 files to the public/audio folder.';
      setAudioState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  }, []);

  const play = useCallback(async () => {
    try {
      await audioManager.play();
      setAudioState(prev => ({ ...prev, isPlaying: true, error: null }));
    } catch (error) {
      console.warn('Failed to play audio (handled):', error);
      const errorMessage = error instanceof Error ? error.message : 'Could not play audio - please ensure audio files are in public/audio folder';
      setAudioState(prev => ({
        ...prev,
        isPlaying: false,
        error: errorMessage,
      }));
    }
  }, []);

  const pause = useCallback(() => {
    audioManager.pause();
    setAudioState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const stop = useCallback(() => {
    audioManager.stop();
    setAudioState(prev => ({
      ...prev,
      isPlaying: false,
      progress: 0,
      currentTime: 0,
    }));
  }, []);

  const seek = useCallback((seconds: number) => {
    audioManager.seek(seconds);
  }, []);

  const setVolume = useCallback((volume: number) => {
    audioManager.setVolume(volume);
  }, []);

  const clearError = useCallback(() => {
    setAudioState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    audioState,
    loadAudio,
    play,
    pause,
    stop,
    seek,
    setVolume,
    clearError,
  };
};