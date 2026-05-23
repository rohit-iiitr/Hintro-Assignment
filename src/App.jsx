import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import RecentCalls from './components/RecentCalls';
import HowItWorks from './components/HowItWorks';
import FeedbackModal from './components/FeedbackModal';
import FeedbackHistory from './components/FeedbackHistory';
import LogoutModal from './components/LogoutModal';
import LoginPage from './components/LoginPage';

import { 
  getProfile, 
  getDashboard, 
  getCallSessionStats, 
  getCallHistory 
} from './utils/api';

import { Sparkles, Calendar, ShieldCheck, Lock, ChevronRight, HelpCircle } from 'lucide-react';

export default function App() {
  const [activePersona, setActivePersona] = useState(null); // 'u1', 'u2' or null (selector page)
  const [activeTab, setActiveTab] = useState('dashboard');
  const [onboardingMode, setOnboardingMode] = useState(false); // u1 only toggle

  // API Data states
  const [profile, setProfile] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [stats, setStats] = useState(null);
  const [calls, setCalls] = useState([]);
  
  // App UI states
  const [loading, setLoading] = useState(false);
  const [serverOnline, setServerOnline] = useState(true);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  // Client-Side Mock Data Fallbacks (if Node Server is not started yet)
  const getClientFallbackData = (userId) => {
    if (userId === 'u1') {
      return {
        profile: {
          id: "u1", email: "john@example.com", firstName: "John", lastName: "Doe",
          login_method: "google", status: "active", is_hintro_admin: false,
          createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-06-20T14:30:00Z"
        },
        dashboard: {
          subscription: null,
          usage: { kb_files: { used: 0, limit: 100, percentage: 0 }, vocab_terms: 0, notes: 0 }
        },
        stats: { totalSessions: 0, averageDuration: 0, totalAIInteractions: 0, lastSession: [] },
        calls: []
      };
    } else {
      return {
        profile: {
          id: "u2", email: "om.patel@hintro.ai", firstName: "Om", lastName: "Patel",
          login_method: "google", status: "active", is_hintro_admin: true,
          createdAt: "2025-02-10T08:00:00Z", updatedAt: "2026-05-23T12:00:00Z"
        },
        dashboard: {
          subscription: { plan: "professional", billing_cycle: "monthly", status: "active" },
          usage: { kb_files: { used: 340, limit: 1000, percentage: 34 }, vocab_terms: 104, notes: 24 }
        },
        stats: {
          totalSessions: 22,
          averageDuration: 862, // 14m 22s
          totalAIInteractions: 147,
          lastSession: [new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()]
        },
        calls: [
          {
            _id: "cs1", user_id: "u2", status: "ended", client: "K", description: "Design Call",
            started_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            ended_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 862000).toISOString(),
            participants: [{ name: "Om Patel", isUser: true }, { name: "Jane Smith", isUser: false }, { name: "Client", isUser: false }],
            createdAt: new Date().toISOString()
          },
          {
            _id: "cs2", user_id: "u2", status: "ended", client: "K", description: "Design Call",
            started_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000).toISOString(),
            ended_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000 + 900000).toISOString(),
            participants: [{ name: "Om Patel", isUser: true }, { name: "Jane Smith", isUser: false }],
            createdAt: new Date().toISOString()
          },
          {
            _id: "cs3", user_id: "u2", status: "ended", client: "K", description: "Design Call",
            started_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            ended_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 1200000).toISOString(),
            participants: [{ name: "Om Patel", isUser: true }, { name: "Jane Smith", isUser: false }],
            createdAt: new Date().toISOString()
          },
          {
            _id: "cs4", user_id: "u2", status: "ended", client: "K", description: "Design Call",
            started_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
            ended_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000 + 600000).toISOString(),
            participants: [{ name: "Om Patel", isUser: true }, { name: "Jane Smith", isUser: false }],
            createdAt: new Date().toISOString()
          }
        ]
      };
    }
  };

  // Fetch Dashboard API Data
  const fetchData = async (userId) => {
    setLoading(true);
    try {
      // Direct API parallel queries
      const [profRes, dashRes, statsRes, historyRes] = await Promise.all([
        getProfile(userId),
        getDashboard(userId),
        getCallSessionStats(userId),
        getCallHistory(userId, 10)
      ]);

      setProfile(profRes);
      setDashboardData(dashRes);
      setStats(statsRes);
      setCalls(historyRes.callSessions);
      setServerOnline(true);
    } catch (err) {
      console.warn("Backend server not found on port 3001. Falling back to client-side simulation.");
      setServerOnline(false);
      
      // Fallback local mock simulation
      const fallback = getClientFallbackData(userId);
      setProfile(fallback.profile);
      setDashboardData(fallback.dashboard);
      setStats(fallback.stats);
      setCalls(fallback.calls);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activePersona) {
      fetchData(activePersona);
    }
  }, [activePersona]);

  // Swapper function to quickly jump between u1 and u2 in Header
  const handleQuickPersonaSwap = () => {
    const nextPersona = activePersona === 'u1' ? 'u2' : 'u1';
    setActivePersona(nextPersona);
    setOnboardingMode(false);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setActivePersona(null);
    setLogoutOpen(false);
  };

  // Handles clicking a locked menu item
  const handleLockedClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Switch feedbacks tab update
  const triggerFeedbackTab = () => {
    setActiveTab('feedback-history');
    // Dispatch custom event to notify FeedbackHistory component to load items
    window.dispatchEvent(new Event('feedbackSubmitted'));
  };

  if (!activePersona) {
    return <LoginPage onLoginSuccess={(id) => {
      setActivePersona(id);
      setOnboardingMode(false);
      setActiveTab('dashboard');
    }} />;
  }

  return (
    <div className="hintro-app-layout">
      {/* Sidebar navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          if (tab === 'feedback') {
            setFeedbackOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        user={profile}
        usageData={dashboardData?.usage}
      />

      {/* Main dashboard board */}
      <div className="main-content-panel">
        <Header 
          title={
            activeTab === 'dashboard' ? 'Dashboard' :
            activeTab === 'insights' ? 'Call Insights' :
            activeTab === 'kb' ? 'Knowledge Base' :
            activeTab === 'prompts' ? 'Prompts' :
            activeTab === 'boxy' ? 'Boxy Controls' :
            activeTab === 'feedback-history' ? 'Feedback History' : 
            activeTab === 'upgrade' ? 'Professional Upgrade' : 'Dashboard'
          }
          user={profile}
          onLogoutClick={() => setLogoutOpen(true)}
        />

        {/* Server Status Indicators */}
        {!serverOnline && (
          <div className="server-status-banner">
            <span className="badge-warning-indicator">Offline Simulation Mode</span>
            <p>Mock server not detected on <code>localhost:3001</code>. Displaying visual fallback metrics automatically.</p>
          </div>
        )}

        <main className="dashboard-content-area">
          {loading ? (
            <div className="dashboard-loader">
              <div className="spinner"></div>
              <span>Connecting mock endpoints...</span>
            </div>
          ) : (
            <>
              {/* TABS 1: MAIN DASHBOARD VIEW */}
              {activeTab === 'dashboard' && (
                <div className="dashboard-main-tab-view animate-fade">
                  {/* Greeting Block */}
                  <div className="dashboard-hero-header">
                    <div className="hero-left">
                      <h2>Hi, {profile?.firstName || 'Name'} 👋 Welcome to Hintro</h2>
                      <p>Ready to make your next call smarter?</p>
                    </div>
                    <div className="hero-actions-row">
                      {profile?.id === 'u1' && (
                        <button 
                          onClick={() => setOnboardingMode(!onboardingMode)}
                          className="btn-outline onboarding-toggle-btn"
                        >
                          {onboardingMode ? "Show Stats Board" : "Show Onboarding Flow"}
                        </button>
                      )}
                      <button 
                        onClick={() => alert("Setting up a new AI Call Session...")} 
                        className="btn-primary start-new-call-btn"
                      >
                        Start New Call
                      </button>
                    </div>
                  </div>

                  {/* Stats metric panels */}
                  <StatsGrid stats={stats} />

                  {/* Onboarding tutorial how it works flow (Screen 4 overlay) */}
                  {onboardingMode && activePersona === 'u1' && (
                    <HowItWorks />
                  )}

                  {/* Recent Call logs list or Google calendar empty box */}
                  <RecentCalls 
                    calls={calls} 
                    user={profile}
                    onStartCallClick={() => alert("Google Calendar configuration drawer coming soon!")}
                  />
                </div>
              )}

              {/* TABS 2: FEEDBACK HISTORY LISTING */}
              {activeTab === 'feedback-history' && (
                <FeedbackHistory onOpenFeedbackForm={() => setFeedbackOpen(true)} />
              )}

              {/* TABS 3: LOCKED PLATFORM MODULES (High Fidelity placeholder boards) */}
              {['insights', 'kb', 'prompts', 'boxy', 'upgrade'].includes(activeTab) && (
                <div className="locked-feature-premium-card animate-scale">
                  <div className="lock-icon-outer">
                    <Lock size={36} />
                  </div>
                  <h3>Professional Analytics Tier</h3>
                  <span className="premium-accent-badge">Professional Plan Feature</span>
                  
                  <p className="premium-desc">
                    Get access to live transcripts, semantic knowledge bases, customized GPT call instruction guidelines, and custom framework scripts.
                  </p>

                  <div className="premium-features-row">
                    <div className="prem-feat">
                      <ShieldCheck size={18} className="feat-purple-tick" />
                      <span>Infinite semantic document uploads</span>
                    </div>
                    <div className="prem-feat">
                      <ShieldCheck size={18} className="feat-purple-tick" />
                      <span>Custom prompt context guidelines</span>
                    </div>
                    <div className="prem-feat">
                      <ShieldCheck size={18} className="feat-purple-tick" />
                      <span>Unlimited real-time duration metrics</span>
                    </div>
                  </div>

                  <div className="locked-card-actions">
                    <button onClick={handleQuickPersonaSwap} className="btn-outline">
                      {activePersona === 'u1' ? 'Switch to Active Persona (u2)' : 'Switch to Standard (u1)'}
                    </button>
                    <button onClick={() => alert("Unlocking Professional plan...")} className="btn-primary upgrade-now-btn">
                      Upgrade Now
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* FEEDBACK SLIDE-IN MODAL FORM */}
      <FeedbackModal 
        isOpen={feedbackOpen} 
        onClose={() => setFeedbackOpen(false)} 
        onSubmitSuccess={triggerFeedbackTab}
      />

      {/* LOGOUT CONFIRMATION DIALOGUE */}
      <LogoutModal 
        isOpen={logoutOpen} 
        onClose={() => setLogoutOpen(false)} 
        onConfirm={handleLogout}
      />

      <style>{`
        .hintro-app-layout {
          display: flex;
          min-height: 100vh;
          background-color: var(--color-bg-base);
          width: 100%;
        }
        
        .main-content-panel {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          min-width: 0; /* Prevents flex children from breaking width */
        }
        
        .dashboard-content-area {
          padding: 40px;
          flex-grow: 1;
          overflow-y: auto;
          max-height: calc(100vh - 80px);
        }
        
        @media (max-width: 768px) {
          .dashboard-content-area {
            padding: 24px;
          }
        }
        
        /* Hero Greeting Row */
        .dashboard-hero-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          width: 100%;
        }
        
        .hero-left h2 {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 24px;
          color: #000000;
          letter-spacing: -0.5px;
          margin-bottom: 6px;
        }
        
        .hero-left p {
          font-size: 13.5px;
          color: var(--color-text-secondary);
        }
        
        .hero-actions-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .onboarding-toggle-btn {
          height: 38px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 600;
          border-color: #E2E8F0;
          color: #4F46E5;
          background-color: #EEF2FE;
          border-radius: 8px;
        }
        
        .onboarding-toggle-btn:hover {
          background-color: #E0E7FF;
          border-color: #C7D2FE;
        }
        
        .start-new-call-btn {
          background-color: #000000;
          border-radius: 8px;
          font-size: 13.5px;
          padding: 10px 18px;
          height: 38px;
        }
        
        /* Server Banner */
        .server-status-banner {
          background-color: #FEF3C7;
          border-bottom: 1px solid #FDE68A;
          padding: 8px 40px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
        }
        
        .badge-warning-indicator {
          background-color: #F59E0B;
          color: #FFFFFF;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }
        
        .server-status-banner p {
          color: #92400E;
          margin: 0;
        }
        
        /* Loader */
        .dashboard-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 0;
          gap: 16px;
          color: var(--color-text-secondary);
        }
        
        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--color-border-dark);
          border-top-color: var(--color-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Locked Feature Styles */
        .locked-feature-premium-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-border-dark);
          border-radius: 24px;
          padding: 56px 32px;
          max-width: 600px;
          margin: 40px auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: var(--shadow-md);
        }
        
        .lock-icon-outer {
          width: 72px;
          height: 72px;
          border-radius: 18px;
          background-color: var(--color-accent-purple-light);
          color: var(--color-accent-purple);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          box-shadow: 0 8px 20px rgba(124, 58, 237, 0.15);
        }
        
        .locked-feature-premium-card h3 {
          font-family: var(--font-heading);
          font-size: 22px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 8px;
        }
        
        .premium-accent-badge {
          background-color: #F5F3FF;
          color: #7C3AED;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 9999px;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .premium-desc {
          font-size: 13.5px;
          color: var(--color-text-secondary);
          line-height: 1.5;
          max-width: 440px;
          margin-bottom: 32px;
        }
        
        .premium-features-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          max-width: 380px;
          margin-bottom: 36px;
          background-color: var(--color-bg-base);
          padding: 16px;
          border-radius: 12px;
        }
        
        .prem-feat {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: var(--color-text-primary);
          font-weight: 500;
          text-align: left;
        }
        
        .feat-purple-tick {
          color: var(--color-accent-purple);
          flex-shrink: 0;
        }
        
        .locked-card-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          justify-content: center;
        }
        
        .locked-card-actions button {
          height: 44px;
          font-size: 13.5px;
          font-weight: 600;
        }
        
        .upgrade-now-btn {
          background-color: #000000;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
