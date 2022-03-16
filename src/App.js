import { useState } from "react";
import { Routes, Route, Navigate  } from 'react-router-dom';

import "./App.css";

import Login from "./components/Login";
import Search from "./components/Search";
import EmpData from "./components/EmpData";
import Footer from "./components/Footer";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" 
           element = {<Navigate replace to="/login" /> }>
        </Route>
        <Route path="/login" element={<Login setIsAuthenticated = {setIsAuthenticated}/>}></Route>
        <Route path="/search/page/:pageNo" element={isAuthenticated ? <Search /> : <Login setIsAuthenticated = {setIsAuthenticated}/>}></Route>
        <Route path="/empdata/:id" element={isAuthenticated ? <EmpData /> : <Login setIsAuthenticated = {setIsAuthenticated}/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
