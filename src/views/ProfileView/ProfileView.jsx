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
  const [dateChevronUp, setDateChevronUp] = useState(false);
  const [viewsChevronUp, setViewsChevronUp] = useState(false);
  const [downloadsChevronUp, setDownloadsChevronUp] = useState(false);
  const [downloadRateChevronUp, setDownloadRateChevronUp] = useState(false);




  let navigateTo = useNavigate();

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

  const handleInsightsClick = (id) => {
    console.log(id);
    navigateTo(`/photo/${id}`); // Navigate to the photo's insights page
  };
  function filterByDate() {
    console.log("sort by date");
  }

  // ----------- Sort by Likes -------------

  function filterByLikes() {
    setLikeChevronUp(!likeChevronUp);

    if (!likeChevronUp) {
      const sortedPhotos = [...photos].sort((a, b) => b.likes - a.likes);
      setPhotos(sortedPhotos);
    }
    if (likeChevronUp) {
      const sortedPhotos = [...photos].sort((a, b) => a.likes - b.likes);
      setPhotos(sortedPhotos);
    }
  }
  const likeChevronStyle = {
    transform: likeChevronUp ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease-in-out",
  };

  // ---------- Sort by Date ---------------
  function filterByDate() {
    setDateChevronUp(!dateChevronUp);

    if (!dateChevronUp) {
        const sortedPhotos = [...photos].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); 
      setPhotos(sortedPhotos);
    }
    if (dateChevronUp) {
        const sortedPhotos = [...photos].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      setPhotos(sortedPhotos);
    }
  }
  const dateChevronStyle = {
    transform: dateChevronUp ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease-in-out",
  };
 
   // ----------- Sort by Views --------------
   function filterByViews() {
    setViewsChevronUp(!viewsChevronUp);
  
    if (!viewsChevronUp) {
      const sortedPhotos = [...photos].sort((a, b) => {
        const viewsA = Number(a.views.replace(/,/g, ''));
        const viewsB = Number(b.views.replace(/,/g, ''));
        return viewsB - viewsA;
      });
  
      setPhotos(sortedPhotos);
    }
    if (viewsChevronUp) {
      const sortedPhotos = [...photos].sort((a, b) => {
        const viewsA = Number(a.views.replace(/,/g, ''));
        const viewsB = Number(b.views.replace(/,/g, ''));
        return viewsA - viewsB;
      });
  
      setPhotos(sortedPhotos);
    }
  }
  const viewsChevronStyle = {
    transform: viewsChevronUp ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease-in-out",
  };
  
  // ------------- Sort by Downloads ------------
  function filterByDownloads() {
    setDownloadsChevronUp(!downloadsChevronUp);

    if (!downloadsChevronUp) {
        const sortedPhotos = [...photos].sort((a, b) => b.downloads - a.downloads);

        console.log("views Asscending")
        console.log(sortedPhotos)

      setPhotos(sortedPhotos);
    }
    if (downloadsChevronUp) {
        const sortedPhotos = [...photos].sort((a, b) => a.downloads - b.downloads);

        console.log(sortedPhotos)
      setPhotos(sortedPhotos);
    }
  }
  const downloadsChevronStyle = {
    transform: downloadsChevronUp ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease-in-out",
  };
  //------------- Sort by Download Rate ---------------
  function filterByDownloadRate() {
    setDownloadRateChevronUp(!downloadRateChevronUp);

    if (!downloadRateChevronUp) {
        const sortedPhotos = [...photos].sort((a, b) => b.download_rate - a.download_rate);

        console.log("views Asscending")
        console.log(sortedPhotos)

      setPhotos(sortedPhotos);
    }
    if (downloadRateChevronUp) {
        const sortedPhotos = [...photos].sort((a, b) => a.download_rate - b.download_rate);

        console.log(sortedPhotos)
      setPhotos(sortedPhotos);
    }
  }
  const downloadRateChevronStyle = {
    transform: downloadRateChevronUp ? "rotate(180deg)" : "rotate(0deg)",
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
              <div className="profile-username">@{stats?.username}</div>
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
                onClick={filterByDate}
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
              onClick={filterByLikes}
              className="chevronDown"
              src={chevronDown}
              alt=""
              style={likeChevronStyle}
            /></div>
            <div className="filter-item views">
              Views
              <img
                id="date"
                onClick={filterByViews}
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
                onClick={filterByDownloads}
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
                onClick={filterByDownloadRate}
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
              
                <a href={photo?.links?.html} target="_blank"><img className="photo" src={photo?.urls?.small} alt="" ></img></a>
              <div className="photo-info">
                <div className="likes-container">
                    <div className="likes">
                        <img className="heart-icon" src={heart} alt="" />
                        <div className="likes-amount"> {photo?.likes}</div>
                    </div>
                </div>
                <div className="views-amount">{photo?.views}</div>
                <div className="downloads-amount">{photo?.downloads}</div>
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
