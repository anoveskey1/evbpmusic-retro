import React from "react";
import "./index.less";

interface IAlbumContainerProps {
    availableFormats: string[]; //create an enum - digital, vinyl, cassette, etc
    coverUrl: string;
    credits: string;
    links: string[]; // create an enum - iTunes, Bandcamp, Spotify, etc
    releaseDate: string;
    title: string;
    trackList: string[];
    type: string; // create an enum
}

const AlbumContainer: React.FC<IAlbumContainerProps> = (props: IAlbumContainrProps) => {
    const {
        availableFormats,
        coverUrl,
        credits,
        links,
        releaseDate,
        title,
        trackList,
        type
    } = props;

    return (
        <div className="album-container">
            <div className="cover">
                <img src={coverUrl} alt={`${title} cover`} className="cover-image" />
            </div>
            <div className="info">
                <h2 className="title">{title} <span className="release-type">({type})</span></h2>
                <p className="release-date">{releaseDate}</p>
                <p className="credits">{credits}</p>
                <ol>
                    {trackList.map((track: string) => (
                        <li key={track}>{track}</li>
                    ))}
                </ol>
                <div className="links">
                    {links.map((link: string, index: number) => (
                        <a key={index} href={link}>{link}</a>
                    ))}
                </div>
            </div>
        </div>);
}

export default AlbumContainer;