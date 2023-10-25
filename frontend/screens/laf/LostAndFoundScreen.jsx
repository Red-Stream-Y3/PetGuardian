import { StatusBar } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  EditPost,
  FoundHome,
  LostFoundHome,
  LostHome,
  LostPost,
  FoundPost,
  Post,
  PostProfile,
} from '../../components';

const LostFoundNavigator = createNativeStackNavigator();

const LostAndFoundScreen = ({ navigation }) => {
  const { theme } = getThemeContext();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        hidden={false}
      />
      <LostFoundNavigator.Navigator
        initialRouteName="LostFoundHome"
        screenOptions={{ headerShown: false }}
      >
        <LostFoundNavigator.Screen
          name="LostFoundHome"
          component={LostFoundHome}
        />
        <LostFoundNavigator.Screen name="LostHome" component={LostHome} />
        <LostFoundNavigator.Screen name="FoundHome" component={FoundHome} />
        <LostFoundNavigator.Screen name="Post" component={Post} />
        <LostFoundNavigator.Screen name="EditPost" component={EditPost} />
        <LostFoundNavigator.Screen name="PostProfile" component={PostProfile} />
        <LostFoundNavigator.Screen name="LostPost" component={LostPost} />
        <LostFoundNavigator.Screen name="FoundPost" component={FoundPost} />
      </LostFoundNavigator.Navigator>
    </SafeAreaView>
  );
};

export default LostAndFoundScreen;
