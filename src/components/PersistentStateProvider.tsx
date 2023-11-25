import React, { ReactNode, useReducer } from "react";
import {
  MeditationSettingsContext,
  MeditationSettingsDispatchContext,
  MeditationSettingsPersistentState,
  meditationSettingsReducer,
} from "../state";

export interface PersistentStateProviderProps {
  /** Initial settings for the meditation settings screen. */
  initialMedSettingsState: MeditationSettingsPersistentState;
  /** Children to render (the app). */
  children: ReactNode;
}

/**
 * Single component interface for multiple react context providers related to
 * persistent state in the app.
 */
export function PersistentStateProvider({
  initialMedSettingsState,
  children,
}: PersistentStateProviderProps) {
  const [medSettings, medSettingsDispatch] = useReducer(
    meditationSettingsReducer,
    initialMedSettingsState,
  );

  return (
    <MeditationSettingsContext.Provider value={medSettings}>
      <MeditationSettingsDispatchContext.Provider value={medSettingsDispatch}>
        {children}
      </MeditationSettingsDispatchContext.Provider>
    </MeditationSettingsContext.Provider>
  );
}
