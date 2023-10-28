import { StatusBar } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyPets, ViewPet, CreatePet, UpdatePet } from '../../components';

const PetNavigator = createNativeStackNavigator();
const PetsScreen = () => {
  const { theme } = getThemeContext();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        hidden={false}
      />
      <PetNavigator.Navigator initialRouteName="MyPets">
        <PetNavigator.Screen
          name="MyPets"
          component={MyPets}
          options={{ headerShown: false }}
        />
        <PetNavigator.Screen
          name="ViewPet"
          component={ViewPet}
          options={{ headerShown: false }}
        />
        <PetNavigator.Screen
          name="CreatePet"
          component={CreatePet}
          options={{ headerShown: false }}
        />
        <PetNavigator.Screen
          name="UpdatePet"
          component={UpdatePet}
          options={{ headerShown: false }}
        />
      </PetNavigator.Navigator>
    </SafeAreaView>
  );
};

export default PetsScreen;
