/**
 * JobCard.jsx
 * Component สำหรับแสดงการ์ดข้อมูลงานแต่ละตำแหน่ง
 * แสดงข้อมูลครบถ้วน: รูปภาพ, บริษัท, ตำแหน่ง, เงินเดือน, ทักษะ, สวัสดิการ ฯลฯ
 */

// นำเข้า React library
import React from "react";

// นำเข้า useNavigate สำหรับเปลี่ยนหน้า
import { useNavigate } from "react-router";

// นำเข้าไฟล์ CSS สำหรับ styling ของ JobCard
import "./JobCard.css";

/**
 * JobCard Component
 * แสดงข้อมูลงานในรูปแบบ Card
 * @param {Object} props - Properties ที่รับเข้ามา
 * @param {Object} props.job - ข้อมูลงานทั้งหมด (title, company, salary, etc.)
 * @param {Function} props.onApply - ฟังก์ชันที่เรียกเมื่อกดปุ่มสมัครงาน
 * @param {Function} props.onSave - ฟังก์ชันที่เรียกเมื่อกดปุ่มบันทึกงาน
 * @param {boolean} props.isSaved - สถานะว่างานนี้ถูกบันทึกไว้หรือยัง
 * @returns {JSX.Element} - Card แสดงข้อมูลงาน
 */
