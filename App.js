import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistentStateProvider } from "./src/components";
import {
  useAppSettingsStoredState,
  useMeditationSettingsStoredState,
} from "./src/hooks";
import { AppNavigator } from "./src/navigators";

// Keep the splash screen visible while we fetch stored state
SplashScreen.preventAutoHideAsync();

export default function App() {
  const storedMedState = useMeditationSettingsStoredState();
  const storedAppState = useAppSettingsStoredState();

  const onLayoutRootView = useCallback(async () => {
    if (storedMedState && storedAppState) {
      // This tells the splash screen to hide immediately!
      // Hide the splash screen once we know the root view has already performed layout.
      await SplashScreen.hideAsync();
    }
  }, [storedMedState, storedAppState]);

  // Don't return anything till state is ready
  if (!storedMedState || !storedAppState) {
    return null;
  }

  return (
    <PersistentStateProvider
      initialMedSettingsState={storedMedState}
      initialAppSettingsState={storedAppState}
    >
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
