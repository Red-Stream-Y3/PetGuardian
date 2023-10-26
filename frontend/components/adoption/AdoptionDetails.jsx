import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { Suspense } from 'react';
import { getAppContext } from '../../context/AppContext';
import { ScrollView } from 'react-native-gesture-handler';
import getThemeContext from '../../context/ThemeContext';
import ThemebackButton from '../common/ThemeBackButton';
import ThemeChip from '../common/ThemeChip';
import ImageItemCard from '../common/ImageItemCard';
import ThemeButton from '../common/ThemeButton';
import ImageSlider from './ImageSlider';

const AdoptionDetails = ({ route, navigation }) => {
  const { petData } = route.params;
  const { theme, tabColor } = getThemeContext();
  const { user } = getAppContext();

  const handleBtnClick = () => {
    navigation.navigate('AdoptionApplication', { petData });
  };
  const styles = StyleSheet.create({
    pageHeader: {
      marginTop: 18,
      color: theme.colors.text,
      fontSize: 22,
      fontWeight: 'bold',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    detailsOne: {
      width: '90%', // 80% of the screen width
      alignSelf: 'center', // Center the view horizontally
      marginVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderRadius: 10, // Border radius
      borderWidth: 2, // Border width
      borderColor: '#E1525F', // Border color
      shadowColor: '#000', // Shadow color
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      padding: 15, // Padding inside the view
    },
    columnStyle: {
      flexDirection: 'column',
      alignContent: 'flex-start',
    },
    detailsHeader: {
      fontWeight: 'bold',
      color: 'gray',
      marginBottom: 5,
      color: theme.colors.text,
    },
    normalText: {
      color: theme.colors.text,
      fontSize: 16,
    },
    container2: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 18,
    },
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.pageHeader}>{petData?.name}</Text>
      </View>

      <ThemebackButton navigation={navigation} />

      <Suspense fallback={<ActivityIndicator />}>
        <ScrollView style={{ width: '100%' }}>
          <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
            <ImageSlider images={petData?.image} />
          </View>

          <View style={styles.detailsOne}>
            <View style={styles.columnStyle}>
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: 20,
                  fontWeight: '700',
                }}
              >
                {petData?.name}
              </Text>
              <Text style={[styles.normalText, { marginTop: 6 }]}>
                {petData?.breed}
              </Text>
            </View>
            <View style={styles.columnStyle}>
              <Text style={[styles.normalText, { paddingTop: 12 }]}>
                {`📍` +
                  petData?.location.split(',')[0] +
                  `, ` +
                  petData?.location.split(',')[1]}
              </Text>
            </View>
          </View>

          <View style={styles.detailsOne}>
            <View style={styles.columnStyle}>
              <Text style={styles.detailsHeader}>Age</Text>
              <Text
                style={[
                  styles.normalText,
                  { marginTop: 6, alignSelf: 'center' },
                ]}
              >
                {petData?.age +
                  ` ` +
                  (petData?.age === 1 ? 'year' : 'years') +
                  ` old`}
              </Text>
            </View>
            <View style={styles.columnStyle}>
              <Text style={styles.detailsHeader}>Gender</Text>
              <Text
                style={[
                  styles.normalText,
                  { marginTop: 6, alignSelf: 'center' },
                ]}
              >
                {petData?.gender
                  ? petData.gender.charAt(0).toUpperCase() +
                    petData.gender.slice(1)
                  : ''}
              </Text>
            </View>
            <View style={styles.columnStyle}>
              <Text style={styles.detailsHeader}>Vaccinated</Text>
              <Text
                style={[
                  styles.normalText,
                  { marginTop: 6, alignSelf: 'center' },
                ]}
              >
                {petData?.vaccinated ? 'Yes' : 'No'}
              </Text>
            </View>
          </View>
          <View style={styles.container2}>
            <Text style={styles.detailsHeader}>Description</Text>
            <Text style={styles.normalText}>{petData?.description}</Text>
          </View>

          <View style={styles.container2}>
            <Text style={styles.detailsHeader}>
              Health Status:{' '}
              {petData?.healthStatus
                ? petData.healthStatus.charAt(0).toUpperCase() +
                  petData.healthStatus.slice(1)
                : ''}
            </Text>
            <Text style={styles.normalText}>{petData?.healthDescriptiopn}</Text>
          </View>

          <View style={styles.container2}>
            <Text style={styles.detailsHeader}>Posted By</Text>
          </View>

          <View style={styles.container2}>
            <ThemeButton
              textSize={16}
              title="   Adopt   "
              onPress={handleBtnClick}
            />
          </View>
        </ScrollView>
      </Suspense>
    </View>
  );
};

export default AdoptionDetails;
