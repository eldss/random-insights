import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Image, ImageStyle, Platform } from "react-native";
import { useTranslations } from "../hooks";
import { MeditationSettingsScreen } from "../screens";
import { spacing } from "../theme";

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  const translate = useTranslations();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: translate("general.appName"),
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerLeft: () => (
            <Image
              style={$icon}
              source={require("../../assets/Lotus_Icon_Empty.png")}
              alt={translate("general.logoAltText")}
            />
          ),
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

const $icon: ImageStyle = {
  width: 45,
  height: 45,
  marginTop: Platform.select({ android: spacing.xxs }),
};
