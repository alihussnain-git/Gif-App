import {StyleSheet} from 'react-native';
import appTheme from './appTheme';

const GlobalStyles = StyleSheet.create({
  defaultScreenView: {
    flex: 1,
    backgroundColor: appTheme.colors.white,
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {GlobalStyles};
