import React from "react";
import "./component/heroSection.jsx";
import HeroSection from "./component/heroSection.jsx";
import Showcase from "./component/Showcase.jsx";
import Why from "./component/Why.jsx";

const home = () => {
  return (
    <div>
      <HeroSection />
      <Showcase />
      <Why />
    </div>
  );
};

export default home;
