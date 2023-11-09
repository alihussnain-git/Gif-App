import {StyleSheet} from 'react-native';
import appTheme from '../../theme/appTheme';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: appTheme.spacing.small,
  },
  backIcon: {
    marginStart: appTheme.spacing.xSmall,
  },
  title: {
    flex: 1,
    fontSize: appTheme.typography.fontSizes.h5,
    fontWeight: 'bold',
    textAlign: 'center',
    marginEnd: appTheme.spacing.small,
    color: appTheme.colors.black,
  },
});

export {styles};
