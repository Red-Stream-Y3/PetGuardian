import { Pressable, Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";


const RoundIconButton = ({children, padding, name, onPress}) => {
    const {theme} = getThemeContext();
    return (
        <View style={{
            alignItems:'center',
            maxWidth: '20%',
            width: '20%',
            }}>
            <Pressable 
                onPress={onPress || (()=>{})}
                android_ripple={{
                    color:theme.colors.ripple,
                    borderless:true,
                    radius: 40,
                }}
                style={{
                    width: '100%',
                    height: '100em',
                    padding: padding || 10,
                    alignItems:'center',
                }} >
                {children}
                <Text style={{fontWeight:'bold'}}>{name}</Text>
            </Pressable>
        </View>
    );
};

export default RoundIconButton;