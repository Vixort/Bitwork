/**
 * StoreProducts.jsx - Manage Store Products
 * พร้อม Full Detail Product Card ที่แสดงข้อมูลครบถ้วน
 */
import React, { useState } from "react";
import Modal from "./Modal";

// นำเข้าข้อมูล mock data จากไฟล์ JSON
import storeProductsData from "./storeProductsData.json";

const StoreProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCustomerViewOpen, setIsCustomerViewOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details"); // details, reviews, comments

  // State สำหรับ Comment ใหม่
  const [newComment, setNewComment] = useState({
    rating: 5,
    text: "",
    images: [],
  });

  // ข้อมูลสินค้าและร้านค้าจาก JSON file
  const products = storeProductsData.products;
  const storeInfo = storeProductsData.storeInfo;

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
    setIsEditModalOpen(true);
    setActiveImageIndex(0);
  };

  const openCustomerView = (product) => {
    setSelectedProduct(product);
    setIsCustomerViewOpen(true);
    setActiveImageIndex(0);
    setActiveTab("details");
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
    setEditedProduct(null);
  };

  const closeCustomerView = () => {
    setIsCustomerViewOpen(false);
    setSelectedProduct(null);
    setActiveImageIndex(0);
    setActiveTab("details");
    setNewComment({ rating: 5, text: "", images: [] });
  };

  const handleEditChange = (field, value) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProduct = () => {
    console.log("Saving product:", editedProduct);
    closeModal();
  };

  const handleDeleteProduct = (productId) => {
    console.log("Deleting product:", productId);
  };

  // คำนวณ rating เฉลี่ย
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  // Render stars
  const renderStars = (rating, interactive = false, onRate = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i <= rating ? "#f59e0b" : "none"}
          stroke={i <= rating ? "#f59e0b" : "#d1d5db"}
          strokeWidth="2"
          style={{ cursor: interactive ? "pointer" : "default" }}
          onClick={() => interactive && onRate && onRate(i)}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    }
    return stars;
  };

  // Handle image upload for comment
  const handleCommentImageUpload = () => {
    // Mock - ในโปรเจคจริงจะเปิด file picker
    const mockImage = `https://picsum.photos/200?random=${Date.now()}`;
    setNewComment((prev) => ({
      ...prev,
      images: [...prev.images, mockImage],
    }));
  };

  // Remove image from comment
  const removeCommentImage = (index) => {
    setNewComment((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Submit comment
  const handleSubmitComment = () => {
    if (!newComment.text.trim()) {
      alert("กรุณาใส่ข้อความรีวิว");
      return;
    }
    console.log("Submitting comment:", newComment);
    // Reset form
    setNewComment({ rating: 5, text: "", images: [] });
  };

  // Get product image (support both old single image and new multiple images)
  const getProductImage = (product, index = 0) => {
    if (product.images && product.images.length > 0) {
      return product.images[index] || product.images[0];
    }
    return product.image || "https://via.placeholder.com/200";
  };

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">สินค้าที่ขายอยู่</h2>
          <p className="panel-description">จัดการสินค้าและสต็อกของคุณ</p>
        </div>
        <button className="btn-primary">
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
          เพิ่มสินค้าใหม่
        </button>
      </div>

      <div className="panel-content">
        {/* Search and Filter */}
        <div className="products-toolbar">
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
              placeholder="ค้นหาสินค้า..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">ทั้งหมด</option>
            <option value="active">กำลังขาย</option>
            <option value="out_of_stock">สินค้าหมด</option>
            <option value="draft">แบบร่าง</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="store-product-card"
              onClick={() => openProductDetail(product)}
            >
              <div className="store-product-card-image">
                <img src={getProductImage(product)} alt={product.name} />
                <span className={`status-badge-card status-${product.status}`}>
                  {product.status === "active" && "กำลังขาย"}
                  {product.status === "out_of_stock" && "สินค้าหมด"}
                  {product.status === "draft" && "แบบร่าง"}
                </span>
                {product.images && product.images.length > 1 && (
                  <span className="image-count-badge">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    </svg>
                    {product.images.length}
                  </span>
                )}
              </div>

              <div className="store-product-card-content">
                <div className="store-product-card-header">
                  <h4 className="store-product-card-name">{product.name}</h4>
                  <span className="store-product-card-sku">{product.sku}</span>
                </div>

                <div className="store-product-card-details">
                  <div className="detail-row">
                    <span className="detail-label">หมวดหมู่:</span>
                    <span className="detail-value">{product.category}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">ราคา:</span>
                    <span className="detail-value product-card-price">
                      ฿{product.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">คงเหลือ:</span>
                    <span
                      className={`stock-badge ${
                        product.stock === 0
                          ? "out-of-stock"
                          : product.stock < 10
                          ? "low-stock"
                          : ""
                      }`}
                    >
                      {product.stock} ชิ้น
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">ยอดขาย:</span>
                    <span className="detail-value">{product.sales} ชิ้น</span>
                  </div>
                  {product.reviews && product.reviews.length > 0 && (
                    <div className="detail-row">
                      <span className="detail-label">รีวิว:</span>
                      <span className="detail-value review-stars">
                        {renderStars(
                          Math.round(calculateAverageRating(product.reviews))
                        )}
                        <span>({product.reviews.length})</span>
                      </span>
                    </div>
                  )}
                </div>

                <div className="store-product-card-actions">
                  <button
                    className="card-action-btn view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openCustomerView(product);
                    }}
                    title="ดูเป็นลูกค้า"
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
                    ดูเป็นลูกค้า
                  </button>
                  <button
                    className="card-action-btn edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openProductDetail(product);
                    }}
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
                    className="card-action-btn delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProduct(product.id);
                    }}
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
                    ลบ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button className="pagination-btn" disabled>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="pagination-info">หน้า 1 จาก 1</span>
          <button className="pagination-btn" disabled>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Detail/Edit Modal */}
      {isEditModalOpen && editedProduct && (
        <div className="product-modal-overlay" onClick={closeModal}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <div className="product-modal-header">
              <h3>รายละเอียดและแก้ไขสินค้า</h3>
              <button className="modal-close-btn" onClick={closeModal}>
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

            <div className="product-modal-content">
              {/* Image Gallery Edit */}
              <div className="modal-image-section">
                <div className="main-edit-image">
                  <img
                    src={getProductImage(editedProduct, activeImageIndex)}
                    alt={editedProduct.name}
                  />
                </div>
                {editedProduct.images && editedProduct.images.length > 1 && (
                  <div className="image-thumbnails">
                    {editedProduct.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`thumbnail ${
                          activeImageIndex === idx ? "active" : ""
                        }`}
                        onClick={() => setActiveImageIndex(idx)}
                      >
                        <img
                          src={img}
                          alt={`${editedProduct.name} ${idx + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <button className="change-image-btn">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  จัดการรูปภาพ
                </button>
              </div>

              <div className="modal-form-section">
                <div className="form-row">
                  <label>ชื่อสินค้า</label>
                  <input
                    type="text"
                    value={editedProduct.name}
                    onChange={(e) => handleEditChange("name", e.target.value)}
                  />
                </div>

                <div className="form-row">
                  <label>รายละเอียด</label>
                  <textarea
                    rows="3"
                    value={editedProduct.description}
                    onChange={(e) =>
                      handleEditChange("description", e.target.value)
                    }
                  />
                </div>

                <div className="form-row-group">
                  <div className="form-row">
                    <label>SKU</label>
                    <input
                      type="text"
                      value={editedProduct.sku}
                      onChange={(e) => handleEditChange("sku", e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <label>หมวดหมู่</label>
                    <select
                      value={editedProduct.category}
                      onChange={(e) =>
                        handleEditChange("category", e.target.value)
                      }
                    >
                      <option value="CPU">CPU</option>
                      <option value="GPU">GPU</option>
                      <option value="RAM">RAM</option>
                      <option value="Storage">Storage</option>
                      <option value="Motherboard">Motherboard</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-group">
                  <div className="form-row">
                    <label>ราคา (บาท)</label>
                    <input
                      type="number"
                      value={editedProduct.price}
                      onChange={(e) =>
                        handleEditChange("price", parseFloat(e.target.value))
                      }
                    />
                  </div>
                  <div className="form-row">
                    <label>จำนวนสต็อก</label>
                    <input
                      type="number"
                      value={editedProduct.stock}
                      onChange={(e) =>
                        handleEditChange("stock", parseInt(e.target.value))
                      }
                    />
                  </div>
                </div>

                <div className="form-row-group">
                  <div className="form-row">
                    <label>น้ำหนัก</label>
                    <input
                      type="text"
                      value={editedProduct.weight}
                      onChange={(e) =>
                        handleEditChange("weight", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-row">
                    <label>การรับประกัน</label>
                    <input
                      type="text"
                      value={editedProduct.warranty}
                      onChange={(e) =>
                        handleEditChange("warranty", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <label>สถานะ</label>
                  <select
                    value={editedProduct.status}
                    onChange={(e) => handleEditChange("status", e.target.value)}
                  >
                    <option value="active">กำลังขาย</option>
                    <option value="out_of_stock">สินค้าหมด</option>
                    <option value="draft">แบบร่าง</option>
                  </select>
                </div>

                <div className="modal-stats">
                  <div className="stat-item">
                    <span className="stat-label">ยอดขายทั้งหมด</span>
                    <span className="stat-value">
                      {editedProduct.sales} ชิ้น
                    </span>
                  </div>
                  {editedProduct.reviews && (
                    <div className="stat-item">
                      <span className="stat-label">รีวิว</span>
                      <span className="stat-value">
                        {editedProduct.reviews.length} รีวิว
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="product-modal-footer">
              <button className="btn-secondary" onClick={closeModal}>
                ยกเลิก
              </button>
              <button className="btn-primary" onClick={handleSaveProduct}>
                บันทึกการแก้ไข
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== FULL DETAIL CUSTOMER VIEW MODAL ==================== */}
      {isCustomerViewOpen && selectedProduct && (
        <div className="product-modal-overlay" onClick={closeCustomerView}>
          <div
            className="customer-view-modal full-detail"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="customer-view-header">
              <div className="view-label">
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
              <button className="modal-close-btn" onClick={closeCustomerView}>
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

            <div className="customer-view-content">
              {/* Left: Image Gallery */}
              <div className="customer-image-section">
                <div className="main-image">
                  <img
                    src={getProductImage(selectedProduct, activeImageIndex)}
                    alt={selectedProduct.name}
                  />
                  {selectedProduct.stock === 0 && (
                    <div className="out-of-stock-overlay">
                      <span>สินค้าหมด</span>
                    </div>
                  )}
                </div>
                {selectedProduct.images &&
                  selectedProduct.images.length > 1 && (
                    <div className="image-thumbnails">
                      {selectedProduct.images.map((img, idx) => (
                        <div
                          key={idx}
                          className={`thumbnail ${
                            activeImageIndex === idx ? "active" : ""
                          }`}
                          onClick={() => setActiveImageIndex(idx)}
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
              <div className="customer-info-section">
                {/* Store Info */}
                <div className="store-info-badge">
                  <div className="store-logo">
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
                  <div className="store-details">
                    <span className="store-name">
                      {storeInfo.name}
                      {storeInfo.verified && (
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
                      )}
                    </span>
                    <div className="store-rating">
                      {renderStars(Math.round(storeInfo.rating))}
                      <span>
                        {storeInfo.rating} ({storeInfo.totalReviews} รีวิว)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product Header */}
                <div className="product-header-customer">
                  <h2 className="product-title-customer">
                    {selectedProduct.name}
                  </h2>
                  <div className="product-meta">
                    <span className="sku-badge">
                      SKU: {selectedProduct.sku}
                    </span>
                    <span className="category-badge">
                      {selectedProduct.category}
                    </span>
                    <span
                      className={`status-badge status-${selectedProduct.status}`}
                    >
                      {selectedProduct.status === "active" && "พร้อมจำหน่าย"}
                      {selectedProduct.status === "out_of_stock" && "สินค้าหมด"}
                      {selectedProduct.status === "draft" && "แบบร่าง"}
                    </span>
                  </div>
                </div>

                {/* Rating Summary */}
                {selectedProduct.reviews &&
                  selectedProduct.reviews.length > 0 && (
                    <div className="rating-summary">
                      <div className="rating-big">
                        {calculateAverageRating(selectedProduct.reviews)}
                      </div>
                      <div className="rating-details">
                        <div className="stars-row">
                          {renderStars(
                            Math.round(
                              calculateAverageRating(selectedProduct.reviews)
                            )
                          )}
                        </div>
                        <span>
                          {selectedProduct.reviews.length} รีวิวจากผู้ซื้อ
                        </span>
                      </div>
                    </div>
                  )}

                {/* Price Section */}
                <div className="price-section">
                  <div className="main-price">
                    ฿{selectedProduct.price.toLocaleString()}
                  </div>
                  {selectedProduct.stock > 0 && selectedProduct.stock < 10 && (
                    <div className="stock-warning">
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
                <div className="customer-actions">
                  {selectedProduct.stock > 0 ? (
                    <>
                      <button className="add-to-cart-btn">
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
                      <button className="buy-now-btn">ซื้อเลย</button>
                    </>
                  ) : (
                    <button className="out-of-stock-btn" disabled>
                      สินค้าหมด
                    </button>
                  )}
                </div>

                {/* Tabs */}
                <div className="product-tabs">
                  <button
                    className={`tab-btn ${
                      activeTab === "details" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("details")}
                  >
                    รายละเอียด
                  </button>
                  <button
                    className={`tab-btn ${
                      activeTab === "reviews" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("reviews")}
                  >
                    รีวิว ({selectedProduct.reviews?.length || 0})
                  </button>
                  <button
                    className={`tab-btn ${
                      activeTab === "comments" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("comments")}
                  >
                    เขียนรีวิว
                  </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                  {/* Details Tab */}
                  {activeTab === "details" && (
                    <div className="details-tab">
                      <div className="product-description">
                        <h3>รายละเอียดสินค้า</h3>
                        <p>{selectedProduct.description}</p>
                      </div>

                      <div className="product-specs">
                        <h3>ข้อมูลจำเพาะ</h3>
                        <div className="specs-grid">
                          <div className="spec-item">
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
                              <span className="spec-label">น้ำหนัก</span>
                              <span className="spec-value">
                                {selectedProduct.weight}
                              </span>
                            </div>
                          </div>
                          <div className="spec-item">
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
                              <span className="spec-label">การรับประกัน</span>
                              <span className="spec-value">
                                {selectedProduct.warranty}
                              </span>
                            </div>
                          </div>
                          <div className="spec-item">
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
                              <span className="spec-label">สต็อก</span>
                              <span className="spec-value">
                                {selectedProduct.stock} ชิ้น
                              </span>
                            </div>
                          </div>
                          <div className="spec-item">
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
                              <span className="spec-label">ยอดขายแล้ว</span>
                              <span className="spec-value">
                                {selectedProduct.sales} ชิ้น
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reviews Tab */}
                  {activeTab === "reviews" && (
                    <div className="reviews-tab">
                      {selectedProduct.reviews &&
                      selectedProduct.reviews.length > 0 ? (
                        <div className="reviews-list">
                          {selectedProduct.reviews.map((review) => (
                            <div key={review.id} className="review-item">
                              <div className="review-header">
                                <div className="reviewer-info">
                                  <img
                                    src={review.avatar}
                                    alt={review.user}
                                    className="reviewer-avatar"
                                  />
                                  <div>
                                    <span className="reviewer-name">
                                      {review.user}
                                    </span>
                                    <span className="review-date">
                                      {review.date}
                                    </span>
                                  </div>
                                </div>
                                <div className="review-rating">
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                              <p className="review-comment">{review.comment}</p>
                              {review.images && review.images.length > 0 && (
                                <div className="review-images">
                                  {review.images.map((img, idx) => (
                                    <img
                                      key={idx}
                                      src={img}
                                      alt={`Review ${idx + 1}`}
                                    />
                                  ))}
                                </div>
                              )}
                              <div className="review-footer">
                                <button className="helpful-btn">
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                  </svg>
                                  มีประโยชน์ ({review.helpful})
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-reviews">
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
                  {activeTab === "comments" && (
                    <div className="comments-tab">
                      <h3>เขียนรีวิวสินค้า</h3>

                      {/* Rating Selection */}
                      <div className="comment-rating">
                        <label>ให้คะแนนสินค้า</label>
                        <div className="rating-selector">
                          {renderStars(newComment.rating, true, (rating) =>
                            setNewComment((prev) => ({ ...prev, rating }))
                          )}
                          <span className="rating-text">
                            {newComment.rating === 5 && "ยอดเยี่ยม"}
                            {newComment.rating === 4 && "ดีมาก"}
                            {newComment.rating === 3 && "ปานกลาง"}
                            {newComment.rating === 2 && "พอใช้"}
                            {newComment.rating === 1 && "ต้องปรับปรุง"}
                          </span>
                        </div>
                      </div>

                      {/* Comment Text */}
                      <div className="comment-text">
                        <label>เขียนความคิดเห็น</label>
                        <textarea
                          rows="4"
                          placeholder="แชร์ประสบการณ์การใช้งานสินค้านี้..."
                          value={newComment.text}
                          onChange={(e) =>
                            setNewComment((prev) => ({
                              ...prev,
                              text: e.target.value,
                            }))
                          }
                        />
                      </div>

                      {/* Image Upload */}
                      <div className="comment-images">
                        <label>เพิ่มรูปภาพ (ไม่บังคับ)</label>
                        <div className="image-upload-area">
                          {newComment.images.map((img, idx) => (
                            <div key={idx} className="uploaded-image">
                              <img src={img} alt={`Upload ${idx + 1}`} />
                              <button
                                className="remove-image"
                                onClick={() => removeCommentImage(idx)}
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
                          {newComment.images.length < 5 && (
                            <button
                              className="add-image-btn"
                              onClick={handleCommentImageUpload}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
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
                              <span>เพิ่มรูป</span>
                            </button>
                          )}
                        </div>
                        <span className="image-hint">
                          สามารถเพิ่มได้สูงสุด 5 รูป
                        </span>
                      </div>

                      {/* Submit Button */}
                      <button
                        className="submit-comment-btn"
                        onClick={handleSubmitComment}
                      >
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

            {/* Footer */}
            <div className="customer-view-footer">
              <div className="preview-note">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>
                  นี่คือตัวอย่างการแสดงผลที่ลูกค้าจะเห็น -
                  ข้อมูลตรงกับการตั้งค่าของคุณ
                </span>
              </div>
              <button className="btn-primary" onClick={closeCustomerView}>
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreProducts;
