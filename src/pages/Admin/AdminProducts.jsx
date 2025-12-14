/**
 * AdminProducts.jsx - Product Management Page
 * ระบบจัดการสินค้าครบวงจร: เพิ่ม, แก้ไข, ลบ, ดูมุมมองลูกค้า
 */
import React, { useState, useEffect } from "react";
import "./AdminProducts.css";
// Import MarketMain CSS for customer view modal styling
import "../Market/MarketMain.css";

// Import shared products data
import productsData from "../../data/productsData.json";

const AdminProducts = () => {
  const [products, setProducts] = useState(productsData.products);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Preview modal states (for customer view)
  const [previewTab, setPreviewTab] = useState("details");
  const [previewImageIndex, setPreviewImageIndex] = useState(0);

  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "การ์ดจอ",
    price: 0,
    stock: 0,
    status: "active",
    description: "",
    fullDescription: "",
    brand: "",
    weight: "",
    warranty: "",
    images: [],
  });

  // Notification state
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const categories = productsData.categories;

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || product.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status) => {
    const statusMap = {
      active: { label: "กำลังขาย", class: "active" },
      out_of_stock: { label: "สินค้าหมด", class: "out-of-stock" },
      draft: { label: "แบบร่าง", class: "draft" },
    };
    return statusMap[status] || { label: status, class: "" };
  };

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      sku: "",
      category: "การ์ดจอ",
      price: 0,
      stock: 0,
      status: "active",
      description: "",
      fullDescription: "",
      brand: "",
      weight: "",
      warranty: "",
      images: [],
    });
  };

  // Open Add Modal
  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  // Open Edit Modal
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status,
      description: product.description || "",
      fullDescription: product.fullDescription || "",
      brand: product.brand || "",
      weight: product.weight || "",
      warranty: product.warranty || "",
      images: product.images || [],
    });
    setShowEditModal(true);
  };

  // Open Delete Modal
  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  // Open Preview Modal (Customer View)
  const openPreviewModal = (product) => {
    setSelectedProduct(product);
    setPreviewTab("details");
    setPreviewImageIndex(0);
    setShowPreviewModal(true);
  };

  // Handle Add Product
  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now(),
      ...formData,
      sales: 0,
      rating: 0,
      reviews: [],
      seller: productsData.storeInfo.name,
    };
    setProducts([...products, newProduct]);
    setShowAddModal(false);
    resetForm();
    showNotification("เพิ่มสินค้าสำเร็จ!");
  };

  // Handle Edit Product
  const handleEditProduct = () => {
    const updatedProducts = products.map((p) =>
      p.id === selectedProduct.id ? { ...p, ...formData } : p
    );
    setProducts(updatedProducts);
    setShowEditModal(false);
    setSelectedProduct(null);
    showNotification("แก้ไขสินค้าสำเร็จ!");
  };

  // Handle Delete Product
  const handleDeleteProduct = () => {
    const updatedProducts = products.filter((p) => p.id !== selectedProduct.id);
    setProducts(updatedProducts);
    setShowDeleteModal(false);
    setSelectedProduct(null);
    showNotification("ลบสินค้าสำเร็จ!", "warning");
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    });
  };

  // Handle image URL add
  const handleAddImage = () => {
    const url = prompt("ใส่ URL รูปภาพ:");
    if (url) {
      setFormData({ ...formData, images: [...formData.images, url] });
    }
  };

  // Handle image remove
  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  // Stats calculation
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === "active").length;
  const outOfStock = products.filter((p) => p.status === "out_of_stock").length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 10).length;

  return (
    <div className="admin-products-page">
      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {notification.type === "success" ? (
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            ) : (
              <circle cx="12" cy="12" r="10" />
            )}
            {notification.type === "success" ? (
              <polyline points="22 4 12 14.01 9 11.01" />
            ) : (
              <line x1="15" y1="9" x2="9" y2="15" />
            )}
          </svg>
          {notification.message}
        </div>
      )}

      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>จัดการสินค้า</h1>
          <p>จัดการสินค้าทั้งหมดในร้านของคุณ</p>
        </div>
        <button className="btn-primary" onClick={openAddModal}>
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
          เพิ่มสินค้า
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalProducts}</span>
            <span className="stat-label">สินค้าทั้งหมด</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">{activeProducts}</span>
            <span className="stat-label">กำลังขาย</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">{lowStock}</span>
            <span className="stat-label">สต็อกต่ำ</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon danger">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">{outOfStock}</span>
            <span className="stat-label">สินค้าหมด</span>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="filters-bar">
        <div className="search-box">
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
            placeholder="ค้นหาสินค้า หรือ SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">ทุกหมวดหมู่</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">ทุกสถานะ</option>
            <option value="active">กำลังขาย</option>
            <option value="out_of_stock">สินค้าหมด</option>
            <option value="draft">แบบร่าง</option>
          </select>

          <div className="view-toggle">
            <button
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => setViewMode("grid")}
              title="Grid View"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              className={viewMode === "list" ? "active" : ""}
              onClick={() => setViewMode("list")}
              title="List View"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Products Count */}
      <div className="products-count">
        แสดง <strong>{filteredProducts.length}</strong> จาก{" "}
        <strong>{products.length}</strong> รายการ
      </div>

      {/* Products Grid/List */}
      <div className={`products-container ${viewMode}`}>
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img
                src={product.images?.[0] || "https://via.placeholder.com/200"}
                alt={product.name}
              />
              <span
                className={`status-badge ${
                  getStatusBadge(product.status).class
                }`}
              >
                {getStatusBadge(product.status).label}
              </span>
            </div>
            <div className="product-content">
              <div className="product-header">
                <span className="product-category">{product.category}</span>
                {product.rating > 0 && (
                  <span className="product-rating">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {product.rating}
                  </span>
                )}
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-sku">SKU: {product.sku}</p>

              <div className="product-stats">
                <div className="stat">
                  <span className="label">ราคา</span>
                  <span className="value price">
                    ฿{product.price.toLocaleString()}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">คงเหลือ</span>
                  <span
                    className={`value stock ${
                      product.stock === 0
                        ? "out"
                        : product.stock < 10
                        ? "low"
                        : ""
                    }`}
                  >
                    {product.stock}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">ขายแล้ว</span>
                  <span className="value">{product.sales}</span>
                </div>
              </div>

              <div className="product-actions">
                <button
                  className="btn-action preview"
                  onClick={() => openPreviewModal(product)}
                  title="ดูมุมมองลูกค้า"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  ดูตัวอย่าง
                </button>
                <button
                  className="btn-action edit"
                  onClick={() => openEditModal(product)}
                  title="แก้ไขสินค้า"
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
                  แก้ไข
                </button>
                <button
                  className="btn-action delete"
                  onClick={() => openDeleteModal(product)}
                  title="ลบสินค้า"
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
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                  ลบ
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
            <h3>ไม่พบสินค้า</h3>
            <p>ลองค้นหาด้วยคำอื่น หรือเปลี่ยนตัวกรอง</p>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                เพิ่มสินค้าใหม่
              </h3>
              <button
                className="btn-close"
                onClick={() => setShowAddModal(false)}
              >
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

            <div className="modal-body">
              <div className="form-grid">
                {/* Left Column - Images */}
                <div className="form-section">
                  <h4>รูปภาพสินค้า</h4>
                  <div className="image-gallery">
                    {formData.images.length > 0 ? (
                      <div className="image-list">
                        {formData.images.map((img, index) => (
                          <div key={index} className="image-item">
                            <img src={img} alt={`Product ${index + 1}`} />
                            <button
                              className="btn-remove-img"
                              onClick={() => handleRemoveImage(index)}
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
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-images">
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
                        <p>ยังไม่มีรูปภาพ</p>
                      </div>
                    )}
                    <button className="btn-add-image" onClick={handleAddImage}>
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
                      เพิ่มรูปภาพ (URL)
                    </button>
                  </div>
                </div>

                {/* Right Column - Form Fields */}
                <div className="form-section">
                  <h4>ข้อมูลสินค้า</h4>

                  <div className="form-group">
                    <label>
                      ชื่อสินค้า <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="ใส่ชื่อสินค้า"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        SKU <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        placeholder="รหัสสินค้า"
                      />
                    </div>
                    <div className="form-group">
                      <label>แบรนด์</label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="ยี่ห้อ"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        หมวดหมู่ <span className="required">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>สถานะ</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="active">กำลังขาย</option>
                        <option value="out_of_stock">สินค้าหมด</option>
                        <option value="draft">แบบร่าง</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        ราคา (บาท) <span className="required">*</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                      />
                    </div>
                    <div className="form-group">
                      <label>จำนวนคงเหลือ</label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>น้ำหนัก</label>
                      <input
                        type="text"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder="เช่น 1.5 kg"
                      />
                    </div>
                    <div className="form-group">
                      <label>การรับประกัน</label>
                      <input
                        type="text"
                        name="warranty"
                        value={formData.warranty}
                        onChange={handleInputChange}
                        placeholder="เช่น 3 ปี"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>คำอธิบายสั้น</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="2"
                      placeholder="คำอธิบายสั้นๆ สำหรับแสดงในหน้ารายการสินค้า"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>รายละเอียดเต็ม</label>
                    <textarea
                      name="fullDescription"
                      value={formData.fullDescription}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="รายละเอียดสินค้าแบบเต็ม"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                ยกเลิก
              </button>
              <button
                className="btn-primary"
                onClick={handleAddProduct}
                disabled={!formData.name || !formData.sku || !formData.price}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                เพิ่มสินค้า
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                แก้ไขสินค้า
              </h3>
              <button
                className="btn-close"
                onClick={() => setShowEditModal(false)}
              >
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

            <div className="modal-body">
              <div className="form-grid">
                {/* Left Column - Images */}
                <div className="form-section">
                  <h4>รูปภาพสินค้า</h4>
                  <div className="image-gallery">
                    {formData.images.length > 0 ? (
                      <div className="image-list">
                        {formData.images.map((img, index) => (
                          <div key={index} className="image-item">
                            <img src={img} alt={`Product ${index + 1}`} />
                            <button
                              className="btn-remove-img"
                              onClick={() => handleRemoveImage(index)}
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
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-images">
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
                        <p>ยังไม่มีรูปภาพ</p>
                      </div>
                    )}
                    <button className="btn-add-image" onClick={handleAddImage}>
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
                      เพิ่มรูปภาพ (URL)
                    </button>
                  </div>

                  {/* Product Stats in Edit */}
                  <div className="edit-stats">
                    <h4>สถิติสินค้า</h4>
                    <div className="edit-stat-row">
                      <span>ยอดขาย:</span>
                      <strong>{selectedProduct.sales} ชิ้น</strong>
                    </div>
                    <div className="edit-stat-row">
                      <span>คะแนน:</span>
                      <strong>{selectedProduct.rating || 0} ⭐</strong>
                    </div>
                    <div className="edit-stat-row">
                      <span>รีวิว:</span>
                      <strong>
                        {selectedProduct.reviews?.length || 0} รีวิว
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Right Column - Form Fields */}
                <div className="form-section">
                  <h4>ข้อมูลสินค้า</h4>

                  <div className="form-group">
                    <label>
                      ชื่อสินค้า <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="ใส่ชื่อสินค้า"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        SKU <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        placeholder="รหัสสินค้า"
                      />
                    </div>
                    <div className="form-group">
                      <label>แบรนด์</label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="ยี่ห้อ"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        หมวดหมู่ <span className="required">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>สถานะ</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="active">กำลังขาย</option>
                        <option value="out_of_stock">สินค้าหมด</option>
                        <option value="draft">แบบร่าง</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        ราคา (บาท) <span className="required">*</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                      />
                    </div>
                    <div className="form-group">
                      <label>จำนวนคงเหลือ</label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>น้ำหนัก</label>
                      <input
                        type="text"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder="เช่น 1.5 kg"
                      />
                    </div>
                    <div className="form-group">
                      <label>การรับประกัน</label>
                      <input
                        type="text"
                        name="warranty"
                        value={formData.warranty}
                        onChange={handleInputChange}
                        placeholder="เช่น 3 ปี"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>คำอธิบายสั้น</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="2"
                      placeholder="คำอธิบายสั้นๆ"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>รายละเอียดเต็ม</label>
                    <textarea
                      name="fullDescription"
                      value={formData.fullDescription}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="รายละเอียดสินค้าแบบเต็ม"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setShowEditModal(false)}
              >
                ยกเลิก
              </button>
              <button className="btn-primary" onClick={handleEditProduct}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                บันทึกการเปลี่ยนแปลง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header delete-header">
              <h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                ยืนยันการลบ
              </h3>
              <button
                className="btn-close"
                onClick={() => setShowDeleteModal(false)}
              >
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

            <div className="modal-body">
              <div className="delete-product-info">
                <img
                  src={
                    selectedProduct.images?.[0] ||
                    "https://via.placeholder.com/80"
                  }
                  alt={selectedProduct.name}
                />
                <div>
                  <h4>{selectedProduct.name}</h4>
                  <p>SKU: {selectedProduct.sku}</p>
                </div>
              </div>
              <p className="delete-warning">
                คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?
                การกระทำนี้ไม่สามารถย้อนกลับได้
              </p>
            </div>

            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                ยกเลิก
              </button>
              <button className="btn-danger" onClick={handleDeleteProduct}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                ลบสินค้า
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Preview Modal - Same as Marketplace */}
      {showPreviewModal && selectedProduct && (
        <div
          className="market-detail-overlay"
          onClick={() => setShowPreviewModal(false)}
        >
          <div
            className="market-customer-view-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="market-cv-header">
              <div className="market-cv-title">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>มุมมองลูกค้า</span>
              </div>
              <button
                className="market-cv-close"
                onClick={() => setShowPreviewModal(false)}
              >
                <svg
                  width="24"
                  height="24"
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

            <div className="market-cv-content">
              {/* Left: Image Gallery */}
              <div className="market-cv-image-section">
                <div className="market-cv-main-image">
                  {selectedProduct.images &&
                  selectedProduct.images.length > 0 ? (
                    <img
                      src={
                        selectedProduct.images[previewImageIndex] ||
                        selectedProduct.images[0]
                      }
                      alt={selectedProduct.name}
                    />
                  ) : (
                    <div className="market-cv-image-placeholder">
                      <svg
                        width="80"
                        height="80"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                    </div>
                  )}
                  {selectedProduct.stock === 0 && (
                    <div className="market-cv-out-of-stock-overlay">
                      <span>สินค้าหมด</span>
                    </div>
                  )}
                </div>
                {selectedProduct.images &&
                  selectedProduct.images.length > 1 && (
                    <div className="market-cv-thumbnails">
                      {selectedProduct.images.map((img, idx) => (
                        <div
                          key={idx}
                          className={`market-cv-thumbnail ${
                            previewImageIndex === idx ? "active" : ""
                          }`}
                          onClick={() => setPreviewImageIndex(idx)}
                        >
                          <img
                            src={img}
                            alt={`${selectedProduct.name} ${idx + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              {/* Right: Product Info */}
              <div className="market-cv-info-section">
                {/* Store Info */}
                <div className="market-cv-store-badge">
                  <div className="market-cv-store-logo">
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
                  </div>
                  <div className="market-cv-store-details">
                    <span className="market-cv-store-name">
                      {productsData.storeInfo.name}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="#2ecc71"
                        className="verified-icon"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline
                          points="22 4 12 14.01 9 11.01"
                          stroke="#fff"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                    </span>
                    <div className="market-cv-store-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill={
                            star <= Math.round(productsData.storeInfo.rating)
                              ? "#f59e0b"
                              : "none"
                          }
                          stroke={
                            star <= Math.round(productsData.storeInfo.rating)
                              ? "#f59e0b"
                              : "#d1d5db"
                          }
                          strokeWidth="2"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                      <span>
                        {productsData.storeInfo.rating} (
                        {productsData.storeInfo.totalReviews} รีวิว)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product Header */}
                <div className="market-cv-product-header">
                  <h2 className="market-cv-product-title">
                    {selectedProduct.name}
                  </h2>
                  <div className="market-cv-product-meta">
                    <span className="market-cv-sku-badge">
                      SKU: {selectedProduct.sku}
                    </span>
                    <span className="market-cv-category-badge">
                      {selectedProduct.category}
                    </span>
                    <span
                      className={`market-cv-status-badge ${
                        selectedProduct.stock > 0 ? "in-stock" : "out-of-stock"
                      }`}
                    >
                      {selectedProduct.stock > 0 ? "พร้อมจำหน่าย" : "สินค้าหมด"}
                    </span>
                  </div>
                </div>

                {/* Rating Summary */}
                <div className="market-cv-rating-summary">
                  <div className="market-cv-rating-big">
                    {selectedProduct.rating || "0.0"}
                  </div>
                  <div className="market-cv-rating-details">
                    <div className="market-cv-stars-row">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill={
                            star <= Math.round(selectedProduct.rating || 0)
                              ? "#f59e0b"
                              : "none"
                          }
                          stroke={
                            star <= Math.round(selectedProduct.rating || 0)
                              ? "#f59e0b"
                              : "#d1d5db"
                          }
                          strokeWidth="2"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <span>
                      {selectedProduct.reviews?.length || 0} รีวิวจากผู้ซื้อ
                    </span>
                  </div>
                </div>

                {/* Price Section */}
                <div className="market-cv-price-section">
                  <div className="market-cv-main-price">
                    ฿{selectedProduct.price.toLocaleString()}
                  </div>
                  {selectedProduct.stock > 0 && selectedProduct.stock < 10 && (
                    <div className="market-cv-stock-warning">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      เหลือเพียง {selectedProduct.stock} ชิ้น!
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="market-cv-actions">
                  {selectedProduct.stock > 0 ? (
                    <>
                      <button className="market-cv-cart-btn" disabled>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        เพิ่มลงตะกร้า
                      </button>
                      <button className="market-cv-buy-btn" disabled>
                        ซื้อเลย
                      </button>
                    </>
                  ) : (
                    <button className="market-cv-out-of-stock-btn" disabled>
                      สินค้าหมด
                    </button>
                  )}
                </div>

                {/* Tabs */}
                <div className="market-cv-tabs">
                  <button
                    className={`market-cv-tab-btn ${
                      previewTab === "details" ? "active" : ""
                    }`}
                    onClick={() => setPreviewTab("details")}
                  >
                    รายละเอียด
                  </button>
                  <button
                    className={`market-cv-tab-btn ${
                      previewTab === "reviews" ? "active" : ""
                    }`}
                    onClick={() => setPreviewTab("reviews")}
                  >
                    รีวิว ({selectedProduct.reviews?.length || 0})
                  </button>
                  <button
                    className={`market-cv-tab-btn ${
                      previewTab === "comments" ? "active" : ""
                    }`}
                    onClick={() => setPreviewTab("comments")}
                  >
                    เขียนรีวิว
                  </button>
                </div>

                {/* Tab Content */}
                <div className="market-cv-tab-content">
                  {/* Details Tab */}
                  {previewTab === "details" && (
                    <div className="market-cv-details-tab">
                      <div className="market-cv-description">
                        <h3>รายละเอียดสินค้า</h3>
                        <p>
                          {selectedProduct.fullDescription ||
                            selectedProduct.description ||
                            "ไม่มีรายละเอียด"}
                        </p>
                      </div>

                      {selectedProduct.specs && (
                        <div className="market-cv-specs">
                          <h3>สเปค</h3>
                          <div className="market-cv-specs-grid">
                            {Object.entries(selectedProduct.specs).map(
                              ([key, value]) => (
                                <div key={key} className="market-cv-spec-item">
                                  <div>
                                    <span className="spec-label">{key}</span>
                                    <span className="spec-value">{value}</span>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      <div className="market-cv-specs">
                        <h3>ข้อมูลจำเพาะ</h3>
                        <div className="market-cv-specs-grid">
                          <div className="market-cv-spec-item">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            </svg>
                            <div>
                              <span className="spec-label">แบรนด์</span>
                              <span className="spec-value">
                                {selectedProduct.brand || "N/A"}
                              </span>
                            </div>
                          </div>
                          <div className="market-cv-spec-item">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M9 11l3 3L22 4" />
                              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                            </svg>
                            <div>
                              <span className="spec-label">รับประกัน</span>
                              <span className="spec-value">
                                {selectedProduct.warranty || "N/A"}
                              </span>
                            </div>
                          </div>
                          <div className="market-cv-spec-item">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <rect
                                x="2"
                                y="7"
                                width="20"
                                height="14"
                                rx="2"
                                ry="2"
                              />
                              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                            <div>
                              <span className="spec-label">น้ำหนัก</span>
                              <span className="spec-value">
                                {selectedProduct.weight || "N/A"}
                              </span>
                            </div>
                          </div>
                          <div className="market-cv-spec-item">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <line x1="12" y1="1" x2="12" y2="23" />
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                            <div>
                              <span className="spec-label">สินค้าคงเหลือ</span>
                              <span className="spec-value">
                                {selectedProduct.stock} ชิ้น
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reviews Tab */}
                  {previewTab === "reviews" && (
                    <div className="market-cv-reviews-tab">
                      {selectedProduct.reviews &&
                      selectedProduct.reviews.length > 0 ? (
                        <div className="market-cv-reviews-list">
                          {selectedProduct.reviews.map((review) => (
                            <div
                              key={review.id}
                              className="market-cv-review-item"
                            >
                              <div className="market-cv-review-header">
                                <div className="market-cv-reviewer-info">
                                  <img
                                    src={
                                      review.avatar ||
                                      "https://i.pravatar.cc/40"
                                    }
                                    alt={review.user}
                                    className="market-cv-reviewer-avatar"
                                  />
                                  <div>
                                    <span className="market-cv-reviewer-name">
                                      {review.user}
                                    </span>
                                    <span className="market-cv-review-date">
                                      {review.date}
                                    </span>
                                  </div>
                                </div>
                                <div className="market-cv-review-rating">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                      key={star}
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill={
                                        star <= review.rating
                                          ? "#f59e0b"
                                          : "none"
                                      }
                                      stroke={
                                        star <= review.rating
                                          ? "#f59e0b"
                                          : "#d1d5db"
                                      }
                                      strokeWidth="2"
                                    >
                                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                              <p className="market-cv-review-comment">
                                {review.comment}
                              </p>
                              {review.images && review.images.length > 0 && (
                                <div className="market-cv-review-images">
                                  {review.images.map((img, idx) => (
                                    <img
                                      key={idx}
                                      src={img}
                                      alt={`Review ${idx + 1}`}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="market-cv-no-reviews">
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          <p>ยังไม่มีรีวิวสำหรับสินค้านี้</p>
                          <span>เป็นคนแรกที่รีวิวสินค้านี้!</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Write Comment Tab */}
                  {previewTab === "comments" && (
                    <div className="market-cv-comments-tab">
                      <h3>เขียนรีวิวสินค้า</h3>
                      <div className="market-cv-comment-rating">
                        <label>ให้คะแนนสินค้า</label>
                        <div className="market-cv-rating-selector">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill={star <= 5 ? "#f59e0b" : "none"}
                              stroke={star <= 5 ? "#f59e0b" : "#d1d5db"}
                              strokeWidth="2"
                              style={{ cursor: "pointer" }}
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                          <span className="market-cv-rating-text">
                            ยอดเยี่ยม
                          </span>
                        </div>
                      </div>
                      <div className="market-cv-comment-text">
                        <label>เขียนความคิดเห็น</label>
                        <textarea
                          rows="4"
                          placeholder="แชร์ประสบการณ์การใช้งานสินค้านี้..."
                          disabled
                        />
                      </div>
                      <button className="market-cv-submit-btn" disabled>
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
                        ส่งรีวิว
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
