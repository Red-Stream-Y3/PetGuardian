import { Suspense } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";

const ImageItemCard = ({ image, uri, onClick, body, title, style }) => {
    const { theme } = getThemeContext();
    const imageStyles = {
        fill: {
            width: "100%",
            height: 150,
            resizeMode: "cover",
        },
        side: {
            width: 150,
            height: "100%",
            resizeMode: "cover",
        },
    };
    return (
        <View
            style={{
                width: "90%",
                margin: "2.5%",
                elevation: 1,
                shadowColor: theme.colors.shadow,
                elevation: 3,
                backgroundColor: theme.colors.surface,
                borderRadius: 10,
                overflow: "hidden",
            }}>
            <Pressable
                android_ripple={{
                    color: theme.colors.ripple,
                }}
                style={{
                    height: style === "side" ? 150 : "auto",
                    flexDirection: style === "side" ? "row" : "column",
                }}
                onPress={onClick || null}>
                <Suspense fallback={<ActivityIndicator />}>
                    <Image
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
                    />
                </Suspense>
                <View
                    style={{
                        padding: 10,
                        flexDirection: style === "side" ? "column" : "row",
                        justifyContent:
                            style === "side" ? "center" : "flex-start",
                    }}>
                    {body ? (
                        body
                    ) : title ? (
                        <Text
                            style={{
                                fontWeight: "bold",
                                color: theme.colors.text,
                            }}>
                            {title}
                        </Text>
                    ) : null}
                </View>
            </Pressable>
        </View>
    );
};

export default ImageItemCard;
