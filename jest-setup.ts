import "@testing-library/jest-native/extend-expect";

// Ensure localization gets English and prevent undefined errors
jest.mock("expo-localization", () => {
  const original = jest.requireActual("expo-localization");
  return {
    __esModule: true,
    ...original,
    getLocales: () => {
      return [
        {
          languageCode: "en",
        },
      ];
    },
  };
});

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);
