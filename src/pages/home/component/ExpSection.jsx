/**
 * =============================================================================
 * ExpSection.jsx - Experience Section Component (ส่วนประสบการณ์)
 * =============================================================================
 *
 * Component นี้แสดงส่วนประสบการณ์และความน่าเชื่อถือของ Bitwork
 * สร้างความมั่นใจให้กับผู้ใช้ด้วยรูปภาพและข้อความ
 *
 * ทำหน้าที่:
 * 1. แสดงเส้นแบ่ง (Decorative Lines)
 * 2. แสดงข้อความอธิบายประสบการณ์
 * 3. แสดงรูปภาพประกอบ
 *
 * โครงสร้าง:
 * └── ExpSection
 *     ├── Line (เส้นบน - Decorative)
 *     ├── PageExp
 *     │   ├── p - ข้อความอธิบาย
 *     │   └── ImgExp
 *     │       └── img - รูปภาพประกอบ
 *     └── Line (เส้นล่าง - Decorative)
 *
 * หมายเหตุ:
 * - ส่วนนี้ใช้ Lorem Ipsum เป็นตัวอย่าง
 * - ควรเปลี่ยนเป็นข้อความจริงเกี่ยวกับประสบการณ์ของ Bitwork
 *
 */

// =============================================================================
// IMPORTS - นำเข้า Dependencies
// =============================================================================

import React from "react";

/**
 * ExpSection.css - Styles สำหรับ Experience Section
 * - กำหนด Layout แบบ 2 คอลัมน์ (Text + Image)
 * - กำหนด Line Styles (เส้นแบ่ง)
 * - กำหนด Typography และ Spacing
 */
import "./ExpSection.css";

// =============================================================================
// EXPSECTION COMPONENT
// =============================================================================

/**
 * ExpSection Component
 *
 * @description แสดงส่วนประสบการณ์และความน่าเชื่อถือของ Platform
 * @returns {JSX.Element} - Experience Section พร้อมข้อความและรูปภาพ
 *
 * การทำงาน:
 * 1. Render เส้นแบ่งด้านบน (Decorative)
 * 2. Render ข้อความและรูปภาพแบบ Side-by-side
 * 3. Render เส้นแบ่งด้านล่าง (Decorative)
 *
 * TODO:
 * - เปลี่ยน Lorem Ipsum เป็นข้อความจริง
 * - เพิ่มสถิติ (จำนวนผู้ใช้, ยอดขาย, จำนวนสินค้า)
 * - เพิ่ม Animation (AOS)
 * - ใช้รูปจาก assets แทน URL ภายนอก
 */
const ExpSection = () => {
  return (
    <div>
      {/* =================================================================
          EXPERIENCE SECTION CONTAINER
          - Container หลักของ Section
      ================================================================= */}
      <div className="ExpSection">
        {/* ----- TOP DECORATIVE LINE ----- */}
        {/* เส้นแบ่งด้านบน - สร้างความสวยงามและแบ่ง Section */}
        <div className="Line"></div>

        {/* =================================================================
            PAGE EXPERIENCE CONTENT
            - แสดงข้อความและรูปภาพ
            - Layout แบบ Side-by-side (Text ซ้าย, Image ขวา)
        ================================================================= */}
        <div className="PageExp">
          {/* ----- TEXT DESCRIPTION ----- */}
          {/* 
            ข้อความอธิบายประสบการณ์ของ Bitwork
            
            TODO: เปลี่ยนเป็นข้อความจริง เช่น:
            - "Bitwork ให้บริการมากว่า 5 ปี"
            - "มีผู้ใช้งานกว่า 100,000 คน"
            - "สินค้าคุณภาพกว่า 10,000 รายการ"
          */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            nesciunt illo amet nihil accusantium pariatur eaque obcaecati fugiat
            perspiciatis id, numquam, esse dolor quaerat. Soluta quae ex eius
            fugiat nihil!
          </p>

          {/* ----- IMAGE CONTAINER ----- */}
          {/* รูปภาพประกอบ - แสดงความน่าเชื่อถือ */}
          <div className="ImgExp">
            {/* 
              รูปภาพ - ปัจจุบันใช้รูปจาก Thairath (ภายนอก)
              
              TODO: 
              - ย้ายรูปมาเก็บใน assets ของ project
              - เปลี่ยนเป็นรูปที่เกี่ยวข้องกับ Bitwork
            */}
            <img
              src="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa6rPeHcZQXsGUPG9X4LKabjIY9cCZPbwTUU7YGq2G6DYAANEKFji.jpg"
              alt=""
            />
          </div>
        </div>

        {/* ----- BOTTOM DECORATIVE LINE ----- */}
        {/* เส้นแบ่งด้านล่าง - สร้างความสวยงามและปิด Section */}
        <div className="Line"></div>
      </div>
    </div>
  );
};

// Export ExpSection Component เพื่อใช้ใน home.jsx
export default ExpSection;
