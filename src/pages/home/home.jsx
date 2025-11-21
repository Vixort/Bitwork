import React from "react";
import "./component/heroSection.jsx";
import HeroSection from "./component/heroSection.jsx";
import Showcase from "./component/Showcase.jsx";
import Why from "./component/Why.jsx";
import AuthPage from "../Login/AuthPage.jsx";
import Spoiler from "./component/Spoiler.jsx";
import ExpSection from "./component/ExpSection.jsx";
import BusinessSteps from "./component/BusinessSteps.jsx";

const home = () => {
  return (
    <div>
      <HeroSection />
      <Showcase />
      <Why />
      <Spoiler></Spoiler>
      <ExpSection></ExpSection>
      {/* <BusinessSteps></BusinessSteps> */}
    </div>
  );
};

export default home;
