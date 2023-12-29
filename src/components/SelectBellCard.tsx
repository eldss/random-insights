import { useTheme } from "@react-navigation/native";
import React, { useCallback, useMemo, useState } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import {
  useMeditationSettingsDispatch,
  useMeditationSettingsState,
  useTranslations,
} from "../hooks";
import { BellValue, MedSettingsActionType } from "../state";
import { spacing, textStyle } from "../theme";
import { Button } from "./Button";
import { Card } from "./Card";

type Option = { text: string; value: BellValue };

/**
 * Provides options to select for bells that ring during the meditation.
 */
export function SelectBellCard() {
  const { bellSelector } = useMeditationSettingsState();
  const dispatch = useMeditationSettingsDispatch();
  const translate = useTranslations();
  const theme = useTheme();
  const $textColor: TextStyle = useMemo(
    () => ({
      color: theme.colors.text,
    }),
    [theme],
  );

  // Separates out different options by section. Needs to be in the component
  // due to the translated "None".
  const options: Option[] = useMemo(
    () => [
      { text: translate("general.none"), value: "None" },
      { text: "10%", value: "10%" },
      { text: "25%", value: "25%" },
      { text: "50%", value: "50%" },
      { text: "75%", value: "75%" },
      { text: "90%", value: "90%" },
      { text: "2", value: "2mins" },
      { text: "5", value: "5mins" },
      { text: "10", value: "10mins" },
      { text: "15", value: "15mins" },
    ],
    [translate],
  );

  // Set new bell option
  const selectOption = useCallback(
    (value: BellValue) => {
      dispatch({
        type: MedSettingsActionType.UPDATE_BELL_OPTION,
        payload: { bellValue: value },
      });
    },
    [dispatch],
  );

  // Button components for above options. If updating options, be sure to update
  // indexes in the returned JSX.
  const optionButtons = useMemo(() => {
    return options.map((option) => (
      <Button
        style={$baseButtonView}
        key={option.value}
        preset="selectOption"
        selectOptionProps={{
          isSelected: bellSelector.bellValue === option.value,
          text: option.text,
        }}
        onPress={() => selectOption(option.value)}
      />
    ));
  }, [options, bellSelector]);

  return (
    <Card title={translate("general.bells")}>
      <View style={$noneView}>{optionButtons[0]}</View>
      <Text style={[textStyle.cardSubTitle, $titleSpacing, $textColor]}>
        {translate("general.bellAt")}
      </Text>
      <View style={$atAndEveryView}>{optionButtons.slice(1, 6)}</View>
      <Text style={[textStyle.cardSubTitle, $titleSpacing, $textColor]}>
        {`${translate("general.bellEvery")} (${translate("general.minutes")})`}
      </Text>
      <View style={$atAndEveryView}>{optionButtons.slice(6)}</View>
    </Card>
  );
}

const $titleSpacing: TextStyle = {
  marginTop: spacing.sm,
};

const $noneView: ViewStyle = {
  width: "100%",
};

const $atAndEveryView: ViewStyle = {
  flexDirection: "row",
};

const $baseButtonView: ViewStyle = {
  flex: 1,
};
