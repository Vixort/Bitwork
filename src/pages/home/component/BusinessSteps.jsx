/**
 * =============================================================================
 * BusinessSteps.jsx - How It Works Section
 * =============================================================================
 */

import React from "react";
import { useNavigate } from "react-router";
import "./BusinessSteps.css";

const BusinessSteps = () => {
  const navigate = useNavigate();

  const steps = [
    {
      step: 1,
      title: "สมัครสมาชิก",
      description: "สร้างบัญชีฟรี ใช้เวลาไม่ถึง 1 นาที",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
      ),
    },
    {
      step: 2,
      title: "เลือกบริการ",
      description: "ซื้อสินค้า ขายสินค้า หรือจ้างงาน",
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
    },
    {
      step: 3,
      title: "ดำเนินการ",
      description: "ชำระเงินอย่างปลอดภัย รอรับบริการ",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
    },
    {
      step: 4,
      title: "เสร็จสิ้น",
      description: "รับสินค้าหรือบริการตามที่ตกลง",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
  ];

  return (
    <section className="steps-section">
      <div className="steps-container">
        <div className="steps-header" data-aos="fade-up">
          <span className="steps-badge">ง่ายๆ เพียง 4 ขั้นตอน</span>
          <h2 className="steps-title">
            เริ่มต้นใช้งาน <span className="highlight">Bitwork</span>
          </h2>
          <p className="steps-subtitle">ไม่ซับซ้อน ไม่ยุ่งยาก เริ่มได้ทันที</p>
        </div>

        <div className="steps-timeline">
          {steps.map((item, index) => (
            <div
              className="step-item"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="step-number">{item.step}</div>
              <div className="step-connector"></div>
              <div className="step-content">
                <div className="step-icon">{item.icon}</div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="steps-cta" data-aos="fade-up">
          <button
            className="cta-btn primary"
            onClick={() => navigate("/login")}
          >
            เริ่มต้นใช้งานฟรี
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
          <p className="cta-note">ไม่มีค่าใช้จ่าย • สมัครง่ายใน 1 นาที</p>
        </div>
      </div>
    </section>
  );
};

export default BusinessSteps;
