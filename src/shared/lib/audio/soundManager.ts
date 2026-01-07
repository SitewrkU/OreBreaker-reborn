import { Howl } from "howler";
import type { SoundId } from "./types";
import { SOUND_PATHS } from "@/shared/config/sounds";

class SoundManager {
  private sounds: Map<SoundId, Howl> = new Map();
  private music: Howl | null = null;
  private soundEnabled: boolean = true;
  private musicEnabled: boolean = true;

  initialize() {
    Object.entries(SOUND_PATHS).forEach(([id, path]) => {
      const howl = new Howl({
        src: [path],
        volume: 0.7,
        preload: true,
      })
      this.sounds.set(id as SoundId, howl);
    })
  }

  play(id: SoundId) {
    if (!this.soundEnabled) return;
    
    const sound = this.sounds.get(id);
    if (sound) {
      sound.play();
    }
  }

  //enable/disable sounds
  toggle() {
    this.soundEnabled = !this.soundEnabled;
  }
  setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }
  isEnabled() {
    return this.soundEnabled;
  }

  //MUSIC

  playMusic(path: string) {
    if (!this.musicEnabled) return;
    
    // stop last
    if (this.music) {
      this.music.stop();
    }

    this.music = new Howl({
      src: [path],
      loop: true,
      volume: 0.5,
    });
    
    this.music.play();
  }

  stopMusic() {
    if (this.music) {
      this.music.stop();
      this.music = null;
    }
  }


  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    
    if (!this.musicEnabled && this.music) {
      this.music.stop();
    }  
  }
}

export const soundManager = new SoundManager();