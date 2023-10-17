import { View } from 'react-native';
import getThemeContext from '../../../context/ThemeContext';
import AllPets from '../common/AllPets';
import { lostPetsData } from '../pets';

const LostHome = () => {
    const { theme } = getThemeContext();

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <AllPets title="Lost Pets" data={lostPetsData} />
        </View>
    );
};

export default LostHome;
