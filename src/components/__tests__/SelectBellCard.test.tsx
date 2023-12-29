import { render } from "@testing-library/react-native";
import { SelectBellCard } from "../SelectBellCard";
import {
  DEFAULT_MEDITATION_SETTINGS_STATE,
  DEFAULT_APP_SETTINGS_STATE,
} from "../../hooks";
import { PersistentStateProvider } from "../PersistentStateProvider";

describe("<SelectBellCard />", () => {
  let contextMedState = { ...DEFAULT_MEDITATION_SETTINGS_STATE };
  let contextAppState = { ...DEFAULT_APP_SETTINGS_STATE };

  beforeEach(() => {
    contextMedState = { ...DEFAULT_MEDITATION_SETTINGS_STATE };
    contextAppState = { ...DEFAULT_APP_SETTINGS_STATE };
  });

  test("Component renders without error", () => {
    render(
      <PersistentStateProvider
        initialMedSettingsState={contextMedState}
        initialAppSettingsState={contextAppState}
      >
        <SelectBellCard />
      </PersistentStateProvider>,
    );
  });
});
