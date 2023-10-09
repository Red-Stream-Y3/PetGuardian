import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen.jsx';
import ProfileScreen from './ProfileScreen.jsx';
import StackNavigator from "./StackNavigator.jsx";
import HireHistoryScreen from '../services/HireHistoryScreen.jsx';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={{
            headerShown: false,
            drawerPosition: 'right',
        }}>
            <Drawer.Screen name="Home" component={StackNavigator} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Hire History" component={HireHistoryScreen} />
            {/* <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;