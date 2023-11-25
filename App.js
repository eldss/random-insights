import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistentStateProvider } from "./src/components";
import { useMeditationSettingsInitialState } from "./src/hooks";
import { AppNavigator } from "./src/navigators";

export default function App() {
  const reHydratedMedSettings = useMeditationSettingsInitialState();
  return (
    <PersistentStateProvider initialMedSettingsState={reHydratedMedSettings}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.container}>
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
