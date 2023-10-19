import { StyleSheet, Text, View } from 'react-native';
import { ScheduleContainer, ThemeBackButton } from '../../components';
import getThemeContext from '../../context/ThemeContext';

const MyServicesScheduleScreen = ({ navigation }) => {
    const { theme } = getThemeContext();

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            <ThemeBackButton navigation={navigation} />
            <ScheduleContainer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MyServicesScheduleScreen;
