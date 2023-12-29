import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { PersistentStateProvider } from "../PersistentStateProvider";
import { MeditationSettingsPersistentState } from "../../state";
import { AppTheme, THEMES } from "../../theme";

describe("<PersistentStateProvider />", () => {
  test("Component can render", () => {
    const initialMedState: MeditationSettingsPersistentState = {
      instructions: {
        isOpen: true,
      },
      timeSelector: {
        selectedTimeMinutes: 20,
        selectedPreTimeSeconds: 5,
      },
      bellSelector: {
        bellValue: "None",
      },
    };
    const initialAppState: AppTheme = THEMES[0];

    render(
      <PersistentStateProvider
        initialMedSettingsState={initialMedState}
        initialAppSettingsState={initialAppState}
      >
        <Text>Foo</Text>
      </PersistentStateProvider>,
    );

    const text = screen.getByText("Foo");
    expect(text).toBeVisible();
  });
});
