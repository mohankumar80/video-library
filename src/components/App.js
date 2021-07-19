import "../styles.css"
import { Routes, Route } from "react-router-dom";
import { Navigation, Home, VideoCard, Login, NotFound, PrivateRoute } from "./index";
import {  History, WatchLater, LikedVideos, Playlist } from './private/index'

export default function App() {

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:VideoId" element={<VideoCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <PrivateRoute path="/history" element={<History />} />
        <PrivateRoute path="/watch-later" element={<WatchLater />} />
        <PrivateRoute path="/liked-videos" element={<LikedVideos />} />
        <PrivateRoute path="/playlist" element={<Playlist />} />
      </Routes>
    </div>
  );
}
