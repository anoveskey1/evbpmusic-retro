import ImageUnavailable from "./components/ImageUnavailable/index.tsx";
import NewRetroImageLoader from "./components/RetroImageLoader/index.tsx";
import './App.css'
import BlinkText from "./components/BlinkText/index.tsx";

function App() {
  return (
    <>
      <div>
          <NewRetroImageLoader
              alt="A super cool logo"
              height={150}
              src="/images/evbp_stereogram_logo_transparent.png"
              width={600}
          />
      </div>
        <div style={{ width: "100%", textAlign: "center" }}>
            <BlinkText fontColor={"green"} fontSize={24} isBold text={"Home Page"} />
        </div>
      <div className="card">
          <ImageUnavailable width={100} />
      </div>
    </>
  )
}

export default App
