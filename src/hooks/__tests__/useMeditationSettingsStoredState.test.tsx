import { renderHook, waitFor } from "@testing-library/react-native";
import {
  DEFAULT_MEDITATION_SETTINGS_STATE,
  persistMeditationSettings,
  useMeditationSettingsStoredState,
} from "../useMeditationSettingsPersistentState";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        timeSelector: { isOpen: true, selectedTimeMinutes: 20 },
      },
    ],
    [
      {
        instructions: { isOpen: true },
        timeSelector: { isOpen: false, selectedTimeMinutes: 20 },
      },
    ],
    [
      {
        instructions: { isOpen: true },
        timeSelector: { isOpen: true, selectedTimeMinutes: 50 },
      },
    ],
    [
      {
        instructions: { isOpen: false },
        timeSelector: { isOpen: false, selectedTimeMinutes: 20 },
      },
    ],
    [
      {
        instructions: { isOpen: false },
        timeSelector: { isOpen: false, selectedTimeMinutes: 90 },
      },
    ],
  ])("Returns exact state that is stored: %o", async (object) => {
    await waitFor(() => {
      persistMeditationSettings(object);
    });
    const { result } = renderHook(() => useMeditationSettingsStoredState());
    await waitFor(() => {
      expect(result.current).toEqual(object);
    });
  });
});
