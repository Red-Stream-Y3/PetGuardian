import React from 'react';
import {
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Search = ({ navigation, image }) => {
  return (
    <View style={styles.header}>
      <TextInput placeholder="Search" style={styles.searchBar} />
      <TouchableOpacity onPress={()=>navigation.getParent().getParent().openDrawer()}>
        <Image
          style={styles.userProfileImage}
          source={{
            uri: image
              ? uri
              : 'https://wallpaperbat.com/img/609256-anime-boy-power-up-wallpaper.jpg',
          }}
        />
      </TouchableOpacity>
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
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  userProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
  },
});

export default Search;
