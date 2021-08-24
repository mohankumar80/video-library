import React, { useState } from "react";
import { useVideos } from "../context/videos-context/videos-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons"
import axios from "axios";
import useAuth from "../context/auth-context/useAuth";

export default function Modal(props) {
  const {
    state: { playLists },
    dispatch,
  } = useVideos();

  const { userLoggedIn } = useAuth();
  const userId = userLoggedIn?._id;

  const [inputBoxValue, setinputBoxValue] = useState("");

  const changeStatus = (playlistDetails, videoId) => {
    const response = playlistDetails.playlist.find(
      (video) => video.videoId === videoId
    );
    if (response) {
      return true;
    } return false;
  };

  const addPlaylistName = async (playlistName) => {
    try {
      const response = await axios.post(`https://backend-video-library.herokuapp.com/user/${userId}/playlist-name`, {
        playlistName
      })
      if(response.data.success) {
        dispatch({ type: "ADD_NEW_PLAYLIST", payload: inputBoxValue })
      }
    } catch (error) {
      console.log("failed to add playlist name")
    }
  }

  const removeFromInnerPlaylist = async (playlist, video) => {
    try {
      const response = await axios.delete(`https://backend-video-library.herokuapp.com/user/${userId}/playlist-name/${video._id}`, {
        data: {
          playlistName: playlist.name
        }
      })
        if(response.data.success) {
        dispatch({ type: "REMOVE_FROM_INNER_PLAYLIST", payload: { video, playListId: playlist.id }})
      }
    } catch (error) {
      console.log("failed to delete the video from the specified playlist")
    }
  }

  const addToInnerPlaylist = async (playlist, video) => {
    try {
      const response = await axios.post(`https://backend-video-library.herokuapp.com/user/${userId}/playlist-name/${video._id}`, {
          playlistName: playlist.name
      })      
      if(response.data.success) {
        dispatch({ type: "ADD_TO_INNER_PLAYLIST", payload: { video, playListId: playlist.id }})      
      }
    } catch (error) {
      console.log("failed to add the video to the specified playlist")
    }
  }
  
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
        <button className="btn btn-secondary btn-add-playlist" onClick={() => addPlaylistName(inputBoxValue)} >
            <FontAwesomeIcon icon={faPlus} />
        </button>
        <br />
        {
          playLists.map((playlist) => {
            return (
              <label key={playlist.name}>
                <input
                  type="checkbox"
                  checked={ changeStatus(playlist, props.videoId) ? true : false }
                  onChange={() =>
                    changeStatus(playlist, props.videoId)
                      ? removeFromInnerPlaylist(playlist, props)
                      : addToInnerPlaylist(playlist, props)
                  }
                />
                {playlist.name}
                <br />
              </label>
            );
          })
        }
      </div>
      <div className="modal-footer">
        <button onClick={() => dispatch({type: "CLOSE_MODAL"})}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
}
