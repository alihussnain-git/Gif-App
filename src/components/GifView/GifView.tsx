import React from 'react';
import {Text, View} from 'react-native';
import {Gif} from '../../api/types';
import {strings} from '../../locale/strings';
import {TEST_IDS} from '../../utils/testIDs';
import CustomImage from '../customImage/CustomImage';

import {styles} from './styles';

interface RandomGifViewProps {
  randomGif: Gif;
  OnLinkPress: () => void;
}

const GifView: React.FC<RandomGifViewProps> = ({randomGif, OnLinkPress}) => {
  const {images, bitly_url, title, rating} = randomGif;
  return (
    <>
      <Text style={styles.heading}>{strings.home.gifHeading}</Text>
      <CustomImage
        testID={TEST_IDS.GIF_IMAGE}
        source={{uri: images.fixed_height.url}}
        style={styles.gifImage}
      />
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <Text testID={TEST_IDS.LINK} style={styles.link} onPress={OnLinkPress}>
        {bitly_url}
      </Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{strings.home.gifRating}</Text>
        <View style={styles.ratingBadge}>
          <Text numberOfLines={1} style={styles.ratingValueText}>
            {rating}
          </Text>
        </View>
      </View>
    </>
  );
};

export default GifView;
