import { Suspense, useEffect } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import getThemeContext from "../../context/ThemeContext";
import Animated, { FadeInDown } from "react-native-reanimated";

const ImageItemCard = ({
    image,
    uri,
    onClick,
    body,
    title,
    sideTag,
    subtitle,
    style,
    width,
    borderRadius,
    viewMarginBottom,
    textMarginBottom,
    animationTag,
    index,
}) => {
    const { theme } = getThemeContext();
    const imageStyles = {
        fill: {
            width: "100%",
            height: 150,
            resizeMode: "cover",
            borderRadius: borderRadius || 0,
        },
        side: {
            width: 150,
            height: "100%",
            resizeMode: "cover",
            borderRadius: borderRadius || 0,
        },
    };

    useEffect(() => {
        if (style === "side") {
            if (!body) {
                console.warn(
                    "ImageItemCard: style=side requires a body element to be provided"
                );
            }
            //   if (width) {
            //     console.warn('ImageItemCard: style=side does not support width prop');
            //   }
        }
    }, []);

    const styles = StyleSheet.create({
        container: {
            width: width || "90%",
            maxWidth: width || 500,
            margin: 10,
            shadowColor: theme.colors.shadow,
            elevation: 3,
            backgroundColor: theme.colors.surface,
            borderRadius: borderRadius || 10,
            overflow: "hidden",
        },
        ripple: {
            color: theme.colors.ripple,
        },
        pressableContainer: {
            height: style === "side" ? 150 : "auto",
            flexDirection: style === "side" ? "row" : "column",
        },
        bodyContainer: {
            flex: 1,
            padding: 10,
            marginBottom: viewMarginBottom || 0,
            flexDirection: style === "side" ? "column" : "row",
            justifyContent: style === "side" ? "center" : "space-between",
        },
        titleText: {
            fontWeight: "bold",
            color: theme.colors.text,
            marginBottom: textMarginBottom || 0,
            alignItems: "center",
            justifyContent: "space-between",
        },
        subtitleText: {
            color: theme.colors.text,
            fontSize: 12,
            fontWeight: "bold",
        },
        tagText: {
            color: theme.colors.text,
            position: "absolute",
            fontSize: 12,
            fontWeight: "bold",
            top: 11.2,
            right: 10,
        },
    });

    return (
        <Animated.View
            style={styles.container}
            entering={FadeInDown.delay(index ? index * 100 : 0)}>
            <Pressable
                android_ripple={styles.ripple}
                style={styles.pressableContainer}
                onPress={onClick || null}>
                <Suspense fallback={<ActivityIndicator />}>
                    <Animated.Image
                        style={
                            style === "side"
                                ? imageStyles.side
                                : imageStyles.fill
                        }
                        source={
                            image || {
                                uri:
                                    uri ||
                                    "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
                            }
                        }
                        sharedTransitionTag={animationTag || null}
                    />
                </Suspense>
                <View style={styles.bodyContainer}>
                    <View>
                        {title ? (
                            <Text style={styles.titleText}>{title}</Text>
                        ) : null}
                        {subtitle ? (
                            <Text style={styles.subtitleText}>{subtitle}</Text>
                        ) : null}
                    </View>

                    {sideTag !== undefined && sideTag !== null ? (
                        <Text style={styles.tagText}>{sideTag}</Text>
                    ) : null}

                    {body ? body : null}
                </View>
            </Pressable>
        </Animated.View>
    );
};

export default ImageItemCard;
