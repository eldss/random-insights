import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Image, ImageStyle, Platform, View } from "react-native";
import { useTranslations } from "../hooks";
import { MeditationSettingsScreen } from "../screens";
import { MONK_ROBES, colors, spacing } from "../theme";

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  const translate = useTranslations();
  return (
    <NavigationContainer theme={MONK_ROBES}>
      <Stack.Navigator
        screenOptions={{
          title: translate("general.appName"),
          headerBackVisible: true,
        }}
      >
        <Stack.Screen
          name="MeditationSettingsScreen"
          component={MeditationSettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
