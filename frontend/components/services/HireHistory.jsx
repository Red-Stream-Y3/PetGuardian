import React, { Suspense, lazy, useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    RefreshControl,
    Dimensions,
} from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { getAppContext } from "../../context/AppContext";
import ImageItemCard from "../common/ImageItemCard";
import Animated from "react-native-reanimated";
import ThemeOverlay from "../common/ThemeOverlay";
import BookingSummary from "./BookingSummary";
import Toast from "react-native-toast-message";
import ThemeButton from "../common/ThemeButton";
import RateService from "./RateService";
import {
    cancelBooking,
    getUserBookings,
} from "../../services/ServiceproviderSerives";

const FlatList = lazy(() => import('react-native/Libraries/Lists/FlatList'));

const HireHistory = ({ navigation }) => {
    const { theme } = getThemeContext();
    const { user } = getAppContext();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSelected, setShowSelected] = useState(false);
    const [selected, setSelected] = useState(null);
    const [showRating, setShowRating] = useState(false);

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
            marginTop: Dimensions.get("window").height / 3,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
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

    return (
        <View style={styles.container}>
            <ThemeOverlay visible={showRating} onPressBg={() => setShowRating(false)}>
                <RateService provider={selected} handleClose={() => setShowRating(false)} />
            </ThemeOverlay>

            <ThemeOverlay visible={showSelected} onPressBg={() => setShowSelected(false)}>
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
                <Text style={styles.textTitle}>Hire History</Text>
            </View>

            <Suspense fallback={<ActivityIndicator />}>
                <FlatList
                    data={history}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={getHireHistory} />}
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
                                    item.serviceProvider.profilePic || 'https://cdn.wallpapersafari.com/9/81/yaqGvs.jpg'
                                }
                                body={
                                    <View>
                                        <Text style={styles.textTitle}>
                                            {item.serviceProvider.firstName} {item.serviceProvider.lastName}
                                        </Text>
                                        <Text style={styles.textBody}>
                                            {new Date(item.startDate).toLocaleDateString()}{' '}
                                            {item.oneDay ? '' : ` to ${new Date(item.endDate).toLocaleDateString()}`}
                                        </Text>
                                        <Text style={styles.textBody}>
                                            {new Date(item.startTime).toLocaleTimeString()}{' '}
                                            {` to ${new Date(item.endTime).toLocaleTimeString()}`}
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginTop: 5,
                                            }}
                                        >
                                            <Text style={styles.textHighlight}>STATUS : </Text>
                                            <Text style={styles.textHighlightBold}>{item.status}</Text>
                                        </View>

                                        {item.status !== 'pending' && (
                                            <ThemeButton
                                                title={'Rate Service'}
                                                onPress={() => handleRatingClick(item)}
                                            />
                                        )}
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
