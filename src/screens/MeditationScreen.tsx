import { useTheme } from "@react-navigation/native";
import { Audio } from "expo-av";
import { useKeepAwake } from "expo-keep-awake";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextStyle,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import {
  ColorFormat,
  CountdownCircleTimer,
} from "react-native-countdown-circle-timer";
import { Button } from "../components";
import { useMeditationSettingsState } from "../hooks";
import { spacing } from "../theme";

/**
 * Renders the countdown while meditation is active
 */
const MeditationScreen = ({ navigation }) => {
  const settings = useMeditationSettingsState();
  const [timeLeft, setTimeLeft] = useState(
    settings.timeSelector.selectedTimeMinutes * 60, // in seconds
  );
  const [preStartTimeLeft, setPreStartTimeLeft] = useState(
    settings.timeSelector.selectedPreTimeSeconds,
  );
  const [isMeditating, setIsMeditating] = useState(false);
  const midBells = useRef(getMidBells());
  const timer = useRef<NodeJS.Timeout>();
  const bell = useRef(new Audio.Sound());

  useKeepAwake();
  const theme = useTheme();
  const { width } = useWindowDimensions();

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
    // Update the pre-time left every second to display it
    const interval = setInterval(() => {
      setPreStartTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          // Pre-time has finished, clear the interval and start meditation
          clearInterval(interval);
          playBellOnce();
          handleStart();
          return 0;
        }
        // Otherwise, decrement the pre-time left
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Play bell one time
  async function playBellOnce() {
    if (bell.current) {
      console.log("Playing sound");
      await bell.current.replayAsync();
    } else {
      console.log("Sound not loaded");
    }
  }

  // Play bell three times in a row
  const playBellThreeTimes = async () => {
    if (bell.current) {
      for (let i = 0; i < 3; i++) {
        await bell.current.replayAsync();
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    } else {
      console.log("Sound not loaded");
    }
  };

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

  // Starts meditation timer from wherever the time currently is set to.
  // Also handles the end of the meditation.
  function handleStart() {
    setIsMeditating(true);
    if (!timer.current) {
      timer.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer.current);
            timer.current = undefined;
            playBellThreeTimes(); // End bells
            setIsMeditating(false);
            return 0;
          }
          if (midBells.current.has(prevTime)) {
            playBellOnce();
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  }

  // Pause the meditation
  function handlePause() {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = undefined;
    }
    setIsMeditating(false);
  }

  // End the meditation
  function handleEnd() {
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

  // Only displays one button at a given time depending on state. This function
  // decides what is displayed.
  function getDisplayedButton() {
    if (preStartTimeLeft > 0) {
      return (
        // Display as button to keep consistent styling. Not a big deal that
        // it doesn't do anything.
        <Button preset="doActionSecondary">
          {`Starting in ${preStartTimeLeft}`}
        </Button>
      );
    } else if (timeLeft > 0) {
      return isMeditating ? (
        <Button preset="doActionSecondary" onPress={handlePause}>
          Pause
        </Button>
      ) : (
        <Button preset="doAction" onPress={handleStart}>
          Resume
        </Button>
      );
    } else {
      return (
        <Button preset="doAction" onPress={handleEnd}>
          Cancel
        </Button>
      );
    }
  }

  return (
    <SafeAreaView style={[$container, { backgroundColor: theme.colors.card }]}>
      <StatusBar style={theme.dark ? "light" : "dark"} />
      <CountdownCircleTimer
        isPlaying={isMeditating}
        duration={settings.timeSelector.selectedTimeMinutes * 60}
        colors={theme.colors.primary as ColorFormat}
        initialRemainingTime={timeLeft}
        size={width * 0.75}
        strokeWidth={20}
      >
        {({ remainingTime }) => (
          <Text style={$timerText}>{formatTime(remainingTime)}</Text>
        )}
      </CountdownCircleTimer>
      <Image
        source={require("../../assets/Lotus_Icon_Filled.png")}
        style={{ width: 85, height: 85, marginVertical: spacing.lg }}
      />
      <View style={$buttonContainer}>{getDisplayedButton()}</View>
    </SafeAreaView>
  );
};

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const $buttonContainer: ViewStyle = {
  width: "75%",
};

const $timerText: TextStyle = {
  fontSize: 55,
};

export default MeditationScreen;
