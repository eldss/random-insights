import { useTheme } from "@react-navigation/native";
import React, { useCallback, useMemo } from "react";
import { Text, TextStyle } from "react-native";
import {
  useMeditationSettingsDispatch,
  useMeditationSettingsState,
  useTranslations,
} from "../hooks";
import { MedSettingsActionType } from "../state";
import { spacing, textStyle } from "../theme";
import { Card } from "./Card";
import { NumberLineSelector } from "./NumberLineSelector";
import { OptionSelectGroup } from "./OptionSelectGroup";

const MINS_IN_HOUR = 60;
const MAX_TIME_HOURS = 3;
const PRE_BELL_TIME_OPTIONS = [
  { text: "5", value: 5 },
  { text: "15", value: 15 },
  { text: "30", value: 30 },
  { text: "60", value: 60 },
];

/**
 * A card that allows the user to select a time period to meditate for.
 */
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

  // TODO: Make this a utility function
  // Time displayed with hours in a digital clock format
  const formattedTime = useMemo(() => {
    const selectedTime = timeSelector.selectedTimeMinutes;
    const hours = Math.floor(selectedTime / MINS_IN_HOUR);
    const mins = selectedTime - hours * MINS_IN_HOUR;
    const isMinsOneDigit = mins < 10;
    return `0${hours}:${isMinsOneDigit ? "0" : ""}${mins}`;
  }, [timeSelector.selectedTimeMinutes]);

  // Sets main meditation time
  const setSelectedTime = useCallback(
    (time: number) => {
      dispatch({
        type: MedSettingsActionType.UPDATE_TIME,
        payload: { timeMinutes: time },
      });
    },
    [dispatch],
  );

  const getIndex = () => {
    const index = PRE_BELL_TIME_OPTIONS.map((val) => val.value).indexOf(
      timeSelector.selectedPreTimeSeconds,
    );
    return index >= 0 ? index : 0;
  };

  // Sets pre-time option selected index as well as setting the actual seconds
  // value in app state
  const setPreTimeIndexAndSecs = useCallback(
    (index: number) => {
      dispatch({
        type: MedSettingsActionType.UPDATE_PRE_START_TIME,
        payload: { preTimeSeconds: PRE_BELL_TIME_OPTIONS[index].value },
      });
    },
    [dispatch],
  );

  return (
    <Card title={translate("general.time")}>
      {/* Main time selector */}
      <Text style={[textStyle.cardSubTitle, $textColor]}>
        {`${translate("general.hours")} : ${translate("general.minutes")}`}
      </Text>
      <Text style={[$time, $textColor]}>{formattedTime}</Text>
      <NumberLineSelector
        selectedNumber={timeSelector.selectedTimeMinutes}
        setSelectedNumber={setSelectedTime}
        maxNumberSelectable={MAX_TIME_HOURS * MINS_IN_HOUR}
      />

      {/* Pre-bell time selector */}
      <Text style={[$preTimeTextBase, textStyle.cardSubTitle, $textColor]}>
        {translate("general.preStartHint")}
      </Text>
      <OptionSelectGroup
        options={PRE_BELL_TIME_OPTIONS}
        selectedIndex={getIndex()}
        setSelectedIndex={setPreTimeIndexAndSecs}
      />
    </Card>
  );
}

const $time: TextStyle = {
  fontSize: 60,
  marginBottom: spacing.md,
};

const $preTimeTextBase: TextStyle = {
  marginTop: spacing.md,
};
