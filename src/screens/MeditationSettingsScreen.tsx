import { View, Text, ViewStyle } from "react-native";
import React from "react";
import Card from "../components/Card";

export default function MeditationSettingsScreen() {
  return (
    <View style={$container}>
      <Text>MeditationSettingsScreen</Text>
      <Card />
      <Card />
      <Card />
    </View>
  );
}

const $container: ViewStyle = {
  flex: 1,
};
