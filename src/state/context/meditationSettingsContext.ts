import { Context, Dispatch, createContext } from "react";
import {
  MedSettingsAction,
  MeditationSettingsPersistentState,
} from "../reducers/meditationSettingsReducer";

/**
 * Context for persistent state on the meditation settings screen.
 */
export const MeditationSettingsContext: Context<MeditationSettingsPersistentState> =
  createContext(null);

/**
 * Context for setting persistent state on the meditation settings screen.
 */
export const MeditationSettingsDispatchContext: Context<
  Dispatch<MedSettingsAction>
> = createContext(null);
