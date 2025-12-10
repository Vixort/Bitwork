/**
 * =============================================================================
 * CommunityMain.jsx - Community Forum Page (หน้าชุมชน/ฟอรัม)
 * =============================================================================
 *
 * Component นี้เป็น Container หลักของหน้า Community Forum
 * รวมทุก Component และจัดการ State ของหน้านี้
 *
 * ทำหน้าที่:
 * 1. จัดการ State กลาง (activeCategory, searchQuery)
 * 2. เก็บข้อมูล Mock Data (categories, posts, trending, contributors)
 * 3. Filter และส่งข้อมูลไปยัง Child Components
 * 4. รวม Components ย่อยทั้งหมด
 *
 * โครงสร้างหน้า:
 * └── community-page
 *     ├── HeroSection - ส่วน Hero พร้อม Search
 *     └── community-main
 *         └── community-container (3 คอลัมน์)
 *             ├── CategorySidebar (ซ้าย) - หมวดหมู่
 *             ├── PostFeed (กลาง) - รายการกระทู้
 *             └── RightSidebar (ขวา) - Trending & Contributors
 *
 * URL: http://localhost:5173/community
 *
 */

import React, { useState, useEffect } from "react";

/**
 * AOS (Animate On Scroll) Library
 * - ใช้สำหรับ Animation เมื่อ scroll
 * - ทำให้ UI มีชีวิตชีวา
 */
import AOS from "aos";
import "aos/dist/aos.css";

// =============================================================================
// COMPONENT IMPORTS - นำเข้า Components ย่อย
// =============================================================================

/**
 * HeroSection - ส่วน Hero ของหน้า Community
 * - แสดงข้อความต้อนรับ
 * - มี Search Box สำหรับค้นหากระทู้
 *
 * Props ที่รับ:
 * - searchQuery: ค่าปัจจุบันของช่องค้นหา
 * - setSearchQuery: ฟังก์ชันอัพเดทค่าค้นหา
 */
import HeroSection from "./components/HeroSection";

/**
 * CategorySidebar - แถบหมวดหมู่ด้านซ้าย
 * - แสดงรายการหมวดหมู่ทั้งหมด
 * - กดเลือกหมวดหมู่เพื่อ Filter กระทู้
 *
 * Props ที่รับ:
 * - categories: รายการหมวดหมู่ทั้งหมด
 * - activeCategory: หมวดหมู่ที่เลือกอยู่
 * - setActiveCategory: ฟังก์ชันเปลี่ยนหมวดหมู่
 */
import CategorySidebar from "./components/CategorySidebar";

/**
 * PostFeed - ส่วนแสดงกระทู้หลัก (ตรงกลาง)
 * - แสดงรายการกระทู้ที่ Filter แล้ว
 * - ใช้ PostCard Component สำหรับแต่ละกระทู้
 *
 * Props ที่รับ:
 * - posts: รายการกระทู้ที่จะแสดง
 * - formatDate: ฟังก์ชัน format วันที่
 * - formatNumber: ฟังก์ชัน format ตัวเลข
 */
import PostFeed from "./components/PostFeed";

/**
 * RightSidebar - แถบด้านขวา
 * - แสดง Trending Topics
 * - แสดง Top Contributors
 *
 * Props ที่รับ:
 * - trendingTopics: หัวข้อยอดนิยม
 * - topContributors: ผู้ใช้ที่ Active มากที่สุด
 * - formatNumber: ฟังก์ชัน format ตัวเลข
 */
import RightSidebar from "./components/RightSidebar";

/**
 * CommunityMain.css - Styles สำหรับหน้า Community
 * - Layout 3 คอลัมน์
 * - Responsive Design
 */
import "./CommunityMain.css";

// นำเข้าข้อมูล mock data จากไฟล์ JSON แยกตาม components
import categorySidebarData from "./components/categorySidebarData.json";
import postFeedData from "./components/postFeedData.json";
import rightSidebarData from "./components/rightSidebarData.json";

// =============================================================================
// COMMUNITYMAIN COMPONENT
// =============================================================================

/**
 * CommunityMain Component
 *
 * @description Container หลักของหน้า Community Forum
 * @returns {JSX.Element} - หน้า Community พร้อม Components ทั้งหมด
 *
 * State:
 * - activeCategory: หมวดหมู่ที่เลือก (default: "ทั้งหมด")
 * - searchQuery: คำค้นหา (default: "")
 *
 * การทำงาน:
 * 1. เก็บข้อมูล Mock Data
 * 2. Filter กระทู้ตาม Category และ Search
 * 3. ส่งข้อมูลไปยัง Child Components
 */
