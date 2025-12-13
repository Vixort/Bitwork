/**
 * NotFound.jsx - 404 Page Not Found
 * หน้าแสดงเมื่อเข้า URL ที่ไม่มีในระบบ
 */
import React, { useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import "./NotFound.css";

const NotFound = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="not-found-page">
      <div className="not-found-container" data-aos="fade-up">
        {/* 404 Illustration */}
        <div className="not-found-illustration">
          <div className="error-code">
            <span className="digit">4</span>
            <span className="digit zero">
              <svg viewBox="0 0 100 100" className="zero-svg">
                <circle cx="50" cy="50" r="40" className="zero-circle" />
                <circle cx="35" cy="40" r="6" className="eye left-eye" />
                <circle cx="65" cy="40" r="6" className="eye right-eye" />
                <path d="M 35 65 Q 50 55 65 65" className="mouth" />
              </svg>
            </span>
            <span className="digit">4</span>
          </div>
        </div>

        {/* Error Message */}
        <div
          className="not-found-content"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h1 className="not-found-title">ไม่พบหน้าที่คุณค้นหา</h1>
          <p className="not-found-description">
            หน้าที่คุณพยายามเข้าถึงอาจถูกลบ เปลี่ยนชื่อ หรือไม่มีอยู่ในระบบ
          </p>
        </div>

        {/* Quick Links */}
        <div
          className="not-found-actions"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <Link to="/" className="btn-primary">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            กลับหน้าแรก
          </Link>
          <Link to="/jobs" className="btn-secondary">
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
            ค้นหางาน
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="helpful-links" data-aos="fade-up" data-aos-delay="300">
          <p className="helpful-title">หน้าที่คุณอาจสนใจ:</p>
          <div className="links-grid">
            <Link to="/market" className="helpful-link">
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
              ร้านค้า
            </Link>
            <Link to="/community" className="helpful-link">
              <svg
                width="18"
                height="18"
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
              ชุมชน
            </Link>
            <Link to="/settings" className="helpful-link">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              ตั้งค่า
            </Link>
            <Link to="/login" className="helpful-link">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
    </div>
  );
};

export default NotFound;
