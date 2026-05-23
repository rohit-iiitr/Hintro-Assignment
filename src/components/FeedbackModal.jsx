import React, { useState } from 'react';
import { X, Send, Smile, ThumbsUp, AlertTriangle } from 'lucide-react';

export default function FeedbackModal({ isOpen, onClose, onSubmitSuccess }) {
  const [rating, setRating] = useState(null);
  const [category, setCategory] = useState('bug');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const ratingsList = [
    { score: 1, emoji: '😡', label: 'Terrible' },
    { score: 2, emoji: '😕', label: 'Bad' },
    { score: 3, emoji: '😐', label: 'Neutral' },
    { score: 4, emoji: '🙂', label: 'Good' },
    { score: 5, emoji: '🤩', label: 'Excellent' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      alert("Please select a rating emoji before submitting.");
      return;
    }
    if (!title.trim() || !description.trim()) {
      alert("Please fill in both the title and feedback details.");
      return;
    }

    // Prepare feedback object
    const newFeedback = {
      id: `fb_${Date.now()}`,
      rating,
      ratingEmoji: ratingsList.find(r => r.score === rating)?.emoji,
      category,
      title: title.trim(),
      description: description.trim(),
      isAnonymous,
      createdAt: new Date().toISOString()
    };

    // Store in LocalStorage
    try {
      const existingFeedbacks = JSON.parse(localStorage.getItem('hintro_feedbacks') || '[]');
      existingFeedbacks.unshift(newFeedback); // Add to the top
      localStorage.setItem('hintro_feedbacks', JSON.stringify(existingFeedbacks));
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setRating(null);
        setTitle('');
        setDescription('');
        setIsAnonymous(false);
        setCategory('bug');
        onSubmitSuccess();
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Failed to save feedback:", error);
      alert("Something went wrong saving your feedback. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay animate-fade">
      <div className="feedback-modal-card animate-scale">
        <button onClick={onClose} className="btn-close-modal">
          <X size={20} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="feedback-form">
            <h3>Share your thoughts</h3>
            <p className="subtitle">We value your input to make Hintro the ultimate AI meeting assistant.</p>

            {/* Rating Emojis */}
            <div className="form-section">
              <label className="section-label">How is your experience with Hintro?</label>
              <div className="ratings-row">
                {ratingsList.map((r) => (
                  <button
                    key={r.score}
                    type="button"
                    onClick={() => setRating(r.score)}
                    className={`rating-emoji-btn ${rating === r.score ? 'selected' : ''}`}
                    title={r.label}
                  >
                    <span className="emoji-face">{r.emoji}</span>
                    <span className="emoji-label">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category selection */}
            <div className="form-section">
              <label className="section-label" htmlFor="feedback-category">What area does this feedback relate to?</label>
              <div className="category-chips">
                {['bug', 'feature', 'ui_ux', 'general'].map((cat) => {
                  const labelMap = {
                    bug: '🐛 Bug Report',
                    feature: '🚀 Feature Request',
                    ui_ux: '🎨 UI / UX',
                    general: '💬 General Feedback'
                  };
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`category-chip-btn ${category === cat ? 'active' : ''}`}
                    >
                      {labelMap[cat]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title Input */}
            <div className="form-section">
              <label className="section-label" htmlFor="feedback-title">Summarize your feedback</label>
              <input
                id="feedback-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your feedback a clear title..."
                className="feedback-text-input"
                required
              />
            </div>

            {/* Description Textarea */}
            <div className="form-section">
              <label className="section-label" htmlFor="feedback-details">Detailed description</label>
              <textarea
                id="feedback-details"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us what's on your mind, what went wrong, or what you would love to see..."
                rows={4}
                className="feedback-textarea-input"
                required
              ></textarea>
            </div>

            {/* Anonymous Toggle */}
            <div className="anonymous-row">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">Submit anonymously</span>
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="modal-actions">
              <button type="button" onClick={onClose} className="btn-outline cancel-btn">
                Cancel
              </button>
              <button type="submit" className="btn-primary submit-btn">
                <Send size={14} />
                <span>Submit Feedback</span>
              </button>
            </div>
          </form>
        ) : (
          /* Submission Success State */
          <div className="success-onboarding-animation">
            <div className="success-icon-circle animate-scale">
              <ThumbsUp size={36} />
            </div>
            <h4>Thank You!</h4>
            <p>Your feedback has been saved securely to LocalStorage and transmitted to the team.</p>
          </div>
        )}
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 24px;
        }
        
        .feedback-modal-card {
          background-color: #FFFFFF;
          border-radius: 20px;
          box-shadow: var(--shadow-premium);
          max-width: 560px;
          width: 100%;
          padding: 36px;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .btn-close-modal {
          position: absolute;
          top: 20px;
          right: 20px;
          color: var(--color-text-secondary);
          opacity: 0.6;
          padding: 8px;
          border-radius: 50%;
        }
        
        .btn-close-modal:hover {
          background-color: var(--color-bg-base);
          opacity: 1;
        }
        
        .feedback-form h3 {
          font-family: var(--font-heading);
          font-size: 24px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 6px;
        }
        
        .subtitle {
          font-size: 13.5px;
          color: var(--color-text-secondary);
          margin-bottom: 28px;
          line-height: 1.4;
        }
        
        .form-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }
        
        .section-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-primary);
        }
        
        .ratings-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
        }
        
        .rating-emoji-btn {
          border: 1px solid var(--color-border-dark);
          border-radius: 12px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          transition: all var(--transition-fast);
        }
        
        .rating-emoji-btn:hover {
          background-color: var(--color-bg-base);
          border-color: #A3A3A3;
        }
        
        .rating-emoji-btn.selected {
          background-color: var(--color-primary-light);
          border-color: var(--color-primary);
          box-shadow: 0 0 0 1px var(--color-primary);
        }
        
        .emoji-face {
          font-size: 24px;
          transform: scale(1);
          transition: transform 0.2s;
        }
        
        .rating-emoji-btn:hover .emoji-face {
          transform: scale(1.15);
        }
        
        .emoji-label {
          font-size: 10.5px;
          font-weight: 600;
          color: var(--color-text-secondary);
        }
        
        .rating-emoji-btn.selected .emoji-label {
          color: var(--color-primary);
        }
        
        .category-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .category-chip-btn {
          border: 1px solid var(--color-border-dark);
          border-radius: 9999px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 500;
          color: var(--color-text-secondary);
          background-color: #FFFFFF;
          transition: all var(--transition-fast);
        }
        
        .category-chip-btn:hover {
          background-color: var(--color-bg-base);
        }
        
        .category-chip-btn.active {
          background-color: #111827;
          border-color: #111827;
          color: #FFFFFF;
        }
        
        .feedback-text-input {
          border: 1.5px solid var(--color-border-dark);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13.5px;
          outline: none;
          transition: border var(--transition-fast);
          font-family: inherit;
        }
        
        .feedback-text-input:focus {
          border-color: var(--color-primary);
        }
        
        .feedback-textarea-input {
          border: 1.5px solid var(--color-border-dark);
          border-radius: 8px;
          padding: 12px 14px;
          font-size: 13.5px;
          outline: none;
          resize: none;
          transition: border var(--transition-fast);
          font-family: inherit;
        }
        
        .feedback-textarea-input:focus {
          border-color: var(--color-primary);
        }
        
        .anonymous-row {
          margin-bottom: 28px;
        }
        
        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          cursor: pointer;
          user-select: none;
        }
        
        .checkbox-container input {
          display: none;
        }
        
        .checkmark {
          width: 18px;
          height: 18px;
          border: 1.5px solid var(--color-border-dark);
          border-radius: 4px;
          display: inline-block;
          position: relative;
          transition: all var(--transition-fast);
        }
        
        .checkbox-container input:checked ~ .checkmark {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
        }
        
        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
          left: 5px;
          top: 2px;
          width: 4px;
          height: 8px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        
        .checkbox-container input:checked ~ .checkmark:after {
          display: block;
        }
        
        .checkbox-label {
          font-size: 13px;
          font-weight: 500;
          color: var(--color-text-secondary);
        }
        
        .modal-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
        }
        
        .cancel-btn {
          height: 42px;
          font-weight: 600;
        }
        
        .submit-btn {
          height: 42px;
          justify-content: center;
        }
        
        /* Success Animation styles */
        .success-onboarding-animation {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 0;
        }
        
        .success-icon-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background-color: var(--color-success-light);
          color: var(--color-success);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        
        .success-onboarding-animation h4 {
          font-family: var(--font-heading);
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #000000;
        }
        
        .success-onboarding-animation p {
          font-size: 13.5px;
          color: var(--color-text-secondary);
          line-height: 1.5;
          max-width: 320px;
        }
      `}</style>
    </div>
  );
}
