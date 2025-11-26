/**
 * =============================================================================
 * CategorySidebar.jsx - Category Sidebar Component (แถบหมวดหมู่ด้านซ้าย)
 * =============================================================================
 *
 * Component นี้แสดงรายการหมวดหมู่ของกระทู้ในหน้า Community
 * ผู้ใช้สามารถกดเลือกหมวดหมู่เพื่อ Filter กระทู้ได้
 *
 * ทำหน้าที่:
 * 1. แสดงรายการหมวดหมู่ทั้งหมด
 * 2. Highlight หมวดหมู่ที่เลือกอยู่
 * 3. แสดงจำนวนกระทู้ในแต่ละหมวดหมู่
 * 4. มีปุ่ม "สร้างกระทู้ใหม่"
 *
 * Props:
 * - categories: Array ของหมวดหมู่ [{name, icon, count}, ...]
 * - activeCategory: หมวดหมู่ที่เลือกอยู่ (string)
 * - setActiveCategory: ฟังก์ชันเปลี่ยนหมวดหมู่ (function)
 *
 * โครงสร้าง:
 * └── community-category-sidebar
 *     └── category-card
 *         ├── category-card-title (หัวข้อ "หมวดหมู่")
 *         ├── category-list (รายการหมวดหมู่)
 *         │   └── category-item (แต่ละหมวดหมู่) [map]
 *         │       ├── icon
 *         │       ├── name
 *         │       └── count
 *         └── create-post-btn (ปุ่มสร้างกระทู้)
 *
 */

import React from "react";

/**
 * CategorySidebar.css - Styles สำหรับ Category Sidebar
 * - Card Styles (background, shadow, border-radius)
 * - List Item Styles (hover, active states)
 * - Button Styles
 */
import "./CategorySidebar.css";

// =============================================================================
// CATEGORYSIDEBAR COMPONENT
// =============================================================================

/**
 * CategorySidebar Component
 *
 * @param {Object} props - Props จาก Parent Component
 * @param {Array} props.categories - รายการหมวดหมู่ [{name, icon, count}, ...]
 * @param {string} props.activeCategory - หมวดหมู่ที่เลือกอยู่
 * @param {function} props.setActiveCategory - ฟังก์ชันเปลี่ยนหมวดหมู่
 * @returns {JSX.Element} - Sidebar พร้อมรายการหมวดหมู่
 *
 * การทำงาน:
 * 1. รับ props จาก CommunityMain
 * 2. Loop แสดงหมวดหมู่ด้วย map()
 * 3. เมื่อกดหมวดหมู่ จะเรียก setActiveCategory
 * 4. หมวดหมู่ที่ active จะมี class "active"
 */
const CategorySidebar = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <aside className="community-category-sidebar">
      {/* =================================================================
          CATEGORY CARD
          - Container หลักของ Sidebar
          - มี AOS Animation fade-right
      ================================================================= */}
      <div className="category-card" data-aos="fade-right">
        {/* ----- CARD TITLE ----- */}
        {/* หัวข้อ "หมวดหมู่" พร้อม Icon */}
        <h3 className="category-card-title">
          {/* Grid Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          หมวดหมู่
        </h3>

        {/* =================================================================
            CATEGORY LIST
            - รายการหมวดหมู่ทั้งหมด
            - ใช้ map() เพื่อ loop แสดงแต่ละ item
        ================================================================= */}
        <ul className="category-list">
          {categories.map((category, index) => (
            /*
              Category Item
              
              - key={index}: ใช้ index เป็น key (ควรใช้ unique id ถ้ามี)
              - className: เพิ่ม "active" ถ้าเป็นหมวดหมู่ที่เลือก
              - onClick: เรียก setActiveCategory เมื่อกด
              
              แสดง:
              - icon: Emoji ของหมวดหมู่
              - name: ชื่อหมวดหมู่
              - count: จำนวนกระทู้
            */
            <li
              key={index}
              className={`category-item ${
                activeCategory === category.name ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.name)}
            >
              {/* Emoji Icon */}
              <span className="category-icon">{category.icon}</span>
              {/* Category Name */}
              <span className="category-name">{category.name}</span>
              {/* Post Count */}
              <span className="category-count">{category.count}</span>
            </li>
          ))}
        </ul>

        {/* ----- CREATE POST BUTTON ----- */}
        {/* 
          ปุ่มสร้างกระทู้ใหม่
          
          TODO: เพิ่ม onClick handler
          - นำทางไปหน้าสร้างกระทู้
          - หรือเปิด Modal สร้างกระทู้
        */}
        <button className="create-post-btn">
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
          สร้างกระทู้ใหม่
        </button>
      </div>
    </aside>
  );
};

// Export CategorySidebar Component เพื่อใช้ใน CommunityMain.jsx
export default CategorySidebar;
