import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useTranslations } from "../hooks";
import { MeditationSettingsScreen } from "../screens";
import { MONK_ROBES, WHITE_LOTUS_GOLD } from "../theme";

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  const translate = useTranslations();
  return (
    <NavigationContainer theme={WHITE_LOTUS_GOLD}>
      <Stack.Navigator
        screenOptions={{
          title: translate("general.appName"),
          headerBackVisible: true,
          headerTitleStyle: { color: WHITE_LOTUS_GOLD.colors.notification },
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
