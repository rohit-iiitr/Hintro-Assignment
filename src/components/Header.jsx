import React, { useState, useRef, useEffect } from 'react';
import { Play, ChevronDown, LogOut, Sparkles, UserCheck } from 'lucide-react';

export default function Header({ 
  title, 
  user, 
  onLogoutClick
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Mock Avatar url based on user
  const avatarUrl = user?.id === 'u2' 
    ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' // Beautiful avatar
    : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'; // Another avatar

  return (
    <header className="hintro-header animate-fade">
      <div className="header-left">
        <h2 className="page-title">{title}</h2>
      </div>

      <div className="header-right">
        <button 
          onClick={() => alert("Launching Hintro interactive walk-through tutorial...")}
          className="btn-outline watch-tutorial-btn"
        >
          <Play size={14} className="play-icon-fill" />
          <span>Watch Tutorial</span>
        </button>

        <div className="profile-dropdown-wrapper" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="profile-trigger-btn"
          >
            <img 
              src={avatarUrl} 
              alt={`${user?.firstName || 'User'} avatar`} 
              className="profile-avatar-img"
            />
            <ChevronDown size={14} className={`chevron-icon ${dropdownOpen ? 'rotate' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu-card animate-scale">
              <div className="dropdown-user-info">
                <span className="dropdown-username">{user?.firstName} {user?.lastName}</span>
                <span className="dropdown-email">{user?.email}</span>
              </div>
              <div className="dropdown-divider"></div>
              <button 
                onClick={() => {
                  setDropdownOpen(false);
                  onLogoutClick();
                }}
                className="dropdown-logout-btn"
              >
                <LogOut size={16} />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .hintro-header {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          border-bottom: 1.5px solid var(--color-border);
          background-color: #FFFFFF;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        
        .page-title {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 22px;
          color: #000000;
          letter-spacing: -0.5px;
        }
        
        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .watch-tutorial-btn {
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 13.5px;
          font-weight: 500;
          height: 38px;
          color: #000000;
          border: 1px solid #1A1A1A;
          gap: 6px;
        }
        
        .play-icon-fill {
          fill: currentColor;
        }
        

        
        .profile-dropdown-wrapper {
          position: relative;
        }
        
        .profile-trigger-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px;
          border-radius: 9999px;
        }
        
        .profile-avatar-img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid var(--color-border-dark);
        }
        
        .chevron-icon {
          color: #7A7A7A;
          transition: transform var(--transition-fast);
        }
        
        .chevron-icon.rotate {
          transform: rotate(180deg);
        }
        
        .dropdown-menu-card {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background-color: #FFFFFF;
          border: 1px solid var(--color-border-dark);
          border-radius: 12px;
          width: 200px;
          box-shadow: var(--shadow-lg);
          padding: 8px 0;
          z-index: 100;
        }
        
        .dropdown-user-info {
          padding: 8px 16px;
          display: flex;
          flex-direction: column;
        }
        
        .dropdown-username {
          font-weight: 600;
          font-size: 13.5px;
          color: var(--color-text-primary);
        }
        
        .dropdown-email {
          font-size: 11px;
          color: var(--color-text-muted);
          margin-top: 2px;
        }
        
        .dropdown-divider {
          height: 1px;
          background-color: var(--color-border);
          margin: 8px 0;
        }
        
        .dropdown-logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          font-size: 13px;
          color: var(--color-text-secondary);
          text-align: left;
        }
        
        .dropdown-logout-btn:hover {
          background-color: var(--color-bg-base);
          color: var(--color-text-primary);
        }
      `}</style>
    </header>
  );
}
