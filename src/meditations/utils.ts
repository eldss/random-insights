import { Meditation } from "./types";

// TODO: import Jest and test this
/**
 * Provides a random meditation from a list of meditations.
 */
export function getRandomMeditation(meditationList: Meditation[]): Meditation {
  const len = meditationList.length;
  if (len == 0) {
    throw new Error("Parameter `meditationList` must be greater than zero.");
  }

  const randomIndex = Math.floor(Math.random() * len);
  return meditationList[randomIndex];
}
