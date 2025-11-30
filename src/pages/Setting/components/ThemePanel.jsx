/**
 * ThemePanel.jsx - Theme & Display Settings Panel
 */
import React from "react";

const ThemePanel = ({ data, onChange, onSave, onCancel, hasChanges }) => {
  const themes = [
    { id: "light", label: "Light Mode", icon: "☀️" },
    { id: "dark", label: "Dark Mode", icon: "🌙" },
    { id: "system", label: "ตามระบบ", icon: "💻" },
  ];

  const languages = [
    { id: "th", label: "ภาษาไทย", flag: "🇹🇭" },
    { id: "en", label: "English", flag: "🇺🇸" },
  ];

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <h2 className="panel-title">ธีมและการแสดงผล</h2>
        <p className="panel-description">ปรับแต่งรูปลักษณ์ของเว็บไซต์</p>
      </div>

      <div className="panel-content">
        {/* Theme Selection */}
        <div className="form-section">
          <h3 className="section-title">ธีมสี</h3>
          <div className="theme-options">
            {themes.map((theme) => (
              <label
                key={theme.id}
                className={`theme-option ${
                  data.theme === theme.id ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="theme"
                  value={theme.id}
                  checked={data.theme === theme.id}
                  onChange={onChange}
                />
                <div className="theme-preview">
                  <div className={`theme-demo ${theme.id}`}>
                    <div className="demo-header"></div>
                    <div className="demo-sidebar"></div>
                    <div className="demo-content">
                      <div className="demo-line"></div>
                      <div className="demo-line short"></div>
                    </div>
                  </div>
                </div>
                <div className="theme-info">
                  <span className="theme-icon">{theme.icon}</span>
                  <span className="theme-label">{theme.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div className="form-section">
          <h3 className="section-title">ภาษา</h3>
          <div className="language-options">
            {languages.map((lang) => (
              <label
                key={lang.id}
                className={`language-option ${
                  data.language === lang.id ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="language"
                  value={lang.id}
                  checked={data.language === lang.id}
                  onChange={onChange}
                />
                <span className="language-flag">{lang.flag}</span>
                <span className="language-label">{lang.label}</span>
                {data.language === lang.id && (
                  <svg
                    className="check-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="form-section">
          <h3 className="section-title">ขนาดตัวอักษร</h3>
          <div className="font-size-selector">
            <span className="font-label small">A</span>
            <input
              type="range"
              name="fontSize"
              min="12"
              max="20"
              value={data.fontSize}
              onChange={onChange}
              className="font-slider"
            />
            <span className="font-label large">A</span>
          </div>
          <span className="font-size-value">{data.fontSize}px</span>
        </div>

        {/* Accessibility */}
        <div className="form-section">
          <h3 className="section-title">การเข้าถึง</h3>
          <div className="accessibility-options">
            <label className="checkbox-option">
              <input
                type="checkbox"
                name="reduceMotion"
                checked={data.reduceMotion}
                onChange={onChange}
              />
              <span className="checkbox-label">
                <strong>ลดการเคลื่อนไหว</strong>
                <span>ลด Animation และ Transition</span>
              </span>
            </label>
            <label className="checkbox-option">
              <input
                type="checkbox"
                name="highContrast"
                checked={data.highContrast}
                onChange={onChange}
              />
              <span className="checkbox-label">
                <strong>คอนทราสต์สูง</strong>
                <span>เพิ่มความชัดเจนของสีและขอบ</span>
              </span>
            </label>
          </div>
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

export default ThemePanel;
