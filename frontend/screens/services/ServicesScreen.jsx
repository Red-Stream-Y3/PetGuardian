import { Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { ThemeButton } from "../../components";

const ServicesScreen = () => {
    const { theme } = getThemeContext();
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Text>Services</Text>
            <ThemeButton title="Services" />
        </View>
    );
};

export default ServicesScreen;