/**
 * AdminCategories.jsx - Category Management (Card Layout)
 */
import React, { useState } from "react";
import "./AdminCategories.css";

const initialCategories = [
  {
    id: 1,
    name: "การ์ดจอ (GPU)",
    productCount: 45,
    icon: "🎮",
    color: "#3b82f6",
  },
  {
    id: 2,
    name: "ซีพียู (CPU)",
    productCount: 32,
    icon: "🔲",
    color: "#8b5cf6",
  },
  { id: 3, name: "แรม (RAM)", productCount: 28, icon: "💾", color: "#10b981" },
  { id: 4, name: "เมนบอร์ด", productCount: 21, icon: "🖥️", color: "#f59e0b" },
  { id: 5, name: "SSD / HDD", productCount: 35, icon: "💿", color: "#ef4444" },
  {
    id: 6,
    name: "เคสคอมพิวเตอร์",
    productCount: 18,
    icon: "🗄️",
    color: "#6366f1",
  },
  {
    id: 7,
    name: "พาวเวอร์ซัพพลาย (PSU)",
    productCount: 15,
    icon: "⚡",
    color: "#14b8a6",
  },
  {
    id: 8,
    name: "ระบบระบายความร้อน",
    productCount: 12,
    icon: "❄️",
    color: "#f97316",
  },
  {
    id: 9,
    name: "จอมอนิเตอร์",
    productCount: 22,
    icon: "🖥️",
    color: "#ec4899",
  },
  {
    id: 10,
    name: "คีย์บอร์ด / เมาส์",
    productCount: 40,
    icon: "⌨️",
    color: "#22c55e",
  },
  {
    id: 11,
    name: "หูฟัง / ลำโพง",
    productCount: 25,
    icon: "🎧",
    color: "#a855f7",
  },
  {
    id: 12,
    name: "อุปกรณ์เครือข่าย",
    productCount: 16,
    icon: "📡",
    color: "#0ea5e9",
  },
];

function AdminCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    icon: "📦",
    color: "#10b981",
  });

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ name: "", icon: "📦", color: "#10b981" });
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      icon: category.icon,
      color: category.color,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("คุณต้องการลบหมวดหมู่นี้หรือไม่?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, ...formData } : cat
        )
      );
    } else {
      const newCategory = { id: Date.now(), ...formData, productCount: 0 };
      setCategories([...categories, newCategory]);
    }
    setShowModal(false);
  };

  const icons = [
    "🎮",
    "💻",
    "🔲",
    "💾",
    "🖥️",
    "💿",
    "🗄️",
    "⚡",
    "❄️",
    "⌨️",
    "🎧",
    "📡",
    "📱",
    "🔌",
    "📷",
    "🔋",
  ];
  const colors = [
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#22c55e",
    "#6366f1",
    "#14b8a6",
    "#f97316",
  ];

  return (
    <div className="admin-categories-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-title">
          <h1>หมวดหมู่สินค้า</h1>
          <p>จัดการหมวดหมู่สินค้าในร้านของคุณ</p>
        </div>
        <button className="btn-primary" onClick={handleAdd}>
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
          เพิ่มหมวดหมู่
        </button>
      </div>

      {/* Search */}
      <div className="search-bar">
        <div className="search-input">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="ค้นหาหมวดหมู่..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span className="count">{filteredCategories.length} หมวดหมู่</span>
      </div>

      {/* Categories Grid */}
      <div className="categories-grid">
        {filteredCategories.map((category) => (
          <div key={category.id} className="category-card">
            <div
              className="category-icon"
              style={{
                background: `${category.color}15`,
                color: category.color,
              }}
            >
              <span>{category.icon}</span>
            </div>
            <div className="category-info">
              <h3>{category.name}</h3>
              <span className="product-count">
                {category.productCount} สินค้า
              </span>
            </div>
            <div className="category-actions">
              <button
                className="btn-icon"
                onClick={() => handleEdit(category)}
                title="แก้ไข"
              >
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
              <button
                className="btn-icon delete"
                onClick={() => handleDelete(category.id)}
                title="ลบ"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="empty-state">
            <p>ไม่พบหมวดหมู่</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingCategory ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่"}</h3>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <svg
                  width="20"
                  height="20"
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
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>ชื่อหมวดหมู่</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>ไอคอน</label>
                  <div className="icon-picker">
                    {icons.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        className={formData.icon === icon ? "active" : ""}
                        onClick={() => setFormData({ ...formData, icon })}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>สี</label>
                  <div className="color-picker">
                    {colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={formData.color === color ? "active" : ""}
                        style={{ background: color }}
                        onClick={() => setFormData({ ...formData, color })}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  ยกเลิก
                </button>
                <button type="submit" className="btn-primary">
                  {editingCategory ? "บันทึก" : "เพิ่ม"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCategories;
