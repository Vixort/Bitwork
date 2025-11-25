import React, { useRef, useState } from "react";
import "./MarketMain.css";

const MarketMain = () => {
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
  const onWheel = (e) => {
    const el = menuRef.current;
    if (!el) return;
    e.preventDefault();
    const delta = e.deltaY;
    el.scrollLeft += delta * 1.2;
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
    const price = parseFloat(item.price.replace(/[$,]/g, ""));
    return sum + price * item.quantity;
  }, 0);

  // สินค้าตัวอย่างที่ใช้แสดงในการ์ด (สามารถเปลี่ยนมาจาก API ได้)
  const products = [
    {
      id: 1,
      title: "RTX 4090",
      description: "การ์ดจอประสิทธิภาพสูงสำหรับการเล่นเกมและเรนเดอร์",
      price: "$1,599",
      category: "การ์ดจอ",
    },
    {
      id: 2,
      title: "RTX 4080",
      description: "GPU ทรงพลังสำหรับงานระดับมืออาชีพและการเล่นเกม",
      price: "$1,199",
      category: "การ์ดจอ",
    },
    {
      id: 3,
      title: "RTX 4070",
      description: "ประสิทธิภาพสมดุล เหมาะสำหรับครีเอเตอร์และเกมเมอร์",
      price: "$799",
      category: "การ์ดจอ",
    },
    {
      id: 4,
      title: "GTX 1660",
      description:
        "GPU ระดับเริ่มต้น ประหยัดพลังงาน เหมาะสำหรับการเล่นเกมทั่วไป",
      price: "$229",
      category: "การ์ดจอ",
    },
    {
      id: 5,
      title: "Intel i9-14900K",
      description: "โปรเซสเซอร์ระดับท็อปพร้อมประสิทธิภาพที่ยอดเยี่ยม",
      price: "$689",
      category: "ซีพียู",
    },
    {
      id: 6,
      title: "Ryzen 9 7950X3D",
      description: "CPU เกมมิ่งที่ดีที่สุดพร้อมเทคโนโลยี 3D V-Cache",
      price: "$599",
      category: "ซีพียู",
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
                <span className="total-price">${totalPrice.toFixed(2)}</span>
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
          <div className="PostionItemFillter">
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
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))
              ) : (
                <div className="no-products">ไม่พบสินค้าในหมวดหมู่นี้</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
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
            onClick={() => onAddToCart(product)}
          >
            ซื้อเลย
          </button>
        </div>
      </div>
    </div>
  );
}

export default MarketMain;
