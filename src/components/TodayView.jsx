import React, { useState, useEffect } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { Clock, Users, Target, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { DAYS_OF_WEEK, DAY_THEMES } from '../data';

const TodayView = () => {
    const { tasks } = usePlanner();
    const [currentDay, setCurrentDay] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [completedTasks, setCompletedTasks] = useState(new Set());

    useEffect(() => {
        const today = new Date();
        // getDay() returns 0 for Sunday, 1 for Monday...
        const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1; // map to 0-6 where 0 is Monday
        const dayName = DAYS_OF_WEEK[dayIndex] || 'Lunedì'; // fallback for weekends if needed

        // If it's the weekend, default to Monday or show a specific message, but let's just stick to the mapping.
        // Actually, Saturday is index 5 in DAYS_OF_WEEK, Sunday is 6.
        setCurrentDay(dayName);

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(today.toLocaleDateString('it-IT', options));

        // Load completed tasks for today from session storage to give a sense of progress that resets daily
        const saved = sessionStorage.getItem('nautica_completed_today');
        if (saved) {
            try {
                setCompletedTasks(new Set(JSON.parse(saved)));
            } catch (e) { }
        }
    }, []);

    const toggleTaskCompletion = (id) => {
        setCompletedTasks(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            sessionStorage.setItem('nautica_completed_today', JSON.stringify([...newSet]));
            return newSet;
        });
    };

    // Get tasks for the current day
    const todayTasks = tasks.filter(t => t.day === currentDay);

    const progressPercent = todayTasks.length > 0 ? Math.round((completedTasks.size / todayTasks.length) * 100) : 0;

    const bgColor = DAY_THEMES[currentDay] || 'var(--color-primary)';

    return (
        <div className="animate-fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'calc(100vh - 80px)',
            width: 'calc(100% + 2rem)',
            margin: '-1rem', // Negates the Layout padding
            padding: '3rem 2rem',
            backgroundColor: bgColor,
            color: 'white',
            transition: 'background-color 0.5s ease'
        }}>

            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

                {/* Simple Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h2 style={{ fontSize: '3.5rem', margin: '0 0 0.5rem 0', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1, color: 'white' }}>
                            {currentDay}
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', margin: 0, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 500 }}>
                            {currentDate}
                        </p>
                    </div>

                    {todayTasks.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', minWidth: '250px' }}>
                            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,1)', margin: 0, fontWeight: 600 }}>
                                {progressPercent}% completato
                            </p>
                            <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${progressPercent}%`, backgroundColor: 'white', transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Task Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {todayTasks.length === 0 ? (
                        <div style={{ padding: '4rem', textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-xl)' }}>
                            <Target size={64} style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.5rem', color: 'white', margin: '0 0 0.5rem 0' }}>Giornata libera!</h3>
                            <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>Nessuna attività in programma.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem' }}>
                            {todayTasks.map((task) => {
                                const isDone = completedTasks.has(task.id);

                                return (
                                    <div
                                        key={task.id}
                                        style={{
                                            padding: '2rem',
                                            backgroundColor: 'var(--color-surface)',
                                            borderRadius: 'var(--radius-lg)',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            opacity: isDone ? 0.6 : 1,
                                            display: 'flex',
                                            cursor: 'pointer',
                                            gap: '1.5rem',
                                            alignItems: 'flex-start'
                                        }}
                                        onClick={() => toggleTaskCompletion(task.id)}
                                        onMouseEnter={(e) => {
                                            if (!isDone) e.currentTarget.style.transform = 'translateY(-6px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isDone) e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <div style={{ flexShrink: 0, marginTop: '0.2rem' }}>
                                            {isDone ? (
                                                <CheckCircle2 size={32} style={{ color: 'var(--color-success)', transition: 'all 0.3s' }} />
                                            ) : (
                                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid var(--color-text-muted)', opacity: 0.5 }}></div>
                                            )}
                                        </div>

                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                                                <h3 style={{
                                                    fontSize: '1.4rem',
                                                    margin: 0,
                                                    color: 'var(--color-text)',
                                                    textDecoration: isDone ? 'line-through' : 'none',
                                                    fontWeight: 600
                                                }}>
                                                    {task.task}
                                                </h3>

                                                <div style={{ display: 'flex', gap: '1rem', color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={14} /> {task.time}</span>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: bgColor }}><Users size={14} /> {task.team}</span>
                                                </div>
                                            </div>

                                            <div style={{
                                                marginTop: '0.5rem',
                                                display: 'flex', gap: '0.75rem', alignItems: 'flex-start'
                                            }}>
                                                <div style={{ width: '3px', alignSelf: 'stretch', backgroundColor: bgColor, opacity: 0.8, borderRadius: '4px' }}></div>
                                                <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                                                    {task.goal}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodayView;
