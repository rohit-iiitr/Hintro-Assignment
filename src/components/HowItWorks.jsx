import React from 'react';
import { Upload, Sliders, FileText } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: 'STEP 1',
      title: 'Upload File',
      description: 'Add files for Hintro to review and extract critical points prior to starting meetings.',
      icon: Upload,
      buttonText: 'Upload File',
      action: () => alert('Mock File Upload clicked! Select a TXT, PDF or MP3 to analyze.')
    },
    {
      step: 'STEP 2',
      title: 'Configure',
      description: 'Setup call frameworks, custom prompt instructions, and boxy toggles for your call.',
      icon: Sliders,
      buttonText: 'Open Settings',
      action: () => alert('Mock Settings opened! Adjust custom guidelines and templates.')
    },
    {
      step: 'STEP 3',
      title: 'View Insights',
      description: 'Review notes, generated action items, transcript sections, and summaries after the call.',
      icon: FileText,
      buttonText: 'View Insights',
      action: () => alert('Mock Insights Board! See summaries, checklists and vocabularies.')
    }
  ];

  return (
    <div className="how-it-works-wrapper animate-slide">
      <h3 className="section-title">How it works</h3>
      
      <div className="steps-grid">
        {steps.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="step-card">
              <span className="step-number">{item.step}</span>
              
              <div className="step-icon-circle">
                <Icon size={20} className="step-icon" />
              </div>
              
              <h4 className="step-title">{item.title}</h4>
              <p className="step-desc">{item.description}</p>
              
              <button onClick={item.action} className="btn-outline step-btn">
                {item.buttonText}
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        .how-it-works-wrapper {
          width: 100%;
          margin-bottom: 48px;
        }
        
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 16px;
        }
        
        @media (max-width: 900px) {
          .steps-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
        
        .step-card {
          background-color: var(--color-bg-card);
          border: 1px solid var(--color-border-dark);
          border-radius: 16px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-fast);
        }
        
        .step-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: #D1D5DB;
        }
        
        .step-number {
          font-size: 11px;
          font-weight: 700;
          color: var(--color-text-muted);
          letter-spacing: 1px;
          margin-bottom: 12px;
        }
        
        .step-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background-color: var(--color-bg-base);
          border: 1px solid var(--color-border-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: var(--color-text-secondary);
        }
        
        .step-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 15px;
          color: #000000;
          margin-bottom: 8px;
        }
        
        .step-desc {
          font-size: 12.5px;
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin-bottom: 20px;
          flex-grow: 1;
        }
        
        .step-btn {
          width: 100%;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 12.5px;
          font-weight: 600;
          color: #111827;
          border-color: var(--color-border-dark);
          background-color: #FFFFFF;
          justify-content: center;
        }
        
        .step-btn:hover {
          background-color: var(--color-bg-base);
        }
      `}</style>
    </div>
  );
}
