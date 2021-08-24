import "../styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { Navigation, Home, VideoCard, Login, Signup, NotFound, PrivateRoute } from "./index";
import {  History, WatchLater, LikedVideos, Playlist } from './private/index'

export default function App() {

  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
          const response = await axios.get('https://backend-video-library.herokuapp.com/videos');
          if(response.data.success) {
              setData(response.data.videos)
              setloading(false)
          }
      } catch (error) {
          console.log('failed to retrieve all videos')
      }
    })()
  }, [])


  return (
    <div className="App">
      <Navigation />
      <div className="routes">
        <Routes>
          <Route path="/" element={<Home data={data} loading={loading} />} />
          <Route path="/watch/:VideoId" element={<VideoCard data={data} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
          <PrivateRoute path="/history" element={<History />} />
          <PrivateRoute path="/watch-later" element={<WatchLater />} />
          <PrivateRoute path="/liked-videos" element={<LikedVideos />} />
          <PrivateRoute path="/playlist" element={<Playlist />} />
        </Routes>
      </div>
    </div>
  );
}
