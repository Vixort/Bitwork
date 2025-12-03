/**
 * =============================================================================
 * Why.jsx - Why Bitwork Section Component
 * =============================================================================
 */

import React from "react";
import "./Why.css";

const Why = () => {
  const features = [
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
      title: "ซื้อขายอุปกรณ์",
      description: "ซื้อขายคอมพิวเตอร์และอุปกรณ์มือสองคุณภาพดี ราคาถูก",
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      title: "จ้างงานซ่อมแซม",
      description: "หาช่างซ่อมคอมพิวเตอร์มืออาชีพ พร้อมรับประกันงาน",
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "ชุมชนคนไอที",
      description: "แลกเปลี่ยนความรู้กับผู้เชี่ยวชาญและผู้ใช้งานทั่วประเทศ",
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
      title: "ปลอดภัย 100%",
      description: "ระบบรักษาความปลอดภัยสูง มั่นใจได้ทุกการทำธุรกรรม",
    },
  ];

  return (
    <section className="why-section">
      <div className="why-container">
        <div className="why-header" data-aos="fade-up">
          <span className="why-badge">ทำไมต้องเลือกเรา</span>
          <h2 className="why-title">
            ทำไมต้องใช้ <span className="highlight">Bitwork</span> ?
          </h2>
          <p className="why-subtitle">
            เราคือแพลตฟอร์มที่รวบรวมบริการด้านคอมพิวเตอร์ไว้ในที่เดียว
            ช่วยให้คุณประหยัดเวลาและค่าใช้จ่าย
          </p>
        </div>

        <div className="why-features">
          {features.map((feature, index) => (
            <div
              className="feature-card"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="why-tagline" data-aos="fade-up">
          <p>
            ซื้อขายง่าย ปลอดภัย สนุกได้ทุกการช็อป —
            <span className="tagline-highlight">
              {" "}
              ครบทุกความต้องการด้านไอทีในที่เดียว
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Why;
