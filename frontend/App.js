import 'react-native-gesture-handler';
import { ThemeProvider } from './context/ThemeContext';
import { AppContextProvider } from './context/AppContext';
import { NavigationComponent } from './screens';
import registerNNPushToken from 'native-notify';

const App = () => {
  registerNNPushToken(14016, 'SBCCyNEJCwfgYrkVTwmNut');

  return (
    <ThemeProvider>
      <AppContextProvider>
        <NavigationComponent />
      </AppContextProvider>
    </ThemeProvider>
  );
};

export default App;
