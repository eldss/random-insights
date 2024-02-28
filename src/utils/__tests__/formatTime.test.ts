import { formatTime } from "../formatTime";

describe("formatTime", () => {
  it("formats seconds under one minute correctly", () => {
    expect(formatTime(30)).toBe("00:30");
  });

  it("formats exactly one minute correctly", () => {
    expect(formatTime(60)).toBe("01:00");
  });

  it("formats minutes and seconds correctly", () => {
    expect(formatTime(150)).toBe("02:30");
  });

  it("formats exactly one hour correctly", () => {
    expect(formatTime(3600)).toBe("01:00:00");
  });

  it("formats hours, minutes, and seconds correctly", () => {
    expect(formatTime(3665)).toBe("01:01:05");
  });

  it("formats multiple hours correctly", () => {
    expect(formatTime(7322)).toBe("02:02:02");
  });

  it("formats a large number of seconds correctly", () => {
    expect(formatTime(54321)).toBe("15:05:21");
  });

  it("handles 0 seconds correctly", () => {
    expect(formatTime(0)).toBe("00:00");
  });
});
