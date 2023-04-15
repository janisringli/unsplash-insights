import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SinglePhotoView from './views/SinglePhotoView/SinglePhotoView'
import ProfileView from './views/ProfileView/ProfileView'

function App() {

  return (
    <div className="App">
        {/* <SinglePhotoView></SinglePhotoView> */}
        <ProfileView></ProfileView>

    </div>
  )
}

export default App
