import { BellValue } from "../../state";
import { getMidBellTimes } from "../getMidBellTimes";

describe("getMidBellTimes", () => {
  // Test for each percentage-based bell value
  const totalTimeInSeconds = 3600; // 1 hour for easy calculation
  const percentageTests: { bell: BellValue; expectedTime: number }[] = [
    { bell: "10%", expectedTime: 3240 },
    { bell: "25%", expectedTime: 2700 },
    { bell: "50%", expectedTime: 1800 },
    { bell: "75%", expectedTime: 900 },
    { bell: "90%", expectedTime: 360 },
  ];

  percentageTests.forEach(({ bell, expectedTime }) => {
    it(`calculates correct time for ${bell} bell`, () => {
      expect(getMidBellTimes(bell, totalTimeInSeconds)).toEqual(
        new Set([expectedTime]),
      );
    });
  });

  // Test for each minute-based bell value
  const minuteTests: { bell: BellValue; expectedTimes: number[] }[] = [
    {
      bell: "2mins",
      // Assuming a total time of 20 minutes for easier comprehension
      expectedTimes: [120, 240, 360, 480, 600, 720, 840, 960, 1080],
    },
    {
      bell: "5mins",
      expectedTimes: [300, 600, 900],
    },
    {
      bell: "10mins",
      expectedTimes: [600],
    },
    {
      bell: "15mins",
      expectedTimes: [300],
    },
  ];

  minuteTests.forEach(({ bell, expectedTimes }) => {
    it(`calculates correct times for ${bell} bell within a 20-minute period`, () => {
      const totalTimeInSeconds = 1200; // 20 minutes
      const expectedSet = new Set(expectedTimes);
      expect(getMidBellTimes(bell, totalTimeInSeconds)).toEqual(expectedSet);
    });
  });

  // Test for "None" bell value
  it('calculates no times for "None" bell value', () => {
    const bell = "None";
    const expected = new Set();
    expect(getMidBellTimes(bell, totalTimeInSeconds)).toEqual(expected);
  });
});
