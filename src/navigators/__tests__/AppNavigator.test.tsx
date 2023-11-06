import { render, screen, userEvent } from "@testing-library/react-native";
import { AppNavigator } from "../AppNavigator";

// Ensure localization gets English and prevent undefined errors
jest.mock("expo-localization", () => {
  const original = jest.requireActual("expo-localization");
  return {
    __esModule: true,
    ...original,
    getLocales: () => {
      return [{ languageCode: "en" }];
    },
  };
});

describe("<AppNavigator />", () => {
  test("Component renders default screen", () => {
    render(<AppNavigator />);
    // Renders meditation settings screen
    const instructionCard = screen.getByText("Instructions");
    expect(instructionCard).toBeVisible();
  });
});
