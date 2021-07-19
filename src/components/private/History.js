import React from "react";
import { Link } from "react-router-dom";
import { useVideos } from '../../context/videos-context/videos-context';

export default function History() {
  const {
    state: { history },
    dispatch,
  } = useVideos();

  return (
    <div className="History">
      {history.length === 0 ? (
        <h1>No History!!</h1>
      ) : (
        <div className="flex-reverse">
          {history.map((video) => {
            return (
              <div key={video.videoId} className="card">
                <Link to={`/watch/${video.videoId}`}>
                  <img
                    className="card-img"
                    src={video.thumbnail}
                    alt={video.description}
                  />
                </Link>
                <button
                  className="card-dismiss btn btn-primary"
                  onClick={() =>
                    dispatch({ type: "REMOVE_FROM_HISTORY", payload: video })
                  }
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
      )}
    </div>
  );
}
