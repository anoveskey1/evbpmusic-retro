import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationProvider from "./context/NavigationProvider.js";

const Bio = lazy(() => import("./pages/bio/index.tsx"));
const Contact = lazy(() => import("./pages/contact/index.tsx"));
const Faq = lazy(() => import("./pages/faq/index.tsx"));
const Gallery = lazy(() => import("./pages/gallery/index.tsx"));
const GalleryImage = lazy(() => import("./components/GalleryImage/index.tsx"));
const Guestbook = lazy(() => import("./pages/guestbook/index.tsx"));
const Home = lazy(() => import("./pages/home/index.tsx"));
const Links = lazy(() => import("./pages/links/index.tsx"));
const Login = lazy(() => import("./components/LoginForm/index.tsx"));
const Music = lazy(() => import("./pages/music/index.tsx"));
const News = lazy(() => import("./pages/news/index.tsx"));
const SlugPost = lazy(() => import("./components/News/SlugPost/index.tsx"));

function App() {
  return (
    <Router>
      <NavigationProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path={"/"} element={<Home />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path={"/faq"} element={<Faq />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:imageId" element={<GalleryImage />} />
            <Route path="/guestbook" element={<Guestbook />} />
            <Route path="/links" element={<Links />} />
            <Route path="/music" element={<Music />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<SlugPost />} />
          </Routes>
        </Suspense>
      </NavigationProvider>
    </Router>
  );
}

export default App;
