/**
 * AdminUsers.jsx - User Management
 * จัดการผู้ใช้ - ธีมขาวเขียว Minimal
 */
import React, { useState } from "react";
import "./AdminUsers.css";

const initialUsers = [
  {
    id: 1,
    name: "สมหญิง รักเรียน",
    email: "somying@email.com",
    phone: "081-234-5678",
    orders: 12,
    spent: 28500,
    status: "active",
    joinDate: "2024-01-01",
    avatar: "",
  },
  {
    id: 2,
    name: "วิชัย เก่งมาก",
    email: "wichai@email.com",
    phone: "082-345-6789",
    orders: 8,
    spent: 15200,
    status: "active",
    joinDate: "2024-01-05",
    avatar: "",
  },
  {
    id: 3,
    name: "ปรีชา ชาลาดี",
    email: "preecha@email.com",
    phone: "083-456-7890",
    orders: 25,
    spent: 67800,
    status: "active",
    joinDate: "2023-11-15",
    avatar: "",
  },
  {
    id: 4,
    name: "มานี ใจดี",
    email: "manee@email.com",
    phone: "084-567-8901",
    orders: 3,
    spent: 4500,
    status: "inactive",
    joinDate: "2024-02-10",
    avatar: "",
  },
  {
    id: 5,
    name: "สมศักดิ์ ยิ้มเสมอ",
    email: "somsak@email.com",
    phone: "085-678-9012",
    orders: 0,
    spent: 0,
    status: "blocked",
    joinDate: "2024-02-15",
    avatar: "",
  },
  {
    id: 6,
    name: "นิดา สวยงาม",
    email: "nida@email.com",
    phone: "086-789-0123",
    orders: 18,
    spent: 42300,
    status: "active",
    joinDate: "2023-12-01",
    avatar: "",
  },
];

const statusConfig = {
  active: { label: "ใช้งาน", color: "#10b981", bg: "#ecfdf5" },
  inactive: { label: "ไม่ใช้งาน", color: "#f59e0b", bg: "#fffbeb" },
  blocked: { label: "ถูกบล็อก", color: "#ef4444", bg: "#fef2f2" },
};

