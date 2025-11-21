import React from "react";
import "./Showcase.css";

const Showcase = () => {
  const cardElements = [
    <div className="Card" key={`card-0`}>
      <div>text 1</div>
    </div>,
    <div className="Card" key={`card-1`}>
      <div>text 2</div>
    </div>,
    <div className="Card" key={`card-2`}>
      <div>text 3</div>
    </div>,
    <div className="Card" key={`card-3`}>
      <div>text 4</div>
    </div>,
    <div className="Card" key={`card-4`}>
      <div>text 5</div>
    </div>,
  ];
  return (
    <div>
      <div className="Section">
        <h1 className="title">พร้อมจบครบทุกอย่างต้อง Bitwork</h1>
        <div className="box">
          <div className="item">
            <div className="circle"></div>
            <p>หาสินค้า</p>
          </div>

          <div className="item">
            <div className="circle"></div>
            <p>จ้างงาน</p>
          </div>

          <div className="item">
            <div className="circle"></div>
            <p>สอบถาม</p>
          </div>
        </div>

        <div className="ContainerContentShowcase">
          <div className="marquee" aria-hidden="true">
            <div className="marquee__inner">
              {cardElements}
              {cardElements.map((el, i) =>
                React.cloneElement(el, { key: `card-dup-${i}` })
              )}
            </div>
          </div>
        </div>

        <div className="textShowcase">
          ครบทุกบริการคอมพิวเตอร์ ที่เดียวจบ ครบทั้งซ่อม–ขาย–แชร์ความรู้
        </div>
      </div>
    </div>
  );
};

export default Showcase;
