import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';

export const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <motion.button
            onClick={toggleTheme}
            className="theme-toggle"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
                background: 'var(--card-bg)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border)',
                borderRadius: '50px',
                padding: '12px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                color: 'var(--text)',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                zIndex: 100,
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
            }}
        >
            <div style={{ position: 'relative', width: '20px', height: '20px' }}>
                <motion.div
                    animate={{ 
                        rotate: theme === 'dark' ? 0 : 180,
                        opacity: theme === 'dark' ? 1 : 0,
                        scale: theme === 'dark' ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                >
                    <HiOutlineMoon size={20} />
                </motion.div>
                <motion.div
                    animate={{ 
                        rotate: theme === 'light' ? 0 : -180,
                        opacity: theme === 'light' ? 1 : 0,
                        scale: theme === 'light' ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                >
                    <HiOutlineSun size={20} />
                </motion.div>
            </div>
            <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </motion.button>
    );
};
