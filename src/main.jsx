/**
 * =============================================================================
 * main.jsx - Entry Point (จุดเริ่มต้นของแอปพลิเคชัน)
 * =============================================================================
 *
 * ไฟล์นี้เป็น Entry Point หลักของแอปพลิเคชัน React
 * ทำหน้าที่:
 * 1. นำเข้า (Import) Dependencies ที่จำเป็น
 * 2. สร้าง Root Element สำหรับ React DOM
 * 3. Render แอปพลิเคชันลงใน DOM
 * 4. ตั้งค่า Routing และ Global Components
 *
 * โครงสร้างการ Render:
 * └── StrictMode (ตรวจสอบปัญหาในโหมด Development)
 *     └── BrowserRouter (จัดการ Routing/เส้นทาง URL)
 *         ├── NavBar (แถบเมนูนำทาง - แสดงทุกหน้า)
 *         └── App (Routes ทั้งหมดของแอป)
 *
 */

// =============================================================================
// IMPORTS - นำเข้า Dependencies
// =============================================================================

/**
 * StrictMode - โหมดตรวจสอบจาก React
 * - ช่วยตรวจจับปัญหาที่อาจเกิดขึ้นในแอปพลิเคชัน
 * - ทำงานเฉพาะใน Development Mode เท่านั้น
 * - จะไม่ส่งผลกระทบต่อ Production Build
 * - ช่วยเตือนเกี่ยวกับ lifecycle methods ที่ deprecated
 * - ช่วยตรวจจับ side effects ที่ไม่คาดคิด
 */
import { StrictMode } from "react";

/**
 * createRoot - ฟังก์ชันสร้าง Root สำหรับ React 18+
 * - เป็น API ใหม่ที่มาแทน ReactDOM.render() แบบเดิม
 * - รองรับ Concurrent Features ของ React 18
 * - ทำให้สามารถใช้ Suspense และ Transitions ได้ดีขึ้น
 */
import { createRoot } from "react-dom/client";

/**
 * React Router - Components สำหรับจัดการ Client-side Routing
 * - BrowserRouter: ใช้ HTML5 History API (pushState, replaceState, popstate)
 * - Route: กำหนดเส้นทางและ Component ที่จะแสดง
 * - Routes: Container สำหรับ Route ทั้งหมด
 *
 * หมายเหตุ: Route และ Routes ถูก import ไว้ที่นี่แต่ใช้งานจริงใน App.jsx
 */
import { BrowserRouter, Route, Routes, useLocation } from "react-router";

/**
 * NavBar - Navigation Component (แถบเมนูนำทาง)
 * - แสดงอยู่ทุกหน้าของเว็บไซต์
 * - มี Logo, Menu Links และ User Profile
 * - วางไว้นอก Routes เพื่อให้แสดงตลอดเวลา
 */
import NavBar from "./components/NavBar.jsx";

/**
 * Global Styles - CSS พื้นฐานของแอปพลิเคชัน
 * - กำหนด Reset CSS
 * - กำหนด CSS Variables (สี, ฟอนต์)
 * - กำหนด Base Styles สำหรับทั้งแอป
 */
import "./index.css";

/**
 * Shared Component Styles - Styles ที่ใช้ร่วมกัน
 * - ป้องกัน className ซ้ำกันระหว่างไฟล์
 * - ใช้ prefix bw-* สำหรับ buttons, modals, cards
 */
import "./shared.css";

/**
 * App - Main Application Component
 * - เป็น Component หลักที่รวม Routes ทั้งหมด
 * - จัดการการแสดงผลหน้าต่างๆ ตาม URL
 */
import App from "./App.jsx";

/**
 * Home Page Import
 * - Import หน้า Home เพื่อให้ Vite รู้จักและ bundle ไฟล์
 */
import "./pages/home/home.jsx";

import Footer from "./components/Footer.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

// =============================================================================
// LAYOUT WRAPPER - Component ที่จัดการแสดง NavBar/Footer
// =============================================================================

/**
 * AppWrapper - ซ่อน NavBar และ Footer ในหน้า Admin
 * - ตรวจสอบ path ว่าเริ่มต้นด้วย /admin หรือไม่
 * - ถ้าเป็นหน้า Admin จะไม่แสดง NavBar และ Footer
 */
const AppWrapper = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* NavBar - แสดงเฉพาะหน้าที่ไม่ใช่ Admin */}
      {!isAdminPage && <NavBar />}

      {/* App - Routes Component ที่จัดการหน้าต่างๆ */}
      <App />

      {/* Footer - แสดงเฉพาะหน้าที่ไม่ใช่ Admin */}
      {!isAdminPage && <Footer />}
    </>
  );
};

// =============================================================================
// APPLICATION RENDER - การ Render แอปพลิเคชัน
// =============================================================================

/**
 * สร้าง React Root และ Render แอปพลิเคชัน
 *
 * การทำงาน:
 * 1. document.getElementById('root') - หา element ที่มี id="root" ใน index.html
 * 2. createRoot() - สร้าง React Root ที่ element นั้น
 * 3. render() - แสดงผล Component Tree ลงใน Root
 *
 * Component Structure:
 * - StrictMode: ครอบทั้งแอปเพื่อตรวจสอบปัญหา
 * - BrowserRouter: ครอบทั้งแอปเพื่อให้ทุก Component เข้าถึง Routing ได้
 * - AppWrapper: จัดการแสดง NavBar/Footer ตามหน้า
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
