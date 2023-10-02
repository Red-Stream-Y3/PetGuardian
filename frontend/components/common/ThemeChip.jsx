import { Pressable, Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { useState } from "react";

const ThemeChip = ({ children, clickable, onClick, text, disableRipple, filled }) => {
    const { theme } = getThemeContext();
    const [clicked, setClicked] = useState(filled ? true : false);

    return (
        <View
            style={{
                overflow: "hidden",
                borderRadius: 20,
                borderWidth: 1,
                marginHorizontal: 1,
                borderColor: theme.colors.servicesPrimary,
            }}>
            <Pressable
                android_ripple={{
                    color: disableRipple ? null : theme.colors.ripple,
                }}
                style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: clicked
                        ? theme.colors.servicesPrimary
                        : theme.colors.surface,
                    borderColor: theme.colors.primary,
                    alignItems: "center",
                }}
                onPress={() => {
                    if (clickable) {
                        setClicked(!clicked);
                        if (onClick) onClick();
                    }
                }}>
                {children}

                <Text
                    style={{
                        fontWeight: "bold",
                        color: clicked
                            ? theme.colors.primaryText
                            : theme.colors.text,
                        paddingHorizontal: 5,
                    }}>
                    {text}
                </Text>
            </Pressable>
        </View>
    );
};

export default ThemeChip;
