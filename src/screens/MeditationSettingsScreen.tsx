import { View, Text, ViewStyle, ScrollView } from "react-native";
import React from "react";
import Card from "../components/Card";
import { fontSize } from "../theme";

export default function MeditationSettingsScreen() {
  return (
    <ScrollView>
      <View style={$container}>
        <Text style={{ fontSize: fontSize.lg }}>
          Meditation Settings Screen
        </Text>
        <Card title="Test 1">
          <Text>Test Body</Text>
        </Card>
        <Card title="Test 2">
          <Text>Test body with longer text</Text>
        </Card>
        <Card title="Test 3">
          <Text>
            Test body with longer text blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah
          </Text>
        </Card>
        <Card title="Test 4">
          <Text>
            Test body with longer text blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah
          </Text>
        </Card>
        <Card title="Test 5">
          <Text>
            Test body with longer text blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah ah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah h blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah ah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
};
