/**
 * =============================================================================
 * Showcase.jsx - Showcase Section Component (ส่วนแสดงบริการ)
 * =============================================================================
 *
 * Component นี้แสดงส่วน Showcase ที่แสดงบริการหลักของ Bitwork
 * มี Marquee Animation (Cards เลื่อนอัตโนมัติ)
 *
 * ทำหน้าที่:
 * 1. แสดง Title "พร้อมจบครบทุกอย่างต้อง Bitwork"
 * 2. แสดง 3 บริการหลัก (หาสินค้า, จ้างงาน, สอบถาม)
 * 3. แสดง Cards แบบ Marquee (เลื่อนอัตโนมัติไม่หยุด)
 * 4. แสดง Tagline ด้านล่าง
 *
 * โครงสร้าง:
 * └── Section
 *     ├── title - "พร้อมจบครบทุกอย่างต้อง Bitwork"
 *     ├── box - 3 บริการหลัก
 *     │   ├── หาสินค้า
 *     │   ├── จ้างงาน
 *     │   └── สอบถาม
 *     ├── ContainerContentShowcase - Marquee Cards
 *     └── textShowcase - Tagline
 *
 */

// =============================================================================
// IMPORTS - นำเข้า Dependencies
// =============================================================================

import React from "react";

/**
 * Showcase.css - Styles สำหรับ Showcase Section
 * - กำหนด Marquee Animation (CSS keyframes)
 * - กำหนด Card Styles
 * - กำหนด Layout และ Typography
 */
import "./Showcase.css";

// =============================================================================
// SHOWCASE COMPONENT
// =============================================================================

/**
 * Showcase Component
 *
 * @description แสดงบริการหลักของ Bitwork พร้อม Marquee Animation
 * @returns {JSX.Element} - Showcase Section พร้อม Title, Services และ Marquee Cards
 *
 * การทำงาน Marquee:
 * 1. สร้าง cardElements array ที่มี Card Components
 * 2. Render cardElements ปกติ
 * 3. Duplicate cardElements อีกชุดหนึ่ง (ใช้ React.cloneElement)
 * 4. CSS Animation จะเลื่อน Cards จากขวาไปซ้ายอย่างต่อเนื่อง
 * 5. การ Duplicate ทำให้เห็นเป็น Loop ไม่มีที่สิ้นสุด
 *
 * หมายเหตุ:
 * - key prop ต้องไม่ซ้ำกัน (ใช้ card-0, card-1 สำหรับชุดแรก)
 * - ชุด duplicate ใช้ card-dup-0, card-dup-1 แทน
 */
const Showcase = () => {
  // =============================================================================
  // CARD ELEMENTS DATA - ข้อมูล Cards สำหรับ Marquee
  // =============================================================================

  /**
   * cardElements - Array ของ Card Components
   *
   * แต่ละ Card ประกอบด้วย:
   * - className="Card" - ใช้ CSS class สำหรับ styling
   * - key prop - ต้องมีเพื่อให้ React จัดการ list ได้ถูกต้อง
   * - เนื้อหา (ปัจจุบันเป็น text 1-5 ตัวอย่าง)
   *
   * TODO: เปลี่ยนเป็นข้อมูลจริง เช่น รูปสินค้า, ชื่อบริการ, ราคา
   */
  const cardElements = [
    <div className="Card" key={`card-0`}>
      <div>text 1</div>
    </div>,
    <div className="Card" key={`card-1`}>
      <div>text 2</div>
    </div>,
    <div className="Card" key={`card-2`}>
      <div>text 3</div>
    </div>,
    <div className="Card" key={`card-3`}>
      <div>text 4</div>
    </div>,
    <div className="Card" key={`card-4`}>
      <div>text 5</div>
    </div>,
  ];

  // =============================================================================
  // RENDER - แสดงผล Component
  // =============================================================================

  return (
    <div>
      {/* =================================================================
          SECTION CONTAINER
          - ครอบทั้งหมดของ Showcase Section
      ================================================================= */}
      <div className="Section">
        {/* ----- TITLE ----- */}
        {/* หัวข้อหลักของ Section */}
        <h1 className="title">พร้อมจบครบทุกอย่างต้อง Bitwork</h1>

        {/* =================================================================
            SERVICE BOX - 3 บริการหลัก
            แสดงบริการหลักของ Bitwork แบบ Horizontal Layout
        ================================================================= */}
        <div className="box">
          {/* ----- บริการที่ 1: หาสินค้า ----- */}
          {/* ลิงก์ไปหน้า Market */}
          <div className="item">
            <div className="circle"></div> {/* Icon placeholder */}
            <p>หาสินค้า</p>
          </div>

          {/* ----- บริการที่ 2: จ้างงาน ----- */}
          {/* ลิงก์ไปหน้า JobBoard */}
          <div className="item">
            <div className="circle"></div> {/* Icon placeholder */}
            <p>จ้างงาน</p>
          </div>

          {/* ----- บริการที่ 3: สอบถาม ----- */}
          {/* ลิงก์ไปหน้า Community */}
          <div className="item">
            <div className="circle"></div> {/* Icon placeholder */}
            <p>สอบถาม</p>
          </div>
        </div>

        {/* =================================================================
            MARQUEE CONTAINER - Cards เลื่อนอัตโนมัติ
            
            การทำงาน:
            1. marquee container มี overflow: hidden
            2. marquee__inner มี animation: marquee
            3. Cards จะเลื่อนจากขวาไปซ้ายอย่างต่อเนื่อง
            4. เมื่อ Cards ชุดแรกเลื่อนออกไป ชุด duplicate จะเข้ามาแทน
            5. ทำให้เห็นเป็น infinite loop
        ================================================================= */}
        <div className="ContainerContentShowcase">
          {/* 
            aria-hidden="true" 
            - บอก Screen Reader ให้ข้าม element นี้
            - เพราะเป็น decorative content
          */}
          <div className="marquee" aria-hidden="true">
            {/* 
              marquee__inner - Container ที่มี Animation
              - มี Cards 2 ชุด (ต้นฉบับ + duplicate)
              - CSS animation จะเลื่อน container ทั้งหมด
            */}
            <div className="marquee__inner">
              {/* ----- Cards ชุดที่ 1 (ต้นฉบับ) ----- */}
              {cardElements}

              {/* ----- Cards ชุดที่ 2 (Duplicate) ----- */}
              {/* 
                React.cloneElement() - สร้าง copy ของ element
                - ต้องเปลี่ยน key เป็น card-dup-{i} เพื่อไม่ให้ซ้ำ
                - การ duplicate ทำให้ marquee ดูเหมือน infinite loop
              */}
              {cardElements.map((el, i) =>
                React.cloneElement(el, { key: `card-dup-${i}` })
              )}
            </div>
          </div>
        </div>

        {/* ----- TAGLINE ----- */}
        {/* ข้อความสรุปบริการด้านล่าง */}
        <div className="textShowcase">
          ครบทุกบริการคอมพิวเตอร์ ที่เดียวจบ ครบทั้งซ่อม–ขาย–แชร์ความรู้
        </div>
      </div>
    </div>
  );
};

// Export Showcase Component เพื่อใช้ใน home.jsx
export default Showcase;
