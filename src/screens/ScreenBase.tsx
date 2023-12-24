import { useTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { SafeAreaView, ScrollView, View, ViewStyle } from "react-native";
import { spacing } from "../theme";

export interface ScreenBaseProps {
  children?: ReactNode;
}

export function ScreenBase({ children }: ScreenBaseProps) {
  const theme = useTheme();

  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar style={theme.dark ? "light" : "dark"} />
        <View style={$container}></View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  paddingTop: spacing.xs,
};
