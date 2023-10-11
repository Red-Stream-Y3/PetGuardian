import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen.jsx';
import ProfileScreen from './ProfileScreen.jsx';
import StackNavigator from "./StackNavigator.jsx";
import HireHistoryScreen from '../services/HireHistoryScreen.jsx';
import { getAppContext } from '../../context/AppContext.jsx';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    const { selectedTab } = getAppContext();

    //if selected tab changes, set drawer to home
    useEffect(() => {
        Drawer.current?.navigate('Home');
    }, [selectedTab]);

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