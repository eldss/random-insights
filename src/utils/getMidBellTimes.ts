import { BellValue } from "../state";

/**
 * Determine where to play mid meditation bells. Returns a set of the times a
 * bell will ring during the meditation, in seconds.
 */
export function getMidBellTimes(
  bells: BellValue,
  totalTimeInSeconds: number,
): Set<number> {
  const SECONDS_IN_MINUTE = 60;
  const timesToRing = new Set<number>();

  if (bells.endsWith("%")) {
    const percentage = parseInt(bells, 10);
    // Calculate time in seconds based on the percentage
    const timeInSeconds =
      totalTimeInSeconds - Math.round((percentage / 100) * totalTimeInSeconds);
    timesToRing.add(timeInSeconds);
  } else if (bells.endsWith("mins")) {
    const mins = parseInt(bells, 10);
    // Convert interval from minutes to seconds
    const intervalInSeconds = mins * SECONDS_IN_MINUTE;
    for (
      let i = totalTimeInSeconds - intervalInSeconds;
      i > 0;
      i -= intervalInSeconds
    ) {
      timesToRing.add(i);
    }
  }
  return timesToRing;
}
