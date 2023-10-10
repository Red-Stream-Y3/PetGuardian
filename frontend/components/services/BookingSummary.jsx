import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, ActivityIndicator } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import ThemeButton from '../common/ThemeButton';
import ThemeChip from '../common/ThemeChip';
import axios from 'axios';
import { getAppContext } from '../../context/AppContext';
import Animated, { FadeInDown } from 'react-native-reanimated';

const BookingSummary = ({ booking, closeActionCallback, actionTitle, actionCallback }) => {

    const { theme } = getThemeContext();
    const { SERVER_URL } = getAppContext();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${SERVER_URL}/api/v1/services/hire/getbyid/${booking._id}`);

            if (response.data) {
                setData(response.data[0]);
                setLoading(false);
            }

        } catch (error) {
            console.error(error);
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
        setLoading(true);
        await actionCallback();
        setLoading(false);
    };

    return (<>
        {loading ? <ActivityIndicator color={theme.colors.text} size={40} /> : <Animated.View entering={FadeInDown} style={styles.container}>
            <Text style={styles.title}>Booking Summary</Text>
            <Text
                style={
                    styles.subtitle
                }>{`Booking for ${booking?.serviceProvider?.firstName} ${booking?.serviceProvider?.lastName}`}</Text>

            <View style={styles.textContainer}>
                <Text style={styles.body}>
                    {new Date(booking.startDate).toLocaleDateString()}{" "}
                    {data?.oneDay
                        ? ""
                        : ` to ${new Date(
                              booking.endDate
                          ).toLocaleDateString()}`}
                </Text>
                <Text style={styles.body}>
                    {new Date(booking.startTime).toLocaleTimeString()}{" "}
                    {` to ${new Date(booking.endTime).toLocaleTimeString()}`}
                </Text>
            </View>

            <View style={{...styles.textContainer, flexDirection:'row'}}>
                <Text style={styles.subtitle}>Pets </Text>
                {data?.involvedPets?.map((pet, index) => (
                    <ThemeChip key={index} text={pet.name} />
                ))}
            </View>

            <Text style={styles.subtitle}>Total Fee : {data?.totalFee} {data?.continuous ? '$/day' : '$'}</Text>

            <View style={styles.textContainerRow}>
                <Text style={styles.highlight}>STATUS : </Text>
                <Text style={styles.highlightBold}>{booking.status}</Text>
            </View>

            {/* <ThemeButton
                title={"View Details"}
                onPress={() => {
                    console.log(data);
                }}
            /> */}
            <View style={styles.actionContainer}>
                <ThemeButton
                    variant={"clear"}
                    title={"Close"}
                    onPress={closeActionCallback}
                />
                {booking.status === "pending" && (
                    <ThemeButton title={actionTitle} onPress={handleActionPress} />
                )}
            </View>
        </Animated.View>}</>
    );
};

export default BookingSummary;
