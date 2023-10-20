import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { getAppContext } from '../../context/AppContext';

const ThemeButton = ({
  children,
  onPress,
  title,
  padding,
  variant,
  textSize,
  borderRadius,
  loading,
}) => {
  const { theme } = getThemeContext();
  const { tabColor } = getAppContext();

  const styles = StyleSheet.create({
    filled: {
      backgroundColor: tabColor,
      overflow: 'hidden',
      borderRadius: borderRadius || 5,
      elevation: 3,
      margin: 5,
    },
    outlined: {
      borderColor: tabColor,
      borderWidth: 1,
      overflow: 'hidden',
      borderRadius: borderRadius || 5,
      margin: 5,
    },
    clear: {
      overflow: 'hidden',
      borderRadius: borderRadius || 5,
      margin: 5,
    },
    ripple: {
      color:
        variant === 'clear' || variant === 'outlined'
          ? tabColor
          : theme.colors.ripple,
    },
    PressableContainer: {
      padding: padding || 10,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      width: 'auto',
    },
    text: {
      fontSize: textSize || 14,
      marginHorizontal: 2,
      marginStart: children ? 5 : 2,
      fontWeight: 'bold',
      color:
        variant === 'clear'
          ? theme.colors.text
          : variant === 'outlined'
          ? tabColor
          : theme.colors.buttonText,
    },
  });

  return (
    <Animated.View
      style={
        variant === 'clear'
          ? styles.clear
          : variant === 'outlined'
          ? styles.outlined
          : styles.filled
      }
    >
      <Pressable
        android_ripple={styles.ripple}
        style={styles.PressableContainer}
        onPress={onPress || (() => {})}
      >
        {loading === true && (
          <ActivityIndicator
            size={textSize || 14}
            color={variant === 'clear' ? tabColor : theme.colors.primaryIcon}
          />
        )}
        {children}
        {title && <Text style={styles.text}>{title}</Text>}
      </Pressable>
    </Animated.View>
  );
};

export default ThemeButton;
