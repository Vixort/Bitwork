/**
 * StoreSalesHistory.jsx - Sales History Panel
 */
import React, { useState } from "react";

// นำเข้าข้อมูล mock data จากไฟล์ JSON
import salesHistoryData from "./storeSalesHistoryData.json";

const StoreSalesHistory = () => {
  const [dateFilter, setDateFilter] = useState("30days");

  // ข้อมูลจาก JSON file
  const salesData = salesHistoryData.salesHistory;
  const summary = salesHistoryData.summary;

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">ประวัติการขาย</h2>
          <p className="panel-description">รายการธุรกรรมและยอดขายทั้งหมด</p>
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
          ส่งออกข้อมูล
        </button>
      </div>

      <div className="panel-content">
        {/* Summary Cards */}
        <div className="sales-summary-grid">
          <div className="summary-card">
            <div className="summary-icon summary-icon-green">
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
            <div className="summary-content">
              <p className="summary-label">ยอดขายรวม</p>
              <h3 className="summary-value">
                ฿{summary.totalSales.toLocaleString()}
              </h3>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon summary-icon-blue">
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
            </div>
            <div className="summary-content">
              <p className="summary-label">กำไรสุทธิ</p>
              <h3 className="summary-value">
                ฿{summary.totalProfit.toLocaleString()}
              </h3>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon summary-icon-orange">
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
            </div>
            <div className="summary-content">
              <p className="summary-label">คำสั่งซื้อ</p>
              <h3 className="summary-value">{summary.totalOrders}</h3>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon summary-icon-purple">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div className="summary-content">
              <p className="summary-label">ค่าเฉลี่ย/ออเดอร์</p>
              <h3 className="summary-value">
                ฿{summary.avgOrderValue.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="sales-toolbar">
          <select
            className="filter-select"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="7days">7 วันล่าสุด</option>
            <option value="30days">30 วันล่าสุด</option>
            <option value="90days">90 วันล่าสุด</option>
            <option value="year">ปีนี้</option>
            <option value="custom">กำหนดเอง</option>
          </select>
        </div>

        {/* Sales History Cards */}
        <div className="sales-cards">
          {salesData.map((sale) => (
            <div key={sale.id} className="sale-card">
              <div className="sale-card-header">
                <span className="order-id">{sale.id}</span>
                <span className={`status-badge status-${sale.status}`}>
                  {sale.status === "completed" && "สำเร็จ"}
                  {sale.status === "refunded" && "คืนเงิน"}
                  {sale.status === "cancelled" && "ยกเลิก"}
                </span>
              </div>

              <div className="sale-card-customer">
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
                {sale.customer}
              </div>

              <div className="sale-card-date">
                <svg
                  width="16"
                  height="16"
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
                {new Date(sale.date).toLocaleDateString("th-TH")} • {sale.time}
              </div>

              <div className="sale-card-products">
                <span className="label">สินค้า:</span>
                <div className="products-list">
                  {sale.products.map((product, idx) => (
                    <span key={idx} className="product-tag-item">
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sale-card-footer">
                <div className="sale-amount">
                  <span className="label">ยอดรวม</span>
                  <span className="value amount-cell">
                    ฿{sale.amount.toLocaleString()}
                  </span>
                </div>
                <div className="sale-profit">
                  <span className="label">กำไร</span>
                  <span className="value profit-cell">
                    ฿{sale.profit.toLocaleString()}
                  </span>
                </div>
                <div className="sale-payment">
                  <span className="payment-badge">
                    {sale.paymentMethod === "credit_card" && "บัตรเครดิต"}
                    {sale.paymentMethod === "bank_transfer" && "โอนเงิน"}
                    {sale.paymentMethod === "promptpay" && "พร้อมเพย์"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreSalesHistory;
