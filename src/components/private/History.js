import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../context/auth-context/useAuth";
import { useVideos } from '../../context/videos-context/videos-context';

export default function History() {
  const {
    state: { history },
    dispatch,
  } = useVideos();

  const { userLoggedIn } = useAuth();
  const userId = userLoggedIn?._id;

  const removeVideoFromHistory = async (video) => {
    try {
      const response = await axios.delete(`https://backend-video-library.herokuapp.com/user/${userId}/history`, {
        data: {
          videoId: video._id
        }
      })
      if(response.data.success) {
        dispatch({ type: 'REMOVE_FROM_HISTORY', payload: video })
      }
    } catch (error) {
      console.log('failed to remove the video from history')
    }
  }

  const clearHistory = async () => {
    try {
      const response = await axios.delete(`https://backend-video-library.herokuapp.com/user/${userId}/clear-history`);
      if(response.data.success) {
        dispatch({ type: 'CLEAR_HISTORY' });
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="History">
      {history.length === 0 
      ? <h2 className="text-align-center empty-container"> No History!!</h2>
      : <div>
          <div className="flex-reverse">
            {history.map((video) => {
              return (
                <div key={video.videoId} className="card card-margin">
                  <Link to={`/watch/${video.videoId}`}>
                    <img
                      className="card-img"
                      src={video.thumbnail}
                      alt={video.description}
                    />
                  </Link>
                  <button
                    className="card-dismiss btn btn-primary"
                    onClick={() => removeVideoFromHistory(video)}
                  >
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
          <button 
            className="btn btn-secondary btn-position-fixed" 
            onClick={() => clearHistory() }
          > clear history </button>
      </div>
    }
    </div>
  );
}
