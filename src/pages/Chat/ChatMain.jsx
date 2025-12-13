/**
 * ChatMain.jsx - Main Chat Page
 * หน้าแชทหลักแยกออกจาก Settings
 */
import React, { useState, useRef, useEffect } from "react";
import "./ChatMain.css";

// Import mock data from JSON files
import conversationsData from "./data/conversations.json";

// Import individual message files
import somyingMessages from "./data/messages/somying-rakrean.json";
import wichaiMessages from "./data/messages/wichai-kengmak.json";
import raanKafaeHomMessages from "./data/messages/raan-kafae-hom.json";
import preechaMessages from "./data/messages/preecha-chalatdee.json";
import borisatAbcMessages from "./data/messages/borisat-abc.json";

// Map conversation ID to messages
const messagesData = {
  1: somyingMessages,
  2: wichaiMessages,
  3: raanKafaeHomMessages,
  4: preechaMessages,
  5: borisatAbcMessages,
};

const ChatMain = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);
  const messagesContainerRef = useRef(null);

  // Filter conversations
  const filteredConversations = conversationsData.filter((conv) => {
    const matchesType = filterType === "all" || conv.type === filterType;
    const matchesSearch = conv.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Load messages when chat is selected
  useEffect(() => {
    if (selectedChat) {
      setMessages(messagesData[selectedChat.id] || []);
      setIsMobileSidebarOpen(false);
    }
  }, [selectedChat]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
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

  const totalUnread = conversationsData.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="chat-page">
      {/* Chat Container */}
      <div className="chat-main-container">
        {/* Conversations Sidebar */}
        <div
          className={`chat-conversations-sidebar ${
            isMobileSidebarOpen ? "mobile-open" : ""
          }`}
        >
          {/* Header */}
          <div className="chat-sidebar-header">
            <div className="chat-header-top">
              <h1 className="chat-page-title">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                ข้อความ
                {totalUnread > 0 && (
                  <span className="total-unread-badge">{totalUnread}</span>
                )}
              </h1>
            </div>

            {/* Search */}
            <div className="chat-search-box">
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

            {/* Filter Tabs */}
            <div className="chat-filter-buttons">
              <button
                className={`chat-filter-btn ${
                  filterType === "all" ? "active" : ""
                }`}
                onClick={() => setFilterType("all")}
              >
                ทั้งหมด
              </button>
              <button
                className={`chat-filter-btn ${
                  filterType === "applicant" ? "active" : ""
                }`}
                onClick={() => setFilterType("applicant")}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                ผู้สมัคร
              </button>
              <button
                className={`chat-filter-btn ${
                  filterType === "customer" ? "active" : ""
                }`}
                onClick={() => setFilterType("customer")}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                ลูกค้า
              </button>
            </div>
          </div>

          {/* Conversations List */}
          <div className="chat-conversations-list">
            {filteredConversations.length === 0 ? (
              <div className="chat-no-conversations">
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
                  className={`chat-conversation-item ${
                    selectedChat?.id === conv.id ? "active" : ""
                  } ${conv.unread > 0 ? "has-unread" : ""}`}
                  onClick={() => setSelectedChat(conv)}
                >
                  <div className="chat-conv-avatar">
                    {getInitials(conv.name)}
                    {conv.online && <span className="chat-online-dot" />}
                  </div>
                  <div className="chat-conv-info">
                    <div className="chat-conv-top">
                      <span className="chat-conv-name">{conv.name}</span>
                      <span className="chat-conv-time">
                        {conv.lastMessageTime}
                      </span>
                    </div>
                    <div className="chat-conv-type-row">
                      <span className={`chat-conv-type-badge ${conv.type}`}>
                        {conv.type === "applicant"
                          ? conv.position
                          : conv.orderRef}
                      </span>
                    </div>
                    <div className="chat-conv-preview">
                      <p>{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <span className="chat-unread-count">{conv.unread}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-message-area">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="chat-area-header">
                <button
                  className="chat-back-btn"
                  onClick={() => setIsMobileSidebarOpen(true)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <div className="chat-header-user">
                  <div className="chat-header-avatar">
                    {getInitials(selectedChat.name)}
                    {selectedChat.online && (
                      <span className="chat-online-dot" />
                    )}
                  </div>
                  <div className="chat-header-details">
                    <h3>{selectedChat.name}</h3>
                    <span className={`chat-header-type ${selectedChat.type}`}>
                      {selectedChat.type === "applicant"
                        ? `ผู้สมัคร: ${selectedChat.position}`
                        : `ลูกค้า: ${selectedChat.orderRef}`}
                    </span>
                  </div>
                </div>
                <div className="chat-header-actions">
                  {selectedChat.type === "applicant" && (
                    <button className="chat-header-btn" title="ดูโปรไฟล์">
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
                    <button className="chat-header-btn" title="ดูคำสั่งซื้อ">
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
                      </svg>
                    </button>
                  )}
                  <button className="chat-header-btn" title="เพิ่มเติม">
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
              <div
                className="chat-messages-container"
                ref={messagesContainerRef}
              >
                {messages.map((msg, index) => {
                  const showDate =
                    index === 0 || messages[index - 1].date !== msg.date;
                  return (
                    <React.Fragment key={msg.id}>
                      {showDate && (
                        <div className="chat-date-divider">
                          <span>{msg.date}</span>
                        </div>
                      )}
                      <div className={`chat-message ${msg.sender}`}>
                        <div className="chat-message-bubble">
                          <p>{msg.text}</p>
                          <span className="chat-message-time">{msg.time}</span>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Message Input */}
              <form className="chat-input-form" onSubmit={handleSendMessage}>
                <button type="button" className="chat-attach-btn">
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
                  className="chat-send-btn"
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

export default ChatMain;
