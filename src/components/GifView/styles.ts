import {Dimensions, StyleSheet} from 'react-native';
import appTheme from '../../theme/appTheme';

const ratingBadgeSize = 50;
const screenHeight = Dimensions.get('window').height;
const imageHeight = screenHeight / 2.3;
const styles = StyleSheet.create({
  heading: {
    fontSize: appTheme.typography.fontSizes.h4,
    marginTop: appTheme.spacing.small,
    color: appTheme.colors.black,
  },
  gifImage: {
    width: '100%',
    height: imageHeight,
    marginVertical: appTheme.spacing.xSmall,
  },
  title: {
    fontSize: appTheme.typography.fontSizes.h5,
    fontWeight: 'bold',
    marginBottom: appTheme.spacing.xxxSmall,
    color: appTheme.colors.black,
  },
  link: {
    fontSize: appTheme.typography.fontSizes.h5,
    color: appTheme.colors.blue,
    textDecorationLine: 'underline',
  },
  ratingContainer: {
    marginTop: -appTheme.spacing.small,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  rating: {
    marginVertical: appTheme.spacing.xxxSmall,
    fontSize: appTheme.typography.fontSizes.h6,
    color: appTheme.colors.black,
  },
  ratingBadge: {
    height: ratingBadgeSize,
    width: ratingBadgeSize,
    borderRadius: ratingBadgeSize / 2,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingValueText: {
    color: appTheme.colors.white,
    textTransform: 'uppercase',
    fontSize: appTheme.typography.fontSizes.h6,
  },
});
export {styles};
