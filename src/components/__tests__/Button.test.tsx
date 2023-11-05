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
      expect(button).toBeDefined();
    },
  );

  test("Button with children and no preset renders the children", () => {
    render(
      <Button>
        <Text>Foo</Text>
      </Button>,
    );
    const text = screen.queryByText("Foo");
    expect(text.children[0]).toBe("Foo");
  });

  test("Button with a preset AND children ignores the children", () => {
    render(
      <Button preset="refresh">
        <Text>Foo</Text>
      </Button>,
    );
    const text = screen.queryByText("Foo");
    expect(text).toBeNull();
  });

  test("Button calls onPress when pressed", async () => {
    const fn = jest.fn();
    render(<Button preset="refresh" onPress={fn} />);

    const button = screen.getByRole("button");
    await user.press(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
