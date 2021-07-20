import React from 'react';
import { Link } from "react-router-dom";
import { useVideos } from '../../context/videos-context/videos-context';

export default function LikedVideos() {

    const { state: { likedVideos }, dispatch } = useVideos();

    return (
        <div className="LikedVideos">
            {
                likedVideos.length === 0
                    ? <h2 className="text-align-center empty-container">No liked videos!!</h2>
                    : <div className="flex-reverse">
                        {
                            likedVideos.map(video => {
                                return <div key={video.videoId} className="card card-margin">
                                    <Link to={`/watch/${video.videoId}`}>
                                        <img className="card-img" src={video.thumbnail} alt={video.description} />
                                    </Link>
                                    <button className="card-dismiss btn btn-primary" onClick={() => dispatch({ type: "REMOVE_FROM_LIKED_VIDEOS", payload: video })}>&times;</button>
                                    <div className="card-body">
                                        <img src={video.avatar} className="avatar-normal" alt="" />
                                        <p className="card-title">{video.description}</p>
                                    </div>
                                </div>
                            })
                        }
                    </div>
            }
        </div>
    )
}
