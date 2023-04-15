import React from "react";
import { useState, useEffect } from "react";
import { getPhotos, getSinglePhotos } from "../../api/api";
import { useParams } from "react-router-dom";

function SinglePhotoView() {
    const [singlePhoto, setSinglePhoto] = useState({});
   // const { photoId } = useParams("93NY0dTeUYE");
 let photoId = "93NY0dTeUYE"
    useEffect(() => {
        async function retrieveData() {
        const singlePhotoData = await getSinglePhotos(photoId);
        setSinglePhoto(singlePhotoData);
        }
    
        retrieveData();
    }, []);
    
    return (
        <div className="App">
        <div>Hello World</div>
        <div>
            <div>
                <img
                key={singlePhoto.id}
                 src={singlePhoto?.urls?.small}
                alt={singlePhoto.alt_description}
                />
                <p>id: {singlePhoto.id}</p>
            </div>
        </div>
        </div>
    );
    }
    export default SinglePhotoView;