/**
 * StoreOrders.jsx - Manage Store Orders
 * หน้าจัดการคำสั่งซื้อสำหรับร้านค้า
 */
import React, { useState } from "react";
import Modal from "./Modal";

// นำเข้าข้อมูล mock data จากไฟล์ JSON
import ordersData from "./storeOrdersData.json";

const StoreOrders = () => {
  // State Management
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

  // ข้อมูลจาก JSON
  const orders = ordersData.orders;
  const statusOptions = ordersData.statusOptions;

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Get status badge style
  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: "รอดำเนินการ", className: "status-pending" },
      processing: { label: "กำลังจัดเตรียม", className: "status-processing" },
      shipped: { label: "จัดส่งแล้ว", className: "status-shipped" },
      delivered: { label: "ส่งสำเร็จ", className: "status-delivered" },
      cancelled: { label: "ยกเลิก", className: "status-cancelled" },
    };
    return statusMap[status] || { label: status, className: "" };
  };

  // Get payment method label
  const getPaymentMethod = (method) => {
    const methods = {
      bank_transfer: "โอนเงิน",
      credit_card: "บัตรเครดิต",
      promptpay: "พร้อมเพย์",
    };
    return methods[method] || method;
  };

  // Get payment status badge
  const getPaymentStatusBadge = (status) => {
    const statusMap = {
      paid: { label: "ชำระแล้ว", className: "payment-paid" },
      pending: { label: "รอชำระ", className: "payment-pending" },
      refunded: { label: "คืนเงินแล้ว", className: "payment-refunded" },
    };
    return statusMap[status] || { label: status, className: "" };
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH").format(price);
  };

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Open order detail
  const openOrderDetail = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  // Close modals
  const closeModals = () => {
    setIsDetailModalOpen(false);
    setIsUpdateStatusOpen(false);
    setSelectedOrder(null);
    setTrackingNumber("");
  };

  // Open update status modal
  const openUpdateStatus = (order) => {
    setSelectedOrder(order);
    setTrackingNumber(order.trackingNumber || "");
    setIsUpdateStatusOpen(true);
  };

  // Handle update status
  const handleUpdateStatus = (newStatus) => {
    // TODO: Update order status logic
    console.log("Update order:", selectedOrder?.id, "to status:", newStatus);
    console.log("Tracking number:", trackingNumber);
    closeModals();
  };

  // Calculate summary
  const summary = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  return (
    <div className="settings-panel">
      {/* Header */}
      <div className="panel-header">
        <div>
          <h2 className="panel-title">คำสั่งซื้อ</h2>
          <p className="panel-description">จัดการคำสั่งซื้อและการจัดส่ง</p>
        </div>
      </div>

      <div className="panel-content">
        {/* Summary Cards */}
        <div className="orders-summary">
          <div className="summary-card summary-total">
            <div className="summary-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <div className="summary-info">
              <span className="summary-value">{summary.total}</span>
              <span className="summary-label">ทั้งหมด</span>
            </div>
          </div>

          <div className="summary-card summary-pending">
            <div className="summary-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="summary-info">
              <span className="summary-value">{summary.pending}</span>
              <span className="summary-label">รอดำเนินการ</span>
            </div>
          </div>

          <div className="summary-card summary-processing">
            <div className="summary-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </div>
            <div className="summary-info">
              <span className="summary-value">{summary.processing}</span>
              <span className="summary-label">กำลังจัดเตรียม</span>
            </div>
          </div>

          <div className="summary-card summary-shipped">
            <div className="summary-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div className="summary-info">
              <span className="summary-value">{summary.shipped}</span>
              <span className="summary-label">จัดส่งแล้ว</span>
            </div>
          </div>

          <div className="summary-card summary-delivered">
            <div className="summary-icon">
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
            <div className="summary-info">
              <span className="summary-value">{summary.delivered}</span>
              <span className="summary-label">ส่งสำเร็จ</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="orders-filters">
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
              placeholder="ค้นหาเลขคำสั่งซื้อ, ชื่อลูกค้า..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-buttons">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                className={`filter-btn ${
                  filterStatus === option.value ? "active" : ""
                }`}
                onClick={() => setFilterStatus(option.value)}
              >
                {option.label}
                {option.value !== "all" && (
                  <span className="filter-count">
                    {summary[option.value] || 0}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="orders-list">
          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <h3>ไม่พบคำสั่งซื้อ</h3>
              <p>ลองเปลี่ยนตัวกรองหรือค้นหาใหม่</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const statusBadge = getStatusBadge(order.status);
              const paymentBadge = getPaymentStatusBadge(order.paymentStatus);

              return (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-id-section">
                      <span className="order-id">{order.id}</span>
                      <span className={`status-badge ${statusBadge.className}`}>
                        {statusBadge.label}
                      </span>
                    </div>
                    <div className="order-date">
                      {formatDate(order.date)} • {order.time}
                    </div>
                  </div>

                  <div className="order-body">
                    <div className="customer-info">
                      <img
                        src={order.customer.avatar}
                        alt={order.customer.name}
                        className="customer-avatar"
                      />
                      <div className="customer-details">
                        <span className="customer-name">
                          {order.customer.name}
                        </span>
                        <span className="customer-contact">
                          {order.customer.phone}
                        </span>
                      </div>
                    </div>

                    <div className="order-items-preview">
                      <div className="items-names">
                        {order.items.slice(0, 2).map((item, idx) => (
                          <span key={idx} className="item-name-tag">
                            {item.name}
                          </span>
                        ))}
                        {order.items.length > 2 && (
                          <span className="more-items-tag">
                            +{order.items.length - 2} รายการ
                          </span>
                        )}
                      </div>
                      <span className="items-count">
                        {order.items.reduce((sum, i) => sum + i.quantity, 0)}{" "}
                        รายการ
                      </span>
                    </div>

                    <div className="order-payment">
                      <span className="payment-method">
                        {getPaymentMethod(order.paymentMethod)}
                      </span>
                      <span
                        className={`payment-badge ${paymentBadge.className}`}
                      >
                        {paymentBadge.label}
                      </span>
                    </div>

                    <div className="order-total">
                      <span className="total-label">ยอดรวม</span>
                      <span className="total-value">
                        ฿{formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  <div className="order-footer">
                    {order.trackingNumber && (
                      <div className="tracking-info">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="1" y="3" width="15" height="13" />
                          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                          <circle cx="5.5" cy="18.5" r="2.5" />
                          <circle cx="18.5" cy="18.5" r="2.5" />
                        </svg>
                        <span>{order.trackingNumber}</span>
                      </div>
                    )}

                    <div className="order-actions">
                      <button
                        className="btn-secondary btn-sm"
                        onClick={() => openOrderDetail(order)}
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
                        ดูรายละเอียด
                      </button>

                      {(order.status === "pending" ||
                        order.status === "processing") && (
                        <button
                          className="btn-primary btn-sm"
                          onClick={() => openUpdateStatus(order)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          อัพเดทสถานะ
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {isDetailModalOpen && selectedOrder && (
        <Modal
          isOpen={isDetailModalOpen}
          onClose={closeModals}
          title={`รายละเอียดคำสั่งซื้อ ${selectedOrder.id}`}
          size="large"
        >
          <div className="order-detail-modal">
            {/* Status Timeline */}
            <div className="order-status-section">
              <h4>สถานะคำสั่งซื้อ</h4>
              <div className="status-timeline">
                <div
                  className={`timeline-step ${
                    ["pending", "processing", "shipped", "delivered"].includes(
                      selectedOrder.status
                    )
                      ? "completed"
                      : ""
                  }`}
                >
                  <div className="step-icon">
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
                  </div>
                  <span>รับออเดอร์</span>
                </div>
                <div
                  className={`timeline-step ${
                    ["processing", "shipped", "delivered"].includes(
                      selectedOrder.status
                    )
                      ? "completed"
                      : ""
                  }`}
                >
                  <div className="step-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    </svg>
                  </div>
                  <span>จัดเตรียม</span>
                </div>
                <div
                  className={`timeline-step ${
                    ["shipped", "delivered"].includes(selectedOrder.status)
                      ? "completed"
                      : ""
                  }`}
                >
                  <div className="step-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  </div>
                  <span>จัดส่ง</span>
                </div>
                <div
                  className={`timeline-step ${
                    selectedOrder.status === "delivered" ? "completed" : ""
                  }`}
                >
                  <div className="step-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span>สำเร็จ</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="detail-section">
              <h4>ข้อมูลลูกค้า</h4>
              <div className="customer-detail-card">
                <img
                  src={selectedOrder.customer.avatar}
                  alt={selectedOrder.customer.name}
                />
                <div>
                  <strong>{selectedOrder.customer.name}</strong>
                  <p>{selectedOrder.customer.email}</p>
                  <p>{selectedOrder.customer.phone}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="detail-section">
              <h4>ที่อยู่จัดส่ง</h4>
              <div className="address-card">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <p>{selectedOrder.shippingAddress.address}</p>
                  <p>
                    {selectedOrder.shippingAddress.district},{" "}
                    {selectedOrder.shippingAddress.province}{" "}
                    {selectedOrder.shippingAddress.postcode}
                  </p>
                </div>
              </div>
              {selectedOrder.notes && (
                <div className="order-notes">
                  <strong>หมายเหตุ:</strong> {selectedOrder.notes}
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="detail-section">
              <h4>รายการสินค้า</h4>
              <div className="order-items-list">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="order-item-row">
                    <img src={item.image} alt={item.name} />
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-qty">x{item.quantity}</span>
                    </div>
                    <span className="item-price">
                      ฿{formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="detail-section">
              <h4>สรุปยอด</h4>
              <div className="order-summary-detail">
                <div className="summary-row">
                  <span>ราคาสินค้า</span>
                  <span>฿{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>ค่าจัดส่ง</span>
                  <span>
                    {selectedOrder.shipping === 0
                      ? "ฟรี"
                      : `฿${formatPrice(selectedOrder.shipping)}`}
                  </span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="summary-row discount">
                    <span>ส่วนลด</span>
                    <span>-฿{formatPrice(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>ยอดรวมทั้งสิ้น</span>
                  <span>฿{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Tracking Info */}
            {selectedOrder.trackingNumber && (
              <div className="detail-section">
                <h4>ข้อมูลการจัดส่ง</h4>
                <div className="tracking-detail">
                  <span className="tracking-label">เลขพัสดุ:</span>
                  <span className="tracking-number">
                    {selectedOrder.trackingNumber}
                  </span>
                  <button className="btn-copy">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Update Status Modal */}
      {isUpdateStatusOpen && selectedOrder && (
        <Modal
          isOpen={isUpdateStatusOpen}
          onClose={closeModals}
          title="อัพเดทสถานะคำสั่งซื้อ"
          size="small"
        >
          <div className="update-status-modal">
            <p className="modal-order-id">
              คำสั่งซื้อ: <strong>{selectedOrder.id}</strong>
            </p>

            <div className="status-options">
              {selectedOrder.status === "pending" && (
                <>
                  <button
                    className="status-option-btn processing"
                    onClick={() => handleUpdateStatus("processing")}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    </svg>
                    เริ่มจัดเตรียมสินค้า
                  </button>
                  <button
                    className="status-option-btn cancelled"
                    onClick={() => handleUpdateStatus("cancelled")}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    ยกเลิกคำสั่งซื้อ
                  </button>
                </>
              )}

              {selectedOrder.status === "processing" && (
                <>
                  <div className="tracking-input-group">
                    <label>เลขพัสดุ (Tracking Number)</label>
                    <input
                      type="text"
                      placeholder="กรอกเลขพัสดุ..."
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                    />
                  </div>
                  <button
                    className="status-option-btn shipped"
                    onClick={() => handleUpdateStatus("shipped")}
                    disabled={!trackingNumber.trim()}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    จัดส่งสินค้าแล้ว
                  </button>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StoreOrders;
