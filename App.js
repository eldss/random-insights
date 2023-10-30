import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MeditationSettingsScreen } from "./src/screens/MeditationSettingsScreen";
import { AppNavigator } from "./src/navigators";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <MeditationSettingsScreen />
      </SafeAreaView> */}
      <AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
