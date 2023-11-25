/**
 * High-level state for the meditation settings screen that is persistent through
 * the life of the app session, and between sessions.
 */
export interface MeditationSettingsPersistentState {
  /** State for instructions card. */
  instructions: {
    /** Whether the card is open or not. */
    isOpen: boolean;
  };
  /** State for time selector card. */
  timeSelector: {
    /** Whether the card is open or not. */
    isOpen: boolean;
    /** Time selected for the meditation session, in minutes. */
    selectedTimeMinutes: number;
  };
}

/** Possible reducer action types on the meditation settings screen. */
export enum ActionType {
  OPEN_INSTRUCTIONS,
  CLOSE_INSTRUCTIONS,
  OPEN_TIME_SELECTOR,
  CLOSE_TIME_SELECTOR,
  UPDATE_TIME,
}

// Might OR objects so not an interface.
/** Possible reducer payload types on the meditation settings screen. */
export type ActionPayload = { timeMinutes: number };

/** Required reducer action shape. */
export interface Action {
  type: ActionType;
  payload?: ActionPayload;
}

/** Reducer function for persistent state in the meditation settings screen. */
export function meditationSettingsReducer(
  state: MeditationSettingsPersistentState,
  action: Action,
): MeditationSettingsPersistentState {
  const next = { ...state };
  switch (action.type) {
    case ActionType.OPEN_INSTRUCTIONS:
      next.instructions.isOpen = true;
      return next;

    case ActionType.CLOSE_INSTRUCTIONS:
      next.instructions.isOpen = false;
      return next;

    case ActionType.OPEN_TIME_SELECTOR:
      next.timeSelector.isOpen = true;
      return next;

    case ActionType.CLOSE_TIME_SELECTOR:
      next.timeSelector.isOpen = false;
      return next;

    case ActionType.UPDATE_TIME:
      next.timeSelector.selectedTimeMinutes = action.payload.timeMinutes;
      return next;
  }
}