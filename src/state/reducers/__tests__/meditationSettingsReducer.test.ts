import {
  Action,
  ActionType,
  MeditationSettingsPersistentState,
  meditationSettingsReducer,
} from "../meditationSettingsReducer";

describe("meditationSettingsReducer tests", () => {
  const DEFAULT_STATE: MeditationSettingsPersistentState = {
    instructions: {
      isOpen: true,
    },
    timeSelector: {
      selectedTimeMinutes: 20,
    },
  };
  let startState: MeditationSettingsPersistentState;
  let expectedState: MeditationSettingsPersistentState;
  let nextState: MeditationSettingsPersistentState;

  beforeEach(() => {
    startState = {
      ...DEFAULT_STATE,
    };
    expectedState = {
      ...DEFAULT_STATE,
    };
    nextState = undefined;
  });

  test("Can close and open the instructions card", () => {
    const action: Action = { type: ActionType.CLOSE_INSTRUCTIONS };
    expectedState.instructions.isOpen = false;
    nextState = meditationSettingsReducer(startState, action);
    expect(nextState).toEqual(expectedState);

    action.type = ActionType.OPEN_INSTRUCTIONS;
    expectedState.instructions.isOpen = true;
    nextState = meditationSettingsReducer(nextState, action);
    expect(startState).toEqual(expectedState);
  });

  test("Can set a new time", () => {
    const action: Action = {
      type: ActionType.UPDATE_TIME,
      payload: {
        timeMinutes: 30,
      },
    };
    expectedState.timeSelector.selectedTimeMinutes = 30;
    nextState = meditationSettingsReducer(startState, action);
    expect(nextState).toEqual(expectedState);
  });
});
