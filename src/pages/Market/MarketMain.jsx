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
              <button className="checkout-btn" disabled={cart.length === 0}>
                ชำระเงิน
              </button>
            </div>
          </div>
        </div>
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
      {/* ส่วนรูป */}
      <div className="product-image-area">
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

        <div className="detail-image-area">
          <div className="detail-image-placeholder">
            <svg
              width="64"
              height="64"
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
                <span className="rating-stars">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#f59e0b"
                    stroke="#f59e0b"
                    strokeWidth="1"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  {product.rating}
                </span>
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
              <h4 className="specs-title">
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
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                สเปคสินค้า
              </h4>
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
            <span className="status-badge in-stock">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              มีสินค้า
            </span>
            <span className="status-shipping">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                <polygon points="12 15 17 21 7 21 12 15" />
              </svg>
              จัดส่งฟรีทั่วประเทศ
            </span>
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
                เพิ่มลงตะกร้า
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
