import {
    ActivityIndicator,
    Dimensions,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Search from '../common/Search';
import getThemeContext from '../../context/ThemeContext';
import { getAppContext } from '../../context/AppContext';
import { Suspense, useState } from 'react';
import ImageItemCard from '../common/ImageItemCard';
import {
    getServiceProviders,
    searchServiceProviders,
} from '../../services/ServiceproviderSerives';
import Toast from 'react-native-toast-message';
import FloatingMenuButton from '../common/FloatingMenuButton';

const ServicesHome = ({ navigation }) => {
    const { theme } = getThemeContext();
    const { user } = getAppContext();
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searching, setSearching] = useState(false);

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

    const handleSearch = async (text) => {
        setSearchText(text);

        if (text === '') {
            await getProviders();
            return;
        }

        setSearching(true);
        try {
            const response = await searchServiceProviders(text, user.token);
            setProviders(response);
            setSearching(false);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not get service providers',
            });
        }
    };

    return (
        <View style={styles.container}>
            <Search
                navigation={navigation}
                text={searchText}
                onChangeText={handleSearch}
            />
            <FloatingMenuButton navigation={navigation} />
            <Suspense fallback={<ActivityIndicator />}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={getProviders}
                        />
                    }
                    style={{ width: '100%' }}
                    contentContainerStyle={{ alignItems: 'center' }}
                >
                    {searching && (
                        <ActivityIndicator
                            size={24}
                            color={theme.colors.servicesPrimary}
                        />
                    )}
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
                                'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png'
                            }
                            style="side"
                            animationTag={provider._id}
                            body={
                                <View>
                                    <Text style={styles.titleText}>
                                        {provider.firstName}
                                    </Text>
                                    <Text style={styles.subtitleText}>
                                        {provider.services?.serviceTypes
                                            ?.map((serviceType) => serviceType)
                                            .join(', ')}
                                    </Text>
                                    <Text style={styles.textMargin5}>
                                        {provider.services?.activeCities
                                            ?.map((city) => city)
                                            .join(', ')}
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
