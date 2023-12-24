import {
  AppSettingsAction,
  AppSettingsActionType,
  AppTheme,
  appSettingsReducer,
} from "../appSettingsReducer";

describe("appSettingsReducer tests", () => {
  const DEFAULT_STATE: AppTheme = {
    theme: "WhiteGold",
  };
  let startState: AppTheme;
  let expectedState: AppTheme;
  let nextState: AppTheme;

  beforeEach(() => {
    startState = {
      ...DEFAULT_STATE,
    };
    expectedState = {
      ...DEFAULT_STATE,
    };
    nextState = undefined;
  });

  test("Update the theme", () => {
    const action: AppSettingsAction = {
      type: AppSettingsActionType.UPDATE_THEME,
      payload: {
        theme: "WhiteBlue",
      },
    };
    expectedState.theme = "WhiteBlue";
    nextState = appSettingsReducer(startState, action);
    expect(nextState).toEqual(expectedState);
  });
});
