/**
 * StoreProfile.jsx - Public Store Profile Page
 * หน้าโปรไฟล์ร้านค้าสาธารณะแสดงสินค้าและข้อมูลร้าน
 */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import "./StoreProfile.css";
// Import shared data
import { storeInfo, categories } from "../../data/constants";
import { fetchProducts } from "../../lib/api";

const StoreProfile = () => {
  const navigate = useNavigate();
  // State for products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (data) setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };
    loadProducts();
  }, []);

  // const { storeInfo, products, categories } = productsData; // Removed
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");

  // Mock store data (would come from settings in real app)
  const storeData = {
    name: "สมชาย Tech Store",
    email: "admin@techstore.com",
    description:
      "ร้านขายอุปกรณ์คอมพิวเตอร์และอิเล็กทรอนิกส์คุณภาพสูง ราคาถูก รับประกันสินค้าทุกชิ้น จัดส่งทั่วประเทศ",
    phone: "02-123-4567",
    address: "123 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
    verified: true,
    rating: storeInfo.rating,
    totalReviews: storeInfo.totalReviews,
    totalProducts: products.length,
    totalSales: products.reduce((sum, p) => sum + p.sales, 0),
    joinedDate: "มกราคม 2024",
    logo: "", // URL ของโลโก้ร้าน
    banner:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=300&fit=crop", // URL ของแบนเนอร์
    socialLinks: {
      facebook: "techstoreofficial",
      instagram: "techstore.ig",
      line: "@techstore",
    },
  };

  // Filter products by category
  const filteredProducts =
    selectedCategory === "ทั้งหมด"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Get top 6 featured products
  const featuredProducts = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 6);

  const formatPrice = (price) => {
    return price.toLocaleString("th-TH");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .substring(0, 2);
  };

  return (
    <div className="store-profile">
      {/* Header Navigation */}
      <header className="store-profile-header">
        <div className="header-container">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>กลับ</span>
          </button>
          <Link to="/admin/settings" className="edit-store-btn">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>แก้ไขโปรไฟล์</span>
          </Link>
        </div>
      </header>

      {/* Store Banner */}
      <section className="store-banner">
        {storeData.banner ? (
          <img
            src={storeData.banner}
            alt="Store Banner"
            className="banner-image"
          />
        ) : (
          <div className="banner-placeholder">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>ยังไม่มีแบนเนอร์</span>
          </div>
        )}
        <div className="banner-overlay"></div>
      </section>

      {/* Store Hero Section */}
      <section className="store-hero">
        <div className="store-hero-content">
          <div className="store-avatar-large">
            {storeData.logo ? (
              <img src={storeData.logo} alt={storeData.name} />
            ) : (
              <span>{getInitials(storeData.name)}</span>
            )}
          </div>
          <div className="store-info-main">
            <div className="store-name-row">
              <h1 className="store-name">{storeData.name}</h1>
              {storeData.verified && (
                <span className="verified-badge">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ร้านค้าที่ยืนยันแล้ว
                </span>
              )}
            </div>
            <p className="store-description">{storeData.description}</p>
            <div className="store-contact-info">
              <span className="contact-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {storeData.email}
              </span>
              <span className="contact-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {storeData.phone}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="store-stats-section">
        <div className="stats-container">
          <div className="stat-box">
            <div className="stat-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">{storeData.rating}</span>
              <span className="stat-label">คะแนนเฉลี่ย</span>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">
                {storeData.totalReviews.toLocaleString()}
              </span>
              <span className="stat-label">รีวิวทั้งหมด</span>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">
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
            <div className="stat-content">
              <span className="stat-value">{storeData.totalProducts}</span>
              <span className="stat-label">สินค้าทั้งหมด</span>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">
                {storeData.totalSales.toLocaleString()}
              </span>
              <span className="stat-label">ยอดขายทั้งหมด</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="store-showcase">
        <div className="section-header">
          <h2 className="section-title">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            สินค้าแนะนำ
          </h2>
        </div>
        <div className="showcase-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="showcase-card">
              <div className="showcase-image">
                <img src={product.images[0]} alt={product.name} />
                {product.stock < 10 && (
                  <span className="low-stock-badge">เหลือน้อย</span>
                )}
              </div>
              <div className="showcase-content">
                <span className="showcase-category">{product.category}</span>
                <h3 className="showcase-title">{product.name}</h3>
                <div className="showcase-rating">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>{product.rating}</span>
                  <span className="sales-count">
                    ({product.sales.toLocaleString()} ขายแล้ว)
                  </span>
                </div>
                <div className="showcase-price">
                  ฿{formatPrice(product.price)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Products Section */}
      <section className="store-products">
        <div className="section-header">
          <h2 className="section-title">
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
            สินค้าทั้งหมด
          </h2>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <button
            className={`category-btn ${selectedCategory === "ทั้งหมด" ? "active" : ""
              }`}
            onClick={() => setSelectedCategory("ทั้งหมด")}
          >
            ทั้งหมด
          </button>
          {categories.slice(0, 8).map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? "active" : ""
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              {/* Image Area */}
              <div className="product-image-area">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-image"
                  />
                ) : (
                  <div className="product-image-placeholder">
                    <svg
                      width="48"
                      height="48"
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
                {/* Category Tag */}
                <span className="product-tag">{product.category}</span>
                {/* Rating Badge */}
                {product.rating > 0 && (
                  <span className="product-rating-badge">
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
                {/* Out of Stock Overlay */}
                {product.stock === 0 && (
                  <div className="product-out-of-stock">สินค้าหมด</div>
                )}
              </div>
              {/* Product Body */}
              <div className="product-body">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-meta">
                  <span className="product-sold">
                    ขายแล้ว {product.sales?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="product-footer">
                  <span className="product-price">
                    ฿{formatPrice(product.price)}
                  </span>
                  <button
                    className="product-btn-buy"
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? "หมด" : "ซื้อเลย"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p>ไม่พบสินค้าในหมวดหมู่นี้</p>
          </div>
        )}
      </section>

      {/* Store Info Footer */}
      <section className="store-info-footer">
        <div className="info-grid">
          <div className="info-card">
            <h3>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              ที่อยู่ร้าน
            </h3>
            <p>{storeData.address}</p>
          </div>
          <div className="info-card">
            <h3>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              เข้าร่วมเมื่อ
            </h3>
            <p>{storeData.joinedDate}</p>
          </div>
          <div className="info-card">
            <h3>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              ติดตามเรา
            </h3>
            <div className="social-links">
              {storeData.socialLinks.facebook && (
                <a
                  href={`https://facebook.com/${storeData.socialLinks.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              )}
              {storeData.socialLinks.instagram && (
                <a
                  href={`https://instagram.com/${storeData.socialLinks.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              )}
              {storeData.socialLinks.line && (
                <span>LINE: {storeData.socialLinks.line}</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoreProfile;
