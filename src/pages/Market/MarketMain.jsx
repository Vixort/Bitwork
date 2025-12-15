import React, { useRef, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./MarketMain.css";

// Import shared products data from central JSON file (keeping for storeInfo/categories)
import { categories as categoryList } from "../../data/constants";
import { fetchProducts } from "../../lib/api";

// Transform data to match Market format
const transformProductsForMarket = (products) => {
  return products
    .filter((p) => p.status === "active") // Only show active products
    .map((product) => ({
      id: product.id,
      title: product.title || product.name, // Schema uses title, JSON uses name? Check data.
      description: product.description,
      fullDescription: product.fullDescription || product.description,
      price: `฿${product.price.toLocaleString()}`,
      priceNumber: product.price,
      category: product.category,
      brand: product.brand,
      warranty: product.warranty,
      weight: product.weight,
      stock: product.stock,
      sku: product.sku,
      images: product.images,
      specs: product.specs,
      rating: product.rating,
      sold: product.sold || product.sales || 0, // Handle schema 'sold' vs json 'sales'
      seller: product.seller || productsData.storeInfo.name,
      reviewsList:
        product.reviews?.map((r) => ({
          ...r,
          comment: r.comment,
        })) || [],
    }));
};

const marketData = {
  storeInfo: productsData.storeInfo,
  categories: productsData.categories,
  // products: ... removed from static
};

const MarketMain = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 50,
    });
  }, []);

  // Fetch products from API
  const [dbProducts, setDbProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (data) setDbProducts(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadProducts();
  }, []);

  // Fallback to empty array if no db products, do NOT show mock data
  const displayProducts = dbProducts.length > 0 ? transformProductsForMarket(dbProducts) : [];


  // รายการหมวดหมู่สินค้าที่ใช้สร้างปุ่มตัวกรองด้านบน (จาก JSON)
  const fillter = categoryList;

  // ref สำหรับควบคุมรายการปุ่มให้ลากได้เหมือน trackpad/เมาส์
  const menuRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasMoved = useRef(false); // เช็คว่ามีการลากเกิดขึ้นหรือไม่

  // state เก็บรายการในตะกร้า + ควบคุมการเปิดปิด modal
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  // state สำหรับเก็บหมวดหมู่ที่เลือก (null = แสดงทั้งหมด)
  const [selectedCategory, setSelectedCategory] = useState(null);
  // state สำหรับคำค้นหา
  const [searchTerm, setSearchTerm] = useState("");
  // state สำหรับเก็บสินค้าที่เลือกดูรายละเอียด
  const [selectedProduct, setSelectedProduct] = useState(null);
  // state สำหรับ checkout
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // เมื่อกดเมาส์/นิ้วลง ให้บันทึกจุดเริ่มลากและ lock pointer ไว้กับ list
  const onPointerDown = (e) => {
    // ถ้ากดที่ปุ่ม filter ไม่ต้องเริ่มลากที่ container
    if (e.target.classList.contains("filter-btn")) return;

    const el = menuRef.current;
    isDown.current = true;
    hasMoved.current = false; // รีเซ็ตสถานะการลาก
    el.classList.add("dragging");
    startX.current = e.clientX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    try {
      el.setPointerCapture(e.pointerId);
    } catch (err) { }
  };

  // ตอนลากอยู่ให้คำนวณระยะและเลื่อน scrollLeft ตามระยะที่ขยับ
  const onPointerMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const el = menuRef.current;
    const x = e.clientX - el.offsetLeft;
    const walk = (x - startX.current) * 1;

    // ถ้าขยับเกิน 5px ให้ถือว่าเป็นการลาก
    if (Math.abs(walk) > 5) {
      hasMoved.current = true;
    }

    el.scrollLeft = scrollLeft.current - walk;
  };

  // ปล่อยนิ้ว/เมาส์แล้วให้ยกเลิกสถานะลากและคืน pointer capture
  const onPointerUp = (e) => {
    const el = menuRef.current;
    isDown.current = false;
    el.classList.remove("dragging");
    try {
      el.releasePointerCapture(e.pointerId);
    } catch (err) { }
  };

  // ฟังก์ชันจัดการคลิกปุ่ม Filter
  const handleFilterClick = (e, category) => {
    // เนื่องจากเราใส่ stopPropagation ที่ปุ่มแล้ว จึงไม่ต้องเช็ค hasMoved
    // เพราะถ้ากดปุ่ม จะไม่มีการลากเกิดขึ้นที่ container แน่นอน

    // ถ้าเลือกหมวดหมู่เดิมให้ยกเลิก (แสดงทั้งหมด), ถ้าเลือกใหม่ให้เปลี่ยน
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  // รองรับการใช้ล้อเมาส์เลื่อนแนวนอน (แปลง deltaY -> scrollLeft)
  // เฉพาะเมื่อยังมีพื้นที่ให้เลื่อนได้ ถ้าถึงขอบแล้วจะปล่อยให้หน้าเว็บเลื่อนตามปกติ
  const onWheel = (e) => {
    const el = menuRef.current;
    if (!el) return;

    const delta = e.deltaY;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const currentScrollLeft = el.scrollLeft;

    // ถ้าเลื่อนไปทางขวา (delta > 0) และยังไม่ถึงขอบขวา
    // หรือถ้าเลื่อนไปทางซ้าย (delta < 0) และยังไม่ถึงขอบซ้าย
    // ให้ป้องกันการเลื่อนหน้าเว็บและเลื่อน filter แทน
    const canScrollRight = delta > 0 && currentScrollLeft < maxScrollLeft;
    const canScrollLeft = delta < 0 && currentScrollLeft > 0;

    if (canScrollRight || canScrollLeft) {
      e.preventDefault();
      el.scrollLeft += delta * 1.2;
    }
    // ถ้าถึงขอบแล้ว ไม่ต้องทำอะไร ปล่อยให้หน้าเว็บเลื่อนตามปกติ
  };

  // เพิ่มสินค้าลงตะกร้า หากมีอยู่แล้วก็เพิ่มจำนวน
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // ปุ่ม +/- ใช้ฟังก์ชันนี้ปรับจำนวน และลบออกเมื่อเหลือ 0
  const updateQuantity = (id, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ลบสินค้าทั้งชิ้นออกจากตะกร้า
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // เปิดหน้า checkout
  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  // เมื่อชำระเงินสำเร็จ
  const handlePaymentComplete = (orderNum) => {
    setOrderNumber(orderNum);
    setOrderComplete(true);
    setShowCheckout(false);
    setCart([]); // ล้างตะกร้า
  };

  // ปิด order complete และกลับไปช้อปต่อ
  const handleContinueShopping = () => {
    setOrderComplete(false);
    setOrderNumber("");
  };

  // คำนวณจำนวนรวมสำหรับ badge และยอดรวมราคาเพื่อสรุปท้ายตะกร้า
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[฿,]/g, ""));
    return sum + price * item.quantity;
  }, 0);

  // สินค้าตัวอย่างที่ใช้แสดงในการ์ด
  const products = displayProducts;
  const storeInfo = marketData.storeInfo;

  // กรองสินค้าตามหมวดหมู่และคำค้นหา
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory
      ? p.category === selectedCategory
      : true;
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* ปุ่มลอยของตะกร้าที่มุมขวาบน พร้อม badge แสดงจำนวน */}
      <button className="cart-button" onClick={() => setShowCart(true)}>
        <span className="cart-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </span>
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </button>

      {showCart && (
        // ส่วน overlay + modal ตะกร้า ปิดได้ด้วยการคลิกพื้นหลังหรือลูกศรปิด
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                ตะกร้าสินค้า ({totalItems})
              </h2>
              <button className="cart-close" onClick={() => setShowCart(false)}>
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

            <div className="cart-items">
              {cart.length === 0 ? (
                // เมื่อไม่มีสินค้า ให้แสดงข้อความว่างเปล่า
                <div className="cart-empty">
                  <div className="empty-icon">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </div>
                  <p>ตะกร้าว่างเปล่า</p>
                </div>
              ) : (
                // แสดงรายการสินค้าแต่ละชิ้นพร้อมปุ่มปรับจำนวนและลบ
                cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.title}</h4>
                      <p className="cart-item-price">{item.price}</p>
                    </div>
                    <div className="cart-item-actions">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
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
                ))
              )}
            </div>

            <div className="cart-footer">
              {/* ส่วนสรุปราคาและปุ่ม Checkout */}
              <div className="cart-total">
                <span>ยอดรวม:</span>
                <span className="total-price">
                  ฿{totalPrice.toLocaleString()}
                </span>
              </div>
              <button
                className="checkout-btn"
                disabled={cart.length === 0}
                onClick={handleCheckout}
              >
                ดำเนินการชำระเงิน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          cart={cart}
          totalPrice={totalPrice}
          totalItems={totalItems}
          onClose={() => setShowCheckout(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {/* Order Complete Modal */}
      {orderComplete && (
        <OrderCompleteModal
          orderNumber={orderNumber}
          onContinueShopping={handleContinueShopping}
        />
      )}

      <div className="ContainerMarketUi">
        {/* Promo Banner Ads */}
        <section className="market-promo-banners">
          <div
            className="market-promo-card market-promo-primary"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <div className="market-promo-content">
              <span className="market-promo-tag">สินค้าใหม่</span>
              <h3>RTX 40 Series</h3>
              <p>การ์ดจอรุ่นใหม่ล่าสุด ประสิทธิภาพสูงสุด</p>
              <button className="market-promo-btn">ดูสินค้า →</button>
            </div>
            <div className="market-promo-icon">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="currentColor"
                opacity="0.3"
              >
                <path d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 4h4v3h-4V4zm0 12H8v-2h2v2zm0-4H8v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2z" />
              </svg>
            </div>
          </div>
          <div
            className="market-promo-card market-promo-secondary"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="market-promo-content">
              <span className="market-promo-tag">ลดสูงสุด 30%</span>
              <h3>Flash Sale</h3>
              <p>สินค้าลดราคาพิเศษ เฉพาะวันนี้เท่านั้น!</p>
              <button className="market-promo-btn">ช้อปเลย →</button>
            </div>
            <div className="market-promo-icon">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="currentColor"
                opacity="0.3"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
          </div>
          <div
            className="market-promo-card market-promo-accent"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="market-promo-content">
              <span className="market-promo-tag">ฟรีค่าส่ง</span>
              <h3>ส่งฟรีทั่วไทย</h3>
              <p>สั่งซื้อครบ ฿1,500 ส่งฟรีทันที</p>
              <button className="market-promo-btn">เริ่มช้อป →</button>
            </div>
            <div className="promo-icon">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="currentColor"
                opacity="0.3"
              >
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
            </div>
          </div>
        </section>

        {/* Wide Banner Ad */}
        <section className="wide-banner" data-aos="fade-up">
          <div className="wide-banner-content">
            <div className="wide-banner-text">
              <span className="wide-banner-badge">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                โปรโมชั่นพิเศษ
              </span>
              <h2 className="wide-banner-title">
                ลดทั้งร้าน <span className="highlight">สูงสุด 50%</span>
              </h2>
              <p className="wide-banner-subtitle">
                เฉพาะสมาชิก Bitwork เท่านั้น!
                รับส่วนลดพิเศษทันทีเมื่อสมัครสมาชิก
              </p>
              <div className="wide-banner-cta">
                <button className="wide-banner-btn primary">สมัครเลย</button>
                <button className="wide-banner-btn secondary">
                  ดูรายละเอียด
                </button>
              </div>
            </div>
            <div className="wide-banner-visual">
              <div className="discount-badge">
                <span className="discount-number">50</span>
                <span className="discount-percent">%</span>
                <span className="discount-text">OFF</span>
              </div>
              <div className="decorative-circles">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
              </div>
            </div>
          </div>
        </section>

        <div className="ShopMenu">
          <div className="PostionItemFillter" data-aos="fade-down">
            <div className="ContainerItemFillter">
              <div className="MenuItem">
                {/* รายการปุ่มหมวดหมู่ที่ลากได้ */}
                <ul
                  className="scroll-list"
                  ref={menuRef}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerLeave={onPointerUp}
                  onWheel={onWheel}
                >
                  {fillter.map((item, index) => (
                    <button
                      key={index}
                      className={`filter-btn ${selectedCategory === item ? "active" : ""
                        }`}
                      onClick={(e) => handleFilterClick(e, item)}
                      onPointerDown={(e) => e.stopPropagation()} // ป้องกัน event ชนกับ container
                    >
                      {item}
                    </button>
                  ))}
                </ul>
              </div>
              <div className="SearchBox">
                {/* กล่องค้นหา */}
                <input
                  type="text"
                  placeholder="ค้นหา..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="Market">
            {/* Section Title */}
            <div className="section-header" data-aos="fade-up">
              <h2 className="section-title">
                <span className="title-icon">
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
                </span>
                สินค้าทั้งหมด
              </h2>
              <p className="section-subtitle">
                เลือกสินค้าคุณภาพจากร้านค้าชั้นนำ
              </p>
            </div>

            <div className="CardShop">
              {/* วน products เพื่อสร้าง ProductCard แต่ละใบ */}
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onViewDetail={() => setSelectedProduct(product)}
                    aosDelay={index * 100}
                  />
                ))
              ) : (
                <div className="no-products">ไม่พบสินค้าในหมวดหมู่นี้</div>
              )}
            </div>
          </div>

          {/* Features Section */}
          <section className="features-section" data-aos="fade-up">
            <div className="feature-item">
              <div className="feature-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className="feature-text">
                <h4>สินค้าแท้ 100%</h4>
                <p>รับประกันคุณภาพจากผู้ผลิต</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                >
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
              </div>
              <div className="feature-text">
                <h4>เปลี่ยนคืนได้</h4>
                <p>ภายใน 7 วัน ไม่พอใจยินดีคืนเงิน</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="feature-text">
                <h4>รับประกันสินค้า</h4>
                <p>ประกันศูนย์ไทย 1-3 ปี</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
              <div className="feature-text">
                <h4>ผ่อน 0%</h4>
                <p>ผ่อนชำระได้สูงสุด 10 เดือน</p>
              </div>
            </div>
          </section>
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
            storeInfo={storeInfo}
          />
        )}
      </div>
    </div>
  );
};

