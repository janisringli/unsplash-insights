import React, { useContext } from "react";
import "./ProfileView.css";
import { useState, useEffect } from "react";
import { getPhotos, getStats } from "../../api/api";
import heart from "../../assets/heart.svg";
import MainStat from "../../components/MainStat/MainStat";
import Header from "../../components/Header/Header";
import chevronDown from "../../assets/chevron-down.svg";

import { UserContext } from "../../App.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ProfileView() {
  const { username, setUsername } = useContext(UserContext);
  let { urlUsername } = useParams();

  const [stats, setStats] = useState({});
  const [photos, setPhotos] = useState([]);

  //-------------------- Filteritems -----------------------
  const [likeChevronUp, setLikeChevronUp] = useState(false);
  const [dateChevronUp, setDateChevronUp] = useState(true);
  const [viewsChevronUp, setViewsChevronUp] = useState(false);
  const [downloadsChevronUp, setDownloadsChevronUp] = useState(false);
  const [downloadRateChevronUp, setDownloadRateChevronUp] = useState(false);




  let navigateTo = useNavigate();

  useEffect(() => {
    setUsername(urlUsername ?? username);
  },[setUsername, urlUsername, username])

  useEffect(() => {
    async function retrieveData() {
      const statsData = await getStats(username);
      const photosData = await getPhotos(username);
      setPhotos(photosData);
      setStats(statsData);
    }
    retrieveData();
  }, [username]);
  

  const handleInsightsClick = (id) => {
    console.log(id);
    navigateTo(`/photo/${id}`); // Navigate to the photo's insights page
  };
  
  function filterPhotos(sortType) {
    let sortedPhotos = [];
  
    switch(sortType) {
      case 'likes':
        sortedPhotos = [...photos].sort((a, b) => {
          return likeChevronUp ? a.likes - b.likes : b.likes - a.likes;
        });
        setLikeChevronUp(!likeChevronUp);
        setDateChevronUp(false);
        setViewsChevronUp(false);
        setDownloadsChevronUp(false);
        setDownloadRateChevronUp(false);  
        break;
      case 'date':
        sortedPhotos = [...photos].sort((a, b) => {
          return dateChevronUp ? new Date(a.created_at) - new Date(b.created_at) : new Date(b.created_at) - new Date(a.created_at);
        });
        setDateChevronUp(!dateChevronUp);
        setLikeChevronUp(false);
        setViewsChevronUp(false);
        setDownloadsChevronUp(false);
        setDownloadRateChevronUp(false); 
        break;
      case 'views':
        sortedPhotos = [...photos].sort((a, b) => {
          const viewsA = Number(a.views.replace(/,/g, ''));
          const viewsB = Number(b.views.replace(/,/g, ''));
          return viewsChevronUp ? viewsA - viewsB : viewsB - viewsA;
        });
        setViewsChevronUp(!viewsChevronUp);
        setDateChevronUp(false);
        setLikeChevronUp(false);
        setDownloadsChevronUp(false);
        setDownloadRateChevronUp(false); 
        break;
      case 'downloads':
        sortedPhotos = [...photos].sort((a, b) => {
            const downloadsA = Number(a.downloads.replace(/,/g, ''));
          const downloadsB = Number(b.downloads.replace(/,/g, ''));
          return downloadsChevronUp ? downloadsA - downloadsB : downloadsB - downloadsA;
        });
        setDownloadsChevronUp(!downloadsChevronUp);
        setDateChevronUp(false);
        setViewsChevronUp(false);
        setLikeChevronUp(false);
        setDownloadRateChevronUp(false); 
        break;
      case 'downloadRate':
        sortedPhotos = [...photos].sort((a, b) => {
          return downloadRateChevronUp ? a.download_rate - b.download_rate : b.download_rate - a.download_rate;
        });
        setDownloadRateChevronUp(!downloadRateChevronUp);
        setDateChevronUp(false);
        setViewsChevronUp(false);
        setDownloadsChevronUp(false);
        setLikeChevronUp(false); 
        break;
      default:
        sortedPhotos = photos;
    }
  
    setPhotos(sortedPhotos);
  }
  const downloadRateChevronStyle = {
    transform: downloadRateChevronUp ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease-in-out",
  };
  const downloadsChevronStyle = {
    transform: downloadsChevronUp ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease-in-out",
  };
  const viewsChevronStyle = {
    transform: viewsChevronUp ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease-in-out",
  };
  const dateChevronStyle = {
    transform: dateChevronUp ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease-in-out",
  };
  const likeChevronStyle = {
    transform: likeChevronUp ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease-in-out",
  };
  
  
  return (
    <div className="App">
      <Header></Header>
      <section className="overall-wrapper">
        <div className="overall-content">
          <div className="overall-profile">
            <img
              className="profile-picture"
              src={stats?.profile_image?.large}
              alt=""
            />
            <div className="name-wrapper">
              <div className="profile-name">{stats?.name}</div>
              <a className="link-to-unsplash" href={stats?.links?.html} target="_blank"><div className="profile-username">@{stats?.username}</div></a>
            </div>
            {/* <div className="profile-bio">{stats?.bio}</div> */}
            <div className="profile-location">{stats?.location}</div>
          </div>
          <div className="overall-stats-wrapper">
            <div className="stats-wrapper-content">
              <MainStat title="Downloads" name={stats?.downloads}></MainStat>
              <MainStat
                title="Followers"
                name={stats?.followers_count}
              ></MainStat>
            </div>
          </div>
        </div>
      </section>
      <section className="filter-section">
        <div className="filter-wrapper">
          <div className="filter-content">
            <div className="filter-item date">
              Created At
              <img
                id="date"
                onClick={() => filterPhotos('date')}
                className="chevronDown"
                src={chevronDown}
                alt=""
                style={dateChevronStyle}
              />
            </div>

            <div className="filter-item image">Preview</div>

            <div className="filter-item filter-likes">Likes
            <img
              id="likes"
              onClick={() => filterPhotos('likes')}
              className="chevronDown"
              src={chevronDown}
              alt=""
              style={likeChevronStyle}
            /></div>
            <div className="filter-item views">
              Views
              <img
                id="date"
                onClick={() => filterPhotos('views')}
                className="chevronDown"
                src={chevronDown}
                alt=""
                style={viewsChevronStyle}
              />
            </div>
            <div className="filter-item downloads">
             Downloads
              <img
                id="date"
                onClick={() => filterPhotos('downloads')}
                className="chevronDown"
                src={chevronDown}
                alt=""
                style={downloadsChevronStyle}
              />
            </div>
            <div className="filter-item download-rate">
             Download Rate
              <img
                id="date"
                onClick={() => filterPhotos('downloadRate')}
                className="chevronDown"
                src={chevronDown}
                alt=""
                style={downloadRateChevronStyle}
              />
            </div>
          
          </div>
        </div>
      </section>
      <section className="photos-wrapper">
        <div className="photos-content">
          {photos.map((photo) => (
            <div className="photo-item" key={photo.id}>
              <div className="photo-created-at">{photo?.created_at}</div>
              
                <a className="preview" href={photo?.links?.html} target="_blank"><img className="photo" src={photo?.urls?.small} alt="" ></img></a>
              <div className="photo-info">
                <div className="likes-container">
                    <div className="likes">
                        <img className="heart-icon" src={heart} alt="" />
                        <div className="likes-amount"> {photo?.likes}</div>
                    </div>
                </div>
                <div className="views-amount">{photo?.statistics?.views.total}</div>
                <div className="downloads-amount">{photo?.statistics?.downloads?.total}</div>
                <div className="download-rate-amount">{photo?.download_rate}%</div>
                {/* <div className="id">{photo.id}</div> */}
                <button onClick={() => handleInsightsClick(photo.id)}>
                  Get Insights
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default ProfileView;
