import React, { Suspense, useState, useEffect } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import getThemeContext from '../../../context/ThemeContext';
import { getAppContext } from '../../../context/AppContext';
import Header from '../../common/Header';
import { getPostByUser, deletePost } from '../../../services/PostServices';

const Profile = () => {
  const { theme } = getThemeContext();
  const { user } = getAppContext();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await getPostByUser(user._id, user.token);
      setPosts(response);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleNew = () => {
    setModalVisible(true);
  };

  const handleModalSelection = (postType) => {
    setModalVisible(false);
    if (postType === 'Lost') {
      navigation.navigate('LostPost');
    } else if (postType === 'Found') {
      navigation.navigate('FoundPost');
    }
  };

  const handleEditPost = (postId) => {
    navigation.navigate('EditPost', { postId: postId });
  };

  const removePost = async (postId) => {
    try {
      await deletePost(postId, user.token);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
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
      borderColor: theme.colors.text,
      marginTop: 10,
      marginBottom: 20,
    },
    name: {
      fontSize: 13,
      fontWeight: 'bold',
      padding: 10,
      paddingHorizontal: 30,
      borderColor: theme.colors.text,
      borderWidth: 1,
      borderRadius: 40,
      marginBottom: 40,
      color: theme.colors.text,
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
      color: theme.colors.text,
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
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    modalOption: {
      padding: 15,
      borderWidth: 1,
      borderColor: theme.colors.text,
      alignItems: 'center',
      borderRadius: 10,
      marginVertical: 5,
    },
    modalOptionText: {
      fontSize: 18,
      color: '#333',
    },
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleEditPost(item._id)}>
      <View style={styles.postItem}>
        <Image source={{ uri: item.images[0] }} style={styles.postImage} />
        <Text style={styles.postName}>{item.pet.name}</Text>
        <TouchableOpacity
          onPress={() => removePost(item._id)}
          style={styles.removePostButton}
        >
          <AntDesign name="closecircle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header title="My Profile" />

      <Suspense fallback={<ActivityIndicator />}>
        <View style={styles.container}>
          <Image
            source={{
              uri: user.profilePic,
            }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>
            {user.firstName} {user.lastName}
          </Text>
        </View>
        <View style={styles.postsHeaderContainer}>
          <Text style={styles.postsHeader}>Posts</Text>
          <TouchableOpacity style={styles.newPostButton} onPress={handleNew}>
            <FontAwesome name="plus" size={15} color="white" />
            <Text style={styles.newPostButtonText}>New</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleModalSelection('Lost')}
              >
                <Text style={styles.modalOptionText}>Lost Post</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleModalSelection('Found')}
              >
                <Text style={styles.modalOptionText}>Found Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          style={styles.postsContainer}
        />
      </Suspense>
    </View>
  );
};

export default Profile;
