import React, { useRef } from "react";
import "./MarketMain.css";

const MarketMain = () => {
  const fillter = [
    "คอมพิวเตอร์",
    "เบลส",
    "สายไฟ",
    "ออกอากาศเวเตอร์",
    "Gadget",
    "แรม(RAM)",
    "การ์ดจอ",
    "จอมอนิเตอร์",
    "คีย์บอร์ด",
    "เมาส์",
  ];

  const menuRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onPointerDown = (e) => {
    const el = menuRef.current;
    isDown.current = true;
    el.classList.add("dragging");
    startX.current = e.clientX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    try {
      el.setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  const onPointerMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const el = menuRef.current;
    const x = e.clientX - el.offsetLeft;
    const walk = (x - startX.current) * 1;
    el.scrollLeft = scrollLeft.current - walk;
  };

  const onPointerUp = (e) => {
    const el = menuRef.current;
    isDown.current = false;
    el.classList.remove("dragging");
    try {
      el.releasePointerCapture(e.pointerId);
    } catch (err) {}
  };

  const onWheel = (e) => {
    const el = menuRef.current;
    if (!el) return;
    e.preventDefault();
    const delta = e.deltaY;
    el.scrollLeft += delta * 1.2;
  };

  const products = [
    {
      id: 1,
      title: "RTX 4090",
      description: "Kartu grafis performa tinggi untuk gaming dan rendering",
      price: "$1,599",
    },
    {
      id: 2,
      title: "RTX 4080",
      description: "GPU powerful untuk professional workload dan gaming",
      price: "$1,199",
    },
    {
      id: 3,
      title: "RTX 4070",
      description: "Performa balanced, cocok untuk creators dan gamers",
      price: "$799",
    },
    {
      id: 4,
      title: "GTX 1660",
      description: "Entry-level GPU, hemat daya dan cocok untuk entry gaming",
      price: "$229",
    },
    {
      id: 5,
      title: "Intel i9-14900K",
      description: "Processor kelas atas dengan performance exceptional",
      price: "$689",
    },
    {
      id: 6,
      title: "Ryzen 9 7950X3D",
      description: "CPU gaming terbaik dengan 3D V-Cache technology",
      price: "$599",
    },
  ];

  return (
    <div>
      <div className="ContainerMarketUi">
        <div className="ShopMenu">
          <div className="PostionItemFillter">
            <div className="ContainerItemFillter">
              <div className="MenuItem">
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
                    <button key={index} className="filter-btn">
                      {item}
                    </button>
                  ))}
                </ul>
              </div>
              <div className="SearchBox">
                <input type="text" placeholder="ค้นหา..." />
              </div>
            </div>
          </div>

          <div className="Market">
            <div className="CardShop">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-area">
        <div className="product-image-placeholder">📦</div>
      </div>
      <div className="product-body">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{product.price}</span>
          <button className="product-btn-buy">ซื้อเลย</button>
        </div>
      </div>
    </div>
  );
}

export default MarketMain;
