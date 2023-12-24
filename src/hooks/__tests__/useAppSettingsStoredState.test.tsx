import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook, waitFor } from "@testing-library/react-native";
import { THEMES } from "../../theme";
import {
  DEFAULT_APP_SETTINGS_STATE,
  persistAppSettings,
  useAppSettingsStoredState,
} from "../useAppSettingsPersistentState";

describe("useAppStoredState Hook", () => {
  test("Returns null initially while awaiting data", () => {
    const { result } = renderHook(() => useAppSettingsStoredState());
    expect(result.current).toBeNull();
  });

  test("Returns default state when nothing found in storage", async () => {
    const spy = jest.spyOn(AsyncStorage, "getItem").mockResolvedValueOnce(null);
    const { result } = renderHook(() => useAppSettingsStoredState());
    await waitFor(() => {
      expect(result.current).toEqual(DEFAULT_APP_SETTINGS_STATE);
    });
  });

  test("Returns default state when an error is thrown", async () => {
    const consoleSpy = jest.spyOn(console, "error");
    const storageSpy = jest
      .spyOn(AsyncStorage, "getItem")
      .mockRejectedValueOnce(new Error("Test error"));
    const { result } = renderHook(() => useAppSettingsStoredState());
    await waitFor(() => {
      expect(result.current).toEqual(DEFAULT_APP_SETTINGS_STATE);
    });
    expect(consoleSpy).toHaveBeenCalled();
  });

  THEMES.forEach((theme) => {
    test(`Returns exact state that is stored: ${theme.id}`, async () => {
      await waitFor(() => {
        persistAppSettings(theme);
      });
      const { result } = renderHook(() => useAppSettingsStoredState());
      await waitFor(() => {
        expect(result.current).toEqual(theme);
      });
    });
  });
});
