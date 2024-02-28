import { useTheme } from "@react-navigation/native";
import { useKeepAwake } from "expo-keep-awake";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import {
  useMeditationSettingsState,
  useSound,
  useTranslations,
} from "../hooks";
import { spacing } from "../theme";
import { formatTime } from "../utils/formatTime";
import { getMidBellTimes } from "../utils/getMidBellTimes";

const SECONDS_IN_MINUTE = 60;
const INTERVAL_CALLBACK_MS = 1000;

/**
 * Renders the countdown while meditation is active
 */
const MeditationScreen = ({ navigation }) => {
  // State
  const settings = useMeditationSettingsState();
  const [timeLeft, setTimeLeft] = useState(
    settings.timeSelector.selectedTimeMinutes * SECONDS_IN_MINUTE,
  );
  const [preStartTimeLeft, setPreStartTimeLeft] = useState(
    settings.timeSelector.selectedPreTimeSeconds,
  );
  const [isMeditating, setIsMeditating] = useState(false);
  const midBells = useRef(
    getMidBellTimes(
      settings.bellSelector.bellValue,
      settings.timeSelector.selectedTimeMinutes * SECONDS_IN_MINUTE,
    ),
  );
  const timer = useRef<NodeJS.Timeout>();

  // Hooks
  useKeepAwake();
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const { playSound, playSoundThreeTimes } = useSound(
    require("../../assets/bell.wav"),
  );
  const translate = useTranslations();

  // Pause for selected time then start meditation
  useEffect(() => {
    // Update the pre-time left every second to display it
    const interval = setInterval(() => {
      setPreStartTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          // Pre-time has finished, clear the interval and start meditation
          clearInterval(interval);
          playSound();
          handlePlay();
          return 0;
        }
        // Otherwise, decrement the pre-time left
        return prevTimeLeft - 1;
      });
    }, INTERVAL_CALLBACK_MS);

    return () => clearInterval(interval);
  }, []);

  // Starts meditation timer from wherever the time currently is set to.
  // Also handles the end of the meditation.
  const handlePlay = useCallback(() => {
    setIsMeditating(true);
    if (!timer.current) {
      timer.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer.current);
            timer.current = undefined;
            playSoundThreeTimes(); // End bells
            setIsMeditating(false);
            return 0;
          }
          if (midBells.current.has(prevTime)) {
            playSound();
          }
          return prevTime - 1;
        });
      }, INTERVAL_CALLBACK_MS);
    }
  }, []);

  // Pause the meditation
  const handlePause = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = undefined;
    }
    setIsMeditating(false);
  }, []);

  // End the meditation
  const handleEnd = useCallback(() => {
    setIsMeditating(false);
    clearInterval(timer.current);
    navigation.goBack();
  }, []);

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
        <Button
          preset="doActionSecondary"
          onPress={handlePause}
          accessibilityLabel="Pause meditation"
          accessibilityHint="Pauses the meditation timer"
        >
          {translate("general.pause")}
        </Button>
      ) : (
        <Button
          preset="doAction"
          onPress={handlePlay}
          accessibilityLabel="Start meditation"
          accessibilityHint="Starts the meditation timer"
        >
          {translate("general.resume")}
        </Button>
      );
    } else {
      return (
        <Button
          preset="doAction"
          onPress={handleEnd}
          accessibilityLabel="End meditation"
          accessibilityHint="Ends the meditation and returns to the settings screen"
        >
          {translate("general.end")}
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
