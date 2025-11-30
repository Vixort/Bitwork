/**
 * PaymentPanel.jsx - Payment & Billing Settings Panel
 */
import React from "react";
import InputField from "./InputField";

const PaymentPanel = ({
  data,
  onChange,
  onSave,
  onCancel,
  hasChanges,
  onOpenModal,
}) => {
  const transactions = [
    {
      id: 1,
      date: "2024-11-25",
      description: "รับงาน - Web Development",
      amount: "+฿15,000",
      status: "completed",
    },
    {
      id: 2,
      date: "2024-11-20",
      description: "ค่าธรรมเนียม Platform",
      amount: "-฿750",
      status: "completed",
    },
    {
      id: 3,
      date: "2024-11-15",
      description: "ถอนเงิน - ธนาคารกสิกร",
      amount: "-฿10,000",
      status: "completed",
    },
    {
      id: 4,
      date: "2024-11-10",
      description: "รับงาน - Logo Design",
      amount: "+฿5,000",
      status: "pending",
    },
    {
      id: 5,
      date: "2024-11-05",
      description: "รับงาน - Mobile App UI",
      amount: "+฿25,000",
      status: "completed",
    },
  ];

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <h2 className="panel-title">การเงินและธุรกรรม</h2>
        <p className="panel-description">
          จัดการบัญชีธนาคารและดูประวัติธุรกรรม
        </p>
      </div>

      <div className="panel-content">
        {/* Balance Card */}
        <div className="balance-card">
          <div className="balance-info">
            <span className="balance-label">ยอดเงินคงเหลือ</span>
            <span className="balance-amount">฿34,250.00</span>
          </div>
          <div className="balance-actions">
            <button className="btn-primary">ถอนเงิน</button>
          </div>
        </div>

        {/* Bank Account Section */}
        <div className="form-section">
          <div className="section-header">
            <h3 className="section-title">บัญชีธนาคาร</h3>
            <button className="btn-secondary btn-small">+ เพิ่มบัญชี</button>
          </div>

          <div className="bank-account-list">
            <div className="bank-account-card">
              <div className="bank-logo kbank"></div>
              <div className="bank-info">
                <span className="bank-name">ธนาคารกสิกรไทย</span>
                <span className="bank-number">xxx-x-x1234-x</span>
                <span className="bank-holder">
                  {data.bankAccountName || "ชื่อบัญชี"}
                </span>
              </div>
              <div className="bank-actions">
                <span className="primary-badge">บัญชีหลัก</span>
                <button
                  className="btn-icon"
                  onClick={() => onOpenModal("delete-bank")}
                >
                  <svg
                    width="18"
                    height="18"
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
          </div>
        </div>

        {/* PromptPay Section */}
        <div className="form-section">
          <h3 className="section-title">PromptPay</h3>
          <div className="promptpay-card">
            <div className="promptpay-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <div className="promptpay-form">
              <InputField
                label="หมายเลข PromptPay"
                name="promptPayNumber"
                value={data.promptPayNumber}
                onChange={onChange}
                placeholder="เบอร์โทรศัพท์หรือเลขบัตรประชาชน"
                helperText="ใช้สำหรับรับเงินจากลูกค้าโดยตรง"
              />
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="form-section">
          <div className="section-header">
            <h3 className="section-title">ประวัติธุรกรรม</h3>
            <button className="btn-text">ดูทั้งหมด →</button>
          </div>

          <div className="transaction-table-wrapper">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>วันที่</th>
                  <th>รายละเอียด</th>
                  <th>จำนวนเงิน</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="tx-date">{tx.date}</td>
                    <td className="tx-desc">{tx.description}</td>
                    <td
                      className={`tx-amount ${
                        tx.amount.startsWith("+") ? "positive" : "negative"
                      }`}
                    >
                      {tx.amount}
                    </td>
                    <td>
                      <span className={`tx-status ${tx.status}`}>
                        {tx.status === "completed" ? "สำเร็จ" : "รอดำเนินการ"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="panel-footer">
        <button
          className="btn-outline"
          onClick={onCancel}
          disabled={!hasChanges}
        >
          ยกเลิก
        </button>
        <button className="btn-primary" onClick={onSave} disabled={!hasChanges}>
          บันทึกการเปลี่ยนแปลง
        </button>
      </div>
    </div>
  );
};

export default PaymentPanel;
