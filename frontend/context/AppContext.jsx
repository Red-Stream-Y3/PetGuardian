import { createContext, useContext, useEffect, useState } from "react";
import getThemeContext from "./ThemeContext";

export const AppContext = createContext();

export const AppContextProvider = ({ children, value }) => {
    const { theme } = getThemeContext();
    const [selectedTab, setSelectedTab] = useState(2);
    const [tabColor, setTabColor] = useState(theme.colors.homePrimary);
    const SERVER_URL = "https://pet-shop-backend-ukkxew3r5q-uc.a.run.app";
    //TODO: remove temp user
    const USER = {
        _id: "6519178b1a22eacde138ed61",
    };

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

    return (
        <AppContext.Provider
            value={{ selectedTab, setSelectedTab, SERVER_URL, tabColor, USER }}>
            {children}
        </AppContext.Provider>
    );
};

export const getAppContext = () => useContext(AppContext);
