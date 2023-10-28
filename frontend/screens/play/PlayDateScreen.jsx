import { StatusBar } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  PlaydateHome,
  ViewPlaydate,
  CreatePlaydate,
  UpdatePlaydate,
  CreateRequest,
  UpdateRequest,
  ViewRequest,
  MyPlaydates,
} from '../../components';

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
        <PlaydateNavigator.Screen
          name="ViewPlaydate"
          component={ViewPlaydate}
          options={{ headerShown: false }}
        />
        <PlaydateNavigator.Screen
          name="CreatePlaydate"
          component={CreatePlaydate}
          options={{ headerShown: false }}
        />
        <PlaydateNavigator.Screen
          name="UpdatePlaydate"
          component={UpdatePlaydate}
          options={{ headerShown: false }}
        />
        <PlaydateNavigator.Screen
          name="CreateRequest"
          component={CreateRequest}
          options={{ headerShown: false }}
        />
        <PlaydateNavigator.Screen
          name="ViewRequest"
          component={ViewRequest}
          options={{ headerShown: false }}
        />
        <PlaydateNavigator.Screen
          name="UpdateRequest"
          component={UpdateRequest}
          options={{ headerShown: false }}
        />
        <PlaydateNavigator.Screen
          name="MyPlaydates"
          component={MyPlaydates}
          options={{ headerShown: false }}
        />
      </PlaydateNavigator.Navigator>
    </SafeAreaView>
  );
};

export default PlayDateScreen;
