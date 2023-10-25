import React, { Suspense, useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { getAppContext } from '../../context/AppContext';
import Toast from 'react-native-toast-message';

import Search from '../common/Search';
import PetsContainer from '../common/PetsContainer';

import { getAllPosts, searchPosts } from '../../services/PostServices';

const LostFoundHome = ({ navigation }) => {
  const { theme } = getThemeContext();
  const { user } = getAppContext();
  const [lostPosts, setLostPosts] = useState([]);
  const [foundPosts, setFoundPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searching, setSearching] = useState(false);

  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await getAllPosts(user.token);
      const lostPosts = response.filter(
        (post) => post.type === 'Lost' && post.status === 'open'
      );
      setLostPosts(lostPosts);

      const foundPosts = response.filter(
        (post) => post.type === 'Found' && post.status === 'open'
      );
      setFoundPosts(foundPosts);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          error?.response?.data?.message ||
          error.message ||
          'Could not get posts',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  // Helper function to group data into pairs
  const groupIntoPairs = (data) => {
    const pairs = [];
    for (let i = 0; i < data.length; i += 2) {
      const pair = [data[i], data[i + 1]].filter(Boolean);
      pairs.push(pair);
    }
    return pairs;
  };

  const lostPetsPairs = groupIntoPairs(lostPosts.slice(0, 4));
  const foundPetsPairs = groupIntoPairs(foundPosts.slice(0, 4));

  const handleSearch = async (text) => {
    setSearchText(text);

    if (text === '') {
      await getPosts();
      setSearching(false);
      return;
    }

    try {
      setSearching(true);
      const response = await searchPosts(text, user.token);
      const lostPosts = response.filter(
        (post) => post.type === 'Lost' && post.status === 'open'
      );
      setLostPosts(lostPosts);

      const foundPosts = response.filter(
        (post) => post.type === 'Found' && post.status === 'open'
      );
      setFoundPosts(foundPosts);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          error?.response?.data?.message ||
          error.message ||
          'Could not get posts',
      });
    } finally {
      setSearching(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Search
        navigation={navigation}
        image={user.profilePic}
        profile={true}
        text={searchText}
        onChangeText={handleSearch}
      />
      <Suspense fallback={<ActivityIndicator />}>
        <ScrollView>
          {lostPosts.length > 0 && (
            <PetsContainer
              header={searching ? 'Searching...' : 'Lost Pets'}
              btnText="See All"
              pairs={lostPetsPairs}
              component="PostProfile"
              screen="Post"
              fontSize={16}
              loading={loading}
            />
          )}
          {foundPosts.length > 0 && (
            <PetsContainer
              header={searching ? 'Searching...' : 'Found Pets'}
              btnText="See All"
              pairs={foundPetsPairs}
              component="FoundHome"
              screen="Post"
              fontSize={16}
              loading={loading}
            />
          )}
        </ScrollView>
      </Suspense>
    </View>
  );
};

export default LostFoundHome;
