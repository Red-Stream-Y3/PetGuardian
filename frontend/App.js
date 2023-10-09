import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './context/ThemeContext';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BottomBar from './components/common/BottomBar';
import { AppContextProvider } from './context/AppContext';
import { DrawerNavigator } from './screens';


const App = () => {

    return (
        <ThemeProvider>
            <AppContextProvider>
                <NavigationContainer>
                    <SafeAreaProvider>
                        <View style={{ flex: 1 }}>
                            <StatusBar style="auto" />
                            <DrawerNavigator />
                            <BottomBar />
                        </View>
                    </SafeAreaProvider>
                </NavigationContainer>
            </AppContextProvider>
        </ThemeProvider>
    );
};

export default App;
