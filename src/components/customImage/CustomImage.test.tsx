import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import CustomImage from './CustomImage';
import {TEST_IDS} from '../../utils/testIDs';

const TEST_IMAGE_URL = 'https://example.com/image.jpg';
describe('CustomImage', () => {
  it('displays the loading indicator while the image is loading', () => {
    const {getByTestId} = render(
      <CustomImage source={{uri: TEST_IMAGE_URL}} />,
    );

    const loadingIndicator = getByTestId(TEST_IDS.IMAGE_LOADING_INDICATOR);
    expect(loadingIndicator).toBeTruthy();
  });

  it('renders the image after it has loaded', async () => {
    const testID = 'custom-image-test';

    const {getByTestId, queryByTestId} = render(
      <CustomImage testID={testID} source={{uri: TEST_IMAGE_URL}} />,
    );
    const image = getByTestId(testID);

    // Assert that the loading indicator is initially rendered
    const loadingIndicator = getByTestId(TEST_IDS.IMAGE_LOADING_INDICATOR);
    expect(loadingIndicator).toBeTruthy();

    // Simulate image load by calling the onLoad function
    fireEvent(image, 'onLoad');

    // Assert that the loading indicator is removed
    expect(queryByTestId(TEST_IDS.IMAGE_LOADING_INDICATOR)).toBeNull();

    // Assert that the image is rendered
    expect(image).toBeTruthy();
  });
});
