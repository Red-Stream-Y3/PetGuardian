import { SafeAreaView, Text, View, StatusBar, StyleSheet } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import {
    FloatingMenuButton,
    ThemeButton,
    ThemeCard,
    ThemeOverlay,
} from "../../components";
import { getAppContext } from "../../context/AppContext";
import { useState } from "react";

const ProfileScreen = ({ navigation }) => {
    const { theme, toggleTheme } = getThemeContext();
    const { removeUser } = getAppContext();
    const [showSignOut, setShowSignOut] = useState(false);

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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: StatusBar.currentHeight,
        },
        titleText: {
            color: theme.colors.text,
            fontSize: 20,
            fontWeight: 'bold',
            marginStart: 10,
        },
        titleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        text: {
            color: theme.colors.text,
            fontSize: 14,
        },
        buttonGroup: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
        },
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} hidden={false} />
            <ThemeOverlay visible={showSignOut} onPressBg={() => setShowSignOut(false)}>
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
                <ThemeCard>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Profile</Text>
                        <ThemeButton title="Sign Out" onPress={handleSignOutPress} />
                        <ThemeButton title="Switch Theme" onPress={handleSwitchThemePress} />
                    </View>
                </ThemeCard>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;
