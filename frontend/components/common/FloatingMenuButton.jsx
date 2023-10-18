import {
    Animated,
    Dimensions,
    Easing,
    Pressable,
    StyleSheet,
    View,
} from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { getAppContext } from "../../context/AppContext";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDrawerStatus } from "@react-navigation/drawer";

const FloatingMenuButton = ({ onClick, variant }) => {
    const { theme } = getThemeContext();
    const { tabColor } = getAppContext();
    const [isPressed, setIsPressed] = useState(false);
    const navigation = useNavigation();
    const drawerStatus = useDrawerStatus();

    const rotation = new Animated.Value(0);
    const translation = new Animated.Value(0);
    const easing = Easing.inOut(Easing.ease);
    const width = Dimensions.get("window").width * 0.8;

    Animated.timing(rotation, {
        toValue: 1,
        duration: 500,
        easing,
        useNativeDriver: true,
    }).start();

    Animated.timing(translation, {
        toValue: 1,
        duration: 500,
        easing,
        useNativeDriver: true,
    }).start();

    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });

    const rotateReverseInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["180deg", "0deg"],
    });

    const translateInterpolate = translation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -width],
    });

    const translateReverseInterpolate = translation.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, 0],
    });

    const playOpenAnimation = () => {
        rotation.setValue(1);
        translation.setValue(1);
    };

    const playCloseAnimation = () => {
        rotation.setValue(0);
        translation.setValue(0);
    };

    useEffect(() => {
        if (drawerStatus === "closed") {
            setIsPressed(false);
        } else {
            setIsPressed(true);
        }
    }, [drawerStatus]);

    const handleClick = () => {
        if (onClick) onClick();
        navigation.toggleDrawer();
        setIsPressed(!isPressed);
    };

    const styles = StyleSheet.create({
        container: {
            position: "absolute",
            top: 0,
            right: 10,
            zIndex: 100,
            borderRadius: 50,
            overflow: "hidden",
            elevation: 5,
            transform: [
                {
                    translateX: isPressed
                        ? translateInterpolate
                        : translateReverseInterpolate,
                },
            ],
        },
        header: {
            color: theme.colors.text,
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
        },
        pressableContainer: {
            backgroundColor:
                variant === "theme" ? tabColor : theme.colors.surface,
            padding: 10,
            borderRadius: 50,
        },
        ripple: {
            color: theme.colors.ripple,
        },
        iconContainer: {
            transform: [
                {
                    rotate: isPressed
                        ? rotateInterpolate
                        : rotateReverseInterpolate,
                },
            ],
        },
    });
    return (
        <Animated.View style={styles.container}>
            <Pressable
                android_ripple={styles.ripple}
                style={styles.pressableContainer}
                onPress={handleClick}>
                <Animated.View style={styles.iconContainer}>
                    <AntDesign
                        name='menufold'
                        size={24}
                        color={theme.colors.icon}
                    />
                </Animated.View>
            </Pressable>
        </Animated.View>
    );
};

export default FloatingMenuButton;
