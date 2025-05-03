export interface IUrlLink {
  url: string;
  title: string;
}

interface IAlbumContainerProps {
  // availableFormats: string[]; //TODO: create an enum - digital, vinyl, cassette, etc.
  coverUrl: string;
  credits: string;
  links: IUrlLink[]; // create an enum - iTunes, Bandcamp, Spotify, etc
  releaseDate: string;
  title: string;
  trackList: string[];
  type: string; // create an enum
}

export default IAlbumContainerProps;
