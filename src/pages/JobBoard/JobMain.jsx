/**
 * JobMain.jsx
 * ไฟล์หลักของหน้า Job Board ทำหน้าที่เป็น Container Component
 * ที่รวม Components ย่อยต่างๆ ของหน้า Job Board เข้าด้วยกัน
 */

// นำเข้า React library สำหรับสร้าง Component
import React, { useEffect } from "react";

// นำเข้า AOS library สำหรับ Animation
import AOS from "aos";
import "aos/dist/aos.css";

// นำเข้าไฟล์ CSS สำหรับ styling หน้า JobMain
import "./JobMain.css";

// นำเข้า Component HeroSection - ส่วนแบนเนอร์ด้านบนพร้อมช่องค้นหา
import HeroSection from "./components/HeroSection";

// นำเข้า Component JobListing - ส่วนแสดงรายการงานทั้งหมด
import JobListing from "./components/JobListing";

/**
 * JobMain Component
 * เป็น Functional Component หลักของหน้า Job Board
 * ทำหน้าที่เป็น Layout Container สำหรับ render components ย่อย
 * @returns {JSX.Element} - หน้า Job Board ที่ประกอบด้วย HeroSection และ JobListing
 */
const JobMain = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 50,
    });
  }, []);

  return (
    // Container หลักของหน้า Job Board ใช้ class "job-board-page" สำหรับ styling
    <div className="job-board-page">
      {/* Background Decorative Elements - รูปทรงพื้นหลังลอยตัว */}
      <div className="bg-shapes">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
        <div className="bg-shape bg-shape-4"></div>
      </div>

      {/* Grid Pattern - ลายตาราง */}
      <div className="grid-pattern"></div>

      {/* Content wrapper - ครอบ content ทั้งหมดให้อยู่เหนือ background */}
      <div className="job-board-content">
        {/* HeroSection - ส่วนแบนเนอร์ด้านบน มีหัวข้อ, คำอธิบาย, ช่องค้นหา และสถิติ */}
        <HeroSection />

        {/* JobListing - ส่วนแสดงรายการงานทั้งหมด พร้อมตัวกรองและการเรียงลำดับ */}
        <JobListing />
      </div>
    </div>
  );
};

// ส่งออก Component เพื่อให้ไฟล์อื่นสามารถ import ไปใช้งานได้
export default JobMain;
