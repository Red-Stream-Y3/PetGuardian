import { Text } from 'react-native';
import React, { useState } from 'react';
import MapLocation from './MapLocation';

const MarkerTitle = () => {
  const [markerTitle, setMarkerTitle] = useState('');

  const handleMarkerChange = (title) => {
    setMarkerTitle(title);
  };

  return (
    <>
      <MapLocation onMarkerChange={handleMarkerChange} />
      {/* <Text>{markerTitle}</Text> */}
    </>
  );
};

export default MarkerTitle;
