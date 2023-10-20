import {
  SafeAreaView,
  Text,
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import {
  FloatingMenuButton,
  ProfileContainer,
  ThemeButton,
  ThemeCard,
  ThemeOverlay,
} from '../../components';
import { getAppContext } from '../../context/AppContext';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { getUserProfile } from '../../services/UserServices';
import Toast from 'react-native-toast-message';

const ProfileScreen = ({ navigation }) => {
  const { theme, toggleTheme } = getThemeContext();
  const { user, setUser, storeUser } = getAppContext();
  const { removeUser } = getAppContext();
  const [showSignOut, setShowSignOut] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignOutPress = async () => {
    if (!showSignOut) {
      setShowSignOut(true);
      return;
    }

    await removeUser();
  };

  const handleSwitchThemePress = async () => {
    await toggleTheme();
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await getUserProfile(user.token);

      if (response) {
        setUser({
          ...user,
          profilePic: `https://storage.googleapis.com/${
            String(response.profilePic).split('gs://')[1]
          }`,
        });
        storeUser({
          ...user,
          profilePic: `https://storage.googleapis.com/${
            String(response.profilePic).split('gs://')[1]
          }`,
        });
        setLoading(false);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          error.response?.data?.message || //axios error
          error.message || //js error
          'Error getting profile', //fallback
      });
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
    titleText: {
      color: theme.colors.text,
      fontSize: 20,
      fontWeight: 'bold',
    },
    titleContainer: {
      alignItems: 'center',
      width: '100%',
    },
    text: {
      color: theme.colors.text,
      fontSize: 14,
    },
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'flex-end',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        hidden={false}
      />

      <ThemeOverlay
        visible={showSignOut}
        onPressBg={() => setShowSignOut(false)}
      >
        <ThemeCard>
          <Text style={styles.text}>Are you sure you want to sign out?</Text>
          <View style={styles.buttonGroup}>
            <ThemeButton title="Yes" onPress={handleSignOutPress} />
            <ThemeButton title="No" onPress={() => setShowSignOut(false)} />
          </View>
        </ThemeCard>
      </ThemeOverlay>

      <View style={styles.container}>
        <FloatingMenuButton />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Profile</Text>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
          }
        >
          <View style={styles.buttonGroup}>
            <ThemeCard>
              <View style={styles.switchContainer}>
                <MaterialIcons
                  name="settings"
                  size={24}
                  color={theme.colors.icon}
                />
                <ThemeButton
                  title="Switch Theme"
                  onPress={handleSwitchThemePress}
                />
                <ThemeButton title="Sign Out" onPress={handleSignOutPress} />
              </View>
            </ThemeCard>
          </View>

          <ProfileContainer navigation={navigation} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
