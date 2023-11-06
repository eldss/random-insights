import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, ScrollView, Text, View, ViewStyle } from "react-native";
import { Card } from "../components/Card";
import { spacing } from "../theme";
import { MeditationTypeCard } from "../components";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export function MeditationSettingsScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar style="auto" />
        <View style={$container}>
          <MeditationTypeCard />
          <Card title="Test 2">
            <Text>Test body with longer text</Text>
          </Card>
          <Card title="Test 3">
            <CountdownCircleTimer
              isPlaying
              duration={60}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[7, 5, 2, 0]}
              onComplete={() => {
                return { shouldRepeat: true, delay: 1.5 };
              }}
            >
              {({ remainingTime }) => <Text>{remainingTime}</Text>}
            </CountdownCircleTimer>
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
              blah blah blah blah blah ah blah blah blah blah blah blah blah
              blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah blah blah blah h blah blah blah blah blah blah
              blah blah blah blah blah blah blah blah ah blah blah blah blah
              blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah blah blah blah blah blah blah
            </Text>
          </Card>
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
