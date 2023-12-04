import React, { useEffect, useMemo } from "react";
import { View, ViewStyle } from "react-native";
import { Button } from "./Button";

type Option = { text: string; value: string | number };

export interface OptionSelectGroupProps {
  /** List of text options to select from. Cannot be null or empty. */
  options: Option[];
  /** Selected option by index. */
  selectedIndex: number;
  /** Function to set the selected index. */
  setSelectedIndex: (next: number) => void;
}

/**
 * Renders a group of buttons that are used like radio buttons.
 */
export function OptionSelectGroup({
  options,
  selectedIndex,
  setSelectedIndex,
}: OptionSelectGroupProps) {
  // Sets index to zero if it is not given, or last option if index is out of bounds.
  useEffect(() => {
    if (!options || options.length === 0) {
      throw new Error("`options` must have at least one value.");
    }

    if (!selectedIndex) {
      setSelectedIndex(0);
    } else if (selectedIndex >= options.length) {
      setSelectedIndex(options.length - 1);
    }
  }, []);

  // Create button options from the list of options
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
            onPress={() => setSelectedIndex(index)}
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
