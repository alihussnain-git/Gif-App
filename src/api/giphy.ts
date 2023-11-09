import {API} from './Api';
import {API_KEY} from './config';
import {Gif, GifRandomAPIData, GifSearchAPIData} from './types';

// Helper function to append API key to URL
const appendApiKey = (url: string): string => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}api_key=${API_KEY}`;
};

export const getRandomGif = async (): Promise<Gif> => {
  const response = await API.get<GifRandomAPIData, {}>(appendApiKey('/random'));
  const gifData: Gif = response.data;
  return gifData;
};

export const searchGif = async (query: string): Promise<Gif[]> => {
  const response = await API.get<GifSearchAPIData, {}>(
    appendApiKey(`/search?q=${query}`),
  );
  const gifData: Gif[] = response.data;
  return gifData;
};
