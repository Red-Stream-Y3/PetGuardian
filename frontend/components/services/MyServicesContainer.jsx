import {
    Dimensions,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from "react-native";
import getThemeContext from "../../context/ThemeContext";
import { getAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { getMyHireRequests } from "../../services/ServiceproviderSerives";
import Animated from "react-native-reanimated";
import ImageItemCard from "../common/ImageItemCard";
import ThemeButton from "../common/ThemeButton";
import { CommonActions } from "@react-navigation/native";
import ThemeCard from "./../common/ThemeCard";

const MyServicesContainer = ({ navigation }) => {
    const { theme } = getThemeContext();
    const { user, setSelectedTab } = getAppContext();
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    const fetchMyHireRequests = async () => {
        try {
            const response = await getMyHireRequests(user._id, user.token);
            if (response) setHistory(response);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2:
                    error?.response?.data?.message || //axios error
                    error.message || //js error
                    "Could not get hire history", //default
            });
        }
    };

    const handleRefresh = async () => {
        setLoading(true);
        await fetchMyHireRequests();
        setLoading(false);
    };

    const handleEditClick = () => {
        //
    };

    const handleAcceptClick = (item) => {};

    const setSelected = (item) => {};

    const setShowSelected = (value) => {};

    useEffect(() => {
        handleRefresh();
    }, []);

    const handleGoToMyPageClick = () => {
        setSelectedTab(0);

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: "Home",
                        state: {
                            routes: [
                                {
                                    name: "SERVICES",
                                    state: {
                                        routes: [
                                            {
                                                name: "Services",
                                            },
                                            {
                                                name: "ServiceDetails",
                                                params: {
                                                    service: {
                                                        _id: user._id,
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            })
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            width: "100%",
            backgroundColor: theme.colors.background,
        },
        textTitle: {
            fontSize: 16,
            fontWeight: "bold",
            color: theme.colors.text,
            marginBottom: 5,
            marginStart: 30,
            alignSelf: "flex-start",
        },
        textSubtitle: {
            fontSize: 14,
            fontWeight: "bold",
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
            fontWeight: "bold",
            color: theme.colors.servicesPrimary,
        },
        titleContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 10,
        },
        itemContainer: {
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
        },
        emptyMessage: {
            marginTop: Dimensions.get("window").height / 3,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
        },
    });

    return (
        <View style={styles.container}>
            <ThemeCard>
                <View style={styles.titleContainer}>
                    <ThemeButton
                        title={"Go to my page"}
                        onPress={handleGoToMyPageClick}
                    />
                    <ThemeButton
                        title={"Edit my services"}
                        onPress={handleEditClick}
                    />
                </View>
            </ThemeCard>

            <Text style={styles.textTitle}>My Hire Requests</Text>
            <FlatList
                data={history}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={handleRefresh}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.emptyMessage}>
                        <Text style={styles.textBody}>No History Found</Text>
                    </View>
                }
                keyExtractor={(item) => item._id}
                style={{ width: "100%" }}
                renderItem={({ item, i }) => (
                    <Animated.View style={styles.itemContainer}>
                        <ImageItemCard
                            style={"side"}
                            index={i}
                            onClick={() => {
                                setSelected(item);
                                setShowSelected(true);
                            }}
                            uri={
                                item.user.profilePic ||
                                "https://cdn.wallpapersafari.com/9/81/yaqGvs.jpg"
                            }
                            body={
                                <View>
                                    <Text style={styles.textTitle}>
                                        {item.user.firstName}{" "}
                                        {item.user.lastName}
                                    </Text>
                                    <Text style={styles.textBody}>
                                        {new Date(
                                            item.startDate
                                        ).toLocaleDateString()}{" "}
                                        {item.oneDay
                                            ? ""
                                            : ` to ${new Date(
                                                  item.endDate
                                              ).toLocaleDateString()}`}
                                    </Text>
                                    <Text style={styles.textBody}>
                                        {new Date(
                                            item.startTime
                                        ).toLocaleTimeString()}{" "}
                                        {` to ${new Date(
                                            item.endTime
                                        ).toLocaleTimeString()}`}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginTop: 5,
                                        }}>
                                        <Text style={styles.textHighlight}>
                                            STATUS :{" "}
                                        </Text>
                                        <Text style={styles.textHighlightBold}>
                                            {item.status}
                                        </Text>
                                    </View>

                                    {item.status !== "pending" && (
                                        <ThemeButton
                                            title={"Accept"}
                                            onPress={() =>
                                                handleAcceptClick(item)
                                            }
                                        />
                                    )}
                                </View>
                            }
                        />
                    </Animated.View>
                )}
            />
        </View>
    );
};

export default MyServicesContainer;
