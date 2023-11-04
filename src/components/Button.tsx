import { Feather } from "@expo/vector-icons";
import React, { ReactNode, useCallback, useMemo } from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import { colors, fontSize, spacing } from "../theme";
import { AntDesign } from "@expo/vector-icons";

export interface ButtonProps extends PressableProps {
  /**
   * Creates a preset button. If defined, children will be ignored.
   * Provided styles can still overwrite preset styles if desired.
   */
  preset?: "refresh" | "collapsible";
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
}

/**
 * Flexible button component.
 */
export function Button(props: ButtonProps) {
  const {
    children,
    preset,
    style,
    collapsibleProps = { isOpen: true },
    ...rest
  } = props;

  // Gets what should be displayed as text in the button based on preset value
  const getButtonDisplay = (pressed: boolean): ReactNode => {
    switch (preset) {
      case "refresh":
        return (
          <Feather
            name="refresh-cw"
            size={fontSize.mdLg}
            color={pressed ? colors.buttonTextPressed : colors.buttonText}
          />
        );
      case "collapsible":
        return (
          <AntDesign
            name={collapsibleProps.isOpen ? "down" : "right"}
            size={fontSize.mdLg}
            color={colors.buttonText}
          />
        );
      default:
        return children;
    }
  };

  // Gets what styles should be used based on preset value
  const $finalStyle = useMemo(() => {
    // TODO: Do I need this at all?
    switch (preset) {
      default:
        return [$baseContainer, style];
    }
  }, [preset, style]);

  return (
    <Pressable
      style={$finalStyle}
      android_disableSound={true}
      hitSlop={spacing.sm}
      {...rest}
    >
      {({ pressed }) => getButtonDisplay(pressed)}
    </Pressable>
  );
}

const $baseContainer: ViewStyle = {
  alignItems: "center",
};
