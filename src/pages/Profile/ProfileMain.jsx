/**
 * ProfileMain.jsx - User Profile Page
 * หน้าโปรไฟล์ผู้ใช้แบบสาธารณะ
 */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import "./ProfileMain.css";

// Import mock data
import profileData from "./profileData.json";

const ProfileMain = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [isFollowing, setIsFollowing] = useState(false);

  // ในอนาคตจะ fetch data จาก API ตาม username
  const user = profileData.user;
  const store = profileData.store;
  const products = profileData.products;
  const posts = profileData.posts;
  const reviews = profileData.reviews;

  // Check if current user is owner (mock: สมมติว่าเป็นเจ้าของโปรไฟล์ถ้า username ตรงกับ user.username)
  // ในอนาคตจะเปรียบเทียบกับ currentUser จาก authentication
  const isOwner = username === user.username || username === "somchai_dev";

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format join date
  const formatJoinDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
    });
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH").format(price);
  };

  // Format number with K
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  // Get badge icon
  const getBadgeIcon = (icon) => {
    switch (icon) {
      case "star":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      case "check":
        return (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
      case "zap":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#f59e0b"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#f59e0b"
          >
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill="url(#half)"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#e5e7eb"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="profile-page">
      {/* Cover Image */}
      <div className="profile-cover">
        <img src={user.coverImage} alt="Cover" className="cover-image" />
        <div className="cover-overlay"></div>
      </div>

      {/* Profile Header */}
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <img src={user.avatar} alt={user.displayName} />
              {user.isOnline && <span className="online-indicator"></span>}
            </div>
          </div>

          <div className="profile-info">
            <div className="profile-name-row">
              <h1 className="profile-name">
                {user.displayName}
                {user.isVerified && (
                  <span className="verified-badge" title="บัญชียืนยันแล้ว">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#2ecc71"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <circle cx="12" cy="12" r="10" fill="#2ecc71" />
                      <path
                        d="M9 12l2 2 4-4"
                        stroke="#fff"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </span>
                )}
              </h1>
              <span className="profile-username">@{user.username}</span>
            </div>

            <p className="profile-bio">{user.bio}</p>

            <div className="profile-meta">
              {user.location && (
                <span className="meta-item">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {user.location}
                </span>
              )}
              {user.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-item meta-link"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  {user.website.replace("https://", "")}
                </a>
              )}
              <span className="meta-item">
                <svg
                  width="16"
                  height="16"
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
                เข้าร่วมเมื่อ {formatJoinDate(user.joinDate)}
              </span>
            </div>

            {/* Badges */}
            <div className="profile-badges">
              {user.badges.map((badge) => (
                <span
                  key={badge.id}
                  className="badge"
                  style={{
                    backgroundColor: badge.color + "20",
                    color: badge.color,
                  }}
                >
                  {getBadgeIcon(badge.icon)}
                  {badge.name}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">
                  {formatNumber(user.stats.followers)}
                </span>
                <span className="stat-label">ผู้ติดตาม</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {formatNumber(user.stats.following)}
                </span>
                <span className="stat-label">กำลังติดตาม</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{user.stats.products}</span>
                <span className="stat-label">สินค้า</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{user.stats.rating}</span>
                <span className="stat-label">คะแนน</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="profile-actions">
            {isOwner ? (
              /* Owner Actions - Edit Profile */
              <>
                <button
                  className="btn-edit-profile"
                  onClick={() => navigate("/settings")}
                >
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
                  แก้ไขโปรไฟล์
                </button>
                <button className="btn-share">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  แชร์โปรไฟล์
                </button>
              </>
            ) : (
              /* Visitor Actions - Follow & Message */
              <>
                <button
                  className={`btn-follow ${isFollowing ? "following" : ""}`}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? (
                    <>
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
                      กำลังติดตาม
                    </>
                  ) : (
                    <>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <line x1="20" y1="8" x2="20" y2="14" />
                        <line x1="23" y1="11" x2="17" y2="11" />
                      </svg>
                      ติดตาม
                    </>
                  )}
                </button>
                <button className="btn-message">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  ส่งข้อความ
                </button>
              </>
            )}
            <button className="btn-more">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Store Info Card */}
        {user.role === "seller" && (
          <div className="store-info-card">
            <div className="store-header">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <div>
                <h3 className="store-name">{store.name}</h3>
                <p className="store-desc">{store.description}</p>
              </div>
            </div>
            <div className="store-stats">
              <div className="store-stat">
                <span className="store-stat-value">{store.totalSales}</span>
                <span className="store-stat-label">ยอดขาย</span>
              </div>
              <div className="store-stat">
                <span className="store-stat-value">{store.rating}</span>
                <span className="store-stat-label">คะแนน</span>
              </div>
              <div className="store-stat">
                <span className="store-stat-value">{store.responseTime}</span>
                <span className="store-stat-label">ตอบกลับ</span>
              </div>
            </div>
            <button
              className="btn-visit-store"
              onClick={() => navigate(`/store/${user.username}`)}
            >
              เยี่ยมชมร้านค้า
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        )}

        {/* Skills */}
        {user.skills && user.skills.length > 0 && (
          <div className="skills-section">
            <h3 className="section-title">ทักษะ</h3>
            <div className="skills-list">
              {user.skills.map((skill, idx) => (
                <span key={idx} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        <div className="social-links">
          {user.socialLinks.github && (
            <a
              href={user.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link github"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
          {user.socialLinks.linkedin && (
            <a
              href={user.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link linkedin"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          )}
          {user.socialLinks.twitter && (
            <a
              href={user.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link twitter"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          )}
          {user.socialLinks.facebook && (
            <a
              href={user.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link facebook"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          )}
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
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
            สินค้า
            <span className="tab-count">{products.length}</span>
          </button>
          <button
            className={`tab-btn ${activeTab === "posts" ? "active" : ""}`}
            onClick={() => setActiveTab("posts")}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            โพสต์
            <span className="tab-count">{posts.length}</span>
          </button>
          <button
            className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            รีวิว
            <span className="tab-count">{reviews.length}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h4 className="product-name">{product.name}</h4>
                    <div className="product-rating">
                      {renderStars(product.rating)}
                      <span className="rating-text">
                        ({product.sold} ขายแล้ว)
                      </span>
                    </div>
                    <div className="product-price">
                      ฿{formatPrice(product.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Posts Tab */}
          {activeTab === "posts" && (
            <div className="posts-list">
              {posts.map((post) => (
                <div key={post.id} className="post-card">
                  <div className="post-category">{post.category}</div>
                  <h4 className="post-title">{post.title}</h4>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-meta">
                    <span className="post-date">{formatDate(post.date)}</span>
                    <div className="post-stats">
                      <span className="post-stat">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        {post.likes}
                      </span>
                      <span className="post-stat">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <img
                      src={review.reviewer.avatar}
                      alt={review.reviewer.name}
                      className="reviewer-avatar"
                    />
                    <div className="reviewer-info">
                      <span className="reviewer-name">
                        {review.reviewer.name}
                      </span>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="review-date">
                      {formatDate(review.date)}
                    </span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <div className="review-product">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    </svg>
                    {review.product}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
