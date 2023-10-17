import { Pressable, StyleSheet, Text, View } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { getAppContext } from '../../context/AppContext';

const ThemeChip = ({ children, clickable, onClick, text, disableRipple, filled, color, active }) => {
    const { theme } = getThemeContext();
    const { tabColor } = getAppContext();

    const styles = StyleSheet.create({
        container: {
            overflow: 'hidden',
            borderRadius: 20,
            borderWidth: 1,
            marginHorizontal: 1,
            marginVertical: 2,
            borderColor: tabColor,
        },
        ripple: {
            color: disableRipple ? null : theme.colors.ripple,
        },
        pressableStyle: {
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: active ? color || tabColor : theme.colors.surface,
            alignItems: 'center',
        },
        text: {
            fontWeight: 'bold',
            color: active ? theme.colors.primaryText : theme.colors.text,
            paddingHorizontal: 5,
        },
    });

    return (
        <View style={styles.container}>
            <Pressable
                android_ripple={styles.ripple}
                style={styles.pressableStyle}
                onPress={() => {
                    if (clickable) {
                        if (onClick) onClick();
                    }
                }}
            >
                {children}

                <Text style={styles.text}>{text}</Text>
            </Pressable>
        </View>
    );
};

export default ThemeChip;
