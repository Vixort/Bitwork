/**
 * JobApplicantsPanel.jsx - Job Applicants Management
 * หน้าจัดการผู้สมัครงาน
 */
import React, { useState } from "react";

// Mock data for applicants
const mockApplicants = [
  {
    id: 1,
    name: "สมชาย ใจดี",
    email: "somchai@email.com",
    phone: "081-234-5678",
    position: "Frontend Developer",
    appliedDate: "2025-12-05",
    status: "pending",
    avatar: null,
    experience: "3 ปี",
    expectedSalary: "45,000",
    skills: ["React", "JavaScript", "CSS"],
  },
  {
    id: 2,
    name: "สมหญิง รักเรียน",
    email: "somying@email.com",
    phone: "082-345-6789",
    position: "Frontend Developer",
    appliedDate: "2025-12-04",
    status: "reviewing",
    avatar: null,
    experience: "5 ปี",
    expectedSalary: "55,000",
    skills: ["Vue.js", "TypeScript", "Tailwind"],
  },
  {
    id: 3,
    name: "วิชัย เก่งมาก",
    email: "wichai@email.com",
    phone: "083-456-7890",
    position: "UX/UI Designer",
    appliedDate: "2025-12-03",
    status: "interviewed",
    avatar: null,
    experience: "4 ปี",
    expectedSalary: "50,000",
    skills: ["Figma", "Adobe XD", "UI Design"],
  },
  {
    id: 4,
    name: "ปรีชา ฉลาดดี",
    email: "preecha@email.com",
    phone: "084-567-8901",
    position: "Frontend Developer",
    appliedDate: "2025-12-02",
    status: "accepted",
    avatar: null,
    experience: "6 ปี",
    expectedSalary: "60,000",
    skills: ["React", "Next.js", "Node.js"],
  },
  {
    id: 5,
    name: "มานี มีทรัพย์",
    email: "manee@email.com",
    phone: "085-678-9012",
    position: "UX/UI Designer",
    appliedDate: "2025-12-01",
    status: "rejected",
    avatar: null,
    experience: "2 ปี",
    expectedSalary: "35,000",
    skills: ["Photoshop", "Illustrator"],
  },
];

