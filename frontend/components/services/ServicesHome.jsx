import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Search from "../common/Search";
import getThemeContext from "../../context/ThemeContext";
import { getAppContext } from "../../context/AppContext";
import { Suspense, useState } from "react";
import axios from "axios";
import ImageItemCard from "../common/ImageItemCard";
import ThemeChip from "../common/ThemeChip";

const ServicesHome = ({ navigation }) => {
    const { theme } = getThemeContext();
    const { SERVER_URL } = getAppContext();
    const [providers, setProviders] = useState([]);

    const getProviders = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/v1/services`);
            setProviders(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useState(() => {
        if (providers.length === 0) getProviders();
    }, []);

    const chips = [
        {
            text: "All",
        },
        {
            text: "Walking",
        },
        {
            text: "Sitting",
        },
        {
            text: "Grooming",
        },
        {
            text: "Petting",
        },
    ];

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: theme.colors.background,
            }}>
            <Search />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {chips.map((chip, i) => (
                        <ThemeChip key={i} clickable text={chip.text} />
                    ))}
                </ScrollView>
            </View>
            <Suspense fallback={<ActivityIndicator />}>
                {/* <FlatList
                    data={providers}
                    style={{ width: "100%" }}
                    contentContainerStyle={{ alignItems: "center" }}
                    renderItem={(provider, i) => {
                        return (
                            <ImageItemCard
                                key={i}
                                index={i}
                                width={Dimensions.get("window").width * 0.9}
                                onClick={() => {
                                    navigation?.navigate("ServiceDetails", {
                                        service: provider.item,
                                    });
                                }}
                                uri={
                                    "https://wallpapercave.com/wp/wp4928162.jpg"
                                }
                                style="side"
                                animationTag={provider.item._id}
                                body={
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                fontWeight: "bold",
                                                color: theme.colors.text,
                                            }}>
                                            {provider.item.firstName}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: "bold",
                                                color: theme.colors.text,
                                            }}>
                                            {provider.item.services?.serviceTypes
                                                ?.map(
                                                    (serviceType) => serviceType
                                                )
                                                .join(", ")}
                                        </Text>
                                        <Text
                                            style={{
                                                marginTop: 5,
                                                color: theme.colors.text,
                                            }}>
                                            {provider.item.services?.activeCities
                                                ?.map((city) => city)
                                                .join(", ")}
                                        </Text>
                                    </View>
                                }
                            />
                        );
                    }}
                /> */}
                <ScrollView
                    style={{ width: "100%" }}
                    contentContainerStyle={{ alignItems: "center" }}>
                    {providers.map((provider, i) => (
                        <ImageItemCard
                                key={i}
                                index={i}
                                width={Dimensions.get("window").width * 0.9}
                                onClick={() => {
                                    navigation?.navigate("ServiceDetails", {
                                        service: provider,
                                    });
                                }}
                                uri={
                                    "https://wallpapercave.com/wp/wp4928162.jpg"
                                }
                                style="side"
                                animationTag={provider._id}
                                body={
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                fontWeight: "bold",
                                                color: theme.colors.text,
                                            }}>
                                            {provider.firstName}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: "bold",
                                                color: theme.colors.text,
                                            }}>
                                            {provider.services?.serviceTypes
                                                ?.map(
                                                    (serviceType) => serviceType
                                                )
                                                .join(", ")}
                                        </Text>
                                        <Text
                                            style={{
                                                marginTop: 5,
                                                color: theme.colors.text,
                                            }}>
                                            {provider.services?.activeCities
                                                ?.map((city) => city)
                                                .join(", ")}
                                        </Text>
                                    </View>
                                }
                            />
                    ))}
                </ScrollView>
            </Suspense>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ServicesHome;
