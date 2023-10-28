import React, { useEffect, useState } from 'react';
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
import {
  getAllPlayDates,
  searchPlayDates,
} from '../../services/PlayDateServices';
import Search from '../common/Search';
import Toast from 'react-native-toast-message';
import FloatingMenuButton from '../common/FloatingMenuButton';

const PlaydateHome = () => {
  const { theme } = getThemeContext();
  const navigation = useNavigation();
  const [playdates, setPlaydates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const fetchPlaydates = async () => {
      const data = await getAllPlayDates();
      setPlaydates(data);
      setLoading(false);
    };
    fetchPlaydates();
  }, []);

  const handleSearch = async (text) => {
    setSearchText(text);
    if (text.length === 0) {
      setSearching(false);
      return;
    }
    setSearching(true);
    try {
      const response = await searchPlayDates(text);
      setPlaydates(response);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          error?.response?.data?.message ||
          error.message ||
          'Could not search playdates',
      });
    }
    setSearching(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const fetchPlaydates = async () => {
        const data = await getAllPlayDates();
        setPlaydates(data);
        setLoading(false);
      };
      fetchPlaydates();
    });
    return unsubscribe;
  }, [navigation]);

  const handleNearMePress = () => {
    navigation.navigate('NearMe');
  };

  const handleNewPlaydatePress = () => {
    navigation.navigate('CreatePlaydate');
  };

  const handleMyPlaydatesPress = () => {
    navigation.navigate('MyPlaydates');
  };

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Search
          navigation={navigation}
          text={searchText}
          onChangeText={handleSearch}
        />

        <FloatingMenuButton navigation={navigation} />

        <View style={styles.headerContainer}>
          <Text style={[styles.sectionHeader, { color: theme.colors.text }]}>
            Playdates
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.nearMeButton,
                { backgroundColor: theme.colors.playPrimary },
              ]}
              onPress={handleNewPlaydatePress}
            >
              <Text style={styles.nearMeText}>New Playdate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.nearMeButton,
                { backgroundColor: theme.colors.playPrimary },
              ]}
              onPress={handleMyPlaydatesPress}
            >
              <Text style={styles.nearMeText}>My Playdates</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {playdates &&
            !loading &&
            playdates.map((item) => (
              <CardWithProfile
                key={item._id}
                image={item.image}
                profileImage={item.profilePic}
                name={item.name}
                location={item.location}
                type={item.type}
                onPress={() => {
                  navigation.navigate('ViewPlaydate', { id: item._id });
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'left',
    marginHorizontal: 20,
    marginTop: 20,
    flexWrap: 'wrap',
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
    color: '#fff',
  },
  scrollView: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
});

export default PlaydateHome;
