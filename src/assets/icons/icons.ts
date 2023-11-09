import {ImageSourcePropType} from 'react-native';

const icons = {
  close: require('./cancel.png'),
  search: require('./search.png'),
  back: require('./back.png'),
};

type ImageSrc = ImageSourcePropType;

export interface IImages {
  close: ImageSrc;
  search: ImageSrc;
  back: ImageSrc;
}

export default icons as IImages;
