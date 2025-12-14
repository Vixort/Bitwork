import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import "./OrdersMain.css";

const OrdersMain = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    // Placeholder: replace with real API call
    const mock = [
      {
        id: "ORD-1001",
        date: "2025-12-10",
        total: 1290,
        status: "จัดส่งแล้ว",
        items: [
          { name: "เครื่องชาร์จเร็ว", qty: 1, price: 490 },
          { name: "สายชาร์จ Type-C", qty: 2, price: 400 },
        ],
        trackingNumber: "TH1234567890",
      },
      {
        id: "ORD-1002",
        date: "2025-12-12",
        total: 450,
        status: "รอชำระเงิน",
        items: [{ name: "เคสโทรศัพท์", qty: 1, price: 450 }],
        trackingNumber: null,
      },
      {
        id: "ORD-1003",
        date: "2025-12-14",
        total: 1990,
        status: "กำลังแพ็ค",
        items: [
          { name: "หูฟังไร้สาย", qty: 1, price: 1290 },
          { name: "ฟิล์มกันรอย", qty: 3, price: 700 },
        ],
        trackingNumber: null,
      },
    ];

    setOrders(mock);
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (search) {
        const s = search.toLowerCase();
        if (
          !o.id.toLowerCase().includes(s) &&
          !o.items.some((it) => it.name.toLowerCase().includes(s))
        ) {
          return false;
        }
      }

      if (statusFilter !== "all" && o.status !== statusFilter) return false;

      if (fromDate && new Date(o.date) < new Date(fromDate)) return false;
      if (toDate && new Date(o.date) > new Date(toDate)) return false;

      return true;
    });
  }, [orders, search, statusFilter, fromDate, toDate]);

  return (
    <div className="orders-page">
      <div className="orders-header">
        <div>
          <h2>คำสั่งซื้อของฉัน</h2>
          <p className="orders-sub">
            ดูสถานะและรายละเอียดคำสั่งซื้อทั้งหมดของคุณ
          </p>
        </div>
        <div className="orders-summary">
          <div className="summary-item">
            <div className="summary-value">{orders.length}</div>
            <div className="summary-label">รวมคำสั่งซื้อ</div>
          </div>
          <div className="summary-item">
            <div className="summary-value">
              ฿{orders.reduce((s, o) => s + o.total, 0)}
            </div>
            <div className="summary-label">ยอดรวมทั้งหมด</div>
          </div>
        </div>
      </div>

      <div className="orders-controls">
        <div className="status-chips">
          {[
            { key: "all", label: "ทั้งหมด" },
            { key: "จัดส่งแล้ว", label: "จัดส่งแล้ว" },
            { key: "กำลังแพ็ค", label: "กำลังแพ็ค" },
            { key: "รอชำระเงิน", label: "รอชำระเงิน" },
          ].map((c) => (
            <button
              key={c.key}
              className={`chip ${statusFilter === c.key ? "active" : ""}`}
              onClick={() => setStatusFilter(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="orders-filters">
          <input
            className="filter-search"
            placeholder="ค้นหาเลขคำสั่งซื้อ เช่น ORD-1001 หรือ ชื่อสินค้า"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">สถานะ: ทั้งหมด</option>
            <option value="จัดส่งแล้ว">จัดส่งแล้ว</option>
            <option value="รอชำระเงิน">รอชำระเงิน</option>
            <option value="กำลังแพ็ค">กำลังแพ็ค</option>
          </select>

          <div className="filter-dates">
            <input
              type="date"
              className="filter-date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <span className="filter-date-sep">—</span>
            <input
              type="date"
              className="filter-date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <div className="orders-empty">
            <div className="empty-illustration" />
            <div className="empty-text">ไม่พบคำสั่งซื้อที่ตรงกับเงื่อนไข</div>
            <Link to="/market" className="order-view primary">
              ไปเลือกซื้อสินค้า
            </Link>
          </div>
        ) : (
          filteredOrders.map((o) => (
            <div className="order-card" key={o.id}>
              <div className="order-left">
                <div className="order-id">{o.id}</div>
                <div className="order-date">{o.date}</div>
                <div className="order-preview">
                  {o.items.slice(0, 2).map((it, i) => (
                    <span key={i} className="preview-item">
                      {it.name} x{it.qty}
                    </span>
                  ))}
                  {o.items.length > 2 && (
                    <span className="preview-more">
                      และ {o.items.length - 2} รายการเพิ่มเติม
                    </span>
                  )}
                </div>
              </div>
              <div className="order-middle">
                <div className="order-items">{o.items.length} รายการ</div>
                <div className="order-total">฿{o.total}</div>
              </div>
              <div className="order-right">
                <div
                  className={`order-status status-${o.status.replace(
                    /\s+/g,
                    "-"
                  )}`}
                >
                  {o.status}
                </div>
                <Link to={`/orders/${o.id}`} className="order-view">
                  ดูรายละเอียด
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersMain;
