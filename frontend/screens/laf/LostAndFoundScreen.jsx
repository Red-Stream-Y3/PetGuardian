import { StatusBar } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  FoundHome,
  LostFoundHome,
  LostHome,
  LostPost,
  Post,
  Profile,
} from '../../components';

const LostFoundNavigator = createNativeStackNavigator();

const LostAndFoundScreen = () => {
  const { theme } = getThemeContext();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        hidden={false}
      />
      <LostFoundNavigator.Navigator initialRouteName="LostFoundHome">
        <LostFoundNavigator.Screen
          name="LostFoundHome"
          component={LostFoundHome}
          options={{ headerShown: false }}
        />
        <LostFoundNavigator.Screen
          name="LostHome"
          component={LostHome}
          options={{ headerShown: false }}
        />
        <LostFoundNavigator.Screen
          name="FoundHome"
          component={FoundHome}
          options={{ headerShown: false }}
        />
        <LostFoundNavigator.Screen
          name="Post"
          component={Post}
          options={{ headerShown: false }}
        />
        <LostFoundNavigator.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <LostFoundNavigator.Screen
          name="LostPost"
          component={LostPost}
          options={{ headerShown: false }}
        />
      </LostFoundNavigator.Navigator>
    </SafeAreaView>
  );
};

export default LostAndFoundScreen;
