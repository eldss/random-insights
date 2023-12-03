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

const robes = {
  red: "#990113",
  darkRed: "#350000",
  orange: "#EA751F",
  yellow: "#E3AC26",
};

export const MONK_ROBES: Theme = {
  dark: true,
  colors: {
    primary: robes.yellow,
    background: robes.darkRed,
    card: robes.red,
    text: neutral.gray100,
    border: robes.yellow,
    notification: robes.orange,
  },
};

export const colors = {
  palette: neutral,
  theme: MONK_ROBES,
};
