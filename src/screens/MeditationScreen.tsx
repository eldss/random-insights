import { useTheme } from "@react-navigation/native";
import { Audio } from "expo-av";
import { useKeepAwake } from "expo-keep-awake";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Button, SafeAreaView, Text, View, ViewStyle } from "react-native";
import { useMeditationSettingsState } from "../hooks";

/**
 * Renders the countdown while meditation is active
 */
const MeditationScreen = ({ navigation }) => {
  useKeepAwake();

  const settings = useMeditationSettingsState();
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(
    settings.timeSelector.selectedTimeMinutes * 60,
  );
  const [isMeditating, setIsMeditating] = useState(false);
  const midBells = useRef(getMidBells());
  const timer = useRef<NodeJS.Timeout>();
  const bell = useRef(new Audio.Sound());

  const theme = useTheme();

  // Load sound once and make it available
  useEffect(() => {
    const loadSound = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

      console.log("Loading sound...");
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/bell.wav"),
      );
      bell.current = sound;
      console.log("Sound loaded");
    };

    loadSound();

    return () => {
      console.log("Unloading sound...");
      if (bell.current) {
        bell.current
          .unloadAsync()
          .then(() => {
            console.log("Sound unloaded");
          })
          .catch((error) => {
            console.error("Error unloading sound", error);
          });
      }
    };
  }, []);

  // Pause for selected time then start meditation
  useEffect(() => {
    const preTimeDelay = settings.timeSelector.selectedPreTimeSeconds * 1000;
    const preTimeTimer = setTimeout(() => {
      playBell();
      handleStart();
    }, preTimeDelay);

    return () => clearTimeout(preTimeTimer);
  }, []);

  // Play bell
  async function playBell() {
    if (bell.current) {
      console.log("Playing sound");
      await bell.current.replayAsync();
    } else {
      console.log("Sound isn't loaded yet");
    }
  }

  // Determine where to play mid meditation bells
  function getMidBells(): Set<number> {
    const bells = settings.bellSelector.bellValue;
    // Convert totalTime to seconds for consistency
    const totalTimeInSeconds = settings.timeSelector.selectedTimeMinutes * 60;
    const timesToRing = new Set<number>();

    if (bells.endsWith("%")) {
      const percentage = parseInt(bells, 10);
      // Calculate time in seconds based on the percentage
      const timeInSeconds = Math.round((percentage / 100) * totalTimeInSeconds);
      timesToRing.add(timeInSeconds);
    } else if (bells.endsWith("mins")) {
      const mins = parseInt(bells, 10);
      // Convert interval from minutes to seconds
      const intervalInSeconds = mins * 60;
      for (
        let i = totalTimeInSeconds - intervalInSeconds;
        i > 0;
        i -= intervalInSeconds
      ) {
        timesToRing.add(i);
      }
    }
    return timesToRing;
  }

  function handleStart() {
    setIsMeditating(true);
    if (!timer.current) {
      timer.current = setInterval(() => {
        setTimeLeftSeconds((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer.current);
            timer.current = undefined;
            playBell(); // End bell
            setIsMeditating(false);
            return 0;
          }
          console.log(
            `Current time: ${prevTime}, Should ring bell: ${midBells.current.has(
              prevTime,
            )}`,
            midBells.current,
          );
          if (midBells.current.has(prevTime)) {
            playBell();
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  }

  function handlePause() {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = undefined;
    }
    setIsMeditating(false);
  }

  function handleCancel() {
    setIsMeditating(false);
    clearInterval(timer.current);
    navigation.goBack();
  }

  // Display the time nicely
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours =
      hours > 0 ? `${String(hours).padStart(2, "0")}:` : "";
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <SafeAreaView style={$container}>
      <StatusBar style={theme.dark ? "light" : "dark"} />
      <Text>Meditation Time: {formatTime(timeLeftSeconds)} minutes</Text>
      {isMeditating ? (
        <Button title="Pause Meditation" onPress={handlePause} />
      ) : (
        <Button title={"Resume Meditation"} onPress={handleStart} />
      )}
      <Button title="Cancel Meditation" onPress={handleCancel} />
      <Button title="Play Bell" onPress={playBell} />
    </SafeAreaView>
  );
};

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

export default MeditationScreen;
