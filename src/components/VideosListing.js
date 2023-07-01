import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useVideos } from "../context/videos-context/videos-context";
import useAuth from "../context/auth-context/useAuth";

export default function VideosListing({ video }) {

  const { userLoggedIn } = useAuth();
  const userId = userLoggedIn?._id;

  const navigate = useNavigate();
  const { dispatch } = useVideos();
  
  const addToHistory = async (video) => {
    try {
        const response = await axios.post(`https://backend-video-library.herokuapp.com/user/${userId}/history`, {
            videoId: video._id
        })
        if(response.data.success) {
            dispatch({ type: 'ADD_TO_HISTORY', payload: video })
        }
    } catch (error) {
        console.log("failed to add to history")
    }
}

  return (
    <div className="VideosListing card" onClick={() => {
      if(userLoggedIn) {
        addToHistory(video)
      } else {
        navigate("/login", { state: { from: `/` } })
      }
    }}>
      <Link to={`/watch/${video.videoId}`} >
        <img
          className="card-img"
          src={video.thumbnail}
          alt={video.description}
        />
      </Link>
      <div className="card-body">
        <img src={video.avatar} className="avatar-normal" alt="" />
        <p className="card-title">{video.description}</p>
      </div>
    </div>
  );
}
