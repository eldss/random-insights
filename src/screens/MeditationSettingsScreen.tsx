import { View, Text, ViewStyle, ScrollView } from "react-native";
import React from "react";
import { Card } from "../components/Card";
import { fontSize, spacing } from "../theme";
import { StatusBar } from "expo-status-bar";

export function MeditationSettingsScreen() {
  return (
    <ScrollView>
      <StatusBar style="auto" />
      <View style={$container}>
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
  paddingTop: spacing.xs,
};
