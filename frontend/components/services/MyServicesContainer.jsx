import { StyleSheet, Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";

const MyServicesContainer = ({ navigation }) => {
    const { theme } = getThemeContext();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        header: {
            color: theme.colors.text,
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
        },
    });
    return (
        <View style={styles.container}>
            <Text style={styles.header}>MyServicesContainer</Text>
        </View>
    );
};

export default MyServicesContainer;
