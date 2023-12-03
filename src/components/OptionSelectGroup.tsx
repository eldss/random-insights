import React, { useMemo } from "react";
import { View, ViewStyle } from "react-native";
import { Button } from "./Button";

type Option = { text: string; value: string | number };

export interface OptionSelectGroupProps {
  /** List of text options to select from. */
  options: Option[];
  /** Selected option by index. */
  selectedIndex: number;
}

export function OptionSelectGroup({
  options,
  selectedIndex,
}: OptionSelectGroupProps) {
  const optionButtons = useMemo(
    () =>
      options.map((option, index) => (
        <View style={$optionContainer} key={index}>
          <Button
            preset="selectOption"
            selectOptionProps={{
              text: option.text,
              isSelected: selectedIndex === index,
            }}
          />
        </View>
      )),
    [options, selectedIndex],
  );
  return <View style={$row}>{optionButtons}</View>;
}

const $row: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
};

const $optionContainer: ViewStyle = {
  flex: 1,
};
