import { Text, View, StyleSheet } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { getAppContext } from '../../context/AppContext';
import { MyServicesContainer, RegisterServiceProvider } from '../../components';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

const MyServiceDashboardScreen = ({ navigation }) => {
  const { theme } = getThemeContext();
  const { user } = getAppContext();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        My Services
      </Text>
      {user.isServiceProvider === null ||
      user.isServiceProvider === undefined ||
      user.isServiceProvider === false ? (
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutDown}
          style={{ flex: 1 }}
        >
          <RegisterServiceProvider navigation={navigation} />
        </Animated.View>
      ) : (
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutDown}
          style={{ flex: 1 }}
        >
          <MyServicesContainer navigation={navigation} />
        </Animated.View>
      )}
    </View>
  );
};

export default MyServiceDashboardScreen;
