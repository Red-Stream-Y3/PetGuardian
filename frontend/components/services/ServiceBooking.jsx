import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import ThemebackButton from '../common/ThemeBackButton';
import { useState } from 'react';
import ThemeChipList from '../common/ThemeChipList';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getAppContext } from '../../context/AppContext';
import ThemeButton from '../common/ThemeButton';
import { Ionicons } from '@expo/vector-icons';
import OneTimeBooking from './OneTimeBooking';
import Animated, {
    FadeInDown,
    FadeOutDown,
    SlideInLeft,
    SlideInRight,
    SlideOutLeft,
    SlideOutRight,
} from 'react-native-reanimated';
import DailyBooking from './DailyBooking';
import WeeklyBooking from './WeeklyBooking';
import Toast from 'react-native-toast-message';
import { checkBookingTimeAvailability, createServiceBooking } from '../../services/ServiceproviderSerives';

const BOOKING_TYPES = ['ONE_TIME', 'DAILY', 'WEEKLY'];

const ServiceBooking = ({ navigation, route }) => {
    const { theme } = getThemeContext();
    const { service } = route.params;
    const { user } = getAppContext();
    const [loading, setLoading] = useState(false);
    const [bookingType, setBookingType] = useState(BOOKING_TYPES[0]);
    const [prevType, setPrevType] = useState(BOOKING_TYPES[0]); //for animation [0,1,2]
    const [allDay, setAllDay] = useState(false);
    const [continuous, setContinuous] = useState(false); //for daily booking [0,1
    const [oneDay, setOneDay] = useState(false);
    const [datePicker, setDatePicker] = useState({
        show: false,
        mode: 'date',
        date: new Date(Date.now()),
        inputCallback: () => {},
    });

    //input data
    const [input, setInput] = useState({
        startDateTime: new Date(Date.now()),
        endDateTime: new Date(Date.now()),
        pets: [],
        paymentMethod: 'credit',
        notes: '',
        days: new Array(7).fill(false),
    });

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
        },
        textTitle: {
            color: theme.colors.text,
            fontSize: 20,
            fontWeight: 'bold',
        },
        textH1: {
            color: theme.colors.text,
            fontSize: 18,
            fontWeight: 'bold',
        },
        textBody: {
            color: theme.colors.text,
            fontSize: 14,
            fontWeight: 'normal',
        },
    });

    const chipOnPress = (index) => {
        setPrevType(bookingType);
        setBookingType(BOOKING_TYPES[index]);
    };

    const chipList = [
        {
            text: 'One Time',
            onClick: () => chipOnPress(0),
        },
        {
            text: 'Daily',
            onClick: () => chipOnPress(1),
        },
        {
            text: 'Weekly',
            onClick: () => chipOnPress(2),
        },
    ];

    const handleHirePress = async () => {
        setLoading(true);
        //calculate fees
        const fee = service.services.fees.find((fee) => fee.tag === bookingType).price;
        const totalFee = calculateFees(input, bookingType, allDay, fee, continuous, oneDay);

        const reqData = {
            user: user._id,
            serviceProvider: service._id,
            involvedPets: [], //TODO: input.pets.map((pet) => pet._id),
            startDate: input.startDateTime.toISOString().split('T')[0],
            endDate: input.endDateTime.toISOString().split('T')[0],
            startTime: allDay
                ? new Date(input.startDateTime.toISOString().split('T')[0] + ' 12:00:00').toISOString().split('T')[1]
                : input.startDateTime.toISOString().split('T')[1],
            endTime: allDay
                ? new Date(input.startDateTime.toISOString().split('T')[0] + ' 23:59:59').toISOString().split('T')[1]
                : input.endDateTime.toISOString().split('T')[1],
            daily: bookingType === BOOKING_TYPES[1],
            weekly: bookingType === BOOKING_TYPES[2],
            days: input.days,
            oneDay: oneDay,
            continuous: continuous,
            totalFee: totalFee,
            notes: input.notes,
            paymentMethod: input.paymentMethod,
        };

        try {
            //check if booking time is available
            const checkResponse = await checkBookingTimeAvailability(reqData, user.token);

            if (checkResponse?.length > 0) {
                setLoading(false);
                Toast.show({
                    type: 'error',
                    text1: 'Booking time not available',
                    text2: 'Please choose another time',
                });
                return;
            }
            //add booking
            const response = await createServiceBooking(reqData, user.token);

            setLoading(false);

            if (response) {
                navigation.reset({
                    index: 0,
                    routes: [
                        { name: 'Services' },
                        {
                            name: 'ServiceDetails',
                            params: {
                                service: service,
                            },
                        },
                    ],
                });
                navigation.getParent().getParent().jumpTo('Hire History');
                // response.data.message;
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response.data.error || 'Could not hire service',
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2:
                    error.response?.data?.message || //axios error
                    error.message || //js error
                    'Could not hire service', //default
            });
            setLoading(false);
        }
    };

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: theme.colors.background,
            }}
        >
            <ThemebackButton navigation={navigation} />

            <Text style={styles.textTitle}>
                {'Hire '}
                {service?.firstName}
            </Text>

            <View style={{ marginVertical: 5 }}>
                <ThemeChipList data={chipList} />
            </View>

            <ScrollView
                style={{
                    flex: 1,
                    width: '100%',
                }}
                contentContainerStyle={{
                    alignItems: 'center',
                }}
            >
                {bookingType === BOOKING_TYPES[0] && (
                    <Animated.View entering={SlideInLeft} exiting={SlideOutLeft}>
                        <OneTimeBooking
                            styles={styles}
                            setDatePicker={setDatePicker}
                            input={input}
                            setInput={setInput}
                            oneDay={oneDay}
                            setOneDay={setOneDay}
                            allDay={allDay}
                            setAllDay={setAllDay}
                            theme={theme}
                        />
                    </Animated.View>
                )}

                {bookingType === BOOKING_TYPES[1] && (
                    <Animated.View
                        entering={prevType === BOOKING_TYPES[2] ? SlideInLeft : SlideInRight}
                        exiting={prevType === BOOKING_TYPES[0] ? SlideOutLeft : SlideOutRight}
                    >
                        <DailyBooking
                            styles={styles}
                            setDatePicker={setDatePicker}
                            input={input}
                            setInput={setInput}
                            oneDay={continuous}
                            setOneDay={setContinuous}
                            allDay={allDay}
                            setAllDay={setAllDay}
                            theme={theme}
                        />
                    </Animated.View>
                )}

                {bookingType === BOOKING_TYPES[2] && (
                    <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
                        <WeeklyBooking
                            styles={styles}
                            setDatePicker={setDatePicker}
                            input={input}
                            setInput={setInput}
                            allDay={allDay}
                            setAllDay={setAllDay}
                            theme={theme}
                        />
                    </Animated.View>
                )}
            </ScrollView>

            <Animated.View
                entering={FadeInDown}
                exiting={FadeOutDown}
                style={{ marginBottom: 10 }}>
                <Text style={styles.textBody}>
                    Total Fee:{" "}
                    <Text style={{ fontWeight: "bold" }}>
                        {calculateFees(
                            input,
                            bookingType,
                            allDay,
                            service.services.fees.find(
                                (fee) => fee.tag === bookingType
                            ).price,
                            continuous,
                            oneDay
                        )}
                        {continuous ? " Rs/day" : " Rupees"}
                    </Text>
                </Text>
                <ThemeButton
                    title={loading ? null : "Hire"}
                    textSize={16}
                    onPress={handleHirePress}>
                    {loading ? (
                        <ActivityIndicator size={24} color={theme.colors.primaryIcon} />
                    ) : (
                        <Ionicons name="add-circle-outline" size={24} color={theme.colors.primaryIcon} />
                    )}
                </ThemeButton>
            </Animated.View>

            <DateTimePickerModal
                isVisible={datePicker.show}
                mode={datePicker.mode}
                themeVariant={theme.mode}
                onConfirm={(date) => {
                    datePicker.inputCallback(date);
                    setDatePicker({ ...datePicker, show: false });
                }}
                date={datePicker.date}
                onCancel={() => setDatePicker({ ...datePicker, show: false })}
            />
        </View>
    );
};

