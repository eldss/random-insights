import React, { useState } from "react";
import { Text } from "react-native";
import { Card } from "./Card";
import { Meditation, getRandomMeditation, MEDITATIONS } from "../meditations";

export function MeditationTypeCard() {
  const [meditation, setMeditation] = useState<Meditation>(
    getRandomMeditation(MEDITATIONS),
  );

  /**
   * Choose another random meditation. Will avoid picking the same meditation twice.
   */
  const getNextMeditation = () => {
    let next = getRandomMeditation(MEDITATIONS);
    while (next === meditation) {
      next = getRandomMeditation(MEDITATIONS);
    }
    setMeditation(next);
  };

  return (
    <Card title={meditation.titleStringId}>
      <Text>{meditation.descriptionStringIds.join(" ")}</Text>
    </Card>
  );
}
