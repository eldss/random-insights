import { renderHook } from "@testing-library/react-native";
import { useSound } from "../useSound";

jest.mock("expo-av", () => {
  return {
    Audio: {
      setAudioModeAsync: jest.fn(),
      Sound: jest.fn().mockImplementation(() => ({
        loadAsync: jest.fn().mockResolvedValue(true),
        replayAsync: jest.fn().mockResolvedValue(true),
        unloadAsync: jest.fn().mockResolvedValue(true),
      })),
    },
  };
});

describe("useSound hook", () => {
  it("plays sound", async () => {
    const audioUri = require("../../../assets/bell.wav");

    const { result } = renderHook(() => useSound(audioUri));

    let returnedVal = false;
    returnedVal = await result.current.playSound();
    expect(returnedVal).toBe(true);
  });
});
