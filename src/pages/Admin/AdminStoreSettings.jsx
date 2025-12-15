/**
 * AdminStoreSettings.jsx - Store Profile Settings
 * ตั้งค่าโปรไฟล์ร้านค้า - ธีมขาวเขียว Minimal
 * แสดงทุกส่วนในหน้าเดียว (Single Page Layout)
 */
import React, { useState } from "react";
import "./AdminStoreSettings.css";

// Import store data
// Import store data
import { storeInfo } from "../../data/constants";

const AdminStoreSettings = () => {
  // Store profile state
  const [storeData, setStoreData] = useState({
    name: storeInfo?.name || "Bitwork Store",
    description:
      storeInfo?.description || "ร้านขายอุปกรณ์ IT คุณภาพสูง",
    email: "contact@bitworkstore.com",
    phone: "02-123-4567",
    address: "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
    logo: "",
    banner: "",
    socialLinks: {
      facebook: "https://facebook.com/bitworkstore",
      instagram: "https://instagram.com/bitworkstore",
      line: "@bitworkstore",
      twitter: "",
    },
  });

  // Notification
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  // Handle input change
  const handleInputChange = (field, value) => {
    setStoreData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle social link change
  const handleSocialChange = (platform, value) => {
    setStoreData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
  };

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  // Save settings
  const handleSave = () => {
    // In real app, save to backend
    console.log("Saving store data:", storeData);
    showNotification("บันทึกการตั้งค่าสำเร็จ!");
  };

  return (
    <div className="store-settings-page">
      {/* Notification */}
      {notification.show && (
        <div className={`store-notification ${notification.type}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {notification.type === "success" ? (
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" />
            ) : (
              <circle cx="12" cy="12" r="10" />
            )}
          </svg>
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="store-settings-header">
        <div className="header-info">
          <h1>ตั้งค่าร้านค้า</h1>
          <p>จัดการข้อมูลและการตั้งค่าร้านค้าของคุณ</p>
        </div>
      </div>

      <div className="store-settings-content single-page">
        {/* Main Content - All Sections */}
        <div className="settings-main full-width">
          {/* Section 1: General Info */}
          <div className="settings-section">
            <div className="section-header">
              <div className="section-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <h2>ข้อมูลทั่วไป</h2>
                <p>ข้อมูลพื้นฐานของร้านค้า</p>
              </div>
            </div>

            {/* Store Logo & Banner */}
            <div className="media-upload-section">
              <div className="upload-item">
                <label>โลโก้ร้านค้า</label>
                <div className="upload-area logo-upload">
                  {storeData.logo ? (
                    <img src={storeData.logo} alt="Store Logo" />
                  ) : (
                    <div className="upload-placeholder">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <span>อัปโหลดโลโก้</span>
                      <small>แนะนำ 200x200 px</small>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="file-input" />
                </div>
              </div>

              <div className="upload-item banner-item">
                <label>แบนเนอร์ร้านค้า</label>
                <div className="upload-area banner-upload">
                  {storeData.banner ? (
                    <img src={storeData.banner} alt="Store Banner" />
                  ) : (
                    <div className="upload-placeholder">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <span>อัปโหลดแบนเนอร์</span>
                      <small>แนะนำ 1200x300 px</small>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="file-input" />
                </div>
              </div>
            </div>

            {/* Store Name */}
            <div className="form-group">
              <label>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                ชื่อร้านค้า
              </label>
              <input
                type="text"
                value={storeData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="กรอกชื่อร้านค้า"
              />
            </div>

            {/* Store Description */}
            <div className="form-group">
              <label>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="17" y1="10" x2="3" y2="10" />
                  <line x1="21" y1="6" x2="3" y2="6" />
                  <line x1="21" y1="14" x2="3" y2="14" />
                  <line x1="17" y1="18" x2="3" y2="18" />
                </svg>
                คำอธิบายร้านค้า
              </label>
              <textarea
                value={storeData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="อธิบายเกี่ยวกับร้านค้าของคุณ..."
                rows={4}
              />
              <span className="input-hint">
                {storeData.description.length}/500 ตัวอักษร
              </span>
            </div>
          </div>

          {/* Section 2: Contact Info */}
          <div className="settings-section">
            <div className="section-header">
              <div className="section-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h2>ข้อมูลติดต่อ</h2>
                <p>ข้อมูลสำหรับติดต่อร้านค้า</p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  อีเมล
                </label>
                <input
                  type="email"
                  value={storeData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="email@example.com"
                />
              </div>

              <div className="form-group">
                <label>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  value={storeData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="02-xxx-xxxx"
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                ที่อยู่ร้านค้า
              </label>
              <textarea
                value={storeData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="กรอกที่อยู่ร้านค้า..."
                rows={3}
              />
            </div>
          </div>

          {/* Section 3: Social Media */}
          <div className="settings-section">
            <div className="section-header">
              <div className="section-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </div>
              <div>
                <h2>โซเชียลมีเดีย</h2>
                <p>เชื่อมต่อโซเชียลมีเดียของร้านค้า</p>
              </div>
            </div>

            <div className="social-links">
              <div className="form-group social-input">
                <label>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1877F2"
                    strokeWidth="2"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  Facebook
                </label>
                <input
                  type="url"
                  value={storeData.socialLinks.facebook}
                  onChange={(e) =>
                    handleSocialChange("facebook", e.target.value)
                  }
                  placeholder="https://facebook.com/yourpage"
                />
              </div>

              <div className="form-group social-input">
                <label>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E4405F"
                    strokeWidth="2"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  Instagram
                </label>
                <input
                  type="url"
                  value={storeData.socialLinks.instagram}
                  onChange={(e) =>
                    handleSocialChange("instagram", e.target.value)
                  }
                  placeholder="https://instagram.com/yourpage"
                />
              </div>

              <div className="form-group social-input">
                <label>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00B900"
                    strokeWidth="2"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  LINE Official
                </label>
                <input
                  type="text"
                  value={storeData.socialLinks.line}
                  onChange={(e) => handleSocialChange("line", e.target.value)}
                  placeholder="@yourlineid"
                />
              </div>

              <div className="form-group social-input">
                <label>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1DA1F2"
                    strokeWidth="2"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                  Twitter / X
                </label>
                <input
                  type="url"
                  value={storeData.socialLinks.twitter}
                  onChange={(e) =>
                    handleSocialChange("twitter", e.target.value)
                  }
                  placeholder="https://twitter.com/yourpage"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="settings-save-section">
            <button className="btn-cancel">ยกเลิก</button>
            <button className="btn-save-full" onClick={handleSave}>
              บันทึกการเปลี่ยนแปลง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStoreSettings;
