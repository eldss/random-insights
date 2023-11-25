import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistentStateProvider } from "./src/components";
import { useMeditationSettingsStoredState } from "./src/hooks";
import { AppNavigator } from "./src/navigators";

// Keep the splash screen visible while we fetch stored state
SplashScreen.preventAutoHideAsync();

export default function App() {
  const storedState = useMeditationSettingsStoredState();

  const onLayoutRootView = useCallback(async () => {
    if (storedState) {
      // This tells the splash screen to hide immediately!
      // Hide the splash screen once we know the root view has already performed layout.
      await SplashScreen.hideAsync();
    }
  }, [storedState]);

  // Don't return anything till state is ready
  if (!storedState) {
    return null;
  }

  return (
    <PersistentStateProvider initialMedSettingsState={storedState}>
      <SafeAreaProvider>
        <GestureHandlerRootView
          style={styles.container}
          onLayout={onLayoutRootView}
        >
          <AppNavigator />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PersistentStateProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
