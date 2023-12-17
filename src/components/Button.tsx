import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import React, { ReactNode, useMemo } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle,
  Text,
  TextStyle,
} from "react-native";
import { fontSize, spacing } from "../theme";
import { useTheme } from "@react-navigation/native";

export type ButtonPreset =
  | "refresh"
  | "settings"
  | "collapsible"
  | "selectOption";

export interface ButtonProps extends PressableProps {
  /**
   * Creates a preset button. If defined, children will be ignored.
   * Provided styles can still overwrite preset styles if desired.
   */
  preset?: ButtonPreset;
  /**
   * Optional style override.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Optional children to display. If `preset` is provided, `children` will be ignored.
   */
  children?: ReactNode;
  /**
   * Props for the collapsible preset.
   */
  collapsibleProps?: {
    /**
     * Determines if the button displays a down pointing carat (open) or right
     * pointing (closed). Open by default.
     */
    isOpen: boolean;
  };
  /**
   * Props for the selectOption preset.
   */
  selectOptionProps?: {
    /**
     * Whether the option is selected or not.
     */
    isSelected: boolean;
    /**
     * Text to display in the select option.
     */
    text: string;
  };
}

const SIXTY_FIVE_PERCENT_OPACITY_HEX = "A6";

/**
 * Flexible button component.
 */
export function Button(props: ButtonProps) {
  const {
    children,
    preset,
    style,
    collapsibleProps = { isOpen: true },
    selectOptionProps,
    ...rest
  } = props;
  const theme = useTheme();

  // Gets what should be displayed as text in the button based on preset value
  const getButtonDisplay = (pressed: boolean): ReactNode => {
    switch (preset) {
      case "refresh":
        return (
          <Feather
            name="refresh-cw"
            size={fontSize.mdLg}
            color={
              pressed
                ? theme.colors.text + SIXTY_FIVE_PERCENT_OPACITY_HEX
                : theme.colors.text
            }
          />
        );
      case "settings":
        return (
          <Ionicons
            name="settings-sharp"
            size={fontSize.lg}
            color={
              pressed
                ? theme.colors.text + SIXTY_FIVE_PERCENT_OPACITY_HEX
                : theme.colors.text
            }
          />
        );
      case "collapsible":
        return (
          <AntDesign
            name={collapsibleProps.isOpen ? "down" : "right"}
            size={fontSize.mdLg}
            color={theme.colors.text}
          />
        );
      case "selectOption":
        const $viewColor: ViewStyle = selectOptionProps.isSelected
          ? {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.primary,
            }
          : {
              borderColor: theme.colors.border,
            };
        const $textColor: TextStyle = selectOptionProps.isSelected
          ? { color: theme.dark ? theme.colors.background : theme.colors.card }
          : { color: theme.colors.border };
        return (
          <View style={[$optionContainerBase, $viewColor]}>
            <Text style={[$optionTextBase, $textColor]}>
              {selectOptionProps.text}
            </Text>
          </View>
        );
      default:
        return children;
    }
  };

  return (
    <Pressable
      style={style}
      android_disableSound={true}
      hitSlop={spacing.sm}
      accessibilityRole="button"
      {...rest}
    >
      {({ pressed }) => getButtonDisplay(pressed)}
    </Pressable>
  );
}

const $optionContainerBase: ViewStyle = {
  padding: spacing.xs,
  margin: spacing.xxs,
  borderWidth: 1,
  borderRadius: spacing.xxs,
};

const $optionTextBase: TextStyle = {
  fontSize: fontSize.md,
  textAlign: "center",
};
