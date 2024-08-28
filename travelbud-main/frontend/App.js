import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Register from "./Register";
import HomePage from "./components/Homepage";
import Logout from "./components/Logout";
import Loginform from "./components/Loginform";
import DestinationItem from './components/DestinationItem';
import DestinationSite from "./components/DestinationSite";


export default function App(){
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/destination/:id" element={<DestinationSite />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Loginform />} />
            <Route path="/logout" element={<Logout />} />
            <Route path='/add_destination' element={<DestinationItem />} />
          </Routes>
        </BrowserRouter>
        </div>
      </header>
    </div>
  );
}
