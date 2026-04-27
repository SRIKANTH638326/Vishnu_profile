import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar" style={{ width: '250px', height: '100vh', background: '#467326', color: '#fff' }}>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/messages">Messages</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
