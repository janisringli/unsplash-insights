import React from 'react';
import './Header.css';
import { useState } from 'react';
import globals from '../../globals.js';

function Header() {
    const [username, setUsername] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        globals.setUsername(username);
        console.log(globals.username);
      }
    
      function handleChange(event) {
        setUsername(event.target.value);
      }
  return (
    //search input field and search button that gets stored in a variable called username
    <div className="header-wrapper">
        <div className="header-content">
            <div className="header-title">Logo</div>
            <div className='header-right'>
                <div className="header-item">About</div>
            <form className="header-search" onSubmit={handleSubmit}>
                <input className="header-search-input" value={username} type="text" placeholder="Search for username" onChange={handleChange}/>
                <button type="submit" className="header-search-button">Search</button>
            </form>
            </div>
        </div>
    </div>

  );
}
export default Header;