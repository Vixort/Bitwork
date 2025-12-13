/**
 * JobPostPanel.jsx - Create New Job Post
 * หน้าสำหรับสร้างประกาศรับสมัครงานใหม่
 */
import React, { useState } from "react";
import InputField from "./InputField";

const JobPostPanel = ({ onSave, showNotification }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: "full-time",
    workLocation: "onsite",
    province: "",
    district: "",
    salaryMin: "",
    salaryMax: "",
    salaryNegotiable: false,
    jobDescription: "",
    requirements: "",
    benefits: "",
    skills: [],
    experienceLevel: "entry",
    educationLevel: "bachelor",
    applicationDeadline: "",
    positions: "1",
    contactEmail: "",
    contactPhone: "",
    isUrgent: false,
    allowRemote: false,
  });

  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Post Data:", formData);
    // TODO: API call to submit job post
  };

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">โพสหางาน</h2>
          <p className="panel-description">
            สร้างประกาศรับสมัครงานใหม่เพื่อหาผู้สมัครที่เหมาะสม
          </p>
        </div>
      </div>

      <form className="panel-content" onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="form-section">
          <h3 className="section-title">ข้อมูลตำแหน่งงาน</h3>

          <InputField
            label="ชื่อตำแหน่งงาน"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="เช่น Frontend Developer, Marketing Manager"
            required
          />

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">ประเภทงาน</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="full-time">งานประจำ (Full-time)</option>
                <option value="part-time">งาน Part-time</option>
                <option value="contract">สัญญาจ้าง</option>
                <option value="freelance">Freelance</option>
                <option value="internship">ฝึกงาน</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">รูปแบบการทำงาน</label>
              <select
                name="workLocation"
                value={formData.workLocation}
                onChange={handleChange}
                className="form-select"
              >
                <option value="onsite">ทำงานที่ออฟฟิศ</option>
                <option value="remote">Work from Home</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <InputField
              label="จังหวัด"
              name="province"
              value={formData.province}
              onChange={handleChange}
              placeholder="เช่น กรุงเทพมหานคร"
            />
            <InputField
              label="เขต/อำเภอ"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="เช่น จตุจักร"
            />
          </div>

          <div className="form-row">
            <InputField
              label="จำนวนที่รับ (ตำแหน่ง)"
              name="positions"
              type="number"
              value={formData.positions}
              onChange={handleChange}
              min="1"
            />
            <InputField
              label="วันปิดรับสมัคร"
              name="applicationDeadline"
              type="date"
              value={formData.applicationDeadline}
              onChange={handleChange}
            />
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isUrgent"
                checked={formData.isUrgent}
                onChange={handleChange}
              />
              <span className="checkbox-text">🔥 ด่วน! ต้องการคนทันที</span>
            </label>
          </div>
        </div>

        {/* Salary */}
        <div className="form-section">
          <h3 className="section-title">เงินเดือนและค่าตอบแทน</h3>

          <div className="form-row">
            <InputField
              label="เงินเดือนต่ำสุด (บาท)"
              name="salaryMin"
              type="number"
              value={formData.salaryMin}
              onChange={handleChange}
              placeholder="15000"
            />
            <InputField
              label="เงินเดือนสูงสุด (บาท)"
              name="salaryMax"
              type="number"
              value={formData.salaryMax}
              onChange={handleChange}
              placeholder="30000"
            />
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="salaryNegotiable"
                checked={formData.salaryNegotiable}
                onChange={handleChange}
              />
              <span className="checkbox-text">เงินเดือนสามารถต่อรองได้</span>
            </label>
          </div>
        </div>

        {/* Requirements */}
        <div className="form-section">
          <h3 className="section-title">คุณสมบัติที่ต้องการ</h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">ระดับประสบการณ์</label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="form-select"
              >
                <option value="entry">ไม่ต้องมีประสบการณ์ (Entry Level)</option>
                <option value="junior">1-2 ปี (Junior)</option>
                <option value="mid">3-5 ปี (Mid Level)</option>
                <option value="senior">5+ ปี (Senior)</option>
                <option value="lead">Lead/Manager</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">วุฒิการศึกษาขั้นต่ำ</label>
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                className="form-select"
              >
                <option value="any">ไม่จำกัดวุฒิ</option>
                <option value="highschool">มัธยมศึกษาตอนปลาย</option>
                <option value="vocational">ปวช./ปวส.</option>
                <option value="bachelor">ปริญญาตรี</option>
                <option value="master">ปริญญาโท</option>
                <option value="phd">ปริญญาเอก</option>
              </select>
            </div>
          </div>

          {/* Skills */}
          <div className="form-group">
            <label className="form-label">ทักษะที่ต้องการ</label>
            <div className="skill-input-row">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddSkill())
                }
                placeholder="พิมพ์ทักษะแล้วกด Enter"
                className="form-input"
              />
              <button
                type="button"
                className="btn-add-skill"
                onClick={handleAddSkill}
              >
                เพิ่ม
              </button>
            </div>
            <div className="skills-list">
              {formData.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  <button
                    type="button"
                    className="skill-remove"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="form-section">
          <h3 className="section-title">รายละเอียดงาน</h3>

          <div className="form-group">
            <label className="form-label">รายละเอียดตำแหน่งงาน</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              className="form-textarea"
              rows="6"
              placeholder="อธิบายหน้าที่และความรับผิดชอบของตำแหน่งนี้..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">คุณสมบัติผู้สมัคร</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="form-textarea"
              rows="4"
              placeholder="- มีประสบการณ์...&#10;- สามารถใช้...&#10;- มีความรู้ด้าน..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">สวัสดิการและสิทธิประโยชน์</label>
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              className="form-textarea"
              rows="4"
              placeholder="- ประกันสังคม&#10;- โบนัสประจำปี&#10;- วันหยุดพักร้อน..."
            />
          </div>
        </div>

        {/* Contact */}
        <div className="form-section">
          <h3 className="section-title">ข้อมูลติดต่อ</h3>

          <div className="form-row">
            <InputField
              label="อีเมลสำหรับรับใบสมัคร"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="hr@company.com"
            />
            <InputField
              label="เบอร์โทรติดต่อ"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="02-xxx-xxxx"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="panel-footer">
          <button type="button" className="btn-secondary">
            บันทึกแบบร่าง
          </button>
          <div className="footer-right">
            <button type="button" className="btn-secondary">
              ดูตัวอย่าง
            </button>
            <button type="submit" className="btn-primary">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              เผยแพร่ประกาศ
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobPostPanel;
