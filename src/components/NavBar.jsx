import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { Link } from "react-router";

const NavBar = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    // ดึงขอมูลผู้ใช้ตรงนี้ ต้องทำใน  useEffect นะ เพราะว่า มันต้อง ReRender เพื่อเปลี่ยนชื่อเมื่อมีการอัพเดท
  });
  return (
    <div>
      <div className="Navfixed">
        <div className="navone">
          <div className="Container_NavBar">
            <div className="Logo">
              <img
                src="https://play-lh.googleusercontent.com/yv0V_QmpdtJB5CIY6iUL3ieHLcOv2-PlxwTFVZp6ofbzSQdUJpYe-Yt6lIQJ0BB8g0xH"
                alt=""
                className="LogoBitwork"
              />
              <h1 className="Bitwork">Bitwork</h1>
            </div>

            <div className="OnePlatform">
              One Platform for All Your Tech Needs
            </div>
            <div className="ProfileSetting">
              <div className="TextProfile">{username}</div>
              <div className="Profile">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="navtwo">
          <div className="Container_NavBarTwo">
            <div className="MarketPlace">
              <Link to="/market">MarketPlace</Link>
            </div>
            <div className="JobBoard">JobBoard</div>
            <div className="Community">Community</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
