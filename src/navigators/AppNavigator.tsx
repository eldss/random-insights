import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { MeditationSettingsScreen } from "../screens/MeditationSettingsScreen";

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ title: "Random Insights" }}>
        <Stack.Screen
          name="MeditationSettingsScreen"
          component={MeditationSettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
