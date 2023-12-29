import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useLayoutEffect } from "react";
import { Button as ReactButton, ViewStyle } from "react-native";
import {
  Button,
  MeditationInstructionsCard,
  SelectBellCard,
  SelectTimeCard,
} from "../components";
import {
  persistMeditationSettings,
  useMeditationSettingsState,
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
  const theme = useTheme();

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
      <ReactButton
        title="Save State"
        onPress={() => {
          persistMeditationSettings(state);
          console.log(state);
        }}
        color={theme.colors.primary}
      />
    </ScreenBase>
  );
}

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  paddingTop: spacing.xs,
};
