import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme,
} from "@react-navigation/native";
import getThemeContext from "../../context/ThemeContext";
import DrawerNavigator from "./DrawerNavigator";
import { getAppContext } from "../../context/AppContext";
import LoginScreen from "./LoginScreen";

const NavigationComponent = () => {
    const { theme } = getThemeContext();
    const { user, loadingUser } = getAppContext();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
    });

    return (
        <NavigationContainer theme={theme.mode === 'dark' ? DarkTheme : DefaultTheme}>
            <SafeAreaProvider>
                <View style={styles.container}>
                    <StatusBar style='auto' />
                    {!user?._id || !user?.token ? (
                        <LoginScreen />
                    ) : (
                        <>
                            <DrawerNavigator />
                        </>
                    )}
                    <Toast />
                </View>
            </SafeAreaProvider>
        </NavigationContainer>
    );
};

export default NavigationComponent;