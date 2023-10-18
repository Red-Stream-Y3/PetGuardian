import { StyleSheet, View } from 'react-native';
import ThemeChip from './ThemeChip';
import { useEffect, useState } from 'react';

const ThemeChipList = ({
  data,
  defaultIndex,
  multiSelect,
  activeList,
  allActive
}) => {
  const [clickIndex, setClickIndex] = useState(defaultIndex || 0);
  const [activeChips, setActiveChips] = useState(
    activeList || new Array(data.length).fill(false)
  );

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

  useEffect(() => {
    if (multiSelect !== true)
      setActiveChips(activeChips.map((chip, index) => index === clickIndex));
  }, [clickIndex]);

  return (
    <View style={styles.container}>
      {multiSelect === true
        ? data.map((item, index) => (
            <ThemeChip
              key={index}
              text={item.text}
              clickable={true}
              active={activeChips[index]}
              onClick={() => {
                const newActiveChips = [...activeChips];
                newActiveChips[index] = !newActiveChips[index];
                setActiveChips(newActiveChips);
                item.onClick();
              }}
            />
          ))
        : data.map((item, index) => (
            <ThemeChip
              key={index}
              text={item.text}
              clickable={true}
              active={allActive === true ? true : activeChips[index]}
              onClick={() => {
                setClickIndex(index);
                item.onClick();
              }}
            >
              {item.children}
            </ThemeChip>
          ))}
    </View>
  );
};

export default ThemeChipList;
