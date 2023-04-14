import React from 'react';
import {getPhotos, getStats, getSinglePhotos} from '../api/api';
import { useState, useEffect } from 'react'

function Test() {
    const [photos, setPhotos] = useState([]);
    const [stats, setStats] = useState({});
    const [singlePhoto, setSinglePhoto] = useState({});
    

    useEffect(() => {
      async function retrieveData() {
        const photosData = await getPhotos();
        const statsData = await getStats();
        const singlePhotoData = await getSinglePhotos();
        setPhotos(photosData);
        setStats(statsData);
        setSinglePhoto(singlePhotoData);
        console.log(photosData)
        console.log(statsData)
        console.log(singlePhotoData)
      }
      
      // console.log(photos[0])

      retrieveData();
    }, []);
  return (
    <div className="App">
        <div>Hello World</div>
        <div>
          {photos.map(photo => (
            <div>
            <img key={photo.id} src={photo.urls.small} alt={photo.alt_description} />
            <p>id: {photo.id}</p>
            </div>
  
          ))}
          </div>
    </div>
  );
}


export default Test;