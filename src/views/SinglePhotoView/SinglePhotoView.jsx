import React from "react";
import { useState, useEffect } from "react";
import { getPhotos, getSinglePhotos } from "../../api/api";
import { useParams } from "react-router-dom";

function SinglePhotoView() {
    const [singlePhoto, setSinglePhoto] = useState({});
   // const { photoId } = useParams("93NY0dTeUYE");
//  let photoId = "0D356Mbgs7o"
 const url = window.location.href

        function extractPhotoName(url) {
            const regex = /photo\/(.+)/;
            const match = url.match(regex);
            if (match && match.length > 1) {
              const photoId = match[1];
              return photoId;
            } else {
              return null;
            }
          }
          
          
          const photoId = extractPhotoName(url);
          console.log(photoId);
    useEffect(() => {
        

        async function retrieveData() {
        const singlePhotoData = await getSinglePhotos(photoId);
        setSinglePhoto(singlePhotoData);
        }
    
        retrieveData();
    }, []);
    
    return (
        <div className="App">
        <div>
            <div>
                <img
                key={singlePhoto.id}
                 src={singlePhoto?.urls?.small}
                alt={singlePhoto.alt_description}
                />
                <p>id: {singlePhoto.id}</p>
            </div>
            <div className="evaluation-wrapper">
                <div className="evaluation-content">
                
                </div>
            </div>
        </div>
        </div>
    );
    }
    export default SinglePhotoView;