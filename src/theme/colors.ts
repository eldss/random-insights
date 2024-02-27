import { Theme } from "@react-navigation/native";

const neutral = {
  white: "#FFFFFF",
  gray100: "#E6E6E6",
  gray200: "#CCCCCC",
  gray300: "#B3B3B3",
  gray400: "#999999",
  gray500: "#808080",
  gray600: "#666666",
  gray700: "#4C4C4C",
  gray800: "#333333",
  gray900: "#1A1A1A",
  black: "#000000",
};

const lotus = {
  white: "#EFF1F5",
  gray: neutral.gray100,
  gold: "#BD6C00",
  orange: "#E16B29",
  waterBlue: "#005284",
  leafGreen: "#006833",
  pink: "#B2144B",
};

const WHITE_GOLD: Theme = {
  dark: false,
  colors: {
    primary: lotus.gold,
    background: lotus.gray,
    card: lotus.white,
    text: neutral.black,
    border: lotus.gold,
    notification: lotus.gold,
  },
};

const WHITE_BLUE: Theme = {
  dark: false,
  colors: {
    primary: lotus.waterBlue,
    background: lotus.gray,
    card: lotus.white,
    text: neutral.black,
    border: lotus.waterBlue,
    notification: lotus.waterBlue,
  },
};

const WHITE_GREEN: Theme = {
  dark: false,
  colors: {
    primary: lotus.leafGreen,
    background: lotus.gray,
    card: lotus.white,
    text: neutral.black,
    border: lotus.leafGreen,
    notification: lotus.leafGreen,
  },
};

const WHITE_PINK: Theme = {
  dark: false,
  colors: {
    primary: lotus.pink,
    background: lotus.gray,
    card: lotus.white,
    text: neutral.black,
    border: lotus.pink,
    notification: lotus.pink,
  },
};

export type AppTheme = { id: string; theme: Theme };

// First element is default
export const THEMES: AppTheme[] = [
  {
    id: "WhiteGold",
    theme: WHITE_GOLD,
  },
  {
    id: "WhiteBlue",
    theme: WHITE_BLUE,
  },
  {
    id: "WhiteGreen",
    theme: WHITE_GREEN,
  },
  {
    id: "WhitePink",
    theme: WHITE_PINK,
  },
] as const;
