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
 * JobDetail - หน้ารายละเอียดงานแบบเต็ม
 * - แสดงข้อมูลงานครบถ้วน
 * - รายละเอียดตำแหน่ง, คุณสมบัติ, สวัสดิการ
 * - ข้อมูลบริษัท, ปุ่มสมัครงาน
 */
import JobDetail from "./pages/JobBoard/JobDetail.jsx";

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

/**
 * ProfileMain - หน้าโปรไฟล์ผู้ใช้
 * - แสดงข้อมูลสาธารณะของผู้ใช้
 * - สินค้า, โพสต์, รีวิว, ทักษะ
 * - ปุ่มติดตามและส่งข้อความ
 */
import ProfileMain from "./pages/Profile/ProfileMain.jsx";
import OrdersMain from "./pages/Orders/OrdersMain.jsx";
import OrderDetail from "./pages/Orders/OrderDetail.jsx";

/**
 * ScrollToTop - Component สำหรับเลื่อนขึ้นบนสุดเมื่อเปลี่ยนหน้า
 * - แก้ปัญหาที่หน้าใหม่ไม่กลับขึ้นด้านบนหลังจากเลื่อนลงไว้
 * - ทำงานอัตโนมัติทุกครั้งที่เปลี่ยน route
 */
import ScrollToTop from "./components/ScrollToTop.jsx";

/**
 * NotFound - หน้า 404
 * - แสดงเมื่อเข้า URL ที่ไม่มีในระบบ
 * - มีลิงก์นำทางกลับไปหน้าหลัก
 */
import NotFound from "./pages/NotFound/NotFound.jsx";

/**
 * ChatMain - หน้าข้อความ/แชท
 * - สนทนากับลูกค้าและผู้สมัครงาน
 * - แยกออกจากหน้า Settings เพื่อความสะดวก
 */
import ChatMain from "./pages/Chat/ChatMain.jsx";

// =============================================================================
// ADMIN PANEL IMPORTS - นำเข้าหน้า Admin Panel
// =============================================================================

/**
 * AdminLogin - หน้าเข้าสู่ระบบ Admin
 * - หน้าเข้าสู่ระบบแยกสำหรับผู้ดูแลร้านค้า
 */
import AdminLogin from "./pages/Admin/AdminLogin.jsx";

/**
 * AdminLayout - Layout สำหรับ Admin Panel
 * - มี Sidebar และ Content Area
 * - ใช้ Outlet สำหรับ nested routes
 */
import AdminLayout from "./pages/Admin/AdminLayout.jsx";

/**
 * AdminDashboard - แดชบอร์ดหลักของ Admin
 * - แสดงสถิติร้านค้า, คำสั่งซื้อล่าสุด
 */
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";

/**
 * AdminProducts - จัดการสินค้า
 * - เพิ่ม แก้ไข ลบสินค้าในร้าน
 */
import AdminProducts from "./pages/Admin/AdminProducts.jsx";

/**
 * AdminCategories - จัดการหมวดหมู่
 * - เพิ่ม แก้ไข ลบหมวดหมู่สินค้า
 */
import AdminCategories from "./pages/Admin/AdminCategories.jsx";

/**
 * AdminOrders - จัดการคำสั่งซื้อ
 * - ดูและอัพเดทสถานะคำสั่งซื้อ
 */
import AdminOrders from "./pages/Admin/AdminOrders.jsx";

/**
 * AdminUsers - จัดการผู้ใช้งาน
 * - ดูข้อมูลลูกค้า ระงับบัญชี
 */
import AdminUsers from "./pages/Admin/AdminUsers.jsx";

/**
 * AdminRegister - หน้าสมัครร้านค้า
 * - ลงทะเบียนเปิดร้านค้าใหม่
 */
import AdminRegister from "./pages/Admin/AdminRegister.jsx";

/**
 * AdminStoreSettings - หน้าตั้งค่าโปรไฟล์ร้านค้า
 * - จัดการข้อมูลร้าน, โลโก้, แบนเนอร์
 * - ตั้งค่าเวลาทำการ, นโยบายร้านค้า
 */
import AdminStoreSettings from "./pages/Admin/AdminStoreSettings.jsx";

/**
 * StoreProfile - หน้าโปรไฟล์ร้านค้าสาธารณะ
 * - แสดงข้อมูลร้าน, สินค้า showcase
 * - หน้าที่ลูกค้าจะเห็นเมื่อเข้าชมร้าน
 */
