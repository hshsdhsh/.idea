import React, { useState } from 'react';
import './Messenger.css';

const mockChats = [
  { id: 1, name: 'Самвел К.', avatar: '🧑', role: 'Агент', lastMsg: 'Да, квартира свободна на эти даты.', time: '14:30', online: true },
  { id: 2, name: 'Арам Давтян', avatar: '👨', role: 'Владелец', lastMsg: 'Отправил вам запрос на подтверждение.', time: 'Вчера', online: false },
  { id: 3, name: 'CleanHome LLC', avatar: '✨', role: 'Клининг', lastMsg: 'Завтра будем в 10:00.', time: 'Пн', online: true },
];

const mockMessages = [
  { id: 1, text: 'Здравствуйте, меня интересует аренда вашей квартиры на ул. Абовяна.', sender: 'me', time: '14:20' },
  { id: 2, text: 'Здравствуйте! Да, квартира свободна на эти даты.', sender: 'them', time: '14:30' },
];

const Messenger = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [msgInput, setMsgInput] = useState('');

  return (
    <div className="container" style={{padding: '24px 16px', height: 'calc(100vh - 120px)'}}>
      <div className={`messenger-layout card ${activeChat ? 'has-active-chat' : ''}`}>
        <div className="chats-list">
          <div style={{padding: '24px', borderBottom: '1px solid var(--border-color)'}}>
            <h2 style={{color: 'var(--primary)', marginBottom: '16px'}}>Сообщения</h2>
            <input type="text" placeholder="Поиск чатов..." className="search-input w-full" />
          </div>
          
          <div className="chat-items">
            {mockChats.map(chat => (
              <div 
                key={chat.id} 
                className={`chat-item ${activeChat.id === chat.id ? 'active' : ''}`}
                onClick={() => setActiveChat(chat)}
              >
                <div className="avatar-wrapper">
                  <span className="avatar-emoji">{chat.avatar}</span>
                  {chat.online && <div className="online-indicator"></div>}
                </div>
                <div className="chat-item-info">
                  <div className="flex justify-between items-center">
                    <h4 style={{fontWeight: 600, color: 'var(--text-main)'}}>{chat.name}</h4>
                    <span className="text-muted" style={{fontSize: '0.8rem'}}>{chat.time}</span>
                  </div>
                  <p className="text-muted truncate">{chat.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="chat-window">
          {activeChat ? (
            <>
              <div className="chat-header">
                <div className="flex items-center gap-4">
                  <button 
                    className="btn mobile-only flex items-center justify-center" 
                    onClick={() => setActiveChat(null)}
                    style={{padding: '8px', fontSize: '1.2rem', margin: 0}}
                  >
                    ⬅️
                  </button>
                   <div className="avatar-wrapper">
                    <span className="avatar-emoji">{activeChat.avatar}</span>
                    {activeChat.online && <div className="online-indicator"></div>}
                  </div>
                  <div>
                    <h3 style={{color: 'var(--primary)'}}>{activeChat.name}</h3>
                    <span className="text-muted" style={{fontSize: '0.9rem'}}>{activeChat.role} {activeChat.online ? '• В сети' : ''}</span>
                  </div>
                </div>
              </div>
              
              <div className="chat-messages">
                <div className="text-center text-muted" style={{fontSize: '0.85rem', marginBottom: '24px'}}>Сегодня</div>
                
                {mockMessages.map(msg => (
                  <div key={msg.id} className={`message-bubble-wrapper ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                    <div className="message-bubble">{msg.text}</div>
                    <span className="message-time">{msg.time}</span>
                  </div>
                ))}
              </div>
              
              <div className="chat-input-area border-t" style={{borderTop: '1px solid var(--border-color)', padding: '16px'}}>
                <div className="flex items-center gap-2">
                  <button className="btn btn-outline" style={{padding: '8px', borderRadius: '50%', color: 'var(--text-muted)'}}>📎</button>
                  <input 
                    type="text" 
                    placeholder="Сообщение..." 
                    className="search-input fluid" 
                    value={msgInput}
                    onChange={(e) => setMsgInput(e.target.value)}
                    style={{padding: '10px 16px'}}
                  />
                  <button className="btn btn-primary" style={{padding: '10px 16px', borderRadius: '24px'}}>Отправить</button>
                </div>
              </div>
            </>
          ) : (
             <div className="flex items-center justify-center h-full text-muted">Выберите чат для начала общения</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
