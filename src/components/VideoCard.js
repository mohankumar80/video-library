import React from 'react';
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { videosDB } from '../data/videosDB';
import { useVideos } from "../context/videos-context/videos-context";
import Modal from "./Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faClock, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as farThumbsUp, faClock as farClock, faBookmark as farBookMark } from '@fortawesome/free-regular-svg-icons'

export default function VideoCard() {

    const { state: { likedVideos, watchLater, playLists, showModal }, dispatch } = useVideos();

    //For getting the video id and mapping it
    const { VideoId } = useParams();
    const video = videosDB.find(video => video.videoId === VideoId)

    return (
        <div className="main-container">
            <div className="sub-container">
                <div className="VideoCard">
                    <ReactPlayer url={`www.youtube.com/watch?v=${video.videoId}`} controls className="videoPlayer" />
                    <div className="card-inside">
                        <img src={video.avatar} className="avatar-normal" alt="" />
                        <p className="card-title-inside">{video.description}</p>
                    </div>
                    {
                        likedVideos.findIndex(item => item.videoId === video.videoId) === -1
                            ? <FontAwesomeIcon icon={farThumbsUp} size="2x" onClick={() => dispatch({ type: "ADD_TO_LIKED_VIDEOS", payload: video })} />
                            : <FontAwesomeIcon icon={faThumbsUp} size="2x" onClick={() => dispatch({ type: "REMOVE_FROM_LIKED_VIDEOS", payload: video })} />
                    }
                    {
                        watchLater.findIndex(item => item.videoId === video.videoId) === -1
                            ? <FontAwesomeIcon icon={farClock} size="2x" onClick={() => dispatch({ type: "ADD_TO_WATCH_LATER", payload: video })} />
                            : <FontAwesomeIcon icon={faClock} size="2x" onClick={() => dispatch({ type: "REMOVE_FROM_WATCH_LATER", payload: video })} />
                    }
                    {
                        playLists.findIndex(item => item.videoId === video.videoId) === -1
                            // ? <i className="far fa-bookmark fa-2x" onClick={() => dispatch({ type: "ADD_TO_PLAYLIST", payload: video })}></i>
                            ? <FontAwesomeIcon icon={farBookMark} size="2x" onClick={() => dispatch({type: "OPEN_MODAL"})} />
                            : <FontAwesomeIcon icon={faBookmark} size="2x" onClick={() => dispatch({ type: "REMOVE_FROM_PLAYLIST", payload: video })} />
                    }
                    { showModal && <Modal {...video} /> }
                </div >
            </div>
        </div>
    )
}
