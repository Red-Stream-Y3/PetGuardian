import React, { useEffect } from "react";
import { View } from "react-native";
import RoundIconButton from "./RoundIconButton";
import getThemeContext from "../../context/ThemeContext";
import { Ionicons } from '@expo/vector-icons';
import { StackActions, useNavigation } from "@react-navigation/native";

const BottomBar = ({selected, setSelected}) => {
    const {theme} = getThemeContext();
    const navigation = useNavigation();

    const PADDING = 8;
    const SIZE_1 = 25;
    const SIZE_2 = 35;

    useEffect(() => {
        navigation.dispatch(
            StackActions.replace(buttons[selected].name)
        )
    }, [selected]);

    const buttons = [
        {
            name: "SERVICES",
            icon: <Ionicons name="paw-outline" size={SIZE_1} color={theme.colors.icon} />,
            selectIcon: <Ionicons name="paw" size={SIZE_1} color={theme.colors.icon} />,
            padding: PADDING,
        },{
            name: "LOST",
            icon: <Ionicons name="paw-outline" size={SIZE_1} color={theme.colors.icon} />,
            selectIcon: <Ionicons name="paw" size={SIZE_1} color={theme.colors.icon} />,
            padding: PADDING,
        },{
            name: "HOME",
            icon: <Ionicons name="paw-outline" size={SIZE_2} color={theme.colors.icon} />,
            selectIcon: <Ionicons name="paw" size={SIZE_2} color={theme.colors.icon} />,
            padding: PADDING,
        },{
            name: "ADOPT",
            icon: <Ionicons name="paw-outline" size={SIZE_1} color={theme.colors.icon} />,
            selectIcon: <Ionicons name="paw" size={SIZE_1} color={theme.colors.icon} />,
            padding: PADDING,
        },{
            name: "PLAY",
            icon: <Ionicons name="paw-outline" size={SIZE_1} color={theme.colors.icon} />,
            selectIcon: <Ionicons name="paw" size={SIZE_1} color={theme.colors.icon} />,
            padding: PADDING,
        }
    ]
    return (
        <View
            style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-evenly",
            }}>
            {buttons.map((button, index) => (
                <RoundIconButton
                    key={index}
                    name={button.name}
                    padding={button.padding}
                    onPress={() => setSelected(index)}
                >
                    {selected === index ? button.selectIcon : button.icon}
                </RoundIconButton>
            ))}
        </View>
    );
};

export default BottomBar;