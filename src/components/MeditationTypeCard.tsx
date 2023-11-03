import React, { useContext, useState } from "react";
import { Text } from "react-native";
import { Card } from "./Card";
import { Meditation, getRandomMeditation, MEDITATIONS } from "../meditations";
import { I18nContext } from "../i18n";

export function MeditationTypeCard() {
  const [meditation, setMeditation] = useState<Meditation>(
    getRandomMeditation(MEDITATIONS),
  );
  const i18n = useContext(I18nContext);

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
    <Card title={i18n.t(meditation.titleStringId)}>
      <Text>
        {/* Translate ids and create a single string */}
        {meditation.descriptionStringIds.map((id) => i18n.t(id)).join(" ")}
      </Text>
    </Card>
  );
}
