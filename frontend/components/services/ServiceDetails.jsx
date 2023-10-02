import { Image, View } from "react-native";
import Animated from "react-native-reanimated";

const ServiceDetails = ({ service }) => {
    return (
        <View style={{flex:1}}>
            <Animated.Image 
                style={{
                    width: '100%',
                    height: '30%',
                }} 
                source={{ uri: service?.image || 'https://wallpapercave.com/wp/wp4928162.jpg' }}
                sharedTransitionTag="providerImg" />
        </View>
    );
};

export default ServiceDetails;