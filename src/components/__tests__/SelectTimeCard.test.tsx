import { render, screen, userEvent } from "@testing-library/react-native";
import { SelectTimeCard } from "../SelectTimeCard";
import { PersistentStateProvider } from "../PersistentStateProvider";
import {
  DEFAULT_APP_SETTINGS_STATE,
  DEFAULT_MEDITATION_SETTINGS_STATE,
} from "../../hooks";

describe("<SelectTimeCard />", () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  let contextMedState = { ...DEFAULT_MEDITATION_SETTINGS_STATE };
  let contextAppState = { ...DEFAULT_APP_SETTINGS_STATE };

  beforeEach(() => {
    jest.useFakeTimers();
    contextMedState = { ...DEFAULT_MEDITATION_SETTINGS_STATE };
    contextAppState = { ...DEFAULT_APP_SETTINGS_STATE };
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Component renders", () => {
    render(
      <PersistentStateProvider
        initialMedSettingsState={contextMedState}
        initialAppSettingsState={contextAppState}
      >
        <SelectTimeCard />
      </PersistentStateProvider>,
    );
    const component = screen.getByText("Time");
    const helperText = screen.getByText("Hours : Minutes");
    const numberLine = screen.getByTestId("number-line-selector");
    const preStart = screen.getByText("Seconds before start bell:");
    expect(component).toBeVisible();
    expect(helperText).toBeVisible();
    expect(numberLine).toBeVisible();
    expect(preStart).toBeVisible();
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
    contextMedState.timeSelector.selectedTimeMinutes = timeMins;
    render(
      <PersistentStateProvider
        initialMedSettingsState={contextMedState}
        initialAppSettingsState={contextAppState}
      >
        <SelectTimeCard />
      </PersistentStateProvider>,
    );
    const time = screen.getByText(formatted);
    expect(time).toBeVisible();
  });

  test("User can view pre-start time buttons and click them without error", async () => {
    render(
      <PersistentStateProvider
        initialMedSettingsState={contextMedState}
        initialAppSettingsState={contextAppState}
      >
        <SelectTimeCard />
      </PersistentStateProvider>,
    );

    const btns = screen.getAllByRole("button");
    expect(btns).toHaveLength(4);

    // I don't know a good way to check this changes, but I can at least check
    // that it doesn't crash or error.
    await user.press(btns[1]);
    await user.press(btns[2]);
    await user.press(btns[3]);
    await user.press(btns[0]);
  });
});
