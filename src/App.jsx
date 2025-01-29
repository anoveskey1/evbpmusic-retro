import ImageUnavailable from "./components/ImageUnavailable/index.tsx";
import NewRetroImageLoader from "./components/RetroImageLoader/index.tsx";
import './App.css'

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
      <div className="card">
          <ImageUnavailable width={100} />
      </div>
    </>
  )
}

export default App
