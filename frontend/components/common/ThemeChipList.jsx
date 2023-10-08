import { View } from "react-native";
import ThemeChip from "./ThemeChip";
import { useEffect, useState } from "react";

const ThemeChipList = ({ data, defaultIndex, multiSelect, activeList }) => {
    const [clickIndex, setClickIndex] = useState(defaultIndex || 0);
    const [activeChips, setActiveChips] = useState(
        activeList || new Array(data.length).fill(false)
    );

    useEffect(() => {
        if (multiSelect !== true)
            setActiveChips(
                activeChips.map((chip, index) => index === clickIndex)
            );
    }, [clickIndex]);
    return (
        <View
            style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
            }}>
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
                          active={activeChips[index]}
                          onClick={() => {
                              setClickIndex(index);
                              item.onClick();
                          }}
                      />
                  ))}
        </View>
    );
};

export default ThemeChipList;
