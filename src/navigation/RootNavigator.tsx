import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationRoutes} from './NavigationRoutes';
import GiphyHomeScreen from '../screens/giphyHomeScreen/GiphyHomeScreen';
import {Gif} from '../api/types';
import GiphyDetailsScreen from '../screens/giphyDetailScreen/GiphyDetailsScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type StackNavigatorProps = {
  GiphyHomeScreen: undefined;
  GiphyDetailScreen: {selectedGif: Gif};
};
const AppStackNavigator = createStackNavigator<StackNavigatorProps>();
export type NavigationProps = NativeStackScreenProps<
  StackNavigatorProps,
  NavigationRoutes.GiphyDetailScreen
>;

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStackNavigator.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={NavigationRoutes.GiphyHomeScreen}>
        <AppStackNavigator.Screen
          name={NavigationRoutes.GiphyHomeScreen}
          component={GiphyHomeScreen}
        />
        <AppStackNavigator.Screen
          name={NavigationRoutes.GiphyDetailScreen}
          component={GiphyDetailsScreen}
        />
      </AppStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
