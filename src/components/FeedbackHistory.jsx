import React, { useState, useEffect } from 'react';
import { MessageSquarePlus, Clock } from 'lucide-react';

export default function FeedbackHistory({ onOpenFeedbackForm }) {
  const [feedbacks, setFeedbacks] = useState([]);

  // Default entries from the Figma screenshot to pre-populate LocalStorage on first launch!
  const defaultFeedbacks = [
    {
      id: "fb_default_2",
      rating: 4,
      ratingText: "4/5",
      title: "My First Call",
      description: "The boxy features worked perfectly and the summary was extremely high quality.",
      displayDescription: "- The boxy feature...",
      dateStr: "11th May 2026",
      timeStr: "5:00 pm",
      createdAt: "2026-05-11T17:00:00.000Z"
    },
    {
      id: "fb_default_1",
      rating: 2,
      ratingText: "2/5",
      title: "My First Call",
      description: "Had issues with audio syncing during the call and transcripts were laggy.",
      displayDescription: "- Had issues with...",
      dateStr: "10th May 2026",
      timeStr: "5:00 pm",
      createdAt: "2026-05-10T17:00:00.000Z"
    }
  ];

  // Helper: Format date to ordinal format (e.g. "23rd May 2026")
  const getOrdinalDateString = (dateVal) => {
    const date = new Date(dateVal);
    if (isNaN(date.getTime())) return '';
    
    const day = date.getDate();
    const monthFullNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const month = monthFullNames[date.getMonth()];
    const year = date.getFullYear();
    
    const getSuffix = (n) => {
      if (n > 3 && n < 21) return 'th';
      switch (n % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    };
    
    return `${day}${getSuffix(day)} ${month} ${year}`;
  };

  // Helper: Format time to clock format (e.g. "5:00 pm")
  const getTimeString = (dateVal) => {
    const date = new Date(dateVal);
    if (isNaN(date.getTime())) return '';
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const minStr = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minStr} ${ampm}`;
  };

  // Helper: Render star icons for mobile cards
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`fb-star ${i < rating ? 'star-filled' : 'star-empty'}`}>★</span>
    ));
  };

  // Load feedbacks
  const loadFeedbacks = () => {
    try {
      const stored = localStorage.getItem('hintro_feedbacks');
      if (!stored) {
        // First load pre-population with figma default items!
        localStorage.setItem('hintro_feedbacks', JSON.stringify(defaultFeedbacks));
        setFeedbacks(defaultFeedbacks);
      } else {
        const parsed = JSON.parse(stored);
        
        // Map any dynamic entries with custom formatted times/dates for display
        const mapped = parsed.map(item => {
          if (!item.dateStr) {
            return {
              ...item,
              ratingText: `${item.rating}/5`,
              title: item.title || "My First Call",
              displayDescription: `- ${item.description}`,
              dateStr: getOrdinalDateString(item.createdAt),
              timeStr: getTimeString(item.createdAt)
            };
          }
          return item;
        });
        
        setFeedbacks(mapped);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadFeedbacks();
    
    window.addEventListener('feedbackSubmitted', loadFeedbacks);
    return () => window.removeEventListener('feedbackSubmitted', loadFeedbacks);
  }, []);

  const clearAllFeedbacks = () => {
    if (!window.confirm("Are you sure you want to permanently clear feedback history?")) return;
    localStorage.setItem('hintro_feedbacks', JSON.stringify([]));
    setFeedbacks([]);
  };

  return (
    <div className="feedback-history-container animate-fade">
      {/* Subtitle */}
      <div className="history-subtitle-row">
        <span className="history-sub-text">Review your previous feedbacks</span>
      </div>

      {/* ── DESKTOP: Structured Table Card (hidden on mobile) ── */}
      <div className="table-card-wrapper desktop-table-view">
        <table className="feedback-history-table">
          <thead>
            <tr>
              <th style={{ width: '22%' }}>Title</th>
              <th style={{ width: '15%' }}>Rating</th>
              <th style={{ width: '38%' }}>Description</th>
              <th style={{ width: '15%' }}>Date</th>
              <th style={{ width: '10%' }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length === 0 ? (
              /* Custom Empty State inside Table Wrapper cells */
              <tr>
                <td colSpan="5" className="empty-table-row-cell">
                  <div className="empty-table-content">
                    <h4 className="empty-table-title">No feedbacks yet</h4>
                    <button onClick={onOpenFeedbackForm} className="give-fb-empty-btn">
                      Give Feedback
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              feedbacks.map((item) => (
                <tr key={item.id} className="table-data-row">
                  <td className="col-title">My first call </td>
                  <td className="col-rating">{item.ratingText || `${item.rating}/5`}</td>
                  <td className="col-desc">
                    <div className="desc-text-wrapper" title={item.description}>
                      {item.displayDescription || `- ${item.description}`}
                    </div>
                  </td>
                  <td className="col-date">{item.dateStr || getOrdinalDateString(item.createdAt)}</td>
                  <td className="col-time">{item.timeStr || getTimeString(item.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        {feedbacks.length > 0 && (
          <div className="table-footer-actions">
            <button onClick={clearAllFeedbacks} className="clear-history-btn">
              Clear All Entries
            </button>
          </div>
        )}
      </div>

      {/* ── MOBILE: Card List (hidden on desktop) ── */}
      <div className="mobile-card-list">
        {feedbacks.length === 0 ? (
          <div className="mobile-empty-state">
            <p className="mobile-empty-title">No feedbacks yet</p>
            <button onClick={onOpenFeedbackForm} className="give-fb-empty-btn">
              Give Feedback
            </button>
          </div>
        ) : (
          feedbacks.map((item) => (
            <div key={item.id} className="mobile-fb-card">
              {/* Top row: Title + Stars */}
              <div className="mobile-card-top">
                <span className="mobile-card-title">Feedback Title</span>
                <div className="mobile-card-stars">
                  {renderStars(item.rating)}
                </div>
              </div>
              {/* Description */}
              <p className="mobile-card-desc">
                {item.description
                  ? item.description.length > 40
                    ? item.description.slice(0, 38) + '....'
                    : item.description
                  : 'Had issues understanding boxy contro....'}
              </p>
              {/* Date · Time */}
              <p className="mobile-card-datetime">
                <span className="mobile-card-date">{item.dateStr || getOrdinalDateString(item.createdAt)}</span>
                <span className="mobile-card-dot"> · </span>
                <span className="mobile-card-time">{item.timeStr || getTimeString(item.createdAt)}</span>
              </p>
            </div>
          ))
        )}
        {feedbacks.length > 0 && (
          <button onClick={clearAllFeedbacks} className="mobile-clear-btn">
            Clear All
          </button>
        )}
      </div>

      <style>{`
        .feedback-history-container {
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
          padding-top: 12px;
        }
        
        .history-subtitle-row {
          text-align: left;
          margin-bottom: 28px;
          padding-left: 4px;
        }
        
        .history-sub-text {
          font-size: 13.5px;
          color: #8E8E8E; /* Neutral light gray matching Hintro specs exactly */
          font-weight: 500;
        }

        /* ── DESKTOP TABLE ── */
        .desktop-table-view {
          display: block;
        }

        .mobile-card-list {
          display: none;
        }
        
        /* Structured Table Card Wrapper */
        .table-card-wrapper {
          background-color: #FFFFFF;
          border: 1.5px solid #F3F4F6;
          border-radius: 12px; /* Smooth rounded corners matching screenshot exactly */
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
          width: 100%;
        }
        
        .feedback-history-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        
        .feedback-history-table thead {
          background-color: #F8F9FC; /* Light gray-purple tint heading matching screenshot */
          border-bottom: 1.5px solid #F3F4F6;
        }
        
        .feedback-history-table th {
          font-family: var(--font-sans);
          font-size: 13px;
          color: #8E8E8E; /* Small gray headers matching screenshot */
          font-weight: 500;
          padding: 16px 24px;
        }
        
        .table-data-row {
          border-bottom: 1.5px solid #F3F4F6;
          transition: background-color 0.15s ease;
        }
        
        .table-data-row:last-child {
          border-bottom: none;
        }
        
        .table-data-row:hover {
          background-color: #FAFAFA;
        }
        
        .feedback-history-table td {
          font-size: 14.5px;
          color: #1F2937;
          padding: 18px 24px;
          vertical-align: middle;
        }
        
        .col-title {
          font-weight: 700; /* Bold Title matching screenshot */
          color: #000000 !important;
        }
        
        .col-rating {
          font-weight: 500;
          color: #1F2937;
        }
        
        .col-desc {
          color: #1F2937;
        }
        
        .desc-text-wrapper {
          max-width: 280px;
          overflow: hidden;
          text-overflow: ellipsis; /* Truncates long lines exactly like figma photo */
          white-space: nowrap;
          font-weight: 500;
        }
        
        .col-date {
          color: #1F2937;
          font-weight: 500;
        }
        
        .col-time {
          color: #1F2937;
          font-weight: 500;
        }
        
        /* Centered Empty State row cell inside Table */
        .empty-table-row-cell {
          padding: 80px 24px !important;
          text-align: center;
          background-color: #FFFFFF;
        }
        
        .empty-table-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        
        .empty-table-title {
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 700;
          color: #000000;
        }
        
        .give-fb-empty-btn {
          border: 1px solid #D1D5DB;
          color: #111827;
          background-color: #FFFFFF;
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 6px;
          box-shadow: none;
          height: auto;
          width: auto;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s;
        }
        
        .give-fb-empty-btn:hover {
          background-color: #F9FAFB;
          border-color: #9CA3AF;
        }
        
        /* Table Actions footer */
        .table-footer-actions {
          background-color: #FAFAFA;
          border-top: 1.5px solid #F3F4F6;
          padding: 12px 24px;
          display: flex;
          justify-content: flex-end;
        }
        
        .clear-history-btn {
          font-size: 12.5px;
          font-weight: 600;
          color: #EF4444;
          transition: opacity 0.2s;
        }
        
        .clear-history-btn:hover {
          opacity: 0.8;
        }

        /* ── RESPONSIVE MOBILE PORTRAIT ── */
        @media (max-width: 768px) {
          .desktop-table-view {
            display: none !important;
          }
          
          .mobile-card-list {
            display: flex !important;
            flex-direction: column;
            gap: 14px;
            padding: 0;
            margin-bottom: 24px;
          }
          
          .feedback-history-container {
            padding-top: 4px;
            padding-left: 0;
            padding-right: 0;
          }
          
          .history-subtitle-row {
            margin-bottom: 24px;
            padding-left: 2px;
          }
          
          .history-sub-text {
            font-size: 14.5px;
            color: #8E8E8E;
            font-weight: 400;
            font-family: var(--font-sans);
          }
          
          .mobile-fb-card {
            background-color: #FFFFFF;
            border: 1px solid #ECECEC;
            border-radius: 12px;
            padding: 18px 20px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.01);
            display: flex;
            flex-direction: column;
            gap: 8px;
            transition: transform var(--transition-fast), box-shadow var(--transition-fast);
          }
          
          .mobile-fb-card:active {
            transform: scale(0.995);
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.005);
          }
          
          .mobile-card-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          
          .mobile-card-title {
            font-size: 15.5px;
            font-weight: 700;
            color: #121212;
            font-family: var(--font-sans);
            letter-spacing: -0.2px;
          }
          
          .mobile-card-stars {
            display: flex;
            align-items: center;
            gap: 2px;
            line-height: 1;
          }
          
          .fb-star {
            font-size: 15px;
            display: inline-block;
          }
          
          .star-filled {
            color: #FBBF24; /* Beautiful Gold matching user mockup */
          }
          
          .star-empty {
            color: #E5E7EB; /* Light grey empty star matching mockup */
          }
          
          .mobile-card-desc {
            font-size: 12.5px;
            color: #8C8C8C;
            font-weight: 400;
            line-height: 1.4;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
          }
          
          .mobile-card-datetime {
            font-size: 11px;
            font-weight: 600;
            margin: 0;
            margin-top: 2px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          
          .mobile-card-date {
            color: #2563EB; /* Premium blue color for date exactly like attached mockup */
          }
          
          .mobile-card-dot {
            color: #2563EB;
            margin: 0 4px;
          }
          
          .mobile-card-time {
            color: #8E8E8E;
            font-weight: 500;
          }
          
          .mobile-clear-btn {
            align-self: center;
            margin-top: 8px;
            font-size: 13px;
            font-weight: 700;
            color: #EF4444;
            padding: 8px 16px;
            border-radius: 8px;
            transition: opacity 0.2s;
          }
          
          .mobile-clear-btn:hover {
            opacity: 0.8;
          }
          
          .mobile-empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 60px 20px;
            background-color: #FFFFFF;
            border: 1px solid #ECECEC;
            border-radius: 12px;
            gap: 16px;
          }
          
          .mobile-empty-title {
            font-size: 15px;
            font-weight: 700;
            color: #000000;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
