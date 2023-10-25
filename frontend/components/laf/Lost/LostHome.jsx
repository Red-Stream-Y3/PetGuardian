import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import getThemeContext from '../../../context/ThemeContext';
import { getAppContext } from '../../../context/AppContext';
import AllPets from '../common/AllPets';
import { getAllPosts } from '../../../services/PostServices';

const LostHome = () => {
  const { theme } = getThemeContext();
  const { user } = getAppContext();
  const [lostPosts, setLostPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await getAllPosts(user.token);
      const lostPosts = response.filter(
        (post) => post.type === 'Lost' && post.status === 'open'
      );
      setLostPosts(lostPosts);
    } catch (error) {
      console.log('Error fetching posts:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AllPets title="Lost Pets" data={lostPosts} />
    </View>
  );
};

export default LostHome;
