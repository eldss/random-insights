import { View, Text, ViewStyle, TextStyle } from "react-native";
import React, { ReactNode } from "react";
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
export default function Card({ title, children }: CardProps) {
  return (
    <View style={$containerBase}>
      <Text style={$title}>{title}</Text>
      {children}
    </View>
  );
}

const $containerBase: ViewStyle = {
  borderRadius: spacing.xs,
  padding: spacing.xs,
  minHeight: 96,
};

const $title: TextStyle = {
  fontSize: fontSize.mdLg,
};

const $bodyText: TextStyle = {
  fontSize: fontSize.md,
};
