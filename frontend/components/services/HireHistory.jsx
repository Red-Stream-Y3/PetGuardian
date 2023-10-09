import React, { Suspense, lazy, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { getAppContext } from '../../context/AppContext';
import axios from 'axios';
import ImageItemCard from '../common/ImageItemCard';

const FlatList = lazy(() => import('react-native/Libraries/Lists/FlatList'));

const HireHistory = ({navigation}) => {
    const { theme } = getThemeContext();
    const { SERVER_URL, USER } = getAppContext();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const getHireHistory = async () => {
        try {
            const results = axios.get(`${SERVER_URL}/api/v1/services/hire/${USER._id}`);
            
            if(results.data) setHistory(results.data);
            console.debug(results.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (history.length === 0) getHireHistory();
    }, []);

    return (
        <View style={{flex:1, alignItems:'center', width:'100%'}}>
            <Text>Hire History</Text>

            <Suspense fallback={<ActivityIndicator />}>
                <FlatList
                    data={history}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) => (
                        <ImageItemCard>
                            <View>
                                <Text>Title</Text>
                                <Text>Body</Text>
                            </View>
                        </ImageItemCard>
                    )} />
            </Suspense>
        </View>
    );
};

export default HireHistory;