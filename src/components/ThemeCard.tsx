import React, { useMemo } from "react";
import { THEMES, spacing, textStyle } from "../theme";
import { Card } from "./Card";
import { ThemeOption } from "./ThemeOption";
import { useTranslations } from "../hooks";
import { View, ViewStyle, Text, TextStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

/**
 * Card that allows the user to select a color theme for the app.
 */
export function ThemeCard() {
  const translate = useTranslations();
  const currTheme = useTheme();
  const $textColor: TextStyle = useMemo(
    () => ({
      color: currTheme.colors.text,
    }),
    [currTheme],
  );

  // Everything here is just Views in Views displaying theme colors
  return (
    <Card title={translate("general.theme")}>
      {/* Current Theme */}
      <Text style={[textStyle.cardSubTitle, $textColor]}>
        {translate("general.current")}
      </Text>
      <View style={[$selectedBase, { borderColor: currTheme.colors.primary }]}>
        <View
          style={[
            $selectedSection,
            { backgroundColor: currTheme.colors.primary },
          ]}
          testID="primary-color-view"
        />
        <View
          style={[$selectedSection, { backgroundColor: currTheme.colors.card }]}
        />
        <View
          style={[$selectedSection, { backgroundColor: currTheme.colors.text }]}
        />
        <View
          style={[
            $selectedSection,
            { backgroundColor: currTheme.colors.background },
          ]}
        />
      </View>

      {/* Theme Options */}
      <Text style={[textStyle.cardSubTitle, $textColor]}>
        {translate("general.options")}
      </Text>
      <View style={$options} role="radiogroup">
        {THEMES.map((option) => (
          <ThemeOption key={option.id} theme={option} />
        ))}
      </View>
    </Card>
  );
}

const $selectedBase: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  height: 40,
  borderWidth: 1,
  marginBottom: spacing.lg,
};

const $selectedSection: ViewStyle = {
  flex: 1,
};

const $options: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
};
