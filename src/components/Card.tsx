import React, { ReactNode, useState } from "react";
import { Text, View, ViewStyle } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { colors, spacing, textStyle } from "../theme";
import { Button } from "./Button";

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
            <Text style={textStyle.cardTitle}>{title}</Text>
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

const $buttonOverride: ViewStyle = {
  alignSelf: "flex-start",
  marginHorizontal: spacing.xxxs,
};
