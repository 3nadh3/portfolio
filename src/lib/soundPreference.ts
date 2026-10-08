const SOUND_KEY = 'trinadh-sound-v1';
let rememberedMuted = false;

export function getSoundMuted(): boolean {
  try {
    rememberedMuted = localStorage.getItem(SOUND_KEY) === 'off';
  } catch {
    // Keep the choice for this visit when browser storage is unavailable.
  }
  return rememberedMuted;
}

export function saveSoundMuted(muted: boolean): void {
  rememberedMuted = muted;
  try {
    localStorage.setItem(SOUND_KEY, muted ? 'off' : 'on');
  } catch {
    // Sound controls still work without persistent browser storage.
  }
}