const JobApplicantsPanel = () => {
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const positions = [...new Set(mockApplicants.map((a) => a.position))];

  const filteredApplicants = mockApplicants.filter((applicant) => {
    const matchesPosition =
      selectedPosition === "all" || applicant.position === selectedPosition;
    const matchesStatus =
      selectedStatus === "all" || applicant.status === selectedStatus;
    const matchesSearch = applicant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesPosition && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: "รอตรวจสอบ", class: "status-pending" },
      reviewing: { label: "กำลังพิจารณา", class: "status-reviewing" },
      interviewed: { label: "สัมภาษณ์แล้ว", class: "status-interviewed" },
      accepted: { label: "ผ่านการคัดเลือก", class: "status-accepted" },
      rejected: { label: "ไม่ผ่าน", class: "status-rejected" },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`applicant-status-badge ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .substring(0, 2);
  };

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">ผู้สมัครงาน</h2>
          <p className="panel-description">จัดการและติดตามผู้สมัครงานทั้งหมด</p>
        </div>
      </div>

      <div className="panel-content">
        {/* Filters */}
        <div className="applicants-filters">
          <div className="search-box">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="ค้นหาชื่อผู้สมัคร..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-dropdowns">
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="filter-select"
            >
              <option value="all">ทุกตำแหน่ง</option>
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">ทุกสถานะ</option>
              <option value="pending">รอตรวจสอบ</option>
              <option value="reviewing">กำลังพิจารณา</option>
              <option value="interviewed">สัมภาษณ์แล้ว</option>
              <option value="accepted">ผ่านการคัดเลือก</option>
              <option value="rejected">ไม่ผ่าน</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="applicant-stats-row">
          <div className="applicant-stat">
            <span className="stat-count">{mockApplicants.length}</span>
            <span className="stat-label">ทั้งหมด</span>
          </div>
          <div className="applicant-stat pending">
            <span className="stat-count">
              {mockApplicants.filter((a) => a.status === "pending").length}
            </span>
            <span className="stat-label">รอตรวจสอบ</span>
          </div>
          <div className="applicant-stat reviewing">
            <span className="stat-count">
              {mockApplicants.filter((a) => a.status === "reviewing").length}
            </span>
            <span className="stat-label">กำลังพิจารณา</span>
          </div>
          <div className="applicant-stat accepted">
            <span className="stat-count">
              {mockApplicants.filter((a) => a.status === "accepted").length}
            </span>
            <span className="stat-label">ผ่านคัดเลือก</span>
          </div>
        </div>

        {/* Applicants Table */}
        <div className="applicants-table-container">
          {filteredApplicants.length === 0 ? (
            <div className="empty-state">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <p>ไม่พบผู้สมัครงาน</p>
            </div>
          ) : (
            <table className="applicants-table">
              <thead>
                <tr>
                  <th>ผู้สมัคร</th>
                  <th>ตำแหน่ง</th>
                  <th>ประสบการณ์</th>
                  <th>เงินเดือน</th>
                  <th>สถานะ</th>
                  <th>วันที่สมัคร</th>
                  <th>การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.map((applicant) => (
                  <tr key={applicant.id}>
                    <td>
                      <div className="applicant-info">
                        <div className="applicant-avatar">
                          {getInitials(applicant.name)}
                        </div>
                        <div className="applicant-details">
                          <span className="applicant-name">
                            {applicant.name}
                          </span>
                          <span className="applicant-email">
                            {applicant.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{applicant.position}</td>
                    <td>{applicant.experience}</td>
                    <td>{applicant.expectedSalary} บาท</td>
                    <td>{getStatusBadge(applicant.status)}</td>
                    <td>{formatDate(applicant.appliedDate)}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon view"
                          title="ดูรายละเอียด"
                          onClick={() => setSelectedApplicant(applicant)}
                        >
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
                        </button>
                        <button
                          className="btn-icon accept"
                          title="รับเข้าทำงาน"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </button>
                        <button className="btn-icon reject" title="ปฏิเสธ">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Applicant Detail Modal */}
        {selectedApplicant && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedApplicant(null)}
          >
            <div
              className="applicant-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>รายละเอียดผู้สมัคร</h3>
                <button
                  className="close-btn"
                  onClick={() => setSelectedApplicant(null)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="modal-body">
                <div className="applicant-profile-header">
                  <div className="applicant-avatar large">
                    {getInitials(selectedApplicant.name)}
                  </div>
                  <div>
                    <h4>{selectedApplicant.name}</h4>
                    <p>{selectedApplicant.position}</p>
                    {getStatusBadge(selectedApplicant.status)}
                  </div>
                </div>

                <div className="applicant-details-grid">
                  <div className="detail-item">
                    <label>อีเมล</label>
                    <span>{selectedApplicant.email}</span>
                  </div>
                  <div className="detail-item">
                    <label>เบอร์โทร</label>
                    <span>{selectedApplicant.phone}</span>
                  </div>
                  <div className="detail-item">
                    <label>ประสบการณ์</label>
                    <span>{selectedApplicant.experience}</span>
                  </div>
                  <div className="detail-item">
                    <label>เงินเดือนที่คาดหวัง</label>
                    <span>{selectedApplicant.expectedSalary} บาท</span>
                  </div>
                  <div className="detail-item">
                    <label>วันที่สมัคร</label>
                    <span>{formatDate(selectedApplicant.appliedDate)}</span>
                  </div>
                </div>

                <div className="applicant-skills">
                  <label>ทักษะ</label>
                  <div className="skills-list">
                    {selectedApplicant.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="btn-secondary">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    ดาวน์โหลดเรซูเม่
                  </button>
                  <button className="btn-primary accept-btn">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    รับเข้าทำงาน
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicantsPanel;
