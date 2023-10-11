import axios from "axios";
import {
    ActivityIndicator,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Animated, { FadeInDown, FadeInLeft } from "react-native-reanimated";
import { getAppContext } from "../../context/AppContext";
import getThemeContext from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import ThemeChip from "../common/ThemeChip";
import ThemeButton from "../common/ThemeButton";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import ThemebackButton from "../common/ThemeBackButton";

const ServiceDetails = ({ navigation, route }) => {
    const { SERVER_URL } = getAppContext();
    const { theme } = getThemeContext();
    const [ details, setDetails ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ showRating, setShowRating] = useState(false);
    const [ rating, setRating ] = useState(null);

    const { service } = route.params;

    const getServiceDetails = async () => {
        setLoading(true);
        const result = await axios.get(
            `${SERVER_URL}/api/v1/services/${service._id}`
        );
        setDetails(result.data[0]);
        setLoading(false);
    };

    const fetchRating = async () => {
        setShowRating(false);
        try {
            const result = await axios.get(
                `${SERVER_URL}/api/v1/ratings/${service._id}`
            );

            if (result.data && result.data.length > 0) setRating(result.data[0]);
            setShowRating(true);
        } catch (error) {
            console.error(error);
            setShowRating(true);
        }
    };

    useEffect(() => {
        if (!details?._id) getServiceDetails();
        if (!rating?.averageRating) fetchRating();
    }, []);

    const handleBookingPress = () => {
        navigation.navigate("Booking", { service: details });
    };

    const styles = StyleSheet.create({
        textContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
            borderWidth: 1,
            borderRadius: 10,
        },
        title: {
            fontSize: 16,
            color: theme.colors.text,
        },
    });

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ThemebackButton navigation={navigation} />

            <ScrollView style={{ width: "100%", flex: 1 }}>
                <Animated.Image
                    style={{
                        width: "100%",
                        height: Dimensions.get("window").height / 4,
                        position: "relative",
                        marginBottom: 10,
                    }}
                    source={{
                        uri:
                            service?.image ||
                            "https://wallpapercave.com/wp/wp4928162.jpg",
                    }}
                    sharedTransitionTag={service?._id}
                />

                <Animated.View
                    style={{
                        position: "relative",
                        width: "100%",
                        minHeight: (Dimensions.get("window").height * 3) / 4,
                        backgroundColor: theme.colors.surface,
                        borderTopEndRadius: 20,
                        borderTopStartRadius: 20,
                        paddingHorizontal: 15,
                        elevation: 5,
                    }}
                    entering={FadeInDown.delay(600).springify()}>
                    {/* <View
                    style={{
                        paddingHorizontal: 15,
                    }} > */}
                    <View
                        style={{
                            flexDirection: "row",
                            paddingVertical: 10,
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                        <View>
                            <Text
                                style={{
                                    color: theme.colors.text,
                                    fontSize: 20,
                                    fontWeight: "bold",
                                }}>
                                {details?.firstName + " " + details?.lastName}
                            </Text>
                            <Text
                                style={{
                                    color: theme.colors.text,
                                    fontSize: 14,
                                    fontWeight: "bold",
                                }}>
                                {"Available in : "}
                                {details?.services?.activeCities
                                    .map((item) => item)
                                    .join(", ")}
                            </Text>
                        </View>
                        <View>
                            {showRating && (
                                <Animated.View entering={FadeInLeft}>
                                    <View style={{ flexDirection: "row", justifyContent:'flex-end' }}>
                                        <Ionicons
                                            name="paw"
                                            size={24}
                                            color={theme.colors.servicesPrimary}
                                        />
                                        <Text
                                            style={{
                                                color: theme.colors.text,
                                            }}>
                                            {rating?.averageRating}
                                        </Text>
                                    </View>
                                    <Text style={{ color: theme.colors.text }}>
                                        {rating?.count || 'No'} Ratings
                                    </Text>
                                </Animated.View>
                            )}
                        </View>
                    </View>

                    {loading ? (
                        <ActivityIndicator
                            color={theme.colors.servicesPrimary}
                        />
                    ) : (
                        <>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.title}>SERVICES</Text>
                                <View style={{ flexDirection: "row" }}>
                                    {details?.services?.serviceTypes.map(
                                        (item, i) => (
                                            <ThemeChip key={i} text={item} />
                                        )
                                    )}
                                </View>
                            </View>

                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.title}>I ACCEPT</Text>
                                <View style={{ flexDirection: "row" }}>
                                    {details?.services?.petTypes.map(
                                        (item, i) => (
                                            <ThemeChip key={i} text={item} />
                                        )
                                    )}
                                </View>
                            </View>

                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.title}>WORKING DAYS</Text>
                                <View style={{ flexDirection: "row" }}>
                                    {details?.services?.workDays.map(
                                        (item, i) => (
                                            <ThemeChip key={i} text={item} />
                                        )
                                    )}
                                </View>
                            </View>

                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.title}>MY RATES</Text>
                                <View style={{ flexDirection: "row" }}>
                                    {details?.services?.fees.map((item, i) => (
                                        <ThemeChip
                                            key={i}
                                            text={
                                                item.tag +
                                                " " +
                                                item.price +
                                                "$/hr"
                                            }
                                        />
                                    ))}
                                </View>
                            </View>

                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.title}>ABOUT ME</Text>
                                <View
                                    style={{
                                        ...styles.textContainer,
                                        borderColor:
                                            theme.colors.servicesPrimary,
                                    }}>
                                    <Text
                                        style={{
                                            color: theme.colors.text,
                                            fontSize: 16,
                                            marginVertical: 10,
                                        }}>
                                        {details?.services?.description}
                                    </Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    ...styles.textContainer,
                                    borderColor: theme.colors.servicesPrimary,
                                }}>
                                <Text
                                    style={{
                                        color: theme.colors.text,
                                        fontSize: 14,
                                        fontWeight: "bold",
                                        marginVertical: 10,
                                    }}>
                                    {"Contact: "}
                                    {/* {details?.services?.businessPhone} */}
                                    {details?.services?.businessPhone
                                        ?.map((item) => item)
                                        ?.join(", ")}
                                </Text>
                            </View>
                        </>
                    )}

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginTop: 15,
                        }}>
                        <ThemeButton
                            textSize={16}
                            title="Book Now"
                            onPress={handleBookingPress}
                        />
                        <ThemeButton>
                            <Entypo
                                name="calendar"
                                size={24}
                                color={theme.colors.primaryIcon}
                            />
                        </ThemeButton>
                    </View>
                    {/* </View> */}
                </Animated.View>
            </ScrollView>
        </View>
    );
};

export default ServiceDetails;
