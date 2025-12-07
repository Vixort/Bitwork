/**
 * =============================================================================
 * Spoiler.jsx - Featured Products Section
 * =============================================================================
 */

import React from "react";
import { useNavigate } from "react-router";
import "./Spoiler.css";

const Spoiler = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "RTX 4090",
      description: "การ์ดจอสุดแรง สำหรับเกมเมอร์ตัวจริง",
      price: "฿45,900",
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80",
      tag: "ยอดนิยม",
    },
    {
      id: 2,
      name: "RTX 4080 Super",
      description: "ประสิทธิภาพสูง คุ้มค่าที่สุด",
      price: "฿35,500",
      image:
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80",
      tag: "แนะนำ",
    },
    {
      id: 3,
      name: "RTX 4070 Ti",
      description: "สมดุลทั้งราคาและประสิทธิภาพ",
      price: "฿25,900",
      image:
        "https://images.unsplash.com/photo-1555618254-5c1ce2cd81bc?w=400&q=80",
      tag: "คุ้มค่า",
    },
    {
      id: 4,
      name: "RTX 4060 Ti",
      description: "เริ่มต้นเล่นเกม 1080p สบายๆ",
      price: "฿15,900",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
      tag: "ราคาดี",
    },
  ];

  return (
    <section className="spoiler-section">
      <div className="spoiler-container">
        <div className="spoiler-header" data-aos="fade-up">
          <span className="spoiler-badge">สินค้าเด่น</span>
          <h2 className="spoiler-title">
            การ์ดจอ <span className="highlight">มือสอง</span> คุณภาพดี
          </h2>
          <p className="spoiler-subtitle">
            คัดสรรมาเฉพาะการ์ดจอคุณภาพ รับประกันทุกชิ้น
          </p>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <div
              className="home-spoiler-product-card"
              key={product.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="home-spoiler-product-image">
                <img src={product.image} alt={product.name} />
                <span className="home-spoiler-product-tag">{product.tag}</span>
              </div>
              <div className="home-spoiler-product-info">
                <h3 className="home-spoiler-product-name">{product.name}</h3>
                <p className="home-spoiler-product-description">{product.description}</p>
                <div className="home-spoiler-product-footer">
                  <span className="home-spoiler-product-price">{product.price}</span>
                  <button className="home-spoiler-product-btn">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="spoiler-cta" data-aos="fade-up">
          <button className="view-all-btn" onClick={() => navigate("/market")}>
            ดูสินค้าทั้งหมด
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      <div className="promo-banner" data-aos="fade-up">
        <div className="promo-content">
          <h3>ลดพิเศษสำหรับสมาชิกใหม่</h3>
          <p>รับส่วนลด 10% ทันทีเมื่อสมัครสมาชิก</p>
          <button onClick={() => navigate("/login")}>สมัครเลย</button>
        </div>
        <div className="promo-decoration">
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="currentColor"
            opacity="0.1"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Spoiler;