function ProductCard({ product, onAddToCart, onViewDetail, aosDelay = 0 }) {
  return (
    <div
      className="market-product-card"
      onClick={onViewDetail}
      data-aos="fade-up"
      data-aos-delay={aosDelay}
    >
      {/* ส่วนรูป */}
      <div className="market-product-image-area">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="market-product-image"
          />
        ) : (
          <div className="market-product-image-placeholder">
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
        {/* แสดง Tag หมวดหมู่มุมซ้ายบนของรูป */}
        {product.category && (
          <span className="market-product-tag">{product.category}</span>
        )}
        {/* แสดง Rating */}
        {product.rating > 0 && (
          <span className="market-product-rating">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {product.rating}
          </span>
        )}
        {/* แสดงสถานะสินค้าหมด */}
        {product.stock === 0 && (
          <div className="market-product-out-of-stock">สินค้าหมด</div>
        )}
      </div>
      <div className="market-product-body">
        <h3 className="market-product-title">{product.title}</h3>
        <p className="market-product-description">{product.description}</p>
        <div className="market-product-meta">
          <span className="market-product-sold">
            ขายแล้ว {product.sold || 0}
          </span>
        </div>
        <div className="market-product-footer">
          <span className="market-product-price">{product.price}</span>
          <button
            className="market-product-btn-buy"
            onClick={(e) => {
              e.stopPropagation();
              if (product.stock > 0) {
                onAddToCart(product);
              }
            }}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "หมด" : "ซื้อเลย"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal สำหรับแสดงรายละเอียดสินค้า (เหมือน Customer View ใน Settings)
function ProductDetailModal({ product, onClose, onAddToCart, storeInfo }) {
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [newComment, setNewComment] = useState({
    rating: 5,
    text: "",
    images: [],
  });

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    onClose();
  };

  // Get product image
  const getProductImage = (index = 0) => {
    if (product.images && product.images.length > 0) {
      return product.images[index] || product.images[0];
    }
    return "https://via.placeholder.com/400";
  };

  // Calculate average rating
  const calculateAverageRating = () => {
    if (!product.reviewsList || product.reviewsList.length === 0) {
      return product.rating || 0;
    }
    const sum = product.reviewsList.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    return (sum / product.reviewsList.length).toFixed(1);
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
    setNewComment({ rating: 5, text: "", images: [] });
  };

  return (
    <div className="market-detail-overlay" onClick={onClose}>
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
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span>รายละเอียดสินค้า</span>
          </div>
          <button className="market-cv-close" onClick={onClose}>
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
              {product.images && product.images.length > 0 ? (
                <img
                  src={getProductImage(activeImageIndex)}
                  alt={product.title}
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
              {product.stock === 0 && (
                <div className="market-cv-out-of-stock-overlay">
                  <span>สินค้าหมด</span>
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="market-cv-thumbnails">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`market-cv-thumbnail ${activeImageIndex === idx ? "active" : ""
                      }`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`${product.title} ${idx + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="market-cv-info-section">
            {/* Store Info */}
            {storeInfo && (
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
                  <div className="market-cv-store-rating">
                    {renderStars(Math.round(storeInfo.rating))}
                    <span>
                      {storeInfo.rating} ({storeInfo.totalReviews} รีวิว)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Product Header */}
            <div className="market-cv-product-header">
              <h2 className="market-cv-product-title">{product.title}</h2>
              <div className="market-cv-product-meta">
                <span className="market-cv-sku-badge">
                  SKU: {product.sku || "N/A"}
                </span>
                <span className="market-cv-category-badge">
                  {product.category}
                </span>
                <span
                  className={`market-cv-status-badge ${product.stock > 0 ? "in-stock" : "out-of-stock"
                    }`}
                >
                  {product.stock > 0 ? "พร้อมจำหน่าย" : "สินค้าหมด"}
                </span>
              </div>
            </div>

            {/* Rating Summary */}
            {(product.reviewsList?.length > 0 || product.rating) && (
              <div className="market-cv-rating-summary">
                <div className="market-cv-rating-big">
                  {calculateAverageRating()}
                </div>
                <div className="market-cv-rating-details">
                  <div className="market-cv-stars-row">
                    {renderStars(Math.round(calculateAverageRating()))}
                  </div>
                  <span>
                    {product.reviewsList?.length || 0} รีวิวจากผู้ซื้อ
                  </span>
                </div>
              </div>
            )}

            {/* Price Section */}
            <div className="market-cv-price-section">
              <div className="market-cv-main-price">{product.price}</div>
              {product.stock > 0 && product.stock < 10 && (
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
                  เหลือเพียง {product.stock} ชิ้น!
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="market-cv-actions">
              {product.stock > 0 ? (
                <>
                  <button
                    className="market-cv-cart-btn"
                    onClick={() => onAddToCart(product)}
                  >
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
                  <button
                    className="market-cv-buy-btn"
                    onClick={handleAddToCart}
                  >
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
                className={`market-cv-tab-btn ${activeTab === "details" ? "active" : ""
                  }`}
                onClick={() => setActiveTab("details")}
              >
                รายละเอียด
              </button>
              <button
                className={`market-cv-tab-btn ${activeTab === "reviews" ? "active" : ""
                  }`}
                onClick={() => setActiveTab("reviews")}
              >
                รีวิว ({product.reviewsList?.length || 0})
              </button>
              <button
                className={`market-cv-tab-btn ${activeTab === "comments" ? "active" : ""
                  }`}
                onClick={() => setActiveTab("comments")}
              >
                เขียนรีวิว
              </button>
            </div>

            {/* Tab Content */}
            <div className="market-cv-tab-content">
              {/* Details Tab */}
              {activeTab === "details" && (
                <div className="market-cv-details-tab">
                  <div className="market-cv-description">
                    <h3>รายละเอียดสินค้า</h3>
                    <p>{product.fullDescription || product.description}</p>
                  </div>

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
                          <span className="spec-label">น้ำหนัก</span>
                          <span className="spec-value">
                            {product.weight || "N/A"}
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
                          <span className="spec-label">การรับประกัน</span>
                          <span className="spec-value">
                            {product.warranty || "N/A"}
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
                          <span className="spec-label">สต็อก</span>
                          <span className="spec-value">
                            {product.stock || 0} ชิ้น
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
                          <span className="spec-label">ยอดขายแล้ว</span>
                          <span className="spec-value">
                            {product.sold || 0} ชิ้น
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div className="market-cv-reviews-tab">
                  {product.reviewsList && product.reviewsList.length > 0 ? (
                    <div className="market-cv-reviews-list">
                      {product.reviewsList.map((review) => (
                        <div key={review.id} className="market-cv-review-item">
                          <div className="market-cv-review-header">
                            <div className="market-cv-reviewer-info">
                              <img
                                src={review.avatar}
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
                              {renderStars(review.rating)}
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
                          <div className="market-cv-review-footer">
                            <button className="market-cv-helpful-btn">
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
              {activeTab === "comments" && (
                <div className="market-cv-comments-tab">
                  <h3>เขียนรีวิวสินค้า</h3>

                  {/* Rating Selection */}
                  <div className="market-cv-comment-rating">
                    <label>ให้คะแนนสินค้า</label>
                    <div className="market-cv-rating-selector">
                      {renderStars(newComment.rating, true, (rating) =>
                        setNewComment((prev) => ({ ...prev, rating }))
                      )}
                      <span className="market-cv-rating-text">
                        {newComment.rating === 5 && "ยอดเยี่ยม"}
                        {newComment.rating === 4 && "ดีมาก"}
                        {newComment.rating === 3 && "ปานกลาง"}
                        {newComment.rating === 2 && "พอใช้"}
                        {newComment.rating === 1 && "ต้องปรับปรุง"}
                      </span>
                    </div>
                  </div>

                  {/* Comment Text */}
                  <div className="market-cv-comment-text">
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
                  <div className="market-cv-comment-images">
                    <label>เพิ่มรูปภาพ (ไม่บังคับ)</label>
                    <div className="market-cv-image-upload-area">
                      {newComment.images.map((img, idx) => (
                        <div key={idx} className="market-cv-uploaded-image">
                          <img src={img} alt={`Upload ${idx + 1}`} />
                          <button
                            className="market-cv-remove-image"
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
                          className="market-cv-add-image-btn"
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
                    <span className="market-cv-image-hint">
                      สามารถเพิ่มได้สูงสุด 5 รูป
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    className="market-cv-submit-btn"
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
      </div>
    </div>
  );
}

// Helper function สำหรับแปลง key เป็นชื่อที่อ่านง่าย
function formatSpecLabel(key) {
  const labels = {
    memory: "หน่วยความจำ",
    coreClock: "ความเร็ว Core",
    tdp: "TDP",
    interface: "Interface",
    cores: "จำนวน Cores",
    threads: "จำนวน Threads",
    baseClock: "Base Clock",
    boostClock: "Boost Clock",
    cache: "Cache",
  };
  return labels[key] || key;
}

// Checkout Modal Component
function CheckoutModal({
  cart,
  totalPrice,
  totalItems,
  onClose,
  onPaymentComplete,
}) {
  const [step, setStep] = useState(1); // 1: shipping, 2: payment, 3: confirm
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    district: "",
    province: "",
    postalCode: "",
    note: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const shippingCost = totalPrice >= 1500 ? 0 : 50;
  const grandTotal = totalPrice + shippingCost;

  const handleShippingChange = (field, value) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleCardChange = (field, value) => {
    setCardInfo((prev) => ({ ...prev, [field]: value }));
  };

  const isShippingValid = () => {
    return (
      shippingInfo.fullName &&
      shippingInfo.phone &&
      shippingInfo.address &&
      shippingInfo.district &&
      shippingInfo.province &&
      shippingInfo.postalCode
    );
  };

  const isPaymentValid = () => {
    if (paymentMethod === "credit" || paymentMethod === "debit") {
      return (
        cardInfo.number && cardInfo.name && cardInfo.expiry && cardInfo.cvv
      );
    }
    return true; // For other methods like COD, QR
  };

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      const orderNum = "BW" + Date.now().toString().slice(-8);
      onPaymentComplete(orderNum);
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="checkout-header">
          <h2>
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
            ชำระเงิน
          </h2>
          <button className="checkout-close-btn" onClick={onClose}>
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

        {/* Progress Steps */}
        <div className="checkout-progress">
          <div
            className={`progress-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""
              }`}
          >
            <div className="step-number">
              {step > 1 ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                "1"
              )}
            </div>
            <span>ที่อยู่จัดส่ง</span>
          </div>
          <div className="progress-line"></div>
          <div
            className={`progress-step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""
              }`}
          >
            <div className="step-number">
              {step > 2 ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                "2"
              )}
            </div>
            <span>ชำระเงิน</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? "active" : ""}`}>
            <div className="step-number">3</div>
            <span>ยืนยันคำสั่งซื้อ</span>
          </div>
        </div>

        {/* Content */}
        <div className="checkout-content">
          {/* Step 1: Shipping Info */}
          {step === 1 && (
            <div className="checkout-step shipping-step">
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
                ข้อมูลการจัดส่ง
              </h3>

              <div className="checkout-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>ชื่อ-นามสกุล *</label>
                    <input
                      type="text"
                      placeholder="ชื่อผู้รับสินค้า"
                      value={shippingInfo.fullName}
                      onChange={(e) =>
                        handleShippingChange("fullName", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>เบอร์โทรศัพท์ *</label>
                    <input
                      type="tel"
                      placeholder="0XX-XXX-XXXX"
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        handleShippingChange("phone", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>ที่อยู่ *</label>
                  <textarea
                    placeholder="บ้านเลขที่ ซอย ถนน"
                    value={shippingInfo.address}
                    onChange={(e) =>
                      handleShippingChange("address", e.target.value)
                    }
                    rows={2}
                  />
                </div>

                <div className="form-row form-row-3">
                  <div className="form-group">
                    <label>แขวง/ตำบล *</label>
                    <input
                      type="text"
                      placeholder="แขวง/ตำบล"
                      value={shippingInfo.district}
                      onChange={(e) =>
                        handleShippingChange("district", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>จังหวัด *</label>
                    <input
                      type="text"
                      placeholder="จังหวัด"
                      value={shippingInfo.province}
                      onChange={(e) =>
                        handleShippingChange("province", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>รหัสไปรษณีย์ *</label>
                    <input
                      type="text"
                      placeholder="XXXXX"
                      value={shippingInfo.postalCode}
                      onChange={(e) =>
                        handleShippingChange("postalCode", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>หมายเหตุถึงผู้ขาย (ไม่บังคับ)</label>
                  <input
                    type="text"
                    placeholder="เช่น ฝากไว้ที่ป้อมรักษาการณ์"
                    value={shippingInfo.note}
                    onChange={(e) =>
                      handleShippingChange("note", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="checkout-step payment-step">
              <h3>
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
                เลือกวิธีชำระเงิน
              </h3>

              <div className="payment-methods">
                <label
                  className={`payment-option ${paymentMethod === "credit" ? "selected" : ""
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={paymentMethod === "credit"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-option-content">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    <div>
                      <span className="payment-title">บัตรเครดิต</span>
                      <span className="payment-desc">
                        Visa, Mastercard, JCB
                      </span>
                    </div>
                  </div>
                </label>

                <label
                  className={`payment-option ${paymentMethod === "debit" ? "selected" : ""
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="debit"
                    checked={paymentMethod === "debit"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-option-content">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    <div>
                      <span className="payment-title">บัตรเดบิต</span>
                      <span className="payment-desc">ทุกธนาคารชั้นนำ</span>
                    </div>
                  </div>
                </label>

                <label
                  className={`payment-option ${paymentMethod === "qr" ? "selected" : ""
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="qr"
                    checked={paymentMethod === "qr"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-option-content">
                    <svg
                      width="24"
                      height="24"
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
                    <div>
                      <span className="payment-title">QR PromptPay</span>
                      <span className="payment-desc">
                        สแกน QR จ่ายผ่าน Mobile Banking
                      </span>
                    </div>
                  </div>
                </label>

                <label
                  className={`payment-option ${paymentMethod === "cod" ? "selected" : ""
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-option-content">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    <div>
                      <span className="payment-title">เก็บเงินปลายทาง</span>
                      <span className="payment-desc">
                        ชำระเงินเมื่อรับสินค้า (+฿30)
                      </span>
                    </div>
                  </div>
                </label>
              </div>

              {/* Card Info Form */}
              {(paymentMethod === "credit" || paymentMethod === "debit") && (
                <div className="card-form">
                  <div className="form-group">
                    <label>หมายเลขบัตร</label>
                    <input
                      type="text"
                      placeholder="XXXX XXXX XXXX XXXX"
                      value={cardInfo.number}
                      onChange={(e) =>
                        handleCardChange(
                          "number",
                          formatCardNumber(e.target.value)
                        )
                      }
                      maxLength={19}
                    />
                  </div>
                  <div className="form-group">
                    <label>ชื่อบนบัตร</label>
                    <input
                      type="text"
                      placeholder="CARD HOLDER NAME"
                      value={cardInfo.name}
                      onChange={(e) =>
                        handleCardChange("name", e.target.value.toUpperCase())
                      }
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>วันหมดอายุ</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardInfo.expiry}
                        onChange={(e) =>
                          handleCardChange("expiry", e.target.value)
                        }
                        maxLength={5}
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="password"
                        placeholder="***"
                        value={cardInfo.cvv}
                        onChange={(e) =>
                          handleCardChange("cvv", e.target.value)
                        }
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* QR Code Display */}
              {paymentMethod === "qr" && (
                <div className="qr-payment">
                  <div className="qr-code-placeholder">
                    <svg
                      width="120"
                      height="120"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                  </div>
                  <p className="qr-instruction">
                    สแกน QR Code ด้วยแอป Mobile Banking
                  </p>
                  <p className="qr-amount">
                    ยอดชำระ: <strong>฿{grandTotal.toLocaleString()}</strong>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Order Confirmation */}
          {step === 3 && (
            <div className="checkout-step confirm-step">
              <h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                ตรวจสอบคำสั่งซื้อ
              </h3>

              {/* Order Summary */}
              <div className="order-summary">
                <div className="summary-section">
                  <h4>สินค้าในคำสั่งซื้อ ({totalItems} ชิ้น)</h4>
                  <div className="order-items">
                    {cart.map((item) => (
                      <div key={item.id} className="order-item">
                        <span className="item-name">{item.title}</span>
                        <span className="item-qty">x{item.quantity}</span>
                        <span className="item-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="summary-section">
                  <h4>ที่อยู่จัดส่ง</h4>
                  <div className="shipping-summary">
                    <p>
                      <strong>{shippingInfo.fullName}</strong>
                    </p>
                    <p>{shippingInfo.phone}</p>
                    <p>{shippingInfo.address}</p>
                    <p>
                      {shippingInfo.district}, {shippingInfo.province}{" "}
                      {shippingInfo.postalCode}
                    </p>
                    {shippingInfo.note && (
                      <p className="note">หมายเหตุ: {shippingInfo.note}</p>
                    )}
                  </div>
                </div>

                <div className="summary-section">
                  <h4>วิธีชำระเงิน</h4>
                  <p className="payment-summary">
                    {paymentMethod === "credit" && "บัตรเครดิต"}
                    {paymentMethod === "debit" && "บัตรเดบิต"}
                    {paymentMethod === "qr" && "QR PromptPay"}
                    {paymentMethod === "cod" && "เก็บเงินปลายทาง"}
                    {(paymentMethod === "credit" ||
                      paymentMethod === "debit") &&
                      cardInfo.number &&
                      ` (****${cardInfo.number.slice(-4)})`}
                  </p>
                </div>

                <div className="price-breakdown">
                  <div className="price-row">
                    <span>ราคาสินค้า</span>
                    <span>฿{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="price-row">
                    <span>ค่าจัดส่ง</span>
                    <span>
                      {shippingCost === 0 ? "ฟรี" : `฿${shippingCost}`}
                    </span>
                  </div>
                  {paymentMethod === "cod" && (
                    <div className="price-row">
                      <span>ค่าบริการเก็บเงินปลายทาง</span>
                      <span>฿30</span>
                    </div>
                  )}
                  <div className="price-row total">
                    <span>ยอดรวมทั้งสิ้น</span>
                    <span>
                      ฿
                      {(
                        grandTotal + (paymentMethod === "cod" ? 30 : 0)
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="checkout-footer">
          <div className="footer-left">
            {step > 1 && (
              <button
                className="checkout-back-btn"
                onClick={() => setStep(step - 1)}
              >
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
                ย้อนกลับ
              </button>
            )}
          </div>
          <div className="footer-right">
            {step < 3 ? (
              <button
                className="checkout-next-btn"
                onClick={() => setStep(step + 1)}
                disabled={step === 1 ? !isShippingValid() : !isPaymentValid()}
              >
                ถัดไป
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
            ) : (
              <button
                className="checkout-confirm-btn"
                onClick={handleConfirmOrder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner"></span>
                    กำลังดำเนินการ...
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
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    ยืนยันการสั่งซื้อ
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Order Complete Modal Component
function OrderCompleteModal({ orderNumber, onContinueShopping }) {
  return (
    <div className="order-complete-overlay">
      <div className="order-complete-modal">
        <div className="success-animation">
          <div className="success-checkmark">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        </div>

        <h2>สั่งซื้อสำเร็จ!</h2>
        <p className="order-number-label">หมายเลขคำสั่งซื้อ</p>
        <p className="order-number">{orderNumber}</p>

        <div className="order-info">
          <p>ขอบคุณที่ใช้บริการ Bitwork Store</p>
          <p>เราจะจัดส่งสินค้าให้คุณภายใน 1-3 วันทำการ</p>
        </div>

        <div className="order-actions">
          <button className="view-order-btn">
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
            </svg>
            ดูคำสั่งซื้อ
          </button>
          <button
            className="continue-shopping-btn"
            onClick={onContinueShopping}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            ช้อปต่อ
          </button>
        </div>
      </div>
    </div>
  );
}

export default MarketMain;
