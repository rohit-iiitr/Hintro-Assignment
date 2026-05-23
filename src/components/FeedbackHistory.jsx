import React, { useState, useEffect } from 'react';
import { Trash2, MessageSquarePlus, Clock, ShieldAlert, Sparkles } from 'lucide-react';
import { formatLastSession } from '../utils/formatters';

export default function FeedbackHistory({ onOpenFeedbackForm }) {
  const [feedbacks, setFeedbacks] = useState([]);

  // Load feedbacks on mount
  const loadFeedbacks = () => {
    try {
      const data = JSON.parse(localStorage.getItem('hintro_feedbacks') || '[]');
      setFeedbacks(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadFeedbacks();
    
    // Add window listener to reload when feedbacks are submitted in modal
    window.addEventListener('feedbackSubmitted', loadFeedbacks);
    return () => window.removeEventListener('feedbackSubmitted', loadFeedbacks);
  }, []);

  const deleteSingleFeedback = (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback log?")) return;
    const updated = feedbacks.filter(f => f.id !== id);
    localStorage.setItem('hintro_feedbacks', JSON.stringify(updated));
    setFeedbacks(updated);
  };

  const clearAllFeedbacks = () => {
    if (!window.confirm("Are you sure you want to permanently clear all feedback history?")) return;
    localStorage.removeItem('hintro_feedbacks');
    setFeedbacks([]);
  };

  const getCategoryBadgeClass = (cat) => {
    switch (cat) {
      case 'bug': return 'cat-bug';
      case 'feature': return 'cat-feature';
      case 'ui_ux': return 'cat-ui';
      default: return 'cat-general';
    }
  };

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'bug': return 'Bug Report';
      case 'feature': return 'Feature Request';
      case 'ui_ux': return 'UI / UX';
      default: return 'General Feedback';
    }
  };

  return (
    <div className="feedback-history-container animate-fade">
      <div className="history-header-row">
        <div className="history-title-block">
          <h3>Feedback History Logs</h3>
          <p>These entries are stored locally inside the browser's <code>localStorage</code> database.</p>
        </div>
        
        {feedbacks.length > 0 && (
          <button onClick={clearAllFeedbacks} className="btn-outline clear-all-btn">
            <Trash2 size={14} />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {feedbacks.length === 0 ? (
        /* Empty feedback state */
        <div className="empty-history-card">
          <div className="empty-icon-bubble">
            <MessageSquarePlus size={26} className="bubble-icon-purple" />
          </div>
          <h4>No Feedback Submitted Yet</h4>
          <p className="empty-desc">
            Your submitted feedback logs will be tracked and displayed here.<br />
            Take a moment to share your feature suggestions or report UI glitches.
          </p>
          <button onClick={onOpenFeedbackForm} className="btn-primary write-fb-btn">
            <MessageSquarePlus size={16} />
            <span>Give Feedback</span>
          </button>
        </div>
      ) : (
        /* List of feedback logs */
        <div className="feedback-logs-list">
          {feedbacks.map((item) => (
            <div key={item.id} className="feedback-log-card animate-slide">
              <div className="log-card-left">
                <span className="log-emoji">{item.ratingEmoji || '😐'}</span>
                
                <div className="log-details-block">
                  <div className="log-meta-row">
                    <span className={`category-pill ${getCategoryBadgeClass(item.category)}`}>
                      {getCategoryLabel(item.category)}
                    </span>
                    
                    <span className="log-timestamp">
                      <Clock size={12} />
                      <span>{formatLastSession(item.createdAt)}</span>
                    </span>

                    {item.isAnonymous && (
                      <span className="anon-tag">Anonymous</span>
                    )}
                  </div>
                  
                  <h4 className="log-title">{item.title}</h4>
                  <p className="log-desc">{item.description}</p>
                </div>
              </div>

              <div className="log-card-right">
                <button 
                  onClick={() => deleteSingleFeedback(item.id)}
                  className="delete-log-btn"
                  title="Delete feedback entry"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .feedback-history-container {
          max-width: 840px;
          margin: 0 auto;
          width: 100%;
        }
        
        .history-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          border-bottom: 1.5px solid var(--color-border);
          padding-bottom: 20px;
        }
        
        .history-title-block h3 {
          font-family: var(--font-heading);
          font-size: 20px;
          font-weight: 700;
          color: #000000;
        }
        
        .history-title-block p {
          font-size: 13px;
          color: var(--color-text-secondary);
          margin-top: 4px;
        }
        
        .clear-all-btn {
          color: var(--color-danger);
          border-color: var(--color-danger-light);
          padding: 8px 14px;
          font-size: 12.5px;
          font-weight: 600;
          gap: 6px;
        }
        
        .clear-all-btn:hover {
          background-color: var(--color-danger-light);
          border-color: var(--color-danger);
        }
        
        /* Empty State */
        .empty-history-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-border-dark);
          border-radius: 20px;
          padding: 64px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: var(--shadow-sm);
        }
        
        .empty-icon-bubble {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background-color: var(--color-accent-purple-light);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        
        .bubble-icon-purple {
          color: var(--color-accent-purple);
        }
        
        .empty-history-card h4 {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 8px;
        }
        
        .empty-history-card p {
          font-size: 13px;
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin-bottom: 24px;
        }
        
        .write-fb-btn {
          background-color: #000000;
          border-radius: 8px;
          font-size: 13px;
          padding: 10px 20px;
        }
        
        /* Log Cards list */
        .feedback-logs-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .feedback-log-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-border-dark);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          box-shadow: var(--shadow-sm);
        }
        
        .log-card-left {
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }
        
        .log-emoji {
          font-size: 28px;
          line-height: 1;
        }
        
        .log-details-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .log-meta-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        
        .category-pill {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 9999px;
        }
        
        .cat-bug {
          background-color: #FEF2F2;
          color: #EF4444;
        }
        
        .cat-feature {
          background-color: #ECFDF5;
          color: #10B981;
        }
        
        .cat-ui {
          background-color: #EFF6FF;
          color: #3B82F6;
        }
        
        .cat-general {
          background-color: #F3F4F6;
          color: #4B5563;
        }
        
        .log-timestamp {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11.5px;
          color: var(--color-text-secondary);
        }
        
        .anon-tag {
          font-size: 10.5px;
          background-color: #FFFBEB;
          color: #D97706;
          border: 1px solid #FDE68A;
          padding: 1px 6px;
          border-radius: 4px;
          font-weight: 600;
        }
        
        .log-title {
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 700;
          color: #000000;
          margin-top: 4px;
        }
        
        .log-desc {
          font-size: 13px;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }
        
        .delete-log-btn {
          color: var(--color-text-secondary);
          opacity: 0.5;
          padding: 8px;
          border-radius: 8px;
        }
        
        .delete-log-btn:hover {
          background-color: var(--color-danger-light);
          color: var(--color-danger);
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
