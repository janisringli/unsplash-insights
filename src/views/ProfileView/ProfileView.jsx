import React from "react";
import { useState, useEffect } from "react";
import { getPhotos, getStats } from "../../api/api";

function ProfileView() {
   
    const [stats, setStats] = useState({});
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        async function retrieveData() {
            const statsData = await getStats();
            const photosData = await getPhotos();
            setPhotos(photosData);
            setStats(statsData);
        }
    
        retrieveData();
    }, []);
    
    return (
        <div className="App">
        <div>
            <div>
                <p>id: {stats.id}</p>
                <p>username: {stats.username}</p>
                <p>name: {stats.name}</p>
                <p>portfolio_url: {stats.portfolio_url}</p>
                <p>bio: {stats.bio}</p>
                <p>location: {stats.location}</p>
                <p>total_likes: {stats.total_likes}</p>
                <p>total_photos: {stats.total_photos}</p>
                <p>total_collections: {stats.total_collections}</p>
                <p>instagram_username: {stats.instagram_username}</p>
                <p>twitter_username: {stats.twitter_username}</p>
                <img src={stats?.profile_image?.large}></img>
                {/* /* <p>links: {stats.links}</p>  */}
                </div>
        </div>
        </div>
    );
    }
    export default ProfileView;
