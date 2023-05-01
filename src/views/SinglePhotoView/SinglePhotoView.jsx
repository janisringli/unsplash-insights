import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chart from "chart.js/auto";
import { getSinglePhotos, getSinglePhotoStats } from "../../api/api";
import "./SinglePhotoView.css";
import Header from "../../components/Header/Header";


function SinglePhotoView() {
  const [singlePhoto, setSinglePhoto] = useState({});
  const [singlePhotoStats, setSinglePhotoStats] = useState({});

  const { photoId } = useParams();
  Chart.defaults.backgroundColor = '#9BD0F5';
  Chart.defaults.color = '#000';
  useEffect(() => {
    async function retrieveData() {
      const singlePhotoData = await getSinglePhotos(photoId);
      const singlePhotoStatsData = await getSinglePhotoStats(photoId);

      setSinglePhoto(singlePhotoData);
      setSinglePhotoStats(singlePhotoStatsData);
    }

    retrieveData();
  }, [photoId]);

  useEffect(() => {
    const downloadsData = singlePhotoStats?.downloads?.historical?.values;
    const viewsData = singlePhotoStats?.views?.historical?.values;

    if (downloadsData && viewsData) {
      const downloadsChart = new Chart("downloads-chart", {
        type: "line",
        data: {
          labels: downloadsData.map((row) => row.date),
          datasets: [
            {
              label: "Downloads",
              data: downloadsData.map((row) => row.value),
            },
          ],
        },
      });

      const viewsChart = new Chart("views-chart", {
        type: "line",
        data: {
          labels: viewsData.map((row) => row.date),
          datasets: [
            {
              label: "Views",
              data: viewsData.map((row) => row.value),
            },
          ],
        },
      });

      return () => {
        downloadsChart.destroy();
        viewsChart.destroy();
      };
    }
  }, [singlePhotoStats]);

  return (
    <div className="App">
        <Header></Header>
      <div className="single-photo-view-wrapper">
      <div className="image-info">hello</div>
        <div className="image-info">hello</div>
        <div className="single-image-container">
        <a className="link-to-unsplash" href={singlePhoto?.links?.html} target="_blank"><img className="single-image"
            key={singlePhoto.id}
            src={singlePhoto?.urls?.small}
          /></a>
          
          <p className="unsplash-credit">Photo by <a className="link-to-unsplash" href={singlePhoto?.user?.links.html} target="_blank">{singlePhoto?.user?.first_name} {singlePhoto?.user?.last_name}</a> on <a className="link-to-unsplash" href={singlePhoto?.links?.html} target="_blank">Unsplash</a></p>
        </div>
      </div>
    <div className="chart-test">
      <div className="chart-wrapper">
        <div className="chart-item"><canvas id="downloads-chart"></canvas> </div>
        <div className="chart-item"> <canvas id="views-chart"></canvas></div>
       
      </div>
    </div>
    </div>
  );
}

export default SinglePhotoView;
