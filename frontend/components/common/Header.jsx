import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ThemebackButton from './ThemeBackButton';
import getThemeContext from '../../context/ThemeContext';
import PetFilter from './PetFilter';

const Header = ({
  title,
  onFilterPress,
  petTypes,
  onSavePress,
  navigation,
}) => {
  const { theme } = getThemeContext();
  const navigate = useNavigation();

  const handleBackPress = () => {
    navigate.goBack();
  };

  const handleSavePress = () => {
    onSavePress();
    navigate.goBack();
  };

  return (
    <>
      <ThemebackButton customBackAction={handleBackPress} top={1} />
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Text>Back</Text>
          </TouchableOpacity> */}
          <View style={styles.titleContainer}>
            <Text style={{ color: theme.colors.text, ...styles.title }}>
              {title}
            </Text>
          </View>
          {onSavePress && (
            <TouchableOpacity
              onPress={handleSavePress}
              style={styles.rightButton}
            >
              <Ionicons
                name="md-send"
                size={26}
                color={theme.colors.lostPrimary}
              />
            </TouchableOpacity>
          )}
        </View>
        {petTypes && (
          <PetFilter petTypes={petTypes} onFilterPress={onFilterPress} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 5,
  },
  rightButton: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
