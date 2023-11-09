import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {QueryClientProvider} from 'react-query';
import RootNavigator from './src/navigation/RootNavigator';
import {queryClient} from './src/react-query-hooks/react-query-configs';
import {GlobalStyles} from './src/theme/GlobalStyles';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={[GlobalStyles.defaultScreenView, backgroundStyle]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <RootNavigator />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

export default App;
