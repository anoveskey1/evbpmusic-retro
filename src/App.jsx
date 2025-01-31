import ImageUnavailable from "./components/ImageUnavailable/index.tsx";
import NewRetroImageLoader from "./components/RetroImageLoader/index.tsx";
import './App.css'
import BlinkText from "./components/BlinkText/index.tsx";
import MenuButton from "./components/MenuButton/index.tsx";

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
            <BlinkText fontColor={"#0FFF50"} fontSize={32} isBold text={"Home Page"} />
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%", textAlign: "center" }}>
            <MenuButton text={"Home"} onClick={() => console.log("Hello World!")} />
            <MenuButton text={"Bio"} onClick={() => console.log("Hello World!")} />
            <MenuButton text={"Music"} onClick={() => console.log("Hello World!")} />
            <MenuButton text={"Pics"} onClick={() => console.log("Hello World!")} />
            <MenuButton text={"Blog"} onClick={() => console.log("Hello World!")} />
            <MenuButton text={"Links"} onClick={() => console.log("Hello World!")} />
        </div>
      <div className="card">
          <ImageUnavailable width={100} />
      </div>
    </>
  )
}

export default App
