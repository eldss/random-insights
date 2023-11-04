import React, { ReactNode, useState } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { colors, fontSize, spacing } from "../theme";
import { Button } from "./Button";

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
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Shadow
      containerStyle={$shadowContent}
      stretch={true}
      distance={spacing.xxs}
      paintInside={false}
    >
      <View style={$cardContainer}>
        {/* Title */}
        <View style={$titleContainer}>
          {/* Columns to help center title, but left align button */}
          <View style={$gridColumn}>
            <Button
              preset="collapsible"
              collapsibleProps={{ isOpen: isOpen }}
              onPress={() => setIsOpen(!isOpen)}
              style={$buttonOverride}
            />
          </View>
          <View style={$centerGridColumn}>
            <Text style={$title}>{title}</Text>
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
  backgroundColor: colors.palette.white,
};

const $cardContainer: ViewStyle = {
  borderRadius: spacing.xs,
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

const $title: TextStyle = {
  fontSize: fontSize.mdLg,
  fontWeight: "500",
  textAlign: "center",
};

const $buttonOverride: ViewStyle = {
  alignSelf: "flex-start",
  marginHorizontal: spacing.xxxs,
};
