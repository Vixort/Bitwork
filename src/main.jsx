import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./components/NavBar.jsx";
import "./index.css";
import App from "./App.jsx";
import "./pages/home/home.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar />
      <App />
    </BrowserRouter>
  </StrictMode>
);
