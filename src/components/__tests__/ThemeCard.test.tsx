import { render, screen } from "@testing-library/react-native";
import { ThemeCard } from "../ThemeCard";

describe("<ThemeCard />", () => {
  test("Component renders", () => {
    render(<ThemeCard />);
    const component = screen.getByText("Current");
    expect(component).toBeVisible();
  });
});
