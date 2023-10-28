import React from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { FloatingMenuButton } from '../../components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ApplicantList,
  NewPetForAdopt,
  EditAdoptionPet,
} from '../../components';
import MyAdoptionListings from './MyAdoptionListings';

const MyAdoptionStack = createNativeStackNavigator();

const AdoptionSecondaryScreen = ({ navigation }) => {
  const { theme } = getThemeContext();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        hidden={false}
      />
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <FloatingMenuButton />
        <MyAdoptionStack.Navigator
          initialRouteName="MyAdoptionListings"
          screenOptions={{
            headerShown: false,
          }}
        >
          <MyAdoptionStack.Screen
            name="MyAdoptionListings"
            component={MyAdoptionListings}
          />
          <MyAdoptionStack.Screen
            name="ApplicantList"
            component={ApplicantList}
          />
          <MyAdoptionStack.Screen
            name="NewPetForAdopt"
            component={NewPetForAdopt}
          />
          <MyAdoptionStack.Screen
            name="EditAdoptionPet"
            component={EditAdoptionPet}
          />
        </MyAdoptionStack.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default AdoptionSecondaryScreen;
