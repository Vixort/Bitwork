/**
 * =============================================================================
 * ExpSection.jsx - Experience & Stats Section
 * =============================================================================
 */

import React from "react";
import "./ExpSection.css";

const ExpSection = () => {
  const stats = [
    {
      number: "10,000+",
      label: "ผู้ใช้งาน",
      icon: (
        <svg
          width="28"
          height="28"
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
    },
    {
      number: "5,000+",
      label: "สินค้าในระบบ",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
      ),
    },
    {
      number: "2,500+",
      label: "งานสำเร็จ",
      icon: (
        <svg
          width="28"
          height="28"
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
    {
      number: "98%",
      label: "ความพึงพอใจ",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ),
    },
  ];

  const testimonials = [
    {
      quote:
        "ซื้อการ์ดจอมือสองจาก Bitwork คุ้มค่ามาก สินค้าคุณภาพดี รับประกันด้วย",
      author: "คุณสมชาย",
      role: "นักเล่นเกม",
    },
    {
      quote: "หาช่างซ่อมคอมได้ง่าย ราคาไม่แพง งานออกมาดีมาก",
      author: "คุณนิดา",
      role: "พนักงานออฟฟิศ",
    },
    {
      quote: "ชุมชนดีมาก ได้ความรู้เยอะ ถามอะไรก็มีคนตอบ",
      author: "คุณภูมิ",
      role: "นักศึกษา",
    },
  ];

  return (
    <section className="exp-section">
      <div className="exp-container">
        {/* Stats Grid */}
        <div className="stats-grid" data-aos="fade-up">
          {stats.map((stat, index) => (
            <div
              className="stat-card"
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="stat-icon">{stat.icon}</div>
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="testimonials-section" data-aos="fade-up">
          <h2 className="testimonials-title">
            เสียงจาก <span className="highlight">ผู้ใช้งาน</span>
          </h2>
          <div className="testimonials-grid">
            {testimonials.map((item, index) => (
              <div
                className="testimonial-card"
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="quote-icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    opacity="0.2"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="testimonial-quote">{item.quote}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{item.author.charAt(0)}</div>
                  <div className="author-info">
                    <span className="author-name">{item.author}</span>
                    <span className="author-role">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpSection;
