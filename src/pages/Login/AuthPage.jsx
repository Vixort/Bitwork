/**
 * =============================================================================
 * AuthPage.jsx - Authentication Page Component (หน้า Login/Register)
 * =============================================================================
 *
 * Component นี้จัดการการ Login และ Register ของผู้ใช้
 * ใช้ Component เดียวกันสำหรับทั้ง 2 โหมด โดยสลับด้วย State
 *
 * ทำหน้าที่:
 * 1. แสดงฟอร์ม Login/Register
 * 2. สลับโหมดด้วยปุ่ม Toggle
 * 3. จัดการ Form State และ Validation
 * 4. รองรับ Social Login (Google)
 * 5. แสดง Feature Cards ด้านขวา
 *
 * โครงสร้าง:
 * └── auth-container (Layout แบบ 2 คอลัมน์)
 *     ├── auth-form-section (ซ้าย - Form)
 *     │   ├── Toggle Buttons (สลับ Login/Register)
 *     │   ├── Form Header
 *     │   ├── Input Fields
 *     │   ├── Submit Button
 *     │   └── Social Login
 *     └── auth-banner-section (ขวา - Banner)
 *         ├── Banner Text
 *         └── Feature Cards (Job Board, Verified Shop, Community)
 *
 * URLs ที่ใช้:
 * - /login - โหมด Login
 * - /register - โหมด Register
 *
 */

// =============================================================================
// IMPORTS - นำเข้า Dependencies
// =============================================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

/**
 * AOS (Animate On Scroll) Library
 * - ใช้สำหรับ Animation เมื่อ scroll หรือเมื่อ Component mount
 * - ทำให้ UI มีชีวิตชีวาและน่าสนใจ
 */
import AOS from "aos";

/**
 * AuthPage.css - Styles สำหรับหน้า Auth
 * - Layout แบบ 2 คอลัมน์
 * - Form Styles
 * - Banner Styles พร้อม Gradient
 */
import "./AuthPage.css";

// =============================================================================
// AUTHPAGE COMPONENT
// =============================================================================

/**
 * AuthPage Component
 *
 * @description จัดการ Login และ Register ด้วย Component เดียว
 * @returns {JSX.Element} - หน้า Auth พร้อม Form และ Banner
 *
 * State:
 * - isLogin (boolean): สลับโหมด Login/Register
 * - formData (object): เก็บข้อมูลจาก Form inputs
 *
 * การทำงาน:
 * 1. เริ่มต้นด้วยโหมด Login (isLogin = true)
 * 2. ผู้ใช้กรอกข้อมูลใน Form
 * 3. กด Submit จะ log ข้อมูล (TODO: เชื่อมต่อ API)
 * 4. สามารถสลับโหมดด้วยปุ่ม Toggle
 */
