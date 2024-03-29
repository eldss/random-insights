import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
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
  | "selectOption"
  | "doAction"
  | "doActionSecondary";

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
    let $viewColor: ViewStyle;
    let $textColor: TextStyle;
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
            testID="refresh-btn"
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
            testID="settings-btn"
          />
        );
      case "collapsible":
        return (
          <AntDesign
            name={collapsibleProps.isOpen ? "down" : "right"}
            size={fontSize.mdLg}
            color={theme.colors.text}
            testID="collapsible-btn"
          />
        );
      case "selectOption":
        $viewColor = selectOptionProps.isSelected
          ? {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.primary,
            }
          : {
              borderColor: theme.colors.border,
            };
        $textColor = selectOptionProps.isSelected
          ? { color: theme.colors.card }
          : { color: theme.colors.border };
        return (
          <View style={[$optionContainerBase, $viewColor]}>
            <Text style={[$optionTextBase, $textColor]}>
              {selectOptionProps.text}
            </Text>
          </View>
        );
      case "doAction":
        $viewColor = {
          backgroundColor: theme.colors.primary,
          borderWidth: 1,
          borderColor: theme.colors.primary,
        };
        $textColor = {
          color: theme.colors.card,
        };
        return (
          <View
            style={[$doActionContainer, $viewColor, pressed ? $pressed : null]}
          >
            <Text style={[$doActionText, $textColor]}>{children}</Text>
          </View>
        );
      case "doActionSecondary":
        $viewColor = {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.primary,
          borderWidth: 1,
        };
        $textColor = {
          color: theme.colors.primary,
        };
        return (
          <View
            style={[$doActionContainer, $viewColor, pressed ? $pressed : null]}
          >
            <Text style={[$doActionText, $textColor]}>{children}</Text>
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

const $doActionContainer: ViewStyle = {
  padding: spacing.xs,
  borderRadius: spacing.xxs,
  justifyContent: "center",
  alignItems: "center",
};

const $doActionText: TextStyle = {
  fontSize: fontSize.mdLg,
  fontWeight: "500",
};

const $pressed: ViewStyle = {
  opacity: 0.65,
};
