import React, { Suspense, lazy, useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Dimensions,
  FlatList,
} from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { getAppContext } from '../../context/AppContext';
import ImageItemCard from '../common/ImageItemCard';
import Animated from 'react-native-reanimated';
import ThemeOverlay from '../common/ThemeOverlay';
import BookingSummary from './BookingSummary';
import Toast from 'react-native-toast-message';
import ThemeButton from '../common/ThemeButton';
import RateService from './RateService';
import {
  cancelBooking,
  getUserBookings,
  makePayment,
} from '../../services/ServiceproviderSerives';
import BraintreePaymentWebview from './../common/BraintreePaymentWebview';

const HireHistory = ({ navigation }) => {
  const { theme } = getThemeContext();
  const { user } = getAppContext();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSelected, setShowSelected] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showRating, setShowRating] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const getHireHistory = async () => {
    setLoading(true);
    try {
      const response = await getUserBookings(user._id, user.token);

      if (response) setHistory(response);

      setLoading(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          error?.response?.data?.message || //axios error
          error.message || //js error
          'Could not get hire history', //default
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    getHireHistory();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      width: '100%',
    },
    pageTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 10,
    },
    textTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 5,
    },
    textSubtitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    textBody: {
      fontSize: 14,
      color: theme.colors.text,
    },
    textHighlight: {
      fontSize: 18,
      color: theme.colors.servicesPrimary,
    },
    textHighlightBold: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.servicesPrimary,
    },
    titleContainer: {
      width: '100%',
      alignItems: 'center',
    },
    emptyMessage: {
      marginTop: Dimensions.get('window').height / 3,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    buttonContainer: {
      alignSelf: 'flex-end',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const onPressCancelBooking = async (id) => {
    const data = {
      _id: id,
      status: 'cancelled',
    };
    try {
      const response = await cancelBooking(data, user.token);

      if (response) {
        setShowSelected(false);
        setSelected(null);
        Toast.show({
          type: 'success',
          text1: 'Booking Cancelled',
        });
        getHireHistory();
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          error?.response?.data?.message || //axios error
          error.message || //js error
          'Could not cancel booking', //default
      });
    }
  };

  const handleRatingClick = async (item) => {
    if (!showRating) {
      setSelected(item);
      setShowRating(true);
      return;
    }
  };

  const handlePaymentPress = async (item) => {
    if (!showPayment) {
      setSelected(item);
      setShowPayment(true);
      return;
    }
  };

  const handlePayment = async (payload) => {
    try {
      const data = {
        nonce: payload.nonce,
        deviceData: payload.deviceData,
        test: true,
        amount: selected?.totalFee,
        bookingId: selected?._id,
      };

      const response = await makePayment(data, user.token);

      if (response.isPaymentSuccessful) {
        Toast.show({
          type: 'success',
          text1: 'Payment Successful',
        });
        setShowPayment(false);
        getHireHistory();
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          error?.response?.data?.message || //axios error
          error.message || //js error
          'Could not pay', //default
      });
    }
  };

  return (
    <View style={styles.container}>
      <ThemeOverlay
        visible={showPayment}
        onPressBg={() => setShowPayment(false)}
      >
        <BraintreePaymentWebview
          amount={selected?.totalAmount}
          onNonceReceived={handlePayment}
          setShowOverlay={setShowPayment}
        />
      </ThemeOverlay>

      <ThemeOverlay visible={showRating} onPressBg={() => setShowRating(false)}>
        <RateService
          provider={selected}
          handleClose={() => setShowRating(false)}
        />
      </ThemeOverlay>

      <ThemeOverlay
        visible={showSelected}
        onPressBg={() => setShowSelected(false)}
      >
        <BookingSummary
          booking={selected}
          closeActionCallback={() => {
            setShowSelected(false);
            setSelected(null);
          }}
          actionTitle={'Cancel Booking'}
          actionCallback={() => {
            onPressCancelBooking(selected._id);
          }}
        />
      </ThemeOverlay>

      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>Hire History</Text>
      </View>

      <Suspense fallback={<ActivityIndicator />}>
        <FlatList
          data={history}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getHireHistory} />
          }
          ListEmptyComponent={
            <View style={styles.emptyMessage}>
              <Text style={styles.textBody}>No History Found</Text>
            </View>
          }
          keyExtractor={(item) => item._id}
          style={{ width: '100%' }}
          renderItem={({ item, i }) => (
            <Animated.View style={styles.titleContainer}>
              <ImageItemCard
                style={'side'}
                index={i}
                onClick={() => {
                  setSelected(item);
                  setShowSelected(true);
                }}
                uri={
                  item.profilePic ||
                  'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png'
                }
                highlight={true}
                highlightColor={
                  item.status === 'pending'
                    ? 'yellow'
                    : item.status === 'accepted'
                    ? 'blue'
                    : item.status === 'cancelled' || item.status === 'rejected'
                    ? 'red'
                    : item.status === 'complete'
                    ? 'green'
                    : theme.colors.surface
                }
                body={
                  <View>
                    <Text style={styles.textTitle}>
                      {item.serviceProvider.firstName}{' '}
                      {item.serviceProvider.lastName}
                    </Text>
                    <Text style={styles.textBody}>
                      {item.oneDay !== true
                        ? item.continuous !== true
                          ? `${new Date(
                              item.startDate
                            ).toLocaleDateString()} to ${new Date(
                              item.endDate
                            ).toLocaleDateString()}`
                          : `${new Date(
                              item.startDate
                            ).toLocaleDateString()} onwards`
                        : `On ${new Date(item.startDate).toLocaleDateString()}`}
                    </Text>
                    <Text style={styles.textBody}>
                      {item.allDay !== true
                        ? `${new Date(
                            item.startTime
                          ).toLocaleTimeString()} to ${new Date(
                            item.endTime
                          ).toLocaleTimeString()}`
                        : `All Day`}
                    </Text>
                    <Text style={styles.textBody}>
                      {'Total Fee : Rs.'}
                      {item.totalFee}
                      {item.paymentStatus === 'paid' ? (
                        <Text
                          style={{
                            color: 'green',
                          }}
                        >
                          {' '}
                          (Paid)
                        </Text>
                      ) : (
                        <Text
                          style={{
                            color: 'red',
                          }}
                        >
                          {' '}
                          (Unpaid)
                        </Text>
                      )}
                    </Text>

                    <View style={styles.buttonContainer}>
                      {item.status === 'accepted' &&
                        item.paymentStatus !== 'paid' && (
                          <ThemeButton
                            title={'Pay Now'}
                            onPress={() => handlePaymentPress(item)}
                          />
                        )}
                      {item.status !== 'pending' && (
                        <ThemeButton
                          title={'Rate Service'}
                          variant={'outlined'}
                          onPress={() => handleRatingClick(item)}
                        />
                      )}
                    </View>
                  </View>
                }
              />
            </Animated.View>
          )}
        />
      </Suspense>
    </View>
  );
};

export default HireHistory;
