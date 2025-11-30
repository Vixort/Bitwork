/**
 * NotificationPanel.jsx - Notification Settings Panel
 */
import React from "react";
import ToggleSwitch from "./ToggleSwitch";

const NotificationPanel = ({
  data,
  onChange,
  onSave,
  onCancel,
  hasChanges,
}) => {
  return (
    <div className="settings-panel">
      <div className="panel-header">
        <h2 className="panel-title">การแจ้งเตือน</h2>
        <p className="panel-description">
          จัดการวิธีรับการแจ้งเตือนจาก Bitwork
        </p>
      </div>

      <div className="panel-content">
        {/* Email Notifications */}
        <div className="form-section">
          <h3 className="section-title">การแจ้งเตือนทางอีเมล</h3>

          <ToggleSwitch
            label="การแจ้งเตือนงานใหม่"
            description="รับอีเมลเมื่อมีงานใหม่ที่ตรงกับความสนใจของคุณ"
            name="emailNewJobs"
            checked={data.emailNewJobs}
            onChange={onChange}
          />

          <ToggleSwitch
            label="การแจ้งเตือนข้อความ"
            description="รับอีเมลเมื่อมีข้อความใหม่"
            name="emailMessages"
            checked={data.emailMessages}
            onChange={onChange}
          />

          <ToggleSwitch
            label="การแจ้งเตือนคำสั่งซื้อ"
            description="รับอีเมลเมื่อมีคำสั่งซื้อใหม่หรืออัปเดตสถานะ"
            name="emailOrders"
            checked={data.emailOrders}
            onChange={onChange}
          />

          <ToggleSwitch
            label="สรุปรายสัปดาห์"
            description="รับอีเมลสรุปกิจกรรมประจำสัปดาห์"
            name="emailWeeklySummary"
            checked={data.emailWeeklySummary}
            onChange={onChange}
          />

          <ToggleSwitch
            label="ข่าวสารและโปรโมชั่น"
            description="รับข่าวสารและโปรโมชั่นพิเศษจาก Bitwork"
            name="emailPromotions"
            checked={data.emailPromotions}
            onChange={onChange}
          />
        </div>

        {/* Push Notifications */}
        <div className="form-section">
          <h3 className="section-title">การแจ้งเตือนบนเว็บไซต์</h3>

          <ToggleSwitch
            label="เปิดการแจ้งเตือน Push"
            description="รับการแจ้งเตือนแบบ Push บน Browser"
            name="pushEnabled"
            checked={data.pushEnabled}
            onChange={onChange}
          />

          <ToggleSwitch
            label="เสียงแจ้งเตือน"
            description="เล่นเสียงเมื่อมีการแจ้งเตือนใหม่"
            name="soundEnabled"
            checked={data.soundEnabled}
            onChange={onChange}
            disabled={!data.pushEnabled}
          />
        </div>

        {/* In-App Notifications */}
        <div className="form-section">
          <h3 className="section-title">การแจ้งเตือนในแอป</h3>

          <ToggleSwitch
            label="การกล่าวถึง (@mentions)"
            description="แจ้งเตือนเมื่อมีคนกล่าวถึงคุณ"
            name="notifyMentions"
            checked={data.notifyMentions}
            onChange={onChange}
          />

          <ToggleSwitch
            label="ความคิดเห็นและรีวิว"
            description="แจ้งเตือนเมื่อมีรีวิวหรือความคิดเห็นใหม่"
            name="notifyComments"
            checked={data.notifyComments}
            onChange={onChange}
          />

          <ToggleSwitch
            label="ผู้ติดตามใหม่"
            description="แจ้งเตือนเมื่อมีคนติดตามคุณ"
            name="notifyFollowers"
            checked={data.notifyFollowers}
            onChange={onChange}
          />

          <ToggleSwitch
            label="การชำระเงิน"
            description="แจ้งเตือนเมื่อมีการชำระเงินหรือรับเงิน"
            name="notifyPayments"
            checked={data.notifyPayments}
            onChange={onChange}
          />
        </div>

        {/* SMS Notifications */}
        <div className="form-section">
          <h3 className="section-title">การแจ้งเตือนทาง SMS</h3>

          <ToggleSwitch
            label="เปิดการแจ้งเตือน SMS"
            description="รับ SMS สำหรับการแจ้งเตือนสำคัญ"
            name="smsEnabled"
            checked={data.smsEnabled}
            onChange={onChange}
          />

          <ToggleSwitch
            label="รหัส OTP และความปลอดภัย"
            description="รับ SMS สำหรับรหัส OTP และการแจ้งเตือนความปลอดภัย"
            name="smsSecurityAlerts"
            checked={data.smsSecurityAlerts}
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

export default NotificationPanel;
