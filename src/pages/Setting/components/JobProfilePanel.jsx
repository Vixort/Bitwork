/**
 * JobProfilePanel.jsx - Job Posting Profile Settings Panel
 *
 * สำหรับตั้งค่าข้อมูลบริษัท/นายจ้างในการโพสหาคนสมัครงาน
 */
import React from "react";
import InputField from "./InputField";
import ToggleSwitch from "./ToggleSwitch";

const JobProfilePanel = ({
  data,
  onChange,
  onSave,
  onCancel,
  hasChanges,
  onOpenModal,
}) => {
  // ประเภทธุรกิจ
  const businessTypes = [
    { value: "", label: "เลือกประเภทธุรกิจ" },
    { value: "startup", label: "Startup" },
    { value: "sme", label: "SME (วิสาหกิจขนาดกลางและขนาดย่อม)" },
    { value: "corporate", label: "Corporate (บริษัทขนาดใหญ่)" },
    { value: "agency", label: "Agency / Software House" },
    { value: "freelance", label: "Freelance / Independent" },
    { value: "government", label: "หน่วยงานราชการ" },
    { value: "ngo", label: "องค์กรไม่แสวงหากำไร (NGO)" },
  ];

  // จำนวนพนักงาน
  const employeeCounts = [
    { value: "", label: "เลือกจำนวนพนักงาน" },
    { value: "1-10", label: "1-10 คน" },
    { value: "11-50", label: "11-50 คน" },
    { value: "51-200", label: "51-200 คน" },
    { value: "201-500", label: "201-500 คน" },
    { value: "501-1000", label: "501-1,000 คน" },
    { value: "1000+", label: "มากกว่า 1,000 คน" },
  ];

  // อุตสาหกรรม
  const industries = [
    { value: "", label: "เลือกอุตสาหกรรม" },
    { value: "technology", label: "เทคโนโลยี / IT" },
    { value: "finance", label: "การเงิน / ธนาคาร" },
    { value: "ecommerce", label: "E-Commerce" },
    { value: "healthcare", label: "สุขภาพ / การแพทย์" },
    { value: "education", label: "การศึกษา" },
    { value: "media", label: "สื่อ / โฆษณา" },
    { value: "manufacturing", label: "การผลิต" },
    { value: "logistics", label: "โลจิสติกส์ / ขนส่ง" },
    { value: "hospitality", label: "โรงแรม / ท่องเที่ยว" },
    { value: "retail", label: "ค้าปลีก" },
    { value: "consulting", label: "ที่ปรึกษา" },
    { value: "other", label: "อื่นๆ" },
  ];

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <h2 className="panel-title">โปรไฟล์นายจ้าง / บริษัท</h2>
        <p className="panel-description">
          ตั้งค่าข้อมูลบริษัทหรือนายจ้างสำหรับการโพสหาคนสมัครงานใน Job Board
        </p>
      </div>

      <div className="panel-content">
        {/* Company Verification Status */}
        <div className="store-status-card">
          <div className="store-status-info">
            <span className="store-status-label">สถานะการยืนยันบริษัท</span>
            <div className="store-status-value">
              {data.companyVerified ? (
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
                  บริษัทยืนยันแล้ว
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
          {!data.companyVerified && !data.verificationPending && (
            <button
              className="btn-primary"
              onClick={() => onOpenModal("request-company-verify")}
            >
              ขอยืนยันบริษัท
            </button>
          )}
        </div>

        {/* Company Logo */}
        <div className="form-section">
          <h3 className="section-title">โลโก้บริษัท</h3>
          <div className="image-upload-row">
            <div className="image-upload-item">
              <div className="logo-upload-box">
                {data.companyLogo ? (
                  <img
                    src={data.companyLogo}
                    alt="Company Logo"
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
              <span className="helper-text">
                แนะนำ: 400x400px, PNG หรือ JPG, ไม่เกิน 2MB
              </span>
            </div>
          </div>
        </div>

        {/* Company Basic Info */}
        <div className="form-section">
          <h3 className="section-title">ข้อมูลบริษัท</h3>

          <InputField
            label="ชื่อบริษัท / องค์กร"
            name="companyName"
            value={data.companyName}
            onChange={onChange}
            placeholder="ชื่อบริษัทของคุณ"
            required
          />

          <InputField
            label="ชื่อบริษัท (ภาษาอังกฤษ)"
            name="companyNameEn"
            value={data.companyNameEn}
            onChange={onChange}
            placeholder="Company Name in English"
          />

          <div className="form-grid">
            <div className="select-field">
              <label className="input-label">ประเภทธุรกิจ</label>
              <select
                name="businessType"
                value={data.businessType}
                onChange={onChange}
                className="input-select"
              >
                {businessTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="select-field">
              <label className="input-label">อุตสาหกรรม</label>
              <select
                name="industry"
                value={data.industry}
                onChange={onChange}
                className="input-select"
              >
                {industries.map((ind) => (
                  <option key={ind.value} value={ind.value}>
                    {ind.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="select-field">
              <label className="input-label">จำนวนพนักงาน</label>
              <select
                name="employeeCount"
                value={data.employeeCount}
                onChange={onChange}
                className="input-select"
              >
                {employeeCounts.map((count) => (
                  <option key={count.value} value={count.value}>
                    {count.label}
                  </option>
                ))}
              </select>
            </div>

            <InputField
              label="ปีที่ก่อตั้ง"
              name="foundedYear"
              value={data.foundedYear}
              onChange={onChange}
              placeholder="เช่น 2015"
              type="number"
            />
          </div>

          <div className="textarea-field">
            <label className="input-label">เกี่ยวกับบริษัท</label>
            <textarea
              name="companyDescription"
              value={data.companyDescription}
              onChange={onChange}
              placeholder="อธิบายเกี่ยวกับบริษัท วัฒนธรรมองค์กร สิ่งที่บริษัททำ..."
              rows={4}
              className="input-textarea"
            />
            <span className="helper-text">
              {data.companyDescription?.length || 0}/1000 ตัวอักษร
            </span>
          </div>
        </div>

        {/* Contact & Location */}
        <div className="form-section">
          <h3 className="section-title">ที่อยู่และการติดต่อ</h3>

          <InputField
            label="ที่อยู่สำนักงาน"
            name="companyAddress"
            value={data.companyAddress}
            onChange={onChange}
            placeholder="เลขที่ อาคาร ถนน แขวง/ตำบล เขต/อำเภอ"
          />

          <div className="form-grid">
            <InputField
              label="จังหวัด"
              name="companyProvince"
              value={data.companyProvince}
              onChange={onChange}
              placeholder="เช่น กรุงเทพมหานคร"
            />

            <InputField
              label="รหัสไปรษณีย์"
              name="companyPostcode"
              value={data.companyPostcode}
              onChange={onChange}
              placeholder="เช่น 10110"
            />
          </div>

          <div className="form-grid">
            <InputField
              label="อีเมลติดต่อ HR"
              type="email"
              name="hrEmail"
              value={data.hrEmail}
              onChange={onChange}
              placeholder="hr@company.com"
            />

            <InputField
              label="เบอร์โทรศัพท์ HR"
              type="tel"
              name="hrPhone"
              value={data.hrPhone}
              onChange={onChange}
              placeholder="02-xxx-xxxx"
            />
          </div>
        </div>

        {/* Company Website & Social */}
        <div className="form-section">
          <h3 className="section-title">เว็บไซต์และโซเชียลมีเดีย</h3>

          <InputField
            label="เว็บไซต์บริษัท"
            name="companyWebsite"
            value={data.companyWebsite}
            onChange={onChange}
            placeholder="https://www.company.com"
          />

          <div className="form-grid">
            <InputField
              label="LinkedIn"
              name="linkedinUrl"
              value={data.linkedinUrl}
              onChange={onChange}
              placeholder="https://linkedin.com/company/..."
            />

            <InputField
              label="Facebook"
              name="facebookUrl"
              value={data.facebookUrl}
              onChange={onChange}
              placeholder="https://facebook.com/..."
            />
          </div>
        </div>

        {/* Job Posting Settings */}
        <div className="form-section">
          <h3 className="section-title">ตั้งค่าการโพสงาน</h3>

          <ToggleSwitch
            label="เปิดรับสมัครงาน"
            description="เมื่อเปิด จะสามารถโพสประกาศหางานได้"
            name="acceptingApplications"
            checked={data.acceptingApplications}
            onChange={onChange}
          />

          <ToggleSwitch
            label="แสดงในหน้า Job Board"
            description="ให้ประกาศงานปรากฏในหน้ารวมประกาศงาน"
            name="visibleInJobBoard"
            checked={data.visibleInJobBoard}
            onChange={onChange}
          />

          <ToggleSwitch
            label="รับการสมัครผ่าน Bitwork"
            description="อนุญาตให้ผู้สมัครส่งใบสมัครผ่านระบบ Bitwork"
            name="acceptBitworkApplications"
            checked={data.acceptBitworkApplications}
            onChange={onChange}
          />

          <ToggleSwitch
            label="แจ้งเตือนเมื่อมีผู้สมัครใหม่"
            description="รับอีเมลแจ้งเตือนเมื่อมีผู้สมัครงานใหม่"
            name="notifyNewApplicants"
            checked={data.notifyNewApplicants}
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

export default JobProfilePanel;
