import { Pressable, StyleSheet, Text, View } from 'react-native';
import getThemeContext from '../../context/ThemeContext';

const RoundIconButton = ({ children, padding, name, onPress }) => {
    const { theme } = getThemeContext();

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            maxWidth: '20%',
            width: '20%',
        },
        ripple: {
            color: theme.colors.ripple,
            borderless: true,
            radius: 35,
        },
        pressableContainer: {
            width: '100%',
            height: '100em',
            padding: padding || 10,
            alignItems: 'center',
        },
        text: {
            fontSize: 12,
            fontWeight: 'bold',
            color: theme.colors.primaryText,
        },
    });

    return (
        <View style={styles.container}>
            <Pressable
                onPress={onPress || (() => {})}
                android_ripple={styles.ripple}
                style={styles.pressableContainer}
            >
                {children}
                <Text style={styles.text}>{name}</Text>
            </Pressable>
        </View>
    );
};

export default RoundIconButton;
