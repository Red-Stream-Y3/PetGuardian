import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import getThemeContext from '../../../context/ThemeContext';
import { getAppContext } from '../../../context/AppContext';
import AllPets from '../common/AllPets';
import { getAllPosts } from '../../../services/PostServices';

const FoundHome = () => {
    const { theme } = getThemeContext();
    const { user } = getAppContext();
    const [foundPosts, setFoundPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPosts = async () => {
        try {
            setLoading(true);
            const response = await getAllPosts(user.token);
            const foundPosts = response.filter((post) => post.type === 'Found');
            setFoundPosts(foundPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <AllPets title="Found Pets" data={foundPosts} />
        </View>
    );
};

export default FoundHome;
