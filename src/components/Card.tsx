import React, { ReactNode } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { fontSize, spacing } from "../theme";

export interface CardProps {
  /** Title text for the card. */
  title: string;
  /** Children components used for the body of the card. */
  children?: ReactNode;
}

/**
 * A simple and flexible card component to handle basic layout and styles for
 * sections of a screen.
 */
export function Card({ title, children }: CardProps) {
  return (
    <Shadow
      containerStyle={$shadowContent}
      stretch={true}
      distance={2}
      paintInside={false}
    >
      <View style={$cardContainer}>
        <Text style={$title}>{title}</Text>
        <View style={$childrenContainer}>{children}</View>
      </View>
    </Shadow>
  );
}

const $shadowContent: ViewStyle = {
  alignSelf: "stretch",
  marginHorizontal: spacing.xs,
  marginBottom: spacing.xs,
  backgroundColor: "white",
};

const $cardContainer: ViewStyle = {
  borderRadius: spacing.xxs,
  padding: spacing.xs,
  minHeight: 96,
};

const $childrenContainer: ViewStyle = {
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.sm,
  alignItems: "center",
};

const $title: TextStyle = {
  fontSize: fontSize.mdLg,
  textAlign: "center",
  paddingTop: spacing.xxs,
};
