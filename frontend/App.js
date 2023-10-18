import 'react-native-gesture-handler';
import { ThemeProvider } from './context/ThemeContext';
import {
  AdoptionScreen,
  HomeScreen,
  LostAndFoundScreen,
  PlayDateScreen,
  ServicesScreen
} from './screens';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BottomBar from './components/common/BottomBar';
import { AppContextProvider } from './context/AppContext';
import { NavigationComponent } from './screens';

const App = () => {
  return (
    <ThemeProvider>
      <AppContextProvider>
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
              <BottomBar />
            </View>
          </SafeAreaProvider>
        </NavigationContainer>
      </AppContextProvider>
    </ThemeProvider>
  );
};

export default App;
