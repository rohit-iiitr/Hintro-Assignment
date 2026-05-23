import React from 'react';
import { PieChart, Clock, Sparkles, Calendar } from 'lucide-react';
import { formatDuration, formatLastSession } from '../utils/formatters';

export default function StatsGrid({ stats }) {
  // Format data values according to design rules
  const totalSessions = stats?.totalSessions ?? 0;
  
  const averageDuration = totalSessions > 0 
    ? formatDuration(stats?.averageDuration) 
    : '0';

  const aiUsed = totalSessions > 0 
    ? `${stats?.totalAIInteractions ?? 0} times` 
    : '0';

  const lastSessionDate = stats?.lastSession && stats.lastSession.length > 0 
    ? stats.lastSession[0] 
    : null;
  const lastSession = totalSessions > 0 
    ? formatLastSession(lastSessionDate) 
    : '-';

  const cards = [
    {
      id: 'sessions',
      label: 'Total Sessions',
      value: totalSessions,
      icon: PieChart,
      iconClass: 'icon-sessions',
      bgClass: 'bg-sessions',
    },
    {
      id: 'duration',
      label: 'Average Duration',
      value: averageDuration,
      icon: Clock,
      iconClass: 'icon-duration',
      bgClass: 'bg-duration',
    },
    {
      id: 'ai',
      label: 'AI Used',
      value: aiUsed,
      icon: Sparkles,
      iconClass: 'icon-ai',
      bgClass: 'bg-ai',
    },
    {
      id: 'last-session',
      label: 'Last Session',
      value: lastSession,
      icon: Calendar,
      iconClass: 'icon-last',
      bgClass: 'bg-last',
    },
  ];

  return (
    <div className="stats-grid-container animate-slide">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.id} className="stat-card">
            <div className={`icon-wrapper ${card.bgClass}`}>
              <Icon size={22} className={card.iconClass} />
            </div>
            <div className="stat-info">
              <span className="stat-label">{card.label}</span>
              <span className="stat-value">{card.value}</span>
            </div>
          </div>
        );
      })}

      <style>{`
        .stats-grid-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
          width: 100%;
        }
        
        @media (max-width: 1200px) {
          .stats-grid-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .stats-grid-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-bottom: 28px;
          }
          .stat-card {
            padding: 16px;
            gap: 12px;
            border-radius: 12px;
          }
          .icon-wrapper {
            width: 44px;
            height: 44px;
            border-radius: 10px;
          }
          .stat-value {
            font-size: 15px;
          }
          .stat-label {
            font-size: 11.5px;
          }
        }
        
        .stat-card {
          background-color: var(--color-bg-card);
          border: 1px solid var(--color-border-dark);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-fast);
        }
        
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: #E2E8F0;
        }
        
        .icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        /* Sessions Card Colors */
        .bg-sessions {
          background-color: #FFF0F0;
        }
        .icon-sessions {
          color: #FA5C5C;
          fill: #FFE3E3;
        }
        
        /* Duration Card Colors */
        .bg-duration {
          background-color: #E6F8F9;
        }
        .icon-duration {
          color: #1FBEC6;
        }
        
        /* AI Card Colors */
        .bg-ai {
          background-color: #EBFDF2;
        }
        .icon-ai {
          color: #34D399;
          fill: #ECFDF5;
        }
        
        /* Last Session Card Colors */
        .bg-last {
          background-color: #F3E8FF;
        }
        .icon-last {
          color: #9F7AEA;
        }
        
        .stat-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .stat-label {
          font-size: 13px;
          color: var(--color-text-secondary);
          font-weight: 500;
        }
        
        .stat-value {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-text-primary);
          font-family: var(--font-sans);
        }
      `}</style>
    </div>
  );
}
