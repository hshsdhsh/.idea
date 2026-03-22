import React, { useState, useEffect, useRef } from 'react';
import './Messenger.css';

const defaultChats = [
  { id: 1, name: 'Արমен Խաchаtрян', avatar: '🧑', role: 'Գործакал', lastMsg: 'Այо, квартира свободна.', time: '14:30', online: true },
  { id: 2, name: 'Ани Асатрян', avatar: '👩', role: 'Агент', lastMsg: 'Договор отправлен.', time: 'Вчера', online: false },
  { id: 3, name: 'Шолик Уборка', avatar: '✨', role: 'Клининг', lastMsg: 'Будем в 10:00.', time: 'Пн', online: true },
];

const defaultMessages = {
  1: [
    { id: 1, text: 'Здравствуйте, меня интересует квартира.', sender: 'me', time: '14:20' },
    { id: 2, text: 'Привет! Да, квартира свободна. Можно забронировать через Escrow.', sender: 'them', time: '14:30' },
  ],
  2: [
    { id: 1, text: 'Пришлите договор, пожалуйста.', sender: 'me', time: '10:00' },
    { id: 2, text: 'Договор отправлен на согласование.', sender: 'them', time: '10:15' },
  ],
  3: [
    { id: 1, text: 'Когда вы приедете?', sender: 'me', time: '09:00' },
    { id: 2, text: 'Будем в 10:00.', sender: 'them', time: '09:05' },
  ],
};

const Messenger = ({ navigate, t, chatSeed, onChatSeeded }) => {
  const [chats, setChats] = useState(defaultChats);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState(defaultMessages);
  const [msgInput, setMsgInput] = useState('');
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef(null);

  // Handle incoming chat seed from PropertyDetail "Message Owner"
  useEffect(() => {
    if (chatSeed) {
      // Check if chat for this property already exists
      const existing = chats.find(c => c.id === chatSeed.id);
      if (!existing) {
        const newChat = { ...chatSeed, lastMsg: '...', time: 'Сейчас' };
        setChats(prev => [newChat, ...prev]);
        setMessages(prev => ({ ...prev, [chatSeed.id]: [] }));
        setActiveChat(newChat);
      } else {
        setActiveChat(existing);
      }
      if (onChatSeeded) onChatSeeded();
    }
  }, [chatSeed]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat, messages]);

  const sendMessage = () => {
    const text = msgInput.trim();
    if (!text || !activeChat) return;
    const newMsg = { id: Date.now(), text, sender: 'me', time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => ({ ...prev, [activeChat.id]: [...(prev[activeChat.id] || []), newMsg] }));
    setChats(prev => prev.map(c => c.id === activeChat.id ? { ...c, lastMsg: text, time: 'Сейчас' } : c));
    setMsgInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const filteredChats = chats.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.lastMsg.toLowerCase().includes(search.toLowerCase())
  );

  const currentMessages = activeChat ? (messages[activeChat.id] || []) : [];

  return (
    <div className="container" style={{ padding: '24px 16px', height: 'calc(100vh - 120px)' }}>
      <div className={`messenger-layout ${activeChat ? 'has-active-chat' : ''}`}>
        {/* Chat List */}
        <div className="chats-list">
          <div style={{ padding: '24px', paddingBottom: '16px' }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '16px', fontWeight: '800', fontSize: '1.6rem' }}>
              {t?.nav?.chat || 'Чат'}
            </h2>
            <div className="input-with-icon" style={{ borderRadius: '24px' }}>
              <span>🔍</span>
              <input
                type="text"
                placeholder={t?.search?.pSearch || 'Поиск...'}
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ background: 'transparent', outline: 'none', border: 'none', width: '100%' }}
              />
            </div>
          </div>

          <div className="chat-items">
            {filteredChats.map(chat => (
              <div
                key={chat.id}
                className={`chat-item ${activeChat?.id === chat.id ? 'active' : ''}`}
                onClick={() => setActiveChat(chat)}
              >
                <div className="avatar-wrapper">
                  <span className="avatar-emoji">{chat.avatar}</span>
                  {chat.online && <div className="online-indicator"></div>}
                </div>
                <div className="chat-item-info">
                  <div className="flex justify-between items-center" style={{ marginBottom: '6px' }}>
                    <h4 style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '1.05rem', margin: 0 }}>{chat.name}</h4>
                    <span className="text-muted" style={{ fontSize: '0.8rem', fontWeight: 600 }}>{chat.time}</span>
                  </div>
                  <p className="text-muted truncate" style={{ fontSize: '0.95rem', margin: 0 }}>{chat.lastMsg}</p>
                </div>
              </div>
            ))}
            {filteredChats.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 16px', fontSize: '0.95rem' }}>
                {search ? 'Ничего не найдено' : 'Нет чатов'}
              </div>
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          {activeChat ? (
            <>
              <div className="chat-header">
                <div className="flex items-center gap-4">
                  <button
                    className="btn mobile-only flex items-center justify-center"
                    onClick={() => setActiveChat(null)}
                    style={{ padding: '8px', fontSize: '1.5rem', margin: 0, background: 'transparent', border: 'none', color: 'var(--primary)' }}
                  >
                    ←
                  </button>
                  <div className="avatar-wrapper" style={{ width: '46px', height: '46px' }}>
                    <span className="avatar-emoji" style={{ boxShadow: 'none', border: '2px solid var(--border-color)' }}>{activeChat.avatar}</span>
                    {activeChat.online && <div className="online-indicator"></div>}
                  </div>
                  <div>
                    <h3 style={{ color: 'var(--primary)', fontWeight: '700', margin: 0, fontSize: '1.2rem' }}>{activeChat.name}</h3>
                    <span className="text-muted" style={{ fontSize: '0.85rem', fontWeight: 500 }}>{activeChat.role} {activeChat.online ? '• В сети' : ''}</span>
                  </div>
                </div>
              </div>

              <div className="chat-messages">
                <div className="text-center text-muted" style={{ fontSize: '0.85rem', marginBottom: '8px', fontWeight: 600 }}>Сегодня</div>

                {currentMessages.map(msg => (
                  <div key={msg.id} className={`message-bubble-wrapper ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                    <div className="message-bubble">{msg.text}</div>
                    <span className="message-time">{msg.time}</span>
                  </div>
                ))}
                {currentMessages.length === 0 && (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px', opacity: 0.6 }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💬</div>
                    Начните разговор
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input-area">
                <div className="chat-input-wrapper">
                  <button className="btn btn-outline" style={{ padding: '8px', borderRadius: '50%', color: 'var(--text-muted)', border: 'none', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px' }}>
                    📎
                  </button>
                  <input
                    type="text"
                    placeholder="Написать сообщение..."
                    style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '1rem', padding: '10px 0' }}
                    value={msgInput}
                    onChange={(e) => setMsgInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    className="btn btn-primary"
                    style={{ padding: '10px 24px', borderRadius: '24px', fontWeight: 700, opacity: msgInput.trim() ? 1 : 0.5 }}
                    onClick={sendMessage}
                  >
                    Отправить
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full flex-col gap-4 text-muted" style={{ opacity: 0.5 }}>
              <span style={{ fontSize: '4.5rem', filter: 'grayscale(1)' }}>💬</span>
              <h2 style={{ fontWeight: 600 }}>Выберите чат для начала</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
