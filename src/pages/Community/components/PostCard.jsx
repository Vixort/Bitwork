/**
 * =============================================================================
 * PostCard.jsx - Post Card Component (Card แสดงกระทู้)
 * =============================================================================
 *
 * Component นี้แสดงข้อมูลกระทู้แต่ละรายการในรูปแบบ Card
 * ใช้ใน PostFeed.jsx เพื่อแสดงรายการกระทู้ทั้งหมด
 *
 * ทำหน้าที่:
 * 1. แสดงข้อมูลผู้เขียน (Avatar, ชื่อ, วันที่)
 * 2. แสดงหัวข้อและเนื้อหาย่อของกระทู้
 * 3. แสดง Tags ของกระทู้
 * 4. แสดงสถิติ (Views, Replies, Likes)
 * 5. แสดง Badge พิเศษ (ปักหมุด, กำลังฮิต)
 *
 * Props:
 * - post: Object ข้อมูลกระทู้ {id, title, excerpt, author, ...}
 * - formatDate: ฟังก์ชันแปลงวันที่
 * - formatNumber: ฟังก์ชันแปลงตัวเลข
 * - index: ลำดับของ Card (ใช้สำหรับ AOS delay)
 *
 * โครงสร้าง:
 * └── post-card
 *     ├── post-pinned-badge (ถ้า isPinned)
 *     ├── post-header
 *     │   ├── post-author (Avatar, Name, Date, Category)
 *     │   └── post-status (Hot Badge)
 *     ├── post-content
 *     │   ├── post-title
 *     │   ├── post-excerpt
 *     │   └── post-tags
 *     └── post-footer
 *         ├── post-stats (Views, Replies, Likes)
 *         └── read-more-btn
 *
 */

import React from "react";

/**
 * PostCard.css - Styles สำหรับ Post Card
 * - Card Layout และ Shadow
 * - Badge Styles (Pinned, Hot)
 * - Author Info Styles
 * - Stats และ Button Styles
 */
import "./PostCard.css";

// =============================================================================
// POSTCARD COMPONENT
// =============================================================================

/**
 * PostCard Component
 *
 * @param {Object} props - Props จาก Parent Component
 * @param {Object} props.post - ข้อมูลกระทู้
 * @param {function} props.formatDate - ฟังก์ชันแปลงวันที่เป็นภาษาไทย
 * @param {function} props.formatNumber - ฟังก์ชันแปลงตัวเลขเป็นรูปแบบย่อ
 * @param {number} props.index - ลำดับของ Card ใน List
 * @returns {JSX.Element} - Post Card Component
 *
 * การทำงาน:
 * 1. รับ props จาก PostFeed
 * 2. Destructure ข้อมูลจาก post object
 * 3. Render Card พร้อม Conditional Rendering สำหรับ Badges
 * 4. ใช้ index สำหรับ AOS animation delay (stagger effect)
 */
const PostCard = ({ post, formatDate, formatNumber, index }) => {
  return (
    /*
      Post Card Container
      
      - article tag: Semantic HTML สำหรับ content ที่เป็นบทความ
      - className: เพิ่ม "pinned" ถ้ากระทู้ถูกปักหมุด
      - data-aos: Animation fade-up
      - data-aos-delay: delay ตาม index (0, 50, 100, 150ms...)
        ทำให้ Cards animate เข้ามาทีละตัว (stagger effect)
    */
    <article
      className={`post-card ${post.isPinned ? "pinned" : ""}`}
      data-aos="fade-up"
      data-aos-delay={index * 50}
    >
      {/* =================================================================
          PINNED BADGE
          - แสดงเฉพาะกระทู้ที่ isPinned = true
          - มี Star Icon และข้อความ "ปักหมุด"
      ================================================================= */}
      {post.isPinned && (
        <div className="post-pinned-badge">
          {/* Star Icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>ปักหมุด</span>
        </div>
      )}

      {/* =================================================================
          POST HEADER
          - แสดงข้อมูลผู้เขียนและสถานะ
      ================================================================= */}
      <div className="post-header">
        {/* ----- AUTHOR INFO ----- */}
        <div className="post-author">
          {/* Author Avatar */}
          <img
            src={post.authorAvatar}
            alt={post.author}
            className="author-avatar"
          />
          {/* Author Details */}
          <div className="author-info">
            {/* Author Name */}
            <span className="author-name">{post.author}</span>
            {/* Post Meta: Date + Category */}
            <span className="post-meta">
              <span className="post-date">{formatDate(post.date)}</span>
              <span className="meta-dot">•</span>
              <span className="post-category-tag">{post.category}</span>
            </span>
          </div>
        </div>

        {/* ----- HOT BADGE ----- */}
        {/* แสดงเฉพาะกระทู้ที่ isHot = true */}
        <div className={`post-status ${post.isHot ? "hot" : ""}`}>
          {post.isHot && (
            <>
              {/* Fire Icon */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 23c-6.627 0-12-5.373-12-12 0-4.891 2.909-9.085 7.084-10.98l2.916 5.98-4.5 3 4.5 8v-4.5c0-1.381 1.119-2.5 2.5-2.5s2.5 1.119 2.5 2.5v4.5l4.5-8-4.5-3 2.916-5.98c4.175 1.895 7.084 6.089 7.084 10.98 0 6.627-5.373 12-12 12z" />
              </svg>
              <span>กำลังฮิต</span>
            </>
          )}
        </div>
      </div>

      {/* =================================================================
          POST CONTENT
          - แสดงหัวข้อ เนื้อหาย่อ และ Tags
      ================================================================= */}
      <div className="post-content">
        {/* Post Title */}
        <h3 className="post-title">{post.title}</h3>

        {/* Post Excerpt - เนื้อหาย่อ */}
        <p className="post-excerpt">{post.excerpt}</p>

        {/* ----- TAGS ----- */}
        {/* 
          แสดง Tags ของกระทู้
          - Loop ด้วย map()
          - เพิ่ม # หน้าแต่ละ tag
        */}
        <div className="post-tags">
          {post.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className="post-tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* =================================================================
          POST FOOTER
          - แสดงสถิติและปุ่มอ่านเพิ่มเติม
      ================================================================= */}
      <div className="post-footer">
        {/* ----- POST STATS ----- */}
        {/* 
          แสดงสถิติ 3 รายการ:
          1. Views - จำนวนการดู
          2. Replies - จำนวนความคิดเห็น
          3. Likes - จำนวน Likes
        */}
        <div className="post-stats">
          {/* Views */}
          <div className="stat-item">
            {/* Eye Icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>{formatNumber(post.views)}</span>
          </div>

          {/* Replies */}
          <div className="stat-item">
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
            <span>{post.replies}</span>
          </div>

          {/* Likes */}
          <div className="stat-item">
            {/* Heart Icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>{post.likes}</span>
          </div>
        </div>

        {/* ----- READ MORE BUTTON ----- */}
        {/* 
          ปุ่มอ่านเพิ่มเติม
          
          TODO: เพิ่ม onClick handler
          - นำทางไปหน้า Post Detail
          - หรือเปิด Modal แสดงรายละเอียด
        */}
        <button className="read-more-btn">
          อ่านเพิ่มเติม
          {/* Arrow Icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </article>
  );
};

// Export PostCard Component เพื่อใช้ใน PostFeed.jsx
export default PostCard;
