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
  darkRed: "#400707",
};

const robes = {
  red: "#990113",
  darkRed: "#350000",
  orange: "#EA751F",
  yellow: "#E3AC26",
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

const MONK_ROBES: Theme = {
  dark: true,
  colors: {
    primary: robes.yellow,
    background: robes.darkRed,
    card: robes.red,
    text: neutral.gray100,
    border: robes.yellow,
    notification: robes.yellow,
  },
};

export type AppTheme = { id: string; theme: Theme };

// First element is default
export const THEMES: AppTheme[] = [
  /*
    Light Themes
   */
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
  /*
    Dark Themes
   */
  {
    id: "MonkRobes",
    theme: MONK_ROBES,
  },
] as const;
