// sound.ts

// Utility functions for sound management

/**
 * Play a sound from a given URL.
 * @param {string} url - The URL of the sound file.
 */
function playSound(url) {
    const audio = new Audio(url);
    audio.play();
}

/**
 * Stop playing a sound.
 * @param {HTMLAudioElement} audio - The audio element to stop.
 */
function stopSound(audio) {
    audio.pause();
    audio.currentTime = 0; // Reset to the start
}

/**
 * Set the volume of the sound.
 * @param {HTMLAudioElement} audio - The audio element to adjust.
 * @param {number} volume - Volume level (0.0 to 1.0).
 */
function setVolume(audio, volume) {
    audio.volume = Math.max(0, Math.min(1, volume)); // Clamp volume between 0 and 1
}

export { playSound, stopSound, setVolume };