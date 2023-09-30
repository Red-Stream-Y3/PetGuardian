import { Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { ThemeButton } from "../../components";

const PlayDateScreen = () => {
    const { theme } = getThemeContext();
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Text>Play Date</Text>
            <ThemeButton title="Play" />
        </View>
    );
};

export default PlayDateScreen;