export interface Gif {
  id: string;
  title: string;
  bitly_url: string;
  rating: string;
  images: {
    [key: string]: {
      url: string;
    };
  };
}

export interface GifRandomAPIData {
  data: Gif;
}

export interface GifSearchAPIData {
  data: Gif[];
}
