import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardWithProfile from '../../components/common/CardWithProfile';
import getThemeContext from '../../context/ThemeContext';

const PlaydateHome = () => {
    const { theme } = getThemeContext();
    const navigation = useNavigation();
    const handleNearMePress = () => {
        navigation.navigate('NearMe');
    };

    const data = [
        {
            id: 1,
            image: 'https://wallpapercave.com/wp/wp4928162.jpg', //can provide local image or uri
            profileImage: 'https://wallpapercave.com/wp/wp4928162.jpg', //can provide local image or uri
            name: 'John Doe',
            location: 'New York, NY',
            icon: 'dog',
        },
        {
            id: 2,
            image: 'https://wallpapercave.com/wp/wp4928162.jpg', //can provide local image or uri
            profileImage: 'https://wallpapercave.com/wp/wp4928162.jpg', //can provide local image or uri
            name: 'John Doe',
            location: 'New York, NY',
            icon: 'dog',
        },
        {
            id: 3,
            image: 'https://wallpapercave.com/wp/wp4928162.jpg', //can provide local image or uri
            profileImage: 'https://wallpapercave.com/wp/wp4928162.jpg', //can provide local image or uri
            name: 'John Doe',
            location: 'New York, NY',
            icon: 'cat',
        },
        {
            id: 4,
            image: 'https://wallpapercave.com/wp/wp4928162.jpg', //can provide local image or uri
            profileImage: 'https://wallpapercave.com/wp/wp4928162.jpg', //can provide local image or uri
            name: 'John Doe',
            location: 'New York, NY',
            icon: 'cat',
        },
        {
            id: 5,
            image: 'https://wallpapercave.com/wp/wp4928162.jpg', //can provide local image or uri
            profileImage: 'https://wallpapercave.com/wp/wp4928162.jpg', //can provide local image or uri
            name: 'John Doe',
            location: 'New York, NY',
            icon: 'rabbit',
        },
    ];

    return (
        <>
            <View
                style={[
                    styles.container,
                    { backgroundColor: theme.colors.background },
                ]}
            >
                <View style={styles.headerContainer}>
                    <Text
                        style={[
                            styles.sectionHeader,
                            { color: theme.colors.text },
                        ]}
                    >
                        Playdates
                    </Text>
                    <TouchableOpacity
                        style={[
                            styles.nearMeButton,
                            { backgroundColor: theme.colors.playPrimary },
                        ]}
                        onPress={handleNearMePress}
                    >
                        <Text
                            style={[
                                styles.nearMeText,
                                { color: theme.colors.text },
                            ]}
                        >
                            {' '}
                            Near Me{' '}
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    {data.map((item) => (
                        <CardWithProfile
                            key={item.id}
                            image={item.image}
                            profileImage={item.profileImage}
                            name={item.name}
                            location={item.location}
                            icon={item.icon}
                            onPress={() => {
                                //   navigation.navigate('Playdate', { playdateData: item });
                            }}
                        />
                    ))}
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    nearMeButton: {
        borderRadius: 50,
        padding: 10,
    },
    nearMeText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollView: {
        marginHorizontal: 20,
        marginTop: 20,
    },
});

export default PlaydateHome;
