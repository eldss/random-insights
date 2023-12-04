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

const whiteLotus = {
  white: "#EFF1F5",
  gray: neutral.gray100,
  gold: "#BD6C00",
  blue: "#005284",
  green: "#006833",
};

const robes = {
  red: "#990113",
  darkRed: "#350000",
  orange: "#EA751F",
  yellow: "#E3AC26",
};

export const WHITE_LOTUS_GOLD: Theme = {
  dark: false,
  colors: {
    primary: whiteLotus.white,
    background: whiteLotus.gray,
    card: whiteLotus.white,
    text: neutral.black,
    border: whiteLotus.gold,
    notification: whiteLotus.gold,
  },
};

export const WHITE_LOTUS_BLUE: Theme = {
  dark: false,
  colors: {
    primary: whiteLotus.white,
    background: whiteLotus.gray,
    card: whiteLotus.white,
    text: neutral.black,
    border: whiteLotus.blue,
    notification: whiteLotus.blue,
  },
};

export const WHITE_LOTUS_GREEN: Theme = {
  dark: false,
  colors: {
    primary: whiteLotus.white,
    background: whiteLotus.gray,
    card: whiteLotus.white,
    text: neutral.black,
    border: whiteLotus.green,
    notification: whiteLotus.green,
  },
};

export const MONK_ROBES: Theme = {
  dark: true,
  colors: {
    primary: robes.red,
    background: robes.darkRed,
    card: robes.red,
    text: neutral.gray100,
    border: robes.yellow,
    notification: robes.yellow,
  },
};

export const colors = {
  palette: neutral,
  theme: MONK_ROBES,
};
