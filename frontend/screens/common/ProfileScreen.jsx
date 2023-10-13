import { SafeAreaView, Text, View, StatusBar } from "react-native";
import getThemeContext from "../../context/ThemeContext";

const ProfileScreen = () => {
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
            <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
                <Text>Profile Screen</Text>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;
