import React, { Suspense, lazy, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { getAppContext } from '../../context/AppContext';
import axios from 'axios';
import ImageItemCard from '../common/ImageItemCard';
import Animated from 'react-native-reanimated';

const FlatList = lazy(() => import('react-native/Libraries/Lists/FlatList'));

const HireHistory = ({navigation}) => {
    const { theme } = getThemeContext();
    const { SERVER_URL, USER } = getAppContext();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const getHireHistory = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/v1/services/hire/${USER._id}`);

            if(response.data) setHistory(response.data);
        } catch (error) {
            console.error(error); 
        }
    };

    useEffect(() => {
        getHireHistory();
    }, []);

    const styles = StyleSheet.create({
        textTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.colors.text,
            marginBottom: 5,
        },
        textSubtitle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: theme.colors.text,
        },
        textBody: {
            fontSize: 14,
            color: theme.colors.text,
        },
        textHighlight: {
            fontSize: 18,
            color: theme.colors.servicesPrimary,
        },
        textHighlightBold: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.colors.servicesPrimary,
        },
    });

    return (
        <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Hire History
            </Text>

            <Suspense fallback={<ActivityIndicator />}>
                <FlatList
                    data={history}
                    keyExtractor={(item) => item._id}
                    style={{ width: "100%" }}
                    renderItem={({ item }) => (
                        <Animated.View
                            style={{ width: "100%", alignItems: "center" }}>
                            <ImageItemCard
                                style={"side"}
                                onClick={()=>{}}
                                uri={
                                    item.serviceProvider.profilePic ||
                                    "https://cdn.wallpapersafari.com/9/81/yaqGvs.jpg"
                                }
                                body={
                                    <View>
                                        <Text style={styles.textTitle}>
                                            {item.serviceProvider.firstName}{" "}
                                            {item.serviceProvider.lastName}
                                        </Text>
                                        <Text style={styles.textBody}>
                                            {new Date(item.startDate).toLocaleDateString()} {item.oneDay ? "" : ` to ${new Date(item.endDate).toLocaleDateString()}`}
                                        </Text>
                                        <Text style={styles.textBody}>
                                            {new Date(item.startTime).toLocaleTimeString()} {` to ${new Date(item.endTime).toLocaleTimeString()}`}
                                        </Text>
                                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                                            <Text style={styles.textHighlight}>
                                                STATUS :{" "}
                                            </Text>
                                            <Text
                                                style={
                                                    styles.textHighlightBold
                                                }>
                                                {item.status}
                                            </Text>
                                        </View>
                                    </View>
                                }
                            />
                        </Animated.View>
                    )}
                />
            </Suspense>
        </View>
    );
};

export default HireHistory;