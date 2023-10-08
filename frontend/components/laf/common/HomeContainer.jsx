import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImageItemCard from '../../common/ImageItemCard';

const HomeContainer = ({ Header, Pairs, Page }) => {
  const navigation = useNavigation();

  const handleSeeAllPress = () => {
    navigation.navigate(Page);
  };

  return (
    <View style={styles.sectionContainer}>
      {Header ? (
        <View style={styles.headerContainer}>
          <Text style={styles.sectionHeader}>{Header}</Text>
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={handleSeeAllPress}
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <ScrollView style={styles.cardContainer}>
        {Pairs?.map((pair, index) => (
          <View style={styles.rowContainer} key={index}>
            {pair.map((item) => (
              <ImageItemCard
                key={item._id}
                uri={item.images[0].uri}
                title={item.title}
                width="45%"
                tag={item.age}
                subtitle={
                  item.location.split(' ').length > 4
                    ? `${item.location.split(' ').slice(0, 3).join(' ')} ...`
                    : item.location
                }
                borderRadius={15}
                viewMarginBottom={5}
                textMarginBottom={5}
                onClick={() => {
                  navigation.navigate('Post', { petData: item });
                }}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  seeAllButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  seeAllText: {
    fontWeight: 'bold',
    color: '#808080',
  },
  cardContainer: {
    width: '100%',
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default HomeContainer;
