import { View, Text, TextStyle } from "react-native";
import React, { useMemo, useState } from "react";
import { NumberLineSelector } from "./NumberLineSelector";
import { spacing, textStyle } from "../theme";
import { Card } from "./Card";
import { useTranslations } from "../hooks";

const MINS_IN_HOUR = 60;
const MAX_TIME_HOURS = 3;

export function SelectTimeCard({ tempVal }) {
  // tempVal is temporary until device storage can be used to manage this state
  const [selectedTime, setSelectedTime] = useState(tempVal);
  const translate = useTranslations();

  // Time displayed with hours in a digital clock format
  const formattedTime = useMemo(() => {
    const hours = Math.floor(selectedTime / MINS_IN_HOUR);
    const mins = selectedTime - hours * MINS_IN_HOUR;
    const isMinsOneDigit = mins < 10;
    return `0${hours}:${isMinsOneDigit ? "0" : ""}${mins}`;
  }, [selectedTime]);

  return (
    <Card title={translate("general.selectTime")}>
      <Text style={textStyle.cardSubTitle}>
        {`${translate("general.hours")} : ${translate("general.minutes")}`}
      </Text>
      <Text style={$time}>{formattedTime}</Text>
      <NumberLineSelector
        selectedNumber={selectedTime}
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
