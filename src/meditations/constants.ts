import { Meditation, TranslationKeyPath } from "./types";

// Common phrases used in many places
const distracted: TranslationKeyPath = "meditations.common.returnAndStartAgain";
const proceed: TranslationKeyPath = "meditations.common.proceedAsComfortable";
const naturally: TranslationKeyPath = "meditations.common.breathNaturally";
const countToTen: TranslationKeyPath = "meditations.common.countToTen";
const ariseAndPass: TranslationKeyPath = "meditations.common.ariseAndPass";

/**
 * All meditation options available in the app.
 */
export const meditations: Meditation[] = [
  /* 
    ===== Breath Meditations =====
  */
  {
    type: "Breath",
    subType: "Nostrils",
    titleStringId: "meditations.breath.title",
    descriptionStringIds: [
      "meditations.breath.nostrils",
      naturally,
      distracted,
      countToTen,
    ],
  },
  {
    type: "Breath",
    subType: "Stomach",
    titleStringId: "meditations.breath.title",
    descriptionStringIds: [
      "meditations.breath.stomach",
      naturally,
      distracted,
      countToTen,
    ],
  },
  {
    type: "Breath",
    subType: "FullPathOfBreath",
    titleStringId: "meditations.breath.title",
    descriptionStringIds: [
      "meditations.breath.fullPath",
      naturally,
      distracted,
      countToTen,
    ],
  },
  {
    type: "Breath",
    subType: "FullBodySensations",
    titleStringId: "meditations.breath.title",
    descriptionStringIds: [
      "meditations.breath.fullBody",
      naturally,
      distracted,
      countToTen,
    ],
  },
  {
    type: "Breath",
    subType: "RegulatedBreathing",
    titleStringId: "meditations.breath.title",
    descriptionStringIds: ["meditations.breath.regulated", proceed, distracted],
  },
  /*
    ===== Physical Meditations =====
  */
  {
    type: "Physical",
    subType: "Head",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.head", distracted],
  },
  {
    type: "Physical",
    subType: "Torso",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.torso", distracted],
  },
  {
    type: "Physical",
    subType: "UpperTorso",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.upperTorso", distracted],
  },
  {
    type: "Physical",
    subType: "LowerTorso",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.lowerTorso", distracted],
  },
  {
    type: "Physical",
    subType: "FrontTorso",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.frontTorso", distracted],
  },
  {
    type: "Physical",
    subType: "Back",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.back", distracted],
  },
  {
    type: "Physical",
    subType: "BothArms",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.bothArms", distracted],
  },
  {
    type: "Physical",
    subType: "LeftArm",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.leftArm", distracted],
  },
  {
    type: "Physical",
    subType: "RightArm",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.rightArm", distracted],
  },
  {
    type: "Physical",
    subType: "BothHands",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.bothHands", distracted],
  },
  {
    type: "Physical",
    subType: "LeftHand",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.leftHand", distracted],
  },
  {
    type: "Physical",
    subType: "RightHand",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.rightHand", distracted],
  },
  {
    type: "Physical",
    subType: "GroinAndButt",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.groinAndButt", distracted],
  },
  {
    type: "Physical",
    subType: "BothLegs",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.bothLegs", distracted],
  },
  {
    type: "Physical",
    subType: "LeftLeg",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.leftLeg", distracted],
  },
  {
    type: "Physical",
    subType: "RightLeg",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.rightLeg", distracted],
  },
  {
    type: "Physical",
    subType: "BothFeet",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.bothFeet", distracted],
  },
  {
    type: "Physical",
    subType: "LeftFoot",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.leftFoot", distracted],
  },
  {
    type: "Physical",
    subType: "RightFoot",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: ["meditations.physical.rightFoot", distracted],
  },
  {
    type: "Physical",
    subType: "FullBodySensations",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: [
      "meditations.physical.bodyScan",
      ariseAndPass,
      proceed,
      distracted,
    ],
  },
  {
    type: "Physical",
    subType: "OpenAwareness",
    titleStringId: "meditations.physical.title",
    descriptionStringIds: [
      "meditations.physical.openAwareness",
      ariseAndPass,
      distracted,
    ],
  },
  /*
    ===== Sound Meditations =====
  */
  {
    type: "Sound",
    subType: "Focus",
    titleStringId: "meditations.sound.title",
    descriptionStringIds: ["meditations.sound.focus", distracted],
  },
  {
    type: "Sound",
    subType: "OpenAwareness",
    titleStringId: "meditations.sound.title",
    descriptionStringIds: ["meditations.sound.openAwareness", distracted],
  },
  /*
    ===== Thought Meditations =====
  */
  {
    type: "Thought",
    titleStringId: "meditations.thought.title",
    descriptionStringIds: ["meditations.thought.openAwareness"],
  },
  /*
    ===== Emotion Meditations =====
  */
  {
    type: "Emotion",
    titleStringId: "meditations.emotion.title",
    descriptionStringIds: ["meditations.emotion.openAwareness"],
  },
  /*
    ===== Full Open Awareness Meditations =====
  */
  {
    type: "FullOpenAwareness",
    titleStringId: "meditations.fullOpenAwareness.title",
    descriptionStringIds: ["meditations.fullOpenAwareness.openAwareness"],
  },
  /*
    ===== Loving Kindness Meditations =====
  */
  {
    type: "LovingKindness",
    titleStringId: "meditations.lovingKindness.title",
    descriptionStringIds: [
      "meditations.lovingKindness.repeatPhrases",
      proceed,
      distracted,
      "meditations.lovingKindness.phrasesWithNewLine",
      "meditations.lovingKindness.okIfNoFeelingsWithNewLine",
    ],
  },
  /*
    ===== Mantra Meditations =====
  */
  {
    type: "Mantra",
    titleStringId: "meditations.mantra.title",
    descriptionStringIds: [
      "meditations.mantra.repeatPhrases",
      proceed,
      distracted,
      "meditations.mantra.phrasesWithNewLine",
    ],
  },
];
