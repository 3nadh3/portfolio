// Keep the reference sound alive across the landing -> profiles transition.
// A single preloaded element prevents duplicate sounds on repeated visits.
let introAudio: HTMLAudioElement | undefined;
export function getIntroAudio() {
  if (!introAudio) {
    introAudio = new Audio(`${import.meta.env.BASE_URL}tudum.mp3`);
    introAudio.preload = 'auto';
    introAudio.volume = 0.7;
    introAudio.load();
  }
  return introAudio;
}
