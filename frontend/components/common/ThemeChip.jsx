import { Pressable, Text, View } from "react-native";


const ThemeChip = ({ clickable, onClick, text }) => {
    return(
        <View>
            <Pressable>
                <Text>
                    {text}
                </Text>
            </Pressable>
        </View>
    );
};

export default ThemeChip;