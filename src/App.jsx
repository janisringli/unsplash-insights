import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import SinglePhotoView from './views/SinglePhotoView/SinglePhotoView'
import ProfileView from './views/ProfileView/ProfileView'
import React, { createContext } from "react";
import { Route, Routes } from 'react-router-dom'
import SinglePhotoView from './views/SinglePhotoView/SinglePhotoView'

export const UserContext = createContext({username: "", setUsername: () => {}});
export const PhotoContext = createContext({photoId: "", setPhotoId: () => {}});

function App() {
  const [username, setUsername] = useState("janisringli");
  const [photoId, setPhotoId] = useState("")
const userContext = {username, setUsername};
const photoContext = {photoId, setPhotoId};
  return (
    <UserContext.Provider value={userContext}>

    <div className="App">
    {/* TODO: import header here so it doesnt reloads the header everytime */}
      <Routes>
        <Route path="/profile/:urlUsername"
        element={<ProfileView />}/>
        <Route path="/photo/:photoId" element={<SinglePhotoView />} Route />
      </Routes>
        {/* <SinglePhotoView></SinglePhotoView> */}
        

    </div>
    </UserContext.Provider>
  )
}

export default App;
