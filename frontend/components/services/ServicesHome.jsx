import {
    ActivityIndicator,
    Dimensions,
    RefreshControl,
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
import { getServiceProviders } from "../../services/ServiceproviderSerives";
import Toast from "react-native-toast-message";
import FloatingMenuButton from "../common/FloatingMenuButton";

const ServicesHome = ({ navigation }) => {
    const { theme } = getThemeContext();
    const { user } = getAppContext();
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProviders = async () => {
        try {
            setLoading(true);
            const response = await getServiceProviders(user.token);
            setProviders(response);
            setLoading(false);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2:
                    error?.response?.data?.message || //axios error
                    error.message || //js error
                    'Could not get service providers', //default
            });
            setLoading(false);
        }
    };

    useState(() => {
        if (providers.length === 0) getProviders();
    }, []);

    const chips = [
        {
            text: 'All',
        },
        {
            text: 'Walking',
        },
        {
            text: 'Sitting',
        },
        {
            text: 'Grooming',
        },
        {
            text: 'Petting',
        },
    ];

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        chipContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 5,
        },
        titleText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.colors.text,
        },
        subtitleText: {
            fontSize: 14,
            fontWeight: 'bold',
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
            <FloatingMenuButton navigation={navigation} />
            <View style={styles.chipContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {chips.map((chip, i) => (
                        <ThemeChip key={i} clickable text={chip.text} />
                    ))}
                </ScrollView>
            </View>
            <Suspense fallback={<ActivityIndicator />}>
                <ScrollView
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={getProviders} />}
                    style={{ width: '100%' }}
                    contentContainerStyle={{ alignItems: 'center' }}
                >
                    {providers.map((provider, i) => (
                        <ImageItemCard
                            key={i}
                            index={i}
                            width={Dimensions.get('window').width * 0.9}
                            onClick={() => {
                                navigation?.navigate('ServiceDetails', {
                                    service: provider,
                                });
                            }}
                            uri={
                                provider.profilePic ||
                                "https://wallpapercave.com/wp/wp4928162.jpg"
                            }
                            style='side'
                            animationTag={provider._id}
                            body={
                                <View>
                                    <Text style={styles.titleText}>{provider.firstName}</Text>
                                    <Text style={styles.subtitleText}>
                                        {provider.services?.serviceTypes?.map((serviceType) => serviceType).join(', ')}
                                    </Text>
                                    <Text style={styles.textMargin5}>
                                        {provider.services?.activeCities?.map((city) => city).join(', ')}
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