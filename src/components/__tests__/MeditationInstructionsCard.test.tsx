import { render, screen, userEvent } from "@testing-library/react-native";
import { MeditationInstructionsCard } from "../MeditationInstructionsCard";
import { Meditation } from "../../meditations";
import { PersistentStateProvider } from "../PersistentStateProvider";
import { DEFAULT_MEDITATION_SETTINGS_STATE } from "../../hooks";

// This value is used to decide which meditation to return.
// I tried other ways to do this from jest docs but I kept getting errors and
// this is the only thing that worked.
let mockReturnValueIndex = 0;
jest.mock("../../meditations/utils", () => {
  const original = jest.requireActual("../../meditations/utils");
  return {
    __esModule: true,
    ...original,
    getRandomMeditation: () => {
      const meditations: Meditation[] = [
        {
          type: "Breath",
          titleStringId: "meditations.breath.title",
          descriptionStringIds: ["meditations.breath.nostrils"],
        },
        {
          type: "Physical",
          titleStringId: "meditations.physical.title",
          descriptionStringIds: ["meditations.physical.bodyScan"],
        },
      ];
      return meditations[mockReturnValueIndex];
    },
  };
});

describe("<MeditationInstructionsCard />", () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const renderWithContext = () =>
    render(
      <PersistentStateProvider
        initialMedSettingsState={DEFAULT_MEDITATION_SETTINGS_STATE}
      >
        <MeditationInstructionsCard />
      </PersistentStateProvider>,
    );

  beforeEach(() => {
    jest.useFakeTimers();
    mockReturnValueIndex = 0;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Renders with content visible", () => {
    renderWithContext();
    const title = screen.getByText("Instructions");
    const content = screen.getByText("Meditate On Breath");
    expect(title).toBeVisible();
    expect(content).toBeVisible();
  });

  test("Refresh button displays a new meditation", async () => {
    renderWithContext();
    const refreshButton = screen.queryAllByRole("button")[1];
    let content = screen.queryByText("Meditate On Breath");
    expect(content).toBeVisible();

    // Ensure new meditation is selected when button pressed
    mockReturnValueIndex = 1;
    await user.press(refreshButton);
    content = screen.queryByText("Meditate On Physical Sensations");
    expect(content).toBeVisible();
    // Old content was removed
    content = screen.queryByText("Meditate On Breath");
    expect(content).not.toBeOnTheScreen();
  });
});
