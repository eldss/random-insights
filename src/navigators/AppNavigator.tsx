import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useAppSettingsState, useTranslations } from "../hooks";
import { AppSettingsScreen, MeditationSettingsScreen } from "../screens";
import { ScreenNames } from "./constants";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const translate = useTranslations();
  const savedTheme = useAppSettingsState();

  return (
    <NavigationContainer theme={savedTheme.theme}>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: { color: savedTheme.theme.colors.primary },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name={ScreenNames.MED_SETTINGS}
          component={MeditationSettingsScreen}
          options={{
            title: translate("general.appName"),
          }}
        />
        <Stack.Screen
          name={ScreenNames.APP_SETTINGS}
          component={AppSettingsScreen}
          options={{
            title: translate("general.settings"),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
