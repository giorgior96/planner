import React, { useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { DAYS_OF_WEEK, PROJECT_COLORS } from '../data';
import TaskModal from './TaskModal';
import { Plus, Edit2, Trash2, Clock, Users, Target } from 'lucide-react';

const WeeklyPlannerView = () => {
    const { tasks, deleteTask } = usePlanner();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [defaultDay, setDefaultDay] = useState('Lunedì');

    const openNewModal = (day) => {
        setEditingTask(null);
        setDefaultDay(day);
        setIsModalOpen(true);
    };

    const openEditModal = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '3rem', width: '100%' }}>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2rem 2rem',
                backgroundColor: 'var(--color-surface)',
                margin: '-1rem -1rem 1rem -1rem',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '0.2rem', fontWeight: 800, letterSpacing: '-1px' }}>Planner Settimanale</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Panoramica e gestione delle operazioni ricorrenti del team</p>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '1.05rem' }} onClick={() => openNewModal('Lunedì')}>
                    <Plus size={20} /> Aggiungi Attività
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '0 1rem' }}>
                {DAYS_OF_WEEK.slice(0, 5).map(day => {
                    const dayTasks = tasks.filter(t => t.day === day);

                    return (
                        <div key={day} style={{ backgroundColor: 'transparent' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem', borderBottom: '2px solid var(--color-primary)', paddingBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0, fontWeight: 700 }}>
                                    {day}
                                    <span style={{ fontSize: '0.9rem', backgroundColor: 'var(--color-primary)', padding: '0.2rem 0.8rem', borderRadius: 'var(--radius-full)', color: 'white', fontWeight: 600 }}>
                                        {dayTasks.length}
                                    </span>
                                </h3>
                                <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', border: 'none', backgroundColor: 'rgba(0,0,0,0.03)' }} onClick={() => openNewModal(day)}>
                                    <Plus size={16} /> Aggiungi in {day}
                                </button>
                            </div>

                            {dayTasks.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px dashed rgba(0,0,0,0.1)' }}>
                                    Nessuna attività programmata per questo giorno.
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                                    {dayTasks.map(task => (
                                        <div
                                            key={task.id}
                                            style={{
                                                padding: '1.5rem',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '1rem',
                                                backgroundColor: 'var(--color-surface)',
                                                borderRadius: 'var(--radius-lg)',
                                                borderTop: '4px solid var(--color-secondary)',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                                                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-4px)';
                                                e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.08)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)';
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <h4 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--color-text)', fontWeight: 600 }}>{task.task}</h4>
                                                <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                    <button
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '0.25rem', borderRadius: '4px' }}
                                                        onClick={() => openEditModal(task)}
                                                        title="Modifica"
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)', padding: '0.25rem', borderRadius: '4px' }}
                                                        onClick={() => { if (window.confirm('Sei sicuro di voler eliminare questa attività?')) deleteTask(task.id) }}
                                                        title="Elimina"
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(231, 111, 81, 0.1)'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', gap: '1rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    <Clock size={14} /> <span>{task.time}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    <Users size={14} /> <span style={{ fontWeight: 500, color: 'var(--color-primary)' }}>{task.team}</span>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '4px', backgroundColor: PROJECT_COLORS[task.project || 'Batoo']?.bg || 'var(--color-background)', color: PROJECT_COLORS[task.project || 'Batoo']?.text || 'var(--color-primary)' }}>
                                                    {task.project || 'Batoo'}
                                                </span>
                                                {task.kpi && task.kpi.length > 0 && (
                                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '4px', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#0284c7' }}>
                                                        KPI: {task.kpi}
                                                    </span>
                                                )}
                                            </div>

                                            <div style={{ backgroundColor: 'var(--color-background)', padding: '1rem', borderRadius: 'var(--radius-md)', marginTop: 'auto', borderLeft: '2px solid rgba(0,0,0,0.05)' }}>
                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.4 }}>
                                                    <Target size={16} style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: '2px' }} />
                                                    <span>{task.goal}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editingTask={editingTask}
                defaultDay={defaultDay}
            />
        </div>
    );
};

export default WeeklyPlannerView;