import StoreProfile from "./pages/Admin/StoreProfile.jsx";

/**
 * Navigate - สำหรับ Redirect
 * - ใช้ redirect จาก /admin ไป /admin/dashboard
 */
import { Navigate } from "react-router";

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
      {/* ScrollToTop จะทำงานเบื้องหลัง เลื่อนขึ้นบนทุกครั้งที่เปลี่ยนหน้า */}
      <ScrollToTop />

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
          Route: หน้ารายละเอียดงาน (/jobs/:jobId)
          - แสดงรายละเอียดงานแบบเต็ม
          - URL: http://localhost:5173/jobs/1
        */}
        <Route path="/jobs/:jobId" element={<JobDetail />} />

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

        {/* User Orders - My Orders page */}
        <Route path="/orders" element={<OrdersMain />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />

        {/* 
          Route: หน้าโปรไฟล์ผู้ใช้ (/profile/:username)
          - แสดงข้อมูลสาธารณะของผู้ใช้
          - สินค้า, โพสต์, รีวิว, ทักษะ
          - URL: http://localhost:5173/profile/somchai_dev
        */}
        <Route path="/profile/:username" element={<ProfileMain />} />

        {/* 
          Route: หน้าข้อความ/แชท (/chat)
          - สนทนากับลูกค้าและผู้สมัครงาน
          - URL: http://localhost:5173/chat
        */}
        <Route path="/chat" element={<ChatMain />} />

        {/* =================================================================
          ADMIN PANEL ROUTES - เส้นทางสำหรับ Admin Panel
          ================================================================= */}

        {/* 
          Route: หน้าเข้าสู่ระบบ Admin (/admin/login)
          - หน้า Login แยกสำหรับผู้ดูแลร้านค้า
          - URL: http://localhost:5173/admin/login
        */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 
          Route: หน้าสมัครร้านค้า (/admin/register)
          - ลงทะเบียนเปิดร้านค้าใหม่
          - URL: http://localhost:5173/admin/register
        */}
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* 
          Route: Admin Panel (/admin)
          - ใช้ AdminLayout เป็น wrapper สำหรับ nested routes
          - มี Sidebar navigation และ content area
        */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Redirect /admin ไปที่ /admin/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* 
            Route: แดชบอร์ด (/admin/dashboard)
            - แสดงสถิติร้านค้า, คำสั่งซื้อล่าสุด
            - URL: http://localhost:5173/admin/dashboard
          */}
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* 
            Route: จัดการสินค้า (/admin/products)
            - เพิ่ม แก้ไข ลบสินค้า
            - URL: http://localhost:5173/admin/products
          */}
          <Route path="products" element={<AdminProducts />} />

          {/* 
            Route: จัดการหมวดหมู่ (/admin/categories)
            - เพิ่ม แก้ไข ลบหมวดหมู่
            - URL: http://localhost:5173/admin/categories
          */}
          <Route path="categories" element={<AdminCategories />} />

          {/* 
            Route: จัดการคำสั่งซื้อ (/admin/orders)
            - ดูและอัพเดทสถานะคำสั่งซื้อ
            - URL: http://localhost:5173/admin/orders
          */}
          <Route path="orders" element={<AdminOrders />} />

          {/* 
            Route: จัดการผู้ใช้งาน (/admin/users)
            - ดูข้อมูลลูกค้า ระงับบัญชี
            - URL: http://localhost:5173/admin/users
          */}
          <Route path="users" element={<AdminUsers />} />

          {/* 
            Route: ตั้งค่าร้านค้า (/admin/settings)
            - จัดการข้อมูลร้าน, โลโก้, แบนเนอร์
            - URL: http://localhost:5173/admin/settings
          */}
          <Route path="settings" element={<AdminStoreSettings />} />

          {/* 
            Route: โปรไฟล์ร้านค้าสาธารณะ (/admin/store-profile)
            - หน้าแสดงโปรไฟล์ร้านค้าที่ลูกค้าเห็น
            - URL: http://localhost:5173/admin/store-profile
          */}
          <Route path="store-profile" element={<StoreProfile />} />
        </Route>

        {/* 
          Route: หน้า 404 Not Found
          - path="*" จะ match กับทุก URL ที่ไม่ตรงกับ Route ด้านบน
          - แสดงหน้าแจ้งเตือนว่าไม่พบหน้าที่ค้นหา
        */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

// Export App Component เพื่อใช้ใน main.jsx
export default App;
