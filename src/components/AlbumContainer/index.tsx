import { FC, useState } from "react";
import "./index.less";
import IAlbumContainerProps, { IUrlLink } from "./IAlbumContainerProps";
import RetroImageLoader from "../RetroImageLoader";

const AlbumContainer: FC<IAlbumContainerProps> = (
  props: IAlbumContainerProps,
) => {
  const {
    // availableFormats,
    coverUrl,
    credits,
    links,
    releaseDate,
    summary,
    title,
    trackList,
    type,
  } = props;

  const [isSummaryVisible, setIsSummaryVisible] = useState<boolean>(false);
  const [summaryButtonText, setSummaryButtonText] =
    useState<string>("View summary");

  const toggleSummary = () => {
    setIsSummaryVisible(!isSummaryVisible);
    setSummaryButtonText(isSummaryVisible ? "View summary" : "Hide summary");
  };

  return (
    <div className="album-container">
      <div className="top">
        <div className="cover">
          <RetroImageLoader alt={`${title} cover`} src={coverUrl} />
        </div>
        <div className="links-under-cover" data-testid="links-under-cover">
          {links.map(({ url, title }: IUrlLink, index: number) => (
            <>
              <a
                className="external-music-link"
                href={url}
                key={index}
                rel="noopener noreferrer"
              >
                {title}
              </a>
              {index < links.length - 1 && <span> | </span>}
            </>
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
          <button onClick={toggleSummary} className="summary-button">
            {summaryButtonText}
          </button>
          <div className={`summary ${isSummaryVisible ? "show" : "hide"}`}>
            {summary}
          </div>
          <div className="links-in-info" data-testid="links-in-info">
            {links.map(({ url, title }: IUrlLink, index: number) => (
              <>
                <a
                  className="external-music-link"
                  href={url}
                  key={index}
                  rel="noopener noreferrer"
                >
                  {title}
                </a>
                {index < links.length - 1 && <span> | </span>}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumContainer;
