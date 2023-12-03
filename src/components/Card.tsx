import React, { ReactNode, useMemo, useState } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { colors, spacing, textStyle } from "../theme";
import { Button } from "./Button";
import { useTheme } from "@react-navigation/native";

export interface CardProps {
  /** Title text for the card. */
  title: string;
  /** Children components used for the body of the card. */
  children?: ReactNode;
  /** Indicates if the card can be collapsed to hide content. Default false. */
  isCollapsible?: boolean;
  /**
   * Optional state and state setter functions to allow control from parent
   * components.
   */
  collapsibleProps?: {
    /** Whether card is open or not. */
    isOpen: boolean;
    /** Sets the next value for isOpen */
    setIsOpen: (next: boolean) => void;
  };
}

/**
 * A simple and flexible card component to handle basic layout and styles for
 * sections of a screen.
 */
export function Card({
  title,
  children,
  isCollapsible = false,
  collapsibleProps,
}: CardProps) {
  const [isOpen, setIsOpen] = collapsibleProps
    ? [collapsibleProps.isOpen, collapsibleProps.setIsOpen]
    : useState(true);

  const theme = useTheme();
  const $cardColor: ViewStyle = useMemo(
    () => ({
      backgroundColor: theme.colors.card,
    }),
    [theme],
  );
  const $textColor: TextStyle = useMemo(
    () => ({
      color: theme.colors.text,
    }),
    [theme],
  );

  return (
    <Shadow
      containerStyle={[$shadowContent, $cardColor]}
      stretch={true}
      distance={spacing.xxs}
      paintInside={false}
    >
      <View style={$cardContainer}>
        {/* Title */}
        <View style={$titleContainer}>
          {/* Columns to help center title, but left align button */}
          <View style={$gridColumn}>
            {isCollapsible && (
              <Button
                preset="collapsible"
                collapsibleProps={{ isOpen: isOpen }}
                onPress={() => setIsOpen(!isOpen)}
                style={$buttonOverride}
              />
            )}
          </View>
          <View style={$centerGridColumn}>
            <Text style={[textStyle.cardTitle, $textColor]}>{title}</Text>
          </View>
          <View style={$gridColumn}></View>
        </View>
        {/* Content */}
        {isOpen && <View style={$childrenContainer}>{children}</View>}
      </View>
    </Shadow>
  );
}

const $shadowContent: ViewStyle = {
  alignSelf: "stretch",
  marginHorizontal: spacing.xs,
  marginBottom: spacing.xs,
  borderRadius: spacing.xxs,
};

const $cardContainer: ViewStyle = {
  padding: spacing.xs,
};

const $titleContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: spacing.xxs,
};

const $gridColumn: ViewStyle = {
  flex: 1,
};

const $centerGridColumn: ViewStyle = {
  flex: 8,
};

const $childrenContainer: ViewStyle = {
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.sm,
  alignItems: "center",
};

const $buttonOverride: ViewStyle = {
  alignSelf: "flex-start",
  marginHorizontal: spacing.xxxs,
};
