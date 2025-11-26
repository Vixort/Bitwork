/**
 * =============================================================================
 * home.jsx - Home Page Container (หน้าแรกของเว็บไซต์)
 * =============================================================================
 *
 * Component นี้เป็น Container หลักของหน้า Home (Landing Page)
 * ทำหน้าที่:
 * 1. รวม (Compose) Components ย่อยทั้งหมดของหน้า Home
 * 2. จัดเรียง Components ตามลำดับที่ต้องการแสดง
 * 3. เป็น Single Source of Truth สำหรับโครงสร้างหน้า Home
 *
 * โครงสร้างหน้า Home (เรียงจากบนลงล่าง):
 * ├── HeroSection     - ส่วน Hero พร้อมข้อความต้อนรับและปุ่ม CTA
 * ├── Showcase        - แสดง Cards แบบ Marquee (เลื่อนอัตโนมัติ)
 * ├── Why             - ส่วน "ทำไมต้อง Bitwork" - จุดเด่นของเว็บ
 * ├── Spoiler         - แสดงสินค้า/การ์ดจอแบบ Showcase
 * ├── ExpSection      - ส่วนประสบการณ์และความน่าเชื่อถือ
 * └── BusinessSteps   - ขั้นตอนการใช้งาน (ยังไม่เปิดใช้)
 *
 * URL ที่เข้าถึงได้:
 * - http://localhost:5173/
 * - http://localhost:5173/home
 *
 */

// =============================================================================
// IMPORTS - นำเข้า Dependencies
// =============================================================================

import React from "react";

/**
 * Import heroSection.jsx แบบไม่ใช้ (side effect import)
 * หมายเหตุ: บรรทัดนี้อาจไม่จำเป็น เพราะ import HeroSection อยู่แล้ว
 */
import "./component/heroSection.jsx";

// =============================================================================
// COMPONENT IMPORTS - นำเข้า Components ย่อย
// =============================================================================

/**
 * HeroSection - ส่วน Hero ของหน้าแรก
 * - แสดงข้อความต้อนรับขนาดใหญ่
 * - มีปุ่ม Call to Action (CTA)
 * - มี Animation AOS เมื่อ scroll
 */
import HeroSection from "./component/heroSection.jsx";

/**
 * Showcase - ส่วนแสดง Cards แบบ Marquee
 * - Cards จะเลื่อนอัตโนมัติแบบไม่หยุด
 * - แสดงบริการหรือฟีเจอร์ต่างๆ
 */
import Showcase from "./component/Showcase.jsx";

/**
 * Why - ส่วน "Why Bitwork"
 * - อธิบายจุดเด่นและเหตุผลที่ควรใช้ Bitwork
 * - แสดงเป็น Cards หรือ List
 */
import Why from "./component/Why.jsx";

/**
 * AuthPage - Import ไว้แต่ยังไม่ได้ใช้ในหน้า Home
 * หมายเหตุ: อาจนำไปใช้สำหรับ Modal Login ในอนาคต
 */
import AuthPage from "../Login/AuthPage.jsx";

/**
 * Spoiler - ส่วนแสดงสินค้าเด่น (เช่น การ์ดจอ)
 * - แสดงรูปสินค้าแบบ Showcase
 * - มี Animation เมื่อ hover
 */
import Spoiler from "./component/Spoiler.jsx";

/**
 * ExpSection - ส่วนประสบการณ์
 * - แสดงตัวเลขสถิติ (เช่น จำนวนผู้ใช้, ยอดขาย)
 * - สร้างความน่าเชื่อถือ
 */
import ExpSection from "./component/ExpSection.jsx";

/**
 * BusinessSteps - ขั้นตอนการใช้งาน
 * - อธิบายวิธีใช้งานเว็บไซต์
 * - แสดงเป็น Timeline หรือ Steps
 * หมายเหตุ: ยังไม่เปิดใช้งาน (commented out)
 */
import BusinessSteps from "./component/BusinessSteps.jsx";

// =============================================================================
// HOME COMPONENT
// =============================================================================

/**
 * Home Component
 *
 * @description Container Component สำหรับหน้า Home/Landing Page
 * @returns {JSX.Element} - หน้า Home พร้อม Components ย่อยทั้งหมด
 *
 * การทำงาน:
 * 1. Render Components ย่อยตามลำดับจากบนลงล่าง
 * 2. แต่ละ Component จัดการ UI และ Logic ของตัวเองแยก
 * 3. ทำให้โค้ดแบ่งส่วนชัดเจน ง่ายต่อการดูแล
 *
 * หมายเหตุ:
 * - ชื่อ Component ควรเป็น PascalCase (Home แทน home)
 * - แต่ในที่นี้ใช้ lowercase ตาม convention ของ project
 */
const home = () => {
  return (
    <div>
      {/* =================================================================
          HERO SECTION - ส่วน Hero ด้านบนสุด
          - ข้อความต้อนรับ
          - ปุ่ม Call to Action
          - Background แบบ Gradient
      ================================================================= */}
      <HeroSection />

      {/* =================================================================
          SHOWCASE SECTION - ส่วนแสดง Cards แบบ Marquee
          - Cards เลื่อนอัตโนมัติ
          - แสดงบริการ/ฟีเจอร์หลัก
      ================================================================= */}
      <Showcase />

      {/* =================================================================
          WHY SECTION - ส่วน "ทำไมต้อง Bitwork"
          - จุดเด่นของ Platform
          - เหตุผลที่ควรใช้บริการ
      ================================================================= */}
      <Why />

      {/* =================================================================
          SPOILER SECTION - ส่วนแสดงสินค้าเด่น
          - รูปสินค้า/การ์ดจอ
          - Animation เมื่อ hover
      ================================================================= */}
      <Spoiler></Spoiler>

      {/* =================================================================
          EXPERIENCE SECTION - ส่วนประสบการณ์/สถิติ
          - ตัวเลขสถิติ
          - สร้างความน่าเชื่อถือ
      ================================================================= */}
      <ExpSection></ExpSection>

      {/* =================================================================
          BUSINESS STEPS - ขั้นตอนการใช้งาน (ยังไม่เปิดใช้)
          - อธิบายวิธีใช้งาน
          - แสดงเป็น Timeline
          
          หมายเหตุ: Comment out ไว้ รอเปิดใช้ในอนาคต
      ================================================================= */}
      {/* <BusinessSteps></BusinessSteps> */}
    </div>
  );
};

// Export home Component เพื่อใช้ใน App.jsx
export default home;
