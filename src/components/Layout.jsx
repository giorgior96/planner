import React, { useState, useEffect } from 'react';
import { Calendar, LayoutDashboard, Anchor } from 'lucide-react';
import { DAY_THEMES, getCurrentDayName } from '../data';

const Layout = ({ currentView, setCurrentView, children }) => {
    const [currentDayStr, setCurrentDayStr] = useState('Lunedì');

    useEffect(() => {
        setCurrentDayStr(getCurrentDayName());
    }, []);

    const isToday = currentView === 'today';
    const dayColor = DAY_THEMES[currentDayStr] || 'var(--color-primary)';

    // Derived styles for smooth transitions and legibility
    const headerBg = isToday ? dayColor : 'rgba(255, 255, 255, 0.8)';
    const textColor = isToday ? '#FFFFFF' : 'var(--color-primary)';
    const iconBg = isToday ? 'rgba(255, 255, 255, 0.2)' : 'var(--color-primary)';
    const iconColor = isToday ? '#FFFFFF' : '#FFFFFF';
    const borderBottom = isToday ? 'none' : '1px solid rgba(0,0,0,0.05)';

    return (
        <div className="layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
            <header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 2rem',
                    backgroundColor: headerBg,
                    backdropFilter: isToday ? 'none' : 'blur(16px)',
                    borderBottom: borderBottom,
                    transition: 'background-color 0.5s ease, border 0.5s ease'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                        style={{
                            backgroundColor: iconBg,
                            color: iconColor,
                            padding: '0.4rem',
                            borderRadius: 'var(--radius-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background-color 0.5s ease'
                        }}
                    >
                        <Anchor size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.4rem', margin: 0, color: textColor, fontWeight: 800, letterSpacing: '-0.5px', transition: 'color 0.5s ease' }}>Planner</h1>
                    </div>
                </div>

                <nav style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        className={`btn`}
                        style={{
                            backgroundColor: currentView === 'today' ? (isToday ? 'rgba(255,255,255,0.2)' : 'var(--color-primary)') : 'transparent',
                            color: currentView === 'today' ? '#FFFFFF' : (isToday ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)'),
                            border: 'none',
                            transition: 'all 0.3s ease'
                        }}
                        onClick={() => setCurrentView('today')}
                    >
                        <LayoutDashboard size={18} />
                        Focus Oggi
                    </button>
                    <button
                        className={`btn`}
                        style={{
                            backgroundColor: currentView === 'weekly' ? 'var(--color-primary)' : 'transparent',
                            color: currentView === 'weekly' ? '#FFFFFF' : (isToday ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)'),
                            border: 'none',
                            transition: 'all 0.3s ease'
                        }}
                        onClick={() => setCurrentView('weekly')}
                    >
                        <Calendar size={18} />
                        Planner Settimanale
                    </button>
                </nav>
            </header>

            <main style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
