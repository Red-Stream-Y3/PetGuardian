import { SafeAreaView, Text, View, StatusBar } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { getAppContext } from '../../context/AppContext';
import { FloatingMenuButton, ServiceDetails } from '../../components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyServiceDashboardScreen from './MyServiceDashboardScreen';
import MyServicesScheduleScreen from './MyServicesScheduleScreen';

const MyServiceStack = createNativeStackNavigator();

const MyServiceScreen = ({ navigation }) => {
    const { theme } = getThemeContext();
    const { user } = getAppContext();

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.colors.background }}
        >
            <StatusBar
                barStyle={
                    theme.mode === 'dark' ? 'light-content' : 'dark-content'
                }
                hidden={false}
            />
            <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
                <FloatingMenuButton />
                <MyServiceStack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <MyServiceStack.Screen
                        name="MyServiceDashboardScreen"
                        component={MyServiceDashboardScreen}
                    />
                    <MyServiceStack.Screen
                        name="MyServicePage"
                        component={ServiceDetails}
                        options={{ animation: 'slide_from_right' }}
                    />
                    <MyServiceStack.Screen
                        name="MyServiceSchedulePage"
                        component={MyServicesScheduleScreen}
                        options={{ animation: 'slide_from_left' }}
                    />
                </MyServiceStack.Navigator>
            </View>
        </SafeAreaView>
    );
};

export default MyServiceScreen;
