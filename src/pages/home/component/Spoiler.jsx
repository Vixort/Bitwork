/**
 * =============================================================================
 * Spoiler.jsx - Spoiler Section Component (ส่วนแสดงสินค้าเด่น)
 * =============================================================================
 *
 * Component นี้แสดงสินค้าเด่น โดยเฉพาะการ์ดจอมือสอง
 * เป็นส่วน Teaser/Preview ของสินค้าที่มีขายใน Market
 *
 * ทำหน้าที่:
 * 1. แสดงหัวข้อ "การ์ดจอมือสอง"
 * 2. แสดง Cards สินค้าการ์ดจอ 4 รายการ
 * 3. แสดง Banner Image ด้านล่าง
 *
 * โครงสร้าง:
 * ├── ContainerPositionCard
 * │   ├── h1 - "การ์ดจอมือสอง"
 * │   └── Container-Card - Grid ของ Cards
 * │       ├── Card 1 - RTX5000
 * │       ├── Card 2 - RTX5000
 * │       ├── Card 3 - RTX5000
 * │       └── Card 4 - RTX5000
 * └── BannerImg-1 - Banner Image
 *
 * หมายเหตุ:
 * - ข้อมูลสินค้าเป็นตัวอย่าง (Hardcoded)
 * - ในอนาคตควรดึงจาก API หรือ Props
 *
 */

// =============================================================================
// IMPORTS - นำเข้า Dependencies
// =============================================================================

import React from "react";

/**
 * Spoiler.css - Styles สำหรับ Spoiler Section
 * - กำหนด Card Layout (Grid หรือ Flexbox)
 * - กำหนด Card Styles (shadow, border-radius)
 * - กำหนด Hover Effects
 */
import "./Spoiler.css";

/**
 * Banner.png - รูป Banner (Import แบบ side effect)
 * หมายเหตุ: ไฟล์นี้ถูก import แต่ไม่ได้ใช้ในโค้ด
 * อาจใช้เพื่อให้ Vite รู้จักไฟล์และ bundle ไว้
 */
import "../assets/Banner.png";

// =============================================================================
// SPOILER COMPONENT
// =============================================================================

/**
 * Spoiler Component
 *
 * @description แสดง Preview สินค้าการ์ดจอมือสองและ Banner
 * @returns {JSX.Element} - Spoiler Section พร้อม Cards และ Banner
 *
 * การทำงาน:
 * 1. Render หัวข้อ Section
 * 2. Render Cards สินค้า 4 รายการ (แบบ Grid)
 * 3. Render Banner Image ด้านล่าง
 *
 * TODO:
 * - เปลี่ยนจาก Hardcoded Cards เป็น Dynamic (map จาก Array)
 * - เพิ่ม Link ไปหน้า Product Detail
 * - เพิ่ม Animation เมื่อ hover
 * - ดึงข้อมูลสินค้าจาก API
 */
const Spoiler = () => {
  return (
    <div>
      {/* =================================================================
          PRODUCT CARDS CONTAINER
          - แสดงสินค้าการ์ดจอมือสอง
      ================================================================= */}
      <div className="ContainerPositionCard">
        {/* ----- SECTION TITLE ----- */}
        <h1 className="Gp2">การ์ดจอมือสอง</h1>

        {/* =================================================================
            CARDS GRID CONTAINER
            - แสดง Cards แบบ Grid Layout
            - 4 Cards ต่อแถว (บน Desktop)
        ================================================================= */}
        <div className="Container-Card">
          {/* ----- CARD 1 ----- */}
          {/* 
            Card สินค้าการ์ดจอ
            โครงสร้าง:
            - img: รูปสินค้า
            - Content: ข้อมูลสินค้า (ชื่อ, รายละเอียด)
          */}
          <div className="Card">
            {/* รูปสินค้า */}
            <img
              src="https://notebookspec.com/web/wp-content/uploads/2020/10/Iris-Xe-MAX-badge-scaled.jpg"
              alt=""
              className="imgG"
            />
            {/* ข้อมูลสินค้า */}
            <div className="Content">
              <h1>RTX5000</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis quis at dolorum sit libero inventore sed nisi
              </p>
            </div>
          </div>

          {/* ----- CARD 2 ----- */}
          <div className="Card">
            <img
              src="https://notebookspec.com/web/wp-content/uploads/2020/10/Iris-Xe-MAX-badge-scaled.jpg"
              alt=""
              className="imgG"
            />
            <div className="Content">
              <h1>RTX5000</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis quis at dolorum sit libero inventore sed nisi
              </p>
            </div>
          </div>

          {/* ----- CARD 3 ----- */}
          <div className="Card">
            <img
              src="https://notebookspec.com/web/wp-content/uploads/2020/10/Iris-Xe-MAX-badge-scaled.jpg"
              alt=""
              className="imgG"
            />
            <div className="Content">
              <h1>RTX5000</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis quis at dolorum sit libero inventore sed nisi
              </p>
            </div>
          </div>

          {/* ----- CARD 4 ----- */}
          <div className="Card">
            <img
              src="https://notebookspec.com/web/wp-content/uploads/2020/10/Iris-Xe-MAX-badge-scaled.jpg"
              alt=""
              className="imgG"
            />
            <div className="Content">
              <h1>RTX5000</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis quis at dolorum sit libero inventore sed nisi
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================
          BANNER IMAGE SECTION
          - แสดง Banner โปรโมท/โฆษณา
          - Full Width Image
      ================================================================= */}
      <div className="BannerImg-1">
        {/* 
          Banner Image
          - ใช้รูปจาก Discord CDN
          - หมายเหตุ: ควรย้ายรูปมาเก็บใน assets ของ project
        */}
        <img
          src="https://cdn.discordapp.com/attachments/841252955554316300/1441165821346058312/Gemini_Generated_Image_ju4mvjju4mvjju4m.png?ex=6920cdc3&is=691f7c43&hm=81efb1f26dae55350b2c0b4d92158e4ca578e59151649ba9fd08b78bded5ed58&"
          alt=""
        />
      </div>
    </div>
  );
};

// Export Spoiler Component เพื่อใช้ใน home.jsx
export default Spoiler;
