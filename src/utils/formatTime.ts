const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600;

/**
 * Display the time nicely, like 00:00:00.
 * Hours are excluded if time is under an hour.
 */
export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / SECONDS_IN_HOUR);
  const minutes = Math.floor((seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  const remainingSeconds = seconds % SECONDS_IN_MINUTE;

  const formattedHours = hours > 0 ? `${String(hours).padStart(2, "0")}:` : "";
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
}
