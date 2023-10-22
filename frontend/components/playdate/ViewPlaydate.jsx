import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getPlayDateById } from '../../services/PlayDateServices';
import getThemeContext from '../../context/ThemeContext';
import getAppContext from '../../context/AppContext';

const ViewPlaydate = () => {
  const { theme } = getThemeContext();
  const { user } = getAppContext();

  const { id } = route.params;

  const [playdate, setPlaydate] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    getPlayDateById(id)
      .then((res) => {
        setPlaydate(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.headerContainer}>
          <Text style={[styles.sectionHeader, { color: theme.colors.text }]}>
            {playdate.name}
          </Text>
        </View>
        <View style={styles.cardContainer}></View>
      </ScrollView>
    </View>
  );
};

export default ViewPlaydate;