const JobCard = ({ job, onApply, onSave, isSaved }) => {
  const navigate = useNavigate();
  // ===== HELPER FUNCTIONS =====

  /**
   * ฟังก์ชันจัดรูปแบบช่วงเงินเดือน
   * @param {number} min - เงินเดือนต่ำสุด
   * @param {number} max - เงินเดือนสูงสุด
   * @returns {string} - ข้อความเงินเดือนที่จัดรูปแบบแล้ว
   */
  const formatSalary = (min, max) => {
    // กรณีไม่ระบุเงินเดือนทั้งคู่
    if (!min && !max) return "ไม่ระบุ";
    // กรณีระบุทั้งต่ำสุดและสูงสุด แสดงเป็นช่วง
    if (min && max)
      return `฿${min.toLocaleString()} - ฿${max.toLocaleString()}`;
    // กรณีระบุแค่ต่ำสุด แสดงเป็น "xxx+"
    if (min) return `฿${min.toLocaleString()}+`;
    // กรณีระบุแค่สูงสุด แสดงเป็น "สูงสุด xxx"
    return `สูงสุด ฿${max.toLocaleString()}`;
  };

  /**
   * ฟังก์ชันจัดรูปแบบวันที่โพสต์ให้อ่านง่าย
   * @param {string} date - วันที่ในรูปแบบ ISO string
   * @returns {string} - ข้อความวันที่แบบอ่านง่าย (เช่น "2 วันที่แล้ว")
   */
  const formatPostedDate = (date) => {
    // สร้าง Date object สำหรับวันปัจจุบัน
    const now = new Date();
    // สร้าง Date object สำหรับวันที่โพสต์
    const posted = new Date(date);
    // คำนวณผลต่างเวลา (milliseconds)
    const diffTime = Math.abs(now - posted);
    // แปลงเป็นจำนวนวัน
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // เงื่อนไขแสดงผลตามจำนวนวัน
    if (diffDays === 0) return "วันนี้"; // โพสต์วันนี้
    if (diffDays === 1) return "เมื่อวาน"; // โพสต์เมื่อวาน
    if (diffDays < 7) return `${diffDays} วันที่แล้ว`; // โพสต์ภายใน 7 วัน
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} สัปดาห์ที่แล้ว`; // โพสต์ภายใน 30 วัน
    return `${Math.floor(diffDays / 30)} เดือนที่แล้ว`; // โพสต์เกิน 30 วัน
  };

  // ===== RENDER =====

  // ฟังก์ชันเปิดหน้ารายละเอียดงาน
  const handleCardClick = (e) => {
    // ไม่เปิดถ้าคลิกที่ปุ่มบันทึกหรือสมัคร
    if (e.target.closest(".save-btn") || e.target.closest(".apply-btn")) {
      return;
    }
    navigate(`/jobs/${job.id}`);
  };

  return (
    // Container หลักของ Card - สามารถคลิกได้
    <div className="job-card" onClick={handleCardClick}>
      {/* ===== COVER IMAGE - รูปภาพปก ===== */}
      {/* แสดงเฉพาะเมื่อมี coverImage */}
      {job.coverImage && (
        <div className="job-cover-image">
          {/* รูปภาพสถานที่ทำงาน/บริษัท */}
          <img src={job.coverImage} alt={`${job.company} workplace`} />
          {/* Overlay gradient ทำให้รูปดูสวยขึ้น */}
          <div className="cover-overlay"></div>
        </div>
      )}

      {/* ===== HEADER - ส่วนหัวของ Card ===== */}
      <div className="job-card-header">
        {/* โลโก้บริษัท */}
        <div className="company-logo">
          {/* ถ้ามีโลโก้ แสดงรูป */}
          {job.companyLogo ? (
            <img src={job.companyLogo} alt={job.company} />
          ) : (
            // ถ้าไม่มีโลโก้ แสดงตัวอักษรแรกของชื่อบริษัท
            <div className="logo-placeholder">
              {job.company.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* ข้อมูลหลักของงาน */}
        <div className="job-main-info">
          {/* ชื่อตำแหน่งงาน */}
          <h3 className="job-title">{job.title}</h3>
          {/* ข้อมูลบริษัท */}
          <div className="company-info">
            {/* ชื่อบริษัท */}
            <span className="company-name">{job.company}</span>
            {/* Badge ยืนยันตัวตน (แสดงเมื่อ isVerified = true) */}
            {job.isVerified && (
              <span className="verified-badge" title="บริษัทยืนยันตัวตนแล้ว">
                {/* Icon เครื่องหมายถูก */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            )}
          </div>
        </div>

        {/* ปุ่มบันทึกงาน (Bookmark) */}
        <button
          className={`save-btn ${isSaved ? "saved" : ""}`} // เพิ่ม class "saved" ถ้าบันทึกแล้ว
          onClick={() => onSave(job.id)} // เรียก onSave เมื่อคลิก
          title={isSaved ? "ยกเลิกบันทึก" : "บันทึกงาน"} // Tooltip
        >
          {/* Icon bookmark */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isSaved ? "currentColor" : "none"} // เติมสีถ้าบันทึกแล้ว
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
        </button>
      </div>

      {/* ===== TAGS - แท็กต่างๆ ===== */}
      <div className="job-tags">
        {/* Tag ประเภทงาน (Full-time, Part-time, etc.) */}
        <span
          className={`job-type-tag ${job.type.toLowerCase().replace(" ", "-")}`}
        >
          {job.type}
        </span>
        {/* Tag ระดับงาน (Junior, Mid-level, Senior) */}
        <span className="job-level-tag">{job.level}</span>
        {/* Tag "ด่วน" แสดงเมื่อ isUrgent = true */}
        {job.isUrgent && <span className="urgent-tag">ด่วน</span>}
        {/* Tag "Remote" แสดงเมื่อ isRemote = true */}
        {job.isRemote && <span className="remote-tag">Remote</span>}
      </div>

      {/* ===== LOCATION & SALARY - สถานที่และเงินเดือน ===== */}
      <div className="job-details">
        {/* สถานที่ทำงาน */}
        <div className="detail-item">
          {/* Icon หมุดตำแหน่ง */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {/* ข้อความสถานที่ */}
          <span>{job.location}</span>
        </div>
        {/* เงินเดือน */}
        <div className="detail-item salary">
          {/* Icon เงิน */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
          {/* ข้อความเงินเดือนที่จัดรูปแบบแล้ว */}
          <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
          {/* แสดง "/ เดือน" ถ้ามีเงินเดือนต่ำสุด */}
          {job.salaryMin && <span className="salary-period">/ เดือน</span>}
        </div>
      </div>

      {/* ===== DESCRIPTION - คำอธิบายงาน ===== */}
      <p className="job-description">{job.description}</p>

      {/* ===== SKILLS - ทักษะที่ต้องการ ===== */}
      {/* แสดงเฉพาะเมื่อมี skills และมีอย่างน้อย 1 รายการ */}
      {job.skills && job.skills.length > 0 && (
        <div className="job-skills">
          {/* แสดงทักษะ 4 ตัวแรก */}
          {job.skills.slice(0, 4).map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
          {/* ถ้ามีทักษะมากกว่า 4 แสดง "+X" */}
          {job.skills.length > 4 && (
            <span className="skill-more">+{job.skills.length - 4}</span>
          )}
        </div>
      )}

      {/* ===== BENEFITS - สวัสดิการ ===== */}
      {/* แสดงเฉพาะเมื่อมี benefits และมีอย่างน้อย 1 รายการ */}
      {job.benefits && job.benefits.length > 0 && (
        <div className="job-benefits">
          {/* แสดงสวัสดิการ 3 ตัวแรก */}
          {job.benefits.slice(0, 3).map((benefit, index) => (
            <span key={index} className="benefit-item">
              {/* Icon เครื่องหมายถูก */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {/* ข้อความสวัสดิการ */}
              {benefit}
            </span>
          ))}
        </div>
      )}

      {/* ===== FOOTER - ส่วนท้ายของ Card ===== */}
      <div className="job-card-footer">
        {/* ข้อมูล Meta (วันที่โพสต์, จำนวนผู้สมัคร) */}
        <div className="job-meta">
          {/* วันที่โพสต์ */}
          <span className="posted-date">
            {formatPostedDate(job.postedDate)}
          </span>
          {/* จำนวนผู้สมัคร */}
          <span className="applicants">
            {/* Icon คน */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
            {/* จำนวนและข้อความ */}
            {job.applicants} สมัครแล้ว
          </span>
        </div>

        {/* ปุ่มสมัครงาน */}
        <button className="apply-btn" onClick={() => onApply(job)}>
          {/* ข้อความปุ่ม */}
          สมัครงาน
          {/* Icon ลูกศรชี้ขวา */}
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
    </div>
  );
};

// ส่งออก Component เพื่อให้ไฟล์อื่นสามารถ import ไปใช้งานได้
export default JobCard;
