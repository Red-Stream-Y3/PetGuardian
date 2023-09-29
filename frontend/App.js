import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './context/ThemeContext';
import { AdoptionScreen, HomeScreen, LostAndFoundScreen, PlayDateScreen, ServicesScreen } from './screens';
import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BottomBar from './components/common/BottomBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  
  const [selectedTab, setSelectedTab] = useState(2);

    return (
        <ThemeProvider>
            <NavigationContainer>
                <SafeAreaProvider>
                    <View style={{ flex: 1 }}>
                        <StatusBar style="auto" />
                        <Stack.Navigator initialRouteName="HOME">
                                <Stack.Screen name="SERVICES" component={ServicesScreen}/>
                                <Stack.Screen name="LOST" component={LostAndFoundScreen}/>
                                <Stack.Screen name="HOME" component={HomeScreen}/>
                                <Stack.Screen name="ADOPT" component={AdoptionScreen}/>
                                <Stack.Screen name="PLAY" component={PlayDateScreen}/>
                        </Stack.Navigator>
                        <BottomBar selected={selectedTab} setSelected={setSelectedTab} />
                    </View>

                    {/* <Tab.Navigator initialRouteName='HOME'>
                        <Tab.Screen name="SERVICES" component={ServicesScreen} />
                        <Tab.Screen name="LOST" component={LostAndFoundScreen} />
                        <Tab.Screen name="HOME" component={HomeScreen} />
                        <Tab.Screen name="ADOPT" component={AdoptionScreen} />
                        <Tab.Screen name="PLAY" component={PlayDateScreen} />
                    </Tab.Navigator> */}
                </SafeAreaProvider>
            </NavigationContainer>
        </ThemeProvider>
    );
};

export default App;
