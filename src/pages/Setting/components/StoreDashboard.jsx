/**
 * StoreDashboard.jsx - Store Dashboard Overview
 */
import React from "react";

const StoreDashboard = () => {
  const stats = [
    {
      label: "ยอดขายวันนี้",
      value: "฿12,450",
      change: "+15.3%",
      trend: "up",
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
      label: "คำสั่งซื้อใหม่",
      value: "23",
      change: "+8",
      trend: "up",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
    },
    {
      label: "สินค้าที่ขาย",
      value: "156",
      change: "+12",
      trend: "up",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      label: "อัตราการแปลง",
      value: "3.2%",
      change: "+0.4%",
      trend: "up",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-2024-001",
      customer: "สมชาย ใจดี",
      product: "Ryzen 9 7950X",
      amount: "฿18,900",
      status: "pending",
    },
    {
      id: "#ORD-2024-002",
      customer: "สมหญิง รักษ์ดี",
      product: "RTX 4090",
      amount: "฿65,000",
      status: "completed",
    },
    {
      id: "#ORD-2024-003",
      customer: "สมศักดิ์ มั่นคง",
      product: "RAM 32GB Kit",
      amount: "฿4,500",
      status: "processing",
    },
    {
      id: "#ORD-2024-004",
      customer: "สมใจ ซื่อสัตย์",
      product: "MSI B650 Motherboard",
      amount: "฿8,900",
      status: "completed",
    },
  ];

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <h2 className="panel-title">Dashboard</h2>
        <p className="panel-description">ภาพรวมร้านค้าและยอดขาย</p>
      </div>

      <div className="panel-content">
        {/* Stats Grid */}
        <div className="dashboard-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
                <span className={`stat-change ${stat.trend}`}>
                  {stat.trend === "up" ? "↑" : "↓"} {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="form-section">
          <h3 className="section-title">คำสั่งซื้อล่าสุด</h3>
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>รหัสคำสั่งซื้อ</th>
                  <th>ลูกค้า</th>
                  <th>สินค้า</th>
                  <th>ยอดรวม</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="order-id">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.product}</td>
                    <td className="order-amount">{order.amount}</td>
                    <td>
                      <span className={`status-badge status-${order.status}`}>
                        {order.status === "pending" && "รอดำเนินการ"}
                        {order.status === "processing" && "กำลังจัดส่ง"}
                        {order.status === "completed" && "สำเร็จ"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="form-section">
          <h3 className="section-title">การดำเนินการด่วน</h3>
          <div className="quick-actions-grid">
            <button className="quick-action-btn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              เพิ่มสินค้าใหม่
            </button>
            <button className="quick-action-btn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              จัดการคำสั่งซื้อ
            </button>
            <button className="quick-action-btn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              ดูรายงานการขาย
            </button>
            <button className="quick-action-btn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              ออกใบแจ้งหนี้
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;
