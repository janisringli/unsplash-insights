import React from "react";
import "./PhotoFilter.css"
import chevronDown from "../../assets/chevron-down.svg"


function PhotoFilter(){
    let rotation = 0;
    function filterByDate(){
        const tag = document.getElementById("date")
        rotation = rotation + 180
        tag.style.rotate = rotation + "deg";
    }
    function filterByLikes(){
        const tag = document.getElementById("likes")
        rotation = rotation + 180
        tag.style.rotate = rotation + "deg";
    }
    return(
        <div className="filter-wrapper">
            <div className="filter-content">
            <div className="filter-item date">Created At
            <img id="date" onClick={filterByDate} className="chevronDown" src={chevronDown} alt="" /></div>

            <div className="filter-item image">Preview
            
            </div>
                
                <div className="filter-item filter-likes">Likes</div>
                <img id="likes" onClick={filterByLikes} className="chevronDown" src={chevronDown} alt="" />
            </div>
        </div>
    )
}
export default PhotoFilter;