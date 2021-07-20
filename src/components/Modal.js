import React, { useState } from "react";
import { useVideos } from "../context/videos-context/videos-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons"

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
    <div className="modal">
      <div className="modal-body"> 
        <input 
          type="text" 
          className="input input-styled input-playlist" 
          value={inputBoxValue} 
          onChange={changeHandler} 
          placeholder="add to playlist ..."
        />
        <button
          className="btn btn-secondary btn-add-playlist"
          onClick={() =>
            dispatch({ type: "ADD_NEW_PLAYLIST", payload: inputBoxValue })
          }>
            <FontAwesomeIcon icon={faPlus} />
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
      </div>
      <div className="modal-footer">
        <button onClick={() => dispatch({type: "CLOSE_MODAL"})}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
}
