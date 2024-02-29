import { useEffect, useRef } from "react";
import { AVPlaybackSource, Audio } from "expo-av";

export function useSound(audioUri: AVPlaybackSource) {
  const sound = useRef(new Audio.Sound());

  useEffect(() => {
    async function loadSound() {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });
      await sound.current.loadAsync(audioUri);
    }

    loadSound();

    // Clean up resources
    return () => {
      if (sound.current) {
        sound.current
          .unloadAsync()
          .then(() => {})
          .catch((error) => {
            console.error("Error unloading sound", error);
          });
      }
    };
  }, [audioUri]);

  const playSound = async (): Promise<boolean> => {
    if (sound.current) {
      await sound.current.replayAsync();
      return true;
    }
    return false;
  };

  const playSoundThreeTimes = async (): Promise<void> => {
    const BELL_INTERVAL_MS = 5000;
    for (let i = 0; i < 3; i++) {
      await playSound();
      await new Promise((resolve) => setTimeout(resolve, BELL_INTERVAL_MS));
    }
  };

  return { playSound, playSoundThreeTimes };
}
