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
    /** Time selected for the meditation session, in minutes. */
    selectedTimeMinutes: number;
    /** Selection for the pre-start bell time, in seconds. */
    selectedPreTimeSeconds: number;
  };
}

/** Possible reducer action types on the meditation settings screen. */
export enum MedSettingsActionType {
  OPEN_INSTRUCTIONS,
  CLOSE_INSTRUCTIONS,
  UPDATE_TIME,
  UPDATE_PRE_START_TIME,
}

/** Possible reducer payload options on the meditation settings screen. */
export type MedSettingsActionPayload = {
  // I would like a more type safe way of doing this but other solutions seem too
  // convoluted and confusing for a simple app.
  timeMinutes?: number;
  preTimeSeconds?: number;
};

/** Required reducer action shape. */
export interface MedSettingsAction {
  type: MedSettingsActionType;
  payload?: MedSettingsActionPayload;
}

/** Reducer function for persistent state in the meditation settings screen. */
export function meditationSettingsReducer(
  state: MeditationSettingsPersistentState,
  action: MedSettingsAction,
): MeditationSettingsPersistentState {
  const next = { ...state };
  switch (action.type) {
    case MedSettingsActionType.OPEN_INSTRUCTIONS:
      next.instructions.isOpen = true;
      return next;

    case MedSettingsActionType.CLOSE_INSTRUCTIONS:
      next.instructions.isOpen = false;
      return next;

    case MedSettingsActionType.UPDATE_TIME:
      next.timeSelector.selectedTimeMinutes = action.payload.timeMinutes;
      return next;

    case MedSettingsActionType.UPDATE_PRE_START_TIME:
      next.timeSelector.selectedPreTimeSeconds = action.payload.preTimeSeconds;
      return next;
  }
}
