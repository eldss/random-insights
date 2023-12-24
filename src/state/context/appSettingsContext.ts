import { Context, Dispatch, createContext } from "react";
import { AppSettingsAction } from "../reducers/appSettingsReducer";
import { AppTheme } from "../../theme/colors";

/**
 * Context for persistent state on the app settings screen.
 */
export const AppSettingsContext: Context<AppTheme> = createContext(null);

/**
 * Context for setting persistent state on the app settings screen.
 */
export const AppSettingsDispatchContext: Context<Dispatch<AppSettingsAction>> =
  createContext(null);
