import React from "react";
import { View, Text, StyleSheet } from "react-native";
import getThemeContext from "../../context/ThemeContext";

const ThemeCard = ({
    backgroundColor,
    paddingHorizontal,
    paddingVertical,
    marginHorizontal,
    marginVertical,
    children,
}) => {
    const { theme } = getThemeContext();

    const styles = StyleSheet.create({
        card: {
            backgroundColor: backgroundColor || theme.colors.surface,
            paddingHorizontal: paddingHorizontal || 20,
            paddingVertical: paddingVertical || 10,
            marginHorizontal: marginHorizontal || 10,
            marginVertical: marginVertical || 10,
            borderRadius: 10,
            elevation: 5,
            alignItems: "center",
            justifyContent: "center",
        },
    });

    return <View style={styles.card}>{children}</View>;
};

export default ThemeCard;
