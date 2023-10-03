import { View } from 'react-native';
import getThemeContext from '../../../context/ThemeContext';
import AllPets from '../common/AllPets';
import { lostPetsData } from '../pets';

const FoundHome = () => {
  const { theme } = getThemeContext();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AllPets title="Found Pets" data={lostPetsData} />
    </View>
  );
};

export default FoundHome;
