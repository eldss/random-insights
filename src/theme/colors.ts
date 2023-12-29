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
  darkGold: "#BD6C00",
  lightGold: "#EBBA76",
  orange: "#E16B29",
  waterBlue: "#005284",
  lightBlue: "#B1FFFC",
  mediumBlue: "#1ABCCC",
  leafGreen: "#006833",
  lightPink: "#F3DCE0",
  darkPink: "#F5A58F",
  vibrantPink: "#C0004B",
  darkRed: "#400707",
  darkPurple: "#4D2158",
  mediumPurple: "#864A8A",
  lightPurple: "#B585A0",
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
    primary: lotus.darkGold,
    background: lotus.gray,
    card: lotus.white,
    text: neutral.black,
    border: lotus.darkGold,
    notification: lotus.darkGold,
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

const PINK: Theme = {
  dark: false,
  colors: {
    primary: lotus.vibrantPink,
    background: lotus.darkPink,
    card: lotus.lightPink,
    text: neutral.black,
    border: lotus.vibrantPink,
    notification: lotus.vibrantPink,
  },
};

const BLUE: Theme = {
  dark: false,
  colors: {
    primary: lotus.waterBlue,
    background: lotus.mediumBlue,
    card: lotus.lightBlue,
    text: neutral.black,
    border: lotus.waterBlue,
    notification: lotus.waterBlue,
  },
};

const DARK_PURPLE: Theme = {
  dark: true,
  colors: {
    primary: lotus.lightGold,
    background: lotus.darkPurple,
    card: lotus.mediumPurple,
    text: neutral.gray100,
    border: lotus.lightGold,
    notification: lotus.lightGold,
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
  {
    id: "Pink",
    theme: PINK,
  },
  {
    id: "Blue",
    theme: BLUE,
  },
  /*
    Dark Themes
   */
  {
    id: "MonkRobes",
    theme: MONK_ROBES,
  },
  {
    id: "DarkPurple",
    theme: DARK_PURPLE,
  },
] as const;
