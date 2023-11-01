import { Translations } from "../i18n/en";

/**
 * Definition of a meditation as required by the app.
 */
export interface Meditation {
  /**
   * High level type of meditation.
   */
  type: MeditationOption;
  /**
   * Optional. Sublevel meditation type.
   */
  subType?:
    | BreathMeditationOption
    | PhysicalMeditationOption
    | SoundMeditationOption;
  /**
   * Localization string ID for the title.
   */
  titleStringId: TranslationKeyPath;
  /**
   * List of localization string IDs for the description. Can also add newline
   * characters for paragraph breaks as needed.
   */
  descriptionStringIds: TranslationKeyPath[];
}

export type MeditationOption =
  | "Breath"
  | "Physical"
  | "Sound"
  | "Thought"
  | "Emotion"
  | "FullOpenAwareness"
  | "LovingKindness"
  | "Mantra";

export type BreathMeditationOption =
  | "Nostrils"
  | "Stomach"
  | "FullPathOfBreath"
  | "FullBodySensations"
  | "RegulatedBreathing";

export type PhysicalMeditationOption =
  | "Head"
  | "Torso"
  | "UpperTorso"
  | "LowerTorso"
  | "FrontTorso"
  | "Back"
  | "BothArms"
  | "LeftArm"
  | "RightArm"
  | "BothHands"
  | "LeftHand"
  | "RightHand"
  | "GroinAndButt"
  | "BothLegs"
  | "LeftLeg"
  | "RightLeg"
  | "BothFeet"
  | "LeftFoot"
  | "RightFoot"
  | "BodyScan"
  | "OpenAwareness";

export type SoundMeditationOption = "Focus" | "OpenAwareness";

// I don't really understand the types below, I got it from the Ignite React Native template.
// https://github.com/infinitered/ignite/blob/master/boilerplate/app/i18n/i18n.ts#L37

/**
 * Builds up valid keypaths for translations. Looks like nested keys separated by
 * a period, like `a`, `a.b`, `a.b.c`.
 */
export type TranslationKeyPath = RecursiveKeyOf<Translations>;

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string,
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;
