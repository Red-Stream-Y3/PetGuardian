import { StatusBar, Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { ServicesHome, ThemeButton } from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";

const ServicesScreen = () => {
    const { theme } = getThemeContext();
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <StatusBar
                barStyle={
                    theme.mode === "dark" ? "light-content" : "dark-content"
                }
                hidden={false}
            />
            <ServicesHome />
        </SafeAreaView>
    );
};

export default ServicesScreen;
