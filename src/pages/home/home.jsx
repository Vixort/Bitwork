/**
 * =============================================================================
 * Home.jsx - Home Page Container (หน้าแรกของเว็บไซต์)
 * =============================================================================
 *
 * Component นี้เป็น Container หลักของหน้า Home (Landing Page)
 * รวบรวม Components ย่อยทั้งหมดและจัดเรียงตามลำดับ
 *
 * โครงสร้างหน้า Home:
 * ├── HeroSection     - ส่วน Hero พร้อมข้อความต้อนรับและปุ่ม CTA
 * ├── Showcase        - แสดงบริการหลัก 3 ประเภท
 * ├── Why             - ส่วน "ทำไมต้อง Bitwork"
 * ├── Spoiler         - แสดงสินค้าเด่น
 * ├── ExpSection      - ส่วนประสบการณ์และสถิติ
 * └── BusinessSteps   - ขั้นตอนการใช้งาน
 *
 */

// =============================================================================
// IMPORTS
// =============================================================================

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import HeroSection from "./component/heroSection.jsx";
import Showcase from "./component/Showcase.jsx";
import Why from "./component/Why.jsx";
import Spoiler from "./component/Spoiler.jsx";
import ExpSection from "./component/ExpSection.jsx";
import BusinessSteps from "./component/BusinessSteps.jsx";

// =============================================================================
// HOME COMPONENT
// =============================================================================

const Home = () => {
  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <main className="home-page">
      <HeroSection />
      <Showcase />
      <Why />
      <Spoiler />
      <ExpSection />
      <BusinessSteps />
    </main>
  );
};

export default Home;
