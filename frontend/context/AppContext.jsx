import { createContext, useContext, useEffect, useState } from "react";
import getThemeContext from "./ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export const AppContext = createContext();

export const AppContextProvider = ({ children, value }) => {
    const { theme } = getThemeContext();
    const [selectedTab, setSelectedTab] = useState(2);
    const [tabColor, setTabColor] = useState(theme.colors.homePrimary);
    const [loadingUser, setLoadingUser] = useState(false);
    const [user, setUser] = useState(null);
    const SERVER_URL = "http://192.168.1.175:9120"; //"https://pet-shop-backend-ukkxew3r5q-uc.a.run.app";
    const APP_NAME = "Pet Guardian";

    useEffect(() => {
        let color;
        switch (selectedTab) {
            case 0: {
                color = theme.colors.servicesPrimary;
                break;
            }
            case 1: {
                color = theme.colors.lostPrimary;
                break;
            }
            case 2: {
                color = theme.colors.homePrimary;
                break;
            }
            case 3: {
                color = theme.colors.adoptPrimary;
                break;
            }
            case 4: {
                color = theme.colors.playPrimary;
                break;
            }
        }
        setTabColor(color);
    }, [selectedTab, theme]);

    const getUser = async () => {
        setLoadingUser(true);
        try {
            const savedUser = await AsyncStorage.getItem("user");
            if (savedUser) {
                setUser(JSON.parse(savedUser));
                // console.log("UserToken: ", JSON.parse(savedUser).token);
            } else {
                setUser({});
            }
            setLoadingUser(false);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Could not get user data",
            });
            setLoadingUser(false);
        }
    };

    const storeUser = async (userData) => {
        try {
            setUser(userData);
            await AsyncStorage.setItem("user", JSON.stringify(userData));
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Could not store user data",
            });
        }
    };

    const removeUser = async () => {
        try {
            await AsyncStorage.removeItem("user");
            setUser(null);
            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Signed out!",
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Could not remove user data",
            });
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AppContext.Provider
            value={{
                selectedTab,
                setSelectedTab,
                SERVER_URL,
                tabColor,
                user,
                loadingUser,
                setLoadingUser,
                storeUser,
                removeUser,
                APP_NAME,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export const getAppContext = () => useContext(AppContext);
