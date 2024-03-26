import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Intro from './Intro/Intro';
import Main from './Main/Main';


function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Intro/>}/>
        <Route path='/main' element={<Main/>}/> 
      </Routes>
    </div>
  );
}

export default App;
