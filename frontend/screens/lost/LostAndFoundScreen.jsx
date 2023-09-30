import { Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { ThemeButton } from "../../components";

const LostAndFoundScreen = () => {
    const { theme } = getThemeContext();
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Text>Lost And Found</Text>
            <ThemeButton title="Lost" />
        </View>
    );
};

export default LostAndFoundScreen;