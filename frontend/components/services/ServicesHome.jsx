import {
    ActivityIndicator,
    Dimensions,
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
    const [loading, setLoading] = useState(false);

    const getProviders = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${SERVER_URL}/api/v1/services`);
            setProviders(response.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        chipContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 5,
        },
        titleText: {
            fontSize: 18,
            fontWeight: "bold",
            color: theme.colors.text,
        },
        subtitleText: {
            fontSize: 14,
            fontWeight: "bold",
            color: theme.colors.text,
        },
        textMargin5: {
            marginTop: 5,
            color: theme.colors.text,
        },
    });

    return (
        <View style={styles.container}>
            <Search navigation={navigation} />
            <View style={styles.chipContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {chips.map((chip, i) => (
                        <ThemeChip key={i} clickable text={chip.text} />
                    ))}
                </ScrollView>
            </View>
            <Suspense fallback={<ActivityIndicator />}>
                <ScrollView
                    style={{ width: "100%" }}
                    contentContainerStyle={{ alignItems: "center" }}>
                    {loading && (
                        <ActivityIndicator
                            size={50}
                            color={theme.colors.servicesPrimary}
                        />
                    )}
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
                            uri={"https://wallpapercave.com/wp/wp4928162.jpg"}
                            style='side'
                            animationTag={provider._id}
                            body={
                                <View>
                                    <Text style={styles.titleText}>
                                        {provider.firstName}
                                    </Text>
                                    <Text style={styles.subtitleText}>
                                        {provider.services?.serviceTypes
                                            ?.map((serviceType) => serviceType)
                                            .join(", ")}
                                    </Text>
                                    <Text style={styles.textMargin5}>
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

export default ServicesHome;
