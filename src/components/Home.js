import React, { useState } from 'react';
import VideosListing from "./VideosListing";

export default function Home({ data, loading }) {

    const [searchData, setSearchData] = useState(null);
    
    const searchHandler = e => {
        const receivedData = e.target.value;
        setSearchData(receivedData)
    }

    const getSearched = (videosData, searchData) => {
        if(searchData) {
            return videosData.map(video => 
                video.description.toLowerCase().includes(searchData.toLowerCase()) 
                ? video 
                : undefined
            ).filter(video => video !== undefined)
        } 
        return videosData
    }

    const searchedData = getSearched( data, searchData)
 
    return (
        <div>
            <input type="text" className="input input-styled search-bar" placeholder="search videos ..." onChange={(e) => searchHandler(e)} />
            <div className="Home flex">
                {searchedData.map(video =>
                    <VideosListing video={video} key={video.videoId} />
                )}
            </div>
            { loading && <h2>loading ...</h2> }
        </div>
    )
}
