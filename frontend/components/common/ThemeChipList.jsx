import { View } from "react-native";
import ThemeChip from "./ThemeChip";
import { useEffect, useState } from "react";


const ThemeChipList = ({ data, defaultIndex }) => {
    const [ clickIndex, setClickIndex ] = useState(defaultIndex || 0);
    const [ activeChips, setActiveChips ] = useState(new Array(data.length).fill(false));

    useEffect(() => {
        setActiveChips(activeChips.map((chip, index) => index === clickIndex));
    }, [clickIndex]);
    return (
        <View
            style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
            }}>
            {data.map((item, index) => (
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