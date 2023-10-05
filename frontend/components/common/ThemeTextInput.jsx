import { StyleSheet, TextInput, View, Text, Pressable } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { getAppContext } from "../../context/AppContext";


const ThemeTextInput = ({
    title, 
    value, 
    onPressIcon, 
    onChange, 
    icon,
    placeholder,
    textSize,
    keyboardType,
}) => {
    const { theme } = getThemeContext();
    const { tabColor } = getAppContext();

    const styles = StyleSheet.create({
        textH1: {
            color: theme.colors.text,
            fontSize: 16,
            fontWeight: "bold",
        },
        textBody: {
            color: theme.colors.text,
            fontSize: 16,
            width: "100%",
            flex:1,
            fontWeight: "normal",
            paddingVertical:10,
            paddingHorizontal: 10,
            zIndex: 1,
            backgroundColor: theme.colors.surface,
        },
        input: {
            backgroundColor: theme.colors.surface,
            borderRadius: 5,
            marginVertical: 15,
            width: "100%",
            borderWidth: 1,
            borderColor: tabColor,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
    });

    return (
        <View style={styles.input}>
            {title && (
                <Text
                    style={{
                        ...styles.textH1,
                        position: "absolute",
                        top: -13,
                        left: 10,
                        backgroundColor: theme.colors.surface,
                        zIndex: 2,
                    }}>
                    {title}
                </Text>
            )}
            <TextInput
                value={value}
                placeholder={placeholder}
                keyboardType={keyboardType || null}
                style={styles.textBody}
            />
            {icon ? (
                <View>
                    <Pressable
                        android_ripple={{ 
                            color: theme.colors.ripple,
                            borderless: true,
                            radius: 40,
                         }}
                         style={{
                            padding:10,
                        }}
                        onPress={onPressIcon}>
                        {icon}
                    </Pressable>
                </View>
            ) : null}
        </View>
    );
};

export default ThemeTextInput;