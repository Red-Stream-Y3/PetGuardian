import React from "react";
import {
    TextInput,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import getThemeContext from "../../context/ThemeContext";
import FloatingMenuButton from "./FloatingMenuButton";

const Search = ({ navigation, image }) => {
    const { theme } = getThemeContext();

    const styles = StyleSheet.create({
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            marginBottom: 10,
            marginLeft: 2,
            marginTop: 2,
        },
        searchBar: {
            flex: 1,
            height: 40,
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
            borderRadius: 10,
            paddingHorizontal: 16,
            elevation: 5,
            marginTop: 3,
            marginEnd: 50,
        },
        userProfileImage: {
            width: 40,
            height: 40,
            borderRadius: 20,
            marginLeft: 20,
        },
    });

    return (
        <View style={styles.header}>
            <TextInput
                placeholderTextColor={theme.colors.text}
                placeholder='Search'
                style={styles.searchBar}
            />
            <FloatingMenuButton navigation={navigation} />
            {/* <TouchableOpacity
                onPress={() => navigation.getParent().getParent().openDrawer()}>
                <Image
                    style={styles.userProfileImage}
                    source={{
                        uri: image
                            ? uri
                            : "https://wallpaperbat.com/img/609256-anime-boy-power-up-wallpaper.jpg",
                    }}
                />
            </TouchableOpacity> */}
        </View>
    );
};

export default Search;
