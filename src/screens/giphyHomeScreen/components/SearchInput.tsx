import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import Icon from '../../../components/icon/Icon';
import {strings} from '../../../locale/strings';
import appTheme from '../../../theme/appTheme';
import {styles} from '../styles';

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  addClearSearchCTA: boolean;
  addCancelSearchCTA: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
  handleCancelSearch: () => void;
}

const SearchInput = React.forwardRef<TextInput, SearchInputProps>(
  (
    {
      searchQuery,
      setSearchQuery,
      addClearSearchCTA,
      addCancelSearchCTA,
      handleFocus,
      handleBlur,
      handleCancelSearch,
    },
    ref,
  ) => (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchInputContainer}>
        <Icon
          icon="search"
          size={appTheme.icons.small}
          style={styles.searchIcon}
        />
        <TextInput
          ref={ref}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={strings.home.gifSearchInputPlaceHolder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={appTheme.colors.grey}
        />
        {addClearSearchCTA && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon
              icon="close"
              size={appTheme.icons.small}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      {addCancelSearchCTA && (
        <TouchableOpacity onPress={handleCancelSearch}>
          <Text style={styles.cancelText}>{strings.common.cancel}</Text>
        </TouchableOpacity>
      )}
    </View>
  ),
);

export default SearchInput;
