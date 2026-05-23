import React, { useState } from 'react';
import { Calendar, MoreVertical, Plus, PhoneCall } from 'lucide-react';
import { formatCallTime, formatCallDateHeader } from '../utils/formatters';

export default function RecentCalls({ calls, user, onStartCallClick }) {
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Group calls by date
  const groupCallsByDate = (callList) => {
    const groups = {};
    callList.forEach((call) => {
      const dateHeader = formatCallDateHeader(call.started_at);
      if (!groups[dateHeader]) {
        groups[dateHeader] = [];
      }
      groups[dateHeader].push(call);
    });
    return groups;
  };

  const groupedCalls = calls ? groupCallsByDate(calls) : {};
  const hasCalls = calls && calls.length > 0;

  // Toggle action menu
  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  // Close menu on click anywhere else
  React.useEffect(() => {
    const closeAllMenus = () => setActiveMenuId(null);
    document.addEventListener('click', closeAllMenus);
    return () => document.removeEventListener('click', closeAllMenus);
  }, []);

  return (
    <div className="recent-calls-wrapper animate-slide">
      <h3 className="section-title">Recent calls</h3>

      {!hasCalls ? (
        /* Empty State (Screen 1) */
        <div className="empty-calls-card">
          <div className="calendar-icon-outer">
            <Calendar size={26} className="calendar-icon-blue" />
          </div>
          <h4>No Recent Calls</h4>
          <p className="empty-desc">
            Connect your Google Calendar to see upcoming meetings,<br />
            get reminders, and join calls directly from Hintro.
          </p>
          <button onClick={onStartCallClick} className="btn-outline start-call-btn">
            Start a Call
          </button>
        </div>
      ) : (
        /* Populated State (Screen 2) */
        <div className="calls-timeline">
          {Object.entries(groupedCalls).map(([date, dateCalls]) => (
            <div key={date} className="date-group-section">
              <h4 className="date-header">{date}</h4>
              <div className="calls-list">
                {dateCalls.map((call) => {
                  // Get client initial or first letter of description for avatar
                  const initial = call.client ? call.client.charAt(0) : 'C';
                  
                  return (
                    <div key={call._id} className="call-row-card">
                      <div className="call-row-left">
                        {/* Purple/Indigo initial badge */}
                        <div className="initial-avatar-badge">
                          {initial}
                        </div>
                        
                        <div className="call-meta-info">
                          <h5 className="call-client-title">{call.description || `${call.client} Call`}</h5>
                          
                          {/* Overlapping participant avatars */}
                          <div className="participants-stack">
                            {call.participants && call.participants.slice(0, 3).map((p, idx) => {
                              const pInitial = p.name ? p.name.charAt(0) : 'U';
                              const avatarColors = ['#E2E8F0', '#E0F2FE', '#FEE2E2'];
                              const textColors = ['#475569', '#0369A1', '#B91C1C'];
                              
                              return (
                                <div 
                                  key={idx} 
                                  className="stack-avatar" 
                                  style={{ 
                                    zIndex: 3 - idx,
                                    backgroundColor: avatarColors[idx % 3],
                                    color: textColors[idx % 3]
                                  }}
                                  title={p.name}
                                >
                                  {pInitial}
                                </div>
                              );
                            })}
                            {call.participants && call.participants.length > 3 && (
                              <div className="stack-avatar more-avatar" style={{ zIndex: 0 }}>
                                +{call.participants.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="call-row-right">
                        <span className="call-time-label">
                          {formatCallTime(call.started_at)}
                        </span>
                        
                        <div className="action-dropdown-wrapper">
                          <button 
                            onClick={(e) => toggleMenu(call._id, e)}
                            className="btn-action-menu"
                          >
                            <MoreVertical size={18} />
                          </button>
                          
                          {activeMenuId === call._id && (
                            <div className="row-action-menu animate-scale">
                              <button onClick={() => alert(`Viewing details for session with ${call.client}`)} className="menu-action-item">
                                View Transcript
                              </button>
                              <button onClick={() => alert("AI Analysis is processing...")} className="menu-action-item">
                                Get AI Summary
                              </button>
                              <div className="menu-divider"></div>
                              <button onClick={() => alert("Call deleted from local mock list")} className="menu-action-item delete-item">
                                Delete Log
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .recent-calls-wrapper {
          width: 100%;
        }
        
        .section-title {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 16px;
          color: #000000;
          text-align: center;
          margin-bottom: 24px;
        }
        
        /* Empty State Styles */
        .empty-calls-card {
          background-color: var(--color-bg-card);
          border: 1px solid var(--color-border-dark);
          border-radius: 20px;
          padding: 48px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          max-width: 720px;
          margin: 0 auto;
          box-shadow: var(--shadow-sm);
        }
        
        .calendar-icon-outer {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: #EEF2FE;
          border: 1px solid #DCE3FA;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        
        .calendar-icon-blue {
          color: var(--color-primary);
        }
        
        .empty-calls-card h4 {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 8px;
        }
        
        .empty-desc {
          font-size: 13px;
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin-bottom: 24px;
        }
        
        .start-call-btn {
          border-radius: 8px;
          padding: 8px 24px;
          font-size: 13px;
          font-weight: 500;
          border-color: var(--color-border-dark);
          color: #000000;
          background-color: #FFFFFF;
        }
        
        .start-call-btn:hover {
          border-color: #A3A3A3;
        }
        
        /* Populated Timeline Styles */
        .calls-timeline {
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        
        .date-group-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .date-header {
          font-size: 12px;
          font-weight: 500;
          color: var(--color-text-muted);
          text-align: left;
          padding-left: 4px;
        }
        
        .calls-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .call-row-card {
          background-color: var(--color-bg-card);
          padding: 12px 16px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all var(--transition-fast);
        }
        
        .call-row-card:hover {
          transform: translateX(2px);
        }
        
        .call-row-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .initial-avatar-badge {
          width: 42px;
          height: 42px;
          border-radius: 8px;
          background-color: var(--color-accent-purple);
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(124, 58, 237, 0.15);
        }
        
        .call-meta-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .call-client-title {
          font-size: 14.5px;
          font-weight: 600;
          color: #000000;
        }
        
        .participants-stack {
          display: flex;
          align-items: center;
          padding-left: 2px;
        }
        
        .stack-avatar {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1.5px solid #FFFFFF;
          margin-left: -6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          font-weight: 700;
          user-select: none;
        }
        
        .stack-avatar:first-child {
          margin-left: 0;
        }
        
        .more-avatar {
          background-color: #E2E8F0;
          color: #475569;
        }
        
        .call-row-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .call-time-label {
          font-size: 13px;
          font-weight: 500;
          color: var(--color-text-secondary);
        }
        
        .btn-action-menu {
          color: #000000;
          opacity: 0.8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          border-radius: 6px;
        }
        
        .btn-action-menu:hover {
          background-color: var(--color-bg-base);
          opacity: 1;
        }
        
        .action-dropdown-wrapper {
          position: relative;
        }
        
        .row-action-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background-color: #FFFFFF;
          border: 1px solid var(--color-border-dark);
          border-radius: 10px;
          box-shadow: var(--shadow-md);
          width: 150px;
          padding: 6px 0;
          z-index: 5;
        }
        
        .menu-action-item {
          width: 100%;
          padding: 8px 12px;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--color-text-secondary);
          text-align: left;
        }
        
        .menu-action-item:hover {
          background-color: var(--color-bg-base);
          color: var(--color-text-primary);
        }
        
        .menu-divider {
          height: 1px;
          background-color: var(--color-border);
          margin: 4px 0;
        }
        
        .delete-item {
          color: var(--color-danger);
        }
        
        .delete-item:hover {
          background-color: var(--color-danger-light);
          color: var(--color-danger);
        }
      `}</style>
    </div>
  );
}
