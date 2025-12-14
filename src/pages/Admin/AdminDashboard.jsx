/**
 * AdminDashboard.jsx - Admin Dashboard Page
 * หน้า Dashboard หลักของ Admin
 */
import React from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  // Mock data
  const stats = [
    {
      id: "revenue",
      label: "รายได้วันนี้",
      value: "฿12,450",
      change: "+12.5%",
      changeType: "positive",
      icon: (
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
      ),
    },
    {
      id: "orders",
      label: "คำสั่งซื้อใหม่",
      value: "24",
      change: "+8.2%",
      changeType: "positive",
      icon: (
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
      ),
    },
    {
      id: "products",
      label: "สินค้าทั้งหมด",
      value: "156",
      change: "+3",
      changeType: "neutral",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      ),
    },
    {
      id: "users",
      label: "ลูกค้าใหม่",
      value: "45",
      change: "+22%",
      changeType: "positive",
      icon: (
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
      ),
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-2024-001",
      customer: "สมชาย ใจดี",
      items: 3,
      total: 4500,
      status: "pending",
      date: "14 ธ.ค. 2025",
    },
    {
      id: "#ORD-2024-002",
      customer: "สมหญิง รักเรียน",
      items: 1,
      total: 18900,
      status: "processing",
      date: "14 ธ.ค. 2025",
    },
    {
      id: "#ORD-2024-003",
      customer: "วิชัย เก่งมาก",
      items: 2,
      total: 7800,
      status: "shipped",
      date: "13 ธ.ค. 2025",
    },
    {
      id: "#ORD-2024-004",
      customer: "ปรีชา ฉลาด",
      items: 5,
      total: 12500,
      status: "delivered",
      date: "13 ธ.ค. 2025",
    },
    {
      id: "#ORD-2024-005",
      customer: "มานี มานะ",
      items: 1,
      total: 3200,
      status: "delivered",
      date: "12 ธ.ค. 2025",
    },
  ];

  const topProducts = [
    { name: "AMD Ryzen 9 7950X", sales: 45, revenue: 850500 },
    { name: "NVIDIA RTX 4090", sales: 12, revenue: 780000 },
    { name: "Samsung 990 PRO 2TB", sales: 34, revenue: 265200 },
    { name: "Corsair DDR5 32GB", sales: 78, revenue: 351000 },
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: "รอชำระเงิน", class: "pending" },
      processing: { label: "กำลังจัดเตรียม", class: "processing" },
      shipped: { label: "จัดส่งแล้ว", class: "shipped" },
      delivered: { label: "สำเร็จ", class: "delivered" },
    };
    return statusMap[status] || { label: status, class: "" };
  };

  return (
    <div className="admin-dashboard">
      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>ภาพรวมร้านค้าของคุณ</p>
        </div>
        <div className="header-actions">
          <select className="period-select">
            <option value="today">วันนี้</option>
            <option value="week">สัปดาห์นี้</option>
            <option value="month">เดือนนี้</option>
            <option value="year">ปีนี้</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
              <span className={`stat-change ${stat.changeType}`}>
                {stat.change} จากเมื่อวาน
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="dashboard-content-grid">
        {/* Recent Orders */}
        <div className="dashboard-card orders-card">
          <div className="card-header">
            <h3>คำสั่งซื้อล่าสุด</h3>
            <a href="/admin/orders" className="view-all-link">
              ดูทั้งหมด
            </a>
          </div>
          <div className="orders-list">
            {recentOrders.map((order) => (
              <div key={order.id} className="order-item">
                <div className="order-main">
                  <span className="order-id">{order.id}</span>
                  <span className="order-customer">{order.customer}</span>
                </div>
                <div className="order-meta">
                  <span className="order-items">{order.items} ชิ้น</span>
                  <span className="order-total">
                    ฿{order.total.toLocaleString()}
                  </span>
                  <span
                    className={`status-badge ${
                      getStatusBadge(order.status).class
                    }`}
                  >
                    {getStatusBadge(order.status).label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="dashboard-card products-card">
          <div className="card-header">
            <h3>สินค้าขายดี</h3>
            <a href="/admin/analytics" className="view-all-link">
              ดูรายงาน
            </a>
          </div>
          <div className="top-products-list">
            {topProducts.map((product, index) => (
              <div key={index} className="top-product-item">
                <div className="product-rank">#{index + 1}</div>
                <div className="product-info">
                  <span className="product-name">{product.name}</span>
                  <span className="product-sales">{product.sales} ชิ้น</span>
                </div>
                <div className="product-revenue">
                  ฿{product.revenue.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>ดำเนินการด่วน</h3>
        <div className="actions-grid">
          <a href="/admin/products/new" className="action-card">
            <div className="action-icon add">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <span>เพิ่มสินค้าใหม่</span>
          </a>
          <a href="/admin/orders?status=pending" className="action-card">
            <div className="action-icon orders">
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
            <span>จัดการคำสั่งซื้อ</span>
          </a>
          <a href="/admin/analytics" className="action-card">
            <div className="action-icon analytics">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <span>ดูรายงาน</span>
          </a>
          <a href="/admin/settings" className="action-card">
            <div className="action-icon settings">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
            <span>ตั้งค่าร้านค้า</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
