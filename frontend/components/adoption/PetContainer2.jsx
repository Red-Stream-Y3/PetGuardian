import {
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getThemeContext from '../../context/ThemeContext';

import ImageItemCard from '../common/ImageItemCard';

const PetsContainerA = ({
  header,
  btnText,
  pairs,
  component,
  screen,
  fontSize,
  loading,
}) => {
  const { theme } = getThemeContext();
  const navigation = useNavigation();

  const handleSeeAllPress = () => {
    navigation.navigate(component);
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
      fontSize: fontSize,
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

  return (
    <View style={styles.sectionContainer}>
      {header && (
        <View style={styles.headerContainer}>
          <Text
            style={{
              color: theme.colors.text,
              ...styles.sectionHeader,
            }}
          >
            {header}
          </Text>
          {btnText && (
            <TouchableOpacity
              style={styles.seeAllButton}
              onPress={handleSeeAllPress}
            >
              <Text style={styles.seeAllText}>{btnText}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <ScrollView style={styles.cardContainer}>
        {loading && (
          <ActivityIndicator size={50} color={theme.colors.lostPrimary} />
        )}
        {pairs?.map((pair, index) => (
          <View style={styles.rowContainer} key={index}>
            {pair.map((item) => (
              <ImageItemCard
                key={item._id}
                uri={item.image[0]}
                title={item.name}
                width="45%"
                sideTag={`${item.age} ${item.age === 1 ? 'year' : 'years'} old`}
                subtitle={`📍${item.location.split(',')[1]}`}
                borderRadius={15}
                viewMarginBottom={5}
                textMarginBottom={5}
                height={210}
                onClick={() => {
                  navigation.navigate(screen, { petData: item });
                }}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PetsContainerA;
