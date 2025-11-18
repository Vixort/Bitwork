import React from "react";
import "./heroSection.css";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

const heroSection = () => {
  return (
    <div>
      <div>
        <div className="heroImg">
          <div className="textHero">
            <h1 data-aos="fade-up" data-aos-duration="1000">
              Bitwork Bitkub
            </h1>
            <p data-aos="fade-up" data-aos-duration="1000">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Doloremque, in officiis? Vero alias in repellat porro temporibus
              mollitia, blanditiis fuga corrupti eaque nulla impedit esse
              eveniet deserunt ut quas nemo?
            </p>
            <button data-aos="fade-up" data-aos-duration="1000">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default heroSection;
