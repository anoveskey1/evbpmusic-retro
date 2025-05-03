import { FC } from "react";
import "./index.less";
import IAlbumContainerProps, { IUrlLink } from "./IAlbumContainerProps";

const AlbumContainer: FC<IAlbumContainerProps> = (
  props: IAlbumContainerProps,
) => {
  const {
    // availableFormats,
    coverUrl,
    credits,
    links,
    releaseDate,
    title,
    trackList,
    type,
  } = props;

  return (
    <div className="album-container">
      <div className="top">
        <div className="cover">
          <img src={coverUrl} alt={`${title} cover`} className="cover-image" />
        </div>
        <div className="links-under-cover" data-testid="links-under-cover">
          {links.map(({ url, title }: IUrlLink, index: number) => (
            <a key={index} href={url} rel="noopener noreferrer">
              {title}
            </a>
          ))}
        </div>
      </div>
      <div className="info">
        <div className="album-details">
          <h2 className="title">
            {title} <span className="release-type">({type})</span>
          </h2>
          <p className="release-date">{releaseDate}</p>
          <p className="credits">{credits}</p>
          <ol className="track-listing">
            {trackList.map((track: string) => (
              <li key={track}>{track}</li>
            ))}
          </ol>
          <div className="links-in-info" data-testid="links-in-info">
            {links.map(({ url, title }: IUrlLink, index: number) => (
              <a key={index} href={url} rel="noopener noreferrer">
                {title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumContainer;
