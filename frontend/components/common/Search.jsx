import React from 'react';
import {
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import getThemeContext from '../../context/ThemeContext';

const Search = ({ navigation, image, profile }) => {
  const { theme } = getThemeContext();

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 10,
      marginLeft: 2,
      marginTop: 2
    },
    searchBar: {
      flex: 1,
      height: 40,
      backgroundColor: theme.colors.surface,
      color: theme.colors.text,
      borderRadius: 10,
      paddingHorizontal: 16,
      elevation: 5,
      marginTop: 3,
      marginEnd: profile ? 10 : 50
    },
    userProfileImage: {
      width: 45,
      height: 45,
      borderRadius: 20
    }
  });

  return (
    <View style={styles.header}>
      <TextInput
        placeholderTextColor={theme.colors.text}
        placeholder="Search"
        style={styles.searchBar}
      />
      {profile && (
        <TouchableOpacity
          onPress={() => navigation.getParent().getParent().openDrawer()}
        >
          <Image
            style={styles.userProfileImage}
            source={{
              uri: image
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Search;
