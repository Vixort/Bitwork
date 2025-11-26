import React, { useRef, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./MarketMain.css";

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

  // รายการหมวดหมู่สินค้าที่ใช้สร้างปุ่มตัวกรองด้านบน
  const fillter = [
    "คอมพิวเตอร์",
    "Power Supply",
    "สายไฟ",
    "ซีพียู",
    "Gadget",
    "แรม(RAM)",
    "การ์ดจอ",
    "จอมอนิเตอร์",
    "คีย์บอร์ด",
    "เมาส์",
  ];

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
    } catch (err) {}
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
    } catch (err) {}
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

  // คำนวณจำนวนรวมสำหรับ badge และยอดรวมราคาเพื่อสรุปท้ายตะกร้า
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[฿,]/g, ""));
    return sum + price * item.quantity;
  }, 0);

  // สินค้าตัวอย่างที่ใช้แสดงในการ์ด (สามารถเปลี่ยนมาจาก API ได้)
  const products = [
    {
      id: 1,
      title: "RTX 4090",
      description: "การ์ดจอประสิทธิภาพสูงสำหรับการเล่นเกมและเรนเดอร์",
      fullDescription:
        "NVIDIA GeForce RTX 4090 เป็นการ์ดจอที่ทรงพลังที่สุดในตระกูล Ada Lovelace ให้ประสิทธิภาพการเล่นเกมที่เหนือชั้น รองรับ Ray Tracing และ DLSS 3.0 เหมาะสำหรับเกมเมอร์และครีเอเตอร์มืออาชีพ",
      price: "฿55,900",
      category: "การ์ดจอ",
      brand: "NVIDIA",
      warranty: "3 ปี",
      specs: {
        memory: "24GB GDDR6X",
        coreClock: "2520 MHz",
        tdp: "450W",
        interface: "PCIe 4.0 x16",
      },
      rating: 4.9,
      reviews: 1250,
      sold: 3420,
    },
    {
      id: 2,
      title: "RTX 4080",
      description: "GPU ทรงพลังสำหรับงานระดับมืออาชีพและการเล่นเกม",
      fullDescription:
        "GeForce RTX 4080 มาพร้อมสถาปัตยกรรม Ada Lovelace รุ่นใหม่ล่าสุด ให้ประสิทธิภาพที่ยอดเยี่ยมทั้งการเล่นเกมและงานสร้างสรรค์ รองรับ 4K gaming ได้อย่างลื่นไหล",
      price: "฿41,900",
      category: "การ์ดจอ",
      brand: "NVIDIA",
      warranty: "3 ปี",
      specs: {
        memory: "16GB GDDR6X",
        coreClock: "2505 MHz",
        tdp: "320W",
        interface: "PCIe 4.0 x16",
      },
      rating: 4.8,
      reviews: 890,
      sold: 2150,
    },
    {
      id: 3,
      title: "RTX 4070",
      description: "ประสิทธิภาพสมดุล เหมาะสำหรับครีเอเตอร์และเกมเมอร์",
      fullDescription:
        "RTX 4070 เป็นตัวเลือกที่คุ้มค่าสำหรับเกมเมอร์ที่ต้องการเล่นเกมที่ความละเอียด 1440p พร้อมประสิทธิภาพ Ray Tracing ที่ยอดเยี่ยม และการใช้พลังงานที่ประหยัด",
      price: "฿27,900",
      category: "การ์ดจอ",
      brand: "NVIDIA",
      warranty: "3 ปี",
      specs: {
        memory: "12GB GDDR6X",
        coreClock: "2475 MHz",
        tdp: "200W",
        interface: "PCIe 4.0 x16",
      },
      rating: 4.7,
      reviews: 1520,
      sold: 4890,
    },
    {
      id: 4,
      title: "GTX 1660 Super",
      description:
        "GPU ระดับเริ่มต้น ประหยัดพลังงาน เหมาะสำหรับการเล่นเกมทั่วไป",
      fullDescription:
        "GeForce GTX 1660 Super เป็นการ์ดจอระดับเริ่มต้นที่ให้ประสิทธิภาพคุ้มค่า เหมาะสำหรับเล่นเกมที่ความละเอียด 1080p ได้อย่างลื่นไหล ใช้พลังงานต่ำและราคาเข้าถึงง่าย",
      price: "฿7,990",
      category: "การ์ดจอ",
      brand: "NVIDIA",
      warranty: "3 ปี",
      specs: {
        memory: "6GB GDDR6",
        coreClock: "1785 MHz",
        tdp: "125W",
        interface: "PCIe 3.0 x16",
      },
      rating: 4.5,
      reviews: 2340,
      sold: 8920,
    },
    {
      id: 5,
      title: "Intel Core i9-14900K",
      description: "โปรเซสเซอร์ระดับท็อปพร้อมประสิทธิภาพที่ยอดเยี่ยม",
      fullDescription:
        "Intel Core i9-14900K เป็น CPU รุ่นเรือธงจาก Intel ที่มาพร้อม 24 cores (8P + 16E) และความเร็วสูงสุดถึง 6.0 GHz เหมาะสำหรับงานหนักทุกประเภท ไม่ว่าจะเป็นเกมหรืองานตัดต่อ",
      price: "฿23,900",
      category: "ซีพียู",
      brand: "Intel",
      warranty: "3 ปี",
      specs: {
        cores: "24 Cores (8P + 16E)",
        threads: "32 Threads",
        baseClock: "3.2 GHz",
        boostClock: "6.0 GHz",
        tdp: "125W",
      },
      rating: 4.8,
      reviews: 680,
      sold: 1890,
    },
    {
      id: 6,
      title: "AMD Ryzen 9 7950X3D",
      description: "CPU เกมมิ่งที่ดีที่สุดพร้อมเทคโนโลยี 3D V-Cache",
      fullDescription:
        "Ryzen 9 7950X3D คือ CPU ที่ดีที่สุดสำหรับการเล่นเกมด้วยเทคโนโลยี 3D V-Cache ที่เพิ่ม L3 Cache มหาศาล ให้ประสิทธิภาพเกมที่เหนือชั้น พร้อมความสามารถ multitasking ระดับเทพ",
      price: "฿20,900",
      category: "ซีพียู",
      brand: "AMD",
      warranty: "3 ปี",
      specs: {
        cores: "16 Cores",
        threads: "32 Threads",
        baseClock: "4.2 GHz",
        boostClock: "5.7 GHz",
        cache: "128MB L3 3D V-Cache",
        tdp: "120W",
      },
      rating: 4.9,
      reviews: 920,
      sold: 2450,
    },
  ];

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
        <span className="cart-icon">🛒</span>
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </button>

      {showCart && (
        // ส่วน overlay + modal ตะกร้า ปิดได้ด้วยการคลิกพื้นหลังหรือลูกศรปิด
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>🛒 ตะกร้าสินค้า ({totalItems})</h2>
              <button className="cart-close" onClick={() => setShowCart(false)}>
                ✕
              </button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                // เมื่อไม่มีสินค้า ให้แสดงข้อความว่างเปล่า
                <div className="cart-empty">
                  <div className="empty-icon">🛒</div>
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
                        🗑️
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
              <button className="checkout-btn" disabled={cart.length === 0}>
                ชำระเงิน
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="ContainerMarketUi">
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
                      className={`filter-btn ${
                        selectedCategory === item ? "active" : ""
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
                <button>🔍</button>
              </div>
            </div>
          </div>

          <div className="Market">
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
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
          />
        )}
      </div>
    </div>
  );
};

function ProductCard({ product, onAddToCart, onViewDetail, aosDelay = 0 }) {
  return (
    <div
      className="product-card"
      onClick={onViewDetail}
      data-aos="fade-up"
      data-aos-delay={aosDelay}
    >
      {/* ส่วนรูป (ตอนนี้ใช้ emoji แทน) */}
      <div className="product-image-area">
        <div className="product-image-placeholder">📦</div>
        {/* แสดง Tag หมวดหมู่มุมซ้ายบนของรูป */}
        {product.category && (
          <span className="product-tag">{product.category}</span>
        )}
      </div>
      <div className="product-body">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{product.price}</span>
          <button
            className="product-btn-buy"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            ซื้อเลย
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal สำหรับแสดงรายละเอียดสินค้า
function ProductDetailModal({ product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    onClose();
  };

  return (
    <div className="product-detail-overlay" onClick={onClose}>
      <div
        className="product-detail-modal"
        onClick={(e) => e.stopPropagation()}
        data-aos="zoom-in"
        data-aos-duration="300"
      >
        <button className="detail-close" onClick={onClose}>
          ✕
        </button>

        <div className="detail-image-area">
          <div className="detail-image-placeholder">📦</div>
          {product.category && (
            <span className="detail-tag">{product.category}</span>
          )}
          {product.brand && (
            <span className="detail-brand-tag">{product.brand}</span>
          )}
        </div>

        <div className="detail-content">
          <div className="detail-header">
            <h2 className="detail-title">{product.title}</h2>
            {product.rating && (
              <div className="detail-rating">
                <span className="rating-stars">⭐ {product.rating}</span>
                <span className="rating-count">({product.reviews} รีวิว)</span>
              </div>
            )}
          </div>

          <p className="detail-description">
            {product.fullDescription || product.description}
          </p>

          {/* Specifications */}
          {product.specs && (
            <div className="detail-specs">
              <h4 className="specs-title">📋 สเปคสินค้า</h4>
              <div className="specs-grid">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-label">{formatSpecLabel(key)}</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="detail-info">
            <div className="detail-info-item">
              <span className="detail-label">หมวดหมู่</span>
              <span className="detail-value">{product.category}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-label">แบรนด์</span>
              <span className="detail-value">{product.brand || "ไม่ระบุ"}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-label">ประกัน</span>
              <span className="detail-value">{product.warranty || "1 ปี"}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-label">ขายแล้ว</span>
              <span className="detail-value detail-sold">
                {product.sold ? product.sold.toLocaleString() : "0"} ชิ้น
              </span>
            </div>
          </div>

          <div className="detail-status">
            <span className="status-badge in-stock">✓ มีสินค้า</span>
            <span className="status-shipping">🚚 จัดส่งฟรีทั่วประเทศ</span>
          </div>

          <div className="detail-footer">
            <div className="detail-price-section">
              <span className="detail-price">{product.price}</span>
              <span className="detail-price-note">ราคารวม VAT แล้ว</span>
            </div>

            <div className="detail-actions">
              <div className="quantity-selector">
                <button
                  className="qty-control-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  className="qty-control-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button className="detail-btn-buy" onClick={handleAddToCart}>
                🛒 เพิ่มลงตะกร้า
              </button>
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

export default MarketMain;
