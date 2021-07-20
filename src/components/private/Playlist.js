import React from 'react';
import VideosListing from "../VideosListing"
import { useVideos } from '../../context/videos-context/videos-context';

export default function Playlist() {

    const { state: { playLists } } = useVideos();

    return (
        <div className="PlayList">
            {
                playLists.length === 0
                    ? <h2 className="text-align-center empty-container">No Playlists Available</h2>
                    : <div>
                        {
                            playLists.map(playlist => {
                                return <div className="full-height">
                                    <h3>{playlist.name}</h3>
                                    <div className="flex-reverse">
                                        {
                                            playlist.playlist.map(video => {
                                                return <VideosListing video={video} />
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
