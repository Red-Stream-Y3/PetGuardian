import { Suspense, useEffect } from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import Animated from "react-native-reanimated";

const ImageItemCard = ({
  image,
  uri,
  onClick,
  body,
  title,
  tag,
  subtitle,
  style,
  width,
  borderRadius,
  viewMarginBottom,
  textMarginBottom,
  animationTag,
}) => {
  const { theme } = getThemeContext();
  const imageStyles = {
    fill: {
      width: '100%',
      height: 150,
      resizeMode: 'cover',
      borderRadius: borderRadius || 0,
    },
    side: {
      width: 150,
      height: '100%',
      resizeMode: 'cover',
      borderRadius: borderRadius || 0,
    },
  };

  useEffect(() => {
    if (style === 'side') {
      if (!body) {
        console.warn(
          'ImageItemCard: style=side requires a body element to be provided'
        );
      }
    //   if (width) {
    //     console.warn('ImageItemCard: style=side does not support width prop');
    //   }
    }
  }, []);

  return (
      <View
          style={{
              width: width || "90%",
              maxWidth: width || 500,
              margin: 10,
              shadowColor: theme.colors.shadow,
              elevation: 3,
              backgroundColor: theme.colors.surface,
              borderRadius: borderRadius || 10,
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
                  <Animated.Image
                      style={
                          style === "side" ? imageStyles.side : imageStyles.fill
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
              <View
                  style={{
                      flex: 1,
                      padding: 10,
                      marginBottom: viewMarginBottom || 0,
                      flexDirection: style === "side" ? "column" : "row",
                      justifyContent:
                          style === "side" ? "center" : "space-between",
                  }}>
                  <View>
                      {title ? (
                          <Text
                              style={{
                                  fontWeight: "bold",
                                  color: theme.colors.text,
                                  marginBottom: textMarginBottom || 0,
                                  alignItems: "center",
                                  justifyContent: "space-between",
                              }}>
                              {title}
                          </Text>
                      ) : null}
                      {subtitle ? (
                          <Text
                              style={{
                                  color: theme.colors.text,
                                  fontSize: 12,
                                  fontWeight: 400,
                              }}>
                              {subtitle}
                          </Text>
                      ) : null}
                  </View>

                  {tag !== undefined && tag !== null ? (
                      <Text
                          style={{
                              color: theme.colors.text,
                              position: "absolute",
                              fontSize: 12,
                              fontWeight: "bold",
                              top: 11.2,
                              right: 10,
                          }}>
                          {tag}
                      </Text>
                  ) : null}

                  {body ? body : null}
              </View>
          </Pressable>
      </View>
  );
};

export default ImageItemCard;
