/**
 * =============================================================================
 * HeroSection.jsx - Community Hero Section Component
 * =============================================================================
 *
 * Component นี้แสดงส่วน Hero ของหน้า Community Forum
 * เป็นส่วนแรกที่ผู้ใช้เห็นเมื่อเข้าหน้า Community
 *
 * ทำหน้าที่:
 * 1. แสดง Badge "ชุมชนคนทำงาน IT"
 * 2. แสดง Title และ Subtitle ที่น่าสนใจ
 * 3. แสดงปุ่ม Action (สร้างกระทู้, สำรวจกระทู้)
 * 4. แสดง Stats Cards (สมาชิก, กระทู้, การตอบกลับ, คะแนน)
 * 5. แสดง Search Box พร้อม Popular Tags
 *
 * Props:
 * - searchQuery: ค่าปัจจุบันของช่องค้นหา (string)
 * - setSearchQuery: ฟังก์ชันอัพเดทค่าค้นหา (function)
 *
 * โครงสร้าง:
 * └── community-hero
 *     ├── community-hero-bg (Background + Overlay)
 *     ├── community-hero-wrapper
 *     │   ├── community-hero-content
 *     │   │   ├── Badge
 *     │   │   ├── Title
 *     │   │   ├── Subtitle
 *     │   │   └── Action Buttons
 *     │   └── community-hero-stats-grid (4 Stats Cards)
 *     └── community-hero-search-container
 *         ├── Search Box
 *         └── Popular Tags
 *
 */

import React from "react";

/**
 * HeroSection.css - Styles สำหรับ Hero Section
 * - Background Image และ Overlay
 * - Stats Cards Layout
 * - Search Box Styles
 * - Responsive Design
 */
import "./HeroSection.css";

// =============================================================================
// HEROSECTION COMPONENT
// =============================================================================

/**
 * HeroSection Component
 *
 * @param {Object} props - Props จาก Parent Component
 * @param {string} props.searchQuery - ค่าปัจจุบันของช่องค้นหา
 * @param {function} props.setSearchQuery - ฟังก์ชันอัพเดทค่าค้นหา
 * @returns {JSX.Element} - Hero Section พร้อม Search และ Stats
 *
 * การทำงาน:
 * 1. รับ searchQuery และ setSearchQuery จาก CommunityMain
 * 2. แสดง UI ทั้งหมดของ Hero Section
 * 3. เมื่อพิมพ์ในช่อง Search จะเรียก setSearchQuery
 * 4. ค่าจะถูกส่งกลับไป CommunityMain เพื่อ Filter กระทู้
 */
