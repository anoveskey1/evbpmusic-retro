import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Bio = lazy(() => import("./pages/bio/index.tsx"));
const Faq = lazy(() => import("./pages/faq/index.tsx"));
const Home = lazy(() => import("./pages/home/index.tsx"));
const Links = lazy(() => import("./pages/links/index.tsx"));
const Music = lazy(() => import("./pages/music/index.tsx"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/music" element={<Music />} />
          <Route path="/links" element={<Links />} />
          <Route path={"/faq"} element={<Faq />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
