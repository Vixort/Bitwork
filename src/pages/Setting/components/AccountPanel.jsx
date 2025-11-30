/**
 * AccountPanel.jsx - Account Settings Panel
 */
import React from "react";
import InputField from "./InputField";

const AccountPanel = ({
  data,
  onChange,
  onSave,
  onCancel,
  onReset,
  hasChanges,
}) => {
  return (
    <div className="settings-panel">
      <div className="panel-header">
        <h2 className="panel-title">ข้อมูลบัญชี</h2>
        <p className="panel-description">
          จัดการข้อมูลส่วนตัวและข้อมูลติดต่อของคุณ
        </p>
      </div>

      <div className="panel-content">
        {/* Profile Photo */}
        <div className="profile-photo-section">
          <div className="profile-photo">
            {data.profileImage ? (
              <img src={data.profileImage} alt="Profile" />
            ) : (
              <div className="profile-photo-placeholder">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
          </div>
          <div className="profile-photo-actions">
            <button className="btn-secondary btn-small">อัปโหลดรูปใหม่</button>
            <button className="btn-outline btn-small">ลบรูป</button>
          </div>
        </div>

        <div className="form-grid">
          <InputField
            label="ชื่อ"
            name="firstName"
            value={data.firstName}
            onChange={onChange}
            placeholder="กรอกชื่อของคุณ"
            required
          />
          <InputField
            label="นามสกุล"
            name="lastName"
            value={data.lastName}
            onChange={onChange}
            placeholder="กรอกนามสกุลของคุณ"
            required
          />
        </div>

        <InputField
          label="ชื่อที่แสดง (Display Name)"
          name="displayName"
          value={data.displayName}
          onChange={onChange}
          placeholder="ชื่อที่จะแสดงในโปรไฟล์"
          helperText="ชื่อนี้จะแสดงให้ผู้อื่นเห็นบนแพลตฟอร์ม"
        />

        <InputField
          label="Username"
          name="username"
          value={data.username}
          onChange={onChange}
          placeholder="username"
          helperText="URL โปรไฟล์ของคุณ: bitwork.com/@username"
        />

        <InputField
          label="อีเมล"
          type="email"
          name="email"
          value={data.email}
          onChange={onChange}
          placeholder="example@email.com"
          required
        />

        <InputField
          label="เบอร์โทรศัพท์"
          type="tel"
          name="phone"
          value={data.phone}
          onChange={onChange}
          placeholder="0812345678"
        />

        <div className="form-section">
          <h3 className="section-title">เกี่ยวกับตัวฉัน</h3>
          <div className="textarea-field">
            <label className="input-label">แนะนำตัว</label>
            <textarea
              name="bio"
              value={data.bio}
              onChange={onChange}
              placeholder="เขียนแนะนำตัวสั้นๆ เกี่ยวกับคุณ..."
              rows={4}
              className="input-textarea"
            />
            <span className="helper-text">
              {data.bio?.length || 0}/500 ตัวอักษร
            </span>
          </div>
        </div>
      </div>

      <div className="panel-footer">
        <button
          className="btn-outline"
          onClick={onReset}
          disabled={!hasChanges}
        >
          รีเซ็ต
        </button>
        <div className="footer-right">
          <button
            className="btn-secondary"
            onClick={onCancel}
            disabled={!hasChanges}
          >
            ยกเลิก
          </button>
          <button
            className="btn-primary"
            onClick={onSave}
            disabled={!hasChanges}
          >
            บันทึกการเปลี่ยนแปลง
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPanel;
