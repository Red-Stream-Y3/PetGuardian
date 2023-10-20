import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import ImageItemCard from './ImageItemCard';
import * as ImagePickerLibrary from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import getThemeContext from '../../context/ThemeContext';
import ThemeCard from './ThemeCard';
import ThemeButton from './ThemeButton';

const ImagePicker = ({
  images,
  setImages,
  variant,
  itemWidth,
  itemHeight,
  imageHeight,
}) => {
  const { theme } = getThemeContext();
  const pickImage = async () => {
    let result = await ImagePickerLibrary.launchImageLibraryAsync({
      mediaTypes: ImagePickerLibrary.MediaTypeOptions.All,
      allowMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      let newImages = [...images];

      result.assets.forEach((asset) => {
        newImages.push(asset.uri);
      });

      setImages(newImages);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginVertical: 10,
    },
    scrollStyle: {
      flexGrow: 0,
    },
    scrollContentContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemContainer: {
      flexDirection: 'row',
      width: '100%',
      alignSelf: 'center',
      justifyContent: 'center',
    },
  });

  const WIDTH = itemWidth || Dimensions.get('window').width * 0.4;
  const HEIGHT = itemHeight || Dimensions.get('window').width * 0.4 + 50;
  const IMAGE_HEIGHT = imageHeight || Dimensions.get('window').width * 0.4;

  return (
    <ThemeCard>
      <ThemeButton title={'Pick Images'} onPress={pickImage}>
        <MaterialCommunityIcons
          name="image-plus"
          size={24}
          color={theme.colors.primaryIcon}
        />
      </ThemeButton>
      <ScrollView
        horizontal={variant === 'vertical' ? false : true}
        style={styles.scrollStyle}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {images.map((image, index) => (
          <ImageItemCard
            key={index}
            uri={image}
            width={WIDTH}
            height={HEIGHT}
            imageHeight={IMAGE_HEIGHT}
            padding={0}
            style={variant === 'vertical' ? 'side' : 'fill'}
            body={
              <View style={styles.itemContainer}>
                <ThemeButton
                  title={'Remove'}
                  variant={'clear'}
                  onPress={() => {
                    let newImages = [...images];
                    newImages.splice(index, 1);
                    setImages(newImages);
                  }}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    size={24}
                    color={theme.colors.icon}
                  />
                </ThemeButton>
              </View>
            }
          />
        ))}
      </ScrollView>
    </ThemeCard>
  );
};

export default ImagePicker;
