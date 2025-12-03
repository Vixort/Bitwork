/**
 * =============================================================================
 * Showcase.jsx - Services Showcase Section
 * =============================================================================
 */

import React from "react";
import { useNavigate } from "react-router";
import "./Showcase.css";

const Showcase = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      title: "ร้านค้า",
      description: "ซื้อขายอุปกรณ์คอมพิวเตอร์มือสอง",
      link: "/market",
      color: "#10b981",
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      title: "จ้างงาน",
      description: "หาช่างซ่อมและบริการด้านไอที",
      link: "/jobboard",
      color: "#f59e0b",
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      title: "ชุมชน",
      description: "แลกเปลี่ยนความรู้กับผู้เชี่ยวชาญ",
      link: "/community",
      color: "#6366f1",
    },
  ];

  const marqueeItems = [
    { text: "การ์ดจอ RTX 4090", category: "GPU" },
    { text: "CPU Intel i9-14900K", category: "CPU" },
    { text: "RAM DDR5 32GB", category: "RAM" },
    { text: "SSD NVMe 2TB", category: "Storage" },
    { text: "เมนบอร์ด Z790", category: "Mainboard" },
    { text: "พาวเวอร์ซัพพลาย 850W", category: "PSU" },
    { text: "เคส Gaming RGB", category: "Case" },
    { text: "จอมอนิเตอร์ 4K 144Hz", category: "Monitor" },
  ];

  return (
    <section className="showcase-section">
      <div className="showcase-container">
        <div className="showcase-header" data-aos="fade-up">
          <h2 className="showcase-title">
            พร้อมจบครบทุกอย่างต้อง <span className="highlight">Bitwork</span>
          </h2>
          <p className="showcase-subtitle">เลือกบริการที่คุณต้องการได้ทันที</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              className="service-card"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              onClick={() => navigate(service.link)}
              style={{ "--accent-color": service.color }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <span className="service-arrow">
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
              </span>
            </div>
          ))}
        </div>

        <div className="marquee-container" data-aos="fade-up">
          <div className="marquee">
            <div className="marquee-inner">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <div className="marquee-item" key={index}>
                  <span className="item-category">{item.category}</span>
                  <span className="item-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="showcase-footer" data-aos="fade-up">
          <p>ครบทุกบริการคอมพิวเตอร์ ที่เดียวจบ ครบทั้งซ่อม–ขาย–แชร์ความรู้</p>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
