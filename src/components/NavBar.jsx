/**
 * =============================================================================
 * NavBar.jsx - Navigation Bar Component (แถบเมนูนำทาง)
 * =============================================================================
 *
 * Component นี้เป็นแถบนำทาง (Navigation Bar) ที่แสดงอยู่ทุกหน้าของเว็บไซต์
 * ทำหน้าที่:
 * 1. แสดง Logo และชื่อแบรนด์ "Bitwork"
 * 2. แสดง Tagline "One Platform for All Your Tech Needs"
 * 3. แสดงข้อมูลผู้ใช้ (Profile)
 * 4. แสดงเมนูลิงก์ไปยังหน้าต่างๆ (Market, Jobs, Community)
 *
 * โครงสร้าง NavBar:
 * └── Navfixed (Fixed Position - ติดอยู่ด้านบนตลอด)
 *     ├── navone (แถบบน)
 *     │   ├── Logo + ชื่อ Bitwork
 *     │   ├── Tagline
 *     │   └── Profile Section
 *     └── navtwo (แถบล่าง - เมนู)
 *         ├── MarketPlace Link
 *         ├── JobBoard Link
 *         └── Community Link
 *
 */

// =============================================================================
// IMPORTS - นำเข้า Dependencies
// =============================================================================

import React, { useEffect, useState } from "react";

/**
 * NavBar.css - Styles สำหรับ NavBar
 * - กำหนด Fixed Position ให้ NavBar อยู่บนสุดตลอด
 * - กำหนด Layout แบบ Flexbox
 * - กำหนดสีและขนาดต่างๆ
 */
import "./NavBar.css";

/**
 * Link - Component จาก react-router สำหรับการนำทาง
 * - ใช้แทน <a> tag เพื่อไม่ให้ Reload หน้า
 * - ทำงานร่วมกับ BrowserRouter
 * - ให้ประสบการณ์ Single Page Application (SPA)
 */
import { Link } from "react-router";

// =============================================================================
// NAVBAR COMPONENT
// =============================================================================

/**
 * NavBar Component
 *
 * @description แถบนำทางหลักของเว็บไซต์ที่แสดงทุกหน้า
 * @returns {JSX.Element} - Navigation Bar พร้อม Logo, Tagline, Profile และ Menu Links
 *
 * State:
 * - username: ชื่อผู้ใช้ที่ Login อยู่ (ถ้ามี)
 *
 * การทำงาน:
 * 1. Component mount (แสดงครั้งแรก)
 * 2. useEffect ทำงาน - ดึงข้อมูลผู้ใช้ (ยังไม่ได้ implement)
 * 3. Render NavBar พร้อม Logo และ Menu Links
 */
const NavBar = () => {
  // =============================================================================
  // STATE MANAGEMENT - จัดการ State
  // =============================================================================

  /**
   * username State
   * - เก็บชื่อผู้ใช้ที่ Login อยู่
   * - ค่าเริ่มต้นเป็น "" (ว่าง) = ยังไม่ได้ Login
   * - จะถูกอัพเดทเมื่อผู้ใช้ Login สำเร็จ
   */
  const [username, setUsername] = useState("");

  // =============================================================================
  // SIDE EFFECTS - ผลข้างเคียง (useEffect)
  // =============================================================================

  /**
   * useEffect สำหรับดึงข้อมูลผู้ใช้
   *
   * การทำงาน:
   * - ทำงานทุกครั้งที่ Component re-render
   * - ควรเพิ่ม dependency array [] ถ้าต้องการให้ทำงานครั้งเดียว
   *
   * TODO: เพิ่ม Logic ดึงข้อมูลผู้ใช้จาก API หรือ LocalStorage
   * ตัวอย่าง:
   * - const storedUsername = localStorage.getItem('username');
   * - if (storedUsername) setUsername(storedUsername);
   */
  useEffect(() => {
    // ดึงขอมูลผู้ใช้ตรงนี้ ต้องทำใน  useEffect นะ เพราะว่า มันต้อง ReRender เพื่อเปลี่ยนชื่อเมื่อมีการอัพเดท
  });

  // =============================================================================
  // RENDER - แสดงผล Component
  // =============================================================================

  return (
    <div>
      {/* 
        Navfixed Container
        - ใช้ position: fixed ใน CSS
        - ทำให้ NavBar อยู่บนสุดของหน้าจอตลอดเวลา
        - ไม่เลื่อนตามเมื่อ scroll หน้า
      */}
      <div className="Navfixed">
        {/* =================================================================
            NAVONE - แถบ Navigation ส่วนบน
            แสดง: Logo, Tagline, Profile
        ================================================================= */}
        <div className="navone">
          <div className="Container_NavBar">
            {/* ----- Logo Section ----- */}
            {/* แสดง Logo รูปและชื่อ "Bitwork" */}
            <div className="Logo">
              {/* Logo Image - รูป Bitwork */}
              <img
                src="https://play-lh.googleusercontent.com/yv0V_QmpdtJB5CIY6iUL3ieHLcOv2-PlxwTFVZp6ofbzSQdUJpYe-Yt6lIQJ0BB8g0xH"
                alt=""
                className="LogoBitwork"
              />
              {/* ชื่อแบรนด์ */}
              <h1 className="Bitwork">Bitwork</h1>
            </div>

            {/* ----- Tagline Section ----- */}
            {/* Tagline/Slogan ของเว็บไซต์ */}
            <div className="OnePlatform">
              One Platform for All Your Tech Needs
            </div>

            {/* ----- Profile Section ----- */}
            {/* แสดงข้อมูลผู้ใช้ (ชื่อและรูปโปรไฟล์) */}
            <div className="ProfileSetting">
              {/* ชื่อผู้ใช้ - แสดงจาก state username */}
              <div className="TextProfile">{username}</div>
              {/* รูปโปรไฟล์ - ใช้รูป default ถ้ายังไม่ได้ Login */}
              <div className="Profile">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            NAVTWO - แถบ Navigation ส่วนล่าง (Menu Links)
            แสดง: Links ไปหน้าต่างๆ
        ================================================================= */}
        <div className="navtwo">
          <div className="Container_NavBarTwo">
            {/* ----- MarketPlace Link ----- */}
            {/* ลิงก์ไปหน้าตลาดซื้อขาย */}
            <div className="MarketPlace">
              <Link to="/market">MarketPlace</Link>
            </div>

            {/* ----- JobBoard Link ----- */}
            {/* ลิงก์ไปหน้าประกาศงาน */}
            <div className="JobBoard">
              <Link to="/jobs">JobBoard</Link>
            </div>

            {/* ----- Community Link ----- */}
            {/* ลิงก์ไปหน้าชุมชน/ฟอรัม */}
            <div className="Community">
              <Link to="/community">Community</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export NavBar Component เพื่อใช้ใน main.jsx
export default NavBar;
