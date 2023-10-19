import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Switch,
    Dimensions,
    FlatList,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import {
    FloatingMenuButton,
    ImageItemCard,
    ThemeButton,
} from '../../components';
import getThemeContext from '../../context/ThemeContext';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = () => {
    const { theme } = getThemeContext();

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.colors.background }}
        >
            <StatusBar
                barStyle={
                    theme.mode === 'dark' ? 'light-content' : 'dark-content'
                }
                hidden={false}
            />
            <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
                <FloatingMenuButton />
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: '5%',
                    }}
                >
                    <Text
                        style={{
                            color: theme.colors.text,
                            fontWeight: 'bold',
                            fontSize: 18,
                        }}
                    >
                        Feed
                    </Text>
                </View>
                <ScrollView
                    style={{ width: '100%' }}
                    contentContainerStyle={{ alignItems: 'center' }}
                ></ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
