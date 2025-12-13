/**
 * ChatSettingsPanel.jsx - Chat Settings Panel
 * หน้าตั้งค่าแชท
 */
import React from "react";

const ChatSettingsPanel = ({
  data,
  onChange,
  onSave,
  onCancel,
  hasChanges,
}) => {
  return (
    <div className="settings-panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">ตั้งค่าแชท</h2>
          <p className="panel-description">
            ปรับแต่งการตั้งค่าข้อความและการสนทนา
          </p>
        </div>
      </div>

      <div className="panel-content">
        {/* Chat Availability */}
        <div className="settings-section">
          <h3 className="section-title">สถานะออนไลน์</h3>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">แสดงสถานะออนไลน์</span>
                <span className="setting-description">
                  ให้ผู้อื่นเห็นว่าคุณกำลังออนไลน์อยู่
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="showOnlineStatus"
                  defaultChecked={true}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">แสดงการอ่านข้อความ</span>
                <span className="setting-description">
                  ให้ผู้อื่นเห็นเมื่อคุณอ่านข้อความแล้ว
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="showReadReceipts"
                  defaultChecked={true}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">แสดงกำลังพิมพ์</span>
                <span className="setting-description">
                  ให้ผู้อื่นเห็นเมื่อคุณกำลังพิมพ์ข้อความ
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="showTyping"
                  defaultChecked={true}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Message Notifications */}
        <div className="settings-section">
          <h3 className="section-title">การแจ้งเตือนข้อความ</h3>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">เสียงแจ้งเตือน</span>
                <span className="setting-description">
                  เล่นเสียงเมื่อได้รับข้อความใหม่
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="messageSound"
                  defaultChecked={true}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">แจ้งเตือนบนเดสก์ท็อป</span>
                <span className="setting-description">
                  แสดงการแจ้งเตือนบนหน้าจอ
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="desktopNotification"
                  defaultChecked={true}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">แจ้งเตือนทางอีเมล</span>
                <span className="setting-description">
                  ส่งอีเมลเมื่อมีข้อความใหม่และคุณไม่ได้ออนไลน์
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="emailNotification"
                  defaultChecked={false}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="settings-section">
          <h3 className="section-title">ความเป็นส่วนตัว</h3>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">รับข้อความจากทุกคน</span>
                <span className="setting-description">
                  อนุญาตให้ทุกคนส่งข้อความถึงคุณได้
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="allowAllMessages"
                  defaultChecked={true}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">กรองข้อความสแปม</span>
                <span className="setting-description">
                  ซ่อนข้อความที่อาจเป็นสแปมโดยอัตโนมัติ
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="filterSpam"
                  defaultChecked={true}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Quick Replies */}
        <div className="settings-section">
          <h3 className="section-title">ข้อความตอบกลับด่วน</h3>
          <div className="settings-card">
            <div className="quick-replies-list">
              <div className="quick-reply-item">
                <span className="quick-reply-text">ขอบคุณที่ติดต่อมาครับ</span>
                <button className="quick-reply-edit">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
              <div className="quick-reply-item">
                <span className="quick-reply-text">
                  รอสักครู่นะครับ กำลังตรวจสอบให้
                </span>
                <button className="quick-reply-edit">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
              <div className="quick-reply-item">
                <span className="quick-reply-text">
                  สนใจสามารถนัดสัมภาษณ์ได้เลยครับ
                </span>
                <button className="quick-reply-edit">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
            </div>
            <button className="add-quick-reply-btn">
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
              เพิ่มข้อความตอบกลับด่วน
            </button>
          </div>
        </div>

        {/* Auto Reply */}
        <div className="settings-section">
          <h3 className="section-title">ตอบกลับอัตโนมัติ</h3>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-label">
                  เปิดใช้งานตอบกลับอัตโนมัติ
                </span>
                <span className="setting-description">
                  ส่งข้อความตอบกลับอัตโนมัติเมื่อไม่ได้ออนไลน์
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="autoReply"
                  defaultChecked={false}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="auto-reply-message">
              <label>ข้อความตอบกลับอัตโนมัติ</label>
              <textarea
                placeholder="ขอบคุณที่ติดต่อมาครับ ขณะนี้ไม่ได้ออนไลน์ จะตอบกลับโดยเร็วที่สุดครับ"
                rows={3}
                defaultValue=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSettingsPanel;
