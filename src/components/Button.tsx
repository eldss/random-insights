import { Feather } from "@expo/vector-icons";
import React, { ReactNode, useCallback, useMemo } from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import { fontSize, colors, spacing } from "../theme";

export interface ButtonProps extends PressableProps {
  /**
   * Creates a preset button. If defined, children will be ignored.
   * Provided styles can still overwrite preset styles if desired.
   */
  preset?: "refresh";
  /**
   * Optional style override.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Optional children to display. If `preset` is provided, `children` will be ignored.
   */
  children?: ReactNode;
}

/**
 * Flexible button component.
 */
export function Button(props: ButtonProps) {
  const { children, preset, style, ...rest } = props;

  // Gets what should be displayed as text in the button based on preset value
  const getButtonDisplay = useCallback(
    (pressed: boolean): ReactNode => {
      switch (preset) {
        case "refresh":
          return (
            <Feather
              name="refresh-cw"
              size={fontSize.mdLg}
              color={pressed ? colors.buttonTextPressed : colors.text}
            />
          );
        default:
          return children;
      }
    },
    [preset],
  );

  // Gets what styles should be used based on preset value
  const $finalStyle = useMemo(() => {
    switch (preset) {
      case "refresh":
        return [$refresh, $baseContainer, style];
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
  width: "100%",
  alignItems: "center",
};

const $refresh: StyleProp<ViewStyle> = {
  marginTop: spacing.xs,
};
