import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { PersistentStateProvider } from "../PersistentStateProvider";
import { MeditationSettingsPersistentState } from "../../state";

describe("<PersistentStateProvider />", () => {
  test("Component can render", () => {
    const initialState: MeditationSettingsPersistentState = {
      instructions: {
        isOpen: true,
      },
      timeSelector: {
        selectedTimeMinutes: 20,
        selectedPreTimeIndex: 0,
      },
    };
    render(
      <PersistentStateProvider initialMedSettingsState={initialState}>
        <Text>Foo</Text>
      </PersistentStateProvider>,
    );

    const text = screen.getByText("Foo");
    expect(text).toBeVisible();
  });
});
