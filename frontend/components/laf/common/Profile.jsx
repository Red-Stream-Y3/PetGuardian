import React, { Suspense, useState } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import getThemeContext from '../../../context/ThemeContext';
import Header from '../../common/Header';
import { lostPetsData } from '../pets';

const Profile = () => {
  const { theme } = getThemeContext();

  const removePost = (postId) => {};

  const renderItem = ({ item }) => (
    <View style={styles.postItem}>
      <Image source={{ uri: item.images[0].uri }} style={styles.postImage} />
      <Text style={styles.postName}>{item.title}</Text>
      <TouchableOpacity
        onPress={() => removePost(item._id)}
        style={styles.removePostButton}
      >
        <AntDesign name="closecircle" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header title="My Profile" />

      <Suspense fallback={<ActivityIndicator />}>
        <View style={styles.container}>
          <Image
            source={{
              uri: 'https://wallpaperbat.com/img/609256-anime-boy-power-up-wallpaper.jpg',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>John Doe</Text>
        </View>
        <View style={styles.postsHeaderContainer}>
          <Text style={styles.postsHeader}>Posts</Text>
          <TouchableOpacity style={styles.newPostButton}>
            <FontAwesome name="plus" size={15} color="white" />
            <Text style={styles.newPostButtonText}>New</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={lostPetsData}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          style={styles.postsContainer}
        />
      </Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderWidth: 3,
    borderRadius: 75,
    borderColor: 'black',
    marginTop: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 13,
    fontWeight: 'bold',
    padding: 10,
    paddingHorizontal: 30,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 40,
    marginBottom: 40,
  },
  postsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  postsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  newPostButton: {
    backgroundColor: '#FFBC11',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newPostButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  postItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: '#DBDBDB',
  },
  postImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  postName: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 30,
    fontWeight: 'bold',
  },
  removePostButton: {
    marginRight: 10,
  },
  postsContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
});

export default Profile;
