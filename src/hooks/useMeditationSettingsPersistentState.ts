import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import {
  MeditationSettingsContext,
  MeditationSettingsDispatchContext,
  MeditationSettingsPersistentState,
} from "../state";

/**
 * Key to get and store persistent state for the meditation settings screen.
 */
const MEDITATION_SETTINGS_STORAGE_KEY =
  "RandomInsights_MeditationSettingsScreen_State";

/** State if nothing is found in persistent storage. */
export const DEFAULT_MEDITATION_SETTINGS_STATE: MeditationSettingsPersistentState =
  {
    instructions: {
      isOpen: true,
    },
    timeSelector: {
      selectedTimeMinutes: 20,
      selectedPreTimeSeconds: 5,
    },
  };

/**
 * Gets initial state that was persisted on the device for the
 * MeditationSettingsScreen. Returns default values if nothing was found.
 */
export function useMeditationSettingsStoredState() {
  const [storedState, setStoredState] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem(
          MEDITATION_SETTINGS_STORAGE_KEY,
        );

        value === null
          ? setStoredState(DEFAULT_MEDITATION_SETTINGS_STATE)
          : setStoredState(JSON.parse(value));
      } catch (e) {
        console.error(
          `Problem getting persistent state for key ${MEDITATION_SETTINGS_STORAGE_KEY}. ${e}`,
          "Setting default state as backup.",
        );
        setStoredState(DEFAULT_MEDITATION_SETTINGS_STATE);
      }
    };

    getData();
  }, []);

  return storedState;
}

/**
 * Use the active meditation settings screen state.
 */
export function useMeditationSettingsState() {
  return useContext(MeditationSettingsContext);
}

/**
 * Use the dispatch function to update meditation settings screen state.
 */
export function useMeditationSettingsDispatch() {
  return useContext(MeditationSettingsDispatchContext);
}

/**
 * Persists the given state to the user's device.
 * @param state Current meditation settings state
 */
export async function persistMeditationSettings(
  state: MeditationSettingsPersistentState,
) {
  try {
    const stateAsString = JSON.stringify(state);
    await AsyncStorage.setItem(MEDITATION_SETTINGS_STORAGE_KEY, stateAsString);
  } catch (e) {
    console.error(
      `Problem setting persistent state for key ${MEDITATION_SETTINGS_STORAGE_KEY}. ${e}`,
      "Keeping previously stored values.",
    );
  }
}
