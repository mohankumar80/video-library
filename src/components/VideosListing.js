import React from "react";
import { Link } from "react-router-dom";
import { useVideos } from "../context/videos-context/videos-context";
import { checkInHistory } from "../utils/utils";

export default function VideosListing({ video }) {
  const {
    state: { history },
    dispatch,
  } = useVideos();

  return (
    <div className="VideosListing card">
      <Link
        to={`/watch/${video.videoId}`}
        onClick={() =>
          checkInHistory(history, video)
            ? dispatch({ type: "ADD_TO_HISTORY", payload: video })
            : null
        }
      >
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
