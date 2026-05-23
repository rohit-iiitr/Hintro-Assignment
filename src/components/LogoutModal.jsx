import React from 'react';
import { X, LogOut } from 'lucide-react';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay animate-fade" onClick={onClose}>
      <div 
        className="logout-modal-card animate-scale" 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card
      >
        <h3>Leaving already?</h3>
        
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
        .logout-modal-card {
          background-color: #FFFFFF;
          border-radius: 20px;
          box-shadow: var(--shadow-premium);
          max-width: 440px;
          width: 100%;
          padding: 32px;
          text-align: left;
        }
        
        .logout-modal-card h3 {
          font-family: var(--font-heading);
          font-size: 22px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 12px;
          letter-spacing: -0.3px;
        }
        
        .logout-message {
          font-size: 13.5px;
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin-bottom: 28px;
        }
        
        .logout-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
        }
        
        .logout-actions button {
          flex: 1;
          height: 44px;
          justify-content: center;
          font-size: 13.5px;
          font-weight: 600;
          border-radius: 10px;
        }
        
        .cancel-btn {
          border-color: var(--color-border-dark);
          color: #000000;
          background-color: #FFFFFF;
        }
        
        .cancel-btn:hover {
          background-color: var(--color-bg-base);
          border-color: #A3A3A3;
        }
        
        .logout-confirm-btn {
          background-color: #000000;
          color: #FFFFFF;
        }
        
        .logout-confirm-btn:hover {
          background-color: #1F2937;
        }
      `}</style>
    </div>
  );
}
