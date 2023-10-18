import { StatusBar } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlaydateHome } from '../../components';

const PlaydateNavigator = createNativeStackNavigator();

const PlayDateScreen = () => {
  const { theme } = getThemeContext();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        hidden={false}
      />
      <PlaydateNavigator.Navigator initialRouteName="PlaydateHome">
        <PlaydateNavigator.Screen
          name="PlaydateHome"
          component={PlaydateHome}
          options={{ headerShown: false }}
        />
      </PlaydateNavigator.Navigator>
    </SafeAreaView>
  );
};

export default PlayDateScreen;

