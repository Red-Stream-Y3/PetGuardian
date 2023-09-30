import { Suspense, useEffect } from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';
import getThemeContext from '../../context/ThemeContext';

const ImageItemCard = ({
  image,
  uri,
  onClick,
  body,
  title,
  age,
  location,
  style,
  width,
}) => {
  const { theme } = getThemeContext();
  const imageStyles = {
    fill: {
      width: '100%',
      height: 150,
      resizeMode: 'cover',
      borderRadius: 15,
    },
    side: {
      width: 150,
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 15,
    },
  };

  useEffect(() => {
    if (style === 'side') {
      if (!body) {
        console.warn(
          'ImageItemCard: style=side requires a body element to be provided'
        );
      }
      if (width) {
        console.warn('ImageItemCard: style=side does not support width prop');
      }
    }
  }, []);

  return (
    <View
      style={{
        width: width || '90%',
        maxWidth: width || 500,
        margin: 10,
        shadowColor: theme.colors.shadow,
        elevation: 3,
        backgroundColor: theme.colors.surface,
        borderRadius: 15,
        overflow: 'hidden',
      }}
    >
      <Pressable
        android_ripple={{
          color: theme.colors.ripple,
        }}
        style={{
          height: style === 'side' ? 150 : 'auto',
          flexDirection: style === 'side' ? 'row' : 'column',
        }}
        onPress={onClick || null}
      >
        <Suspense fallback={<ActivityIndicator />}>
          <Image
            style={style === 'side' ? imageStyles.side : imageStyles.fill}
            source={
              image || {
                uri:
                  uri ||
                  'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png',
              }
            }
          />
        </Suspense>
        <View
          style={{
            padding: 10,
            marginBottom: 15,
            flexDirection: style === 'side' ? 'column' : 'row',
            justifyContent: style === 'side' ? 'center' : 'flex-start',
          }}
        >
          {title ? (
            <Text
              style={{
                fontWeight: 'bold',
                color: theme.colors.text,
                marginBottom: 5,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {title}
            </Text>
          ) : null}
          {age !== undefined && age !== null ? (
            <Text
              style={{
                color: theme.colors.itemCardText,
                position: 'absolute',
                fontSize: 12,
                fontWeight: 'bold',
                top: 11.2,
                right: 10,
              }}
            >
              {age}
            </Text>
          ) : null}
          {location ? (
            <Text
              style={{
                color: theme.colors.itemCardText,
                fontSize: 12,
                fontWeight: 400,
                position: 'absolute',
                top: 35,
                left: 10,
              }}
            >
              {location.split(' ').length > 4
                ? `${location.split(' ').slice(0, 3).join(' ')} ...`
                : location}
            </Text>
          ) : null}
          {body ? body : null}
        </View>
      </Pressable>
    </View>
  );
};

export default ImageItemCard;
