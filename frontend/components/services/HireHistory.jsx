import React, { Suspense, lazy, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { getAppContext } from '../../context/AppContext';
import axios from 'axios';
import ImageItemCard from '../common/ImageItemCard';
import Animated from 'react-native-reanimated';
import ThemeBackButton from '../common/ThemeBackButton';
import ThemeOverlay from '../common/ThemeOverlay';
import BookingSummary from './BookingSummary';
import Toast from 'react-native-toast-message';

const FlatList = lazy(() => import('react-native/Libraries/Lists/FlatList'));

const HireHistory = ({navigation}) => {
    const { theme } = getThemeContext();
    const { SERVER_URL, USER } = getAppContext();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSelected, setShowSelected] = useState(false);
    const [selected, setSelected] = useState(null);

    const getHireHistory = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${SERVER_URL}/api/v1/services/hire/${USER._id}`);

            if(response.data) setHistory(response.data);
            
            setLoading(false);
        } catch (error) {
            console.error(error); 
            setLoading(false);
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

    const onPressCancelBooking = async (id) => {
        setLoading(true);
        try {
            const response = await axios.put(`${SERVER_URL}/api/v1/services/hire`, { _id:id, status: 'cancelled' });

            if(response.data) {
                Toast.show({
                    type: 'success',
                    text1: 'Booking Cancelled',
                });
                getHireHistory();
                setShowSelected(false);
                setSelected(null);
            }
            
            setLoading(false);
        } catch (error) {
            console.error(error); 
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: "center", width: "100%" }}>

            <ThemeOverlay visible={showSelected} onPressBg={() => setShowSelected(false)}>
                <BookingSummary    
                    booking={selected}
                    closeActionCallback={()=>{
                        setShowSelected(false);
                        setSelected(null);
                    }}
                    actionTitle={'Cancel Booking'}
                    actionCallback={()=>{onPressCancelBooking(selected._id)}} />    
            </ThemeOverlay>

            <View style={{ width: "100%", alignItems: "center" }}>
                <ThemeBackButton navigation={navigation} />
                <Text style={styles.textTitle}>
                    Hire History
                </Text>
            </View>
            {loading && <ActivityIndicator size={50} color={theme.colors.servicesPrimary} />}
            <Suspense fallback={<ActivityIndicator />}>
                <FlatList
                    data={history}
                    keyExtractor={(item) => item._id}
                    style={{ width: "100%" }}
                    renderItem={({ item, i }) => (
                        <Animated.View
                            style={{ width: "100%", alignItems: "center" }}>
                            <ImageItemCard
                                style={"side"}
                                index={i}
                                onClick={()=>{
                                    setSelected(item);
                                    setShowSelected(true);
                                }}
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