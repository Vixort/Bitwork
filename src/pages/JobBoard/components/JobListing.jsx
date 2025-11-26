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

  // ===== DATA - ข้อมูลงานตัวอย่าง =====
  // ในโปรเจคจริงควรดึงจาก API
  const jobs = [
    {
      id: 1, // ID เฉพาะของงาน
      title: "Senior Frontend Developer", // ชื่อตำแหน่งงาน
      company: "TechCorp Thailand", // ชื่อบริษัท
      companyLogo: null, // URL โลโก้บริษัท (null = ใช้ตัวอักษรแทน)
      // URL รูปภาพปก
      coverImage:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=300&fit=crop",
      location: "กรุงเทพมหานคร", // สถานที่ทำงาน
      type: "Full-time", // ประเภทงาน (Full-time, Part-time, Contract)
      level: "Senior", // ระดับ (Junior, Mid-level, Senior)
      salaryMin: 80000, // เงินเดือนต่ำสุด
      salaryMax: 120000, // เงินเดือนสูงสุด
      // คำอธิบายงาน
      description:
        "เรากำลังมองหา Senior Frontend Developer ที่มีประสบการณ์ในการพัฒนา Web Application ด้วย React, TypeScript และ Modern CSS เพื่อร่วมทีมพัฒนาผลิตภัณฑ์หลักของบริษัท",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "GraphQL"], // ทักษะที่ต้องการ
      benefits: ["ประกันสุขภาพ", "WFH 3 วัน/สัปดาห์", "โบนัสประจำปี"], // สวัสดิการ
      postedDate: "2025-11-24", // วันที่โพสต์
      applicants: 45, // จำนวนผู้สมัคร
      isVerified: true, // บริษัทยืนยันตัวตนหรือยัง
      isUrgent: true, // งานด่วนหรือไม่
      isRemote: true, // รองรับ Remote หรือไม่
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Creative Studio",
      companyLogo: null,
      coverImage:
        "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=300&fit=crop",
      location: "เชียงใหม่",
      type: "Full-time",
      level: "Mid-level",
      salaryMin: 45000,
      salaryMax: 65000,
      description:
        "ออกแบบ User Interface และ User Experience สำหรับแอปพลิเคชันมือถือและเว็บไซต์ ทำงานร่วมกับทีม Product และ Developer เพื่อสร้างประสบการณ์ผู้ใช้ที่ยอดเยี่ยม",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      benefits: ["ประกันสุขภาพ", "อุปกรณ์ทำงาน", "งบเรียนรู้"],
      postedDate: "2025-11-23",
      applicants: 32,
      isVerified: true,
      isUrgent: false,
      isRemote: false,
    },
    {
      id: 3,
      title: "Backend Developer (Node.js)",
      company: "StartupX",
      companyLogo: null,
      coverImage:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=300&fit=crop",
      location: "Remote",
      type: "Full-time",
      level: "Junior",
      salaryMin: 35000,
      salaryMax: 50000,
      description:
        "พัฒนา RESTful API และ Microservices ด้วย Node.js, Express และ MongoDB ร่วมทีม Backend เล็กๆ ที่เน้นคุณภาพและ Best Practices",
      skills: ["Node.js", "Express", "MongoDB", "Docker", "AWS"],
      benefits: ["Remote 100%", "Flexible Hours", "Stock Options"],
      postedDate: "2025-11-22",
      applicants: 78,
      isVerified: false,
      isUrgent: false,
      isRemote: true,
    },
    {
      id: 4,
      title: "Data Analyst",
      company: "FinanceHub",
      companyLogo: null,
      coverImage:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=300&fit=crop",
      location: "กรุงเทพมหานคร",
      type: "Full-time",
      level: "Mid-level",
      salaryMin: 55000,
      salaryMax: 75000,
      description:
        "วิเคราะห์ข้อมูลทางการเงินและสร้าง Dashboard รายงานสำหรับผู้บริหาร ใช้ SQL, Python และ BI Tools ในการทำงาน",
      skills: ["SQL", "Python", "Power BI", "Excel", "Statistics"],
      benefits: ["ประกันสุขภาพ", "กองทุนสำรองเลี้ยงชีพ", "โบนัส 2-4 เดือน"],
      postedDate: "2025-11-20",
      applicants: 56,
      isVerified: true,
      isUrgent: false,
      isRemote: false,
    },
    {
      id: 5,
      title: "Mobile Developer (Flutter)",
      company: "AppMaster Co.",
      companyLogo: null,
      coverImage:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=300&fit=crop",
      location: "กรุงเทพมหานคร",
      type: "Full-time",
      level: "Senior",
      salaryMin: 70000,
      salaryMax: 100000,
      description:
        "พัฒนาแอปพลิเคชันมือถือ Cross-platform ด้วย Flutter สำหรับ iOS และ Android ทำงานร่วมกับทีม Design และ Backend อย่างใกล้ชิด",
      skills: ["Flutter", "Dart", "Firebase", "REST APIs", "Git"],
      benefits: ["ประกันสุขภาพ", "MacBook Pro", "งบ Conference"],
      postedDate: "2025-11-19",
      applicants: 28,
      isVerified: true,
      isUrgent: true,
      isRemote: true,
    },
    {
      id: 6,
      title: "Digital Marketing Specialist",
      company: "GrowthLab",
      companyLogo: null,
      coverImage:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop",
      location: "กรุงเทพมหานคร",
      type: "Full-time",
      level: "Junior",
      salaryMin: 30000,
      salaryMax: 45000,
      description:
        "วางแผนและดำเนินการแคมเปญการตลาดดิจิทัล รวมถึง SEO, SEM, Social Media และ Content Marketing",
      skills: ["Google Ads", "Facebook Ads", "SEO", "Analytics", "Content"],
      benefits: ["ประกันสุขภาพ", "Commission", "Training"],
      postedDate: "2025-11-18",
      applicants: 89,
      isVerified: false,
      isUrgent: false,
      isRemote: false,
    },
    {
      id: 7,
      title: "DevOps Engineer",
      company: "CloudNative Inc.",
      companyLogo: null,
      coverImage:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=300&fit=crop",
      location: "Remote",
      type: "Contract",
      level: "Senior",
      salaryMin: 90000,
      salaryMax: 130000,
      description:
        "ดูแลระบบ Infrastructure บน Cloud, CI/CD Pipeline และ Monitoring สำหรับแอปพลิเคชันขนาดใหญ่ที่มีผู้ใช้หลายล้านคน",
      skills: ["Kubernetes", "AWS", "Terraform", "Jenkins", "Prometheus"],
      benefits: ["Remote 100%", "Flexible Hours", "Health Insurance"],
      postedDate: "2025-11-17",
      applicants: 19,
      isVerified: true,
      isUrgent: false,
      isRemote: true,
    },
    {
      id: 8,
      title: "Product Manager",
      company: "InnovateTech",
      companyLogo: null,
      coverImage:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=300&fit=crop",
      location: "กรุงเทพมหานคร",
      type: "Full-time",
      level: "Mid-level",
      salaryMin: 60000,
      salaryMax: 90000,
      description:
        "บริหารจัดการ Product Roadmap, ทำงานร่วมกับ Stakeholders และทีมพัฒนา เพื่อส่งมอบ Features ที่ตอบโจทย์ผู้ใช้งาน",
      skills: ["Agile", "Jira", "Data Analysis", "User Stories", "Roadmapping"],
      benefits: ["ประกันสุขภาพ", "WFH", "โบนัสตาม KPI"],
      postedDate: "2025-11-15",
      applicants: 42,
      isVerified: true,
      isUrgent: false,
      isRemote: false,
    },
  ];

  // รายการตัวกรองที่แสดงเป็นปุ่ม
  const filters = ["ทั้งหมด", "Full-time", "Part-time", "Contract", "Remote"];

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
                  // นับตามประเภท
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
