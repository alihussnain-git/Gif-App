import {Dimensions, Platform, StyleSheet} from 'react-native';
import appTheme from '../../theme/appTheme';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: appTheme.spacing.small,
  },
  errorView: {
    justifyContent: 'center',
  },
  errorText: {
    fontSize: appTheme.typography.fontSizes.h6,
    textAlign: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    backgroundColor: appTheme.colors.lightGrey,
    borderColor: appTheme.colors.lightGrey,
    borderRadius: appTheme.spacing.xxxSmall,
    marginTop: appTheme.spacing.small,
  },
  headingSearchResults: {
    fontSize: appTheme.typography.fontSizes.h4,
    marginTop: appTheme.spacing.small,
    color: appTheme.colors.black,
  },
  searchIcon: {
    marginStart: appTheme.spacing.xxSmall,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: Platform.select({
      android: appTheme.spacing.xxSmall,
      ios: appTheme.spacing.xSmall,
    }),
    color: appTheme.colors.black,
  },
  closeIcon: {
    marginEnd: appTheme.spacing.xxSmall,
  },
  cancelText: {
    marginStart: appTheme.spacing.xxSmall,
    marginTop: appTheme.spacing.xSmall,
    color: appTheme.colors.black,
  },
  searchResultsContainer: {
    marginTop: appTheme.spacing.small,
    marginStart: -appTheme.spacing.xxSmall,
  },
  gifItemContainer: {
    flex: 1 / 3,
    marginBottom: appTheme.spacing.small,
    marginLeft: appTheme.spacing.xxSmall,
  },
  gifItemImage: {
    width: '100%',
    height: screenHeight / 7,
  },
});
export {styles};
