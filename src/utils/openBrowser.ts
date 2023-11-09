import {Linking} from 'react-native';

const openBrowser = (url: string) => {
  Linking.openURL(url);
};

export {openBrowser};
