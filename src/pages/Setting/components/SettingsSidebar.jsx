/**
 * SettingsSidebar.jsx - Settings Navigation Sidebar
 */
import React, { useState } from "react";
import "./SettingsSidebar.css";

const SettingsSidebar = ({
  activeMenu,
  onMenuChange,
  isMobileOpen,
  onMobileClose,
}) => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const menuItems = [
    {
      id: "account",
      label: "ข้อมูลบัญชี",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: "jobprofile",
      label: "โปรไฟล์นายจ้าง",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      hasSubmenu: true,
      submenu: [
        { id: "jobprofile", label: "ข้อมูลนายจ้าง" },
        { id: "job-post", label: "โพสหางาน" },
        { id: "job-post-history", label: "ประวัติการโพส" },
        { id: "job-applicants", label: "ผู้สมัครงาน" },
      ],
    },
    {
      id: "security",
      label: "ความปลอดภัย",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      id: "payment",
      label: "การเงินและธุรกรรม",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
    },
    {
      id: "store",
      label: "จัดการร้านค้า",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      hasSubmenu: true,
      submenu: [
        { id: "store", label: "ตั้งค่าร้านค้า" },
        { id: "store-dashboard", label: "Dashboard" },
        { id: "store-products", label: "สินค้าที่ขายอยู่" },
        { id: "store-orders", label: "คำสั่งซื้อ" },
        { id: "store-sales-history", label: "ประวัติการขาย" },
        { id: "store-analytics", label: "สถิติและรายงาน" },
      ],
    },
    {
      id: "notification",
      label: "การแจ้งเตือน",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
    {
      id: "chat-settings",
      label: "ตั้งค่าแชท",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: "theme",
      label: "ธีมและการแสดงผล",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ),
    },
    {
      id: "social",
      label: "เชื่อมต่อบัญชี",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="sidebar-overlay" onClick={onMobileClose}></div>
      )}

      <aside
        className={`settings-sidebar ${isMobileOpen ? "mobile-open" : ""}`}
      >
        <div className="sidebar-header">
          <h2 className="sidebar-title">ตั้งค่า</h2>
          <button className="sidebar-close" onClick={onMobileClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item-wrapper">
              <button
                className={`sidebar-menu-item ${
                  activeMenu === item.id ||
                  (item.submenu &&
                    item.submenu.some((sub) => sub.id === activeMenu))
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  if (item.hasSubmenu) {
                    setExpandedMenu(expandedMenu === item.id ? null : item.id);
                  } else {
                    onMenuChange(item.id);
                    onMobileClose();
                  }
                }}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
                {item.badge && <span className="menu-badge">{item.badge}</span>}
                {item.hasSubmenu && (
                  <svg
                    className={`submenu-arrow ${
                      expandedMenu === item.id ? "expanded" : ""
                    }`}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </button>

              {/* Submenu */}
              {item.hasSubmenu && expandedMenu === item.id && (
                <div className="submenu">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.id}
                      className={`submenu-item ${
                        activeMenu === subItem.id ? "active" : ""
                      }`}
                      onClick={() => {
                        onMenuChange(subItem.id);
                        onMobileClose();
                      }}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default SettingsSidebar;
