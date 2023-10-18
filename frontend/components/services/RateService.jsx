import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import ThemeTextInput from '../common/ThemeTextInput';
import Toast from 'react-native-toast-message';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import ThemeButton from '../common/ThemeButton';
import { getAppContext } from '../../context/AppContext';
import axios from 'axios';
import {
  createServiceRating,
  getServiceRatingByUser,
  updateServiceRating
} from '../../services/ServiceproviderSerives';

const RateService = ({ provider, handleClose }) => {
  const { theme } = getThemeContext();
  const { user, tabColor } = getAppContext();
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [action, setAction] = useState('NEW'); // ['NEW', 'UPDATE']

  const fetchRating = async () => {
    setLoading(true);

    try {
      const response = await getServiceRatingByUser(
        user._id,
        provider.serviceProvider._id,
        user.token
      );

      if (response) {
        setRating(`${response.rating}`);
        setReview(response.review);
        setAction('UPDATE');
      }

      setLoading(false);
    } catch (error) {
      setError(
        error?.response?.data?.message || //axios error
          error.message || //js error
          'Could not get rating' //default
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRating();
  }, []);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      width: Dimensions.get('window').width * 0.8,
      borderRadius: 10,
      elevation: 5
    },
    text: {
      color: theme.colors.text
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 5
    },
    subtitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.text
    },
    error: {
      color: theme.colors.error
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: 15,
      width: '100%'
    }
  });

  const ratingOnChange = (text) => {
    try {
      const num = parseInt(text);
      if (num >= 1 && num <= 5) {
        setRating(`${num}`);
        setError(null);
      } else {
        throw new Error('Rating must be between 1 and 5');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const reviewOnChange = (text) => {
    setReview(text);
  };

  const handleRatingPress = async () => {
    if (!rating) {
      setError('Rating is required');
      return;
    }

    setLoading(true);

    try {
      const data = {
        rating: parseInt(rating),
        review: review,
        user: user._id,
        serviceProvider: provider.serviceProvider._id
      };

      let response = null;

      if (action === 'UPDATE') {
        response = await updateServiceRating(data, user.token);
      } else {
        response = await createServiceRating(data, user.token);
      }

      if (response !== null) {
        Toast.show({
          type: 'success',
          text1: 'Rating Submitted'
        });
        handleClose();
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleClosePress = () => {
    handleClose();
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator color={tabColor} size={50} />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>
            {action === 'NEW'
              ? `Rate your experience with ${provider?.serviceProvider.firstName}`
              : `Update your rating for ${provider?.serviceProvider.firstName}`}
          </Text>
          {error && (
            <Animated.Text
              entering={FadeInUp}
              exiting={FadeOutUp}
              style={styles.error}
            >
              {error}
            </Animated.Text>
          )}
          <ThemeTextInput
            keyboardType="numeric"
            title={`Rating (1 - 5)`}
            value={rating}
            onChange={ratingOnChange}
            placeholder="Enter your rating"
          />
          <ThemeTextInput
            title={`Review`}
            value={review}
            onChange={reviewOnChange}
            placeholder="Enter your review (Optional)"
            multiline
            numOfLines={5}
          />
          <View style={styles.actionContainer}>
            <ThemeButton
              variant={'clear'}
              title={'Close'}
              onPress={handleClosePress}
            />
            <ThemeButton title={'Submit'} onPress={handleRatingPress} />
          </View>
        </View>
      )}
    </>
  );
};

export default RateService;
