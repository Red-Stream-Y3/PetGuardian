import React from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const Search = ({ profile, image }) => {
  return (
    <View style={styles.header}>
      <View style={styles.inputContainer}>
        <FontAwesome5
          name="search"
          size={17}
          color="grey"
          style={styles.searchIcon}
        />
        <TextInput placeholder="Search" style={styles.searchBar} />
      </View>
      {profile ? (
        <TouchableOpacity>
          <Image
            style={styles.userProfileImage}
            source={{
              uri: image
                ? uri
                : 'https://wallpaperbat.com/img/609256-anime-boy-power-up-wallpaper.jpg',
            }}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
    marginLeft: 2,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 15,
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingVertical: 0,
  },
  userProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
  },
});

export default Search;
