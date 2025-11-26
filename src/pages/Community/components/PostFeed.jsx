/**
 * =============================================================================
 * PostFeed.jsx - Post Feed Component (รายการกระทู้หลัก)
 * =============================================================================
 *
 * Component นี้แสดงรายการกระทู้ที่ Filter แล้วจาก CommunityMain
 * เป็นส่วนกลางของหน้า Community
 *
 * ทำหน้าที่:
 * 1. แสดงหัวข้อ "กระทู้ล่าสุด" พร้อม Filter Buttons
 * 2. Loop แสดง PostCard สำหรับแต่ละกระทู้
 * 3. แสดงข้อความ "ไม่พบกระทู้" ถ้าไม่มีผลลัพธ์
 * 4. แสดงปุ่ม "โหลดเพิ่มเติม"
 *
 * Props:
 * - posts: Array ของกระทู้ที่ Filter แล้ว
 * - formatDate: ฟังก์ชันแปลงวันที่
 * - formatNumber: ฟังก์ชันแปลงตัวเลข
 *
 * โครงสร้าง:
 * └── community-post-feed
 *     ├── feed-header
 *     │   ├── feed-title ("กระทู้ล่าสุด")
 *     │   └── feed-filters (ล่าสุด, ยอดนิยม, ไม่มีคำตอบ)
 *     ├── posts-list
 *     │   └── PostCard [map] หรือ no-posts
 *     └── load-more-container (ถ้ามีกระทู้)
 *
 */

import React from "react";

/**
 * PostCard - Component สำหรับแสดงกระทู้แต่ละรายการ
 * - รับข้อมูลกระทู้และ format functions
 * - แสดงในรูปแบบ Card
 */
import PostCard from "./PostCard";

/**
 * PostFeed.css - Styles สำหรับ Post Feed
 * - Feed Header Styles
 * - Filter Button Styles
 * - Posts List Layout
 * - Load More Button
 */
import "./PostFeed.css";

// =============================================================================
// POSTFEED COMPONENT
// =============================================================================

/**
 * PostFeed Component
 *
 * @param {Object} props - Props จาก Parent Component
 * @param {Array} props.posts - รายการกระทู้ที่จะแสดง (Filter แล้ว)
 * @param {function} props.formatDate - ฟังก์ชันแปลงวันที่
 * @param {function} props.formatNumber - ฟังก์ชันแปลงตัวเลข
 * @returns {JSX.Element} - Post Feed Component
 *
 * การทำงาน:
 * 1. รับ posts ที่ Filter แล้วจาก CommunityMain
 * 2. แสดง Header พร้อม Filter Buttons
 * 3. Loop แสดง PostCard ด้วย map()
 * 4. แสดงข้อความ "ไม่พบกระทู้" ถ้า posts.length === 0
 * 5. แสดงปุ่ม "โหลดเพิ่มเติม" (TODO: implement pagination)
 */
const PostFeed = ({ posts, formatDate, formatNumber }) => {
  return (
    <div className="community-post-feed">
      {/* =================================================================
          FEED HEADER
          - หัวข้อ "กระทู้ล่าสุด" และ Filter Buttons
      ================================================================= */}
      <div className="feed-header" data-aos="fade-up">
        {/* ----- FEED TITLE ----- */}
        <h2 className="feed-title">
          {/* Message Icon */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          กระทู้ล่าสุด
        </h2>

        {/* ----- FEED FILTERS ----- */}
        {/* 
          Filter Buttons สำหรับเรียงลำดับกระทู้
          - ล่าสุด: เรียงตามวันที่ (ใหม่สุดก่อน)
          - ยอดนิยม: เรียงตาม views หรือ likes
          - ไม่มีคำตอบ: กรองเฉพาะที่ยังไม่มี reply
          
          TODO: เพิ่ม onClick handlers และ state สำหรับ active filter
        */}
        <div className="feed-filters">
          {/* Filter: ล่าสุด (Active by default) */}
          <button className="filter-btn active">
            {/* Clock Icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            ล่าสุด
          </button>

          {/* Filter: ยอดนิยม */}
          <button className="filter-btn">
            {/* Fire Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 23c-6.627 0-12-5.373-12-12 0-4.891 2.909-9.085 7.084-10.98l2.916 5.98-4.5 3 4.5 8v-4.5c0-1.381 1.119-2.5 2.5-2.5s2.5 1.119 2.5 2.5v4.5l4.5-8-4.5-3 2.916-5.98c4.175 1.895 7.084 6.089 7.084 10.98 0 6.627-5.373 12-12 12z" />
            </svg>
            ยอดนิยม
          </button>

          {/* Filter: ไม่มีคำตอบ */}
          <button className="filter-btn">
            {/* Message Icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            ไม่มีคำตอบ
          </button>
        </div>
      </div>

      {/* =================================================================
          POSTS LIST
          - แสดงรายการกระทู้ หรือข้อความ "ไม่พบกระทู้"
      ================================================================= */}
      <div className="posts-list">
        {posts.length > 0 ? (
          /*
            แสดงรายการกระทู้
            
            - map(): Loop สร้าง PostCard จากแต่ละ post
            - key={post.id}: ใช้ id เป็น unique key
            - ส่ง props: post, formatDate, formatNumber, index
          */
          posts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              formatDate={formatDate}
              formatNumber={formatNumber}
              index={index}
            />
          ))
        ) : (
          /* 
            NO POSTS MESSAGE
            - แสดงเมื่อไม่มีกระทู้ที่ตรงกับ Filter
            - มี Icon, หัวข้อ, และคำแนะนำ
          */
          <div className="no-posts">
            {/* Search Icon */}
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <h3>ไม่พบกระทู้</h3>
            <p>ลองค้นหาด้วยคำค้นหาอื่น หรือเลือกหมวดหมู่อื่น</p>
          </div>
        )}
      </div>

      {/* =================================================================
          LOAD MORE BUTTON
          - แสดงเฉพาะเมื่อมีกระทู้
          - ใช้สำหรับ Pagination (โหลดกระทู้เพิ่ม)
          
          TODO: Implement pagination logic
          - เพิ่ม state สำหรับ page number
          - เพิ่ม onClick handler เพื่อโหลดหน้าถัดไป
          - เรียก API เพื่อดึงกระทู้เพิ่ม
      ================================================================= */}
      {posts.length > 0 && (
        <div className="load-more-container" data-aos="fade-up">
          <button className="load-more-btn">
            {/* Loading Icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            โหลดเพิ่มเติม
          </button>
        </div>
      )}
    </div>
  );
};

// Export PostFeed Component เพื่อใช้ใน CommunityMain.jsx
export default PostFeed;
