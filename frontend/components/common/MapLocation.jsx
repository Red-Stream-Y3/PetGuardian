import React, { Suspense, useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const MapLocation = ({ onMarkerChange }) => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 6.9271,
    longitude: 79.8612,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [markerTitle, setMarkerTitle] = useState('');
  const mapViewRef = React.useRef(null);

  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission to access location was denied');
      }

      const { coords } = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      const address = await Location.reverseGeocodeAsync(coords);

      const streetNumber = address[0]?.streetNumber
        ? `${address[0]?.streetNumber}, `
        : '';
      const streetName = address[0]?.street ? `${address[0]?.street}, ` : '';
      const city = address[0]?.city ? `${address[0]?.city}, ` : '';
      const country = address[0]?.country ? `${address[0]?.country}, ` : '';

      const formattedAddress =
        `${streetNumber}${streetName}${city}${country}`.replace(/,\s*$/, '');

      setMapRegion({
        ...coords,
        latitudeDelta: 1.5,
        longitudeDelta: 1.5,
      });

      setMarkerCoordinate(coords);
      // onMarkerChange(formattedAddress);
      setMarkerTitle(formattedAddress);

      mapViewRef.current?.animateToRegion({
        ...coords,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkerDragEnd = async (e) => {
    const { coordinate } = e.nativeEvent;

    try {
      const address = await Location.reverseGeocodeAsync(coordinate);

      const streetNumber = address[0]?.streetNumber
        ? `${address[0]?.streetNumber}, `
        : '';
      const streetName = address[0]?.street ? `${address[0]?.street}, ` : '';
      const city = address[0]?.city ? `${address[0]?.city}, ` : '';
      const country = address[0]?.country ? `${address[0]?.country}, ` : '';

      const formattedAddress =
        `${streetNumber}${streetName}${city}${country}`.replace(/,\s*$/, '');

      setMarkerCoordinate(coordinate);
      // onMarkerChange(formattedAddress);
      setMarkerTitle(formattedAddress);

      mapViewRef.current?.animateToRegion({
        ...coordinate,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleLocateButtonPress = async () => {
    await fetchLocation();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Location</Text>
      <View style={styles.mapContainer}>
        <Suspense fallback={<ActivityIndicator />}>
          <MapView ref={mapViewRef} style={styles.map} region={mapRegion}>
            {markerCoordinate && (
              <Marker
                coordinate={markerCoordinate}
                title={markerTitle}
                draggable={true}
                onDragEnd={handleMarkerDragEnd}
              />
            )}
          </MapView>
          <View style={styles.gpsButtonContainer}>
            <TouchableOpacity
              style={styles.gpsButton}
              onPress={handleLocateButtonPress}
            >
              <MaterialCommunityIcons
                name="crosshairs-gps"
                size={22}
                color="#3c74c2"
              />
            </TouchableOpacity>
          </View>
        </Suspense>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '40%',
    marginTop: 40,
    padding: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  mapContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: '#808080',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  gpsButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  gpsButton: {
    backgroundColor: 'white',
    borderRadius: 32,
    padding: 8,
  },
});

export default MapLocation;