const CommunityMain = () => {
  // =============================================================================
  // STATE MANAGEMENT - จัดการ State
  // =============================================================================

  /**
   * activeCategory State
   * - เก็บหมวดหมู่ที่ผู้ใช้เลือกอยู่
   * - ใช้สำหรับ Filter กระทู้
   * - ค่าเริ่มต้น: "ทั้งหมด" (แสดงทุกกระทู้)
   */
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");

  /**
   * searchQuery State
   * - เก็บคำค้นหาจาก Search Box
   * - ใช้สำหรับ Filter กระทู้ตาม title, excerpt, tags
   * - ค่าเริ่มต้น: "" (ไม่มีคำค้นหา)
   */
  const [searchQuery, setSearchQuery] = useState("");

  // =============================================================================
  // SIDE EFFECTS - ผลข้างเคียง (useEffect)
  // =============================================================================

  /**
   * useEffect สำหรับ AOS Initialization
   *
   * การทำงาน:
   * - ทำงานครั้งเดียวเมื่อ Component mount
   * - เริ่มต้น AOS Library
   *
   * AOS Config:
   * - duration: 800 = Animation 800ms
   * - once: true = ทำงานครั้งเดียว
   * - easing: "ease-out-cubic" = รูปแบบ Animation
   */
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // =============================================================================
  // MOCK DATA - ข้อมูลจากไฟล์ JSON (จะเปลี่ยนเป็น API ในอนาคต)
  // =============================================================================

  /**
   * categories - รายการหมวดหมู่ทั้งหมด (จาก JSON)
   */
  const categories = categorySidebarData.categories;

  /**
   * posts - รายการกระทู้ทั้งหมด (จาก JSON)
   */
  const posts = postFeedData.posts;

  /**
   * trendingTopics - หัวข้อที่กำลังเป็นที่นิยม (จาก JSON)
   */
  const trendingTopics = rightSidebarData.trendingTopics;

  /**
   * topContributors - ผู้ใช้ที่ Active มากที่สุด (จาก JSON)
   */
  const topContributors = rightSidebarData.topContributors;

  // =============================================================================
  // HELPER FUNCTIONS - ฟังก์ชันช่วยเหลือ
  // =============================================================================

  /**
   * formatDate - แปลงวันที่เป็นรูปแบบภาษาไทย
   *
   * @param {string} dateString - วันที่ในรูปแบบ "YYYY-MM-DD"
   * @returns {string} - วันที่ในรูปแบบภาษาไทย
   *
   * การทำงาน:
   * 1. คำนวณความต่างของวันระหว่างวันที่กำหนดกับวันนี้
   * 2. แปลงเป็นข้อความที่เหมาะสม:
   *    - 1 วัน = "เมื่อวาน"
   *    - < 7 วัน = "X วันที่แล้ว"
   *    - < 30 วัน = "X สัปดาห์ที่แล้ว"
   *    - >= 30 วัน = "X เดือนที่แล้ว"
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return "เมื่อวาน";
    if (diffDays < 7) return diffDays + " วันที่แล้ว";
    if (diffDays < 30) return Math.floor(diffDays / 7) + " สัปดาห์ที่แล้ว";
    return Math.floor(diffDays / 30) + " เดือนที่แล้ว";
  };

  /**
   * formatNumber - แปลงตัวเลขเป็นรูปแบบย่อ
   *
   * @param {number} num - ตัวเลขที่ต้องการ format
   * @returns {string} - ตัวเลขในรูปแบบย่อ
   *
   * การทำงาน:
   * - ถ้า >= 1000 จะแสดงเป็น Xk (เช่น 1500 = 1.5k)
   * - ถ้า < 1000 แสดงตัวเลขปกติ
   */
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  // =============================================================================
  // FILTERED DATA - ข้อมูลที่ Filter แล้ว
  // =============================================================================

  /**
   * filteredPosts - กระทู้ที่ Filter ตาม Category และ Search Query
   *
   * การทำงาน:
   * 1. Filter ตาม activeCategory:
   *    - ถ้า "ทั้งหมด" = แสดงทุกกระทู้
   *    - ถ้าหมวดหมู่เฉพาะ = แสดงเฉพาะที่ตรงกัน
   * 2. Filter ตาม searchQuery:
   *    - ค้นหาใน title, excerpt, และ tags
   *    - Case insensitive
   */
  const filteredPosts = posts.filter((post) => {
    // ตรวจสอบหมวดหมู่
    const matchCategory =
      activeCategory === "ทั้งหมด" || post.category === activeCategory;

    // ตรวจสอบคำค้นหา (title, excerpt, หรือ tags)
    const matchSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // ต้องผ่านทั้ง 2 เงื่อนไข
    return matchCategory && matchSearch;
  });

  // =============================================================================
  // RENDER - แสดงผล Component
  // =============================================================================

  return (
    <div className="community-page">
      {/* =================================================================
          HERO SECTION
          - ส่วน Hero ด้านบน
          - มี Search Box สำหรับค้นหากระทู้
      ================================================================= */}
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* =================================================================
          MAIN CONTENT
          - เนื้อหาหลักแบบ 3 คอลัมน์
      ================================================================= */}
      <main className="community-main">
        <div className="community-container">
          {/* ----- LEFT SIDEBAR: Categories ----- */}
          {/* แสดงหมวดหมู่ทั้งหมด */}
          <CategorySidebar
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* ----- CENTER: Post Feed ----- */}
          {/* แสดงรายการกระทู้ที่ Filter แล้ว */}
          <PostFeed
            posts={filteredPosts}
            formatDate={formatDate}
            formatNumber={formatNumber}
          />

          {/* ----- RIGHT SIDEBAR: Trending & Contributors ----- */}
          {/* แสดง Trending Topics และ Top Contributors */}
          <RightSidebar
            trendingTopics={trendingTopics}
            topContributors={topContributors}
            formatNumber={formatNumber}
          />
        </div>
      </main>
    </div>
  );
};

// Export CommunityMain Component เพื่อใช้ใน App.jsx
export default CommunityMain;
