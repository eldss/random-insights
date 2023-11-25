import { render, screen } from "@testing-library/react-native";
import { SelectTimeCard } from "../SelectTimeCard";

describe("<SelectTimeCard />", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Component renders", () => {
    render(<SelectTimeCard tempVal={20} />);
    const component = screen.getByText("Select Time");
    const helperText = screen.getByText("Hours : Minutes");
    const numberLine = screen.getByTestId("number-line-selector");
    expect(component).toBeVisible();
    expect(helperText).toBeVisible();
    expect(numberLine).toBeVisible();
  });

  test.each([
    [0, "00:00"],
    [30, "00:30"],
    [60, "01:00"],
    [90, "01:30"],
    [120, "02:00"],
    [150, "02:30"],
    [180, "03:00"],
  ])("Should format the time correctly", (timeMins, formatted) => {
    render(<SelectTimeCard tempVal={timeMins} />);
    const time = screen.getByText(formatted);
    expect(time).toBeVisible();
  });
});
