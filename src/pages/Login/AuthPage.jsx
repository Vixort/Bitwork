import React, { useEffect, useState } from "react";
import AOS from "aos";
import "./AuthPage.css";

const AuthPage = () => {
  // State สำหรับสลับโหมด (true = Login, false = Register)
  const [isLogin, setIsLogin] = useState(true);

  // Form States
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login Logic:", formData.email);
    } else {
      console.log("Register Logic:", formData);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side: Form Section */}
      <div className="auth-form-section">
        <div className="form-wrapper" data-aos="fade-right">
          {/* Header */}
          {/* <div className="brand-header">
            <h1 className="brand-logo">
              Bitwork<span className="dot">.</span>
            </h1>
            <p className="brand-tagline">One Platform for Tech Needs</p>
          </div> */}

          {/* Toggle Switch (ปุ่มสลับ Login/Register) */}
          <div className="auth-toggle-container">
            <button
              className={`toggle-btn ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              เข้าสู่ระบบ
            </button>
            <button
              className={`toggle-btn ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              สมัครสมาชิก
            </button>
          </div>

          <div className="auth-header">
            $<h2>{isLogin ? "ยินดีต้อนรับกลับมา" : "สร้างบัญชีใหม่"}</h2>
            <p>
              {isLogin
                ? "เข้าสู่ระบบเพื่อจัดการงานและร้านค้าของคุณ"
                : "เข้าร่วมคอมมูนิตี้และเริ่มใช้งาน Bitwork ฟรี"}
            </p>
          </div>

          {/* Form - ใช้ key เพื่อให้ React รู้ว่า Element เปลี่ยนไปและเล่น Animation ใหม่ */}
          <form
            onSubmit={handleSubmit}
            key={isLogin ? "login" : "register"}
            className="fade-in-form"
          >
            {/* ส่วนสมัครสมาชิก (แสดงเฉพาะตอน isLogin = false) */}
            {!isLogin && (
              <div className="input-group">
                <label htmlFor="fullname">ชื่อ-นามสกุล หรือ ชื่อร้านค้า</label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="เช่น Bitwork Shop"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="input-group">
              <label htmlFor="email">อีเมล</label>
              <input
                type="email"
                id="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">รหัสผ่าน</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* ยืนยันรหัสผ่าน (เฉพาะสมัครสมาชิก) */}
            {!isLogin && (
              <div className="input-group">
                <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Actions: Remember Me / Forgot Pass */}
            {isLogin && (
              <div className="form-actions">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">จดจำฉันไว้</label>
                </div>
                <a href="/forgot" className="forgot-link">
                  ลืมรหัสผ่าน?
                </a>
              </div>
            )}

            {!isLogin && (
              <div className="form-actions">
                <div className="remember-me">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms">
                    ยอมรับ{" "}
                    <a href="/terms" className="forgot-link">
                      เงื่อนไขการใช้งาน
                    </a>
                  </label>
                </div>
              </div>
            )}

            <button type="submit" className="btn-primary">
              {isLogin ? "เข้าสู่ระบบ" : "ลงทะเบียน"}
            </button>
          </form>

          {/* Social Login */}
          <div className="divider">หรือดำเนินการต่อด้วย</div>

          <button className="btn-google">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              width="20"
            />
            Google Account
          </button>
        </div>
      </div>

      {/* Right Side: Banner (คงเดิมเพราะสวยและตรง concept แล้ว) */}
      <div className="auth-banner-section" data-aos="fade-left">
        <div className="banner-content">
          <div className="banner-text">
            <h2>{isLogin ? "จัดการทุกเรื่องไอที" : "เริ่มต้นอาชีพของคุณ"}</h2>
            <p>
              แพลตฟอร์มเดียวที่รวมจ้างงาน ซื้อขาย
              และพูดคุยสำหรับคนรักคอมพิวเตอร์
            </p>
          </div>

          <div className="feature-cards">
            <div className="glass-card" data-aos="fade-up" data-aos-delay="200">
              <span className="icon">🛠️</span>
              <div>
                <strong>Job Board</strong>
                <small>แหล่งรวมงานซ่อมและประกอบคอม</small>
              </div>
            </div>
            <div className="glass-card" data-aos="fade-up" data-aos-delay="300">
              <span className="icon">🏪</span>
              <div>
                <strong>Verified Shop</strong>
                <small>เปิดร้านค้าไอที สร้างความน่าเชื่อถือ</small>
              </div>
            </div>
            <div className="glass-card" data-aos="fade-up" data-aos-delay="400">
              <span className="icon">💬</span>
              <div>
                <strong>Tech Community</strong>
                <small>พื้นที่ถาม-ตอบ ปัญหาคอมพิวเตอร์</small>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay-gradient"></div>
      </div>
    </div>
  );
};

export default AuthPage;
