/**
 * =============================================================================
 * Footer.jsx - Professional Footer Component
 * =============================================================================
 * 
 * ฟุตเตอร์ที่ออกแบบมาให้เข้ากับธีมสีขาว-เขียว (White-Green Theme)
 * แสดงข้อมูลที่สำคัญเช่น:
 * - ลิงก์นำทาง
 * - ข้อมูลติดต่อ
 * - โซเชียลมีเดีย
 * - ข้อมูลโปรไฟล์
 */

import React from "react";
import { Link } from "react-router";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - About */}
        <div className="footer-section footer-about">
          <div className="footer-logo">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span>Bitwork</span>
          </div>
          <p className="footer-description">
            แพลตฟอร์มสำหรับการค้นหางาน จำหน่ายสินค้า และชุมชนผู้ประกอบการ
          </p>
          <div className="social-links">
            <a href="#" className="social-icon" title="Facebook">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="social-icon" title="Twitter">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.953 4.57a10 10 0 002.856-3.51 10 10 0 01-2.856.968 5 5 0 00-8.487 3.82 14.55 14.55 0 01-10.56-5.35s-4.36 11.02 5 15.76a11 11 0 01-6.24 1.78c7.15 4.69 15.88 2.37 19.54-6.15a10.66 10.66 0 001.207-6.59z" />
              </svg>
            </a>
            <a href="#" className="social-icon" title="LinkedIn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.413-.103.249-.129.597-.129.946v5.446h-3.554s.05-8.836 0-9.759h3.554v1.381c.43-.664 1.199-1.608 2.925-1.608 2.135 0 3.735 1.39 3.735 4.38v5.606zM5.337 9.433c-1.144 0-1.915-.762-1.915-1.715 0-.953.77-1.715 1.926-1.715 1.155 0 1.916.762 1.916 1.715 0 .953-.766 1.715-1.927 1.715zm1.946 11.019H3.39V9.694h3.893v10.758zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
            <a href="#" className="social-icon" title="GitHub">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Center Section - Links */}
        <div className="footer-section">
          <h4 className="footer-title">นำทาง</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">หน้าแรก</Link>
            </li>
            <li>
              <Link to="/market">ร้านค้า</Link>
            </li>
            <li>
              <Link to="/jobs">หางาน</Link>
            </li>
            <li>
              <Link to="/community">ชุมชน</Link>
            </li>
          </ul>
        </div>

        {/* Center-Right Section - Resources */}
        <div className="footer-section">
          <h4 className="footer-title">ทรัพยากร</h4>
          <ul className="footer-links">
            <li>
              <a href="#help">ศูนย์ช่วยเหลือ</a>
            </li>
            <li>
              <a href="#guides">คู่มือการใช้งาน</a>
            </li>
            <li>
              <a href="#blog">บทความ</a>
            </li>
            <li>
              <a href="#faq">คำถามที่พบบ่อย</a>
            </li>
          </ul>
        </div>

        {/* Right Section - Company */}
        <div className="footer-section">
          <h4 className="footer-title">บริษัท</h4>
          <ul className="footer-links">
            <li>
              <a href="#about">เกี่ยวกับเรา</a>
            </li>
            <li>
              <a href="#careers">สมัครงาน</a>
            </li>
            <li>
              <a href="#contact">ติดต่อเรา</a>
            </li>
            <li>
              <a href="#privacy">นโยบายความเป็นส่วนตัว</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p className="footer-text">
          &copy; {currentYear} Bitwork. สงวนลิขสิทธิ์. สร้างสรรค์เพื่อผู้ประกอบการไทย
        </p>
        <div className="footer-policies">
          <a href="#terms">เงื่อนไขการใช้งาน</a>
          <span className="divider">•</span>
          <a href="#privacy">นโยบายความเป็นส่วนตัว</a>
          <span className="divider">•</span>
          <a href="#cookies">นโยบายคุกกี้</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;