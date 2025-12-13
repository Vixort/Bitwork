/**
 * ChatPanel.jsx - Chat System
 * ระบบแชทสำหรับคุยกับลูกค้าและผู้สมัครงาน
 */
import React, { useState, useRef, useEffect } from "react";

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    name: "สมหญิง รักเรียน",
    avatar: null,
    type: "applicant",
    position: "Frontend Developer",
    lastMessage: "ขอบคุณครับ รอฟังข่าวดีนะครับ",
    lastMessageTime: "10:30",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "วิชัย เก่งมาก",
    avatar: null,
    type: "applicant",
    position: "UX/UI Designer",
    lastMessage: "สะดวกสัมภาษณ์วันไหนครับ?",
    lastMessageTime: "เมื่อวาน",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "ร้านกาแฟหอม",
    avatar: null,
    type: "customer",
    orderRef: "#ORD-2024-001",
    lastMessage: "สินค้าได้รับเรียบร้อยแล้วครับ ขอบคุณมากครับ",
    lastMessageTime: "3 วันก่อน",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: "ปรีชา ฉลาดดี",
    avatar: null,
    type: "applicant",
    position: "Backend Developer",
    lastMessage: "ได้เลยครับ เริ่มงานได้ทันที",
    lastMessageTime: "5 วันก่อน",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "บริษัท ABC จำกัด",
    avatar: null,
    type: "customer",
    orderRef: "#ORD-2024-002",
    lastMessage: "รบกวนสอบถามเรื่องการชำระเงินหน่อยครับ",
    lastMessageTime: "1 สัปดาห์ก่อน",
    unread: 1,
    online: false,
  },
];

// Mock messages for a conversation
const mockMessages = {
  1: [
    {
      id: 1,
      sender: "them",
      text: "สวัสดีครับ ผมสนใจสมัครตำแหน่ง Frontend Developer ครับ",
      time: "09:00",
      date: "วันนี้",
    },
    {
      id: 2,
      sender: "me",
      text: "สวัสดีครับ ขอบคุณที่สนใจตำแหน่งนี้ครับ รบกวนช่วยแนะนำตัวเองคร่าวๆ ได้ไหมครับ?",
      time: "09:15",
      date: "วันนี้",
    },
    {
      id: 3,
      sender: "them",
      text: "ผมมีประสบการณ์ทำงานด้าน React มา 3 ปีครับ เคยทำ E-commerce และ Dashboard systems มาก่อน",
      time: "09:20",
      date: "วันนี้",
    },
    {
      id: 4,
      sender: "me",
      text: "เยี่ยมเลยครับ! เรามีนัดสัมภาษณ์ในสัปดาห์หน้า คุณสะดวกวันไหนบ้างครับ?",
      time: "09:30",
      date: "วันนี้",
    },
    {
      id: 5,
      sender: "them",
      text: "ผมสะดวกวันจันทร์หรือวันพุธครับ ช่วงบ่ายจะดีมากเลยครับ",
      time: "10:00",
      date: "วันนี้",
    },
    {
      id: 6,
      sender: "me",
      text: "งั้นนัดวันพุธ บ่าย 2 โมงนะครับ จะส่งรายละเอียดทางอีเมลให้ครับ",
      time: "10:15",
      date: "วันนี้",
    },
    {
      id: 7,
      sender: "them",
      text: "ขอบคุณครับ รอฟังข่าวดีนะครับ",
      time: "10:30",
      date: "วันนี้",
    },
  ],
  3: [
    {
      id: 1,
      sender: "them",
      text: "สวัสดีครับ สินค้าจะส่งถึงประมาณวันไหนครับ?",
      time: "14:00",
      date: "3 วันก่อน",
    },
    {
      id: 2,
      sender: "me",
      text: "สวัสดีครับ สินค้าจัดส่งแล้วครับ คาดว่าจะถึงภายใน 1-2 วันครับ",
      time: "14:30",
      date: "3 วันก่อน",
    },
    {
      id: 3,
      sender: "them",
      text: "สินค้าได้รับเรียบร้อยแล้วครับ ขอบคุณมากครับ",
      time: "10:00",
      date: "วันนี้",
    },
  ],
};

