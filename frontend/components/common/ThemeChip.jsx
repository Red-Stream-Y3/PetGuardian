import { Animated, Pressable, Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { getAppContext } from '../../context/AppContext';
import { useEffect, useState } from "react";

const ThemeChip = ({ children, clickable, onClick, text, disableRipple, filled, color, active }) => {
    const { theme } = getThemeContext();
    const { selectedTab, tabColor } = getAppContext();

    // const [animation] = useState(new Animated.Value(0));
    // const [currentColor, setCurrentColor] = useState(theme.colors.homePrimary);
    // const [nextColor, setNextColor] = useState(theme.colors.homePrimary);

    // const triggerAnimation = (color) => {
    //     Animated.timing(animation, {
    //         toValue: 1,
    //         duration: 300,
    //         useNativeDriver: false,
    //     }).start(() => {
    //         setCurrentColor(color);
    //         animation.setValue(0);
    //     });
    // };

    // let bgColor = animation.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [currentColor, nextColor],
    // });
    
    // useEffect(() => {
    //     setNextColor(tabColor);
    //     triggerAnimation(tabColor);
    // }, [selectedTab, theme]);

    return (
        <View
            style={{
                overflow: "hidden",
                borderRadius: 20,
                borderWidth: 1,
                marginHorizontal: 1,
                borderColor: tabColor,
            }}>
            <Pressable
                android_ripple={{
                    color: disableRipple ? null : theme.colors.ripple,
                }}
                style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: active
                        ? (color || tabColor)
                        : theme.colors.surface,
                    alignItems: "center",
                }}
                onPress={() => {
                    if (clickable) {
                        if (onClick) onClick();
                    }
                }}>
                {children}

                <Text
                    style={{
                        fontWeight: "bold",
                        color: active
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
