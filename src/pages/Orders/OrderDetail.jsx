import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import "./OrdersMain.css";
import "./OrderDetail.css";

const findMockOrders = () => [
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

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = findMockOrders();
    const found = orders.find((o) => o.id === orderId);
    setOrder(found || null);
  }, [orderId]);

  const copyTracking = () => {
    if (!order?.trackingNumber) return;
    navigator.clipboard && navigator.clipboard.writeText(order.trackingNumber);
    alert("คัดลอกหมายเลขขนส่ง: " + order.trackingNumber);
  };

  if (!order) {
    return (
      <div className="orders-page">
        <div className="orders-header">
          <h2>ไม่พบคำสั่งซื้อ</h2>
          <p className="orders-sub">คำสั่งซื้อที่ระบุไม่มีอยู่ในระบบ</p>
        </div>
        <Link to="/orders" className="order-view">
          ย้อนกลับไปยังคำสั่งซื้อของฉัน
        </Link>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2>รายละเอียดคำสั่งซื้อ {order.id}</h2>
        <p className="orders-sub">ดูข้อมูลสถานะ รายการสินค้า และหมายเลขขนส่ง</p>
      </div>

      <div className="order-detail-card">
        <div className="order-detail-top">
          <div>
            <div className="order-id">{order.id}</div>
            <div className="order-date">{order.date}</div>
          </div>
          <div className="order-right">
            <div
              className={`order-status status-${order.status.replace(
                /\s+/g,
                "-"
              )}`}
            >
              {order.status}
            </div>
          </div>
        </div>

        <div className="order-tracking">
          <strong>หมายเลขขนส่ง: </strong>
          {order.trackingNumber ? (
            <>
              <span className="tracking-number">{order.trackingNumber}</span>
              <button className="copy-btn" onClick={copyTracking}>
                คัดลอก
              </button>
            </>
          ) : (
            <span className="no-tracking">ยังไม่มีหมายเลขขนส่ง</span>
          )}
        </div>

        <div className="order-items-list">
          <h4>รายการสินค้า</h4>
          <div className="items-table">
            {order.items.map((it, idx) => (
              <div className="items-row" key={idx}>
                <div className="item-name">{it.name}</div>
                <div className="item-qty">x{it.qty}</div>
                <div className="item-price">฿{it.price}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-total-row">
          <div></div>
          <div className="order-total">รวมทั้งสิ้น: ฿{order.total}</div>
        </div>

        <div style={{ marginTop: 12 }}>
          <Link to="/orders" className="order-view">
            ย้อนกลับ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
