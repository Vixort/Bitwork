/**
 * JobDetail.jsx
 * หน้ารายละเอียดงานแบบเต็ม
 * แสดงข้อมูลงานครบถ้วน: บริษัท, ตำแหน่ง, รายละเอียด, คุณสมบัติ, สวัสดิการ ฯลฯ
 */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import "./JobDetail.css";

// Import mock data
import jobListingData from "./components/jobListingData.json";

/**
 * JobDetail Component
 * แสดงรายละเอียดงานแบบเต็มหน้า
 */
const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // หา job จาก ID
  const job = jobListingData.jobs.find((j) => j.id === parseInt(jobId));

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 50,
    });
  }, []);

  // ถ้าไม่พบงาน
  if (!job) {
    return (
      <div className="job-detail-page">
        <div className="not-found">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <h2>ไม่พบตำแหน่งงาน</h2>
          <p>ตำแหน่งงานนี้อาจถูกลบหรือไม่มีอยู่ในระบบ</p>
          <button className="btn-back" onClick={() => navigate("/jobs")}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            กลับไปหน้างาน
          </button>
        </div>
      </div>
    );
  }

  // Format salary
  const formatSalary = (min, max) => {
    if (!min && !max) return "ไม่ระบุ";
    if (min && max)
      return `฿${min.toLocaleString()} - ฿${max.toLocaleString()}`;
    if (min) return `฿${min.toLocaleString()}+`;
    return `สูงสุด ฿${max.toLocaleString()}`;
  };

  // Format date
  const formatPostedDate = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "วันนี้";
    if (diffDays === 1) return "เมื่อวาน";
    if (diffDays < 7) return `${diffDays} วันที่แล้ว`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} สัปดาห์ที่แล้ว`;
    return `${Math.floor(diffDays / 30)} เดือนที่แล้ว`;
  };

  // Format full date
  const formatFullDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Mock data สำหรับข้อมูลเพิ่มเติม
  const jobDetails = {
    responsibilities: [
      "พัฒนาและดูแล Web Application ด้วยเทคโนโลยีที่กำหนด",
      "ทำงานร่วมกับทีม Backend และ Design เพื่อสร้างประสบการณ์ผู้ใช้ที่ดี",
      "เขียน Clean Code ตาม Best Practices และ Coding Standards",
      "ทดสอบและแก้ไข Bug รวมถึงปรับปรุงประสิทธิภาพของระบบ",
      "ศึกษาและนำเทคโนโลยีใหม่ๆ มาปรับใช้ในโปรเจค",
      "ร่วม Code Review และให้ Feedback กับทีม",
    ],
    requirements: [
      `ประสบการณ์ทำงานระดับ ${job.level} ขึ้นไป`,
      `มีความเชี่ยวชาญใน ${job.skills?.slice(0, 3).join(", ")}`,
      "สามารถทำงานเป็นทีมและสื่อสารได้ดี",
      "มีความรับผิดชอบและส่งงานตรงเวลา",
      "กระตือรือร้นในการเรียนรู้สิ่งใหม่ๆ",
    ],
    niceToHave: [
      "มีประสบการณ์ในการทำงานแบบ Agile/Scrum",
      "เคยทำโปรเจคที่มีผู้ใช้จำนวนมาก",
      "มีความรู้ด้าน CI/CD และ DevOps",
      "สามารถสื่อสารภาษาอังกฤษได้ดี",
    ],
    companyInfo: {
      about:
        "บริษัทชั้นนำด้านเทคโนโลยีที่มุ่งมั่นสร้างผลิตภัณฑ์ดิจิทัลคุณภาพสูง เรามีทีมงานที่มีความสามารถและวัฒนธรรมองค์กรที่เน้นการเติบโตและพัฒนาตนเอง",
      size: "50-200 คน",
      founded: "2018",
      website: "https://example.com",
      industry: "Technology / Software Development",
    },
    similarJobs: jobListingData.jobs.filter((j) => j.id !== job.id).slice(0, 3),
  };

  return (
    <div className="job-detail-page">
      {/* Background Decorations */}
      <div className="bg-shapes">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
      </div>
      <div className="grid-pattern"></div>

      {/* Cover Image */}
      {job.coverImage && (
        <div className="job-cover">
          <img src={job.coverImage} alt={`${job.company} workplace`} />
          <div className="cover-overlay"></div>
        </div>
      )}

      <div className="job-detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" data-aos="fade-up">
          <Link to="/">หน้าแรก</Link>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <Link to="/jobs">ตำแหน่งงาน</Link>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span>{job.title}</span>
        </nav>

        <div className="job-detail-content">
          {/* Main Content */}
          <div className="job-main-content">
            {/* Job Header */}
            <div className="job-header" data-aos="fade-up">
              <div className="header-top">
                <div className="company-logo">
                  {job.companyLogo ? (
                    <img src={job.companyLogo} alt={job.company} />
                  ) : (
                    <div className="logo-placeholder">
                      {job.company.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="header-info">
                  <h1 className="job-title">{job.title}</h1>
                  <div className="company-row">
                    <span className="company-name">{job.company}</span>
                    {job.isVerified && (
                      <span
                        className="verified-badge"
                        title="บริษัทยืนยันตัวตนแล้ว"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="job-tags">
                <span
                  className={`job-type-tag ${job.type
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {job.type}
                </span>
                <span className="job-level-tag">{job.level}</span>
                {job.isUrgent && <span className="urgent-tag">ด่วน</span>}
                {job.isRemote && <span className="remote-tag">Remote</span>}
              </div>

              <div className="job-meta-grid">
                <div className="meta-item">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <span className="meta-label">สถานที่</span>
                    <span className="meta-value">{job.location}</span>
                  </div>
                </div>
                <div className="meta-item">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                  <div>
                    <span className="meta-label">เงินเดือน</span>
                    <span className="meta-value salary">
                      {formatSalary(job.salaryMin, job.salaryMax)}
                      {job.salaryMin && (
                        <span className="period"> / เดือน</span>
                      )}
                    </span>
                  </div>
                </div>
                <div className="meta-item">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <div>
                    <span className="meta-label">โพสต์เมื่อ</span>
                    <span className="meta-value">
                      {formatFullDate(job.postedDate)}
                    </span>
                  </div>
                </div>
                <div className="meta-item">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  <div>
                    <span className="meta-label">ผู้สมัคร</span>
                    <span className="meta-value">{job.applicants} คน</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <section
              className="detail-section"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h2 className="section-title">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                รายละเอียดงาน
              </h2>
              <p className="description-text">{job.description}</p>
            </section>

            {/* Responsibilities */}
            <section
              className="detail-section"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <h2 className="section-title">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                หน้าที่ความรับผิดชอบ
              </h2>
              <ul className="detail-list">
                {jobDetails.responsibilities.map((item, index) => (
                  <li key={index}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section
              className="detail-section"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h2 className="section-title">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
                คุณสมบัติที่ต้องการ
              </h2>
              <ul className="detail-list">
                {jobDetails.requirements.map((item, index) => (
                  <li key={index}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Nice to Have */}
            <section
              className="detail-section"
              data-aos="fade-up"
              data-aos-delay="250"
            >
              <h2 className="section-title">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                คุณสมบัติเพิ่มเติมที่จะพิจารณาเป็นพิเศษ
              </h2>
              <ul className="detail-list nice-to-have">
                {jobDetails.niceToHave.map((item, index) => (
                  <li key={index}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Skills */}
            <section
              className="detail-section"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h2 className="section-title">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                </svg>
                ทักษะที่ต้องการ
              </h2>
              <div className="skills-container">
                {job.skills?.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <section
                className="detail-section"
                data-aos="fade-up"
                data-aos-delay="350"
              >
                <h2 className="section-title">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                  สวัสดิการ
                </h2>
                <div className="benefits-grid">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="benefit-card">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* About Company */}
            <section
              className="detail-section company-section"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h2 className="section-title">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                เกี่ยวกับ {job.company}
              </h2>
              <p className="company-about">{jobDetails.companyInfo.about}</p>
              <div className="company-info-grid">
                <div className="company-info-item">
                  <span className="info-label">ขนาดบริษัท</span>
                  <span className="info-value">
                    {jobDetails.companyInfo.size}
                  </span>
                </div>
                <div className="company-info-item">
                  <span className="info-label">ก่อตั้งเมื่อ</span>
                  <span className="info-value">
                    {jobDetails.companyInfo.founded}
                  </span>
                </div>
                <div className="company-info-item">
                  <span className="info-label">อุตสาหกรรม</span>
                  <span className="info-value">
                    {jobDetails.companyInfo.industry}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside
            className="job-sidebar"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            {/* Action Card */}
            <div className="sidebar-card action-card">
              <div className="salary-display">
                <span className="salary-label">เงินเดือน</span>
                <span className="salary-amount">
                  {formatSalary(job.salaryMin, job.salaryMax)}
                </span>
                {job.salaryMin && (
                  <span className="salary-period">ต่อเดือน</span>
                )}
              </div>

              <button
                className="btn-apply-main"
                onClick={() => setShowApplyModal(true)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
                สมัครงานตำแหน่งนี้
              </button>

              <button
                className={`btn-save ${isSaved ? "saved" : ""}`}
                onClick={() => setIsSaved(!isSaved)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={isSaved ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                </svg>
                {isSaved ? "บันทึกแล้ว" : "บันทึกงาน"}
              </button>

              <div className="action-info">
                <div className="info-row">
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
                  <span>โพสต์ {formatPostedDate(job.postedDate)}</span>
                </div>
                <div className="info-row">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  <span>{job.applicants} คนสมัครแล้ว</span>
                </div>
              </div>
            </div>

            {/* Share Card */}
            <div className="sidebar-card share-card">
              <h3>แชร์ตำแหน่งงานนี้</h3>
              <div className="share-buttons">
                <button className="share-btn facebook" title="แชร์ Facebook">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button className="share-btn twitter" title="แชร์ Twitter">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button className="share-btn linkedin" title="แชร์ LinkedIn">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </button>
                <button className="share-btn copy" title="คัดลอกลิงก์">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="sidebar-card similar-jobs-card">
              <h3>ตำแหน่งงานที่คล้ายกัน</h3>
              <div className="similar-jobs-list">
                {jobDetails.similarJobs.map((similarJob) => (
                  <Link
                    key={similarJob.id}
                    to={`/jobs/${similarJob.id}`}
                    className="similar-job-item"
                  >
                    <div className="similar-job-logo">
                      {similarJob.companyLogo ? (
                        <img
                          src={similarJob.companyLogo}
                          alt={similarJob.company}
                        />
                      ) : (
                        <div className="logo-placeholder">
                          {similarJob.company.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="similar-job-info">
                      <h4>{similarJob.title}</h4>
                      <span className="company">{similarJob.company}</span>
                      <span className="salary">
                        {formatSalary(
                          similarJob.salaryMin,
                          similarJob.salaryMax
                        )}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Back Button */}
        <div className="back-section" data-aos="fade-up">
          <button className="btn-back" onClick={() => navigate("/jobs")}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            กลับไปหน้างานทั้งหมด
          </button>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="modal-overlay" onClick={() => setShowApplyModal(false)}>
          <div className="apply-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowApplyModal(false)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="modal-header">
              <div className="company-logo">
                {job.companyLogo ? (
                  <img src={job.companyLogo} alt={job.company} />
                ) : (
                  <div className="logo-placeholder">
                    {job.company.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <h2>สมัครงาน</h2>
                <p>
                  {job.title} - {job.company}
                </p>
              </div>
            </div>

            <form
              className="apply-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("สมัครงานสำเร็จ! (Demo)");
                setShowApplyModal(false);
              }}
            >
              <div className="form-group">
                <label>ชื่อ-นามสกุล *</label>
                <input
                  type="text"
                  required
                  placeholder="กรอกชื่อ-นามสกุลของคุณ"
                />
              </div>
              <div className="form-group">
                <label>อีเมล *</label>
                <input type="email" required placeholder="example@email.com" />
              </div>
              <div className="form-group">
                <label>เบอร์โทรศัพท์ *</label>
                <input type="tel" required placeholder="0812345678" />
              </div>
              <div className="form-group">
                <label>Resume/CV *</label>
                <div className="file-upload">
                  <input type="file" accept=".pdf,.doc,.docx" />
                  <div className="file-upload-label">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span>อัปโหลดไฟล์ PDF, DOC, DOCX</span>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>ข้อความถึงผู้จ้างงาน</label>
                <textarea
                  rows={4}
                  placeholder="แนะนำตัวและอธิบายว่าทำไมคุณจึงเหมาะกับตำแหน่งนี้..."
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowApplyModal(false)}
                >
                  ยกเลิก
                </button>
                <button type="submit" className="btn-submit">
                  ส่งใบสมัคร
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
