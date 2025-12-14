/**
 * AdminOrders.jsx - Order Management (Card Layout)
 */
import React, { useState } from "react";
import "./AdminOrders.css";

const initialOrders = [
  {
    id: "ORD-2024001",
    customer: "สมหญิง รักเรียน",
    email: "somying@email.com",
    items: 3,
    total: 2850,
    status: "pending",
    date: "2024-01-15 14:30",
    payment: "โอนเงิน",
  },
  {
    id: "ORD-2024002",
    customer: "วิชัย เก่งมาก",
    email: "wichai@email.com",
    items: 1,
    total: 1200,
    status: "processing",
    date: "2024-01-15 12:15",
    payment: "บัตรเครดิต",
  },
  {
    id: "ORD-2024003",
    customer: "ปรีชา ชาลาดี",
    email: "preecha@email.com",
    items: 5,
    total: 4500,
    status: "shipped",
    date: "2024-01-14 18:45",
    payment: "เก็บเงินปลายทาง",
  },
  {
    id: "ORD-2024004",
    customer: "มานี ใจดี",
    email: "manee@email.com",
    items: 2,
    total: 890,
    status: "delivered",
    date: "2024-01-14 09:20",
    payment: "โอนเงิน",
  },
  {
    id: "ORD-2024005",
    customer: "สมศักดิ์ ยิ้มเสมอ",
    email: "somsak@email.com",
    items: 1,
    total: 350,
    status: "cancelled",
    date: "2024-01-13 16:00",
    payment: "โอนเงิน",
  },
  {
    id: "ORD-2024006",
    customer: "นิดา สวยงาม",
    email: "nida@email.com",
    items: 4,
    total: 3200,
    status: "delivered",
    date: "2024-01-13 11:30",
    payment: "บัตรเครดิต",
  },
];

const statusConfig = {
  pending: { label: "รอยืนยัน", color: "#f59e0b", bg: "#fef3c7" },
  processing: { label: "กำลังจัดส่ง", color: "#3b82f6", bg: "#dbeafe" },
  shipped: { label: "ส่งแล้ว", color: "#8b5cf6", bg: "#ede9fe" },
  delivered: { label: "สำเร็จ", color: "#10b981", bg: "#d1fae5" },
  cancelled: { label: "ยกเลิก", color: "#ef4444", bg: "#fee2e2" },
};

function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "all" || order.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  return (
    <div className="admin-orders-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-title">
          <h1>คำสั่งซื้อ</h1>
          <p>จัดการคำสั่งซื้อและติดตามการจัดส่ง</p>
        </div>
        <button className="btn-secondary">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          ส่งออก
        </button>
      </div>

      {/* Status Tabs */}
      <div className="status-tabs">
        {[
          { key: "all", label: "ทั้งหมด" },
          { key: "pending", label: "รอยืนยัน" },
          { key: "processing", label: "กำลังจัดส่ง" },
          { key: "shipped", label: "ส่งแล้ว" },
          { key: "delivered", label: "สำเร็จ" },
          { key: "cancelled", label: "ยกเลิก" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`status-tab ${filterStatus === tab.key ? "active" : ""}`}
            onClick={() => setFilterStatus(tab.key)}
          >
            {tab.label}
            <span className="count">{statusCounts[tab.key]}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="search-bar">
        <div className="search-input">
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
            placeholder="ค้นหาคำสั่งซื้อ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="order-card"
            onClick={() => setSelectedOrder(order)}
          >
            <div className="order-main">
              <div className="order-header">
                <span className="order-id">{order.id}</span>
                <span
                  className="status-badge"
                  style={{
                    background: statusConfig[order.status].bg,
                    color: statusConfig[order.status].color,
                  }}
                >
                  {statusConfig[order.status].label}
                </span>
              </div>
              <div className="order-customer">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>{order.customer}</span>
              </div>
              <div className="order-meta">
                <span className="meta-item">
                  <svg
                    width="14"
                    height="14"
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
                  {order.date}
                </span>
                <span className="meta-item">{order.items} รายการ</span>
                <span className="meta-item payment">{order.payment}</span>
              </div>
            </div>
            <div className="order-total">
              <span className="label">ยอดรวม</span>
              <span className="value">฿{order.total.toLocaleString()}</span>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="empty-state">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <p>ไม่พบคำสั่งซื้อ</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>รายละเอียดคำสั่งซื้อ</h3>
              <button
                className="btn-close"
                onClick={() => setSelectedOrder(null)}
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
              <div className="detail-section">
                <div className="detail-row">
                  <span className="label">หมายเลขคำสั่งซื้อ</span>
                  <span className="value">{selectedOrder.id}</span>
                </div>
                <div className="detail-row">
                  <span className="label">ลูกค้า</span>
                  <span className="value">{selectedOrder.customer}</span>
                </div>
                <div className="detail-row">
                  <span className="label">อีเมล</span>
                  <span className="value">{selectedOrder.email}</span>
                </div>
                <div className="detail-row">
                  <span className="label">วันที่สั่งซื้อ</span>
                  <span className="value">{selectedOrder.date}</span>
                </div>
                <div className="detail-row">
                  <span className="label">ช่องทางชำระเงิน</span>
                  <span className="value">{selectedOrder.payment}</span>
                </div>
                <div className="detail-row">
                  <span className="label">จำนวนสินค้า</span>
                  <span className="value">{selectedOrder.items} รายการ</span>
                </div>
                <div className="detail-row total">
                  <span className="label">ยอดรวม</span>
                  <span className="value">
                    ฿{selectedOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="status-section">
                <span className="label">สถานะ</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    handleStatusChange(selectedOrder.id, e.target.value)
                  }
                >
                  <option value="pending">รอยืนยัน</option>
                  <option value="processing">กำลังจัดส่ง</option>
                  <option value="shipped">ส่งแล้ว</option>
                  <option value="delivered">สำเร็จ</option>
                  <option value="cancelled">ยกเลิก</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setSelectedOrder(null)}
              >
                ปิด
              </button>
              <button className="btn-primary">พิมพ์ใบเสร็จ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
