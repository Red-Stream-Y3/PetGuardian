import { createContext, useContext } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children, value }) => {
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export const getAppContext = () => useContext(AppContext);
