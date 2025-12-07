/**
 * =============================================================================
 * ScrollToTop.jsx - Scroll to Top on Route Change
 * =============================================================================
 *
 * Component นี้ทำหน้าที่เลื่อนหน้าเว็บกลับขึ้นด้านบนทุกครั้งที่เปลี่ยนหน้า
 * แก้ปัญหาที่เมื่อเลื่อนหน้าเว็บลงด้านล่าง แล้วกดเปลี่ยนหน้า
 * หน้าใหม่จะยังคงอยู่ในตำแหน่งเดิม (ด้านล่าง) ไม่กลับขึ้นบน
 *
 * วิธีการทำงาน:
 * 1. ใช้ useLocation() เพื่อดักจับการเปลี่ยน pathname (URL)
 * 2. ทุกครั้งที่ pathname เปลี่ยน useEffect จะทำงาน
 * 3. เรียก window.scrollTo(0, 0) เพื่อเลื่อนกลับขึ้นบนสุด
 */

import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  // ดึง pathname (เส้นทาง URL) ปัจจุบัน
  // เช่น "/" หรือ "/market" หรือ "/jobs"
  const { pathname } = useLocation();

  // useEffect จะทำงานทุกครั้งที่ pathname เปลี่ยน
  useEffect(() => {
    // เลื่อนหน้าเว็บกลับขึ้นด้านบน
    // window.scrollTo(x, y) - x=0 (ซ้าย-ขวา), y=0 (บน-ล่าง)
    window.scrollTo(0, 0);
  }, [pathname]); // dependency array: ทำงานเมื่อ pathname เปลี่ยน

  // Component นี้ไม่แสดงอะไรบนหน้าเว็บ
  // ทำหน้าที่เป็น "side effect" เท่านั้น
  return null;
};

export default ScrollToTop;
