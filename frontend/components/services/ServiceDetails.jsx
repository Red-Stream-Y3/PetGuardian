import axios from "axios";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { getAppContext } from "../../context/AppContext";
import getThemeContext from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import ThemeChip from "../common/ThemeChip";
import ThemeButton from "../common/ThemeButton";
import { Entypo } from '@expo/vector-icons';
import ThemebackButton from "../common/ThemeBackButton";

const ServiceDetails = ({ navigation, route }) => {
    const { SERVER_URL } = getAppContext();
    const { theme } = getThemeContext();
    const [details, setDetails] = useState(null);

    const { service } = route.params;

    const getServiceDetails = async () => {
        const result = await axios.get(
            `${SERVER_URL}/api/v1/services/${service._id}`
        );
        setDetails(result.data[0]);
    };

    useEffect(() => {
        if (!details?._id) getServiceDetails();
    }, []);

    return (
        <View style={{ flex: 1 }}>

            <ThemebackButton navigation={navigation} />

            <Animated.Image
                style={{
                    width: "100%",
                    height: "30%",
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
                    flex: 1,
                    position: "relative",
                    width: "100%",
                    backgroundColor: theme.colors.surface,
                    borderTopEndRadius: 20,
                    borderTopStartRadius: 20,
                    elevation: 5,
                }}
                entering={FadeInDown.delay(600).springify()}>
                <ScrollView 
                    contentContainerStyle={{
                        paddingBottom: 10,
                    }}
                    style={{
                        paddingHorizontal: 15,
                    }} >
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
                            <Text>Rating</Text>
                        </View>
                    </View>

                    <View style={{ marginVertical:10 }}>
                        <Text style={styles.title}>SERVICES</Text>
                        <View style={{ flexDirection: "row" }}>
                            {details?.services?.serviceTypes.map((item, i) => (
                                <ThemeChip key={i} text={item} />
                            ))}
                        </View>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={styles.title}>I ACCEPT</Text>
                        <View style={{ flexDirection: "row" }}>
                            {details?.services?.petTypes.map((item, i) => (
                                <ThemeChip key={i} text={item} />
                            ))}
                        </View>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={styles.title}>WORKING DAYS</Text>
                        <View style={{ flexDirection: "row" }}>
                            {details?.services?.workDays.map((item, i) => (
                                <ThemeChip key={i} text={item} />
                            ))}
                        </View>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={styles.title}>MY RATES</Text>
                        <View style={{ flexDirection: "row" }}>
                            {details?.services?.fees.map((item, i) => (
                                <ThemeChip
                                    key={i}
                                    text={item.tag + " " + item.price + "$/hr"}
                                />
                            ))}
                        </View>
                    </View>
                    
                    <View style={{ marginVertical: 10 }}>
                        <Text style={styles.title}>ABOUT ME</Text>
                        <View
                            style={{
                                ...styles.textContainer,
                                borderColor: theme.colors.servicesPrimary,
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
                            {details?.services?.businessPhone?.map(item=>item)?.join(", ")}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                        }}>
                        <ThemeButton title="Book Now" />
                        <ThemeButton>
                            <Entypo
                                name="calendar"
                                size={24}
                                color={theme.colors.primaryIcon}
                            />
                        </ThemeButton>
                    </View>
                </ScrollView>
            </Animated.View>
        </View>
    );
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
    },
});

export default ServiceDetails;
