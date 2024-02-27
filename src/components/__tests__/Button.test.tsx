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

  test.each([
    { preset: "refresh" },
    { preset: "settings" },
    { preset: "collapsible" },
    { preset: "selectOption" },
    { preset: "doAction" },
    { preset: "doActionSecondary" },
  ])(
    `Button with preset $preset calls onPress when pressed`,
    async ({ preset }) => {
      const fn = jest.fn();
      if (preset === "selectOption") {
        render(
          <Button
            preset={preset as ButtonPreset}
            onPress={fn}
            selectOptionProps={{ isSelected: true, text: "Foo" }}
          />,
        );
      } else {
        render(<Button preset={preset as ButtonPreset} onPress={fn} />);
      }

      const button = screen.getByRole("button");
      await user.press(button);
      expect(fn).toHaveBeenCalledTimes(1);
    },
  );

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

  test("Settings button renders", () => {
    render(<Button preset="settings" />);
    const button = screen.getByRole("button");
    expect(button.children[0]).toHaveProp("name", "settings-sharp");
  });

  test("selectOption button renders text given to it, when selected", () => {
    render(
      <Button
        preset="selectOption"
        selectOptionProps={{ text: "Test", isSelected: true }}
      />,
    );
    let text = screen.getByText("Test");
    expect(text).toBeVisible();
  });

  test("selectOption button renders text given to it, when not selected", () => {
    render(
      <Button
        preset="selectOption"
        selectOptionProps={{ text: "Test", isSelected: false }}
      />,
    );
    let text = screen.getByText("Test");
    expect(text).toBeVisible();
  });
});