const HeroSection = ({ searchQuery, setSearchQuery }) => {
  return (
    <section className="community-hero">
      {/* =================================================================
          BACKGROUND SECTION
          - Background Image
          - Overlay Gradient (ทำให้ข้อความอ่านง่ายขึ้น)
      ================================================================= */}
      <div className="community-hero-bg">
        {/* Overlay สำหรับทำ Gradient บน Background */}
        <div className="community-hero-overlay"></div>
      </div>

      {/* =================================================================
          MAIN CONTENT WRAPPER
          - ครอบเนื้อหาหลักทั้งหมด
      ================================================================= */}
      <div className="community-hero-wrapper">
        {/* =================================================================
            HERO CONTENT - เนื้อหาหลัก
            - Badge, Title, Subtitle, Action Buttons
        ================================================================= */}
        <div className="community-hero-content" data-aos="fade-up">
          {/* ----- BADGE ----- */}
          {/* Badge แสดงหัวข้อ พร้อม Icon */}
          <div className="community-hero-badge">
            {/* SVG Icon - รูปกลุ่มคน */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>ชุมชนคนทำงาน IT</span>
          </div>

          {/* ----- TITLE ----- */}
          {/* 
            หัวข้อหลักของ Hero Section
            - มี highlight class สำหรับ "สร้างคอนเนคชัน"
          */}
          <h1 className="community-hero-title">
            แลกเปลี่ยนความรู้
            <span className="community-highlight">สร้างคอนเนคชัน</span>
            เติบโตไปด้วยกัน
          </h1>

          {/* ----- SUBTITLE ----- */}
          {/* คำอธิบายเพิ่มเติม */}
          <p className="community-hero-subtitle">
            เข้าร่วมชุมชนนักพัฒนากว่า 15,000+ คน แชร์ประสบการณ์ ถาม-ตอบปัญหา
            และค้นหาโอกาสใหม่ๆ ในวงการเทคโนโลยี
          </p>

          {/* ----- ACTION BUTTONS ----- */}
          {/* ปุ่ม CTA 2 ปุ่ม */}
          <div
            className="community-hero-actions"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {/* Primary Button - สร้างกระทู้ */}
            <button className="community-primary-btn">
              {/* Plus Icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              เริ่มสร้างกระทู้
            </button>

            {/* Secondary Button - สำรวจกระทู้ */}
            <button className="community-secondary-btn">
              {/* Search Icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              สำรวจกระทู้
            </button>
          </div>
        </div>

        {/* =================================================================
            STATS CARDS GRID
            - แสดงสถิติ 4 รายการ
            - ใช้ CSS Grid Layout
        ================================================================= */}
        <div
          className="community-hero-stats-grid"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* ----- Stats Card 1: สมาชิกในชุมชน ----- */}
          <div className="community-stats-card">
            <div className="stats-card-icon">
              {/* Users Icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="stats-card-info">
              <span className="stats-card-number">15,000+</span>
              <span className="stats-card-label">สมาชิกในชุมชน</span>
            </div>
          </div>

          {/* ----- Stats Card 2: กระทู้สนทนา ----- */}
          <div className="community-stats-card">
            <div className="stats-card-icon">
              {/* Message Icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="stats-card-info">
              <span className="stats-card-number">5,200+</span>
              <span className="stats-card-label">กระทู้สนทนา</span>
            </div>
          </div>

          {/* ----- Stats Card 3: การตอบกลับ ----- */}
          <div className="community-stats-card">
            <div className="stats-card-icon">
              {/* Heart Icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <div className="stats-card-info">
              <span className="stats-card-number">48,500+</span>
              <span className="stats-card-label">การตอบกลับ</span>
            </div>
          </div>

          {/* ----- Stats Card 4: คะแนนความพึงพอใจ ----- */}
          <div className="community-stats-card">
            <div className="stats-card-icon">
              {/* Star Icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div className="stats-card-info">
              <span className="stats-card-number">4.9/5</span>
              <span className="stats-card-label">คะแนนความพึงพอใจ</span>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================
          SEARCH SECTION - ด้านล่าง Hero
          - Search Box
          - Popular Tags
      ================================================================= */}
      <div
        className="community-hero-search-container"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        {/* ----- SEARCH BOX ----- */}
        {/* 
          ช่องค้นหากระทู้
          - Controlled Component (ค่าจาก searchQuery state)
          - onChange จะเรียก setSearchQuery
        */}
        <div className="community-search-box">
          {/* Search Icon */}
          <svg
            className="community-search-icon"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>

          {/* Search Input */}
          <input
            type="text"
            placeholder="ค้นหากระทู้ที่สนใจ เช่น React, Career, Interview..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Search Button */}
          <button className="community-search-btn">
            <span>ค้นหา</span>
            {/* Arrow Icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ----- POPULAR TAGS ----- */}
        {/* 
          Tags ยอดนิยม
          - กดเพื่อค้นหาโดยใช้ Tag นั้น
          
          TODO: เพิ่ม onClick handler ให้แต่ละ Tag
          เพื่อ setSearchQuery เป็นค่าของ Tag ที่กด
        */}
        <div className="community-popular-tags">
          <span className="tags-label">หัวข้อยอดนิยม:</span>
          <div className="tags-list">
            <button className="popular-tag">React</button>
            <button className="popular-tag">Career</button>
            <button className="popular-tag">Salary</button>
            <button className="popular-tag">Remote Work</button>
            <button className="popular-tag">Interview</button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Export HeroSection Component เพื่อใช้ใน CommunityMain.jsx
export default HeroSection;
