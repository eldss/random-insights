import { Meditation } from "../types";
import { getRandomMeditation } from "../utils";

describe("getRandomMeditation tests", () => {
  let meditations: Meditation[] = [];

  beforeEach(() => {
    meditations = [
      {
        type: "Breath",
        titleStringId: "meditations",
        descriptionStringIds: ["meditations"],
      },
      {
        type: "Emotion",
        titleStringId: "meditations",
        descriptionStringIds: ["meditations"],
      },
      {
        type: "Thought",
        titleStringId: "meditations",
        descriptionStringIds: ["meditations"],
      },
      {
        type: "Sound",
        titleStringId: "meditations",
        descriptionStringIds: ["meditations"],
      },
      {
        type: "Physical",
        titleStringId: "meditations",
        descriptionStringIds: ["meditations"],
      },
    ];
  });

  test("Throws an error when given an empty list", () => {
    meditations = [];
    expect(() => getRandomMeditation(meditations)).toThrow(Error);
  });

  test("Provides the only element in a 1 element list", () => {
    meditations = [meditations[0]];
    expect(getRandomMeditation(meditations)).toBe(meditations[0]);
  });

  test.each([
    { mockRandom: 0.0, expectedIndex: 0 },
    { mockRandom: 0.2, expectedIndex: 1 },
    { mockRandom: 0.4, expectedIndex: 2 },
    { mockRandom: 0.6, expectedIndex: 3 },
    { mockRandom: 0.999, expectedIndex: 4 },
  ])(
    `For a list with 5 elements, returns meditation at index $expectedIndex when random number is $mockRandom`,
    ({ mockRandom, expectedIndex }) => {
      jest.spyOn(global.Math, "random").mockReturnValue(mockRandom);

      expect(getRandomMeditation(meditations)).toBe(meditations[expectedIndex]);

      jest.spyOn(global.Math, "random").mockRestore();
    },
  );
});
