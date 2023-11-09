import {Image, StyleProp, ImageStyle, TouchableOpacity} from 'react-native';
import React from 'react';
import icons, {IImages} from '../../assets/icons/icons';

interface IconProps {
  style?: StyleProp<ImageStyle>;
  size?: number;
  icon: keyof IImages;
  onPress?: () => void;
  testID?: string;
}

const Icon: React.FC<IconProps> = ({style, size, icon, onPress, testID}) => {
  const iconComponent = (
    <Image source={icons[icon]} style={[style, {height: size, width: size}]} />
  );

  if (onPress) {
    return (
      <TouchableOpacity testID={testID} onPress={onPress}>
        {iconComponent}
      </TouchableOpacity>
    );
  }
  return <>{iconComponent}</>;
};

export default Icon;
