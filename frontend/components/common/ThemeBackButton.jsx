import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import getThemeContext from "../../context/ThemeContext";
import ThemeButton from "./ThemeButton";
import { Ionicons } from '@expo/vector-icons';

const ThemebackButton = ({ navigation }) => {
    const { theme } = getThemeContext();

    return (
        <Animated.View style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 100,
            elevation: 5,
        }}
        entering={FadeInLeft.delay(700).springify()}
        exiting={FadeOutLeft.delay(100).springify()}
        >
            <ThemeButton borderRadius={50}>
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color={theme.colors.primaryIcon}
                    onPress={() => navigation.goBack()}
                />
            </ThemeButton>
        </Animated.View>
    );
};

export default ThemebackButton;