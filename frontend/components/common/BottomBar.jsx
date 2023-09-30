import React, { useEffect, useState } from "react";
import { Animated, View } from "react-native";
import RoundIconButton from "./RoundIconButton";
import getThemeContext from "../../context/ThemeContext";
import { Ionicons } from '@expo/vector-icons';
import { StackActions, useNavigation } from "@react-navigation/native";

const BottomBar = ({selected, setSelected}) => {
    const {theme} = getThemeContext();
    const navigation = useNavigation();
    const [barColor, setBarColor] = useState(theme.colors.homePrimary);
    const [animation] = useState(new Animated.Value(0));

    const PADDING = 8;
    const SIZE_1 = 25;
    const SIZE_2 = 35;
    const ICON_THEME = theme.colors.primaryIcon;

    const triggerAnimation = (index) => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            setBarColor(theme.colors[buttons[index].name.toLowerCase() + "Primary"]);
            animation.setValue(0);
        });
    };

    useEffect(() => {
        navigation.dispatch(
            StackActions.replace(buttons[selected].name)
        )
    }, [selected]);

    useEffect(() => {
        triggerAnimation(selected);
    }, [theme]);

    const handlePress = (index) => {
        setSelected(index);

        //animate bar color
        triggerAnimation(index);
    };

    const buttons = [
        {
            name: "SERVICES",
            icon: <Ionicons name="paw-outline" size={SIZE_1} color={ICON_THEME} />,
            selectIcon: <Ionicons name="paw" size={SIZE_1} color={ICON_THEME} />,
            padding: PADDING,
        },{
            name: "LOST",
            icon: <Ionicons name="paw-outline" size={SIZE_1} color={ICON_THEME} />,
            selectIcon: <Ionicons name="paw" size={SIZE_1} color={ICON_THEME} />,
            padding: PADDING,
        },{
            name: "HOME",
            icon: <Ionicons name="paw-outline" size={SIZE_2} color={ICON_THEME} />,
            selectIcon: <Ionicons name="paw" size={SIZE_2} color={ICON_THEME} />,
            padding: PADDING,
        },{
            name: "ADOPT",
            icon: <Ionicons name="paw-outline" size={SIZE_1} color={ICON_THEME} />,
            selectIcon: <Ionicons name="paw" size={SIZE_1} color={ICON_THEME} />,
            padding: PADDING,
        },{
            name: "PLAY",
            icon: <Ionicons name="paw-outline" size={SIZE_1} color={ICON_THEME} />,
            selectIcon: <Ionicons name="paw" size={SIZE_1} color={ICON_THEME} />,
            padding: PADDING,
        }
    ];

    let backgroundColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [barColor, theme.colors[buttons[selected].name.toLowerCase() + "Primary"]],
    });

    return (
        <Animated.View
            style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-evenly",
                backgroundColor: backgroundColor,
            }}>
            {buttons.map((button, index) => (
                <RoundIconButton
                    key={index}
                    name={button.name}
                    padding={button.padding}
                    onPress={() => handlePress(index)}
                >
                    {selected === index ? button.selectIcon : button.icon}
                </RoundIconButton>
            ))}
        </Animated.View>
    );
};

export default BottomBar;