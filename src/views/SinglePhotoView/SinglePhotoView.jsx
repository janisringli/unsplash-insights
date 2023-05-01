import React from "react";
import { useState, useEffect } from "react";
import { getPhotos, getSinglePhotos } from "../../api/api";
import { useParams } from "react-router-dom";
import "./SinglePhotoView.css"

function SinglePhotoView() {
  const [singlePhoto, setSinglePhoto] = useState({});
  const { photoId } = useParams();
  console.log(photoId);

  useEffect(() => {
    async function retrieveData() {
      const singlePhotoData = await getSinglePhotos(photoId);
      setSinglePhoto(singlePhotoData);
      
    }

    retrieveData();
    
  }, [photoId]);
  return (
    <div className="App">
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
        <div className="evaluation-wrapper">
          <div>
         
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePhotoView;
