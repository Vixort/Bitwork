/**
 * =============================================================================
 * App.jsx - Main Application Router (ตัวจัดการเส้นทางหลัก)
 * =============================================================================
 *
 * ไฟล์นี้เป็น Component หลักที่จัดการ Routing ของแอปพลิเคชัน
 * ทำหน้าที่:
 * 1. กำหนดเส้นทาง (Routes) ทั้งหมดของเว็บไซต์
 * 2. เชื่อมโยง URL กับ Component/หน้าที่จะแสดง
 * 3. รวมศูนย์การนำทางไว้ที่เดียว ง่ายต่อการจัดการ
 *
 * โครงสร้างหน้าเว็บ:
 * ├── / (Home)        - หน้าแรก
 * ├── /home           - หน้าแรก (alias)
 * ├── /market         - ตลาดซื้อขายสินค้า
 * ├── /jobs           - หน้าประกาศงาน
 * ├── /community      - ชุมชน/ฟอรัม
 * ├── /login          - หน้าเข้าสู่ระบบ
 * └── /register       - หน้าสมัครสมาชิก
 *
 */

// =============================================================================
// IMPORTS - นำเข้า Dependencies
// =============================================================================

import React from "react";

/**
 * Routes และ Route จาก react-router
 * - Routes: Container ที่ครอบ Route ทั้งหมด (เลือก render Route เดียวที่ match)
 * - Route: กำหนดเส้นทางและ Component ที่จะแสดง
 *
 * การทำงาน:
 * - เมื่อ URL เปลี่ยน, Routes จะเปรียบเทียบกับ path ของแต่ละ Route
 * - Route ที่ path ตรงกับ URL จะถูก render
 * - ถ้าไม่มี Route ไหนตรง จะไม่แสดงอะไร (หรือแสดง 404 ถ้าตั้งค่าไว้)
 */
import { Routes, Route } from "react-router";

// =============================================================================
// PAGE IMPORTS - นำเข้าหน้าต่างๆ
// =============================================================================

/**
 * Home Page - หน้าแรกของเว็บไซต์
 * - แสดง Hero Section, Showcase, Why Bitwork, Spoiler, Experience
 * - เป็นหน้า Landing Page หลัก
 */
import Home from "./pages/home/home.jsx";

/**
 * Market Page - หน้าตลาดซื้อขาย
 * - แสดงสินค้าที่ขายในระบบ
 * - มีระบบค้นหา, กรองหมวดหมู่, ตะกร้าสินค้า
 * - แสดงราคาเป็นเงินบาท (฿)
 */
import Market from "./pages/Market/MarketMain.jsx";

/**
 * AuthPage - หน้า Login/Register
 * - ใช้ Component เดียวกันสำหรับทั้ง Login และ Register
 * - มี Toggle สลับระหว่างสองโหมด
 * - รองรับ Social Login (Google, Facebook, Apple)
 */
import AuthPage from "./pages/Login/AuthPage.jsx";

/**
 * JobMain - หน้าประกาศงาน
 * - แสดงรายการงานที่เปิดรับสมัคร
 * - มีระบบกรองตาม Category, Location, Job Type
 * - แสดงรายละเอียดงานและปุ่มสมัคร
 */
import JobMain from "./pages/JobBoard/JobMain.jsx";

/**
 * CommunityMain - หน้าชุมชน/ฟอรัม
 * - แสดงกระทู้และการสนทนา
 * - มีหมวดหมู่ต่างๆ (ถาม-ตอบ, แชร์ประสบการณ์, รีวิวบริษัท)
 * - มี Trending Topics และ Top Contributors
 */
import CommunityMain from "./pages/Community/CommunityMain.jsx";

/**
 * SettingMain - หน้าตั้งค่าบัญชี
 * - ข้อมูลบัญชีผู้ใช้, ความปลอดภัย, การเงิน
 * - จัดการร้านค้า, การแจ้งเตือน, ธีม
 * - เชื่อมต่อ Social Login
 */
import SettingMain from "./pages/Setting/SettingMain.jsx";

// =============================================================================
// APP COMPONENT - Component หลักของแอปพลิเคชัน
// =============================================================================

/**
 * App Component
 *
 * @description Component หลักที่จัดการ Routing ทั้งหมด
 * @returns {JSX.Element} - Routes Container พร้อม Route ทั้งหมด
 *
 * การทำงาน:
 * 1. รับ URL ปัจจุบันจาก BrowserRouter (ที่ครอบอยู่ใน main.jsx)
 * 2. เปรียบเทียบ URL กับ path ของแต่ละ Route
 * 3. Render Component ที่ตรงกับ path
 *
 * หมายเหตุ:
 * - NavBar ไม่ได้อยู่ในนี้ เพราะต้องการให้แสดงทุกหน้า
 * - NavBar ถูกวางไว้ใน main.jsx นอก App Component
 */
const App = () => {
  return (
    <div>
      {/* 
        Routes Container
        - ครอบ Route ทั้งหมด
        - จะเลือก render Route เดียวที่ path ตรงกับ URL
      */}
      <Routes>
        {/* 
          Route: หน้าแรก (/)
          - path="/" หมายถึง URL: http://localhost:5173/
          - element={<Home />} หมายถึง render component Home
        */}
        <Route path="/" element={<Home />} />

        {/* 
          Route: หน้าแรก (/home)
          - alias ของหน้าแรก ให้เข้าได้ทั้ง / และ /home
          - ทำให้ user เข้าถึงได้หลายทาง
        */}
        <Route path="/home" element={<Home />} />

        {/* 
          Route: หน้าตลาด (/market)
          - แสดงหน้า Market สำหรับซื้อขายสินค้า
          - URL: http://localhost:5173/market
        */}
        <Route path="/market" element={<Market />} />

        {/* 
          Route: หน้าประกาศงาน (/jobs)
          - แสดงรายการงานที่เปิดรับสมัคร
          - URL: http://localhost:5173/jobs
        */}
        <Route path="/jobs" element={<JobMain />} />

        {/* 
          Route: หน้าชุมชน (/community)
          - แสดงฟอรัมและกระทู้
          - URL: http://localhost:5173/community
        */}
        <Route path="/community" element={<CommunityMain />} />

        {/* 
          Route: หน้าเข้าสู่ระบบ (/login)
          - แสดงฟอร์ม Login
          - ใช้ Component AuthPage เหมือนกับ /register
          - URL: http://localhost:5173/login
        */}
        <Route path="/login" element={<AuthPage />} />

        {/* 
          Route: หน้าสมัครสมาชิก (/register)
          - แสดงฟอร์ม Register
          - ใช้ Component AuthPage เหมือนกับ /login
          - Component จะตรวจสอบ path และแสดงโหมดที่เหมาะสม
          - URL: http://localhost:5173/register
        */}
        <Route path="/register" element={<AuthPage />} />

        {/* 
          Route: หน้าตั้งค่าบัญชี (/settings)
          - จัดการข้อมูลบัญชี ความปลอดภัย การเงิน
          - ตั้งค่าร้านค้า การแจ้งเตือน ธีม
          - URL: http://localhost:5173/settings
        */}
        <Route path="/settings" element={<SettingMain />} />
      </Routes>
    </div>
  );
};

// Export App Component เพื่อใช้ใน main.jsx
export default App;
