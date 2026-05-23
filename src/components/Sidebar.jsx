import React from 'react';
import { 
  LayoutGrid, 
  Phone, 
  FileText, 
  MessageSquare, 
  LifeBuoy, 
  Inbox, 
  Gift, 
  AlertCircle,
  X
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab,
  user,
  usageData,
  isOpen,
  onClose
}) {
  const used = usageData?.kb_files?.used ?? 0;
  const limit = usageData?.kb_files?.limit ?? 100;
  const percentage = usageData?.kb_files?.percentage ?? 0;
  
  const mainMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'insights', label: 'Call Insights', icon: Phone },
    { id: 'kb', label: 'Knowledge Base', icon: FileText, hasAlert: true },
    { id: 'prompts', label: 'Prompts', icon: MessageSquare, hasAlert: true },
    { id: 'boxy', label: 'Boxy Controls', icon: LifeBuoy, hasAlert: true },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div className="sidebar-mobile-backdrop" onClick={onClose}></div>
      )}
      
      <aside className={`hintro-sidebar ${isOpen ? 'mobile-drawer-open' : ''} animate-fade`}>
        {/* Mobile Close Button Header */}
        <div className="mobile-close-header">
          <button onClick={onClose} className="mobile-close-btn" aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        {/* Centered Logo Block with Horizontal Border-Bottom */}
        <div className="sidebar-brand">
          <span className="brand-text">Hintro</span>
        </div>

      <nav className="sidebar-nav">
        <ul className="menu-list">
          {mainMenuItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <li key={item.id} className="menu-item-wrapper">
                <button 
                  onClick={() => setActiveTab(item.id)}
                  className={`menu-item-btn ${isSelected ? 'selected' : ''}`}
                >
                  <span className="menu-item-content">
                    <Icon size={18} className="menu-icon" />
                    <span className="menu-label">{item.label}</span>
                  </span>
                  
                  {item.hasAlert && (
                    <span className="alert-circle-indicator">
                      <AlertCircle size={15} />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Divider separator */}
        <div className="sidebar-divider"></div>

        <ul className="menu-list secondary-list">
          <li className="menu-item-wrapper">
            <button 
              onClick={() => setActiveTab('feedback-history')}
              className={`menu-item-btn ${activeTab === 'feedback-history' ? 'selected' : ''}`}
            >
              <span className="menu-item-content">
                <Inbox size={18} className="menu-icon" />
                <span className="menu-label">Feedback History</span>
              </span>
            </button>
          </li>
          
          <li className="menu-item-wrapper">
            <button 
              onClick={() => setActiveTab('feedback')}
              className={`menu-item-btn ${activeTab === 'feedback' ? 'selected' : ''}`}
            >
              <span className="menu-item-content">
                <Gift size={18} className="menu-icon" />
                <span className="menu-label">Feedback</span>
              </span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Upgrade Button Section (Gray button with rounded corners centered at bottom) */}
      <div className="sidebar-footer">
        {usageData && user?.id === 'u2' && (
          <div className="usage-meter-card">
            <div className="usage-meter-header">
              <span className="usage-text"><strong>{used}</strong> of <strong>{limit}</strong> MB used</span>
            </div>
            <div className="usage-progress-bar-container">
              <div className="usage-progress-bar-fill" style={{ width: `${percentage}%` }}></div>
            </div>
          </div>
        )}

        <button 
          onClick={() => setActiveTab('upgrade')}
          className="upgrade-pill-btn"
        >
          Upgrade
        </button>
      </div>

      <style>{`
        .hintro-sidebar {
          width: 260px;
          height: 100vh;
          background-color: var(--color-bg-sidebar);
          border-right: 1.5px solid var(--color-border);
          display: flex;
          flex-direction: column;
          padding: 0; /* Full-bleed layout to allow horizontal dividers to touch the right edge */
          flex-shrink: 0;
          position: sticky;
          top: 0;
        }
        
        @media (max-width: 768px) {
          .hintro-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            z-index: 1000;
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            width: 280px;
            box-shadow: 20px 0 40px rgba(0,0,0,0.1);
          }
          
          .hintro-sidebar.mobile-drawer-open {
            transform: translateX(0);
          }
          
          .sidebar-mobile-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(4px);
            z-index: 999;
            animation: fadeIn 0.2s ease-out;
          }
          
          .mobile-close-header {
            display: flex;
            align-items: center;
            padding: 16px 20px;
            width: 100%;
          }
          
          .mobile-close-btn {
            color: #4B5563;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-close-header {
            display: none;
          }
        }
        
        .sidebar-brand {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1.5px solid var(--color-border);
          width: 100%;
          margin-bottom: 24px;
        }
        
        @media (max-width: 768px) {
          .sidebar-brand {
            display: none; /* Hide Hintro logo brand header inside mobile drawer menu matching screenshot */
          }
        }
        
        .brand-text {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 26px;
          color: #000000;
          letter-spacing: -0.5px;
        }
        
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          padding: 0 16px;
        }
        
        .menu-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .secondary-list {
          margin-top: 0;
          margin-bottom: 8px;
        }
        
        .menu-item-wrapper {
          width: 100%;
        }
        
        .menu-item-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: 8px;
          color: #1F2937;
          font-weight: 500;
          font-size: 14.5px;
          transition: all var(--transition-fast);
        }
        
        .menu-item-btn:hover {
          background-color: var(--color-bg-base);
          color: #000000;
        }
        
        .menu-item-btn.selected {
          background-color: #EEF2FE;
          color: #4F46E5;
          font-weight: 600;
        }
        
        .menu-item-btn.selected .menu-icon {
          color: #4F46E5;
        }
        
        .menu-item-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .menu-icon {
          flex-shrink: 0;
          color: #4B5563;
        }
        
        .alert-circle-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000000;
          opacity: 0.9;
        }
        
        .sidebar-divider {
          height: 1.5px;
          background-color: var(--color-border);
          margin-top: auto;
          margin-bottom: 8px;
        }
        
        .sidebar-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 8px 16px 32px 16px;
        }
        
        .usage-meter-card {
          background-color: #F3F4F6;
          border: 1px solid var(--color-border-dark);
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 16px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .usage-meter-header {
          font-size: 12.5px;
          color: #374151;
          text-align: center;
        }
        
        .usage-progress-bar-container {
          height: 6px;
          background-color: #E5E7EB;
          border-radius: 9999px;
          overflow: hidden;
          width: 100%;
        }
        
        .usage-progress-bar-fill {
          height: 100%;
          background-color: #4B5563;
          border-radius: 9999px;
          transition: width 0.5s ease-in-out;
        }
        
        .upgrade-pill-btn {
          width: 100%;
          background-color: #808080; /* Solid gray matching user's image exactly */
          color: #FFFFFF;
          padding: 12px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14.5px;
          text-align: center;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }
        
        .upgrade-pill-btn:hover {
          background-color: #6B7280;
          transform: translateY(-1px);
        }
      `}</style>
    </aside>
    </>
  );
}
