import { render, screen } from "@testing-library/react-native";
import { AppNavigator } from "../AppNavigator";
import { PersistentStateProvider } from "../../components";
import { DEFAULT_MEDITATION_SETTINGS_STATE } from "../../hooks";

describe("<AppNavigator />", () => {
  test("Component renders default screen", () => {
    render(
      <PersistentStateProvider
        initialMedSettingsState={DEFAULT_MEDITATION_SETTINGS_STATE}
      >
        <AppNavigator />
      </PersistentStateProvider>,
    );

    // Renders meditation settings screen
    const instructionCard = screen.getByText("Instructions");
    expect(instructionCard).toBeVisible();
  });
});
