/**
 * StorePanel.jsx - Store Management Panel (for Sellers)
 */
import React from "react";
import InputField from "./InputField";
import ToggleSwitch from "./ToggleSwitch";

const StorePanel = ({
  data,
  onChange,
  onSave,
  onCancel,
  hasChanges,
  onOpenModal,
}) => {
  return (
    <div className="settings-panel">
      <div className="panel-header">
        <h2 className="panel-title">จัดการร้านค้า</h2>
        <p className="panel-description">
          ตั้งค่าข้อมูลร้านค้าสำหรับการขายบริการ
        </p>
      </div>

      <div className="panel-content">
        {/* Store Status */}
        <div className="store-status-card">
          <div className="store-status-info">
            <span className="store-status-label">สถานะร้านค้า</span>
            <div className="store-status-value">
              {data.storeVerified ? (
                <span className="verified-badge">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  ร้านค้ายืนยันแล้ว
                </span>
              ) : data.verificationPending ? (
                <span className="pending-badge">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  รอการตรวจสอบ
                </span>
              ) : (
                <span className="unverified-badge">ยังไม่ได้ยืนยัน</span>
              )}
            </div>
          </div>
          {!data.storeVerified && !data.verificationPending && (
            <button
              className="btn-primary"
              onClick={() => onOpenModal("request-verify")}
            >
              ขอยืนยันร้านค้า
            </button>
          )}
        </div>

        {/* Store Logo & Banner */}
        <div className="form-section">
          <h3 className="section-title">รูปภาพร้านค้า</h3>

          <div className="image-upload-row">
            <div className="image-upload-item">
              <label className="input-label">โลโก้ร้านค้า</label>
              <div className="logo-upload-box">
                {data.storeLogo ? (
                  <img
                    src={data.storeLogo}
                    alt="Store Logo"
                    className="preview-logo"
                  />
                ) : (
                  <div className="upload-placeholder">
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
                    <span>อัปโหลดโลโก้</span>
                  </div>
                )}
              </div>
              <span className="helper-text">แนะนำ: 200x200px, ไม่เกิน 2MB</span>
            </div>

            <div className="image-upload-item banner">
              <label className="input-label">แบนเนอร์ร้านค้า</label>
              <div className="banner-upload-box">
                {data.storeBanner ? (
                  <img
                    src={data.storeBanner}
                    alt="Store Banner"
                    className="preview-banner"
                  />
                ) : (
                  <div className="upload-placeholder">
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
                    <span>อัปโหลดแบนเนอร์</span>
                  </div>
                )}
              </div>
              <span className="helper-text">
                แนะนำ: 1200x300px, ไม่เกิน 5MB
              </span>
            </div>
          </div>
        </div>

        {/* Store Information */}
        <div className="form-section">
          <h3 className="section-title">ข้อมูลร้านค้า</h3>

          <InputField
            label="ชื่อร้านค้า"
            name="storeName"
            value={data.storeName}
            onChange={onChange}
            placeholder="ชื่อร้านค้าของคุณ"
            required
          />

          <InputField
            label="URL ร้านค้า"
            name="storeUrl"
            value={data.storeUrl}
            onChange={onChange}
            placeholder="my-store"
            helperText={`bitwork.com/store/${data.storeUrl || "my-store"}`}
          />

          <div className="textarea-field">
            <label className="input-label">คำอธิบายร้านค้า</label>
            <textarea
              name="storeDescription"
              value={data.storeDescription}
              onChange={onChange}
              placeholder="อธิบายเกี่ยวกับร้านค้าและบริการของคุณ..."
              rows={4}
              className="input-textarea"
            />
          </div>

          <div className="form-grid">
            <InputField
              label="หมวดหมู่หลัก"
              name="storeCategory"
              value={data.storeCategory}
              onChange={onChange}
              placeholder="เช่น Web Development"
            />
            <InputField
              label="ที่ตั้ง"
              name="storeLocation"
              value={data.storeLocation}
              onChange={onChange}
              placeholder="เช่น กรุงเทพมหานคร"
            />
          </div>
        </div>

        {/* Store Settings */}
        <div className="form-section">
          <h3 className="section-title">ตั้งค่าร้านค้า</h3>

          <ToggleSwitch
            label="เปิดรับงานใหม่"
            description="เมื่อปิด ลูกค้าจะไม่สามารถจ้างงานใหม่ได้"
            name="acceptingOrders"
            checked={data.acceptingOrders}
            onChange={onChange}
          />

          <ToggleSwitch
            label="แสดงร้านค้าในผลการค้นหา"
            description="ให้ร้านค้าปรากฏในหน้า Marketplace"
            name="visibleInSearch"
            checked={data.visibleInSearch}
            onChange={onChange}
          />

          <ToggleSwitch
            label="เปิดรับข้อความจากลูกค้า"
            description="อนุญาตให้ลูกค้าส่งข้อความสอบถามได้"
            name="allowMessages"
            checked={data.allowMessages}
            onChange={onChange}
          />
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

export default StorePanel;
