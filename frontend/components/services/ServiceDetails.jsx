import { ActivityIndicator, Dimensions, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { getAppContext } from '../../context/AppContext';
import getThemeContext from '../../context/ThemeContext';
import { useEffect, useState } from 'react';
import ThemeChip from '../common/ThemeChip';
import ThemeButton from '../common/ThemeButton';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ThemebackButton from '../common/ThemeBackButton';
import { getServiceProviderById, getServiceRating } from '../../services/ServiceproviderSerives';
import Toast from 'react-native-toast-message';

const ServiceDetails = ({ navigation, route }) => {
    const { user } = getAppContext();
    const { theme } = getThemeContext();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showRating, setShowRating] = useState(false);
    const [rating, setRating] = useState(null);

    const { service } = route.params;

    const getServiceDetails = async () => {
        setLoading(true);
        try {
            const result = await getServiceProviderById(service._id, user.token);
            setDetails(result);
            setLoading(false);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2:
                    error?.response?.data?.message || //axios error
                    error.message || //js error
                    'Could not get service provider', //default
            });
        }
    };

    const fetchRating = async () => {
        setShowRating(false);
        try {
            const result = await getServiceRating(service._id, user.token);

            if (result) setRating(result);
            setShowRating(true);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2:
                    error?.response?.data?.message || //axios error
                    error.message || //js error
                    'Could not get service provider', //default
            });
            setShowRating(true);
        }
    };

    const handleRefresh = async () => {
        await getServiceDetails();
        await fetchRating();
    };

    useEffect(() => {
        if (!details?._id || !rating?.averageRating) handleRefresh();
    }, []);

    const handleBookingPress = () => {
        navigation.navigate('Booking', { service: details });
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        scrollViewStyle: {
            width: '100%',
            flex: 1,
        },
        imageStyle: {
            width: '100%',
            height: Dimensions.get('window').height / 4,
            position: 'relative',
            marginBottom: 10,
        },
        textContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderWidth: 1,
            borderRadius: 10,
        },
        H1: {
            fontSize: 16,
            color: theme.colors.text,
        },
        descriptionContainer: {
            position: 'relative',
            width: '100%',
            minHeight: (Dimensions.get('window').height * 3) / 4,
            backgroundColor: theme.colors.surface,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            paddingHorizontal: 15,
            elevation: 5,
        },
        titleContainer: {
            flexDirection: 'row',
            paddingVertical: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        titleText: {
            color: theme.colors.text,
            fontSize: 20,
            fontWeight: 'bold',
        },
        subtitleText: {
            color: theme.colors.text,
            fontSize: 14,
            fontWeight: 'bold',
        },
        ratingContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        text: {
            color: theme.colors.text,
        },
        flexRow: {
            flexDirection: 'row',
        },
        marginVertical10: {
            marginVertical: 10,
        },
        multiLineTextContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: theme.colors.servicesPrimary,
        },
        multiLineText: {
            color: theme.colors.text,
            fontSize: 16,
            marginVertical: 10,
        },
        multiLineTextBold: {
            color: theme.colors.text,
            fontSize: 14,
            fontWeight: 'bold',
            marginVertical: 10,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
        },
        flexRowFee: {
            flexDirection: "row",
            flexWrap: "wrap",
        },
    });

    return (
        <View style={styles.container}>
            <ThemebackButton navigation={navigation} />

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={handleRefresh}
                        colors={[theme.colors.servicesPrimary]}
                    />
                }
                style={styles.scrollViewStyle}
            >
                <Animated.Image
                    style={styles.imageStyle}
                    source={{
                        uri:
                            service?.profilePic ||
                            "https://wallpapercave.com/wp/wp4928162.jpg",
                    }}
                    sharedTransitionTag={service?._id}
                />

                <Animated.View style={styles.descriptionContainer} entering={FadeInDown.delay(600).springify()}>
                    <View style={styles.titleContainer}>
                        <View>
                            <Text style={styles.titleText}>{details?.firstName + ' ' + details?.lastName}</Text>
                            <Text style={styles.subtitleText}>
                                {'Available in : '}
                                {details?.services?.activeCities.map((item) => item).join(', ')}
                            </Text>
                        </View>
                        <View>
                            {showRating && (
                                <Animated.View entering={FadeInLeft}>
                                    <View style={styles.ratingContainer}>
                                        <Ionicons name="paw" size={24} color={theme.colors.servicesPrimary} />
                                        <Text style={styles.text}>{rating?.averageRating}</Text>
                                    </View>
                                    <Text style={{ color: theme.colors.text }}>{rating?.count || 'No'} Ratings</Text>
                                </Animated.View>
                            )}
                        </View>
                    </View>

                    {loading ? (
                        <ActivityIndicator color={theme.colors.servicesPrimary} />
                    ) : (
                        <>
                            <View style={styles.marginVertical10}>
                                <Text style={styles.H1}>SERVICES</Text>
                                <View style={styles.flexRow}>
                                    {details?.services?.serviceTypes.map((item, i) => (
                                        <ThemeChip key={i} text={item} />
                                    ))}
                                </View>
                            </View>

                            <View style={styles.marginVertical10}>
                                <Text style={styles.H1}>I ACCEPT</Text>
                                <View style={styles.flexRow}>
                                    {details?.services?.petTypes.map((item, i) => (
                                        <ThemeChip key={i} text={item} />
                                    ))}
                                </View>
                            </View>

                            <View style={styles.marginVertical10}>
                                <Text style={styles.H1}>WORKING DAYS</Text>
                                <View style={styles.flexRow}>
                                    {details?.services?.workDays.map(
                                        (item, i) =>
                                            item !== null && (
                                                <ThemeChip
                                                    key={i}
                                                    text={item}
                                                />
                                            )
                                    )}
                                </View>
                            </View>

                            <View style={styles.marginVertical10}>
                                <Text style={styles.H1}>MY RATES</Text>
                                <View style={styles.flexRowFee}>
                                    {details?.services?.fees.map((item, i) => (
                                        <ThemeChip
                                            key={i}
                                            text={
                                                String(item.tag).substring(
                                                    0,
                                                    1
                                                ) +
                                                String(item.tag)
                                                    .substring(1)
                                                    .toLocaleLowerCase()
                                                    .replace("_", " ") +
                                                " " +
                                                item.price +
                                                " Rs/hr"
                                            }
                                        />
                                    ))}
                                </View>
                            </View>

                            <View style={styles.marginVertical10}>
                                <Text style={styles.H1}>ABOUT ME</Text>
                                <View style={styles.multiLineTextContainer}>
                                    <Text style={styles.multiLineText}>{details?.services?.description}</Text>
                                </View>
                            </View>

                            <View style={styles.multiLineTextContainer}>
                                <Text style={styles.multiLineTextBold}>
                                    {'Contact: '}
                                    {details?.services?.businessPhone?.map((item) => item)?.join(', ')}
                                </Text>
                            </View>
                        </>
                    )}

                    <View style={styles.buttonContainer}>
                        <ThemeButton textSize={16} title="Book Now" onPress={handleBookingPress} />
                        <ThemeButton>
                            <Entypo name="calendar" size={24} color={theme.colors.primaryIcon} />
                        </ThemeButton>
                    </View>
                </Animated.View>
            </ScrollView>
        </View>
    );
};

export default ServiceDetails;