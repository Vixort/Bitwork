/**
 * =============================================================================
 * heroSection.jsx - Hero Section Component (ส่วน Hero ของหน้า Home)
 * =============================================================================
 *
 * Component นี้แสดงส่วน Hero ที่อยู่ด้านบนสุดของหน้า Home
 * เป็นส่วนแรกที่ผู้ใช้เห็นเมื่อเข้าเว็บไซต์
 *
 * ทำหน้าที่:
 * 1. แสดงข้อความหลัก (Headline) ของเว็บไซต์
 * 2. แสดงคำอธิบายสั้นๆ (Description)
 * 3. แสดงปุ่ม Call to Action (CTA) "Get Started"
 * 4. มี Animation เมื่อ scroll เข้ามา (AOS - Animate On Scroll)
 *
 * โครงสร้าง:
 * └── heroImg (Background Container)
 *     └── textHero (Text Content)
 *         ├── h1 - Headline "Bitwork Bitkub"
 *         ├── p - Description
 *         └── button - "Get Started"
 *
 */

// =============================================================================
// IMPORTS - นำเข้า Dependencies
// =============================================================================

import React from "react";

/**
 * heroSection.css - Styles สำหรับ Hero Section
 * - กำหนด Background Image
 * - กำหนด Layout และ Typography
 * - กำหนด Button Styles
 */
import "./heroSection.css";

/**
 * AOS (Animate On Scroll) Library
 * - ใช้สำหรับสร้าง Animation เมื่อ scroll
 * - องค์ประกอบจะ animate เมื่อเลื่อนเข้ามาในหน้าจอ
 *
 * การใช้งาน:
 * - data-aos="fade-up" = Animation แบบ fade ขึ้นมา
 * - data-aos-duration="1000" = ระยะเวลา Animation 1000ms (1 วินาที)
 */
import AOS from "aos";
import "aos/dist/aos.css"; // CSS สำหรับ AOS Animations

// =============================================================================
// AOS INITIALIZATION - เริ่มต้น AOS
// =============================================================================

/**
 * AOS.init() - เริ่มต้นการทำงานของ AOS
 *
 * หมายเหตุ:
 * - เรียก init() ที่ระดับ Module Level (นอก Component)
 * - ทำให้ AOS พร้อมใช้งานทันทีเมื่อไฟล์ถูก import
 * - อาจย้ายไปใน useEffect() เพื่อควบคุมการ init ได้ดีกว่า
 *
 * ตัวอย่างการย้ายไป useEffect:
 * useEffect(() => {
 *   AOS.init({
 *     duration: 800,
 *     once: true,
 *     easing: "ease-out-cubic"
 *   });
 * }, []);
 */
AOS.init();

// =============================================================================
// HERO SECTION COMPONENT
// =============================================================================

/**
 * HeroSection Component
 *
 * @description แสดงส่วน Hero ของหน้า Home พร้อม Animation
 * @returns {JSX.Element} - Hero Section พร้อม Headline, Description และ CTA Button
 *
 * Animation ที่ใช้:
 * - fade-up: องค์ประกอบจะ fade in และเลื่อนขึ้นมา
 * - duration 1000ms: Animation ใช้เวลา 1 วินาที
 *
 * การทำงาน:
 * 1. แสดง Background Image (กำหนดใน CSS)
 * 2. แสดง Text Content ตรงกลาง
 * 3. เมื่อ scroll เข้ามา จะมี Animation แสดงทีละองค์ประกอบ
 */
const heroSection = () => {
  return (
    <div>
      <div>
        {/* =================================================================
            HERO IMAGE CONTAINER
            - ใช้เป็น Background Container
            - มี Background Image หรือ Gradient (กำหนดใน CSS)
            - เป็น Full Width Section
        ================================================================= */}
        <div className="heroImg">
          {/* =================================================================
              TEXT HERO - ส่วนเนื้อหาตัวอักษร
              - จัดกลางหน้าจอ
              - ซ้อนทับบน Background Image
          ================================================================= */}
          <div className="textHero">
            {/* ----- HEADLINE ----- */}
            {/* 
              ข้อความหลักของ Hero Section
              - data-aos="fade-up": Animation แบบ fade ขึ้นมา
              - data-aos-duration="1000": ใช้เวลา 1 วินาที
            */}
            <h1 data-aos="fade-up" data-aos-duration="1000">
              Bitwork Bitkub
            </h1>

            {/* ----- DESCRIPTION ----- */}
            {/* 
              คำอธิบายสั้นๆ เกี่ยวกับ Bitwork
              - Lorem Ipsum = ข้อความตัวอย่าง (ควรเปลี่ยนเป็นข้อความจริง)
              - มี Animation เหมือน Headline
            */}
            <p data-aos="fade-up" data-aos-duration="1000">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Doloremque, in officiis? Vero alias in repellat porro temporibus
              mollitia, blanditiis fuga corrupti eaque nulla impedit esse
              eveniet deserunt ut quas nemo?
            </p>

            {/* ----- CTA BUTTON ----- */}
            {/* 
              ปุ่ม Call to Action "Get Started"
              - ชวนให้ผู้ใช้เริ่มต้นใช้งาน
              - มี Animation เหมือนกัน
              
              TODO: เพิ่ม onClick handler เพื่อนำทางไปหน้า Register หรือ Market
              ตัวอย่าง: onClick={() => navigate('/register')}
            */}
            <button data-aos="fade-up" data-aos-duration="1000">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export heroSection Component เพื่อใช้ใน home.jsx
export default heroSection;
