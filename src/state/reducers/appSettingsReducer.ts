import { AppTheme } from "../../theme/colors";

/** Possible reducer action types on the app settings screen. */
export enum AppSettingsActionType {
  UPDATE_THEME,
}

/** Possible reducer payload options on the app settings screen. */
export type AppSettingsActionPayload = AppTheme;

/** Required reducer action shape. */
export interface AppSettingsAction {
  type: AppSettingsActionType;
  payload?: AppSettingsActionPayload;
}

/** Reducer function for persistent state in the app settings screen. */
export function appSettingsReducer(
  state: AppTheme,
  action: AppSettingsAction,
): AppTheme {
  switch (action.type) {
    case AppSettingsActionType.UPDATE_THEME:
      return { ...action.payload };
  }
}
