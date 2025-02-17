import { BrowserRouter  as Router, Route,  Routes } from "react-router-dom";
import './App.css'
import Bio from "./pages/bio/index.tsx";
import Home from "./pages/home/index.tsx";
import Music from "./pages/music/index.tsx";

function App() {
  return (
    <Router>
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/music" element={<Music />} />
        </Routes>
    </Router>
  )
}

export default App
