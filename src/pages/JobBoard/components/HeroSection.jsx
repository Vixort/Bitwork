/**
 * HeroSection.jsx
 * Component สำหรับแสดงส่วน Hero Banner ของหน้า Job Board
 * ประกอบด้วย หัวข้อหลัก, ช่องค้นหางาน, หมวดหมู่ยอดนิยม และสถิติ
 */

// นำเข้า React และ useState Hook สำหรับจัดการ state
import React, { useState } from "react";

// นำเข้าไฟล์ CSS สำหรับ styling ของ HeroSection
import "./HeroSection.css";

/**
 * HeroSection Component
 * แสดงส่วน Banner ด้านบนของหน้า Job Board
 * @returns {JSX.Element} - Hero Section พร้อมฟอร์มค้นหาและสถิติ
 */
const HeroSection = () => {
  // ===== STATE MANAGEMENT =====

  // state เก็บคำค้นหาตำแหน่งงาน/ทักษะ/บริษัท ที่ผู้ใช้พิมพ์
  const [searchQuery, setSearchQuery] = useState("");

  // state เก็บสถานที่/ตำแหน่งที่ตั้ง ที่ผู้ใช้พิมพ์
  const [location, setLocation] = useState("");

  // ===== EVENT HANDLERS =====

  /**
   * ฟังก์ชันจัดการเมื่อกดปุ่มค้นหา
   * @param {Event} e - Event object จาก form submit
   */
  const handleSearch = (e) => {
    // ป้องกันการ refresh หน้าเมื่อ submit form
    e.preventDefault();

    // แสดงข้อมูลการค้นหาใน console (สามารถเปลี่ยนเป็น API call ได้)
    console.log("Searching:", { searchQuery, location });
  };

  // ===== DATA =====

  // ข้อมูลสถิติที่จะแสดงด้านล่าง Hero Section
  // แต่ละ object มี number (ตัวเลข) และ label (คำอธิบาย)
  const stats = [
    { number: "10K+", label: "ตำแหน่งงาน" }, // จำนวนตำแหน่งงานทั้งหมด
    { number: "5K+", label: "บริษัทชั้นนำ" }, // จำนวนบริษัทที่ร่วมลงประกาศ
    { number: "50K+", label: "ผู้สมัครสำเร็จ" }, // จำนวนผู้สมัครที่ได้งาน
  ];

  // รายการหมวดหมู่งานยอดนิยม สำหรับแสดงเป็น tag ให้คลิกได้
  const popularCategories = [
    "IT & Software", // งานด้าน IT และซอฟต์แวร์
    "Marketing", // งานด้านการตลาด
    "Design", // งานด้านออกแบบ
    "Finance", // งานด้านการเงิน
    "Engineering", // งานด้านวิศวกรรม
  ];

  // ===== RENDER =====

  return (
    // Section หลักของ Hero พร้อม class สำหรับ styling
    <section className="hero-section">
      {/* Container จำกัดความกว้างและจัดกึ่งกลาง */}
      <div className="hero-container">
        {/* ===== MAIN CONTENT - เนื้อหาหลัก ===== */}
        <div className="hero-content">
          {/* Badge แสดงข้อความโปรโมท */}
          <div className="hero-badge" data-aos="fade-down" data-aos-delay="100">
            {/* จุดกลมเล็กๆ พร้อม animation pulse */}
            <span className="badge-dot"></span>
            {/* ข้อความใน badge */}
            แพลตฟอร์มหางานอันดับ 1
          </div>

          {/* หัวข้อหลักของ Hero Section */}
          <h1 className="hero-title" data-aos="fade-up" data-aos-delay="200">
            {/* ข้อความปกติ */}
            ค้นหา
            {/* ข้อความเน้นสีเขียว */}
            <span className="highlight">งานในฝัน</span>
            {/* ขึ้นบรรทัดใหม่ */}
            <br />
            ที่เหมาะกับคุณ
          </h1>

          {/* คำอธิบายย่อยใต้หัวข้อหลัก */}
          <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="300">
            เชื่อมต่อกับบริษัทชั้นนำนับพันแห่ง
            ค้นหาโอกาสทางอาชีพที่ตรงกับทักษะและความสนใจของคุณ
          </p>

          {/* ===== SEARCH BOX - กล่องค้นหา ===== */}
          {/* Form สำหรับค้นหางาน เมื่อ submit จะเรียก handleSearch */}
          <form
            className="hero-search-box"
            onSubmit={handleSearch}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {/* กลุ่ม input fields */}
            <div className="search-input-group">
              {/* ช่องค้นหาตำแหน่งงาน */}
              <div className="search-field">
                {/* Icon แว่นขยาย (SVG) */}
                <svg
                  className="search-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {/* วงกลมของแว่นขยาย */}
                  <circle cx="11" cy="11" r="8" />
                  {/* ด้ามจับแว่นขยาย */}
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                {/* Input สำหรับพิมพ์ตำแหน่งงาน/ทักษะ/บริษัท */}
                <input
                  type="text"
                  placeholder="ตำแหน่งงาน, ทักษะ, หรือบริษัท"
                  value={searchQuery} // ผูกกับ state
                  onChange={(e) => setSearchQuery(e.target.value)} // อัพเดท state เมื่อพิมพ์
                />
              </div>

              {/* เส้นแบ่งระหว่าง 2 ช่อง input */}
              <div className="search-divider"></div>

              {/* ช่องค้นหาสถานที่ */}
              <div className="search-field">
                {/* Icon หมุด/ตำแหน่งที่ตั้ง (SVG) */}
                <svg
                  className="search-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {/* รูปหยดน้ำ (location pin) */}
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  {/* จุดกลมตรงกลาง */}
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {/* Input สำหรับพิมพ์สถานที่ */}
                <input
                  type="text"
                  placeholder="สถานที่ หรือ Remote"
                  value={location} // ผูกกับ state
                  onChange={(e) => setLocation(e.target.value)} // อัพเดท state เมื่อพิมพ์
                />
              </div>

              {/* ปุ่มค้นหา */}
              <button type="submit" className="search-btn">
                {/* Icon แว่นขยายในปุ่ม */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                {/* ข้อความปุ่ม */}
                <span>ค้นหา</span>
              </button>
            </div>
          </form>

          {/* ===== POPULAR CATEGORIES - หมวดหมู่ยอดนิยม ===== */}
          <div
            className="hero-categories"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            {/* Label "ยอดนิยม:" */}
            <span className="categories-label">ยอดนิยม:</span>
            {/* รายการ tag หมวดหมู่ */}
            <div className="categories-list">
              {/* วนลูปสร้างปุ่ม tag แต่ละหมวดหมู่ */}
              {popularCategories.map((category, index) => (
                <button key={index} className="category-tag">
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== STATS - สถิติ ===== */}
        <div className="hero-stats" data-aos="fade-up" data-aos-delay="600">
          {/* วนลูปสร้างแต่ละ stat item */}
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item"
              data-aos="zoom-in"
              data-aos-delay={700 + index * 100}
            >
              {/* ตัวเลขสถิติ (เช่น "10K+") */}
              <span className="stat-number">{stat.number}</span>
              {/* คำอธิบาย (เช่น "ตำแหน่งงาน") */}
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== DECORATIVE ELEMENTS - องค์ประกอบตกแต่ง ===== */}
      {/* วงกลมพื้นหลังสำหรับตกแต่ง */}
      <div className="hero-decoration">
        <div className="decoration-circle circle-1"></div>{" "}
        {/* วงกลมใหญ่ขวาบน */}
        <div className="decoration-circle circle-2"></div>{" "}
        {/* วงกลมกลางซ้ายล่าง */}
        <div className="decoration-circle circle-3"></div> {/* วงกลมเล็กซ้าย */}
        {/* รูปภาพลอยตัวสำหรับตกแต่ง */}
        <div className="floating-image floating-image-1"></div>
        <div className="floating-image floating-image-2"></div>
      </div>
    </section>
  );
};

// ส่งออก Component เพื่อให้ไฟล์อื่นสามารถ import ไปใช้งานได้
export default HeroSection;
