import React from 'react';
import VideosListing from "../VideosListing"
import { useVideos } from '../../context/videos-context/videos-context';

export default function Playlist() {

    const { state: { playLists } } = useVideos();

    return (
        <div className="PlayList">
            {
                playLists.length === 0
                    ? <h1>No Playlists Available</h1>
                    : <div>
                        {
                            playLists.map(playlist => {
                                return <>
                                    <h3>{playlist.name}</h3>
                                    <p>{console.log(playlist.playlist)}</p>
                                    {
                                        playlist.playlist.map(video => {
                                            return <VideosListing video={video} />
                                        })
                                    }
                                </>
                            })
                        }
                    </div>
            }
        </div>
    )
}
