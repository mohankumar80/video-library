import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../context/auth-context/useAuth";
import { useVideos } from '../../context/videos-context/videos-context';

export default function WatchLater() {
  const {
    state: { watchLater },
    dispatch,
  } = useVideos();

  const { userLoggedIn } = useAuth();
  const userId = userLoggedIn?._id;

  const removeVideoFromWatchLater = async (video) => {
    try {
      const response = await axios.delete(`https://backend-video-library.herokuapp.com/user/${userId}/watch-later`, {
        data: {
          videoId: video._id
        }
      })
      if(response.data.success) {
        dispatch({ type: "REMOVE_FROM_WATCH_LATER", payload: video })
        toast.success("Removed from Watch Later", {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    } catch (error) {
      
    }
  }

  return (
    <div className="WatchLater">
      {
        watchLater.length === 0 ? (
          <h2 className="text-align-center empty-container">Pretty Empty Right !?</h2>
        ) : (
          <div className="flex-reverse">
            {watchLater.map((video) => {
              return (
                <div key={video.videoId} className="card card-margin">
                  <Link to={`/watch/${video.videoId}`}>
                    <img
                      className="card-img"
                      src={video.thumbnail}
                      alt={video.description}
                    />
                  </Link>
                  <button className="card-dismiss btn btn-primary"onClick={() => removeVideoFromWatchLater(video)} >
                    &times;
                  </button>
                  <div className="card-body">
                    <img src={video.avatar} className="avatar-normal" alt="" />
                    <p className="card-title">{video.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
}
