import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import ThemeCard from '../common/ThemeCard';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useEffect, useState } from 'react';
import { getAppContext } from '../../context/AppContext';
import Toast from 'react-native-toast-message';
import { getMyHireRequests } from '../../services/ServiceproviderSerives';
import { RefreshControl } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

const ScheduleContainer = () => {
    const { theme } = getThemeContext();
    const { user, tabcolor } = getAppContext();
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [markedDates, setMarkedDates] = useState({});

    const getMarkedDates = (bookings) => {
        let markedDates = {};
        bookings.forEach((booking) => {
            markedDates[booking.startDate.split('T')[0]] = {
                marked: true,
            };
        });
        return markedDates;
    };

    const fetchHireRequests = async () => {
        try {
            setLoading(true);

            const response = await getMyHireRequests(user._id, user.token);

            if (response) {
                setBookings(response);
                setMarkedDates(getMarkedDates(response));
            }
            setLoading(false);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not get hire requests',
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHireRequests();
    }, []);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        contentContainer: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        card: {
            width: Dimensions.get('window').width * 0.8,
        },
        agendaItem: {
            alignItems: 'flex-start',
            padding: 10,
            borderStartWidth: 5,
        },
        text: {
            fontSize: 14,
            color: theme.colors.text,
        },
        subtitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.colors.text,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            color: theme.colors.text,
        },
    });

    const getListItems = (booking) => {
        return (
            <ThemeCard key={booking._id}>
                <View
                    style={[
                        styles.agendaItem,
                        {
                            borderStartColor:
                                booking.status === 'accepted'
                                    ? 'blue'
                                    : booking.status === 'rejected'
                                    ? 'red'
                                    : booking.status === 'pending'
                                    ? 'orange'
                                    : 'green',
                        },
                    ]}
                >
                    <Text style={styles.subtitle}>
                        {`${booking.user.firstName} ${booking.user.lastName}`}
                    </Text>
                    <Text style={styles.text}>
                        {booking.oneDay !== true
                            ? booking.continuous !== true
                                ? `${new Date(
                                      booking.startDate
                                  ).toLocaleDateString()} to ${new Date(
                                      booking.endDate
                                  ).toLocaleDateString()}`
                                : `${new Date(
                                      booking.startDate
                                  ).toLocaleDateString()} onwards`
                            : `on ${new Date(
                                  booking.startDate
                              ).toLocaleDateString()}`}
                    </Text>
                    <Text style={styles.text}>
                        {booking.allDay !== true
                            ? `${new Date(
                                  booking.startTime
                              ).toLocaleTimeString()} to ${new Date(
                                  booking.endTime
                              ).toLocaleTimeString()}`
                            : `All Day`}
                    </Text>
                </View>
            </ThemeCard>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>My Schedule</Text>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={fetchHireRequests}
                    />
                }
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <ThemeCard>
                    <View style={styles.card}>
                        <Calendar
                            onDayPress={(day) => {
                                setSelected(day.dateString);
                                setSelected(null);
                                setTimeout(() => {
                                    setSelected(day.dateString);
                                }, 500);
                            }}
                            firstDay={1}
                            enableSwipeMonths={true}
                            markedDates={{
                                ...markedDates,
                                [selected]: {
                                    selected: true,
                                    selectedColor: tabcolor,
                                },
                            }}
                            theme={{
                                backgroundColor: theme.colors.background,
                                calendarBackground: theme.colors.surface,
                                textSectionTitleColor: theme.colors.text,
                                dayTextColor: theme.colors.text,
                                monthTextColor: theme.colors.text,
                            }}
                            hideExtraDays={true}
                        />
                    </View>
                </ThemeCard>
                {selected !== null && (
                    <Animated.View entering={FadeInDown}>
                        {bookings.map((booking) => {
                            if (booking.startDate.split('T')[0] === selected) {
                                return getListItems(booking);
                            }
                        })}
                    </Animated.View>
                )}
            </ScrollView>
        </View>
    );
};

export default ScheduleContainer;
