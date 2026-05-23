import React from 'react';
import { User, Users, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function UserPersonaSelector({ onSelectPersona }) {
  return (
    <div className="persona-selector-container">
      <div className="persona-card-wrapper animate-scale">
        <div className="persona-header">
          <div className="logo-badge">Hintro</div>
          <h1>Welcome to the Hintro Dashboard Sandbox</h1>
          <p>Please select a user persona to simulate the dashboard experience. The application will dynamically query the Express Mock Server based on your selection.</p>
        </div>

        <div className="persona-grid">
          {/* Persona 1: u1 */}
          <div className="persona-card u1-card" onClick={() => onSelectPersona('u1')}>
            <div className="persona-icon-container purple-tint">
              <User size={32} className="purple-icon" />
            </div>
            <h3>John Doe</h3>
            <span className="persona-badge u1-badge">User ID: u1</span>
            <p className="persona-desc">Simulates a brand new user. All dashboard stats are initialized to zero, and the call logs show the Google Calendar empty state.</p>
            
            <div className="persona-features">
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-tick" />
                <span>Zero sessions & statistics</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-tick" />
                <span>"How It Works" onboarding flow</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-tick" />
                <span>Google Calendar sync action</span>
              </div>
            </div>
            
            <button className="select-btn select-u1">
              Launch u1 Empty State
            </button>
          </div>

          {/* Persona 2: u2 */}
          <div className="persona-card u2-card" onClick={() => onSelectPersona('u2')}>
            <div className="persona-icon-container success-tint">
              <Sparkles size={32} className="success-icon" />
            </div>
            <h3>Om Patel</h3>
            <span className="persona-badge u2-badge">User ID: u2</span>
            <p className="persona-desc">Simulates an active premium user. Statistics and meeting logs are loaded dynamically and randomized on each server request.</p>

            <div className="persona-features">
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-tick" />
                <span>Randomized metrics on each refresh</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-tick" />
                <span>Formatted durations & relative times</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-tick" />
                <span>Grouped meeting logs & participant lines</span>
              </div>
            </div>

            <button className="select-btn select-u2">
              Launch u2 Active State
            </button>
          </div>
        </div>

        <div className="persona-footer">
          <div className="sandbox-notice">
            <ShieldAlert size={16} />
            <span>Ensure the backend server is running in parallel on port 3001. If offline, the application will display a clear warning block.</span>
          </div>
          <p className="credits">Hintro Frontend Assignment • Developed with ❤️ by Antigravity</p>
        </div>
      </div>

      <style>{`
        .persona-selector-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 50%, #FAF8FF 0%, #F5F3FF 50%, #ECE9FE 100%);
          padding: 24px;
        }
        .persona-card-wrapper {
          background: #FFFFFF;
          border-radius: 24px;
          padding: 48px;
          max-width: 960px;
          width: 100%;
          box-shadow: 0 20px 50px -12px rgba(91, 33, 182, 0.12);
          border: 1px solid rgba(139, 92, 246, 0.1);
        }
        .persona-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .logo-badge {
          display: inline-block;
          background: linear-gradient(135deg, #7C3AED, #5A6BE1);
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 20px;
          padding: 6px 16px;
          border-radius: 9999px;
          margin-bottom: 16px;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.2);
        }
        .persona-header h1 {
          font-family: var(--font-heading);
          font-weight: 700;
          color: #1F2937;
          font-size: 32px;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        .persona-header p {
          color: #6B7280;
          font-size: 16px;
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.5;
        }
        .persona-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          margin-bottom: 40px;
        }
        @media (max-width: 768px) {
          .persona-grid {
            grid-template-columns: 1fr;
          }
          .persona-card-wrapper {
            padding: 32px 24px;
          }
        }
        .persona-card {
          background: #FFFFFF;
          border: 1.5px solid #F3F4F6;
          border-radius: 20px;
          padding: 32px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .persona-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.08);
        }
        .u1-card:hover {
          border-color: #C084FC;
        }
        .u2-card:hover {
          border-color: #34D399;
        }
        .persona-icon-container {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .purple-tint {
          background-color: #FAF5FF;
          border: 1px solid #F3E8FF;
        }
        .purple-icon {
          color: #8B5CF6;
        }
        .success-tint {
          background-color: #ECFDF5;
          border: 1px solid #D1FAE5;
        }
        .success-icon {
          color: #10B981;
        }
        .persona-card h3 {
          font-family: var(--font-heading);
          font-size: 22px;
          color: #111827;
          margin-bottom: 8px;
        }
        .persona-badge {
          align-self: flex-start;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          margin-bottom: 16px;
        }
        .u1-badge {
          background-color: #F3E8FF;
          color: #7C3AED;
        }
        .u2-badge {
          background-color: #D1FAE5;
          color: #065F46;
        }
        .persona-desc {
          color: #6B7280;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 24px;
          flex-grow: 1;
        }
        .persona-features {
          margin-bottom: 32px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          color: #4B5563;
        }
        .feature-tick {
          color: #6366F1;
          flex-shrink: 0;
        }
        .select-btn {
          width: 100%;
          padding: 12px 20px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s;
        }
        .select-u1 {
          background-color: #F9F5FF;
          color: #7C3AED;
          border: 1px solid #E9D5FF;
        }
        .select-u1:hover {
          background-color: #7C3AED;
          color: #FFFFFF;
          border-color: #7C3AED;
        }
        .select-u2 {
          background-color: #ECFDF5;
          color: #047857;
          border: 1px solid #A7F3D0;
        }
        .select-u2:hover {
          background-color: #10B981;
          color: #FFFFFF;
          border-color: #10B981;
        }
        .persona-footer {
          margin-top: 24px;
          border-top: 1px solid #F3F4F6;
          padding-top: 24px;
          text-align: center;
        }
        .sandbox-notice {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background-color: #FFFBEB;
          border: 1px solid #FDE68A;
          color: #B45309;
          font-size: 13px;
          padding: 8px 16px;
          border-radius: 8px;
          margin-bottom: 16px;
          text-align: left;
          max-width: 680px;
        }
        .credits {
          font-size: 12px;
          color: #9CA3AF;
        }
      `}</style>
    </div>
  );
}
