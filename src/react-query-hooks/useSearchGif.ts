import {useQuery, UseQueryResult} from 'react-query';
import {GiphyAPI} from '../api/Api';
import {Gif} from '../api/types';
import {SEARCH_GIF} from './queries';

export const useSearchGif = (query: string): UseQueryResult<Gif[]> => {
  return useQuery([SEARCH_GIF, query], () => GiphyAPI.searchGif(query), {
    enabled: false,
  });
};
