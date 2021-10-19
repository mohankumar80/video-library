import "../styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { Navigation, Home, VideoCard, Login, Signup, NotFound, PrivateRoute } from "./index";
import {  History, WatchLater, LikedVideos, Playlist } from './private/index'
import useAuth from "../context/auth-context/useAuth";
import { useVideos } from "../context/videos-context/videos-context";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const { userLoggedIn } = useAuth();
  const { dispatch } = useVideos();

  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);

  const userId = userLoggedIn?._id;

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

  useEffect(() => {
    if(userLoggedIn) {
      (async() => {
        try {
          const response = await axios.get(`https://backend-video-library.herokuapp.com/user/${userId}/history`);
          if(response.data.success) {
            const entireHistory = response.data.history;
            entireHistory.map(video => dispatch({ type: 'ADD_TO_HISTORY', payload: video }))
          }
        } catch (error) {
          console.log('failed to retrieve entire history')
        }
      })()
    }
  }, [userLoggedIn, userId, dispatch])
  
  
  useEffect(() => {
    if(userLoggedIn) {
      (async() => {
        try {
          const response = await axios.get(`https://backend-video-library.herokuapp.com/user/${userId}/liked-videos`);
          if(response.data.success) {
            const allLikedVideos = response.data.likedVideos;
            allLikedVideos.map(video => dispatch({ type: 'ADD_TO_LIKED_VIDEOS', payload: video }))
          }
        } catch (error) {
          console.log('failed to get all liked videos')
        }
      })()
    }
  }, [userLoggedIn, userId, dispatch])

  
  useEffect(() => {
    if(userLoggedIn) {
      (async() => {
        try {
          const response = await axios.get(`https://backend-video-library.herokuapp.com/user/${userId}/watch-later`);
          if(response.data.success) {
            const watchLaterVideos = response.data.watchLater;
            watchLaterVideos.map(video => dispatch({ type: 'ADD_TO_WATCH_LATER', payload: video }))
          }
        } catch (error) {
          console.log('failed to get all watch later videos')
        }
      })()
    }
  }, [userLoggedIn, userId, dispatch])

  
  useEffect(() => {
    if(userLoggedIn) {
      (async() => {
        try {
          const response = await axios.get(`https://backend-video-library.herokuapp.com/user/${userId}/playlists`);
          if(response.data.success) {
            const playlists = response.data.playlists;
            playlists.map(playlist => dispatch({ type: 'ADD_TO_PLAYLIST', payload: playlist }))
          }
        } catch (error) {
          console.log('failed to get all playlists')
        }
      })()
    }
  }, [userLoggedIn, userId, dispatch])

  return (
    <div className="App">
      <Navigation />
      <div className="routes">
      <ToastContainer />
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
