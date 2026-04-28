import React from 'react';
import { useWindowSize } from '../hooks/useWindowSize';

const Experience = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const experiences = [
    { id: 1, role: 'Senior Developer', company: 'Tech Corp', period: '2022 - Present' },
    { id: 2, role: 'Web Developer', company: 'Startup Inc', period: '2020 - 2022' },
  ];

  return (
    <div className="experience-container" style={{ padding: isMobile ? '10px' : '0' }}>
      <header style={{ marginBottom: isMobile ? '24px' : '40px', textAlign: isMobile ? 'center' : 'left' }}>
        <h1 style={{ 
          fontSize: isMobile ? '1.8rem' : '2.5rem', 
          marginBottom: '10px', 
          color: 'var(--accent-color)', 
          fontFamily: 'Antonio, sans-serif' 
        }}>
          EXPERIENCE
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '0.9rem' : '1rem' }}>
          Manage your professional history.
        </p>
      </header>
      <div style={{ display: 'grid', gap: '20px' }}>
        {experiences.map(exp => (
          <div key={exp.id} style={{ 
            background: 'rgba(255, 255, 255, 0.03)', 
            padding: isMobile ? '20px' : '24px', 
            borderRadius: '20px', 
            border: '1px solid rgba(255, 255, 255, 0.05)',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <h3 style={{ color: 'var(--accent-color)', fontSize: isMobile ? '1.1rem' : '1.25rem' }}>{exp.role}</h3>
            <p style={{ color: 'white', marginBottom: '5px', fontSize: isMobile ? '0.95rem' : '1rem' }}>{exp.company}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{exp.period}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
