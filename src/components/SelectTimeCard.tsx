import React, { useCallback, useMemo, useState } from "react";
import { Text, TextStyle } from "react-native";
import {
  useMeditationSettingsDispatch,
  useMeditationSettingsState,
  useTranslations,
} from "../hooks";
import { ActionType } from "../state";
import { spacing, textStyle } from "../theme";
import { Card } from "./Card";
import { NumberLineSelector } from "./NumberLineSelector";
import { useTheme } from "@react-navigation/native";

const MINS_IN_HOUR = 60;
const MAX_TIME_HOURS = 3;

export function SelectTimeCard() {
  const { timeSelector } = useMeditationSettingsState();
  const dispatch = useMeditationSettingsDispatch();
  const translate = useTranslations();
  const theme = useTheme();
  const $textColor: TextStyle = useMemo(
    () => ({
      color: theme.colors.text,
    }),
    [theme],
  );

  // Time displayed with hours in a digital clock format
  const formattedTime = useMemo(() => {
    const selectedTime = timeSelector.selectedTimeMinutes;
    const hours = Math.floor(selectedTime / MINS_IN_HOUR);
    const mins = selectedTime - hours * MINS_IN_HOUR;
    const isMinsOneDigit = mins < 10;
    return `0${hours}:${isMinsOneDigit ? "0" : ""}${mins}`;
  }, [timeSelector.selectedTimeMinutes]);

  const setIsOpen = useCallback(
    (nextIsOpen: boolean) => {
      if (nextIsOpen) {
        dispatch({ type: ActionType.OPEN_TIME_SELECTOR });
      } else {
        dispatch({ type: ActionType.CLOSE_TIME_SELECTOR });
      }
    },
    [dispatch],
  );

  const setSelectedTime = useCallback(
    (time: number) => {
      dispatch({
        type: ActionType.UPDATE_TIME,
        payload: { timeMinutes: time },
      });
    },
    [dispatch],
  );

  return (
    <Card
      title={translate("general.selectTime")}
      isCollapsible={true}
      collapsibleProps={{ isOpen: timeSelector.isOpen, setIsOpen }}
    >
      <Text style={[textStyle.cardSubTitle, $textColor]}>
        {`${translate("general.hours")} : ${translate("general.minutes")}`}
      </Text>
      <Text style={[$time, $textColor]}>{formattedTime}</Text>
      <NumberLineSelector
        selectedNumber={timeSelector.selectedTimeMinutes}
        setSelectedNumber={setSelectedTime}
        maxNumberSelectable={MAX_TIME_HOURS * MINS_IN_HOUR}
      />
    </Card>
  );
}

const $time: TextStyle = {
  fontSize: 60,
  marginBottom: spacing.md,
};
