import { render, screen, userEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import { Button, ButtonPreset } from "../Button";

describe("<Button />", () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test.each([{ preset: "refresh" }, { preset: "collapsible" }])(
    `Button with preset $preset renders`,
    ({ preset }) => {
      render(<Button preset={preset as ButtonPreset} />);
      const button = screen.getByRole("button");
      expect(button).toBeVisible();
    },
  );

  test("Button with children and no preset renders the children", () => {
    render(
      <Button>
        <Text>Foo</Text>
      </Button>,
    );
    const text = screen.queryByText("Foo");
    expect(text).toHaveTextContent("Foo");
  });

  test("Button with a preset AND children ignores the children", () => {
    render(
      <Button preset="refresh">
        <Text>Foo</Text>
      </Button>,
    );
    const text = screen.queryByText("Foo");
    expect(text).not.toBeOnTheScreen();
  });

  test("Button calls onPress when pressed", async () => {
    const fn = jest.fn();
    render(<Button preset="refresh" onPress={fn} />);

    const button = screen.getByRole("button");
    await user.press(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("Collapsible button faces right when closed", () => {
    render(
      <Button preset="collapsible" collapsibleProps={{ isOpen: false }} />,
    );
    const button = screen.getByRole("button");
    // Child is Icon
    expect(button.children[0]).toHaveProp("name", "right");
  });

  test("Collapsible button faces down when open", () => {
    render(<Button preset="collapsible" collapsibleProps={{ isOpen: true }} />);
    const button = screen.getByRole("button");
    // Child is Icon
    expect(button.children[0]).toHaveProp("name", "down");
  });

  test("Plus button has plus icon and can be pressed", async () => {
    const fn = jest.fn();
    render(<Button preset="plus" onPress={fn} />);

    const button = screen.getByRole("button");
    expect(button.children[0]).toHaveProp("name", "plus");
    await user.press(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("Minus button has minus icon and can be pressed", async () => {
    const fn = jest.fn();
    render(<Button preset="minus" onPress={fn} />);

    const button = screen.getByRole("button");
    expect(button.children[0]).toHaveProp("name", "minus");
    await user.press(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
