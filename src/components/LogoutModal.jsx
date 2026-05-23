import React from 'react';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay animate-fade" onClick={onClose}>
      <div 
        className="logout-modal-card animate-scale" 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card
      >
        <div className="logout-header">
          <h3>Leaving already?</h3>
        </div>
        
        <p className="logout-message">
          You can log back in anytime to continue your meetings with Hintro.
        </p>

        <div className="logout-actions">
          <button onClick={onClose} className="btn-outline cancel-btn">
            Cancel
          </button>
          
          <button onClick={onConfirm} className="btn-primary logout-confirm-btn">
            Log out
          </button>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.35); /* Soft dark overlay */
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 24px;
        }
        
        .logout-modal-card {
          background-color: #FFFFFF;
          border-radius: 12px; /* Smooth professional border radius */
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          max-width: 500px;
          width: 100%;
          padding: 36px;
          text-align: left;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .logout-header {
          border-bottom: 1.5px solid #F3F4F6; /* Thin divider line matching photo exactly */
          padding-bottom: 16px;
          margin-bottom: 24px;
          width: 100%;
        }
        
        .logout-modal-card h3 {
          font-family: var(--font-sans);
          font-size: 24px;
          font-weight: 700;
          color: #000000;
          letter-spacing: -0.5px;
        }
        
        .logout-message {
          font-size: 14.5px;
          color: #1F2937; /* Clean charcoal text matching photo */
          line-height: 1.5;
          margin-bottom: 36px;
          font-weight: 500;
        }
        
        .logout-actions {
          display: flex;
          align-items: center;
          justify-content: space-between; /* Cancel on left, Log out on right */
          width: 100%;
        }
        
        .cancel-btn {
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
        }
        
        .cancel-btn:hover {
          background-color: #F9FAFB;
          border-color: #9CA3AF;
        }
        
        .logout-confirm-btn {
          background-color: #000000;
          color: #FFFFFF;
          padding: 10px 36px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          box-shadow: none;
          height: auto;
          width: auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        
        .logout-confirm-btn:hover {
          background-color: #1A1A1A;
          transform: none;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
}
