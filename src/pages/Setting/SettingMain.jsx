/**
 * SettingMain.jsx - Main Settings Page Component
 *
 * หน้าตั้งค่าหลักสำหรับ Bitwork Platform
 * รวมการจัดการ: ข้อมูลบัญชี, ความปลอดภัย, การเงิน, ร้านค้า, การแจ้งเตือน, ธีม, และ Social Login
 */
import React, { useState, useCallback, useMemo } from "react";
import "./SettingMain.css";

// Import Components
import SettingsSidebar from "./components/SettingsSidebar";
import AccountPanel from "./components/AccountPanel";
import SecurityPanel from "./components/SecurityPanel";
import PaymentPanel from "./components/PaymentPanel";
import StorePanel from "./components/StorePanel";
import StoreDashboard from "./components/StoreDashboard";
import StoreProducts from "./components/StoreProducts";
import StoreSalesHistory from "./components/StoreSalesHistory";
import NotificationPanel from "./components/NotificationPanel";
import ThemePanel from "./components/ThemePanel";
import SocialPanel from "./components/SocialPanel";
import JobProfilePanel from "./components/JobProfilePanel";
import Modal from "./components/Modal";
import Notification from "./components/Notification";

const SettingMain = () => {
  // ==================== STATE MANAGEMENT ====================

  // Active Menu State
  const [activeMenu, setActiveMenu] = useState("account");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Notification State
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  // Modal State
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "default",
    onConfirm: () => {},
  });

  // ==================== FORM DATA ====================

  // Account Data
  const [accountData, setAccountData] = useState({
    firstName: "สมชาย",
    lastName: "ใจดี",
    displayName: "somchai.dev",
    username: "somchai_dev",
    email: "somchai@example.com",
    phone: "0812345678",
    bio: "Full-stack developer ประสบการณ์ 5 ปี เชี่ยวชาญ React, Node.js, และ Cloud Services",
    profileImage: "",
  });
  const [originalAccountData, setOriginalAccountData] = useState({
    ...accountData,
  });

  // Job Profile Data (สำหรับโพสหาคนสมัครงาน)
  const [jobProfileData, setJobProfileData] = useState({
    companyName: "Somchai Tech Co., Ltd.",
    companyNameEn: "Somchai Tech Company Limited",
    companyLogo: "",
    businessType: "startup",
    industry: "technology",
    employeeCount: "11-50",
    foundedYear: "2020",
    companyDescription:
      "บริษัทพัฒนาซอฟต์แวร์และแอปพลิเคชัน เน้นเทคโนโลยี Web และ Mobile",
    companyAddress: "123 อาคาร ABC ชั้น 10 ถนนสุขุมวิท",
    companyProvince: "กรุงเทพมหานคร",
    companyPostcode: "10110",
    hrEmail: "hr@somchaitech.com",
    hrPhone: "02-123-4567",
    companyWebsite: "https://www.somchaitech.com",
    linkedinUrl: "",
    facebookUrl: "",
    acceptingApplications: true,
    visibleInJobBoard: true,
    acceptBitworkApplications: true,
    notifyNewApplicants: true,
    companyVerified: false,
    verificationPending: false,
  });
  const [originalJobProfileData, setOriginalJobProfileData] = useState({
    ...jobProfileData,
  });

  // Security Data
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    twoFactorMethod: "app",
  });
  const [originalSecurityData, setOriginalSecurityData] = useState({
    ...securityData,
  });

  // Payment Data
  const [paymentData, setPaymentData] = useState({
    bankAccountName: "สมชาย ใจดี",
    bankAccountNumber: "123-4-56789-0",
    bankName: "ธนาคารกสิกรไทย",
    promptPayNumber: "0812345678",
  });
  const [originalPaymentData, setOriginalPaymentData] = useState({
    ...paymentData,
  });

  // Store Data
  const [storeData, setStoreData] = useState({
    storeName: "Somchai Dev Studio",
    storeUrl: "somchai-dev",
    storeDescription:
      "รับพัฒนาเว็บไซต์และแอปพลิเคชันครบวงจร ตั้งแต่ออกแบบจนถึงพัฒนา",
    storeCategory: "Web Development",
    storeLocation: "กรุงเทพมหานคร",
    storeLogo: "",
    storeBanner: "",
    storeVerified: false,
    verificationPending: false,
    acceptingOrders: true,
    visibleInSearch: true,
    allowMessages: true,
  });
  const [originalStoreData, setOriginalStoreData] = useState({ ...storeData });

  // Notification Settings Data
  const [notificationData, setNotificationData] = useState({
    emailNewJobs: true,
    emailMessages: true,
    emailOrders: true,
    emailWeeklySummary: false,
    emailPromotions: false,
    pushEnabled: true,
    soundEnabled: true,
    notifyMentions: true,
    notifyComments: true,
    notifyFollowers: true,
    notifyPayments: true,
    smsEnabled: false,
    smsSecurityAlerts: true,
  });
  const [originalNotificationData, setOriginalNotificationData] = useState({
    ...notificationData,
  });

  // Theme Data
  const [themeData, setThemeData] = useState({
    theme: "light",
    language: "th",
    fontSize: 14,
    reduceMotion: false,
    highContrast: false,
  });
  const [originalThemeData, setOriginalThemeData] = useState({ ...themeData });

  // Social Login Data
  const [socialData, setSocialData] = useState({
    googleConnected: true,
    googleEmail: "somchai@gmail.com",
    githubConnected: true,
    githubUsername: "somchai-dev",
    facebookConnected: false,
    facebookName: "",
  });

  // ==================== CHANGE DETECTION ====================

  const hasAccountChanges = useMemo(
    () => JSON.stringify(accountData) !== JSON.stringify(originalAccountData),
    [accountData, originalAccountData]
  );

  const hasJobProfileChanges = useMemo(
    () =>
      JSON.stringify(jobProfileData) !== JSON.stringify(originalJobProfileData),
    [jobProfileData, originalJobProfileData]
  );

  const hasSecurityChanges = useMemo(
    () => JSON.stringify(securityData) !== JSON.stringify(originalSecurityData),
    [securityData, originalSecurityData]
  );

  const hasPaymentChanges = useMemo(
    () => JSON.stringify(paymentData) !== JSON.stringify(originalPaymentData),
    [paymentData, originalPaymentData]
  );

  const hasStoreChanges = useMemo(
    () => JSON.stringify(storeData) !== JSON.stringify(originalStoreData),
    [storeData, originalStoreData]
  );

  const hasNotificationChanges = useMemo(
    () =>
      JSON.stringify(notificationData) !==
      JSON.stringify(originalNotificationData),
    [notificationData, originalNotificationData]
  );

  const hasThemeChanges = useMemo(
    () => JSON.stringify(themeData) !== JSON.stringify(originalThemeData),
    [themeData, originalThemeData]
  );

  // ==================== HANDLERS ====================

  // Generic change handler
  const createChangeHandler = (setData) => (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAccountChange = createChangeHandler(setAccountData);
  const handleJobProfileChange = createChangeHandler(setJobProfileData);
  const handleSecurityChange = createChangeHandler(setSecurityData);
  const handlePaymentChange = createChangeHandler(setPaymentData);
  const handleStoreChange = createChangeHandler(setStoreData);
  const handleNotificationChange = createChangeHandler(setNotificationData);
  const handleThemeChange = createChangeHandler(setThemeData);

  // Show notification helper
  const showNotification = useCallback((message, type = "success") => {
    setNotification({ isVisible: true, message, type });
  }, []);

  // Close notification
  const closeNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  }, []);

  // Open modal helper
  const openModal = useCallback(
    (modalType) => {
      const modalConfigs = {
        "logout-device": {
          title: "ออกจากระบบอุปกรณ์นี้",
          message:
            "คุณต้องการออกจากระบบอุปกรณ์นี้หรือไม่? คุณจะต้องเข้าสู่ระบบใหม่",
          type: "danger",
          onConfirm: () => {
            showNotification("ออกจากระบบอุปกรณ์สำเร็จ");
            closeModal();
          },
        },
        "logout-all": {
          title: "ออกจากระบบทุกอุปกรณ์",
          message:
            "คุณต้องการออกจากระบบทุกอุปกรณ์หรือไม่? คุณจะต้องเข้าสู่ระบบใหม่ในทุกอุปกรณ์",
          type: "danger",
          onConfirm: () => {
            showNotification("ออกจากระบบทุกอุปกรณ์สำเร็จ");
            closeModal();
          },
        },
        "delete-bank": {
          title: "ลบบัญชีธนาคาร",
          message:
            "คุณต้องการลบบัญชีธนาคารนี้หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้",
          type: "danger",
          onConfirm: () => {
            showNotification("ลบบัญชีธนาคารสำเร็จ");
            closeModal();
          },
        },
        "request-verify": {
          title: "ขอยืนยันร้านค้า",
          message:
            "คุณต้องการส่งคำขอยืนยันร้านค้าหรือไม่? ทีมงานจะตรวจสอบภายใน 3-5 วันทำการ",
          type: "default",
          onConfirm: () => {
            setStoreData((prev) => ({ ...prev, verificationPending: true }));
            showNotification("ส่งคำขอยืนยันร้านค้าสำเร็จ");
            closeModal();
          },
        },
        "disconnect-google": {
          title: "ยกเลิกการเชื่อมต่อ Google",
          message: "คุณต้องการยกเลิกการเชื่อมต่อบัญชี Google หรือไม่?",
          type: "danger",
          onConfirm: () => {
            setSocialData((prev) => ({
              ...prev,
              googleConnected: false,
              googleEmail: "",
            }));
            showNotification("ยกเลิกการเชื่อมต่อ Google สำเร็จ");
            closeModal();
          },
        },
        "disconnect-github": {
          title: "ยกเลิกการเชื่อมต่อ GitHub",
          message: "คุณต้องการยกเลิกการเชื่อมต่อบัญชี GitHub หรือไม่?",
          type: "danger",
          onConfirm: () => {
            setSocialData((prev) => ({
              ...prev,
              githubConnected: false,
              githubUsername: "",
            }));
            showNotification("ยกเลิกการเชื่อมต่อ GitHub สำเร็จ");
            closeModal();
          },
        },
        "disconnect-facebook": {
          title: "ยกเลิกการเชื่อมต่อ Facebook",
          message: "คุณต้องการยกเลิกการเชื่อมต่อบัญชี Facebook หรือไม่?",
          type: "danger",
          onConfirm: () => {
            setSocialData((prev) => ({
              ...prev,
              facebookConnected: false,
              facebookName: "",
            }));
            showNotification("ยกเลิกการเชื่อมต่อ Facebook สำเร็จ");
            closeModal();
          },
        },
        "reset-account": {
          title: "รีเซ็ตข้อมูล",
          message: "คุณต้องการรีเซ็ตข้อมูลเป็นค่าเริ่มต้นหรือไม่?",
          type: "warning",
          onConfirm: () => {
            setAccountData({ ...originalAccountData });
            showNotification("รีเซ็ตข้อมูลสำเร็จ");
            closeModal();
          },
        },
        "request-company-verify": {
          title: "ขอยืนยันบริษัท",
          message:
            "คุณต้องการส่งคำขอยืนยันบริษัทหรือไม่? ทีมงานจะตรวจสอบภายใน 3-5 วันทำการ กรุณาเตรียมเอกสารหนังสือรับรองบริษัท",
          type: "default",
          onConfirm: () => {
            setJobProfileData((prev) => ({
              ...prev,
              verificationPending: true,
            }));
            showNotification("ส่งคำขอยืนยันบริษัทสำเร็จ");
            closeModal();
          },
        },
      };

      const config = modalConfigs[modalType];
      if (config) {
        setModal({ isOpen: true, ...config });
      }
    },
    [originalAccountData, showNotification]
  );

  // Close modal
  const closeModal = useCallback(() => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Save handlers
  const handleSaveAccount = () => {
    setOriginalAccountData({ ...accountData });
    showNotification("บันทึกข้อมูลบัญชีสำเร็จแล้ว");
  };

  const handleSaveJobProfile = () => {
    setOriginalJobProfileData({ ...jobProfileData });
    showNotification("บันทึกข้อมูลโปรไฟล์นายจ้างสำเร็จแล้ว");
  };

  const handleSaveSecurity = () => {
    setOriginalSecurityData({ ...securityData });
    setSecurityData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
    showNotification("บันทึกการตั้งค่าความปลอดภัยสำเร็จแล้ว");
  };

  const handleSavePayment = () => {
    setOriginalPaymentData({ ...paymentData });
    showNotification("บันทึกข้อมูลการเงินสำเร็จแล้ว");
  };

  const handleSaveStore = () => {
    setOriginalStoreData({ ...storeData });
    showNotification("บันทึกข้อมูลร้านค้าสำเร็จแล้ว");
  };

  const handleSaveNotification = () => {
    setOriginalNotificationData({ ...notificationData });
    showNotification("บันทึกการตั้งค่าการแจ้งเตือนสำเร็จแล้ว");
  };

  const handleSaveTheme = () => {
    setOriginalThemeData({ ...themeData });
    showNotification("บันทึกการตั้งค่าธีมสำเร็จแล้ว");
  };

  // Cancel handlers
  const handleCancelAccount = () => setAccountData({ ...originalAccountData });
  const handleCancelJobProfile = () =>
    setJobProfileData({ ...originalJobProfileData });
  const handleCancelSecurity = () =>
    setSecurityData({ ...originalSecurityData });
  const handleCancelPayment = () => setPaymentData({ ...originalPaymentData });
  const handleCancelStore = () => setStoreData({ ...originalStoreData });
  const handleCancelNotification = () =>
    setNotificationData({ ...originalNotificationData });
  const handleCancelTheme = () => setThemeData({ ...originalThemeData });

  // Social connect handler
  const handleSocialConnect = (accountId) => {
    // Simulate connection
    showNotification(`เชื่อมต่อ ${accountId} สำเร็จ`);
    if (accountId === "facebook") {
      setSocialData((prev) => ({
        ...prev,
        facebookConnected: true,
        facebookName: "Somchai Jaidee",
      }));
    }
  };

  // ==================== RENDER PANEL ====================

  const renderPanel = () => {
    switch (activeMenu) {
      case "account":
        return (
          <AccountPanel
            data={accountData}
            onChange={handleAccountChange}
            onSave={handleSaveAccount}
            onCancel={handleCancelAccount}
            onReset={() => openModal("reset-account")}
            hasChanges={hasAccountChanges}
          />
        );
      case "jobprofile":
        return (
          <JobProfilePanel
            data={jobProfileData}
            onChange={handleJobProfileChange}
            onSave={handleSaveJobProfile}
            onCancel={handleCancelJobProfile}
            hasChanges={hasJobProfileChanges}
            onOpenModal={openModal}
          />
        );
      case "security":
        return (
          <SecurityPanel
            data={securityData}
            onChange={handleSecurityChange}
            onSave={handleSaveSecurity}
            onCancel={handleCancelSecurity}
            hasChanges={hasSecurityChanges}
            onOpenModal={openModal}
          />
        );
      case "payment":
        return (
          <PaymentPanel
            data={paymentData}
            onChange={handlePaymentChange}
            onSave={handleSavePayment}
            onCancel={handleCancelPayment}
            hasChanges={hasPaymentChanges}
            onOpenModal={openModal}
          />
        );
      case "store":
        return (
          <StorePanel
            data={storeData}
            onChange={handleStoreChange}
            onSave={handleSaveStore}
            onCancel={handleCancelStore}
            hasChanges={hasStoreChanges}
            onOpenModal={openModal}
          />
        );
      case "store-dashboard":
        return <StoreDashboard />;
      case "store-products":
        return <StoreProducts />;
      case "store-orders":
        return (
          <div className="settings-panel">
            <div className="panel-header">
              <h2 className="panel-title">คำสั่งซื้อ</h2>
              <p className="panel-description">จัดการคำสั่งซื้อและการจัดส่ง</p>
            </div>
            <div className="panel-content">
              <p
                style={{ textAlign: "center", color: "#666", padding: "40px" }}
              >
                กำลังพัฒนา...
              </p>
            </div>
          </div>
        );
      case "store-sales-history":
        return <StoreSalesHistory />;
      case "store-analytics":
        return (
          <div className="settings-panel">
            <div className="panel-header">
              <h2 className="panel-title">สถิติและรายงาน</h2>
              <p className="panel-description">วิเคราะห์ข้อมูลและสถิติการขาย</p>
            </div>
            <div className="panel-content">
              <p
                style={{ textAlign: "center", color: "#666", padding: "40px" }}
              >
                กำลังพัฒนา...
              </p>
            </div>
          </div>
        );
      case "notification":
        return (
          <NotificationPanel
            data={notificationData}
            onChange={handleNotificationChange}
            onSave={handleSaveNotification}
            onCancel={handleCancelNotification}
            hasChanges={hasNotificationChanges}
          />
        );
      case "theme":
        return (
          <ThemePanel
            data={themeData}
            onChange={handleThemeChange}
            onSave={handleSaveTheme}
            onCancel={handleCancelTheme}
            hasChanges={hasThemeChanges}
          />
        );
      case "social":
        return (
          <SocialPanel
            data={socialData}
            onConnect={handleSocialConnect}
            onOpenModal={openModal}
          />
        );
      default:
        return null;
    }
  };

  // ==================== RENDER ====================

  return (
    <div className="settings-page">
      {/* Mobile Header */}
      <div className="settings-mobile-header">
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 className="mobile-title">ตั้งค่า</h1>
      </div>

      <div className="settings-container">
        {/* Sidebar */}
        <SettingsSidebar
          activeMenu={activeMenu}
          onMenuChange={setActiveMenu}
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content */}
        <main className="settings-content">{renderPanel()}</main>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        onConfirm={modal.onConfirm}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />

      {/* Notification Toast */}
      <Notification
        isVisible={notification.isVisible}
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />
    </div>
  );
};

export default SettingMain;
