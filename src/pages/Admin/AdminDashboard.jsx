/**
 * AdminDashboard.jsx - Admin Dashboard Page
 * หน้า Dashboard หลักของ Admin
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [dbStats, setDbStats] = useState({
    jobs: 0,
    products: 0,
    users: 0
  });

  useEffect(() => {
    // Redirect if not admin
    if (!loading) {
      const role = user?.user_metadata?.role;
      if (!user || role !== 'admin') {
        navigate('/admin/login'); // Redirect to Admin Login
        return;
      }
    }

    // Fetch real stats
    async function fetchStats() {
      try {
        const [jobsRes, productsRes] = await Promise.all([
          fetch('/api/jobs').then(async r => r.ok ? r.json() : []),
          fetch('/api/products').then(async r => r.ok ? r.json() : [])
        ]);

        setDbStats({
          jobs: Array.isArray(jobsRes) ? jobsRes.length : 0,
          products: Array.isArray(productsRes) ? productsRes.length : 0,
          users: 0
        });
      } catch (e) {
        console.error("Failed to fetch dashboard stats", e);
      }
    }

    if (!loading && user?.user_metadata?.role === 'admin') {
      fetchStats();
    }

  }, [user, loading, navigate]);

  if (loading) return <div>Loading...</div>;

  // Mock data combined with real data
  const stats = [
    {
      id: "revenue",
      label: "รายได้วันนี้",
      value: "฿0", // Placeholder until Order API implemented
      change: "0%",
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
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      id: "orders",
      label: "คำสั่งซื้อใหม่",
      value: "0",
      change: "0%",
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
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
    {
      id: "products",
      label: "สินค้าทั้งหมด",
      value: dbStats.products.toString(),
      change: "+0",
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
      id: "jobs", // Changed from users to jobs for relevance
      label: "งานทั้งหมด",
      value: dbStats.jobs.toString(),
      change: "+0",
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
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
  ];

  const recentOrders = []; // Empty for now

  const topProducts = []; // Empty for now

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
                    className={`status-badge ${getStatusBadge(order.status).class
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
          <a href="/admin/products?action=new" className="action-card">
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
          <a href="/admin/dashboard" className="action-card">
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
