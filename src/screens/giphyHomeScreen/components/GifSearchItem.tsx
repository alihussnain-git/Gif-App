import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Gif} from '../../../api/types';
import CustomImage from '../../../components/customImage/CustomImage';
import {TEST_IDS} from '../../../utils/testIDs';
import {styles} from '../styles';

interface GifSearchItemProps {
  item: Gif;
  onPress: () => void;
}

const GifSearchItem: React.FC<GifSearchItemProps> = ({item, onPress}) => (
  <View style={styles.gifItemContainer}>
    <TouchableOpacity testID={TEST_IDS.SEARCH_IMAGE} onPress={onPress}>
      <CustomImage
        source={{uri: item.images.fixed_height.url}}
        style={styles.gifItemImage}
      />
    </TouchableOpacity>
  </View>
);

export default GifSearchItem;
