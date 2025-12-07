/**
 * StoreProducts.jsx - Manage Store Products
 */
import React, { useState } from "react";
import Modal from "./Modal";

const StoreProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCustomerViewOpen, setIsCustomerViewOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "AMD Ryzen 9 7950X",
      sku: "CPU-AMD-7950X",
      category: "CPU",
      price: 18900,
      stock: 15,
      status: "active",
      image: "https://via.placeholder.com/200",
      sales: 45,
      description:
        "โปรเซสเซอร์ AMD Ryzen 9 7950X ขุมพลัง 16 คอร์ 32 เธรด ความเร็ว 5.7 GHz เหมาะสำหรับงานสร้างสรรค์และเล่นเกม",
      weight: "0.5 kg",
      warranty: "3 ปี",
    },
    {
      id: 2,
      name: "NVIDIA RTX 4090",
      sku: "GPU-NV-4090",
      category: "GPU",
      price: 65000,
      stock: 3,
      status: "active",
      image: "https://via.placeholder.com/200",
      sales: 12,
      description: "การ์ดจอ NVIDIA RTX 4090 พลังสูงสุดสำหรับเกมและงาน AI/ML",
      weight: "2.2 kg",
      warranty: "3 ปี",
    },
    {
      id: 3,
      name: "Corsair Vengeance 32GB",
      sku: "RAM-COR-32GB",
      category: "RAM",
      price: 4500,
      stock: 0,
      status: "out_of_stock",
      image: "https://via.placeholder.com/200",
      sales: 78,
      description: "แรม DDR5 32GB (16GBx2) 6000MHz RGB ประสิทธิภาพสูง",
      weight: "0.2 kg",
      warranty: "Lifetime",
    },
    {
      id: 4,
      name: "Samsung 990 PRO 2TB",
      sku: "SSD-SAM-2TB",
      category: "Storage",
      price: 7800,
      stock: 25,
      status: "active",
      image: "https://via.placeholder.com/200",
      sales: 34,
      description: "SSD NVMe Gen 4 ความเร็วสูงสุด 7,450 MB/s อ่าน",
      weight: "0.1 kg",
      warranty: "5 ปี",
    },
    {
      id: 5,
      name: "MSI B650 Tomahawk",
      sku: "MB-MSI-B650",
      category: "Motherboard",
      price: 8900,
      stock: 8,
      status: "active",
      image: "https://via.placeholder.com/200",
      sales: 23,
      description: "เมนบอร์ด AMD B650 รองรับ Ryzen 7000 series",
      weight: "1.5 kg",
      warranty: "3 ปี",
    },
  ];

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
    setIsEditModalOpen(true);
  };

  const openCustomerView = (product) => {
    setSelectedProduct(product);
    setIsCustomerViewOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
    setEditedProduct(null);
  };

  const closeCustomerView = () => {
    setIsCustomerViewOpen(false);
    setSelectedProduct(null);
  };

  const handleEditChange = (field, value) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProduct = () => {
    // TODO: Save product logic
    console.log("Saving product:", editedProduct);
    closeModal();
  };

  const handleDeleteProduct = (productId) => {
    // TODO: Delete product logic
    console.log("Deleting product:", productId);
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
              className="product-card"
              onClick={() => openProductDetail(product)}
            >
              <div className="product-card-image">
                <img src={product.image} alt={product.name} />
                <span className={`status-badge-card status-${product.status}`}>
                  {product.status === "active" && "กำลังขาย"}
                  {product.status === "out_of_stock" && "สินค้าหมด"}
                  {product.status === "draft" && "แบบร่าง"}
                </span>
              </div>

              <div className="product-card-content">
                <div className="product-card-header">
                  <h4 className="product-card-name">{product.name}</h4>
                  <span className="product-card-sku">{product.sku}</span>
                </div>

                <div className="product-card-details">
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
                </div>

                <div className="product-card-actions">
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
          <span className="pagination-info">หน้า 1 จาก 3</span>
          <button className="pagination-btn">
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
              <div className="modal-image-section">
                <img src={editedProduct.image} alt={editedProduct.name} />
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
                  เปลี่ยนรูปภาพ
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

      {/* Customer View Modal */}
      {isCustomerViewOpen && selectedProduct && (
        <div className="product-modal-overlay" onClick={closeCustomerView}>
          <div
            className="customer-view-modal"
            onClick={(e) => e.stopPropagation()}
          >
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
              {/* Product Image Gallery */}
              <div className="customer-image-section">
                <div className="main-image">
                  <img src={selectedProduct.image} alt={selectedProduct.name} />
                  {selectedProduct.stock === 0 && (
                    <div className="out-of-stock-overlay">
                      <span>สินค้าหมด</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="customer-info-section">
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
                  </div>
                </div>

                <div className="price-section">
                  <div className="main-price">
                    ฿{selectedProduct.price.toLocaleString()}
                  </div>
                  {selectedProduct.stock > 0 && selectedProduct.stock < 10 && (
                    <div className="stock-warning">
                      เหลือเพียง {selectedProduct.stock} ชิ้น!
                    </div>
                  )}
                </div>

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
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
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

                <div className="seller-info">
                  <div className="seller-badge">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <span>ขายโดย: ร้านของคุณ</span>
                  </div>
                </div>
              </div>
            </div>

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
                <span>นี่คือตัวอย่างการแสดงผลที่ลูกค้าจะเห็น</span>
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
