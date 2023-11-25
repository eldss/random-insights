import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  View,
  ViewStyle,
} from "react-native";
import { MeditationInstructionsCard, SelectTimeCard } from "../components";
import {
  persistMeditationSettings,
  useMeditationSettingsState,
} from "../hooks";
import { spacing } from "../theme";

export function MeditationSettingsScreen() {
  const state = useMeditationSettingsState();
  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar style="auto" />
        <View style={$container}>
          <MeditationInstructionsCard />
          <SelectTimeCard />
          <Button
            title="Save State"
            onPress={() => persistMeditationSettings(state)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  paddingTop: spacing.xs,
};
