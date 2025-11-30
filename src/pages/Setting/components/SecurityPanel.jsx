/**
 * SecurityPanel.jsx - Security Settings Panel
 */
import React, { useState } from "react";
import InputField from "./InputField";
import ToggleSwitch from "./ToggleSwitch";

const SecurityPanel = ({
  data,
  onChange,
  onSave,
  onCancel,
  hasChanges,
  onOpenModal,
}) => {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <h2 className="panel-title">ความปลอดภัย</h2>
        <p className="panel-description">
          จัดการรหัสผ่านและตั้งค่าความปลอดภัยของบัญชี
        </p>
      </div>

      <div className="panel-content">
        {/* Change Password Section */}
        <div className="form-section">
          <h3 className="section-title">เปลี่ยนรหัสผ่าน</h3>
          <InputField
            label="รหัสผ่านปัจจุบัน"
            type={showPasswords.current ? "text" : "password"}
            name="currentPassword"
            value={data.currentPassword}
            onChange={onChange}
            placeholder="กรอกรหัสผ่านปัจจุบัน"
          />
          <InputField
            label="รหัสผ่านใหม่"
            type={showPasswords.new ? "text" : "password"}
            name="newPassword"
            value={data.newPassword}
            onChange={onChange}
            placeholder="กรอกรหัสผ่านใหม่"
            helperText="รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"
          />
          <InputField
            label="ยืนยันรหัสผ่านใหม่"
            type={showPasswords.confirm ? "text" : "password"}
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={onChange}
            placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
          />
        </div>

        {/* Two-Factor Authentication */}
        <div className="form-section">
          <h3 className="section-title">การยืนยันตัวตนสองขั้นตอน (2FA)</h3>
          <div className="security-card">
            <div className="security-card-info">
              <div className="security-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <h4 className="security-card-title">
                  Two-Factor Authentication
                </h4>
                <p className="security-card-desc">
                  เพิ่มความปลอดภัยให้บัญชีของคุณด้วยการยืนยันตัวตนสองขั้นตอน
                </p>
              </div>
            </div>
            <ToggleSwitch
              checked={data.twoFactorEnabled}
              onChange={onChange}
              name="twoFactorEnabled"
            />
          </div>

          {data.twoFactorEnabled && (
            <div className="twofa-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="twoFactorMethod"
                  value="app"
                  checked={data.twoFactorMethod === "app"}
                  onChange={onChange}
                />
                <span className="radio-label">
                  <strong>Authenticator App</strong>
                  <span>ใช้แอป Google Authenticator หรือ Authy</span>
                </span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="twoFactorMethod"
                  value="sms"
                  checked={data.twoFactorMethod === "sms"}
                  onChange={onChange}
                />
                <span className="radio-label">
                  <strong>SMS</strong>
                  <span>รับรหัสผ่านทาง SMS</span>
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Login Sessions */}
        <div className="form-section">
          <h3 className="section-title">อุปกรณ์ที่เข้าสู่ระบบ</h3>
          <div className="session-list">
            <div className="session-item active">
              <div className="session-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <div className="session-info">
                <span className="session-device">MacBook Pro - Chrome</span>
                <span className="session-location">
                  Bangkok, Thailand • อุปกรณ์นี้
                </span>
              </div>
              <span className="session-badge">ใช้งานอยู่</span>
            </div>
            <div className="session-item">
              <div className="session-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </div>
              <div className="session-info">
                <span className="session-device">iPhone 15 Pro - Safari</span>
                <span className="session-location">
                  Bangkok, Thailand • 2 ชั่วโมงก่อน
                </span>
              </div>
              <button
                className="btn-text-danger"
                onClick={() => onOpenModal("logout-device")}
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
          <button
            className="btn-outline btn-full"
            onClick={() => onOpenModal("logout-all")}
          >
            ออกจากระบบทุกอุปกรณ์
          </button>
        </div>
      </div>

      <div className="panel-footer">
        <button
          className="btn-outline"
          onClick={onCancel}
          disabled={!hasChanges}
        >
          ยกเลิก
        </button>
        <button className="btn-primary" onClick={onSave} disabled={!hasChanges}>
          บันทึกการเปลี่ยนแปลง
        </button>
      </div>
    </div>
  );
};

export default SecurityPanel;
