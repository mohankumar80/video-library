import React from 'react';
import Modal from "./Modal";
import useAuth from "../context/auth-context/useAuth";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { useVideos } from "../context/videos-context/videos-context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faClock, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as farThumbsUp, faClock as farClock, faBookmark as farBookMark } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function VideoCard({ data }) {

    const { state: { likedVideos, watchLater, playLists, showModal }, dispatch } = useVideos();

    //For getting the video id and mapping it
    const { VideoId } = useParams();
    const video = data.find(video => video.videoId === VideoId)

    const { userLoggedIn } = useAuth();
    const userId = userLoggedIn?._id;
    

    const addToLikedVideos = async (video) => {
        try {
            const response = await axios.post(`https://backend-video-library.herokuapp.com/user/${userId}/liked-videos`, {
                videoId: video._id
            })
            if(response.data.success) {
                dispatch({ type: 'ADD_TO_LIKED_VIDEOS', payload: video })
                toast.success("Added to Liked Videos", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
        } catch (error) {
            console.log("failed to add to liked videos")
        }
    }

    const removeFromLikedVideos = async (video) => {
        try {
            const response = await axios.delete(`https://backend-video-library.herokuapp.com/user/${userId}/liked-videos`, {
                data: {
                    videoId: video._id
                }
            })
            if(response.data.success) {
                dispatch({ type: 'REMOVE_FROM_LIKED_VIDEOS', payload: video })
                toast.success("Removed from Liked Videos", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
        } catch (error) {
            console.log("failed to delete from liked videos")
        }
    }

    const addToWatchLater = async (video) => {
        try {
            const response = await axios.post(`https://backend-video-library.herokuapp.com/user/${userId}/watch-later`, {
                videoId: video._id
            })
            if(response.data.success) {
                dispatch({ type: 'ADD_TO_WATCH_LATER', payload: video })
                toast.success("Added to Watch Later", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
        } catch (error) {
            console.log("failed to add to watch later")
        }
    }

    const removeFromWatchLater = async (video) => {
        try {
            const response = await axios.delete(`https://backend-video-library.herokuapp.com/user/${userId}/watch-later`, {
                data: {
                    videoId: video._id
                }
            })
            if(response.data.success) {
                dispatch({ type: 'REMOVE_FROM_WATCH_LATER', payload: video })
                toast.success("Removed from Watch Later", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
        } catch (error) {
            console.log("failed to delete from watch later")
        }
    }

    return (
        <div className="main-container">
            <div className="sub-container">
                <div className="VideoCard">
                    <div className="wrapper">
                        <ReactPlayer 
                            url={`www.youtube.com/watch?v=${video.videoId}`} 
                            controls 
                            className="reactplayer" 
                            width="100%" 
                            height="100%"            
                        />
                    </div>
                    <div className="card-inside">
                        <img src={video.avatar} className="avatar-normal" alt="" />
                        <p className="card-title-inside">{video.description}</p>
                    </div>

                    {
                        likedVideos.findIndex(item => item.videoId === video.videoId) === -1
                            ? <FontAwesomeIcon icon={farThumbsUp} size="2x" onClick={() =>addToLikedVideos(video)} />
                            : <FontAwesomeIcon icon={faThumbsUp} size="2x" onClick={() =>removeFromLikedVideos(video)} />
                    }

                    {
                        watchLater.findIndex(item => item.videoId === video.videoId) === -1
                            ? <FontAwesomeIcon icon={farClock} size="2x" onClick={() => addToWatchLater(video)} />
                            : <FontAwesomeIcon icon={faClock} size="2x" onClick={() => removeFromWatchLater(video)} />
                    }

                    {
                        playLists.findIndex(item => item.videoId === video.videoId) === -1
                            ? <FontAwesomeIcon icon={farBookMark} size="2x" onClick={() => dispatch({type: "OPEN_MODAL"})} />
                            : <FontAwesomeIcon icon={faBookmark} size="2x" onClick={() => dispatch({ type: "REMOVE_FROM_PLAYLIST", payload: video })} />
                    }
                    { showModal && <Modal {...video} /> }
                </div >
            </div>
        </div>
    )
}
