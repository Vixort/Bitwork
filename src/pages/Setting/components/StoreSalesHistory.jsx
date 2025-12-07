/**
 * StoreSalesHistory.jsx - Sales History Panel
 */
import React, { useState } from "react";

const StoreSalesHistory = () => {
  const [dateFilter, setDateFilter] = useState("30days");

  const salesData = [
    {
      id: "#ORD-2024-156",
      date: "2024-12-06",
      time: "14:30",
      customer: "สมชาย ใจดี",
      products: ["AMD Ryzen 9 7950X", "Corsair RAM 32GB"],
      amount: 23400,
      profit: 3500,
      status: "completed",
      paymentMethod: "credit_card",
    },
    {
      id: "#ORD-2024-155",
      date: "2024-12-06",
      time: "11:20",
      customer: "สมหญิง รักษ์ดี",
      products: ["NVIDIA RTX 4090"],
      amount: 65000,
      profit: 8500,
      status: "completed",
      paymentMethod: "bank_transfer",
    },
    {
      id: "#ORD-2024-154",
      date: "2024-12-05",
      time: "16:45",
      customer: "สมศักดิ์ มั่นคง",
      products: ["Samsung 990 PRO 2TB", "MSI B650 Tomahawk"],
      amount: 16700,
      profit: 2400,
      status: "completed",
      paymentMethod: "promptpay",
    },
    {
      id: "#ORD-2024-153",
      date: "2024-12-05",
      time: "09:15",
      customer: "สมใจ ซื่อสัตย์",
      products: ["Corsair Vengeance 32GB x2"],
      amount: 9000,
      profit: 1200,
      status: "refunded",
      paymentMethod: "credit_card",
    },
    {
      id: "#ORD-2024-152",
      date: "2024-12-04",
      time: "13:50",
      customer: "สมปอง ดีงาม",
      products: [
        "AMD Ryzen 9 7950X",
        "MSI B650 Tomahawk",
        "Samsung 990 PRO 2TB",
      ],
      amount: 35600,
      profit: 5200,
      status: "completed",
      paymentMethod: "bank_transfer",
    },
  ];

  const summary = {
    totalSales: 149700,
    totalProfit: 20800,
    totalOrders: 5,
    avgOrderValue: 29940,
  };

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

        {/* Sales History Table */}
        <div className="sales-table">
          <table>
            <thead>
              <tr>
                <th>รหัสคำสั่งซื้อ</th>
                <th>วันที่-เวลา</th>
                <th>ลูกค้า</th>
                <th>สินค้า</th>
                <th>ยอดรวม</th>
                <th>กำไร</th>
                <th>การชำระเงิน</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale) => (
                <tr key={sale.id}>
                  <td className="order-id">{sale.id}</td>
                  <td>
                    <div className="datetime-cell">
                      <div>
                        {new Date(sale.date).toLocaleDateString("th-TH")}
                      </div>
                      <div className="time-text">{sale.time}</div>
                    </div>
                  </td>
                  <td>{sale.customer}</td>
                  <td>
                    <div className="products-cell">
                      {sale.products.map((product, idx) => (
                        <div key={idx} className="product-item">
                          • {product}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="amount-cell">
                    ฿{sale.amount.toLocaleString()}
                  </td>
                  <td className="profit-cell">
                    ฿{sale.profit.toLocaleString()}
                  </td>
                  <td>
                    <span className="payment-badge">
                      {sale.paymentMethod === "credit_card" && "บัตรเครดิต"}
                      {sale.paymentMethod === "bank_transfer" && "โอนเงิน"}
                      {sale.paymentMethod === "promptpay" && "พร้อมเพย์"}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${sale.status}`}>
                      {sale.status === "completed" && "สำเร็จ"}
                      {sale.status === "refunded" && "คืนเงิน"}
                      {sale.status === "cancelled" && "ยกเลิก"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoreSalesHistory;
