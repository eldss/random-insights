import React, { useState } from "react";
import { Text, TextStyle, ViewStyle } from "react-native";
import { useTranslations } from "../hooks";
import { MEDITATIONS, Meditation, getRandomMeditation } from "../meditations";
import { fontSize, spacing, textStyle } from "../theme";
import { Button } from "./Button";
import { Card } from "./Card";

/**
 * A component that displays a random meditation type on a card.
 */
export function MeditationTypeCard() {
  const [meditation, setMeditation] = useState<Meditation>(
    getRandomMeditation(MEDITATIONS),
  );
  const translate = useTranslations();

  // Choose another random meditation. Will avoid picking the same meditation twice.
  const getNextMeditation = () => {
    let next = getRandomMeditation(MEDITATIONS);
    while (next === meditation) {
      next = getRandomMeditation(MEDITATIONS);
    }
    setMeditation(next);
  };

  return (
    <Card title={translate("general.instructions")} collapsible={true}>
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
