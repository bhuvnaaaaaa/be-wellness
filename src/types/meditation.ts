export interface Meditation {
  id: string;
  title: string;
  duration: number;
  description: string;
  imageUrl: string;
  audioUrl?: string; // ElevenLabs audio URL
  voiceId?: string; // ElevenLabs voice ID for future regeneration
  script?: string; // Meditation script text
}

export interface AudioState {
  isLoading: boolean;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  error: string | null;
}