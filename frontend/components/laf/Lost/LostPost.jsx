import React, { Suspense, useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, ScrollView } from 'react-native';
import getThemeContext from '../../../context/ThemeContext';

import Header from '../../common/Header';
import SelectPets from '../../common/SelectPets';
import LostDetails from './LostDetails';
import MarkerTitle from '../../common/MarkerTitle';
import { getPostByUser } from '../../../services/PostServices';

const LostPost = () => {
    const { theme } = getThemeContext();
    const { user } = getAppContext();
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const response = await getPostByUser(user._id, user.token);
        const lostPosts = response.filter((post) => post.type === 'Lost');
        setPosts(lostPosts);
    };

    useEffect(() => {
        getPosts();
    }, []);

    const groupIntoPairs = (data) => {
        const pairs = [];
        for (let i = 0; i < data.length; i += 2) {
            const pair = [data[i], data[i + 1]].filter(Boolean);
            pairs.push(pair);
        }
        return pairs;
    };

    const lostPetsPairs = groupIntoPairs(posts);

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: theme.colors.background,
            }}
        >
            <View style={{ flex: 1 }}>
                <Header title="New Post" save={true} />

                <Suspense fallback={<ActivityIndicator />}>
                    <SelectPets
                        header="Select your pets"
                        pairs={lostPetsPairs}
                        component="LostPost"
                        screen="Post"
                        fontSize={14}
                    />

                    <LostDetails />

                    <MarkerTitle />
                </Suspense>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({});

export default LostPost;
