import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from './ProfileScreen.jsx';
import StackNavigator from './StackNavigator.jsx';
import HireHistoryScreen from '../services/HireHistoryScreen.jsx';
import { getAppContext } from '../../context/AppContext.jsx';
import MyServiceScreen from '../services/MyServiceScreen.jsx';
import AdoptionSecondaryScreen from '../adopt/AdoptionSecondaryScreen.jsx';
import { PostProfile } from '../../components/index.js';
import PetsScreen from './PetsScreen.jsx';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { selectedTab, tabColor } = getAppContext();

  //if selected tab changes, set drawer to home
  useEffect(() => {
    Drawer.current?.navigate('Home');
  }, [selectedTab]);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="slide"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerActiveTintColor: '#fff',
        drawerActiveBackgroundColor: tabColor,
      }}
    >
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="My Pets" component={PetsScreen} />
      <Drawer.Screen
        name="Hire History"
        component={HireHistoryScreen}
        options={{
          animation: 'fade',
        }}
      />
      <Drawer.Screen
        name="My Services"
        component={MyServiceScreen}
        options={{
          animation: 'fade',
        }}
      />
      <Drawer.Screen
        name="My Adoption Listings"
        component={AdoptionSecondaryScreen}
        options={{
          animation: 'fade',
        }}
      />
      <Drawer.Screen
        name="My Posts"
        component={PostProfile}
        options={{
          animation: 'fade',
        }}
      />
      {/* <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
