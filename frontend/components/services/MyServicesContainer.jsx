import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { getAppContext } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import {
    acceptHireRequest,
    getMyHireRequests,
    rejectHireRequest,
} from '../../services/ServiceproviderSerives';
import Animated from 'react-native-reanimated';
import ImageItemCard from '../common/ImageItemCard';
import ThemeButton from '../common/ThemeButton';
import { CommonActions } from '@react-navigation/native';
import ThemeCard from './../common/ThemeCard';
import ThemeOverlay from './../common/ThemeOverlay';
import BookingSummary from './BookingSummary';
import { Entypo } from '@expo/vector-icons';

const MyServicesContainer = ({ navigation }) => {
    const { theme } = getThemeContext();
    const { user, setSelectedTab } = getAppContext();
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showSelected, setShowSelected] = useState(false);
    const [showReject, setShowReject] = useState(false);
    const [showAccept, setShowAccept] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    const fetchMyHireRequests = async () => {
        try {
            const response = await getMyHireRequests(user._id, user.token);
            if (response) setHistory(response);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2:
                    error?.response?.data?.message || //axios error
                    error.message || //js error
                    'Could not get hire history', //default
            });
        }
    };

    const handleRefresh = async () => {
        setLoading(true);
        await fetchMyHireRequests();
        setLoading(false);
    };

    const handleAcceptClick = async (item) => {
        if (!showAccept) {
            setSelected(item);
            setShowAccept(true);
            return;
        }

        try {
            setButtonLoading(true);
            const response = await acceptHireRequest(selected._id, user.token);

            if (response) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Hire request accepted',
                });
                handleRefresh();
                setShowAccept(false);
            }
            setButtonLoading(false);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2:
                    error?.response?.data?.message || //axios error
                    error.message || //js error
                    'Could not accept hire request', //default
            });
            setShowAccept(false);
            setButtonLoading(false);
        }
    };

    const handleRejectClick = async (item) => {
        if (!showReject) {
            setSelected(item);
            setShowReject(true);
            return;
        }

        try {
            setButtonLoading(true);
            const response = await rejectHireRequest(selected._id, user.token);
            if (response) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Hire request rejected',
                });
                handleRefresh();
                setShowReject(false);
            }
            setButtonLoading(false);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2:
                    error?.response?.data?.message || //axios error
                    error.message || //js error
                    'Could not reject hire request', //default
            });
            setShowReject(false);
            setButtonLoading(false);
        }
    };

    useEffect(() => {
        handleRefresh();
    }, []);

    const deprecated_handleGoToMyPageClick = () => {
        setSelectedTab(0);

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'Home',
                        state: {
                            routes: [
                                {
                                    name: 'SERVICES',
                                    state: {
                                        routes: [
                                            {
                                                name: 'Services',
                                            },
                                            {
                                                name: 'ServiceDetails',
                                                params: {
                                                    service: {
                                                        _id: user._id,
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            })
        );
    };

    const handleGoToMyPageClick = () => {
        navigation.navigate('MyServicePage', {
            service: {
                _id: user._id,
            },
        });
    };

    const handleScheduleClick = () => {
        navigation.navigate('MyServiceSchedulePage');
    };

    const handleEditClick = () => {
        navigation.navigate('MyServiceEditPage');
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            width: '100%',
            backgroundColor: theme.colors.background,
        },
        textTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.colors.text,
            marginBottom: 5,
            alignSelf: 'flex-start',
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
        titleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
        },
        itemContainer: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        emptyMessage: {
            marginTop: Dimensions.get('window').height / 3,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        },
        buttonContainer: {
            alignSelf: 'flex-end',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <ThemeOverlay
                visible={showSelected}
                onPressBg={() => setShowSelected(false)}
            >
                <BookingSummary
                    booking={selected}
                    closeActionCallback={() => setShowSelected(false)}
                />
            </ThemeOverlay>

            <ThemeOverlay
                visible={showAccept}
                onPressBg={() => setShowAccept(false)}
            >
                <ThemeCard>
                    <View style={{}}>
                        <Text style={styles.textTitle}>
                            Are you sure you want to accept this request?
                        </Text>
                        <View style={styles.buttonContainer}>
                            <ThemeButton
                                title={'Cancel'}
                                variant={'clear'}
                                onPress={() => setShowAccept(false)}
                            />
                            <ThemeButton
                                title={'Accept'}
                                onPress={handleAcceptClick}
                            >
                                {buttonLoading && (
                                    <ActivityIndicator
                                        size={16}
                                        color={theme.colors.primarytext}
                                    />
                                )}
                            </ThemeButton>
                        </View>
                    </View>
                </ThemeCard>
            </ThemeOverlay>

            <ThemeOverlay
                visible={showReject}
                onPressBg={() => setShowReject(false)}
            >
                <ThemeCard>
                    <View style={{}}>
                        <Text style={styles.textTitle}>
                            Are you sure you want to reject this request?
                        </Text>
                        <View style={styles.buttonContainer}>
                            <ThemeButton
                                title={'Cancel'}
                                variant={'clear'}
                                onPress={() => setShowReject(false)}
                            />
                            <ThemeButton
                                title={'Reject'}
                                onPress={handleRejectClick}
                            >
                                {buttonLoading && (
                                    <ActivityIndicator
                                        size={16}
                                        color={theme.colors.primarytext}
                                    />
                                )}
                            </ThemeButton>
                        </View>
                    </View>
                </ThemeCard>
            </ThemeOverlay>

            <ThemeCard>
                <View style={styles.titleContainer}>
                    <ThemeButton onPress={handleScheduleClick}>
                        <Entypo
                            name="calendar"
                            size={18}
                            color={theme.colors.primaryIcon}
                        />
                    </ThemeButton>
                    <ThemeButton
                        title={'Edit my services'}
                        onPress={handleEditClick}
                    />
                    <ThemeButton
                        title={'Go to my page'}
                        onPress={handleGoToMyPageClick}
                    />
                </View>
            </ThemeCard>

            <Text
                style={[
                    styles.textTitle,
                    {
                        marginStart: 30,
                    },
                ]}
            >
                My Hire Requests
            </Text>
            <FlatList
                data={history}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={handleRefresh}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.emptyMessage}>
                        <Text style={styles.textBody}>No History Found</Text>
                    </View>
                }
                keyExtractor={(item) => item._id}
                style={{ width: '100%' }}
                renderItem={({ item, i }) => (
                    <Animated.View style={styles.itemContainer}>
                        <ImageItemCard
                            style={'side'}
                            index={i}
                            onClick={() => {
                                setSelected(item);
                                setShowSelected(true);
                            }}
                            highlight={true}
                            highlightColor={
                                item.status === 'pending'
                                    ? 'yellow'
                                    : item.status === 'accepted'
                                    ? 'blue'
                                    : item.status === 'cancelled' ||
                                      item.status === 'rejected'
                                    ? 'red'
                                    : item.status === 'complete'
                                    ? 'green'
                                    : theme.colors.surface
                            }
                            uri={
                                item.user.profilePic ||
                                'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png'
                            }
                            body={
                                <View>
                                    <Text style={styles.textTitle}>
                                        {item.user.firstName}{' '}
                                        {item.user.lastName}
                                    </Text>
                                    <Text style={styles.textBody}>
                                        {item.oneDay !== true
                                            ? item.continuous !== true
                                                ? `${new Date(
                                                      item.startDate
                                                  ).toLocaleDateString()} to ${new Date(
                                                      item.endDate
                                                  ).toLocaleDateString()}`
                                                : `${new Date(
                                                      item.startDate
                                                  ).toLocaleDateString()} onwards`
                                            : `on ${new Date(
                                                  item.startDate
                                              ).toLocaleDateString()}`}
                                    </Text>
                                    <Text style={styles.textBody}>
                                        {item.allDay !== true
                                            ? `${new Date(
                                                  item.startTime
                                              ).toLocaleTimeString()} to ${new Date(
                                                  item.endTime
                                              ).toLocaleTimeString()}`
                                            : `All Day`}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 5,
                                        }}
                                    >
                                        <Text style={styles.textHighlight}>
                                            STATUS :{' '}
                                        </Text>
                                        <Text style={styles.textHighlightBold}>
                                            {item.status}
                                        </Text>
                                    </View>

                                    {item.status === 'pending' && (
                                        <View style={styles.buttonContainer}>
                                            <ThemeButton
                                                title={'Accept'}
                                                onPress={() =>
                                                    handleAcceptClick(item)
                                                }
                                            />
                                            <ThemeButton
                                                title={'Reject'}
                                                onPress={() =>
                                                    handleRejectClick(item)
                                                }
                                            />
                                        </View>
                                    )}
                                </View>
                            }
                        />
                    </Animated.View>
                )}
            />
        </View>
    );
};

export default MyServicesContainer;
