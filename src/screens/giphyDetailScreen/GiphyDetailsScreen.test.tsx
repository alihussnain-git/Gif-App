import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import GiphyDetailsScreen from './GiphyDetailsScreen';
import {RouteProp} from '@react-navigation/native';
import {StackNavigatorProps} from '../../navigation/RootNavigator';
import {NavigationRoutes} from '../../navigation/NavigationRoutes';
import {openBrowser} from '../../utils/openBrowser';
import {TEST_IDS} from '../../utils/testIDs';

const mockSelectedGif = {
  id: '123',
  bitly_url: 'https://example.com',
  title: 'Mocked Gif Title',
  rating: 'PG-13',
  images: {
    fixed_height: {
      url: 'https://example.com/gif-url',
      height: '200', // Add height, width, and other properties as needed
      width: '200',
    },
  },
};

const navigationMock = jest.fn();
const routeMock: RouteProp<
  StackNavigatorProps,
  NavigationRoutes.GiphyDetailScreen
> = {
  key: '',
  name: NavigationRoutes.GiphyDetailScreen,
  params: {
    selectedGif: mockSelectedGif,
  },
};

const mockBackButton = jest.fn();

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    goBack: mockBackButton, // Mock the goBack function
  }),
}));

// Mock the openBrowser function
jest.mock('../../utils/openBrowser', () => ({
  openBrowser: jest.fn(),
}));

describe('GiphyDetailsScreen', () => {
  const renderGifDetails = () => {
    return render(
      <GiphyDetailsScreen
        route={routeMock}
        navigation={navigationMock as any}
      />,
    );
  };
  it('renders the screen with a back button and GIF', () => {
    const {getByTestId, getByText} = renderGifDetails();

    // Ensure the back button is rendered
    const backButton = getByTestId(TEST_IDS.BACK_BUTTON);
    expect(backButton).toBeTruthy();

    // Ensure the GIF content is displayed
    const gifTitle = getByText(mockSelectedGif.title);
    expect(gifTitle).toBeTruthy();
  });

  it('handles the back button press', () => {
    const {getByTestId} = renderGifDetails();

    // Find and click the back button
    const backButton = getByTestId(TEST_IDS.BACK_BUTTON);
    fireEvent.press(backButton);

    // Ensure that the goBack function was called
    expect(mockBackButton).toHaveBeenCalled();
  });

  it('handles the link press', () => {
    const {getByTestId} = renderGifDetails();

    // Find and click the link
    const link = getByTestId(TEST_IDS.LINK);
    fireEvent.press(link);

    // Ensure that the openBrowser function was called with the correct URL
    expect(openBrowser).toHaveBeenCalledWith(mockSelectedGif.bitly_url);
  });
});
