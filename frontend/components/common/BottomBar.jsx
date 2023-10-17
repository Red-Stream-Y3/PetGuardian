import React, { useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import RoundIconButton from "./RoundIconButton";
import getThemeContext from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAppContext } from "../../context/AppContext";

const BottomBar = ({}) => {
    const { theme } = getThemeContext();
    const { selectedTab, setSelectedTab, tabColor } = getAppContext();
    const navigation = useNavigation();
    const [barColor, setBarColor] = useState(theme.colors.homePrimary);
    const [animation] = useState(new Animated.Value(0));

    const PADDING = 8;
    const SIZE_1 = 25;
    const SIZE_2 = 35;
    const ICON_THEME = theme.colors.primaryIcon;

    const triggerAnimation = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            setBarColor(tabColor);
            animation.setValue(0);
        });
    };

    useEffect(() => {
        navigation.navigate(buttons[selectedTab].name);
    }, [selectedTab]);

    useEffect(() => {
        triggerAnimation();
    }, [theme, tabColor]);

    const handlePress = (index) => {
        setSelectedTab(index);
    };

    const buttons = [
        {
            name: "SERVICES",
            icon: (
                <Ionicons name='paw-outline' size={SIZE_1} color={ICON_THEME} />
            ),
            selectIcon: (
                <Ionicons name='paw' size={SIZE_1} color={ICON_THEME} />
            ),
            padding: PADDING,
        },
        {
            name: "LOST",
            icon: (
                <Ionicons name='paw-outline' size={SIZE_1} color={ICON_THEME} />
            ),
            selectIcon: (
                <Ionicons name='paw' size={SIZE_1} color={ICON_THEME} />
            ),
            padding: PADDING,
        },
        {
            name: "HOME",
            icon: (
                <Ionicons name='paw-outline' size={SIZE_2} color={ICON_THEME} />
            ),
            selectIcon: (
                <Ionicons name='paw' size={SIZE_2} color={ICON_THEME} />
            ),
            padding: PADDING,
        },
        {
            name: "ADOPT",
            icon: (
                <Ionicons name='paw-outline' size={SIZE_1} color={ICON_THEME} />
            ),
            selectIcon: (
                <Ionicons name='paw' size={SIZE_1} color={ICON_THEME} />
            ),
            padding: PADDING,
        },
        {
            name: "PLAY",
            icon: (
                <Ionicons name='paw-outline' size={SIZE_1} color={ICON_THEME} />
            ),
            selectIcon: (
                <Ionicons name='paw' size={SIZE_1} color={ICON_THEME} />
            ),
            padding: PADDING,
        },
    ];

    let backgroundColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [barColor, tabColor],
    });

    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: backgroundColor,
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
        },
    });

    return (
        <Animated.View style={styles.container}>
            {buttons.map((button, index) => (
                <RoundIconButton
                    key={index}
                    name={button.name}
                    padding={button.padding}
                    onPress={() => handlePress(index)}>
                    {selectedTab === index ? button.selectIcon : button.icon}
                </RoundIconButton>
            ))}
        </Animated.View>
    );
};

export default BottomBar;
