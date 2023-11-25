import { render, screen, userEvent } from "@testing-library/react-native";
import { SelectTimeCard } from "../SelectTimeCard";
import { PersistentStateProvider } from "../PersistentStateProvider";
import { DEFAULT_MEDITATION_SETTINGS_STATE } from "../../hooks";

describe("<SelectTimeCard />", () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  let contextState = { ...DEFAULT_MEDITATION_SETTINGS_STATE };
  beforeEach(() => {
    jest.useFakeTimers();
    contextState = { ...DEFAULT_MEDITATION_SETTINGS_STATE };
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Component renders", () => {
    render(
      <PersistentStateProvider initialMedSettingsState={contextState}>
        <SelectTimeCard />
      </PersistentStateProvider>,
    );
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
    contextState.timeSelector.selectedTimeMinutes = timeMins;
    render(
      <PersistentStateProvider initialMedSettingsState={contextState}>
        <SelectTimeCard />
      </PersistentStateProvider>,
    );
    const time = screen.getByText(formatted);
    expect(time).toBeVisible();
  });

  test("Dispatch handles opening and closing state", async () => {
    render(
      <PersistentStateProvider initialMedSettingsState={contextState}>
        <SelectTimeCard />
      </PersistentStateProvider>,
    );

    // Before, content is visible
    const collapseButton = screen.getByRole("button");
    let content = screen.getByText("Hours : Minutes");
    expect(content).toBeVisible();

    // After press, content is not visible
    await user.press(collapseButton);
    content = screen.queryByText("Hours : Minutes");
    expect(content).not.toBeOnTheScreen();

    // After second press, visible again
    await user.press(collapseButton);
    content = screen.getByText("Hours : Minutes");
    expect(content).toBeVisible();
  });
});
