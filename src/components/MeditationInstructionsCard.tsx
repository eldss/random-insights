import React, { useCallback, useState } from "react";
import { Text, TextStyle, ViewStyle } from "react-native";
import { useTranslations } from "../hooks";
import {
  useMeditationSettingsDispatch,
  useMeditationSettingsState,
} from "../hooks/useMeditationSettingsPersistentState";
import { MEDITATIONS, Meditation, getRandomMeditation } from "../meditations";
import { ActionType } from "../state";
import { fontSize, spacing, textStyle } from "../theme";
import { Button } from "./Button";
import { Card } from "./Card";

/**
 * A component that displays a random meditation type on a card.
 */
export function MeditationInstructionsCard() {
  const [meditation, setMeditation] = useState<Meditation>(
    getRandomMeditation(MEDITATIONS),
  );
  const { instructions } = useMeditationSettingsState();
  const dispatch = useMeditationSettingsDispatch();
  const translate = useTranslations();

  // Enable users to save this component as open or closed upon returning to the screen.
  // Not everyone will care about getting a random meditation to work on.
  const setIsOpen = useCallback(
    (nextIsOpen: boolean) => {
      if (nextIsOpen) {
        dispatch({ type: ActionType.OPEN_INSTRUCTIONS });
      } else {
        dispatch({ type: ActionType.CLOSE_INSTRUCTIONS });
      }
    },
    [dispatch],
  );

  // Choose another random meditation. Will avoid picking the same meditation twice.
  const getNextMeditation = useCallback(() => {
    let next = getRandomMeditation(MEDITATIONS);
    while (next === meditation) {
      next = getRandomMeditation(MEDITATIONS);
    }
    setMeditation(next);
  }, [getRandomMeditation, setMeditation]);

  return (
    <Card
      title={translate("general.instructions")}
      isCollapsible={true}
      // collapsibleProps={{ isOpen: instructions.isOpen, setIsOpen }}
    >
      <Text style={textStyle.cardSubTitle}>
        {translate(meditation.titleStringId)}
      </Text>
      <Text style={$meditationDescription}>
        {/* Translate ids and create a single string */}
        {meditation.descriptionStringIds.map((id) => translate(id)).join(" ")}
      </Text>
      <Button
        onPress={getNextMeditation}
        preset="refresh"
        style={$buttonOverride}
      />
    </Card>
  );
}

const $meditationDescription: TextStyle = {
  fontSize: fontSize.md,
};

const $buttonOverride: ViewStyle = {
  marginTop: spacing.xs,
  width: "100%",
};