const ChatPanel = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Filter conversations
  const filteredConversations = mockConversations.filter((conv) => {
    const matchesType = filterType === "all" || conv.type === filterType;
    const matchesSearch = conv.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Load messages when chat is selected
  useEffect(() => {
    if (selectedChat) {
      setMessages(mockMessages[selectedChat.id] || []);
    }
  }, [selectedChat]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .substring(0, 2);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "me",
      text: message,
      time: new Date().toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: "วันนี้",
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className="settings-panel chat-panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">ข้อความ</h2>
          <p className="panel-description">สนทนากับลูกค้าและผู้สมัครงาน</p>
        </div>
      </div>

      <div className="chat-container">
        {/* Conversations List */}
        <div className="chat-sidebar">
          {/* Search & Filter */}
          <div className="chat-sidebar-header">
            <div className="chat-search">
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
              <input
                type="text"
                placeholder="ค้นหาการสนทนา..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="chat-filter-tabs">
              <button
                className={`chat-filter-tab ${
                  filterType === "all" ? "active" : ""
                }`}
                onClick={() => setFilterType("all")}
              >
                ทั้งหมด
              </button>
              <button
                className={`chat-filter-tab ${
                  filterType === "applicant" ? "active" : ""
                }`}
                onClick={() => setFilterType("applicant")}
              >
                ผู้สมัคร
              </button>
              <button
                className={`chat-filter-tab ${
                  filterType === "customer" ? "active" : ""
                }`}
                onClick={() => setFilterType("customer")}
              >
                ลูกค้า
              </button>
            </div>
          </div>

          {/* Conversations */}
          <div className="conversations-list">
            {filteredConversations.length === 0 ? (
              <div className="no-conversations">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <p>ไม่พบการสนทนา</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`conversation-item ${
                    selectedChat?.id === conv.id ? "active" : ""
                  } ${conv.unread > 0 ? "has-unread" : ""}`}
                  onClick={() => setSelectedChat(conv)}
                >
                  <div className="conversation-avatar">
                    {getInitials(conv.name)}
                    {conv.online && <span className="online-indicator" />}
                  </div>
                  <div className="conversation-info">
                    <div className="conversation-header">
                      <span className="conversation-name">{conv.name}</span>
                      <span className="conversation-time">
                        {conv.lastMessageTime}
                      </span>
                    </div>
                    <div className="conversation-meta">
                      <span className={`conversation-type ${conv.type}`}>
                        {conv.type === "applicant" ? (
                          <>
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <rect
                                x="2"
                                y="7"
                                width="20"
                                height="14"
                                rx="2"
                                ry="2"
                              />
                              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                            {conv.position}
                          </>
                        ) : (
                          <>
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <circle cx="9" cy="21" r="1" />
                              <circle cx="20" cy="21" r="1" />
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            {conv.orderRef}
                          </>
                        )}
                      </span>
                    </div>
                    <div className="conversation-preview">
                      <p>{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <span className="unread-badge">{conv.unread}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-main">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="chat-header">
                <div className="chat-header-info">
                  <div className="chat-header-avatar">
                    {getInitials(selectedChat.name)}
                    {selectedChat.online && (
                      <span className="online-indicator" />
                    )}
                  </div>
                  <div>
                    <h3>{selectedChat.name}</h3>
                    <span className={`chat-type-badge ${selectedChat.type}`}>
                      {selectedChat.type === "applicant"
                        ? `ผู้สมัคร: ${selectedChat.position}`
                        : `ลูกค้า: ${selectedChat.orderRef}`}
                    </span>
                  </div>
                </div>
                <div className="chat-header-actions">
                  {selectedChat.type === "applicant" && (
                    <button className="chat-action-btn" title="ดูโปรไฟล์">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </button>
                  )}
                  {selectedChat.type === "customer" && (
                    <button className="chat-action-btn" title="ดูคำสั่งซื้อ">
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
                    </button>
                  )}
                  <button className="chat-action-btn" title="เพิ่มเติม">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="chat-messages">
                {messages.map((msg, index) => {
                  const showDate =
                    index === 0 || messages[index - 1].date !== msg.date;
                  return (
                    <React.Fragment key={msg.id}>
                      {showDate && (
                        <div className="message-date-divider">
                          <span>{msg.date}</span>
                        </div>
                      )}
                      <div className={`message ${msg.sender}`}>
                        <div className="message-content">
                          <p>{msg.text}</p>
                          <span className="message-time">{msg.time}</span>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form className="chat-input" onSubmit={handleSendMessage}>
                <button type="button" className="chat-input-btn attach">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="พิมพ์ข้อความ..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="chat-input-btn send"
                  disabled={!message.trim()}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </>
          ) : (
            <div className="chat-empty-state">
              <div className="chat-empty-icon">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3>เลือกการสนทนา</h3>
              <p>เลือกบทสนทนาจากรายการด้านซ้ายเพื่อเริ่มแชท</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
