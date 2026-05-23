import React, { useState } from 'react';
import { Mail, Eye, EyeOff, ShieldCheck, User, Users } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    const lowerEmail = email.toLowerCase().trim();
    if (lowerEmail === 'john@example.com') {
      onLoginSuccess('u1');
    } else if (lowerEmail === 'om.patel@hintro.ai') {
      onLoginSuccess('u2');
    } else {
      setErrorMsg('Invalid credentials. Please use one of the sandboxed credentials below.');
    }
  };

  const handleQuickFill = (targetUser) => {
    setErrorMsg('');
    if (targetUser === 'u1') {
      setEmail('john@example.com');
      setPassword('password');
    } else {
      setEmail('om.patel@hintro.ai');
      setPassword('password');
    }
  };

  return (
    <div className="login-browser-mockup">
      <div className="mockup-header-bar">
        <span className="mockup-title">login</span>
      </div>
      <div className="mockup-content-area">
        <div className="login-card-wrapper animate-scale">
          <h2 className="login-title">Login</h2>
          
          {errorMsg && (
            <div className="login-error-alert animate-fade">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form-element">
            {/* Email Block */}
            <div className="login-input-group">
              <label className="input-label" htmlFor="login-email">Email</label>
              <div className="input-field-container">
                <Mail size={16} className="input-left-icon" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="Example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input-box"
                  required
                />
              </div>
            </div>

            {/* Password Block */}
            <div className="login-input-group">
              <label className="input-label" htmlFor="login-password">Password</label>
              <div className="input-field-container">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input-box password-box"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <Eye size={16} className="input-right-icon" />
                  ) : (
                    <EyeOff size={16} className="input-right-icon" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <button type="submit" className="login-submit-btn">
              Login
            </button>
          </form>
        </div>

        {/* Sandbox Registered Users Help Panel (at lower portion of the page) */}
        <div className="sandbox-credentials-panel animate-slide">
          <div className="credentials-header">
            <ShieldCheck size={16} className="shield-icon" />
            <span><strong>Registered Users</strong> (Click to autofill)</span>
          </div>
          
          <div className="credentials-grid">
            {/* Persona 1: u1 */}
            <button 
              type="button"
              onClick={() => handleQuickFill('u1')}
              className="cred-card u1-cred-card"
            >
              <div className="cred-icon-circle u1-tint">
                <User size={16} />
              </div>
              <div className="cred-info">
                <span className="cred-username">John Doe (Empty State)</span>
                <span className="cred-label">Email: <code>john@example.com</code></span>
                <span className="cred-label">Password: <code>password</code></span>
              </div>
            </button>

            {/* Persona 2: u2 */}
            <button 
              type="button"
              onClick={() => handleQuickFill('u2')}
              className="cred-card u2-cred-card"
            >
              <div className="cred-icon-circle u2-tint">
                <Users size={16} />
              </div>
              <div className="cred-info">
                <span className="cred-username">Om Patel (Active State)</span>
                <span className="cred-label">Email: <code>om.patel@hintro.ai</code></span>
                <span className="cred-label">Password: <code>password</code></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .login-browser-mockup {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #1C1C1C; /* Dark header bar and frames matching screenshot bezel */
          width: 100%;
          overflow: hidden;
        }
        
        .mockup-header-bar {
          background-color: #1C1C1C;
          height: 48px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          border-bottom: 1px solid #141414;
          user-select: none;
        }
        
        .mockup-title {
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          color: #7A7A7A; /* Muted gray text matching screenshot */
          letter-spacing: 0.2px;
        }
        
        .mockup-content-area {
          flex-grow: 1;
          background-color: #FFFFFF; /* Pure white content canvas */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 24px;
          position: relative;
          width: 100%;
        }
        
        .login-card-wrapper {
          width: 100%;
          max-width: 380px; /* Aligns precisely with figma input box width */
          display: flex;
          flex-direction: column;
          margin-top: auto;
          margin-bottom: auto;
        }
        
        .login-title {
          font-family: var(--font-heading);
          font-size: 28px;
          font-weight: 700;
          color: #000000;
          text-align: center;
          margin-bottom: 32px;
          letter-spacing: -0.5px;
        }
        
        .login-error-alert {
          background-color: #FEF2F2;
          border: 1px solid #FCA5A5;
          color: #DC2626;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          margin-bottom: 20px;
          font-weight: 500;
          text-align: center;
        }
        
        .login-form-element {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 20px;
        }
        
        .login-input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }
        
        .input-label {
          font-size: 13.5px;
          font-weight: 500;
          color: #1F2937;
          text-align: left;
        }
        
        .input-field-container {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }
        
        .login-input-box {
          width: 100%;
          background-color: #F8FAFC; /* Off-white background */
          border: 1.5px solid #F1F5F9; /* Very soft light border matching screenshot */
          border-radius: 10px;
          padding: 14px 16px 14px 44px; /* Extra left padding to make room for icon */
          font-size: 14.5px;
          outline: none;
          transition: all 0.2s ease;
          font-family: inherit;
          color: #0F172A;
        }
        
        .login-input-box::placeholder {
          color: #94A3B8; /* Muted placeholder color */
        }
        
        .login-input-box:focus {
          border-color: #CBD5E1;
          background-color: #FFFFFF;
          box-shadow: 0 0 0 1px #CBD5E1;
        }
        
        .password-box {
          padding-left: 16px !important; /* Normal padding for password input */
          padding-right: 44px !important; /* Extra right padding for toggle button */
        }
        
        .input-left-icon {
          position: absolute;
          left: 16px;
          color: #94A3B8;
          pointer-events: none;
          display: flex;
          align-items: center;
        }
        
        .password-toggle-btn {
          position: absolute;
          right: 6px;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94A3B8;
          transition: color 0.15s ease;
        }
        
        .password-toggle-btn:hover {
          color: #64748B;
        }
        
        .login-submit-btn {
          width: 100%;
          background-color: #000000; /* Solid black button */
          color: #FFFFFF;
          font-weight: 600;
          font-size: 14.5px;
          padding: 14px;
          border-radius: 10px;
          text-align: center;
          margin-top: 12px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        .login-submit-btn:hover {
          background-color: #1E293B;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }
        
        .login-submit-btn:active {
          transform: translateY(0);
        }
        
        /* Lower sandboxed credentials helper panel */
        .sandbox-credentials-panel {
          width: 100%;
          max-width: 680px;
          margin-top: auto; /* Push to the lower portion of the page */
          padding-top: 40px;
          border-top: 1px solid #F1F5F9;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        
        .credentials-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: #64748B;
        }
        
        .shield-icon {
          color: #5A6BE1;
        }
        
        .credentials-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          width: 100%;
        }
        
        @media (max-width: 640px) {
          .credentials-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .mockup-content-area {
            padding: 40px 16px;
          }
        }
        
        .cred-card {
          background-color: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
          width: 100%;
        }
        
        .cred-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(0,0,0,0.04);
          border-color: #CBD5E1;
          background-color: #FFFFFF;
        }
        
        .cred-icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .u1-tint {
          background-color: #F3E8FF;
          color: #7C3AED;
        }
        
        .u2-tint {
          background-color: #D1FAE5;
          color: #065F46;
        }
        
        .cred-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .cred-username {
          font-size: 14px;
          font-weight: 700;
          color: #0F172A;
        }
        
        .cred-label {
          font-size: 12px;
          color: #64748B;
        }
        
        .cred-label code {
          background-color: #F1F5F9;
          padding: 1px 5px;
          border-radius: 4px;
          color: #0F172A;
          font-size: 11px;
          font-family: var(--font-mono, monospace);
        }
      `}</style>
    </div>
  );

}
