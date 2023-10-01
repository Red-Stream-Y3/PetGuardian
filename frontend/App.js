import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './context/ThemeContext';
import { AdoptionScreen, HomeScreen, LostAndFoundScreen, PlayDateScreen, ServicesScreen } from './screens';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BottomBar from './components/common/BottomBar';
import { useState } from 'react';
import { AppContextProvider } from './context/AppContext';

const Stack = createStackNavigator();
const App = () => {
  
  const [selectedTab, setSelectedTab] = useState(2);

  const SERVER_URL = 'https://pet-shop-backend-ukkxew3r5q-uc.a.run.app';

  const navigationTheme = {
    dark: false,
    colors: {
      primary: '#000000',
      background: '#ffffff',
      card: '#ffffff',
      text: '#000000',
      border: '#000000',
      notification: '#000000',
    },
  };

    return (
        <ThemeProvider>
            <AppContextProvider value={{ selectedTab, setSelectedTab, SERVER_URL }}>
                <NavigationContainer>
                    <SafeAreaProvider>
                        <View style={{ flex: 1 }}>
                            <StatusBar style="auto" />
                            <Stack.Navigator initialRouteName="HOME">
                                <Stack.Screen
                                    name="SERVICES"
                                    component={ServicesScreen}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="LOST"
                                    component={LostAndFoundScreen}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="HOME"
                                    component={HomeScreen}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="ADOPT"
                                    component={AdoptionScreen}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="PLAY"
                                    component={PlayDateScreen}
                                    options={{ headerShown: false }}
                                />
                            </Stack.Navigator>
                            <BottomBar
                                selected={selectedTab}
                                setSelected={setSelectedTab}
                            />
                        </View>
                    </SafeAreaProvider>
                </NavigationContainer>
            </AppContextProvider>
        </ThemeProvider>
    );
};

export default App;
