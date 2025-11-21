import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/home/home.jsx";
import Market from "./pages/Market/MarketMain.jsx";
import AuthPage from "./pages/Login/AuthPage.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
      </Routes>
    </div>
  );
};

export default App;
