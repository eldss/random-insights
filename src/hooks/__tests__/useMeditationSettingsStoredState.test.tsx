import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook, waitFor } from "@testing-library/react-native";
import {
  DEFAULT_MEDITATION_SETTINGS_STATE,
  persistMeditationSettings,
  useMeditationSettingsStoredState,
} from "../useMeditationSettingsPersistentState";
import { MeditationSettingsPersistentState } from "../../state/reducers";

describe("useMeditationStoredState Hook", () => {
  test("Returns null initially while awaiting data", () => {
    const { result } = renderHook(() => useMeditationSettingsStoredState());
    expect(result.current).toBeNull();
  });

  test("Returns default state when nothing found in storage", async () => {
    const spy = jest.spyOn(AsyncStorage, "getItem").mockResolvedValueOnce(null);
    const { result } = renderHook(() => useMeditationSettingsStoredState());
    await waitFor(() => {
      expect(result.current).toEqual(DEFAULT_MEDITATION_SETTINGS_STATE);
    });
  });

  test("Returns default state when an error is thrown", async () => {
    const consoleSpy = jest.spyOn(console, "error");
    const storageSpy = jest
      .spyOn(AsyncStorage, "getItem")
      .mockRejectedValueOnce(new Error("Test error"));
    const { result } = renderHook(() => useMeditationSettingsStoredState());
    await waitFor(() => {
      expect(result.current).toEqual(DEFAULT_MEDITATION_SETTINGS_STATE);
    });
    expect(consoleSpy).toHaveBeenCalled();
  });

  test.each([
    [DEFAULT_MEDITATION_SETTINGS_STATE],
    [
      {
        instructions: { isOpen: false },
        timeSelector: { selectedTimeMinutes: 20, selectedPreTimeSeconds: 0 },
        bellSelector: { bellValue: "None" },
      },
    ],
    [
      {
        instructions: { isOpen: true },
        timeSelector: { selectedTimeMinutes: 25, selectedPreTimeSeconds: 0 },
        bellSelector: { bellValue: "None" },
      },
    ],
    [
      {
        instructions: { isOpen: true },
        timeSelector: { selectedTimeMinutes: 20, selectedPreTimeSeconds: 1 },
        bellSelector: { bellValue: "None" },
      },
    ],
    [
      {
        instructions: { isOpen: false },
        timeSelector: { selectedTimeMinutes: 50, selectedPreTimeSeconds: 1 },
        bellSelector: { bellValue: "None" },
      },
    ],
    [
      {
        instructions: { isOpen: false },
        timeSelector: { selectedTimeMinutes: 20, selectedPreTimeSeconds: 0 },
        bellSelector: { bellValue: "10%" },
      },
    ],
  ])("Returns exact state that is stored: %o", async (object) => {
    await waitFor(() => {
      persistMeditationSettings(object as MeditationSettingsPersistentState);
    });
    const { result } = renderHook(() => useMeditationSettingsStoredState());
    await waitFor(() => {
      expect(result.current).toEqual(object);
    });
  });
});
