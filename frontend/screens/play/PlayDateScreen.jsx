import { StatusBar, Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { ThemeButton } from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";

const PlayDateScreen = () => {
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

            <View>
                <Text style={{color:theme.colors.text}}>Play Dates</Text>
                <ThemeButton title="Services" />
            </View>
        </SafeAreaView>
    );
};

export default PlayDateScreen;