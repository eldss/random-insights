import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTranslations } from "../hooks";
import { AppSettingsScreen, MeditationSettingsScreen } from "../screens";
import { MONK_ROBES, WHITE_LOTUS_GOLD, WHITE_LOTUS_GREEN } from "../theme";
import { ScreenNames } from "./constants";
import { RootStackParamList } from "./types";
import { Button } from "../components";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const translate = useTranslations();

  return (
    <NavigationContainer theme={WHITE_LOTUS_GOLD}>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: { color: WHITE_LOTUS_GOLD.colors.primary },
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
