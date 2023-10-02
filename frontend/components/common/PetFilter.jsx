import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const PetFilter = ({ petTypes, onFilterPress }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const petTypeImages = {
    All: 'https://media.istockphoto.com/id/1445196818/photo/group-of-cute-pets-on-white-background-banner-design.webp?b=1&s=170667a&w=0&k=20&c=iQ527QsrVbpECw-3b8GQVw0YD5FhBoorJzFPYQSw_40=',
    Cat: 'https://static.vecteezy.com/system/resources/previews/002/098/203/non_2x/silver-tabby-cat-sitting-on-green-background-free-photo.jpg',
    Dog: 'https://image.cnbcfm.com/api/v1/image/105992231-1561667465295gettyimages-521697453.jpeg?v=1561667497&w=1600&h=900',
    Rabbit: 'https://thumbs.dreamstime.com/b/white-rabbit-grass-1747425.jpg',
  };

  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
    onFilterPress(filter);
  };

  const isFilterSelected = (filter) => {
    return selectedFilter === filter;
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterScrollContainer}
    >
      <TouchableOpacity
        onPress={() => handleFilterPress('All')}
        style={[
          styles.filterButton,
          isFilterSelected('All') && styles.selectedFilterButton,
        ]}
      >
        <View style={styles.filterContent}>
          <Image
            source={{ uri: petTypeImages['All'] }}
            style={styles.filterImage}
          />
          <Text
            style={[
              styles.filterText,
              isFilterSelected('All') && styles.selectedFilterText,
            ]}
          >
            All
          </Text>
        </View>
      </TouchableOpacity>
      {petTypes.map((petType) => (
        <TouchableOpacity
          key={petType}
          onPress={() => handleFilterPress(petType)}
          style={[
            styles.filterButton,
            isFilterSelected(petType) && styles.selectedFilterButton,
          ]}
        >
          <View style={styles.filterContent}>
            <Image
              source={{
                uri: petTypeImages[petType] || petTypeImages['All'],
              }}
              style={styles.filterImage}
            />
            <Text
              style={[
                styles.filterText,
                isFilterSelected(petType) && styles.selectedFilterText,
              ]}
            >
              {petType}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    paddingVertical: 8,
    paddingHorizontal: 9,
    marginHorizontal: 4,
  },
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 5,
  },
  filterText: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  selectedFilterButton: {
    backgroundColor: '#f5857d',
  },
  selectedFilterText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PetFilter;
