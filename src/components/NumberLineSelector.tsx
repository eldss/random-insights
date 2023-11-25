import lodash from "lodash";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View, ViewStyle, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withTiming,
} from "react-native-reanimated";
import Svg, { G, Line } from "react-native-svg";
import { colors, timing } from "../theme";

/*
 * Constants for SVG. May put in props in the future if moved to a library or put in
 * the open source world. For now this works best since it will not change or be reused.
 */
// Max offset for animations. Relates to minimum value of number line because
// increasing offset means moving line to right, decreasing selected number.
const MAX_OFFSET = 0;
// Height of the svg number line view
const SVG_HEIGHT = 60;
// Coordinate values for the number line vertical lines
const LINE_SPACING = 15;
const LINE_WIDTH = 1;
const MOD_TEN_LINE_START_Y = 0;
const MOD_FIVE_LINE_START_Y = SVG_HEIGHT * 0.2;
const DEFAULT_LINE_START_Y = SVG_HEIGHT * 0.5;
const LINE_END_Y = SVG_HEIGHT - 10;
// Number selector values
const SELECTOR_LINE_LENGTH = 18;
const SELECTOR_LINE_WIDTH = 2;
const BOTTOM_SELECTOR_LINE_Y = SVG_HEIGHT - 2;
// Animation settings
const OUTSIDE_BOUNDS_TIMING_CONFIG = {
  duration: timing.halfSec,
};
const TOSS_BASE_CONFIG = {
  deceleration: 0.99,
  rubberBandEffect: true,
  rubberBandFactor: 1.1,
};

const AnimatedG = Animated.createAnimatedComponent(G);

export interface NumberLineSelectorProps {
  /** Starting value for the selector. */
  selectedNumber: number;
  /** Update function for selected number. */
  setSelectedNumber: (nextNum: number) => void;
  /** Maximum value of the number line selector. */
  maxNumberSelectable: number;
}

/**
 * Number selector that looks like the markings on a ruler. Currently only supports
 * non-negative integers. Design inspired by selector in BrightMind meditation app.
 */
export function NumberLineSelector({
  selectedNumber,
  setSelectedNumber,
  maxNumberSelectable,
}: NumberLineSelectorProps) {
  // Controls movement of number line
  const offsetX = useSharedValue(0);
  // Min offset denotes max number. Offset to left means increasing number line
  const minOffset = useMemo(
    () => maxNumberSelectable * -LINE_SPACING,
    [maxNumberSelectable, LINE_SPACING],
  );
  // Width of the full screen, updated on change
  const { width } = useWindowDimensions();
  // Halfway point of screen, used to center number line svg
  const midX = useMemo(() => width / 2, [width]);
  // Timer used to center dashes shortly after user stops touching selector
  const timer = useRef(null);
  // Debounced version of the set number prop, which otherwise tracks
  // animated values and causes delayed display updates.
  const debouncedSetNumber = lodash.debounce(
    setSelectedNumber,
    timing.tenthSec * 0.7,
  );

  // Sets the initial value selected and animates to it
  useEffect(() => {
    offsetX.value = withTiming(selectedNumber * -LINE_SPACING, {
      duration: timing.halfSec,
    });
  }, []);

  // Drag logic for the number line
  const dragGesture = Gesture.Pan()
    // Stop ongoing animation if needed (i.e. stop toss)
    .onBegin(() => {
      cancelAnimation(offsetX);
    })
    .onChange((e) => {
      const newOffset = offsetX.value + e.changeX;
      // Tracks x of left side of svg grouping.
      if (newOffset > 0 || newOffset < minOffset) {
        // Slow progress on drag outside bounds
        offsetX.value += e.changeX / 2;
      } else {
        // Normal 1:1 tracking inside bounds
        offsetX.value += e.changeX;
      }
    })
    .onFinalize((e) => {
      if (offsetX.value > MAX_OFFSET) {
        // Left side of svg grouping is to the right of selector, so
        // selector is in the negative. Bring back to 0.
        offsetX.value = withTiming(0, OUTSIDE_BOUNDS_TIMING_CONFIG);
      } else if (offsetX.value < minOffset) {
        // Right side of svg grouping (measured by left side offset) is to the
        // left of selector, so selector is greater than max value. Bring back
        // to max value.
        offsetX.value = withTiming(minOffset, OUTSIDE_BOUNDS_TIMING_CONFIG);
      } else {
        // Selector is in a valid location of the number line, so do toss animation
        offsetX.value = withDecay({
          velocity: e.velocityX,
          // Bounds for first line
          clamp: [minOffset, MAX_OFFSET],
          ...TOSS_BASE_CONFIG,
        });
      }
    });

  // Sets a timer that animates the number line to center on the given
  // number after one second
  const setTimer = useCallback(
    (num: number) => {
      timer.current = setTimeout(
        () => (offsetX.value = withTiming(num * -LINE_SPACING)),
        timing.oneSec,
      );
    },
    [timer, LINE_SPACING],
  );

  // Cancels the timer set in `setTimer`
  const clearTimer = useCallback(() => {
    clearTimeout(timer.current);
  }, [timer]);

  // Async operation to update time selected from animation values
  useAnimatedReaction(
    () => {
      // I tried keeping this logic in a separate function but kept getting errors
      // saying the function was not a function, so doing it directly here instead.
      // This maps offsetX to the number over the selector on the number line.
      // Not sure if extra logic here is more or less efficient than in second arg???
      let num = Math.round(-offsetX.value / LINE_SPACING);
      if (num < 0) {
        num = 0;
      } else if (num > maxNumberSelectable) {
        num = maxNumberSelectable;
      }
      return num;
    },
    (currVal, prevVal) => {
      if (currVal !== prevVal) {
        runOnJS(debouncedSetNumber)(currVal);
        // These are used here because it seems to work best after a lot of
        // guess and check experimentation.
        runOnJS(clearTimer)();
        runOnJS(setTimer)(currVal);
      }
    },
    [],
  );

  // Determines where number line lines start on the y axis in the svg
  const getLineYStart = useCallback((num: number) => {
    return num % 10 === 0
      ? MOD_TEN_LINE_START_Y
      : num % 5 === 0
        ? MOD_FIVE_LINE_START_Y
        : DEFAULT_LINE_START_Y;
  }, []);

  // Animates the number line based on the drag gesture
  const animatedGProps = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offsetX.value,
      },
    ],
  }));

  return (
    <GestureDetector gesture={dragGesture}>
      <View style={$container} testID="number-line-selector">
        <Svg height={SVG_HEIGHT} width={width}>
          {/*
           * G groups the vertical lines and is an easier way to manage
           * animations than the lines themselves.
           */}
          <AnimatedG x={midX} animatedProps={animatedGProps}>
            {[...Array(maxNumberSelectable + 1).keys()].map((num) => {
              return (
                <Line
                  x={LINE_SPACING * num}
                  y1={getLineYStart(num)}
                  y2={LINE_END_Y}
                  stroke={colors.numberLineColor}
                  strokeWidth={LINE_WIDTH}
                  key={num}
                />
              );
            })}
          </AnimatedG>
          <Line
            x1={midX - SELECTOR_LINE_LENGTH / 2}
            x2={midX + SELECTOR_LINE_LENGTH / 2}
            y={BOTTOM_SELECTOR_LINE_Y}
            strokeWidth={SELECTOR_LINE_WIDTH}
            stroke={colors.numberLineColor}
          />
        </Svg>
      </View>
    </GestureDetector>
  );
}

const $container: ViewStyle = {
  width: "100%",
  overflow: "hidden",
  justifyContent: "center",
  alignItems: "center",
};
