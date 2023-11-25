import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigators";
import { useMeditationSettingsInitialState } from "./src/hooks";

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
