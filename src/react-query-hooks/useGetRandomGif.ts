import {useQuery, UseQueryResult} from 'react-query';
import {GiphyAPI} from '../api/Api';
import {Gif} from '../api/types';
import {GET_RANDOM_GIF} from './queries';

export const useGetRandomGiphy = (): UseQueryResult<Gif> => {
  return useQuery(GET_RANDOM_GIF, GiphyAPI.getRandomGif);
};
