import React, {useState} from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  StyleProp,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';
import {TEST_IDS} from '../../utils/testIDs';
import {styles} from './styles';

interface Props {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  testID?: string;
}

const CustomImage: React.FC<Props> = ({source, style, testID}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <View style={styles.container}>
      {isImageLoading && (
        <ActivityIndicator
          testID={TEST_IDS.IMAGE_LOADING_INDICATOR}
          style={styles.imageLoader}
        />
      )}
      <Image
        testID={testID}
        source={source}
        style={style}
        onLoad={handleImageLoad}
      />
    </View>
  );
};

export default CustomImage;
