import React, { useEffect, useState } from 'react';
import {
  Dimensions,
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
import {
  updateEmail,
  updateFirstName,
  updateLastName,
  updatePassword,
  updatePhone,
  updateProfilePic,
  updateUsername,
} from '../../services/UserServices';
import Toast from 'react-native-toast-message';
import ThemeOverlay from './ThemeOverlay';
import ThemeTextInput from './ThemeTextInput';
import ThemeCard from './ThemeCard';
import ImageItemCard from './ImageItemCard';

const ProfileContainer = ({ navigation }) => {
  const { theme } = getThemeContext();
  const { user, storeUser, setUser } = getAppContext();
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPasswordOverlay, setShowPasswordOverlay] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [currentPassword, setCurrentPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [selected, setSelected] = useState(''); // [username, firstName, lastName, email, phone]
  const [error, setError] = useState('');

  useEffect(() => {
    if (!showOverlay && !showPasswordOverlay) {
      setError('');
    }
  }, [showOverlay, showPasswordOverlay]);

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

  const errorToast = (error) => {
    if (error.response?.data?.message?.startsWith('E11000')) {
      setError('Email is already in use');
      return;
    }
    setError(
      error.response?.data?.message || //axios error
        error.message || //js error
        'Error updating username' //fallback
    );
  };

  const submitNewImage = async () => {
    if (!image) return;

    try {
      setSubmitting(true);

      const response = await updateProfilePic(image, user._id, user.token);

      if (response) {
        setUser({
          ...user,
          profilePic: response.profilePic,
        });
        await storeUser({
          ...user,
          profilePic: response.profilePic,
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
      errorToast(error);
      setSubmitting(false);
    }
  };

  const handleUsernamePress = async () => {
    if (!showOverlay) {
      setSelected('username');
      setShowOverlay(true);
      return;
    }

    try {
      if (username === '') {
        throw new Error('Please fill out all fields');
      }

      if (username === user.username) {
        throw new Error('New username cannot be the same as current username');
      }

      setSubmitting(true);
      const response = await updateUsername(username, user.token);

      if (response) {
        setUser({
          ...user,
          username: response.username,
        });
        await storeUser({
          ...user,
          username: response.username,
        });

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Username updated',
        });

        setShowOverlay(false);
      }
      setSubmitting(false);
    } catch (error) {
      errorToast(error);
      setSubmitting(false);
    }
  };

  const handleFirstNamePress = async () => {
    if (!showOverlay) {
      setSelected('firstName');
      setShowOverlay(true);
      return;
    }

    try {
      if (firstName === '') {
        throw new Error('Please fill out all fields');
      }

      if (firstName === user.firstName) {
        throw new Error(
          'New first name cannot be the same as current first name'
        );
      }

      setSubmitting(true);

      const response = await updateFirstName(firstName, user.token);

      if (response) {
        setUser({
          ...user,
          firstName: response.firstName,
        });
        await storeUser({
          ...user,
          firstName: response.firstName,
        });

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'First name updated',
        });

        setShowOverlay(false);
      }

      setSubmitting(false);
    } catch (error) {
      errorToast(error);
      setSubmitting(false);
    }
  };

  const handleLastNamePress = async () => {
    if (!showOverlay) {
      setSelected('lastName');
      setShowOverlay(true);
      return;
    }

    try {
      if (lastName === '') {
        throw new Error('Please fill out all fields');
      }

      if (lastName === user.lastName) {
        throw new Error(
          'New last name cannot be the same as current last name'
        );
      }

      setSubmitting(true);

      const response = await updateLastName(lastName, user.token);

      if (response) {
        setUser({
          ...user,
          lastName: response.lastName,
        });
        await storeUser({
          ...user,
          lastName: response.lastName,
        });

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Last name updated',
        });

        setShowOverlay(false);
      }

      setSubmitting(false);
    } catch (error) {
      errorToast(error);
      setSubmitting(false);
    }
  };

  const handleEmailPress = async () => {
    if (!showOverlay) {
      setSelected('email');
      setShowOverlay(true);
      return;
    }

    try {
      if (email === '') {
        throw new Error('Please fill out all fields');
      }

      if (email === user.email) {
        throw new Error('New email cannot be the same as current email');
      }

      setSubmitting(true);

      const response = await updateEmail(email, user.token);

      if (response) {
        setUser({
          ...user,
          email: response.email,
        });
        await storeUser({
          ...user,
          email: response.email,
        });

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Email updated',
        });

        setShowOverlay(false);
      }

      setSubmitting(false);
    } catch (error) {
      // if (String(error.response?.data?.message).startsWith('')) {}
      errorToast(error);
      setSubmitting(false);
    }
  };

  const handlePhonePress = async () => {
    if (!showOverlay) {
      setSelected('phone');
      setShowOverlay(true);
      return;
    }

    try {
      if (phone === '') {
        throw new Error('Please fill out all fields');
      }

      if (phone === user.phone) {
        throw new Error('New phone cannot be the same as current phone');
      }

      setSubmitting(true);

      const response = await updatePhone(phone, user.token);

      if (response) {
        setUser({
          ...user,
          phone: response.phone,
        });
        await storeUser({
          ...user,
          phone: response.phone,
        });

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Phone updated',
        });

        setShowOverlay(false);
      }

      setSubmitting(false);
    } catch (error) {
      errorToast(error);
      setSubmitting(false);
    }
  };

  const handlePasswordPress = async () => {
    if (!showPasswordOverlay) {
      setShowPasswordOverlay(true);
      return;
    }

    try {
      if (
        currentPassword === '' ||
        newPassword === '' ||
        confirmNewPassword === ''
      ) {
        throw new Error('Please fill out all fields');
      }

      if (newPassword !== confirmNewPassword) {
        throw new Error('New passwords do not match');
      }

      if (newPassword === currentPassword) {
        throw new Error('New password cannot be the same as current password');
      }

      setSubmitting(true);

      const response = await updatePassword(
        user.email,
        currentPassword,
        newPassword,
        user.token
      );

      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Password updated',
        });

        setShowPasswordOverlay(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      }

      setSubmitting(false);
    } catch (error) {
      errorToast(error);
      setSubmitting(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      color: theme.colors.text,
      fontSize: 16,
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
      bottom: 0,
      paddingVertical: 10,
      left: 0,
      right: 0,
      zIndex: 1,
      backgroundColor: 'rgba(255,255,255,0.5)',
    },
    imageContainer: {
      backgroundColor: theme.colors.surface,
      alignSelf: 'center',
      borderRadius: 100,
      elevation: 5,
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
    overlayContainer: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      width: Dimensions.get('window').width * 0.8,
    },
    flexRowBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      width: '100%',
      justifyContent: 'space-between',
    },
    flexRowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flexRowStart: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 12,
      alignSelf: 'flex-start',
    },
  });

  return (
    <View style={styles.container}>
      <ThemeOverlay
        visible={showOverlay}
        onPressBg={() => setShowOverlay(false)}
      >
        <ThemeCard>
          <View style={styles.overlayContainer}>
            <ThemeTextInput
              title={
                selected === 'username'
                  ? 'Username'
                  : selected === 'firstName'
                  ? 'First Name'
                  : selected === 'lastName'
                  ? 'Last Name'
                  : selected === 'email'
                  ? 'Email'
                  : selected === 'phone'
                  ? 'Phone'
                  : ''
              }
              value={
                selected === 'username'
                  ? username
                  : selected === 'firstName'
                  ? firstName
                  : selected === 'lastName'
                  ? lastName
                  : selected === 'email'
                  ? email
                  : selected === 'phone'
                  ? phone
                  : ''
              }
              placeholder={
                selected === 'username'
                  ? 'New Username'
                  : selected === 'firstName'
                  ? 'New First Name'
                  : selected === 'lastName'
                  ? 'New Last Name'
                  : selected === 'email'
                  ? 'New Email'
                  : selected === 'phone'
                  ? 'New Phone'
                  : ''
              }
              onChange={(text) => {
                if (selected === 'username') setUsername(text);
                else if (selected === 'firstName') setFirstName(text);
                else if (selected === 'lastName') setLastName(text);
                else if (selected === 'email') setEmail(text);
                else if (selected === 'phone') setPhone(text);
              }}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <ThemeButton
              loading={submitting}
              title="Save"
              onPress={() => {
                if (selected === 'username') handleUsernamePress();
                else if (selected === 'firstName') handleFirstNamePress();
                else if (selected === 'lastName') handleLastNamePress();
                else if (selected === 'email') handleEmailPress();
                else if (selected === 'phone') handlePhonePress();
              }}
            />
          </View>
        </ThemeCard>
      </ThemeOverlay>

      <ThemeOverlay
        visible={showPasswordOverlay}
        onPressBg={() => setShowPasswordOverlay(false)}
      >
        <ThemeCard>
          <View style={styles.overlayContainer}>
            <ThemeTextInput
              title="Current Password"
              placeholder="Current Password"
              secureTextEntry={showCurrentPassword}
              icon={
                <MaterialIcons
                  name={showCurrentPassword ? 'visibility' : 'visibility-off'}
                  size={24}
                  color={theme.colors.text}
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                />
              }
              textContentType={'password'}
              onChange={(text) => setCurrentPassword(text)}
            />
            <ThemeTextInput
              title="New Password"
              placeholder="New Password"
              secureTextEntry={showNewPassword}
              icon={
                <MaterialIcons
                  name={showNewPassword ? 'visibility' : 'visibility-off'}
                  size={24}
                  color={theme.colors.text}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                />
              }
              onChange={(text) => setNewPassword(text)}
            />
            <ThemeTextInput
              title="Confirm New Password"
              placeholder="Confirm New Password"
              secureTextEntry={showConfirmNewPassword}
              icon={
                <MaterialIcons
                  name={
                    showConfirmNewPassword ? 'visibility' : 'visibility-off'
                  }
                  size={24}
                  color={theme.colors.text}
                  onPress={() =>
                    setShowConfirmNewPassword(!showConfirmNewPassword)
                  }
                />
              }
              onChange={(text) => setConfirmNewPassword(text)}
            />
            <ThemeButton
              title="Change Password"
              onPress={handlePasswordPress}
            />
          </View>
        </ThemeCard>
      </ThemeOverlay>

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
          <MaterialIcons name="add-a-photo" size={18} color={'black'} on />
        </TouchableOpacity>
      </View>
      {image !== null && (
        <ThemeButton
          title={'Upload Image'}
          onPress={submitNewImage}
          loading={submitting}
        />
      )}

      <ThemeCard>
        {/* username */}
        <View style={styles.flexRowBetween}>
          <Text style={styles.subtitle}>Username: </Text>

          <View style={styles.flexRowCenter}>
            <Text style={styles.text}>{user?.username}</Text>
            <ThemeButton
              borderRadius={50}
              variant={'clear'}
              onPress={handleUsernamePress}
            >
              <MaterialIcons name="edit" size={18} color={theme.colors.text} />
            </ThemeButton>
          </View>
        </View>

        {/* first name */}
        <View style={styles.flexRowBetween}>
          <Text style={styles.subtitle}>First Name: </Text>

          <View style={styles.flexRowCenter}>
            <Text style={styles.text}>{user?.firstName}</Text>
            <ThemeButton
              borderRadius={50}
              variant={'clear'}
              onPress={handleFirstNamePress}
            >
              <MaterialIcons name="edit" size={18} color={theme.colors.text} />
            </ThemeButton>
          </View>
        </View>

        {/* last name */}
        <View style={styles.flexRowBetween}>
          <Text style={styles.subtitle}>Last Name: </Text>

          <View style={styles.flexRowCenter}>
            <Text style={styles.text}>{user?.lastName}</Text>
            <ThemeButton
              borderRadius={50}
              variant={'clear'}
              onPress={handleLastNamePress}
            >
              <MaterialIcons name="edit" size={18} color={theme.colors.text} />
            </ThemeButton>
          </View>
        </View>

        {/* email */}
        <View style={styles.flexRowBetween}>
          <Text style={styles.subtitle}>Email: </Text>

          <View style={styles.flexRowCenter}>
            <Text style={styles.text}>{user?.email}</Text>
            <ThemeButton
              borderRadius={50}
              variant={'clear'}
              onPress={handleEmailPress}
            >
              <MaterialIcons name="edit" size={18} color={theme.colors.text} />
            </ThemeButton>
          </View>
        </View>

        {/* phone */}
        <View style={styles.flexRowBetween}>
          <Text style={styles.subtitle}>Phone: </Text>

          <View style={styles.flexRowCenter}>
            <Text style={styles.text}>{user?.phone}</Text>
            <ThemeButton
              borderRadius={50}
              variant={'clear'}
              onPress={handlePhonePress}
            >
              <MaterialIcons name="edit" size={18} color={theme.colors.text} />
            </ThemeButton>
          </View>
        </View>

        {/* password */}
        <View style={styles.flexRowBetween}>
          <Text style={styles.subtitle}>Password: </Text>
          <ThemeButton title={'Change Password'} onPress={handlePasswordPress}>
            <MaterialIcons
              name="settings"
              size={18}
              color={theme.colors.primaryIcon}
            />
          </ThemeButton>
        </View>
      </ThemeCard>
    </View>
  );
};

export default ProfileContainer;
