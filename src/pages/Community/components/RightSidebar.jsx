/**
 * =============================================================================
 * RightSidebar.jsx - Right Sidebar Component (แถบด้านขวา)
 * =============================================================================
 *
 * Component นี้แสดงข้อมูลเสริมทางด้านขวาของหน้า Community
 * ประกอบด้วย Trending Topics, Top Contributors และ CTA
 *
 * ทำหน้าที่:
 * 1. แสดง Trending Topics (หัวข้อที่กำลังเป็นที่นิยม)
 * 2. แสดง Top Contributors (ผู้ใช้ที่ Active มากที่สุด)
 * 3. แสดง CTA Card (ชวนสมัครสมาชิก)
 *
 * Props:
 * - trendingTopics: Array ของ Trending Topics [{tag, posts}, ...]
 * - topContributors: Array ของ Top Contributors [{name, avatar, points}, ...]
 * - formatNumber: ฟังก์ชันแปลงตัวเลข
 *
 * โครงสร้าง:
 * └── community-right-sidebar
 *     ├── trending-card
 *     │   └── trending-list (Trending Topics) [map]
 *     ├── contributors-card
 *     │   └── contributors-list (Top Contributors) [map]
 *     └── cta-card (สมัครสมาชิก CTA)
 *
 */

import React from "react";

/**
 * RightSidebar.css - Styles สำหรับ Right Sidebar
 * - Card Styles (background, shadow, padding)
 * - List Styles (trending, contributors)
 * - CTA Card Styles
 */
import "./RightSidebar.css";

// =============================================================================
// RIGHTSIDEBAR COMPONENT
// =============================================================================

/**
 * RightSidebar Component
 *
 * @param {Object} props - Props จาก Parent Component
 * @param {Array} props.trendingTopics - หัวข้อที่กำลังเป็นที่นิยม
 * @param {Array} props.topContributors - ผู้ใช้ที่ Active มากที่สุด
 * @param {function} props.formatNumber - ฟังก์ชันแปลงตัวเลข
 * @returns {JSX.Element} - Right Sidebar Component
 *
 * การทำงาน:
 * 1. รับ props จาก CommunityMain
 * 2. Loop แสดง Trending Topics
 * 3. Loop แสดง Top Contributors
 * 4. แสดง CTA Card คงที่
 */
const RightSidebar = ({ trendingTopics, topContributors, formatNumber }) => {
  return (
    <aside className="community-right-sidebar">
      {/* =================================================================
          TRENDING TOPICS CARD
          - แสดงหัวข้อที่กำลังเป็นที่นิยม
          - เรียงตามจำนวนกระทู้
      ================================================================= */}
      <div className="sidebar-card trending-card" data-aos="fade-left">
        {/* ----- CARD TITLE ----- */}
        <h3 className="sidebar-card-title">
          {/* Trending Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
          กำลังเป็นที่นิยม
        </h3>

        {/* ----- TRENDING LIST ----- */}
        {/*
          รายการ Trending Topics
          
          แต่ละ item แสดง:
          - rank: อันดับ (#1, #2, ...)
          - tag: Hashtag ของหัวข้อ
          - posts: จำนวนกระทู้ที่เกี่ยวข้อง
        */}
        <ul className="trending-list">
          {trendingTopics.map((topic, index) => (
            <li key={index} className="trending-item">
              {/* Rank Number */}
              <span className="trending-rank">#{index + 1}</span>
              <div className="trending-info">
                {/* Hashtag */}
                <span className="trending-tag">{topic.tag}</span>
                {/* Post Count */}
                <span className="trending-posts">{topic.posts} กระทู้</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* =================================================================
          TOP CONTRIBUTORS CARD
          - แสดงผู้ใช้ที่ Active มากที่สุด
          - เรียงตามคะแนน
      ================================================================= */}
      <div
        className="sidebar-card contributors-card"
        data-aos="fade-left"
        data-aos-delay="100"
      >
        {/* ----- CARD TITLE ----- */}
        <h3 className="sidebar-card-title">
          {/* Medal/Badge Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="8" r="7" />
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
          </svg>
          Top Contributors
        </h3>

        {/* ----- CONTRIBUTORS LIST ----- */}
        {/*
          รายการ Top Contributors
          
          แต่ละ item แสดง:
          - rank: อันดับ (1, 2, 3, ...)
          - avatar: รูปโปรไฟล์
          - name: ชื่อผู้ใช้
          - points: คะแนนสะสม (format ด้วย formatNumber)
        */}
        <ul className="contributors-list">
          {topContributors.map((contributor, index) => (
            <li key={index} className="contributor-item">
              {/* Rank Number */}
              <div className="contributor-rank">{index + 1}</div>
              {/* Avatar */}
              <img
                src={contributor.avatar}
                alt={contributor.name}
                className="contributor-avatar"
              />
              {/* Info */}
              <div className="contributor-info">
                <span className="contributor-name">{contributor.name}</span>
                <span className="contributor-points">
                  {formatNumber(contributor.points)} คะแนน
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* =================================================================
          CTA CARD (Call to Action)
          - ชวนผู้ใช้สมัครสมาชิก
          - มี Icon, Title, Description, Button
      ================================================================= */}
      <div
        className="sidebar-card cta-card"
        data-aos="fade-left"
        data-aos-delay="200"
      >
        {/* ----- CTA ICON ----- */}
        <div className="cta-icon">
          {/* Plus Icon */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>

        {/* ----- CTA TITLE ----- */}
        <h4 className="cta-title">เข้าร่วมชุมชนของเรา</h4>

        {/* ----- CTA DESCRIPTION ----- */}
        <p className="cta-description">
          แชร์ความรู้ ถาม-ตอบปัญหา และสร้างคอนเนคชันกับคนในวงการ
        </p>

        {/* ----- CTA BUTTON ----- */}
        {/*
          ปุ่มสมัครสมาชิก
          
          TODO: เพิ่ม onClick handler
          - นำทางไปหน้า /register
          - หรือเปิด Modal สมัครสมาชิก
        */}
        <button className="cta-btn">
          {/* User Plus Icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M20 8v6M23 11h-6" />
          </svg>
          สมัครสมาชิกฟรี
        </button>
      </div>
    </aside>
  );
};

// Export RightSidebar Component เพื่อใช้ใน CommunityMain.jsx
export default RightSidebar;
