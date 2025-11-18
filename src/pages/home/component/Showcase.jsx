import React from "react";
import "./Showcase.css";

const Showcase = () => {
  return (
    <div>
      <div className="Section">
        <h1 className="title">พร้อมจบครบทุกอย่างต้อง Bitwork</h1>
        <div class="box">
          <div class="item">
            <div class="circle"></div>
            <p>หาสินค้า</p>
          </div>

          <div class="item">
            <div class="circle"></div>
            <p>จ้างงาน</p>
          </div>

          <div class="item">
            <div class="circle"></div>
            <p>สอบถาม</p>
          </div>
        </div>
        <div className="ContainerContentShowcase">
          <div className="Card">
            <div>text</div>
          </div>
          <div className="Card">
            <div>text</div>
          </div>
          <div className="Card">
            <div>text</div>
          </div>
          <div className="Card">
            <div>text</div>
          </div>
          <div className="Card">
            <div>text</div>
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
