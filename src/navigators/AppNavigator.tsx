import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, ImageStyle } from "react-native";
import * as React from "react";
import { MeditationSettingsScreen } from "../screens/MeditationSettingsScreen";
import { spacing } from "../theme";

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: "Random Insights",
          headerBackVisible: true,
          headerLeft: () => (
            <Image
              style={$icon}
              source={require("../../assets/LotusIcon.png")}
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
  width: 50,
  height: 50,
  marginRight: spacing.xs,
};
