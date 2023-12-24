import React, { useCallback, useMemo } from "react";
import { Pressable, View, ViewStyle } from "react-native";
import { AppTheme, spacing } from "../theme";
import { persistAppSettings, useAppSettingsDispatch } from "../hooks";
import { AppSettingsActionType } from "../state";

export interface ThemeOptionProps {
  theme: AppTheme;
}

/**
 * A square of colors representing the main colors of a theme.
 */
export function ThemeOption({ theme }: ThemeOptionProps) {
  const dispatch = useAppSettingsDispatch();
  const { primary, text, card, background } = useMemo(
    () => theme.theme.colors,
    [theme],
  );
  const setTheme = useCallback(() => {
    dispatch({ type: AppSettingsActionType.UPDATE_THEME, payload: theme });
    persistAppSettings(theme);
  }, [theme]);

  return (
    <Pressable
      style={[$base, { borderColor: primary }]}
      onPress={setTheme}
      role="radio"
      accessibilityLabel={`Theme Option ${theme.id}`}
    >
      <View style={[$colorBox, { backgroundColor: primary }]}></View>
      <View style={[$colorBox, { backgroundColor: text }]}></View>
      <View style={[$colorBox, { backgroundColor: card }]}></View>
      <View style={[$colorBox, { backgroundColor: background }]}></View>
    </Pressable>
  );
}

const INNER_SQUARE_LEN = 40;
const BORDER_WIDTH = 1;

const $base: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  width: (INNER_SQUARE_LEN + BORDER_WIDTH) * 2,
  height: (INNER_SQUARE_LEN + BORDER_WIDTH) * 2,
  borderWidth: BORDER_WIDTH,
  margin: spacing.xs,
};

const $colorBox: ViewStyle = {
  height: INNER_SQUARE_LEN,
  width: INNER_SQUARE_LEN,
};
