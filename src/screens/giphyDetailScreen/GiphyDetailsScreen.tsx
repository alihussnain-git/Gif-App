import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import ScreenHeader from '../../components/header/ScreenHeader';
import GifView from '../../components/GifView/GifView';
import {NavigationProps} from '../../navigation/RootNavigator';
import {GlobalStyles} from '../../theme/GlobalStyles';
import {openBrowser} from '../../utils/openBrowser';
import {styles} from './styles';

const GiphyDetailsScreen: React.FC<NavigationProps> = ({route}) => {
  const {selectedGif} = route?.params;
  const navigation = useNavigation();

  const handleOnLinkPress = () => {
    selectedGif?.bitly_url && openBrowser(selectedGif?.bitly_url);
  };

  const handleOnBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[GlobalStyles.defaultScreenView]}>
      <ScreenHeader onBackPress={handleOnBackPress} />
      {selectedGif && (
        <View style={styles.gifContainer}>
          <GifView randomGif={selectedGif} OnLinkPress={handleOnLinkPress} />
        </View>
      )}
    </View>
  );
};

export default GiphyDetailsScreen;
