import React, { useContext } from "react";
import "./ProfileView.css";
import { useState, useEffect } from "react";
import { getPhotos, getStats } from "../../api/api";
import heart from "../../assets/heart.svg";
import MainStat from "../../components/MainStat/MainStat";
import Header from "../../components/Header/Header";
import { UserContext } from "../../App.jsx";
import { useParams } from "react-router-dom";

function ProfileView() {
    const {username, setUsername} = useContext(UserContext);
    let { urlUsername } = useParams();

    const [stats, setStats] = useState({});
    const [photos, setPhotos] = useState([]);


    setUsername(urlUsername ?? username);

    useEffect(() => {
        async function retrieveData() {
            const statsData = await getStats(username);
            const photosData = await getPhotos(username);
            setPhotos(photosData);
            setStats(statsData);
        }
        
        retrieveData();
    
        
    }, [username]);

    return (
        <div className="App">
<Header></Header>
            <section className="overall-wrapper">
                <div className="overall-content">
                    <div className="overall-profile">
                        <img className="profile-picture" src={stats?.profile_image?.large} alt="" />
                        <div className="name-wrapper">
                            <div className="profile-name">{stats?.name}</div>
                            <div className="profile-username">@{stats?.username}</div>
                        </div>
                        <div className="profile-bio">{stats?.bio}</div>
                        <div className="profile-location">{stats?.location}</div>
                    </div>
                    <div className="overall-stats-wrapper">
                        <div className="stats-wrapper-content">
                            <MainStat title="Downloads" name={stats?.downloads} ></MainStat>
                            <MainStat title="Followers" name={stats?.followers_count}></MainStat>
                        </div>
                    </div>
                </div>
            </section>
            <section className="photos-wrapper">
                <div className="photos-content">
                    {photos.map((photo) => (
                        <div className="photo-item">
                            <img className="photo" src={photo?.urls?.regular} alt="" />
                            <div className="photo-info">
                            <div className="views"></div>
                            <div className="downloads"></div>
                            <div className="likes">
                                <img className="heart-icon" src={heart} alt="" />
                                {/* <div className="liked-by-user">{photo.liked_by_user}</div> TODO: Find out why this promt is not showing up in view*/}
                                <div className="likes-amount"> {photo?.likes}</div>
                            </div>
                            </div>
                        </div>
                    ))}
                    </div>
            </section>
        </div>
    );
    }
    export default ProfileView;
