/**
 * JobHistoryPanel.jsx - Job Post History
 * หน้าแสดงประวัติการโพสหางานทั้งหมด
 */
import React, { useState } from "react";

// Mock data for job posts
const mockJobPosts = [
  {
    id: 1,
    title: "Frontend Developer",
    status: "active",
    postedDate: "2025-12-01",
    deadline: "2025-12-31",
    applicants: 24,
    views: 450,
    jobType: "full-time",
    salary: "30,000 - 50,000",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    status: "active",
    postedDate: "2025-11-28",
    deadline: "2025-12-25",
    applicants: 18,
    views: 320,
    jobType: "full-time",
    salary: "35,000 - 55,000",
  },
  {
    id: 3,
    title: "Backend Developer (Node.js)",
    status: "closed",
    postedDate: "2025-10-15",
    deadline: "2025-11-15",
    applicants: 42,
    views: 680,
    jobType: "full-time",
    salary: "40,000 - 60,000",
  },
  {
    id: 4,
    title: "Marketing Intern",
    status: "draft",
    postedDate: null,
    deadline: "2025-12-20",
    applicants: 0,
    views: 0,
    jobType: "internship",
    salary: "15,000",
  },
  {
    id: 5,
    title: "Project Manager",
    status: "expired",
    postedDate: "2025-09-01",
    deadline: "2025-10-01",
    applicants: 35,
    views: 520,
    jobType: "full-time",
    salary: "50,000 - 80,000",
  },
];

const JobHistoryPanel = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = mockJobPosts.filter((post) => {
    const matchesFilter = filter === "all" || post.status === filter;
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: "กำลังเปิดรับ", class: "status-active" },
      closed: { label: "ปิดรับแล้ว", class: "status-closed" },
      draft: { label: "แบบร่าง", class: "status-draft" },
      expired: { label: "หมดอายุ", class: "status-expired" },
    };
    const config = statusConfig[status] || statusConfig.draft;
    return (
      <span className={`job-status-badge ${config.class}`}>{config.label}</span>
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">ประวัติการโพสหางาน</h2>
          <p className="panel-description">จัดการประกาศงานทั้งหมดของคุณ</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => (window.location.href = "#job-post")}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          สร้างประกาศใหม่
        </button>
      </div>

      <div className="panel-content">
        {/* Filters */}
        <div className="job-history-filters">
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
              placeholder="ค้นหาตำแหน่งงาน..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-tabs">
            {[
              { id: "all", label: "ทั้งหมด" },
              { id: "active", label: "กำลังเปิดรับ" },
              { id: "closed", label: "ปิดรับแล้ว" },
              { id: "draft", label: "แบบร่าง" },
              { id: "expired", label: "หมดอายุ" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`filter-tab ${filter === tab.id ? "active" : ""}`}
                onClick={() => setFilter(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="job-stats-grid">
          <div className="job-stat-card">
            <div className="stat-icon active">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-number">
                {mockJobPosts.filter((p) => p.status === "active").length}
              </span>
              <span className="stat-label">กำลังเปิดรับ</span>
            </div>
          </div>
          <div className="job-stat-card">
            <div className="stat-icon views">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-number">
                {mockJobPosts
                  .reduce((sum, p) => sum + p.views, 0)
                  .toLocaleString()}
              </span>
              <span className="stat-label">การเข้าชมทั้งหมด</span>
            </div>
          </div>
          <div className="job-stat-card">
            <div className="stat-icon applicants">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-number">
                {mockJobPosts.reduce((sum, p) => sum + p.applicants, 0)}
              </span>
              <span className="stat-label">ผู้สมัครทั้งหมด</span>
            </div>
          </div>
          <div className="job-stat-card">
            <div className="stat-icon total">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-number">{mockJobPosts.length}</span>
              <span className="stat-label">ประกาศทั้งหมด</span>
            </div>
          </div>
        </div>

        {/* Job Posts List */}
        <div className="job-posts-list">
          {filteredPosts.length === 0 ? (
            <div className="empty-state">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <p>ไม่พบประกาศงาน</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="job-post-card">
                <div className="job-post-main">
                  <div className="job-post-header">
                    <h3 className="job-post-title">{post.title}</h3>
                    {getStatusBadge(post.status)}
                  </div>
                  <div className="job-post-meta">
                    <span className="meta-item">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {post.postedDate
                        ? `โพส: ${formatDate(post.postedDate)}`
                        : "ยังไม่ได้เผยแพร่"}
                    </span>
                    <span className="meta-item">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      ปิดรับ: {formatDate(post.deadline)}
                    </span>
                    <span className="meta-item">💰 {post.salary} บาท</span>
                  </div>
                </div>

                <div className="job-post-stats">
                  <div className="stat-item">
                    <span className="stat-value">{post.views}</span>
                    <span className="stat-text">เข้าชม</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{post.applicants}</span>
                    <span className="stat-text">ผู้สมัคร</span>
                  </div>
                </div>

                <div className="job-post-actions">
                  <button className="btn-icon" title="ดูผู้สมัคร">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </button>
                  <button className="btn-icon" title="แก้ไข">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button className="btn-icon" title="ลบ">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobHistoryPanel;
