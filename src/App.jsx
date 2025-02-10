import ImageUnavailable from "./components/ImageUnavailable/index.tsx";
import NewRetroImageLoader from "./components/RetroImageLoader/index.tsx";
import './App.css'
import MenuButton from "./components/MenuButton/index.tsx";
import VisitorCounter from "./components/VisitorCounter/index.tsx";

function App() {
  return (
    <>
      <div>
          <h1>Welcome to the official</h1>
          <NewRetroImageLoader
              alt="EVBP"
              height={150}
              src="/images/evbp_stereogram_logo_transparent.png"
              width={600}
          />
          <h1>Home Page</h1>
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
        <div data-testid="visit-counter-container">
            <VisitorCounter />
        </div>
    </>
  )
}

export default App
