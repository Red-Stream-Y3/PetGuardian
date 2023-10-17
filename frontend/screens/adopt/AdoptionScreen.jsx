import { StatusBar, Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { AdoptionHome, AdoptionList, ThemeButton } from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AdoptionNavigator = createNativeStackNavigator();

const AdoptionScreen = (navigation) => {
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
            <AdoptionNavigator.Navigator
                initialRouteName="Adoptions"
                screenOptions={{ headerShown: false }}>
                <AdoptionNavigator.Screen name="Adoptions" component={AdoptionHome} />
                <AdoptionNavigator.Screen name="AdoptionList" component={AdoptionList}/>
            </AdoptionNavigator.Navigator>

        </SafeAreaView>
    );
};

export default AdoptionScreen;