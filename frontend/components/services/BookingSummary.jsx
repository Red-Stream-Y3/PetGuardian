import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, ActivityIndicator } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import ThemeButton from '../common/ThemeButton';
import ThemeChip from '../common/ThemeChip';
import { getAppContext } from '../../context/AppContext';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getBookingById } from '../../services/ServiceproviderSerives';
import Toast from 'react-native-toast-message';

const BookingSummary = ({ booking, closeActionCallback, actionTitle, actionCallback }) => {
    const { theme } = getThemeContext();
    const { user } = getAppContext();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getBookingById(booking._id, user.token);

            if (response) {
                setData(response);
            }
            setLoading(false);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2:
                    error?.response?.data?.message || //axios error
                    error.message || //js error
                    'Could not get booking details', //default
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [booking]);

    const styles = StyleSheet.create({
        title: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.colors.text,
            marginBottom: 10,
            marginTop: 10,
        },
        subtitle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: theme.colors.text,
        },
        body: {
            fontSize: 14,
            color: theme.colors.text,
        },
        highlight: {
            fontSize: 18,
            color: theme.colors.servicesPrimary,
        },
        highlightBold: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.colors.servicesPrimary,
        },
        container: {
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            backgroundColor: theme.colors.surface,
            width: Dimensions.get('window').width * 0.8,
        },
        actionContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: 15,
            width: '100%',
        },
        textContainerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 5,
        },
        textContainer: {
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 5,
        },
    });

    const handleActionPress = async () => {
        setSubmitting(true);
        await actionCallback();
        setSubmitting(false);
    };

    return (
        <>
            {loading ? (
                <ActivityIndicator color={theme.colors.text} size={40} />
            ) : (
                <Animated.View entering={FadeInDown} style={styles.container}>
                    <Text style={styles.title}>Booking Summary</Text>
                    <Text style={styles.subtitle}>
                        {booking?.serviceProvider &&
                            `Booking for ${booking?.serviceProvider?.firstName} ${booking?.serviceProvider?.lastName}`}
                        {booking?.user &&
                            `Booking made by ${booking?.user?.firstName} ${booking?.user?.lastName}`}
                    </Text>

                    <View style={styles.textContainer}>
                        <Text style={styles.body}>
                            {new Date(booking.startDate).toLocaleDateString()}{' '}
                            {data?.oneDay ? '' : ` to ${new Date(booking.endDate).toLocaleDateString()}`}
                        </Text>
                        <Text style={styles.body}>
                            {new Date(booking.startTime).toLocaleTimeString()}{' '}
                            {` to ${new Date(booking.endTime).toLocaleTimeString()}`}
                        </Text>
                    </View>

                    <View
                        style={{
                            ...styles.textContainer,
                            flexDirection: 'row',
                        }}
                    >
                        <Text style={styles.subtitle}>Pets </Text>
                        {data?.involvedPets?.map((pet, index) => (
                            <ThemeChip key={index} text={pet.name} />
                        ))}
                    </View>

                    <Text style={styles.subtitle}>
                        Total Fee : {data?.totalFee}
                        {data?.continuous ? " Rs/day" : " Rupees"}
                    </Text>
                    <Text style={styles.subtitle}>
                        Payment : {data?.paymentStatus}
                    </Text>

                    <View style={styles.textContainerRow}>
                        <Text style={styles.highlight}>STATUS : </Text>
                        <Text style={styles.highlightBold}>{booking.status}</Text>
                    </View>

                    <View style={styles.actionContainer}>
                        <ThemeButton
                            variant={"clear"}
                            title={"Close"}
                            onPress={closeActionCallback}
                        />
                        {booking.status === "pending" &&
                            booking.user === null && (
                                <ThemeButton
                                    title={submitting ? "" : actionTitle}
                                    onPress={handleActionPress}>
                                    {submitting && (
                                        <ActivityIndicator
                                            color={theme.colors.primaryText}
                                            size={20}
                                        />
                                    )}
                                </ThemeButton>
                            )}
                    </View>
                </Animated.View>
            )}
        </>
    );
};

export default BookingSummary;