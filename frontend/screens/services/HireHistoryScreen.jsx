import { SafeAreaView, View, StatusBar } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { FloatingMenuButton, HireHistoy } from '../../components';

const HireHistoryScreen = ({ navigation }) => {
  const { theme } = getThemeContext();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        hidden={false}
      />
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <FloatingMenuButton />
        <HireHistoy navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default HireHistoryScreen;
