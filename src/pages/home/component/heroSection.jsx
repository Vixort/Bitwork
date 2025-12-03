/**
 * =============================================================================
 * HeroSection.jsx - Hero Section Component
 * =============================================================================
 */

import React from "react";
import { useNavigate } from "react-router";
import "./heroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="hero-pattern"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content" data-aos="fade-up">
          <span className="hero-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            แพลตฟอร์มสำหรับคนรักคอมพิวเตอร์
          </span>

          <h1 className="hero-title">
            <span className="title-line">ยินดีต้อนรับสู่</span>
            <span className="title-highlight">Bitwork</span>
          </h1>

          <p className="hero-description">
            แพลตฟอร์มครบวงจรสำหรับคนรักคอมพิวเตอร์ ซื้อขายอุปกรณ์มือสอง
            จ้างงานซ่อมแซม และแลกเปลี่ยนความรู้กับชุมชนที่ใหญ่ที่สุดในประเทศไทย
          </p>

          <div className="hero-stats" data-aos="fade-up" data-aos-delay="100">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">ผู้ใช้งาน</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">5K+</span>
              <span className="stat-label">สินค้า</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">2K+</span>
              <span className="stat-label">งานบริการ</span>
            </div>
          </div>

          <div className="hero-cta" data-aos="fade-up" data-aos-delay="200">
            <button className="cta-primary" onClick={() => navigate("/market")}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              เริ่มช้อปปิ้ง
            </button>
            <button
              className="cta-secondary"
              onClick={() => navigate("/jobboard")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              หางาน / จ้างงาน
            </button>
          </div>
        </div>

        <div className="hero-visual" data-aos="fade-left" data-aos-delay="300">
          <div className="visual-card card-1">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span>คอมพิวเตอร์</span>
          </div>
          <div className="visual-card card-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <span>การ์ดจอ</span>
          </div>
          <div className="visual-card card-3">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            <span>ซ่อมบำรุง</span>
          </div>
          <div className="visual-card card-4">
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
            <span>ชุมชน</span>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" data-aos="fade-up" data-aos-delay="500">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>เลื่อนลง</span>
      </div>
    </section>
  );
};

export default HeroSection;
