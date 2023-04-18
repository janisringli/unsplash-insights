import React from 'react';
import './Header.css';
import { useState, useContext } from 'react';
// import globals from '../../globals.js';
import { UserContext } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';

function Header() {
    const {username ,setUsername} = useContext(UserContext);
    const [tempUsername, setTempUsername] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        setUsername(tempUsername);
        navigate(`/profile/${tempUsername}`);

      }
    
      function handleChange(event) {
        setTempUsername(event.target.value);

      }
  return (
    //search input field and search button that gets stored in a variable called username
    <div className="header-wrapper">
        <div className="header-content">
            <div className="header-title">Logo</div>
            <div className='header-right'>
                <div className="header-item">About</div>
            <form className="header-search" onSubmit={handleSubmit}>
                <input className="header-search-input" value={tempUsername} type="text" placeholder="Search for username" onChange={handleChange}/>
                <button type="submit" className="header-search-button">Search</button>
            </form>
            </div>
        </div>
    </div>

  );
}
export default Header;