import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/home/home.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
