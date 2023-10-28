import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import getThemeContext from '../../context/ThemeContext';
import ImageItemCard from './ImageItemCard';

const SelectPets = ({
  header,
  btnText,
  pairs,
  component,
  screen,
  fontSize,
  onSelectPet,
  selectedId,
}) => {
  const { theme } = getThemeContext();
  const navigation = useNavigation();
  const [selectedPost, setSelectedPost] = useState(null);

  console.log('selectedId', selectedId);

  const handleSelectPet = (postId) => {
    setSelectedPost(postId);
    onSelectPet(postId);
  };
  const handleSeeAllPress = () => {};

  const isSelected = (itemId) => {
    if (component === 'create') {
      return selectedPost === itemId;
    } else if (component === 'update') {
      return selectedId === itemId;
    }
    return false;
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
    },
    imageItemCard: {
      width: 165,
      marginRight: 10,
      position: 'relative',
    },
    checkbox: {
      position: 'absolute',
      top: 15,
      right: 18,
      color: 'white',
      borderRadius: 5,
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

      <ScrollView style={styles.cardContainer} horizontal>
        {pairs?.map((pair, index) => (
          <View style={styles.rowContainer} key={index}>
            {pair.map((item) => (
              <TouchableOpacity
                key={item._id}
                onPress={() => handleSelectPet(item._id)}
                activeOpacity={0.7}
              >
                <ImageItemCard
                  uri={item.image[0]}
                  title={item.name}
                  width={styles.imageItemCard.width}
                  sideTag={item.age}
                  subtitle={item.breed}
                  borderRadius={15}
                  viewMarginBottom={5}
                  textMarginBottom={5}
                  onClick={() => {
                    navigation.navigate(screen, { petData: item });
                  }}
                />

                <FontAwesome
                  name={isSelected(item._id) ? 'check-square-o' : 'square-o'}
                  size={24}
                  color={isSelected(item._id) ? 'black' : 'gray'}
                  style={styles.checkbox}
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SelectPets;
