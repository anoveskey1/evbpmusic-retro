import PageContainer from "../../components/PageContainer";
import PageIntro from "../../components/PageIntro";

const Links: React.FC = () => {
  return (
    <PageContainer>
      <PageIntro header="Links" />
      <h2>Social Media</h2>
      <ul>
        <li>
          <a href="https://www.facebook.com/evbpband">Facebook</a>
        </li>
        <li>
          <a href="https://www.instagram.com/evbpband">Instagram</a>
        </li>
        <li>
          <a href="https://www.youtube.com/@evbpband">YouTube</a>
        </li>
        <li>
          <a href="https://www.tiktok.com/@evbpband">TikTok</a>
        </li>
      </ul>
      <h2>Cool Stuff You Should Check Out</h2>
      <ul>
        <li>
          <a href="https://www.bandcamp.com">Bandcamp</a>
        </li>
        <li>
          <a href="https://www.soundcloud.com">SoundCloud</a>
        </li>
        <li>
          <a href="https://www.spotify.com">Spotify</a>
        </li>
      </ul>
      <h2>Miscellaneous Links</h2>
      <ul>
        <li>
          <a href="https://www.google.com">Google</a>
        </li>
        <li>
          <a href="https://www.bing.com">Bing</a>
        </li>
        <li>
          <a href="https://www.duckduckgo.com">DuckDuckGo</a>
        </li>
      </ul>
    </PageContainer>
  );
};

export default Links;
