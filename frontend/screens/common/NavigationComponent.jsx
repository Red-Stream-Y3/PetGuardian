import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme,
} from "@react-navigation/native";
import getThemeContext from "../../context/ThemeContext";
import DrawerNavigator from "./DrawerNavigator";
import { BottomBar } from "../../components";

const NavigationComponent = () => {
    const { theme } = getThemeContext();

    return (
        <NavigationContainer
            theme={theme.mode === "dark" ? DarkTheme : DefaultTheme}>
            <SafeAreaProvider>
                <View style={{ flex: 1 }}>
                    <StatusBar style='auto' />
                    <DrawerNavigator />
                    <BottomBar />
                    <Toast />
                </View>
            </SafeAreaProvider>
        </NavigationContainer>
    );
};

export default NavigationComponent;
