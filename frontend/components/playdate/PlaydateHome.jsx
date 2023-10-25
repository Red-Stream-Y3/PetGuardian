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
import { getAllPlayDates } from '../../services/PlayDateServices';
import ProfileCard from '../common/ProfileCard';

const PlaydateHome = () => {
  const { theme } = getThemeContext();
  const navigation = useNavigation();
  const [playdates, setPlaydates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaydates = async () => {
      const data = await getAllPlayDates();
      setPlaydates(data);
      setLoading(false);
    };
    fetchPlaydates();
  }, []);

  console.log('playdates', playdates);
  const handleNearMePress = () => {
    navigation.navigate('NearMe');
  };

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.headerContainer}>
          <Text style={[styles.sectionHeader, { color: theme.colors.text }]}>
            Playdates
          </Text>
          <TouchableOpacity
            style={[
              styles.nearMeButton,
              { backgroundColor: theme.colors.playPrimary },
            ]}
            onPress={handleNearMePress}
          >
            <Text style={[styles.nearMeText, { color: theme.colors.text }]}>
              Near Me
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {playdates &&
            !loading &&
            playdates.map((item) => (
              <>
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
              </>
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
