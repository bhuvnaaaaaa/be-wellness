export class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private currentMeditation: string | null = null;
  private progressCallback?: (progress: number) => void;
  private endCallback?: () => void;
  private errorCallback?: (error: string) => void;

  constructor() {
    this.audio = new Audio();
    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.audio) return;

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio && this.progressCallback) {
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        this.progressCallback(isNaN(progress) ? 0 : progress);
      }
    });

    this.audio.addEventListener('ended', () => {
      console.log('Audio ended naturally');
      if (this.endCallback) {
        this.endCallback();
      }
    });

    this.audio.addEventListener('error', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const target = e.target as HTMLAudioElement;
      let errorMessage = 'Audio file not found. Please add the required MP3 files to the public/audio folder.';
      
      console.warn('Audio error (handled):', target?.error);
      
      if (target && target.error) {
        switch (target.error.code) {
          case target.error.MEDIA_ERR_ABORTED:
            errorMessage = 'Audio playback was stopped';
            break;
          case target.error.MEDIA_ERR_NETWORK:
            errorMessage = 'Audio file not found. Please add the required MP3 files to the public/audio folder.';
            break;
          case target.error.MEDIA_ERR_DECODE:
            errorMessage = 'Audio file format issue. Please ensure files are valid MP3 format.';
            break;
          case target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = 'Audio file not found. Please add the required MP3 files to the public/audio folder.';
            break;
          default:
            errorMessage = 'Audio file not found. Please add the required MP3 files to the public/audio folder.';
        }
      }
      
      if (this.errorCallback) {
        this.errorCallback(errorMessage);
      }
    });

    this.audio.addEventListener('loadedmetadata', () => {
      console.log('Audio metadata loaded - Duration:', this.audio?.duration, 'seconds');
    });

    this.audio.addEventListener('canplaythrough', () => {
      console.log('Audio ready to play through completely');
    });

    this.audio.addEventListener('loadstart', () => {
      console.log('Audio loading started');
    });

    this.audio.addEventListener('loadeddata', () => {
      console.log('Audio data loaded');
    });
  }

  async checkAudioFileExists(audioUrl: string): Promise<boolean> {
    try {
      const response = await fetch(audioUrl, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.warn('Audio file check failed:', error);
      return false;
    }
  }

  async loadMeditation(meditationId: string, audioUrl: string): Promise<void> {
    if (!this.audio) {
      throw new Error('Audio system not available');
    }

    console.log('Loading meditation:', meditationId, 'from:', audioUrl);
    
    // Check if file exists first
    const fileExists = await this.checkAudioFileExists(audioUrl);
    if (!fileExists) {
      throw new Error(`Audio file not found: ${audioUrl}. Please add the required MP3 files to the public/audio folder.`);
    }
    
    this.currentMeditation = meditationId;

    return new Promise((resolve, reject) => {
      if (!this.audio) {
        reject(new Error('Audio system not available'));
        return;
      }

      // Stop any current playback and reset
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.src = '';

      const handleCanPlay = () => {
        cleanup();
        console.log('Audio loaded successfully - Duration:', this.audio?.duration, 'seconds');
        resolve();
      };

      const handleError = (e: Event) => {
        cleanup();
        console.warn('Audio loading error (handled):', e);
        reject(new Error(`Audio file not found: ${audioUrl}. Please add the required MP3 files to the public/audio folder.`));
      };

      const cleanup = () => {
        this.audio?.removeEventListener('canplaythrough', handleCanPlay);
        this.audio?.removeEventListener('error', handleError);
      };

      // Set up event listeners
      this.audio.addEventListener('canplaythrough', handleCanPlay, { once: true });
      this.audio.addEventListener('error', handleError, { once: true });
      
      // Configure audio settings
      this.audio.preload = 'auto';
      this.audio.crossOrigin = null;
      
      // Load the audio
      this.audio.src = audioUrl;
      this.audio.load();
      
      // Timeout after 10 seconds
      setTimeout(() => {
        cleanup();
        reject(new Error('Audio loading timeout - please check if the file exists in public/audio folder'));
      }, 10000);
    });
  }

  async play(): Promise<void> {
    if (!this.audio) {
      throw new Error('Audio system not available');
    }

    // Ensure audio is properly loaded before playing
    if (this.audio.readyState < 2) {
      console.log('Audio not ready, waiting for it to load...');
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Audio not ready to play - please ensure audio files are in public/audio folder'));
        }, 5000);

        const onCanPlay = () => {
          clearTimeout(timeout);
          this.audio?.removeEventListener('canplaythrough', onCanPlay);
          resolve(void 0);
        };

        this.audio?.addEventListener('canplaythrough', onCanPlay, { once: true });
      });
    }
    
    try {
      console.log('Starting playback - Duration:', this.audio.duration, 'seconds');
      await this.audio.play();
      console.log('Playback started successfully');
    } catch (error: any) {
      console.warn('Play failed (handled):', error);
      
      let errorMessage = 'Could not play audio - please ensure audio files are in public/audio folder';
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Please click somewhere on the page first to enable audio';
      } else if (error.name === 'NotSupportedError') {
        errorMessage = 'Audio format not supported by your browser';
      } else if (error.name === 'AbortError') {
        errorMessage = 'Audio playback was interrupted';
      }
      
      throw new Error(errorMessage);
    }
  }

  pause(): void {
    if (this.audio) {
      console.log('Pausing audio at:', this.audio.currentTime, 'seconds');
      this.audio.pause();
    }
  }

  stop(): void {
    if (this.audio) {
      console.log('Stopping audio');
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  seek(seconds: number): void {
    if (this.audio && this.audio.duration) {
      const newTime = Math.max(0, Math.min(this.audio.currentTime + seconds, this.audio.duration));
      console.log('Seeking from', this.audio.currentTime, 'to', newTime);
      this.audio.currentTime = newTime;
    }
  }

  setVolume(volume: number): void {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(volume, 1));
    }
  }

  getCurrentTime(): number {
    return this.audio?.currentTime || 0;
  }

  getDuration(): number {
    return this.audio?.duration || 0;
  }

  isPlaying(): boolean {
    return this.audio ? !this.audio.paused : false;
  }

  onProgress(callback: (progress: number) => void): void {
    this.progressCallback = callback;
  }

  onEnd(callback: () => void): void {
    this.endCallback = callback;
  }

  onError(callback: (error: string) => void): void {
    this.errorCallback = callback;
  }

  destroy(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio.load();
    }
  }
}

export const audioManager = new AudioManager();