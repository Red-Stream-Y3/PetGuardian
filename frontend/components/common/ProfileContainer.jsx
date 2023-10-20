import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { getAppContext } from '../../context/AppContext';
import getThemeContext from '../../context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import ThemeButton from './ThemeButton';
import * as ImagePicker from 'expo-image-picker';
import { updateProfilePic } from '../../services/UserServices';
import Toast from 'react-native-toast-message';

const ProfileContainer = ({ navigation }) => {
  const { theme } = getThemeContext();
  const { user, storeUser, setUser } = getAppContext();
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    console.log(user.profilePic);
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const submitNewImage = async () => {
    if (!image) return;

    try {
      setSubmitting(true);

      const response = await updateProfilePic(image, user._id, user.token);

      if (response) {
        setUser({
          ...user,
          profilePic: `https://storage.googleapis.com/${
            String(response.profilePic).split('gs://')[1]
          }`,
        });
        storeUser({
          ...user,
          profilePic: `https://storage.googleapis.com/${
            String(response.profilePic).split('gs://')[1]
          }`,
        });

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Profile picture updated',
        });

        setImage(null);
      }

      setSubmitting(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          error.response?.data?.message || //axios error
          error.message || //js error
          'Error updating profile pic', //fallback
      });
      setSubmitting(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
    subtitle: {
      color: theme.colors.text,
      fontSize: 14,
      fontWeight: 'bold',
    },
    text: {
      color: theme.colors.text,
      fontSize: 14,
    },
    imageButtonContainer: {
      position: 'absolute',
      alignItems: 'center',
      bottom: 5,
      paddingVertical: 10,
      left: 0,
      right: 0,
      zIndex: 1,
      backgroundColor: 'rgba(255,255,255,0.5)',
    },
    imageContainer: {
      backgroundColor: theme.colors.surface,
      alignSelf: 'center',
      padding: 5,
      borderRadius: 100,
      elevation: 3,
      margin: 5,
      overflow: 'hidden',
    },
    ripple: {
      color: theme.colors.ripple,
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 100,
      alignSelf: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: image === null ? user?.profilePic : image,
          }}
        />
        <TouchableOpacity
          style={styles.imageButtonContainer}
          onPress={pickImage}
        >
          <MaterialIcons
            name="add-a-photo"
            size={24}
            color={theme.colors.text}
            on
          />
        </TouchableOpacity>
      </View>
      {image !== null && (
        <ThemeButton
          title={'Submit'}
          onPress={submitNewImage}
          loading={submitting}
        />
      )}
      <Text style={styles.title}>{user?.username}</Text>
      <ThemeButton
        title={'test'}
        onPress={() => {
          console.log(user.token);
        }}
      />
    </View>
  );
};

export default ProfileContainer;
