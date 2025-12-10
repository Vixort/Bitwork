# Mock Data Documentation

เอกสารนี้อธิบายโครงสร้างไฟล์ข้อมูลจำลอง (Mock Data) ที่แยกออกมาจากไฟล์ JSX เพื่อเตรียมพร้อมสำหรับการเชื่อมต่อกับ Backend API ในอนาคต

**หลักการ:** แยกไฟล์ JSON ตาม Component ที่ใช้งาน เพื่อให้ง่ายต่อการจัดการและเชื่อมต่อ API

---

## 📁 โครงสร้างไฟล์

```
src/pages/
├── Market/
│   └── marketProductsData.json       # ข้อมูลสินค้า → MarketMain.jsx
│
├── JobBoard/
│   └── components/
│       └── jobListingData.json       # ข้อมูลงาน → JobListing.jsx
│
├── Community/
│   └── components/
│       ├── categorySidebarData.json  # หมวดหมู่ → CategorySidebar
│       ├── postFeedData.json         # กระทู้ → PostFeed
│       └── rightSidebarData.json     # Trending & Contributors → RightSidebar
│
├── Setting/
│   └── components/
│       ├── storeProductsData.json    # สินค้าร้านค้า → StoreProducts.jsx
│       ├── storeSalesHistoryData.json # ประวัติการขาย → StoreSalesHistory.jsx
│       └── storeDashboardData.json   # Dashboard → StoreDashboard.jsx
│
└── home/
    └── component/
        ├── spoilerData.json          # สินค้าเด่น → Spoiler.jsx
        └── heroSectionData.json      # Stats → HeroSection.jsx
```

---

## 📦 Market

### marketProductsData.json → MarketMain.jsx

```json
{
  "products": [...],     // รายการสินค้า
  "categories": [...]    // หมวดหมู่สำหรับตัวกรอง
}
```

#### Product Schema

| Field           | Type   | Description           |
| --------------- | ------ | --------------------- |
| id              | number | รหัสสินค้า (unique)   |
| title           | string | ชื่อสินค้า            |
| description     | string | คำอธิบายสั้น          |
| fullDescription | string | คำอธิบายเต็ม          |
| price           | string | ราคา (รวมสัญลักษณ์ ฿) |
| category        | string | หมวดหมู่              |
| brand           | string | แบรนด์                |
| warranty        | string | ระยะรับประกัน         |
| specs           | object | รายละเอียดทางเทคนิค   |
| rating          | number | คะแนน (0-5)           |
| reviews         | number | จำนวนรีวิว            |
| sold            | number | จำนวนที่ขาย           |

---

## 💼 JobBoard

### components/jobListingData.json → JobListing.jsx

```json
{
  "jobs": [...],       // รายการงาน
  "filters": [...]     // ตัวกรอง (Full-time, Part-time, etc.)
}
```

#### Job Schema

| Field         | Type        | Description                  |
| ------------- | ----------- | ---------------------------- |
| id            | number      | รหัสงาน                      |
| title         | string      | ชื่อตำแหน่ง                  |
| company       | string      | ชื่อบริษัท                   |
| companyLogo   | string/null | URL โลโก้                    |
| coverImage    | string      | URL รูปปก                    |
| location      | string      | สถานที่                      |
| type          | string      | Full-time/Part-time/Contract |
| level         | string      | Junior/Mid-level/Senior      |
| salaryMin/Max | number      | เงินเดือน                    |
| description   | string      | รายละเอียด                   |
| skills        | array       | ทักษะที่ต้องการ              |
| benefits      | array       | สวัสดิการ                    |
| postedDate    | string      | วันที่โพสต์                  |
| applicants    | number      | จำนวนผู้สมัคร                |
| isVerified    | boolean     | ยืนยันตัวตน                  |
| isUrgent      | boolean     | งานด่วน                      |
| isRemote      | boolean     | Remote                       |

---

## 💬 Community

### components/categorySidebarData.json → CategorySidebar.jsx

```json
{
  "categories": [
    { "name": "ทั้งหมด", "icon": "📋", "count": 1250 },
    ...
  ]
}
```

### components/postFeedData.json → PostFeed.jsx

```json
{
  "posts": [
    {
      "id": 1,
      "title": "...",
      "excerpt": "...",
      "author": "...",
      "authorAvatar": "...",
      "date": "2024-01-15",
      "category": "...",
      "tags": [...],
      "views": 15420,
      "replies": 89,
      "likes": 342,
      "isPinned": true,
      "isHot": true
    }
  ]
}
```

### components/rightSidebarData.json → RightSidebar.jsx

```json
{
  "trendingTopics": [{ "tag": "#React19", "posts": 234 }],
  "topContributors": [{ "name": "...", "avatar": "...", "points": 12500 }]
}
```

---

## ⚙️ Setting (Store Management)

### components/storeProductsData.json → StoreProducts.jsx

```json
{
  "products": [
    {
      "id": 1,
      "name": "...",
      "sku": "CPU-AMD-7950X",
      "category": "CPU",
      "price": 18900,
      "stock": 15,
      "status": "active",
      "image": "...",
      "sales": 45,
      "description": "...",
      "weight": "0.5 kg",
      "warranty": "3 ปี"
    }
  ]
}
```

### components/storeSalesHistoryData.json → StoreSalesHistory.jsx

```json
{
  "salesHistory": [
    {
      "id": "#ORD-2024-156",
      "date": "2024-12-06",
      "time": "14:30",
      "customer": "...",
      "products": [...],
      "amount": 23400,
      "profit": 3500,
      "status": "completed",
      "paymentMethod": "credit_card"
    }
  ],
  "summary": {
    "totalSales": 149700,
    "totalProfit": 20800,
    "totalOrders": 5,
    "avgOrderValue": 29940
  }
}
```

### components/storeDashboardData.json → StoreDashboard.jsx

```json
{
  "stats": [
    {
      "label": "ยอดขายวันนี้",
      "value": "฿12,450",
      "change": "+15.3%",
      "trend": "up"
    }
  ],
  "recentOrders": [
    {
      "id": "...",
      "customer": "...",
      "product": "...",
      "amount": "฿18,900",
      "status": "pending"
    }
  ]
}
```

---

## 🏠 Home

### component/spoilerData.json → Spoiler.jsx

```json
{
  "featuredProducts": [
    {
      "id": 1,
      "name": "RTX 4090",
      "description": "...",
      "price": "฿45,900",
      "image": "...",
      "tag": "ยอดนิยม"
    }
  ]
}
```

### component/heroSectionData.json → HeroSection.jsx

```json
{
  "stats": [{ "number": "10K+", "label": "ผู้ใช้งาน" }]
}
```

---

## 🔄 การเชื่อมต่อ Backend API

### ปัจจุบัน (Mock Data)

```javascript
import storeProductsData from "./storeProductsData.json";
const products = storeProductsData.products;
```

### อนาคต (API)

```javascript
import { useState, useEffect } from "react";

const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("/api/products")
    .then((res) => res.json())
    .then((data) => setProducts(data.products))
    .finally(() => setLoading(false));
}, []);
```

---

## 📝 หมายเหตุ

- ไฟล์ JSON แยกตาม Component เพื่อความชัดเจน
- ข้อมูลเป็นตัวอย่างสำหรับการพัฒนา
- รูปภาพใช้จาก Unsplash และ placeholder
- เมื่อเชื่อมต่อ API เพียงเปลี่ยน import เป็น fetch

---

_อัปเดตล่าสุด: ธันวาคม 2024_
