/**
 * StoreAnalytics.jsx - Store Analytics & Reports
 * หน้าสถิติและรายงานสำหรับร้านค้า
 */
import React, { useState } from "react";

// นำเข้าข้อมูล mock data จากไฟล์ JSON
import analyticsData from "./storeAnalyticsData.json";

const StoreAnalytics = () => {
  // State
  const [selectedPeriod, setSelectedPeriod] = useState("30days");

  // ข้อมูลจาก JSON
  const overview = analyticsData.overview;
  const revenueByMonth = analyticsData.revenueByMonth;
  const topProducts = analyticsData.topProducts;
  const salesByCategory = analyticsData.salesByCategory;
  const recentActivity = analyticsData.recentActivity;
  const customerStats = analyticsData.customerStats;
  const periodOptions = analyticsData.periodOptions;

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH").format(price);
  };

  // Format percentage with + or -
  const formatGrowth = (value) => {
    const prefix = value >= 0 ? "+" : "";
    return `${prefix}${value}%`;
  };

  // Get max revenue for chart scaling
  const maxRevenue = Math.max(...revenueByMonth.map((m) => m.revenue));

  // Get activity icon
  const getActivityIcon = (type) => {
    switch (type) {
      case "order":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        );
      case "review":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      case "product":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        );
      case "shipped":
        return (
          <svg
            width="18"
            height="18"
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
        );
      default:
        return null;
    }
  };

  // Category colors
  const categoryColors = [
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#e74c3c",
    "#f39c12",
    "#95a5a6",
  ];

  return (
    <div className="settings-panel">
      {/* Header */}
      <div className="panel-header">
        <div>
          <h2 className="panel-title">สถิติและรายงาน</h2>
          <p className="panel-description">วิเคราะห์ข้อมูลและสถิติการขาย</p>
        </div>
        <div className="analytics-period-select">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            {periodOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="panel-content">
        {/* Overview Stats */}
        <div className="analytics-overview">
          <div className="analytics-stat-card primary">
            <div className="stat-icon">
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
            <div className="stat-content">
              <span className="stat-label">รายได้รวม</span>
              <span className="stat-value">
                ฿{formatPrice(overview.totalRevenue)}
              </span>
              <span
                className={`stat-growth ${
                  overview.revenueGrowth >= 0 ? "positive" : "negative"
                }`}
              >
                {formatGrowth(overview.revenueGrowth)}
              </span>
            </div>
          </div>

          <div className="analytics-stat-card blue">
            <div className="stat-icon">
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
            <div className="stat-content">
              <span className="stat-label">คำสั่งซื้อ</span>
              <span className="stat-value">{overview.totalOrders}</span>
              <span
                className={`stat-growth ${
                  overview.ordersGrowth >= 0 ? "positive" : "negative"
                }`}
              >
                {formatGrowth(overview.ordersGrowth)}
              </span>
            </div>
          </div>

          <div className="analytics-stat-card purple">
            <div className="stat-icon">
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
            <div className="stat-content">
              <span className="stat-label">ลูกค้า</span>
              <span className="stat-value">{overview.totalCustomers}</span>
              <span
                className={`stat-growth ${
                  overview.customersGrowth >= 0 ? "positive" : "negative"
                }`}
              >
                {formatGrowth(overview.customersGrowth)}
              </span>
            </div>
          </div>

          <div className="analytics-stat-card orange">
            <div className="stat-icon">
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
            <div className="stat-content">
              <span className="stat-label">ค่าเฉลี่ยต่อออเดอร์</span>
              <span className="stat-value">
                ฿{formatPrice(overview.averageOrderValue)}
              </span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="analytics-charts-row">
          {/* Revenue Chart */}
          <div className="analytics-chart-card">
            <div className="chart-header">
              <h3>รายได้รายเดือน</h3>
            </div>
            <div className="revenue-chart">
              {revenueByMonth.map((month, idx) => (
                <div key={idx} className="chart-bar-container">
                  <div className="chart-bar-wrapper">
                    <div
                      className="chart-bar"
                      style={{
                        height: `${(month.revenue / maxRevenue) * 100}%`,
                      }}
                    >
                      <span className="bar-tooltip">
                        ฿{formatPrice(month.revenue)}
                      </span>
                    </div>
                  </div>
                  <span className="chart-label">{month.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Pie Chart */}
          <div className="analytics-chart-card">
            <div className="chart-header">
              <h3>ยอดขายตามหมวดหมู่</h3>
            </div>
            <div className="category-chart">
              <div className="pie-chart-container">
                <svg viewBox="0 0 100 100" className="pie-chart">
                  {(() => {
                    let cumulativePercentage = 0;
                    return salesByCategory.map((cat, idx) => {
                      const startAngle = cumulativePercentage * 3.6;
                      cumulativePercentage += cat.percentage;
                      const endAngle = cumulativePercentage * 3.6;

                      const startX =
                        50 + 40 * Math.cos((Math.PI * (startAngle - 90)) / 180);
                      const startY =
                        50 + 40 * Math.sin((Math.PI * (startAngle - 90)) / 180);
                      const endX =
                        50 + 40 * Math.cos((Math.PI * (endAngle - 90)) / 180);
                      const endY =
                        50 + 40 * Math.sin((Math.PI * (endAngle - 90)) / 180);

                      const largeArcFlag = cat.percentage > 50 ? 1 : 0;

                      return (
                        <path
                          key={idx}
                          d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                          fill={categoryColors[idx]}
                        />
                      );
                    });
                  })()}
                  <circle cx="50" cy="50" r="25" fill="#fff" />
                </svg>
              </div>
              <div className="category-legend">
                {salesByCategory.map((cat, idx) => (
                  <div key={idx} className="legend-item">
                    <span
                      className="legend-color"
                      style={{ background: categoryColors[idx] }}
                    />
                    <span className="legend-label">{cat.category}</span>
                    <span className="legend-value">{cat.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="analytics-bottom-row">
          {/* Top Products */}
          <div className="analytics-card">
            <div className="card-header">
              <h3>สินค้าขายดี</h3>
            </div>
            <div className="top-products-list">
              {topProducts.map((product, idx) => (
                <div key={product.id} className="top-product-item">
                  <span className="product-rank">#{idx + 1}</span>
                  <div className="product-info">
                    <span className="product-name">{product.name}</span>
                    <span className="product-category">{product.category}</span>
                  </div>
                  <div className="product-stats">
                    <span className="product-sold">{product.sold} ชิ้น</span>
                    <span className="product-revenue">
                      ฿{formatPrice(product.revenue)}
                    </span>
                  </div>
                  <span
                    className={`product-growth ${
                      product.growth >= 0 ? "positive" : "negative"
                    }`}
                  >
                    {formatGrowth(product.growth)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="analytics-card">
            <div className="card-header">
              <h3>กิจกรรมล่าสุด</h3>
            </div>
            <div className="activity-list">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="activity-content">
                    <span className="activity-message">{activity.message}</span>
                    {activity.amount && (
                      <span className="activity-amount">
                        ฿{formatPrice(activity.amount)}
                      </span>
                    )}
                    {activity.rating && (
                      <span className="activity-rating">
                        {"★".repeat(activity.rating)}
                      </span>
                    )}
                    {activity.stock !== undefined && (
                      <span className="activity-stock">
                        เหลือ {activity.stock} ชิ้น
                      </span>
                    )}
                  </div>
                  <span className="activity-time">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Stats */}
          <div className="analytics-card">
            <div className="card-header">
              <h3>สถิติลูกค้า</h3>
            </div>
            <div className="customer-stats-content">
              <div className="customer-type-stats">
                <div className="customer-type new">
                  <span className="type-value">
                    {customerStats.newCustomers}
                  </span>
                  <span className="type-label">ลูกค้าใหม่</span>
                </div>
                <div className="customer-type returning">
                  <span className="type-value">
                    {customerStats.returningCustomers}
                  </span>
                  <span className="type-label">ลูกค้าเดิม</span>
                </div>
              </div>

              <div className="customer-locations">
                <h4>จังหวัดที่มีลูกค้ามากสุด</h4>
                {customerStats.topLocations.map((loc, idx) => (
                  <div key={idx} className="location-item">
                    <span className="location-name">{loc.province}</span>
                    <div className="location-bar-container">
                      <div
                        className="location-bar"
                        style={{ width: `${loc.percentage}%` }}
                      />
                    </div>
                    <span className="location-percent">{loc.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreAnalytics;
