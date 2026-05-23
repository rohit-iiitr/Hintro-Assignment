import React, { useState } from 'react';
import { X, ArrowLeft, Star, ThumbsUp } from 'lucide-react';

export default function FeedbackModal({ isOpen, onClose, onSubmitSuccess }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a star rating before submitting.");
      return;
    }

    // Map rating number to emoji representation for Feedback History compatibility
    const ratingEmojis = {
      1: '😡',
      2: '😕',
      3: '😐',
      4: '🙂',
      5: '🤩'
    };

    // Prepare feedback object
    const newFeedback = {
      id: `fb_${Date.now()}`,
      rating,
      ratingEmoji: ratingEmojis[rating],
      category: rating >= 4 ? 'feature' : 'bug', // Auto-classify for visual category tags
      title: `${rating} Star Rating`,
      description: description.trim() || 'No additional comments provided.',
      isAnonymous: false,
      createdAt: new Date().toISOString()
    };

    // Store in LocalStorage
    try {
      const existingFeedbacks = JSON.parse(localStorage.getItem('hintro_feedbacks') || '[]');
      existingFeedbacks.unshift(newFeedback); // Add to top
      localStorage.setItem('hintro_feedbacks', JSON.stringify(existingFeedbacks));
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setDescription('');
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
    <div className="modal-overlay animate-fade" onClick={onClose}>
      <div 
        className="feedback-modal-card animate-scale"
        onClick={(e) => e.stopPropagation()} // Prevent close on card click
      >
        <button onClick={onClose} className="btn-close-modal">
          <X size={20} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="feedback-header">
              <h3>Give Feedback</h3>
              <p className="subtitle">Describe your experience using Hintro...</p>
            </div>

            {/* Stars Rating Component (Centered in page) */}
            <div className="stars-wrapper">
              <div className="stars-row">
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const isHighlighted = hoverRating >= starValue || (!hoverRating && rating >= starValue);
                  return (
                    <button
                      key={starValue}
                      type="button"
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(starValue)}
                      className={`star-btn ${isHighlighted ? 'star-active' : ''}`}
                    >
                      <Star 
                        size={36} 
                        className="star-icon-svg" 
                        fill={isHighlighted ? "#F59E0B" : "none"} // Elegant warm gold star highlight
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Expandable comments section (shows up beautifully once a star is tapped!) */}
            {rating > 0 && (
              <div className="expandable-comment-section animate-slide">
                <label className="comment-label">
                  {rating <= 3 ? "What frustrated you or felt confusing?" : "What did you like the most?"}
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="feedback-textarea-input"
                ></textarea>
              </div>
            )}

            {/* Footer Buttons - Back on bottom-left, Submit on bottom-right */}
            <div className="modal-actions">
              <button type="button" onClick={onClose} className="btn-outline back-btn">
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              
              <button 
                type="submit" 
                className={`btn-primary submit-btn ${rating === 0 ? 'disabled' : ''}`}
                disabled={rating === 0}
              >
                <span>Submit</span>
              </button>
            </div>
          </form>
        ) : (
          /* Submission Success Card (Acknowledgement matching screenshot) */
          <div className="success-onboarding-animation animate-fade">
            <div className="success-icon-circle animate-scale">
              <Star size={36} fill="#F59E0B" className="success-star-icon" />
            </div>
            <h4>Thank you for your feedback!!</h4>
            <p className="success-desc">
              Our team reviews every suggestion to improve AI responses, workflows, and overall experience.
            </p>
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
          background-color: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 24px;
        }
        
        .feedback-modal-card {
          background-color: #FFFFFF;
          border-radius: 12px; /* Smooth professional border radius matching logout design */
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          max-width: 580px;
          width: 100%;
          padding: 36px;
          position: relative;
          border: 1px solid rgba(0, 0, 0, 0.05);
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
        
        .feedback-header {
          text-align: left;
          margin-bottom: 28px;
        }
        
        .feedback-header h3 {
          font-family: var(--font-sans);
          font-size: 24px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 6px;
          letter-spacing: -0.5px;
        }
        
        .subtitle {
          font-size: 14px;
          color: #6B7280; /* Neutral light gray */
          margin-bottom: 0;
        }
        
        .stars-wrapper {
          display: flex;
          justify-content: center;
          padding: 24px 0;
          margin-bottom: 24px;
          width: 100%;
        }
        
        .stars-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .star-btn {
          color: #D1D5DB; /* Gray border default */
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .star-btn:hover {
          transform: scale(1.2);
        }
        
        .star-icon-svg {
          color: #D1D5DB; /* Unselected outline color */
          transition: all 0.2s;
        }
        
        .star-active .star-icon-svg {
          color: #F59E0B; /* Warm gold selected border */
        }
        
        .expandable-comment-section {
          margin-bottom: 28px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }
        
        .comment-label {
          font-size: 13px;
          color: #374151;
          font-weight: 500;
          text-align: left;
        }
        
        .feedback-textarea-input {
          width: 100%;
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
        
        .modal-actions {
          display: flex;
          align-items: center;
          justify-content: space-between; /* Back on left, Submit on right */
          width: 100%;
          margin-top: 12px;
        }
        
        .back-btn {
          border: 1px solid #D1D5DB;
          color: #111827;
          background-color: #FFFFFF;
          padding: 10px 24px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          box-shadow: none;
          height: auto;
          width: auto;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        
        .back-btn:hover {
          background-color: #F9FAFB;
          border-color: #9CA3AF;
        }
        
        .submit-btn {
          background-color: #808080; /* Neutral gray as in the photo */
          color: #FFFFFF;
          padding: 10px 32px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          box-shadow: none;
          height: auto;
          width: auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        
        .submit-btn:not(.disabled) {
          background-color: #000000; /* Turns solid black once star is selected */
        }
        
        .submit-btn:not(.disabled):hover {
          background-color: #1A1A1A;
        }
        
        .submit-btn.disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        /* Success Animation */
        .success-onboarding-animation {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 48px 0;
        }
        
        .success-icon-circle {
          width: 84px;
          height: 84px;
          border-radius: 50%;
          background-color: #FEF3C7; /* Soft yellow circle background */
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          box-shadow: 0 4px 10px rgba(245, 158, 11, 0.08);
        }
        
        .success-star-icon {
          color: #F59E0B; /* Golden yellow star fill & border */
        }
        
        .success-onboarding-animation h4 {
          font-family: var(--font-sans);
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #000000;
          letter-spacing: -0.5px;
        }
        
        .success-desc {
          font-size: 14px;
          color: #6B7280; /* Neutral light-gray text */
          line-height: 1.5;
          max-width: 440px;
          margin: 0 auto;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
