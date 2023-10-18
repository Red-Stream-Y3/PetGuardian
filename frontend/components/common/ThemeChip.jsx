import { Pressable, StyleSheet, Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { getAppContext } from "../../context/AppContext";

const ThemeChip = ({
    children,
    clickable,
    onClick,
    text,
    disableRipple,
    color,
    active,
}) => {
    const { theme } = getThemeContext();
    const { tabColor } = getAppContext();

    const styles = StyleSheet.create({
        container: {
            overflow: "hidden",
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
            alignItems: "baseline",
            justifyContent: "center",
            flexDirection: "row",
        },
        text: {
            fontWeight: "bold",
            color: active ? theme.colors.primaryText : theme.colors.text,
            paddingHorizontal: 5,
            marginEnd: children ? 5 : 0,
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
                }}>
                <Text style={styles.text}>{text}</Text>
                {children}
            </Pressable>
        </View>
    );
};

export default ThemeChip;
