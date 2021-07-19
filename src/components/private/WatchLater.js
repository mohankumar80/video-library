import React from "react";
import { Link } from "react-router-dom";
import { useVideos } from '../../context/videos-context/videos-context';

export default function WatchLater() {
  const {
    state: { watchLater },
    dispatch,
  } = useVideos();

  return (
    <div className="WatchLater">
      {watchLater.length === 0 ? (
        <h1>Pretty Empty Right !?</h1>
      ) : (
        <div className="flex-reverse">
          {watchLater.map((video) => {
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
                    dispatch({
                      type: "REMOVE_FROM_WATCH_LATER",
                      payload: video,
                    })
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
