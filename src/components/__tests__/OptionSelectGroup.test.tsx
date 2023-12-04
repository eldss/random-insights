import { render, screen, userEvent } from "@testing-library/react-native";
import { OptionSelectGroup } from "../OptionSelectGroup";

describe("<OptionSelectGroup />", () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  let index = 0;
  const testSetIndex = jest.fn((next: number) => {
    index = next;
  });
  const options = [
    { text: "Test 1", value: 1 },
    { text: "Test 2", value: 2 },
    { text: "Test 3", value: 3 },
    { text: "Test 4", value: 4 },
  ];

  beforeEach(() => {
    jest.useFakeTimers();
    index = 0;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("Component renders with correct buttons", () => {
    render(
      <OptionSelectGroup
        options={options}
        selectedIndex={0}
        setSelectedIndex={testSetIndex}
      />,
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(4);

    const btn1 = screen.getByText("Test 1");
    const btn2 = screen.getByText("Test 2");
    const btn3 = screen.getByText("Test 3");
    const btn4 = screen.getByText("Test 4");

    expect(btn1).toBeVisible();
    expect(btn2).toBeVisible();
    expect(btn3).toBeVisible();
    expect(btn4).toBeVisible();
  });

  test("Can select a new option", async () => {
    render(
      <OptionSelectGroup
        options={options}
        selectedIndex={0}
        setSelectedIndex={testSetIndex}
      />,
    );

    const btn4 = screen.getByText("Test 4");
    await user.press(btn4);
    const expectedIndex = 3;
    expect(index).toBe(expectedIndex);
    expect(testSetIndex).toHaveBeenCalled();
  });

  test("Handles an out of bounds index by choosing the last option available", () => {
    // Over length
    render(
      <OptionSelectGroup
        options={options}
        selectedIndex={50}
        setSelectedIndex={testSetIndex}
      />,
    );
    expect(index).toBe(options.length - 1);

    // Exactly length
    render(
      <OptionSelectGroup
        options={options}
        selectedIndex={options.length}
        setSelectedIndex={testSetIndex}
      />,
    );
    expect(index).toBe(options.length - 1);
  });

  test("Null index is reset to first index", () => {
    render(
      <OptionSelectGroup
        options={options}
        selectedIndex={null}
        setSelectedIndex={testSetIndex}
      />,
    );
    expect(index).toBe(0);
  });

  test("Does not accept undefined options", () => {
    expect(() =>
      render(
        <OptionSelectGroup
          options={undefined}
          selectedIndex={0}
          setSelectedIndex={testSetIndex}
        />,
      ),
    ).toThrow();
  });

  test("Does not accept zero length options", () => {
    expect(() =>
      render(
        <OptionSelectGroup
          options={[]}
          selectedIndex={0}
          setSelectedIndex={testSetIndex}
        />,
      ),
    ).toThrow();
  });
});
