import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import HeroSection from "./components/HeroSection";
import GameSelection from "./components/GameSelection";
import "./App.css";
import GamedevAI from "./components/GenAI";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Game" element={<GameSelection />} />
        <Route path="/gameai" element={<GamedevAI />} />
      </Routes>
    </Router>
  );
}

export default App;