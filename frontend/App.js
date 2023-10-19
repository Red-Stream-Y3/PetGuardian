import 'react-native-gesture-handler';
import { ThemeProvider } from './context/ThemeContext';
import { AppContextProvider } from './context/AppContext';
import { NavigationComponent } from './screens';

const App = () => {
  return (
    <ThemeProvider>
      <AppContextProvider>
        <NavigationComponent />
      </AppContextProvider>
    </ThemeProvider>
  );
};

export default App;
