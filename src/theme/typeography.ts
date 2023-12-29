import { TextStyle } from "react-native";
import { spacing } from "./spacing";

/**
 * Semantic font sizes.
 */
export const fontSize = {
  sm: 12,
  mdSm: 14,
  md: 17,
  mdLg: 20,
  lg: 24,
} as const;

export const textStyle: Record<string, TextStyle> = {
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: "500",
    textAlign: "center",
  },
  cardSubTitle: {
    fontSize: fontSize.md,
    fontWeight: "500",
    fontStyle: "italic",
    marginBottom: spacing.xxs,
  },
};
