import React, { useState } from "react";
import { useVideos } from "../context/videos-context/videos-context";

export default function Modal(props) {
  const {
    state: { playLists },
    dispatch,
  } = useVideos();

  const [inputBoxValue, setinputBoxValue] = useState("");

  const changeStatus = (playlistDetails, videoId) => {
    const response = playlistDetails.playlist.find(
      (video) => video.videoId === videoId
    );
    if (response) {
      return true;
    } return false;
  };

  
  const changeHandler = (e) => {
    setinputBoxValue(e.target.value);
  };

  return (
    <div className="Modal">
      <input type="text" value={inputBoxValue} onChange={changeHandler} />
      <button
        onClick={() =>
          dispatch({ type: "ADD_NEW_PLAYLIST", payload: inputBoxValue })
        }
      >
        add
      </button>
      <br />
      {playLists.map((playlist) => {
        return (
          <label>
            <input
              type="checkbox"
              checked={ changeStatus(playlist, props.videoId) ? true : false }
              onChange={() =>
                changeStatus(playlist, props.videoId)
                  ? dispatch({ 
                      type: "REMOVE_FROM_INNER_PLAYLIST",
                      payload: { props, playListId: playlist.id }
                    })
                  : dispatch({
                      type: "ADD_TO_INNER_PLAYLIST",
                      payload: { props, playListId: playlist.id },
                    })
              }
            />
            {playlist.name}
            <br />
          </label>
        );
      })}
      <button onClick={() => dispatch({type: "CLOSE_MODAL"})}>close</button>
    </div>
  );
}
