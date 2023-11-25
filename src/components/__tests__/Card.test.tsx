import { render, screen, userEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import { Card } from "../Card";

describe("<Card />", () => {
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

  test("Card renders with content", () => {
    render(
      <Card title="Foo">
        <Text>Bar</Text>
      </Card>,
    );

    // Content should be visible
    const content = screen.getByText("Bar");
    expect(content).toBeVisible();

    // No button since collapsible not provided
    const collapseButton = screen.queryByRole("button");
    expect(collapseButton).not.toBeOnTheScreen();
  });

  test("Card renders un-collapsible if props given without isCollapsible as true", () => {
    const mockFn = jest.fn();
    render(
      <Card title="Foo" collapsibleProps={{ isOpen: true, setIsOpen: mockFn }}>
        <Text>Bar</Text>
      </Card>,
    );

    // Content should be visible
    const content = screen.getByText("Bar");
    expect(content).toBeVisible();

    // No button since collapsible not provided
    const collapseButton = screen.queryByRole("button");
    expect(collapseButton).not.toBeOnTheScreen();

    // Setter never called
    expect(mockFn).not.toHaveBeenCalled();
  });

  test("Collapse button closes and opens the card when no props given", async () => {
    render(
      <Card title="Foo" isCollapsible={true}>
        <Text>Bar</Text>
      </Card>,
    );

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

  test("Collapsible props can control the collapsed state. Start open.", async () => {
    let isOpen = true;
    const mockFn = jest.fn((next: boolean) => (isOpen = next));
    render(
      <Card
        title="Foo"
        isCollapsible={true}
        collapsibleProps={{ isOpen, setIsOpen: mockFn }}
      >
        <Text>Bar</Text>
      </Card>,
    );

    // Starts open
    const collapseButton = screen.getByRole("button");
    const icon = collapseButton.children[0];
    const content = screen.queryByText("Bar");
    expect(icon).toHaveProp("name", "down");
    expect(content).toBeVisible();

    // Trigger close
    await user.press(collapseButton);
    expect(isOpen).toBe(false);
    expect(mockFn).toHaveBeenCalled();
  });

  test("Collapsible props can control the collapsed state. Start closed.", async () => {
    let isOpen = false;
    const mockFn = jest.fn((next: boolean) => (isOpen = next));
    render(
      <Card
        title="Foo"
        isCollapsible={true}
        collapsibleProps={{ isOpen, setIsOpen: mockFn }}
      >
        <Text>Bar</Text>
      </Card>,
    );

    // Starts open
    const collapseButton = screen.getByRole("button");
    const icon = collapseButton.children[0];
    const content = screen.queryByText("Bar");
    expect(icon).toHaveProp("name", "right");
    expect(content).not.toBeOnTheScreen();

    // Trigger close
    await user.press(collapseButton);
    expect(isOpen).toBe(true);
    expect(mockFn).toHaveBeenCalled();
  });
});
