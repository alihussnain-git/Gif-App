import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, Text, ActivityIndicator, TextInput, FlatList} from 'react-native';
import {useQueryClient} from 'react-query';
import {Gif} from '../../api/types';
import GifView from '../../components/GifView/GifView';
import {strings} from '../../locale/strings';
import {NavigationRoutes} from '../../navigation/NavigationRoutes';
import {StackNavigatorProps} from '../../navigation/RootNavigator';
import {GET_RANDOM_GIF} from '../../react-query-hooks/queries';
import {useGetRandomGiphy} from '../../react-query-hooks/useGetRandomGif';
import {useSearchGif} from '../../react-query-hooks/useSearchGif';
import {GlobalStyles} from '../../theme/GlobalStyles';
import {useDebounce} from '../../utils/hooks/useDebounce';
import {useInterval} from '../../utils/hooks/useInterval';
import {openBrowser} from '../../utils/openBrowser';
import {TEST_IDS} from '../../utils/testIDs';
import GifSearchItem from './components/GifSearchItem';
import SearchInput from './components/SearchInput';
import {styles} from './styles';

const REFRESH_GIF_TIMEOUT = 2000;
const SEARCH_DEBOUNCE_TIMEOUT = 300;

type navigationProps = NativeStackNavigationProp<
  StackNavigatorProps,
  NavigationRoutes.GiphyDetailScreen
>;

const GiphyHomeScreen: React.FC = () => {
  const queryClient = useQueryClient();
  const {data: randomGif, isLoading, isError} = useGetRandomGiphy();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const navigation = useNavigation<navigationProps>();
  const inputRef = useRef<TextInput | null>(null);

  const debouncedSearchQuery = useDebounce(
    searchQuery,
    SEARCH_DEBOUNCE_TIMEOUT,
  );

  const {
    data: searchResults,
    isLoading: isSearching,
    isError: searchError,
    refetch,
  } = useSearchGif(debouncedSearchQuery);

  useEffect(() => {
    const validSearchQuery = debouncedSearchQuery.length >= 2;

    if (validSearchQuery) {
      refetch();
    }
  }, [refetch, debouncedSearchQuery]);

  const memoizedSearchResults = useMemo(() => searchResults, [searchResults]);
  const memoizedRandomGif = useMemo(() => randomGif, [randomGif]);

  const hasSearchResults = searchResults && searchResults.length > 0;
  const shouldStartGifRefresh = !hasSearchResults && !isInputFocused;
  const shouldShowRandomGif = !searchQuery && !isInputFocused;
  const shouldShowClearSearchIcon = searchQuery.length > 0;
  const shouldShowCancelSearch = isInputFocused || shouldShowClearSearchIcon;

  useInterval(
    () => {
      queryClient.invalidateQueries(GET_RANDOM_GIF);
    },
    REFRESH_GIF_TIMEOUT,
    shouldStartGifRefresh, // Only activate the interval if not searching gif
  );

  const handleOnLinkPress = useCallback(() => {
    randomGif && openBrowser(randomGif?.bitly_url);
  }, [randomGif]);

  const handleOnPressSearchGif = useCallback(
    (gif: Gif) => {
      navigation.navigate(NavigationRoutes.GiphyDetailScreen, {
        selectedGif: gif,
      });
    },
    [navigation],
  );

  const handleCancelSearch = useCallback(() => {
    setSearchQuery('');
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, []);

  const handleFocus = useCallback(() => {
    setIsInputFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsInputFocused(false);
  }, []);

  return (
    <View style={[GlobalStyles.defaultScreenView, styles.mainContainer]}>
      <SearchInput
        ref={inputRef}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        addClearSearchCTA={shouldShowClearSearchIcon}
        addCancelSearchCTA={shouldShowCancelSearch}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        handleCancelSearch={handleCancelSearch}
      />

      {isLoading || isSearching ? (
        <View
          style={[
            GlobalStyles.defaultScreenView,
            GlobalStyles.centeredContent,
          ]}>
          <ActivityIndicator testID={TEST_IDS.LOADING_INDICATOR} />
        </View>
      ) : isError || searchError ? (
        <View
          style={[
            GlobalStyles.defaultScreenView,
            GlobalStyles.centeredContent,
          ]}>
          <Text style={styles.errorText}>{strings.common.error}</Text>
        </View>
      ) : (
        <>
          {shouldShowRandomGif && memoizedRandomGif && (
            <GifView
              randomGif={memoizedRandomGif}
              OnLinkPress={handleOnLinkPress}
            />
          )}
        </>
      )}
      {hasSearchResults && (
        <>
          <Text style={styles.headingSearchResults}>
            {strings.home.gifSearchResults}
          </Text>
          <FlatList
            testID={TEST_IDS.SEARCH_RESULTS_LIST}
            style={[styles.searchResultsContainer]}
            data={memoizedSearchResults}
            renderItem={({item}) => (
              <GifSearchItem
                item={item}
                onPress={() => handleOnPressSearchGif(item)}
              />
            )}
            keyExtractor={item => item.id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
};

export default GiphyHomeScreen;
