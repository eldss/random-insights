import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useLayoutEffect } from "react";
import { ViewStyle } from "react-native";
import {
  Button,
  MeditationInstructionsCard,
  SelectBellCard,
  SelectTimeCard,
} from "../components";
import {
  persistMeditationSettings,
  useMeditationSettingsState,
  useTranslations,
} from "../hooks";
import { ScreenNames } from "../navigators/constants";
import { RootStackParamList } from "../navigators/types";
import { spacing } from "../theme";
import { ScreenBase } from "./ScreenBase";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "MeditationSettingsScreen"
>;

/**
 * Renders the main meditation settings form that determines length of meditation,
 * bells, and other options.
 */
export function MeditationSettingsScreen({ navigation }: Props) {
  const state = useMeditationSettingsState();
  const translate = useTranslations();

  // Render settings button in the header
  useLayoutEffect(() => {
    // On iOS there is a bug that causes this to rendered halfway off the screen randomly
    // This was a suggested way to fix that. See:
    // https://github.com/software-mansion/react-native-screens/issues/432#issuecomment-1783867314
    setTimeout(() => {
      navigation.setOptions({
        headerRight: () => (
          <Button
            preset="settings"
            onPress={() => navigation.navigate(ScreenNames.APP_SETTINGS)}
          />
        ),
      });
    }, 150);
  }, [navigation]);

  return (
    <ScreenBase>
      <MeditationInstructionsCard />
      <SelectTimeCard />
      <SelectBellCard />
      <Button
        preset="doAction"
        style={$startButton}
        onPress={() => {
          persistMeditationSettings(state);
          console.log(
            `Moving to meditation screen with state: ${JSON.stringify(state)}`,
          );
          navigation.push(ScreenNames.MEDITATION);
        }}
      >
        {translate("general.startMeditation")}
      </Button>
    </ScreenBase>
  );
}

const $startButton: ViewStyle = {
  marginHorizontal: spacing.xs,
  marginBottom: spacing.md,
};
