import { Animated, Pressable, Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { getAppContext } from "../../App";
import { useEffect, useState } from "react";

const ThemeButton = ({ children, onPress, title, padding, variant }) => {
    const { theme } = getThemeContext();
    const { selectedTab } = getAppContext();

    const [animation] = useState(new Animated.Value(0));
    const [currentColor, setCurrentColor] = useState(theme.colors.homePrimary);
    const [nextColor, setNextColor] = useState(theme.colors.homePrimary);

    const triggerAnimation = (color) => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            setCurrentColor(color);
            animation.setValue(0);
        });
    };

    useEffect(() => {
        let color;
        switch (selectedTab) {
            case 0: {
                color = theme.colors.servicesPrimary;
                break;}
            case 1: {
                color = theme.colors.lostPrimary;
                break;
            }
            case 2: {
                color = theme.colors.homePrimary;
                break;
            }
            case 3: {
                color = theme.colors.adoptPrimary;
                break;
            }
            case 4: {
                color = theme.colors.playPrimary;
                break;
            }
        }
        setNextColor(color);
        triggerAnimation(color);
    }, [selectedTab, theme]);

    let bgColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [currentColor, nextColor],
    });

    const styles = {
        filled: {
            backgroundColor:bgColor,
            overflow:'hidden',
            borderRadius: 5,
            elevation: 3,
            margin: 5,
        },
        outlined: {
            borderColor:bgColor,
            borderWidth:1,
            overflow:'hidden',
            borderRadius: 5,
            margin: 5,
        },
        clear: {
            overflow:'hidden',
            borderRadius: 5,
            margin: 5,
        },
    }

    return (
        <Animated.View
            style={
                variant === "clear"
                    ? styles.clear
                    : variant === "outlined"
                    ? styles.outlined
                    : styles.filled
            }>
            <Pressable
                android_ripple={{
                    color:
                        variant === "clear" || variant === "outlined"
                            ? currentColor
                            : theme.colors.ripple,
                }}
                style={{
                    padding: padding || 10,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "auto",
                }}
                onPress={onPress || (() => {})}>
                {children}
                {title && (
                    <Text
                        style={{
                            marginHorizontal: 2,
                            fontWeight: "bold",
                            color:
                                variant === "clear" || variant === "outlined"
                                    ? theme.colors.text
                                    : theme.colors.buttonText,
                        }}>
                        {title}
                    </Text>
                )}
            </Pressable>
        </Animated.View>
    );
};

export default ThemeButton;