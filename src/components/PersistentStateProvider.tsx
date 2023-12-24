import React, { ReactNode, useReducer } from "react";
import {
  AppSettingsContext,
  AppSettingsDispatchContext,
  AppTheme,
  MeditationSettingsContext,
  MeditationSettingsDispatchContext,
  MeditationSettingsPersistentState,
  appSettingsReducer,
  meditationSettingsReducer,
} from "../state";

export interface PersistentStateProviderProps {
  /** Initial settings for the meditation settings screen. */
  initialMedSettingsState: MeditationSettingsPersistentState;
  /** Initial settings for the app settings screen. */
  initialAppSettingsState: AppTheme;
  /** Children to render (the app). */
  children: ReactNode;
}

/**
 * Interface for multiple react context providers related to
 * persistent state in the app.
 */
export function PersistentStateProvider({
  initialMedSettingsState,
  initialAppSettingsState,
  children,
}: PersistentStateProviderProps) {
  const [medSettings, medSettingsDispatch] = useReducer(
    meditationSettingsReducer,
    initialMedSettingsState,
  );

  const [appSettings, appSettingsDispatch] = useReducer(
    appSettingsReducer,
    initialAppSettingsState,
  );

  return (
    <MeditationSettingsContext.Provider value={medSettings}>
      <MeditationSettingsDispatchContext.Provider value={medSettingsDispatch}>
        <AppSettingsContext.Provider value={appSettings}>
          <AppSettingsDispatchContext.Provider value={appSettingsDispatch}>
            {children}
          </AppSettingsDispatchContext.Provider>
        </AppSettingsContext.Provider>
      </MeditationSettingsDispatchContext.Provider>
    </MeditationSettingsContext.Provider>
  );
}
