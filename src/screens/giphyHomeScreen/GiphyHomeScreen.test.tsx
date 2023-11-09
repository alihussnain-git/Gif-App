import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';
import GiphyHomeScreen from './GiphyHomeScreen';
import {useGetRandomGiphy} from '../../react-query-hooks/useGetRandomGif';
import {useSearchGif} from '../../react-query-hooks/useSearchGif';
import {strings} from '../../locale/strings';
import {useDebounce} from '../../utils/hooks/useDebounce';
import {useInterval} from '../../utils/hooks/useInterval';
import {TEST_IDS} from '../../utils/testIDs';
import {NavigationRoutes} from '../../navigation/NavigationRoutes';

const mockedNavigate = jest.fn();

const mockSearchResults = [
  {
    id: '1',
    images: {
      fixed_height: {
        url: 'mocked-search-gif-url-1',
      },
    },
  },
  {
    id: '2',
    images: {
      fixed_height: {
        url: 'mocked-search-gif-url-2',
      },
    },
  },
];

// Mock the useGetRandomGiphy hook
jest.mock('../../react-query-hooks/useGetRandomGif');
const mockedUseGetRandomGiphy = useGetRandomGiphy as jest.Mock;

// Mock the useSearchGif hook
jest.mock('../../react-query-hooks/useSearchGif');
const mockedUseSearchGif = useSearchGif as jest.Mock;

// Mock the useDebounce hook
jest.mock('../../utils/hooks/useDebounce');
const mockedUseDebounce = useDebounce as jest.Mock;

// Mock the useInterval hook
jest.mock('../../utils/hooks/useInterval');
const mockedUseInterval = useInterval as jest.Mock;

//mock navigation
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('GiphyHomeScreen', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  const renderGiphyHomeScreen = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <GiphyHomeScreen />
        </NavigationContainer>
      </QueryClientProvider>,
    );
  };

  it('renders loading indicator while fetching random gif', () => {
    mockedUseGetRandomGiphy.mockReturnValue({isLoading: true});
    mockedUseSearchGif.mockReturnValue({data: [], isLoading: true});
    mockedUseDebounce.mockReturnValue('');

    const {getByTestId} = renderGiphyHomeScreen();

    expect(getByTestId(TEST_IDS.LOADING_INDICATOR)).toBeTruthy();
  });

  it('renders error message if there is an error fetching random gif', async () => {
    mockedUseGetRandomGiphy.mockReturnValue({isError: true});
    mockedUseSearchGif.mockReturnValue({data: [], isLoading: false});

    const {queryByText} = renderGiphyHomeScreen();

    const errorMessage = await queryByText(strings.common.error);
    expect(errorMessage).toBeTruthy();
  });

  it('renders random gif when isLoading and isError are false', () => {
    const mockRandomGif = {
      images: {
        fixed_height: {
          url: 'mocked-random-gif-url',
        },
      },
      title: 'Mocked Random Gif Title',
      bitly_url: 'mocked-bitly-url',
      rating: 'PG-13',
    };
    mockedUseGetRandomGiphy.mockReturnValue({data: mockRandomGif});
    mockedUseSearchGif.mockReturnValue({data: [], isLoading: false});
    mockedUseInterval.mockImplementation((callback, delay, isActive) => {
      if (isActive) {
        callback();
      }
    });

    const {getByText, getByTestId} = renderGiphyHomeScreen();

    expect(getByText(strings.home.gifHeading)).toBeTruthy();
    expect(getByTestId(TEST_IDS.GIF_IMAGE)).toBeTruthy();
  });

  it('renders search results when input is provided', async () => {
    mockedUseSearchGif.mockReturnValue({
      data: mockSearchResults,
      refetch: jest.fn(),
    });
    mockedUseDebounce.mockReturnValue('mocked-search-query');
    mockedUseInterval.mockImplementation((callback, delay, isActive) => {
      if (isActive) {
        callback();
      }
    });

    const {queryByTestId, getByPlaceholderText} = renderGiphyHomeScreen();

    const searchInput = getByPlaceholderText(
      strings.home.gifSearchInputPlaceHolder,
    );
    fireEvent.changeText(searchInput, 'mocked-search-query');

    await waitFor(() => {
      expect(queryByTestId(TEST_IDS.SEARCH_RESULTS_LIST)).toBeTruthy();
    });
  });

  it('renders error message when search gif fetch fails', async () => {
    mockedUseSearchGif.mockReturnValue({isError: true, refetch: jest.fn()});
    mockedUseDebounce.mockReturnValue('mocked-search-query');
    mockedUseInterval.mockImplementation((callback, delay, isActive) => {
      if (isActive) {
        callback();
      }
    });

    const {queryByText, getByPlaceholderText, queryByTestId} =
      renderGiphyHomeScreen();

    const searchInput = getByPlaceholderText(
      strings.home.gifSearchInputPlaceHolder,
    );
    fireEvent.changeText(searchInput, 'mocked-search-query');

    const errorMessage = await queryByText(strings.common.error);
    expect(errorMessage).toBeTruthy();
    expect(queryByTestId(TEST_IDS.SEARCH_RESULTS_LIST)).toBeFalsy();
  });
  it('navigates to GifDetailsScreen when tap in search results', async () => {
    mockedUseSearchGif.mockReturnValue({
      data: mockSearchResults,
      refetch: jest.fn(),
    });
    mockedUseDebounce.mockReturnValue('mocked-search-query');

    const {findAllByTestId} = renderGiphyHomeScreen();

    // Simulate opening gif detail
    const imageItems = await findAllByTestId(TEST_IDS.SEARCH_IMAGE);
    fireEvent.press(imageItems[0]);

    // Assert that the navigation to GiphyDetailScreen occurred
    expect(mockedNavigate).toHaveBeenCalledWith(
      NavigationRoutes.GiphyDetailScreen,
      {selectedGif: mockSearchResults[0]},
    );
  });
});