const AuthPage = () => {
  // =============================================================================
  // STATE MANAGEMENT - จัดการ State
  // =============================================================================

  /**
   * isLogin State
   * - true = โหมด Login (แสดงฟอร์มเข้าสู่ระบบ)
   * - false = โหมด Register (แสดงฟอร์มสมัครสมาชิก)
   * - ค่าเริ่มต้น: true (Login)
   */
  const [isLogin, setIsLogin] = useState(true);

  /**
   * formData State
   * - เก็บข้อมูลจาก Input fields ทั้งหมด
   * - ใช้ Controlled Components pattern
   *
   * Properties:
   * - fullname: ชื่อ-นามสกุล หรือ ชื่อร้านค้า (สำหรับ Register)
   * - email: อีเมลผู้ใช้
   * - password: รหัสผ่าน
   * - confirmPassword: ยืนยันรหัสผ่าน (สำหรับ Register)
   */
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // OTP state removed

  // =============================================================================
  // SIDE EFFECTS - ผลข้างเคียง (useEffect)
  // =============================================================================

  /**
   * useEffect สำหรับ AOS Initialization
   *
   * การทำงาน:
   * - ทำงานครั้งเดียวเมื่อ Component mount (dependency array ว่าง [])
   * - เริ่มต้น AOS Library ด้วย Config ที่กำหนด
   *
   * AOS Config:
   * - duration: 800 = Animation ใช้เวลา 800ms
   * - once: true = Animation ทำงานครั้งเดียว (ไม่ repeat เมื่อ scroll กลับ)
   * - easing: "ease-out-cubic" = รูปแบบการเคลื่อนไหว (เริ่มเร็ว-ช้าลงท้าย)
   */
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // =============================================================================
  // EVENT HANDLERS - จัดการ Events
  // =============================================================================

  /**
   * handleChange - จัดการการเปลี่ยนแปลงค่าใน Input
   *
   * @param {Event} e - Event object จาก Input
   *
   * การทำงาน:
   * 1. รับ Event จาก Input element
   * 2. ดึง id และ value จาก target
   * 3. อัพเดท formData โดยใช้ Spread Operator
   * 4. [e.target.id] = Computed Property Name
   *
   * ตัวอย่าง:
   * - Input id="email" value="test@test.com"
   * - formData จะอัพเดทเป็น { ...formData, email: "test@test.com" }
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  /**
   * handleSubmit - จัดการการ Submit Form
   *
   * @param {Event} e - Event object จาก Form
   *
   * การทำงาน:
   * 1. e.preventDefault() - ป้องกัน Form reload หน้า
   * 2. ตรวจสอบว่าเป็น Login หรือ Register
   * 3. Log ข้อมูลไปที่ Console (สำหรับ Debug)
   */
  const { signIn, signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await signIn(formData.email, formData.password);
        if (error) throw error;

        // Strict Role Check: Deny Admins on Normal Login
        const role = data.user?.user_metadata?.role;
        if (role === 'admin') {
          await signOut();
          throw new Error("บัญชีร้านค้ากรุณาเข้าสู่ระบบที่หน้า Admin");
        }

        navigate("/");
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        console.log("Attempting registration with:", formData.email);

        // Explicitly set role as 'user'
        const { data, error } = await signUp(formData.email, formData.password, {
          full_name: formData.fullname,
          role: 'user'
        });

        console.log("Supabase SignUp Result:", { data, error });

        if (error) throw error;

        if (data?.session) {
          console.log("Session active, redirecting...");
          navigate("/");
        } else {
          console.log("No session. Check if Email Confirmation is enabled in Supabase.");
          alert("Registration successful! You can now log in.");
          setIsLogin(true);
          setFormData({
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =============================================================================
  // RENDER - แสดงผล Component
  // =============================================================================

  return (
    <div className="auth-container">
      {/* =================================================================
          LEFT SIDE: FORM SECTION
          - แสดง Form Login/Register
          - มี Toggle สลับโหมด
          - มี Social Login
      ================================================================= */}
      <div className="auth-form-section">
        <div className="form-wrapper" data-aos="fade-right">
          {/* ----- BRAND HEADER (Commented Out) ----- */}
          {/* 
            ส่วน Header แสดง Logo และ Tagline
            ถูก Comment out เพราะอาจซ้ำกับ NavBar
          */}
          {/* <div className="brand-header">
            <h1 className="brand-logo">
              Bitwork<span className="dot">.</span>
            </h1>
            <p className="brand-tagline">One Platform for Tech Needs</p>
          </div> */}

          {/* =================================================================
              TOGGLE SWITCH - ปุ่มสลับ Login/Register
              - 2 ปุ่ม: "เข้าสู่ระบบ" และ "สมัครสมาชิก"
              - ปุ่มที่ Active จะมี class "active"
          ================================================================= */}
          <div className="auth-toggle-container">
            {/* ปุ่ม Login */}
            <button
              className={`toggle-btn ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              เข้าสู่ระบบ
            </button>
            {/* ปุ่ม Register */}
            <button
              className={`toggle-btn ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              สมัครสมาชิก
            </button>
          </div>

          {/* =================================================================
              AUTH HEADER - หัวข้อของ Form
              - เปลี่ยนข้อความตามโหมด Login/Register
          ================================================================= */}
          <div className="auth-header">
            {/* 
              หมายเหตุ: มี $ ตรงหน้า h2 ซึ่งเป็น typo
              ควรลบออก
            */}
            <h2>{isLogin ? "ยินดีต้อนรับกลับมา" : "สร้างบัญชีใหม่"}</h2>
            <p>
              {isLogin
                ? "เข้าสู่ระบบเพื่อจัดการงานและร้านค้าของคุณ"
                : "เข้าร่วมคอมมูนิตี้และเริ่มใช้งาน Bitwork ฟรี"}
            </p>
          </div>

          {/* =================================================================
              FORM - ฟอร์ม Login/Register
              
              key prop:
              - ใช้ key เพื่อให้ React รู้ว่า Element เปลี่ยน
              - ทำให้ Animation เล่นใหม่เมื่อสลับโหมด
          ================================================================= */}
          <form
            onSubmit={handleSubmit}
            key={isLogin ? "login" : "register"}
            className="fade-in-form"
          >
            {error && <div className="auth-error">{error}</div>}

            {/* ----- OTP INPUT REMOVED ----- */}

            {/* Form Inputs */}
            <>
              {/* ----- FULLNAME INPUT (Register Only) ----- */}
              {/* แสดงเฉพาะตอนสมัครสมาชิก */}
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

              {/* ----- EMAIL INPUT ----- */}
              {/* แสดงทั้ง Login และ Register */}
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

              {/* ----- PASSWORD INPUT ----- */}
              {/* แสดงทั้ง Login และ Register */}
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

              {/* ----- CONFIRM PASSWORD INPUT (Register Only) ----- */}
              {/* แสดงเฉพาะตอนสมัครสมาชิก เพื่อยืนยันรหัสผ่าน */}
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
            </>

            {/* =================================================================
                FORM ACTIONS - ส่วนเพิ่มเติมของ Form
                
                Login Mode:
                - Remember Me checkbox
                - Forgot Password link
                
                Register Mode:
                - Terms acceptance checkbox
            ================================================================= */}

            {/* ----- LOGIN ACTIONS ----- */}
            {isLogin && (
              <div className="form-actions">
                {/* Remember Me Checkbox */}
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">จดจำฉันไว้</label>
                </div>
                {/* Forgot Password Link */}
                <a href="/forgot" className="forgot-link">
                  ลืมรหัสผ่าน?
                </a>
              </div>
            )}

            {/* ----- REGISTER ACTIONS ----- */}
            {!isLogin && (
              <div className="form-actions">
                {/* Terms Acceptance Checkbox (Required) */}
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

            {/* ----- SUBMIT BUTTON ----- */}
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "กำลังโหลด..." : isLogin ? "เข้าสู่ระบบ" : "ลงทะเบียน"}
            </button>
          </form>

          {/* =================================================================
              SOCIAL LOGIN SECTION
              - แบ่งด้วย Divider
              - ปุ่ม Google Login
          ================================================================= */}
          <div className="divider">หรือดำเนินการต่อด้วย</div>

          {/* Google Login Button */}
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

      {/* =================================================================
          RIGHT SIDE: BANNER SECTION
          - แสดงข้อมูล/Feature ของ Bitwork
          - มี Gradient Overlay
          - มี Feature Cards พร้อม AOS Animation
      ================================================================= */}
      <div className="auth-banner-section" data-aos="fade-left">
        <div className="banner-content">
          {/* ----- BANNER TEXT ----- */}
          {/* หัวข้อและคำอธิบาย เปลี่ยนตามโหมด */}
          <div className="banner-text">
            <h2>{isLogin ? "จัดการทุกเรื่องไอที" : "เริ่มต้นอาชีพของคุณ"}</h2>
            <p>
              แพลตฟอร์มเดียวที่รวมจ้างงาน ซื้อขาย
              และพูดคุยสำหรับคนรักคอมพิวเตอร์
            </p>
          </div>

          {/* =================================================================
              FEATURE CARDS
              - แสดง 3 บริการหลักของ Bitwork
              - มี AOS Animation แบบ stagger (delay ต่างกัน)
          ================================================================= */}
          <div className="feature-cards">
            {/* ----- Card 1: Job Board ----- */}
            <div className="glass-card" data-aos="fade-up" data-aos-delay="200">
              <span className="icon">🛠️</span>
              <div>
                <strong>Job Board</strong>
                <small>แหล่งรวมงานซ่อมและประกอบคอม</small>
              </div>
            </div>

            {/* ----- Card 2: Verified Shop ----- */}
            <div className="glass-card" data-aos="fade-up" data-aos-delay="300">
              <span className="icon">🏪</span>
              <div>
                <strong>Verified Shop</strong>
                <small>เปิดร้านค้าไอที สร้างความน่าเชื่อถือ</small>
              </div>
            </div>

            {/* ----- Card 3: Tech Community ----- */}
            <div className="glass-card" data-aos="fade-up" data-aos-delay="400">
              <span className="icon">💬</span>
              <div>
                <strong>Tech Community</strong>
                <small>พื้นที่ถาม-ตอบ ปัญหาคอมพิวเตอร์</small>
              </div>
            </div>
          </div>
        </div>

        {/* ----- GRADIENT OVERLAY ----- */}
        {/* สร้าง Visual Effect ให้ Banner */}
        <div className="overlay-gradient"></div>
      </div>
    </div>
  );
};

// Export AuthPage Component เพื่อใช้ใน App.jsx
export default AuthPage;