function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "all" || user.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (userId, newStatus) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({ ...selectedUser, status: newStatus });
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .substring(0, 2);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Stats
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const totalSpent = users.reduce((sum, u) => sum + u.spent, 0);
  const totalOrders = users.reduce((sum, u) => sum + u.orders, 0);

  return (
    <div className="users-page">
      {/* Header */}
      <div className="users-header">
        <div className="header-left">
          <h1>จัดการผู้ใช้</h1>
          <p>จัดการลูกค้าและดูประวัติการสั่งซื้อ</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="users-stats">
        <div className="stat-card">
          <div className="stat-icon users-icon">
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
            <span className="stat-value">{totalUsers}</span>
            <span className="stat-label">ผู้ใช้ทั้งหมด</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active-icon">
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
            <span className="stat-value">{activeUsers}</span>
            <span className="stat-label">ใช้งานอยู่</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalOrders}</span>
            <span className="stat-label">คำสั่งซื้อทั้งหมด</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">฿{totalSpent.toLocaleString()}</span>
            <span className="stat-label">ยอดขายรวม</span>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="users-toolbar">
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
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="ค้นหาผู้ใช้..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="toolbar-right">
          <div className="filter-group">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">ทุกสถานะ</option>
              <option value="active">ใช้งาน</option>
              <option value="inactive">ไม่ใช้งาน</option>
              <option value="blocked">ถูกบล็อก</option>
            </select>
          </div>

          <div className="view-toggle">
            <button
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => setViewMode("grid")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              className={viewMode === "list" ? "active" : ""}
              onClick={() => setViewMode("list")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Users Display */}
      {viewMode === "grid" ? (
        <div className="users-grid">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="user-card"
              onClick={() => setSelectedUser(user)}
            >
              <div className="card-header">
                <div className="user-avatar">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <span>{getInitials(user.name)}</span>
                  )}
                </div>
                <span
                  className="status-dot"
                  style={{ background: statusConfig[user.status].color }}
                  title={statusConfig[user.status].label}
                />
              </div>

              <div className="card-body">
                <h3>{user.name}</h3>
                <p className="email">{user.email}</p>
                <span
                  className="status-badge"
                  style={{
                    background: statusConfig[user.status].bg,
                    color: statusConfig[user.status].color,
                  }}
                >
                  {statusConfig[user.status].label}
                </span>
              </div>

              <div className="card-footer">
                <div className="mini-stat">
                  <span className="value">{user.orders}</span>
                  <span className="label">คำสั่งซื้อ</span>
                </div>
                <div className="mini-stat">
                  <span className="value">฿{user.spent.toLocaleString()}</span>
                  <span className="label">ยอดซื้อ</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="users-list">
          <div className="list-header">
            <span className="col-user">ผู้ใช้</span>
            <span className="col-status">สถานะ</span>
            <span className="col-orders">คำสั่งซื้อ</span>
            <span className="col-spent">ยอดซื้อ</span>
            <span className="col-date">วันที่สมัคร</span>
            <span className="col-action"></span>
          </div>
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="list-row"
              onClick={() => setSelectedUser(user)}
            >
              <div className="col-user">
                <div className="user-avatar small">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <span>{getInitials(user.name)}</span>
                  )}
                </div>
                <div className="user-text">
                  <span className="name">{user.name}</span>
                  <span className="email">{user.email}</span>
                </div>
              </div>
              <div className="col-status">
                <span
                  className="status-badge"
                  style={{
                    background: statusConfig[user.status].bg,
                    color: statusConfig[user.status].color,
                  }}
                >
                  {statusConfig[user.status].label}
                </span>
              </div>
              <div className="col-orders">{user.orders}</div>
              <div className="col-spent">฿{user.spent.toLocaleString()}</div>
              <div className="col-date">{formatDate(user.joinDate)}</div>
              <div className="col-action">
                <button className="btn-view">
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
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredUsers.length === 0 && (
        <div className="empty-state">
          <svg
            width="64"
            height="64"
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
          <h3>ไม่พบผู้ใช้</h3>
          <p>ลองเปลี่ยนคำค้นหาหรือตัวกรอง</p>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="user-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedUser(null)}
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

            <div className="modal-profile">
              <div className="profile-avatar">
                {selectedUser.avatar ? (
                  <img src={selectedUser.avatar} alt={selectedUser.name} />
                ) : (
                  <span>{getInitials(selectedUser.name)}</span>
                )}
              </div>
              <h2>{selectedUser.name}</h2>
              <p>{selectedUser.email}</p>
              <span
                className="status-badge large"
                style={{
                  background: statusConfig[selectedUser.status].bg,
                  color: statusConfig[selectedUser.status].color,
                }}
              >
                {statusConfig[selectedUser.status].label}
              </span>
            </div>

            <div className="modal-stats">
              <div className="modal-stat">
                <span className="value">{selectedUser.orders}</span>
                <span className="label">คำสั่งซื้อ</span>
              </div>
              <div className="modal-stat">
                <span className="value">
                  ฿{selectedUser.spent.toLocaleString()}
                </span>
                <span className="label">ยอดซื้อทั้งหมด</span>
              </div>
            </div>

            <div className="modal-details">
              <div className="detail-item">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <div>
                  <span className="label">เบอร์โทรศัพท์</span>
                  <span className="value">{selectedUser.phone}</span>
                </div>
              </div>
              <div className="detail-item">
                <svg
                  width="18"
                  height="18"
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
                  <span className="label">วันที่สมัคร</span>
                  <span className="value">
                    {formatDate(selectedUser.joinDate)}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-status-section">
              <label>เปลี่ยนสถานะ</label>
              <select
                value={selectedUser.status}
                onChange={(e) =>
                  handleStatusChange(selectedUser.id, e.target.value)
                }
              >
                <option value="active">ใช้งาน</option>
                <option value="inactive">ไม่ใช้งาน</option>
                <option value="blocked">ถูกบล็อก</option>
              </select>
            </div>

            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setSelectedUser(null)}
              >
                ปิด
              </button>
              <button className="btn-primary">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                ดูประวัติคำสั่งซื้อ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
