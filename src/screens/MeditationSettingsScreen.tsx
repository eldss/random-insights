import { View, Text, ViewStyle } from "react-native";
import React from "react";
import Card from "../components/Card";

export default function MeditationSettingsScreen() {
  return (
    <View style={$container}>
      <Text>MeditationSettingsScreen</Text>
      <Card title="Test 1">
        <Text>Test Body</Text>
      </Card>
      <Card title="Test 2">
        <Text>Test body with longer text</Text>
      </Card>
      <Card title="Test 3">
        <Text>
          Test body with longer text blah blah blah blah blah blah blah blah
          blah blah blah blah blah blah blah blah blah blah blah blah blah blah
          blah blah blah blah blah blah blah blah blah blah blah blah blah blah
          blah blah blah blah blah blah blah blah blah blah blah blah blah blah
          blah blah blah blah blah blah blah blah blah blah blah blah blah blah
          blah
        </Text>
      </Card>
    </View>
  );
}

const $container: ViewStyle = {
  flex: 1,
};
