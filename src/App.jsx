import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import SinglePhotoView from './views/SinglePhotoView/SinglePhotoView'
import ProfileView from './views/ProfileView/ProfileView'
import React, { createContext } from "react";
import { Route, Routes } from 'react-router-dom'

export const UserContext = createContext({username: "", setUsername: () => {}});

function App() {
  const [username, setUsername] = useState("janisringli");
const userContext = {username, setUsername};
  return (
    <UserContext.Provider value={userContext}>

    <div className="App">
    {/* TODO: import header here so it doesnt reloads the header everytime */}
      <Routes>
        <Route path="/profile/:urlUsername"
        element={<ProfileView />}/>
      </Routes>
        {/* <SinglePhotoView></SinglePhotoView> */}
        

    </div>
    </UserContext.Provider>
  )
}

export default App;
