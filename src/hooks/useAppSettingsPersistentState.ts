import { useContext, useEffect, useState } from "react";
import { AppSettingsContext, AppSettingsDispatchContext } from "../state";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppTheme, THEMES } from "../theme";

/**
 * Key to get and store persistent state for the app settings screen.
 */
const APP_SETTINGS_STORAGE_KEY = "RandomInsights_AppSettingsScreen_State";

/** State if nothing is found in persistent storage. */
export const DEFAULT_APP_SETTINGS_STATE: AppTheme = THEMES[0];

// TODO: All the state logic should be abstracted and refactored to be re-usable
// There is a lot of common logic and it is annoying to copy/paste/update
/**
 * Gets initial state that was persisted on the device for the
 * AppSettingsScreen. Returns default values if nothing was found.
 */
export function useAppSettingsStoredState() {
  const [storedState, setStoredState] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem(APP_SETTINGS_STORAGE_KEY);

        value === null
          ? setStoredState(DEFAULT_APP_SETTINGS_STATE)
          : setStoredState(JSON.parse(value));
      } catch (e) {
        console.error(
          `Problem getting persistent state for key ${APP_SETTINGS_STORAGE_KEY}. ${e}`,
          "Setting default state as backup.",
        );
        setStoredState(DEFAULT_APP_SETTINGS_STATE);
      }
    };

    getData();
  }, []);

  return storedState;
}

/**
 * Use the active app settings screen state.
 */
export function useAppSettingsState() {
  return useContext(AppSettingsContext);
}

/**
 * Use the dispatch function to update app settings screen state.
 */
export function useAppSettingsDispatch() {
  return useContext(AppSettingsDispatchContext);
}

/**
 * Persists the given state to the user's device.
 * @param state Current app settings state
 */
export async function persistAppSettings(state: AppTheme) {
  try {
    const stateAsString = JSON.stringify(state);
    await AsyncStorage.setItem(APP_SETTINGS_STORAGE_KEY, stateAsString);
  } catch (e) {
    console.error(
      `Problem setting persistent state for key ${APP_SETTINGS_STORAGE_KEY}. ${e}`,
      "Keeping previously stored values.",
    );
  }
}
