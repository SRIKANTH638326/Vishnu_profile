import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Messages from './pages/Messages';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div className="admin-container" style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
