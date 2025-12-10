/**
 * JobListing.jsx
 * Component สำหรับแสดงรายการงานทั้งหมด
 * มีฟีเจอร์: ตัวกรอง, การเรียงลำดับ, บันทึกงาน และแสดง Job Cards
 */

// นำเข้า React และ useState Hook สำหรับจัดการ state
import React, { useState } from "react";

// นำเข้า Component JobCard สำหรับแสดงการ์ดงานแต่ละใบ
import JobCard from "./JobCard";

// นำเข้าไฟล์ CSS สำหรับ styling
import "./JobListing.css";

// นำเข้าข้อมูล mock data จากไฟล์ JSON
import jobListingData from "./jobListingData.json";

/**
 * JobListing Component
 * แสดงรายการงานพร้อมตัวกรองและการเรียงลำดับ
 * @returns {JSX.Element} - Section แสดงรายการงานทั้งหมด
 */
const JobListing = () => {
  // ===== STATE MANAGEMENT =====

  // state เก็บรายการ ID ของงานที่ผู้ใช้บันทึกไว้
  const [savedJobs, setSavedJobs] = useState([]);

  // state เก็บตัวกรองที่เลือกอยู่ (ค่าเริ่มต้น = "ทั้งหมด")
  const [activeFilter, setActiveFilter] = useState("ทั้งหมด");

  // state เก็บวิธีเรียงลำดับที่เลือก (ค่าเริ่มต้น = "latest")
  const [sortBy, setSortBy] = useState("latest");

  // ===== DATA - ข้อมูลงานจาก JSON file =====
  // ในโปรเจคจริงควรดึงจาก API
  const jobs = jobListingData.jobs;

  // รายการตัวกรองที่แสดงเป็นปุ่ม (จาก JSON)
  const filters = jobListingData.filters;

  // ===== EVENT HANDLERS =====

  /**
   * ฟังก์ชันจัดการการบันทึก/ยกเลิกบันทึกงาน
   * @param {number} jobId - ID ของงานที่ต้องการบันทึก/ยกเลิก
   */
  const handleSaveJob = (jobId) => {
    setSavedJobs((prev) =>
      // ถ้า jobId มีอยู่แล้ว ให้ลบออก (ยกเลิกบันทึก)
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : // ถ้ายังไม่มี ให้เพิ่มเข้าไป (บันทึก)
          [...prev, jobId]
    );
  };

  /**
   * ฟังก์ชันจัดการเมื่อกดปุ่มสมัครงาน
   * @param {Object} job - ข้อมูลงานที่ต้องการสมัคร
   */
  const handleApply = (job) => {
    // แสดง alert (ในโปรเจคจริงควรเปิดหน้าสมัครงาน)
    alert(`สมัครงาน: ${job.title} ที่ ${job.company}`);
  };

  // ===== FILTERING & SORTING =====

  /**
   * กรองงานตาม filter ที่เลือก
   * - "ทั้งหมด" = แสดงทุกงาน
   * - "Remote" = แสดงเฉพาะงาน Remote
   * - อื่นๆ = แสดงตามประเภทงาน (Full-time, Part-time, Contract)
   */
  const filteredJobs = jobs.filter((job) => {
    // ถ้าเลือก "ทั้งหมด" ให้แสดงทุกงาน
    if (activeFilter === "ทั้งหมด") return true;
    // ถ้าเลือก "Remote" ให้กรองเฉพาะงานที่ isRemote = true
    if (activeFilter === "Remote") return job.isRemote;
    // อื่นๆ กรองตาม job.type
    return job.type === activeFilter;
  });

  /**
   * เรียงลำดับงานตาม sortBy ที่เลือก
   * - "latest" = เรียงตามวันที่โพสต์ (ใหม่สุดก่อน)
   * - "salary" = เรียงตามเงินเดือน (สูงสุดก่อน)
   * - "applicants" = เรียงตามจำนวนผู้สมัคร (น้อยสุดก่อน)
   */
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    // เรียงตามวันที่โพสต์ (ใหม่สุดก่อน)
    if (sortBy === "latest") {
      return new Date(b.postedDate) - new Date(a.postedDate);
    }
    // เรียงตามเงินเดือนสูงสุด (มากไปน้อย)
    if (sortBy === "salary") {
      return (b.salaryMax || 0) - (a.salaryMax || 0);
    }
    // เรียงตามจำนวนผู้สมัคร (น้อยไปมาก - โอกาสได้งานสูงกว่า)
    if (sortBy === "applicants") {
      return a.applicants - b.applicants;
    }
    // ค่าเริ่มต้น ไม่เปลี่ยนลำดับ
    return 0;
  });

  // ===== RENDER =====

  return (
    // Section หลักของ Job Listing
    <section className="job-listing-section">
      {/* Decorative background images */}
      <div className="listing-bg-decoration"></div>
      <div className="listing-bg-decoration-2"></div>

      {/* Container จำกัดความกว้าง */}
      <div className="job-listing-container">
        {/* ===== SECTION HEADER - หัว Section ===== */}
        <div className="listing-header" data-aos="fade-up">
          {/* ส่วนซ้าย: หัวข้อและจำนวนงาน */}
          <div className="header-left">
            {/* หัวข้อ Section */}
            <h2 className="listing-title">ตำแหน่งงานล่าสุด</h2>
            {/* คำอธิบายย่อยพร้อมจำนวนงาน */}
            <p className="listing-subtitle">
              พบ <span className="job-count">{filteredJobs.length}</span>{" "}
              ตำแหน่งงานที่เปิดรับ
            </p>
          </div>

          {/* ส่วนขวา: Dropdown เรียงลำดับ */}
          <div className="header-right">
            <div className="sort-dropdown">
              {/* Label */}
              <label>เรียงตาม:</label>
              {/* Select dropdown */}
              <select
                value={sortBy} // ผูกกับ state
                onChange={(e) => setSortBy(e.target.value)} // อัพเดท state เมื่อเปลี่ยน
              >
                <option value="latest">ล่าสุด</option> {/* เรียงตามวันที่ */}
                <option value="salary">เงินเดือน</option>{" "}
                {/* เรียงตามเงินเดือน */}
                <option value="applicants">ผู้สมัครน้อย</option>{" "}
                {/* เรียงตามผู้สมัคร */}
              </select>
            </div>
          </div>
        </div>

        {/* ===== FILTERS - ปุ่มตัวกรอง ===== */}
        <div
          className="listing-filters"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* วนลูปสร้างปุ่ม filter แต่ละตัว */}
          {filters.map((filter) => (
            <button
              key={filter}
              // เพิ่ม class "active" ถ้าเป็น filter ที่เลือกอยู่
              className={`filter-chip ${
                activeFilter === filter ? "active" : ""
              }`}
              // อัพเดท activeFilter เมื่อคลิก
              onClick={() => setActiveFilter(filter)}
            >
              {/* ชื่อ filter */}
              {filter}
              {/* แสดงจำนวนงานใน filter (ยกเว้น "ทั้งหมด") */}
              {filter !== "ทั้งหมด" && (
                <span className="filter-count">
                  {/* นับจำนวนงานตาม filter */}
                  {filter === "Remote"
                    ? jobs.filter((j) => j.isRemote).length // นับงาน Remote
                    : jobs.filter((j) => j.type === filter).length}{" "}
                  {/* // นับตามประเภท */}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ===== JOB CARDS GRID - ตาราง Card งาน ===== */}
        <div className="job-cards-grid">
          {/* วนลูปสร้าง JobCard แต่ละใบ */}
          {sortedJobs.map((job, index) => (
            <div key={job.id} data-aos="fade-up" data-aos-delay={index * 100}>
              <JobCard
                job={job} // ข้อมูลงาน
                onApply={handleApply} // ฟังก์ชันสมัครงาน
                onSave={handleSaveJob} // ฟังก์ชันบันทึกงาน
                isSaved={savedJobs.includes(job.id)} // สถานะบันทึกแล้วหรือยัง
              />
            </div>
          ))}
        </div>

        {/* ===== LOAD MORE - ปุ่มดูเพิ่มเติม ===== */}
        {/* แสดงเฉพาะเมื่อมีงาน */}
        {sortedJobs.length > 0 && (
          <div className="load-more-container" data-aos="fade-up">
            <button className="load-more-btn">
              {/* ข้อความปุ่ม */}
              ดูตำแหน่งงานเพิ่มเติม
              {/* Icon ลูกศรชี้ลง */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {/* Path หมุน 270 องศาเพื่อให้ชี้ลง */}
                <path
                  d="M19 12H5M12 19l-7-7 7-7"
                  transform="rotate(270 12 12)"
                />
              </svg>
            </button>
          </div>
        )}

        {/* ===== EMPTY STATE - แสดงเมื่อไม่พบงาน ===== */}
        {sortedJobs.length === 0 && (
          <div className="empty-state">
            {/* Icon แว่นขยาย */}
            <div className="empty-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            {/* หัวข้อ */}
            <h3>ไม่พบตำแหน่งงาน</h3>
            {/* คำอธิบาย */}
            <p>ลองเปลี่ยนตัวกรองหรือค้นหาด้วยคำอื่น</p>
          </div>
        )}
      </div>
    </section>
  );
};

// ส่งออก Component เพื่อให้ไฟล์อื่นสามารถ import ไปใช้งานได้
export default JobListing;
