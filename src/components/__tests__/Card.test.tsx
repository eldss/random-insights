import { render, screen, userEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import { Card } from "../Card";

describe("<Card />", () => {
  const renderBasicCard = () =>
    render(
      <Card title="Foo">
        <Text>Bar</Text>
      </Card>,
    );
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  beforeEach(() => {
    // Warnings say this is recommended with user events
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("Basic card renders", () => {
    render(<Card title="Foo"></Card>);
    const title = screen.getByText("Foo");
    expect(title).toBeVisible();
  });

  test("Card renders open by default", () => {
    renderBasicCard();

    // Button should indicate open by pointing down
    const collapseButton = screen.getByRole("button");
    const icon = collapseButton.children[0];
    expect(icon).toHaveProp("name", "down");

    // Content should be visible
    const content = screen.getByText("Bar");
    expect(content).toBeVisible();
  });

  test("Collapse button closes and opens the card", async () => {
    renderBasicCard();

    // Starts open
    const collapseButton = screen.getByRole("button");
    const icon = collapseButton.children[0];
    let content = screen.queryByText("Bar");
    expect(icon).toHaveProp("name", "down");
    expect(content).toBeVisible();

    // Close it
    await user.press(collapseButton);
    content = screen.queryByText("Bar");
    expect(icon.props.name).toBe("right");
    expect(content).not.toBeOnTheScreen();

    // Open it again
    await user.press(collapseButton);
    content = screen.queryByText("Bar");
    expect(icon).toHaveProp("name", "down");
    expect(content).toBeVisible();
  });
});
