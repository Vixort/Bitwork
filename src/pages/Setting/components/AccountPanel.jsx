/**
 * AccountPanel.jsx - Account Settings Panel
 * แก้ไขข้อมูลบัญชีและเชื่อมต่อกับหน้าโปรไฟล์สาธารณะ
 */
import React, { useState } from "react";
import { useNavigate } from "react-router";
import InputField from "./InputField";

const AccountPanel = ({
  data,
  onChange,
  onSave,
  onCancel,
  onReset,
  hasChanges,
}) => {
  const navigate = useNavigate();
  const [newSkill, setNewSkill] = useState("");

  // Handle adding skill
  const handleAddSkill = () => {
    if (newSkill.trim() && !data.skills?.includes(newSkill.trim())) {
      const updatedSkills = [...(data.skills || []), newSkill.trim()];
      onChange({ target: { name: "skills", value: updatedSkills } });
      setNewSkill("");
    }
  };

  // Handle removing skill
  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = (data.skills || []).filter(
      (skill) => skill !== skillToRemove
    );
    onChange({ target: { name: "skills", value: updatedSkills } });
  };

  // Handle key press for adding skill
  const handleSkillKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">ข้อมูลบัญชี</h2>
          <p className="panel-description">
            จัดการข้อมูลส่วนตัวและข้อมูลติดต่อของคุณ
          </p>
        </div>
        <button
          className="btn-view-profile"
          onClick={() => navigate(`/profile/${data.username}`)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          ดูโปรไฟล์สาธารณะ
        </button>
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

        {/* Cover Image */}
        <div className="form-section">
          <h3 className="section-title">รูปภาพหน้าปก</h3>
          <div className="cover-upload-section">
            {data.coverImage ? (
              <div className="cover-preview">
                <img src={data.coverImage} alt="Cover" />
                <button
                  className="btn-remove-cover"
                  onClick={() =>
                    onChange({ target: { name: "coverImage", value: "" } })
                  }
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="cover-upload-placeholder">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>อัปโหลดรูปหน้าปก</span>
                <span className="helper-text">แนะนำขนาด 1200 x 300 px</span>
              </div>
            )}
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
          helperText={`URL โปรไฟล์ของคุณ: bitwork.com/profile/${data.username}`}
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

        <div className="form-grid">
          <InputField
            label="ที่อยู่ / สถานที่"
            name="location"
            value={data.location || ""}
            onChange={onChange}
            placeholder="เช่น กรุงเทพมหานคร, ประเทศไทย"
          />
          <InputField
            label="เว็บไซต์"
            name="website"
            value={data.website || ""}
            onChange={onChange}
            placeholder="https://yourwebsite.com"
          />
        </div>

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

        {/* Skills Section */}
        <div className="form-section">
          <h3 className="section-title">ทักษะ</h3>
          <p className="section-description">
            เพิ่มทักษะเพื่อแสดงในโปรไฟล์สาธารณะ
          </p>
          <div className="skills-input-section">
            <div className="skill-input-wrapper">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleSkillKeyPress}
                placeholder="พิมพ์ทักษะแล้วกด Enter"
                className="skill-input"
              />
              <button
                type="button"
                className="btn-add-skill"
                onClick={handleAddSkill}
                disabled={!newSkill.trim()}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                เพิ่ม
              </button>
            </div>
            <div className="skills-tags">
              {(data.skills || []).map((skill, idx) => (
                <span key={idx} className="skill-tag-editable">
                  {skill}
                  <button
                    type="button"
                    className="btn-remove-skill"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </span>
              ))}
              {(!data.skills || data.skills.length === 0) && (
                <span className="no-skills-text">ยังไม่มีทักษะ</span>
              )}
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="form-section">
          <h3 className="section-title">โซเชียลมีเดีย</h3>
          <p className="section-description">
            เชื่อมต่อโปรไฟล์โซเชียลมีเดียของคุณ
          </p>
          <div className="social-inputs">
            <div className="social-input-row">
              <div className="social-icon github">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <input
                type="text"
                name="githubUrl"
                value={data.githubUrl || ""}
                onChange={onChange}
                placeholder="https://github.com/username"
                className="social-input"
              />
            </div>
            <div className="social-input-row">
              <div className="social-icon linkedin">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <input
                type="text"
                name="linkedinUrl"
                value={data.linkedinUrl || ""}
                onChange={onChange}
                placeholder="https://linkedin.com/in/username"
                className="social-input"
              />
            </div>
            <div className="social-input-row">
              <div className="social-icon twitter">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <input
                type="text"
                name="twitterUrl"
                value={data.twitterUrl || ""}
                onChange={onChange}
                placeholder="https://twitter.com/username"
                className="social-input"
              />
            </div>
            <div className="social-input-row">
              <div className="social-icon facebook">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <input
                type="text"
                name="facebookUrl"
                value={data.facebookUrl || ""}
                onChange={onChange}
                placeholder="https://facebook.com/username"
                className="social-input"
              />
            </div>
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
