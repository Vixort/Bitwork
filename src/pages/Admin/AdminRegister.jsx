/**
 * AdminRegister.jsx - Shop Registration Page
 * หน้าสมัครเปิดร้านค้าใน Bitwork Platform
 */
import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import "./AdminRegister.css";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // ข้อมูลเจ้าของร้าน
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    password: "",
    confirmPassword: "",
    // ข้อมูลร้านค้า
    shopName: "",
    shopDescription: "",
    shopCategory: "",
    shopAddress: "",
    shopProvince: "",
    // ข้อมูลธุรกิจ
    businessType: "individual", // individual, company
    taxId: "",
    // ยอมรับเงื่อนไข
    acceptTerms: false,
    acceptPolicy: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const shopCategories = [
    "คอมพิวเตอร์และอุปกรณ์",
    "การ์ดจอและ CPU",
    "สมาร์ทโฟนและแท็บเล็ต",
    "อุปกรณ์เกมมิ่ง",
    "อุปกรณ์เครือข่าย",
    "อุปกรณ์เสริมและ Gadget",
    "ชิ้นส่วนคอมพิวเตอร์",
    "โน้ตบุ๊คและแล็ปท็อป",
    "อุปกรณ์ต่อพ่วง",
  ];

  const provinces = [
    "กรุงเทพมหานคร",
    "นนทบุรี",
    "ปทุมธานี",
    "สมุทรปราการ",
    "เชียงใหม่",
    "ภูเก็ต",
    "ขอนแก่น",
    "ชลบุรี",
    "นครราชสีมา",
    "สงขลา",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "กรุณากรอกชื่อ-นามสกุล";
    }
    if (!formData.ownerEmail.trim()) {
      newErrors.ownerEmail = "กรุณากรอกอีเมล";
    } else if (!/\S+@\S+\.\S+/.test(formData.ownerEmail)) {
      newErrors.ownerEmail = "รูปแบบอีเมลไม่ถูกต้อง";
    }
    if (!formData.ownerPhone.trim()) {
      newErrors.ownerPhone = "กรุณากรอกเบอร์โทรศัพท์";
    } else if (!/^0[0-9]{9}$/.test(formData.ownerPhone)) {
      newErrors.ownerPhone = "เบอร์โทรศัพท์ไม่ถูกต้อง";
    }
    if (!formData.password) {
      newErrors.password = "กรุณากรอกรหัสผ่าน";
    } else if (formData.password.length < 8) {
      newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.shopName.trim()) {
      newErrors.shopName = "กรุณากรอกชื่อร้านค้า";
    }
    if (!formData.shopCategory) {
      newErrors.shopCategory = "กรุณาเลือกหมวดหมู่ร้านค้า";
    }
    if (!formData.shopProvince) {
      newErrors.shopProvince = "กรุณาเลือกจังหวัด";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "กรุณายอมรับข้อกำหนดและเงื่อนไข";
    }
    if (!formData.acceptPolicy) {
      newErrors.acceptPolicy = "กรุณายอมรับนโยบายความเป็นส่วนตัว";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const { signUp } = useAuth(); // Destructure signUp from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsLoading(true);
    try {
      // Prepare metadata
      const metaData = {
        full_name: formData.ownerName,
        phone: formData.ownerPhone,
        shop_name: formData.shopName,
        shop_description: formData.shopDescription,
        shop_category: formData.shopCategory,
        shop_province: formData.shopProvince,
        shop_address: formData.shopAddress,
        business_type: formData.businessType,
        tax_id: formData.taxId,
        role: 'admin' // Mark as admin role request
      };

      const { data, error } = await signUp(formData.ownerEmail, formData.password, metaData);

      if (error) throw error;

      if (data?.session) {
        navigate("/admin/dashboard");
      } else {
        // If email confirmation is enabled
        navigate("/admin/login?registered=true");
      }

    } catch (err) {
      console.error("Registration failed", err);
      // Show error on appropriate step or general alert
      alert(err.message || "การสมัครล้มเหลว กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-register-page">
      <div className="admin-register-container">
        {/* Left Side - Branding */}
        <div className="admin-register-branding">
          <div className="branding-content">
            <div className="admin-logo">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <h1>เปิดร้านค้ากับ Bitwork</h1>
            <p>เริ่มต้นธุรกิจออนไลน์ของคุณวันนี้</p>

            <div className="admin-benefits">
              <div className="benefit-item">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>ไม่มีค่าธรรมเนียมแรกเข้า</span>
              </div>
              <div className="benefit-item">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>เข้าถึงลูกค้าทั่วประเทศ</span>
              </div>
              <div className="benefit-item">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>เครื่องมือจัดการร้านค้าครบครัน</span>
              </div>
              <div className="benefit-item">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>รองรับการชำระเงินหลายช่องทาง</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="admin-register-form-section">
          {/* Progress Steps */}
          <div className="register-steps">
            <div
              className={`step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""
                }`}
            >
              <div className="step-number">
                {step > 1 ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  "1"
                )}
              </div>
              <span>ข้อมูลเจ้าของ</span>
            </div>
            <div className="step-line" />
            <div
              className={`step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""
                }`}
            >
              <div className="step-number">
                {step > 2 ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  "2"
                )}
              </div>
              <span>ข้อมูลร้านค้า</span>
            </div>
            <div className="step-line" />
            <div className={`step ${step >= 3 ? "active" : ""}`}>
              <div className="step-number">3</div>
              <span>ยืนยันตัวตน</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {/* Step 1: ข้อมูลเจ้าของ */}
            {step === 1 && (
              <div className="form-step">
                <h2>ข้อมูลเจ้าของร้าน</h2>
                <p className="form-subtitle">กรอกข้อมูลส่วนตัวของคุณ</p>

                <div className="form-group">
                  <label htmlFor="ownerName">ชื่อ-นามสกุล *</label>
                  <input
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="กรอกชื่อ-นามสกุล"
                    className={errors.ownerName ? "error" : ""}
                  />
                  {errors.ownerName && (
                    <span className="error-text">{errors.ownerName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="ownerEmail">อีเมล *</label>
                  <input
                    type="email"
                    id="ownerEmail"
                    name="ownerEmail"
                    value={formData.ownerEmail}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className={errors.ownerEmail ? "error" : ""}
                  />
                  {errors.ownerEmail && (
                    <span className="error-text">{errors.ownerEmail}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="ownerPhone">เบอร์โทรศัพท์ *</label>
                  <input
                    type="tel"
                    id="ownerPhone"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleChange}
                    placeholder="0812345678"
                    className={errors.ownerPhone ? "error" : ""}
                  />
                  {errors.ownerPhone && (
                    <span className="error-text">{errors.ownerPhone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password">รหัสผ่าน *</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="อย่างน้อย 8 ตัวอักษร"
                    className={errors.password ? "error" : ""}
                  />
                  {errors.password && (
                    <span className="error-text">{errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="กรอกรหัสผ่านอีกครั้ง"
                    className={errors.confirmPassword ? "error" : ""}
                  />
                  {errors.confirmPassword && (
                    <span className="error-text">{errors.confirmPassword}</span>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: ข้อมูลร้านค้า */}
            {step === 2 && (
              <div className="form-step">
                <h2>ข้อมูลร้านค้า</h2>
                <p className="form-subtitle">กรอกรายละเอียดร้านค้าของคุณ</p>

                <div className="form-group">
                  <label htmlFor="shopName">ชื่อร้านค้า *</label>
                  <input
                    type="text"
                    id="shopName"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleChange}
                    placeholder="ตั้งชื่อร้านค้าของคุณ"
                    className={errors.shopName ? "error" : ""}
                  />
                  {errors.shopName && (
                    <span className="error-text">{errors.shopName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="shopDescription">คำอธิบายร้านค้า</label>
                  <textarea
                    id="shopDescription"
                    name="shopDescription"
                    value={formData.shopDescription}
                    onChange={handleChange}
                    placeholder="บอกเล่าเกี่ยวกับร้านค้าของคุณ..."
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="shopCategory">หมวดหมู่หลักของร้าน *</label>
                  <select
                    id="shopCategory"
                    name="shopCategory"
                    value={formData.shopCategory}
                    onChange={handleChange}
                    className={errors.shopCategory ? "error" : ""}
                  >
                    <option value="">เลือกหมวดหมู่</option>
                    {shopCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.shopCategory && (
                    <span className="error-text">{errors.shopCategory}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="shopProvince">จังหวัด *</label>
                  <select
                    id="shopProvince"
                    name="shopProvince"
                    value={formData.shopProvince}
                    onChange={handleChange}
                    className={errors.shopProvince ? "error" : ""}
                  >
                    <option value="">เลือกจังหวัด</option>
                    {provinces.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                  {errors.shopProvince && (
                    <span className="error-text">{errors.shopProvince}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="shopAddress">ที่อยู่ร้านค้า</label>
                  <textarea
                    id="shopAddress"
                    name="shopAddress"
                    value={formData.shopAddress}
                    onChange={handleChange}
                    placeholder="ที่อยู่สำหรับติดต่อหรือจัดส่งสินค้า"
                    rows="2"
                  />
                </div>

                <div className="form-group">
                  <label>ประเภทธุรกิจ</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="businessType"
                        value="individual"
                        checked={formData.businessType === "individual"}
                        onChange={handleChange}
                      />
                      <span>บุคคลธรรมดา</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="businessType"
                        value="company"
                        checked={formData.businessType === "company"}
                        onChange={handleChange}
                      />
                      <span>นิติบุคคล/บริษัท</span>
                    </label>
                  </div>
                </div>

                {formData.businessType === "company" && (
                  <div className="form-group">
                    <label htmlFor="taxId">เลขประจำตัวผู้เสียภาษี</label>
                    <input
                      type="text"
                      id="taxId"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleChange}
                      placeholder="กรอกเลขประจำตัวผู้เสียภาษี 13 หลัก"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 3: ยืนยันตัวตน */}
            {step === 3 && (
              <div className="form-step">
                <h2>ยืนยันตัวตนและข้อกำหนด</h2>
                <p className="form-subtitle">ตรวจสอบข้อมูลและยอมรับเงื่อนไข</p>

                <div className="summary-card">
                  <h3>สรุปข้อมูลการสมัคร</h3>
                  <div className="summary-row">
                    <span>เจ้าของร้าน:</span>
                    <span>{formData.ownerName}</span>
                  </div>
                  <div className="summary-row">
                    <span>อีเมล:</span>
                    <span>{formData.ownerEmail}</span>
                  </div>
                  <div className="summary-row">
                    <span>เบอร์โทรศัพท์:</span>
                    <span>{formData.ownerPhone}</span>
                  </div>
                  <div className="summary-row">
                    <span>ชื่อร้านค้า:</span>
                    <span>{formData.shopName}</span>
                  </div>
                  <div className="summary-row">
                    <span>หมวดหมู่:</span>
                    <span>{formData.shopCategory}</span>
                  </div>
                  <div className="summary-row">
                    <span>จังหวัด:</span>
                    <span>{formData.shopProvince}</span>
                  </div>
                  <div className="summary-row">
                    <span>ประเภทธุรกิจ:</span>
                    <span>
                      {formData.businessType === "individual"
                        ? "บุคคลธรรมดา"
                        : "นิติบุคคล"}
                    </span>
                  </div>
                </div>

                <div className="terms-section">
                  <label
                    className={`checkbox-label ${errors.acceptTerms ? "error" : ""
                      }`}
                  >
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                    />
                    <span>
                      ฉันได้อ่านและยอมรับ{" "}
                      <a href="/terms" target="_blank">
                        ข้อกำหนดและเงื่อนไข
                      </a>{" "}
                      ของการเป็นผู้ขายบน Bitwork
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <span className="error-text">{errors.acceptTerms}</span>
                  )}

                  <label
                    className={`checkbox-label ${errors.acceptPolicy ? "error" : ""
                      }`}
                  >
                    <input
                      type="checkbox"
                      name="acceptPolicy"
                      checked={formData.acceptPolicy}
                      onChange={handleChange}
                    />
                    <span>
                      ฉันยอมรับ{" "}
                      <a href="/privacy" target="_blank">
                        นโยบายความเป็นส่วนตัว
                      </a>{" "}
                      และยินยอมให้ Bitwork เก็บรวบรวมข้อมูลของฉัน
                    </span>
                  </label>
                  {errors.acceptPolicy && (
                    <span className="error-text">{errors.acceptPolicy}</span>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="form-navigation">
              {step > 1 && (
                <button
                  type="button"
                  className="btn-back"
                  onClick={handlePrevStep}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  ย้อนกลับ
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  className="btn-next"
                  onClick={handleNextStep}
                >
                  ถัดไป
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      กำลังสมัคร...
                    </>
                  ) : (
                    "ยืนยันการสมัคร"
                  )}
                </button>
              )}
            </div>
          </form>

          <div className="register-footer">
            <p>
              มีบัญชีร้านค้าอยู่แล้ว? <Link to="/admin/login">เข้าสู่ระบบ</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
