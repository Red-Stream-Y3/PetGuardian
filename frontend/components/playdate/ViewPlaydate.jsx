import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import ProfileCard from '../common/ProfileCard';
import { getPlayDateById } from '../../services/PlayDateServices';

const ViewPlaydate = ({ route }) => {
  const [playdate, setPlaydate] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = route.params;
  console.log('id', id);

  useEffect(() => {
    const fetchPlaydate = async () => {
      const data = await getPlayDateById(id);
      setPlaydate(data);
      setLoading(false);
    };
    fetchPlaydate();
  }, []);

  console.log('playdate', playdate);

  return (
    <View>
      <Text>View Playdate</Text>
      {!loading && (
        <ProfileCard
          name={playdate.user.name}
          location={playdate.user.country}
          profileImage={playdate.user.profilePic}
        />
      )}
    </View>
  );
};

export default ViewPlaydate;
