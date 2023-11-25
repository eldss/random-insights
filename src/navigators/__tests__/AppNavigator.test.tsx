import { render, screen, userEvent } from "@testing-library/react-native";
import { AppNavigator } from "../AppNavigator";

describe("<AppNavigator />", () => {
  test("Component renders default screen", () => {
    render(<AppNavigator />);
    // Renders meditation settings screen
    const instructionCard = screen.getByText("Instructions");
    expect(instructionCard).toBeVisible();
  });
});
