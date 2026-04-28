import React from 'react';
import { useWindowSize } from '../hooks/useWindowSize';

const Services = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const services = [
    { id: 1, title: 'UI/UX Design', description: 'Modern and intuitive interfaces.' },
    { id: 2, title: 'Web Development', description: 'High-performance web applications.' },
  ];

  return (
    <div className="services-container" style={{ padding: isMobile ? '10px' : '0' }}>
      <header style={{ marginBottom: isMobile ? '24px' : '40px', textAlign: isMobile ? 'center' : 'left' }}>
        <h1 style={{ 
          fontSize: isMobile ? '1.8rem' : '2.5rem', 
          marginBottom: '10px', 
          color: 'var(--accent-color)', 
          fontFamily: 'Antonio, sans-serif' 
        }}>
          SERVICES
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '0.9rem' : '1rem' }}>
          List the services you offer.
        </p>
      </header>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px' 
      }}>
        {services.map(service => (
          <div key={service.id} style={{ 
            background: 'rgba(255, 255, 255, 0.03)', 
            padding: isMobile ? '20px' : '24px', 
            borderRadius: '20px', 
            border: '1px solid rgba(255, 255, 255, 0.05)',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <h3 style={{ color: 'var(--accent-color)', marginBottom: '10px', fontSize: isMobile ? '1.1rem' : '1.25rem' }}>
              {service.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '0.85rem' : '1rem', lineHeight: '1.5' }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
