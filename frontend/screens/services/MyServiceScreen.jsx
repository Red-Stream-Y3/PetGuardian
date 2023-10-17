import { SafeAreaView, Text, View, StatusBar } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { getAppContext } from "../../context/AppContext";
import { MyServicesContainer, RegisterServiceProvider } from "../../components";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

const MyServiceScreen = ({ navigation }) => {
    const { theme } = getThemeContext();
    const { user } = getAppContext();

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
                <Text
                    style={{
                        color: theme.colors.text,
                        fontSize: 18,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}>
                    My Services
                </Text>
                {user?.services !== null && user?.services !== undefined ? (
                    <Animated.View
                        entering={FadeInDown}
                        exiting={FadeOutDown}
                        style={{ flex: 1 }}>
                        <RegisterServiceProvider navigation={navigation} />
                    </Animated.View>
                ) : (
                    <Animated.View
                        entering={FadeInDown}
                        exiting={FadeOutDown}
                        style={{ flex: 1 }}>
                        <MyServicesContainer navigation={navigation} />
                    </Animated.View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default MyServiceScreen;
