import { StyleSheet, Text, View } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { RegisterServiceProvider, ThemeBackButton } from '../../components';

const MyServicesEditScreen = ({ navigation, route }) => {
    const { theme } = getThemeContext();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.colors.text,
        },
    });

    return (
        <View style={styles.container}>
            <ThemeBackButton navigation={navigation} />
            <Text style={styles.title}>Edit Service Details</Text>
            <RegisterServiceProvider existing={true} navigation={navigation} />
        </View>
    );
};

export default MyServicesEditScreen;
