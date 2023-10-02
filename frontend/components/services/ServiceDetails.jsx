import { Image, View } from "react-native";
import Animated from "react-native-reanimated";

const ServiceDetails = ({ navigation, route }) => {

    const { service } = route.params;
    
    return (
        <View style={{flex:1}}>
            <Animated.Image 
                style={{
                    width: '100%',
                    height: '30%',
                }} 
                source={{ uri: service?.image || 'https://wallpapercave.com/wp/wp4928162.jpg' }}
                sharedTransitionTag={service?._id} />
        </View>
    );
};

export default ServiceDetails;