import { Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { ThemeButton } from "../../components";

const AdoptionScreen = () => {
    const { theme } = getThemeContext();
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Text>Adoption</Text>
            <ThemeButton title="Adopt" />
        </View>
    );
};

export default AdoptionScreen;