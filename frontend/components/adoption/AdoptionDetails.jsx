import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { Suspense } from 'react';
import FloatingMenuButton from '../common/FloatingMenuButton';
import { getAppContext } from '../../context/AppContext';
import { ScrollView } from 'react-native-gesture-handler';
import getThemeContext from '../../context/ThemeContext';
import ThemebackButton from '../common/ThemeBackButton';
import ThemeChip from '../common/ThemeChip';
import ImageItemCard from '../common/ImageItemCard';
import ThemeButton from '../common/ThemeButton';

const AdoptionDetails = ({ route, navigation }) => {
  const { petData } = route.params;
  const { theme, tabColor } = getThemeContext();
  const { user } = getAppContext();

  //console.log(petData);

  const styles = StyleSheet.create({
    petNametxt: {
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
      marginVertical: 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    columnStyle: {
      flexDirection: 'column',
      alignContent: 'flex-start',
    },
    detailsHeader: {
      fontWeight: 'bold',
      color: 'gray',
      marginBottom: 5,
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
        <Text style={styles.petNametxt}>{petData?.name}</Text>
      </View>

      <ThemebackButton navigation={navigation} />

      <Suspense fallback={<ActivityIndicator />}>
        <ScrollView style={{ width: '100%' }}>
          <View style={{ width: '100%', alignItems: 'center', marginTop: 15 }}>
            <ImageItemCard
              width={Dimensions.get('window').width * 0.9}
              uri={petData?.image[0]}
            />
          </View>

          <View style={styles.detailsOne}>
            <View style={styles.columnStyle}>
              <Text style={{ fontSize: 20, fontWeight: '700' }}>
                {petData?.name}
              </Text>
              <Text style={{ fontSize: 16 }}>{petData?.breed}</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 20, fontWeight: '700' }}></Text>
              <Text style={{ fontSize: 16 }}>
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
              <Text>
                {petData?.age +
                  ` ` +
                  (petData?.age === 1 ? 'year' : 'years') +
                  ` old`}
              </Text>
            </View>
            <View style={styles.columnStyle}>
              <Text style={styles.detailsHeader}>Gender</Text>
              <Text>
                {petData?.gender
                  ? petData.gender.charAt(0).toUpperCase() +
                    petData.gender.slice(1)
                  : ''}
              </Text>
            </View>
            <View style={styles.columnStyle}>
              <Text style={styles.detailsHeader}>Vaccinated</Text>
              <Text>{petData?.vaccinated ? 'Yes' : 'No'}</Text>
            </View>
          </View>
          <View style={styles.container2}>
            <Text style={styles.detailsHeader}>Description</Text>
            <Text>{petData?.description}</Text>
          </View>

          <View style={styles.container2}>
            <Text style={styles.detailsHeader}>
              Health Status:{' '}
              {petData?.healthStatus
                ? petData.healthStatus.charAt(0).toUpperCase() +
                  petData.healthStatus.slice(1)
                : ''}
            </Text>
            <Text>{petData?.healthDescriptiopn}</Text>
          </View>

          <View style={styles.container2}>
            <Text style={styles.detailsHeader}>Posted By</Text>
          </View>

          <View style={styles.container2}>
            <ThemeButton textSize={16} title="   Adopt   " onPress={() => {}} />
          </View>
        </ScrollView>
      </Suspense>
    </View>
  );
};

export default AdoptionDetails;