export default ServiceBooking;

const calculateFees = (input, bookingType, allDay, fee, continuous, oneDay) => {
    let totalFee;
    let oneDayTime = new Date(
        input.startDateTime.toISOString().split('T')[0] + 'T' + input.endDateTime.toISOString().split('T')[1],
    );

    let sameDayTimeDifference = (oneDayTime - input.startDateTime) / 3600000;
    let timeRangeDateDifference =
        Math.floor(
            (new Date(input.endDateTime.toISOString().split('T')[0]) -
                new Date(input.startDateTime.toISOString().split('T')[0])) /
                86400000,
        ) + 1;

    if (bookingType === BOOKING_TYPES[2]) {
        let numDays = input.days.filter((day) => day).length;
        if (allDay) {
            totalFee = numDays * 24 * fee;
        } else {
            totalFee = numDays * ((oneDayTime - input.startDateTime) / 3600000) * fee;
        }
    } else if (bookingType === BOOKING_TYPES[1]) {
        if (allDay) {
            if (continuous) {
                totalFee = fee * 24;
            } else {
                totalFee = timeRangeDateDifference * 24 * fee;
            }
        } else {
            if (continuous) {
                totalFee = fee * sameDayTimeDifference;
            } else {
                totalFee = timeRangeDateDifference * sameDayTimeDifference * fee;
            }
        }
    } else {
        if (allDay) {
            if (oneDay) {
                totalFee = fee * 24;
            } else {
                totalFee = fee * 24 * timeRangeDateDifference;
            }
        } else {
            if (oneDay) {
                totalFee = fee * sameDayTimeDifference;
            } else {
                totalFee = fee * sameDayTimeDifference * timeRangeDateDifference;
            }
        }
    }

    return totalFee;
};
