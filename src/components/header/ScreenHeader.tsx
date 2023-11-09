import React from 'react';
import {Text, View} from 'react-native';
import {strings} from '../../locale/strings';
import {TEST_IDS} from '../../utils/testIDs';
import Icon from '../icon/Icon';
import {styles} from './styles';

interface HeaderProps {
  onBackPress: () => void;
}

const ScreenHeader: React.FC<HeaderProps> = ({onBackPress}) => {
  return (
    <View style={styles.headerContainer}>
      <Icon
        style={styles.backIcon}
        icon="back"
        testID={TEST_IDS.BACK_BUTTON}
        size={20}
        onPress={onBackPress}
      />
      <Text style={styles.title}>{strings.detail.headerTitle}</Text>
    </View>
  );
};

export default ScreenHeader;
