import { render, screen, userEvent } from "@testing-library/react-native";
import { ThemeOption } from "../ThemeOption";
import { THEMES } from "../../theme";
import {
  DEFAULT_APP_SETTINGS_STATE,
  DEFAULT_MEDITATION_SETTINGS_STATE,
} from "../../hooks";
import { PersistentStateProvider } from "../PersistentStateProvider";

describe("<ThemeOption />", () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  afterEach(() => {
    jest.useRealTimers();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Component renders", () => {
    render(<ThemeOption theme={THEMES[0]} />);
    const component = screen.getByRole("radio");
    expect(component).toBeVisible();
  });

  test("Component doesn't crash when pressed", async () => {
    const contextMedState = { ...DEFAULT_MEDITATION_SETTINGS_STATE };
    const contextAppState = { ...DEFAULT_APP_SETTINGS_STATE };
    render(
      <PersistentStateProvider
        initialMedSettingsState={contextMedState}
        initialAppSettingsState={contextAppState}
      >
        <ThemeOption theme={THEMES[1]} />,
      </PersistentStateProvider>,
    );
    const component = screen.getByRole("radio");
    // Not sure how to test more within this component
    await user.press(component);
    expect(component).toBeVisible();
  });
});
