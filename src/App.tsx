import React from 'react';
import './App.css';
import {
  Routes,
  Route
} from "react-router-dom"
import {LoginPage} from "./components/LoginPage";

function App() {
  return (    <div className={'App'}>
      <LoginPage/>
      <header >
      </header>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/card-learning' element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
