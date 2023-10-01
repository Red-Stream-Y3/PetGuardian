import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import Search from "../common/Search";
import getThemeContext from "../../context/ThemeContext";
import { getAppContext } from "../../context/AppContext";
import { Suspense, useState } from "react";
import axios from "axios";
import ImageItemCard from "../common/ImageItemCard";

const ServicesHome = () => {
    const { theme } = getThemeContext();
    const { SERVER_URL } = getAppContext();
    const [ providers, setProviders ] = useState([]);

    const getProviders = async () => {
        try {
            console.debug(SERVER_URL)
            const response = await axios.get(`${SERVER_URL}/api/v1/services`);
            setProviders(response.data);
            console.debug(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useState(() => {
        getProviders();
    }, []);

    return (
        <View style={styles.container}>
            <Search />
            <Suspense fallback={<ActivityIndicator />}>
                <FlatList
                data={providers}
                renderItem={(item, i) => (
                    <ImageItemCard 
                        key={i} 
                        style="side" 
                        body={
                            <View>
                                <Text style={{ fontWeight: "bold", color:theme.colors.text }}>
                                    {item.firstName}
                                </Text>
                                <Text style={{ color:theme.colors.text }}>{item.description}</Text>
                            </View>
                        } />
                )} />
            </Suspense>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default ServicesHome;