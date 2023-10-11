import { createStackNavigator } from "@react-navigation/stack";
import AdoptionScreen from "../adopt/AdoptionScreen.jsx";
import HomeScreen from "../common/HomeScreen.jsx";
import LostAndFoundScreen from "../laf/LostAndFoundScreen.jsx";
import PlayDateScreen from "../play/PlayDateScreen.jsx";
import ServicesScreen from "../services/ServicesScreen.jsx";

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='HOME'
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name='SERVICES' component={ServicesScreen} />
            <Stack.Screen name='LOST' component={LostAndFoundScreen} />
            <Stack.Screen name='HOME' component={HomeScreen} />
            <Stack.Screen name='ADOPT' component={AdoptionScreen} />
            <Stack.Screen name='PLAY' component={PlayDateScreen} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
