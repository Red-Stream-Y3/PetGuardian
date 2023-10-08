import { StatusBar, Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { ServiceBooking, ServiceDetails, ServicesHome, ThemeButton } from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ServiceNavigator = createNativeStackNavigator();

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
            <ServiceNavigator.Navigator initialRouteName="Services">
                <ServiceNavigator.Screen name="Services" component={ServicesHome} options={{headerShown:false}} />
                <ServiceNavigator.Screen name="ServiceDetails" component={ServiceDetails} options={{headerShown:false}} />
                <ServiceNavigator.Screen name="Booking" component={ServiceBooking} options={{headerShown:false}} />
            </ServiceNavigator.Navigator>

        </SafeAreaView>
    );
};

export default ServicesScreen;
