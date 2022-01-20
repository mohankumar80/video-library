import axios from 'axios';
import React from 'react';
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import useAuth from '../../context/auth-context/useAuth';
import { useVideos } from '../../context/videos-context/videos-context';

export default function Playlist() {

    const { state: { playLists }, dispatch } = useVideos();
    const { userLoggedIn } = useAuth();
    const userId = userLoggedIn?._id;

    const deletePlaylist = async (playlist) => {
      try {
        const response = await axios.delete(`https://backend-video-library.herokuapp.com/user/${userId}/playlist-name`, {
          data: {
            playlistName: playlist.name
          }
        })
        if(response.data.success) {
          dispatch({ type: "CLEAR_PLAYLIST", payload: playlist.id })
          toast.success(`${playlist.name} playlist deleted`, {
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
      } catch (error) {
        console.log("failed to delete the playlist name");
      }
    }

    const removeFromInnerPlaylist = async (video, playlist) => {
      try {
        const response = await axios.delete(`https://backend-video-library.herokuapp.com/user/${userId}/playlist-name/${video._id}`, {
          data: {
            playlistName: playlist.name
          }
        })
        if(response.data.success) {
          dispatch({ type: "REMOVE_FROM_INNER_PLAYLIST", payload: { video, playListId: playlist.id } })
          toast.success(`Video removed from ${playlist.name}`, {
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
      } catch (error) {
        console.log("failed to delete the video from the specified playlist");
      }
    }


    return (
        <div className="PlayList">
            {
                playLists.length === 0
                    ? <h2 className="text-align-center empty-container">No Playlists Available</h2>
                    : <div>
                        {
                            playLists.map(playlist => {
                                return <div className="full-height" key={playlist.name}>
                                    <div className="flex">
                                        <h3>{playlist.name}</h3>
                                        <button className="btn btn-secondary btn-margin-left" onClick={() => deletePlaylist(playlist)}> 
                                          delete 
                                        </button>
                                    </div>
                                    <div className="flex-reverse">
                                        {
                                            playlist.playlist.map(video => {
                                                return <div key={video.videoId} className="card card-margin">
                                                <Link to={`/watch/${video.videoId}`}>
                                                  <img
                                                    className="card-img"
                                                    src={video.thumbnail}
                                                    alt={video.description}
                                                  />
                                                </Link>
                                                <button
                                                  className="card-dismiss btn btn-primary"
                                                  onClick={() => removeFromInnerPlaylist(video, playlist)}
                                                >
                                                  &times;
                                                </button>
                                                <div className="card-body">
                                                  <img src={video.avatar} className="avatar-normal" alt="" />
                                                  <p className="card-title">{video.description}</p>
                                                </div>
                                              </div>
                                            })
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>
            }
        </div>
    )
}
