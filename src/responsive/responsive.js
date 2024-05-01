import {Dimensions, PixelRatio, Platform} from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';

const uiDesignDeviceWidth = 414; // iPhone 8 Plus
const uiDesignDeviceHeight = 736; // iPhone 8 Plus

const uiDesignMinCompatibleDeviceWidth = 375; // iPhone SE (2nd Generation)
const uiDesignMinCompatibleDeviceHeight = 667; // iPhone SE (2nd Generation)

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const deviceTooSmallForDesignBaseValues = deviceHeight < uiDesignMinCompatibleDeviceHeight;

const scaleToDeviceWidth = (designBaseValue) => {
  let scaledValue = designBaseValue;
  if (deviceTooSmallForDesignBaseValues && designBaseValue !== 0) {
    scaledValue = (deviceWidth * designBaseValue) / uiDesignDeviceWidth;
  }
  return PixelRatio.roundToNearestPixel(scaledValue);
};

const scaleToDeviceHeight = (designBaseValue) => {
  let scaledValue = designBaseValue;
  if (deviceTooSmallForDesignBaseValues && designBaseValue !== 0) {
    scaledValue = (deviceHeight * designBaseValue) / uiDesignDeviceHeight;
  }
  return PixelRatio.roundToNearestPixel(scaledValue);
};

export {scaleToDeviceWidth, scaleToDeviceHeight,deviceWidth,deviceHeight};
