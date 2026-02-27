import React, { useState, useEffect } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { DAYS_OF_WEEK, PROJECTS } from '../data';
import { X, Save } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, editingTask = null, defaultDay = 'Lunedì' }) => {
    const { addTask, updateTask } = usePlanner();

    const [formData, setFormData] = useState({
        day: defaultDay,
        time: '',
        task: '',
        team: '',
        goal: '',
        project: 'Batoo',
        kpi: ''
    });

    useEffect(() => {
        if (editingTask) {
            setFormData(editingTask);
        } else {
            setFormData({
                day: defaultDay,
                time: '',
                task: '',
                team: '',
                goal: '',
                project: 'Batoo',
                kpi: ''
            });
        }
    }, [editingTask, defaultDay, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTask) {
            updateTask(editingTask.id, formData);
        } else {
            addTask(formData);
        }
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(10, 25, 47, 0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div
                className="glass-panel animate-fade-in premium-shadow"
                style={{
                    width: '100%',
                    maxWidth: '500px',
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden'
                }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.5rem',
                    borderBottom: '1px solid var(--glass-border)'
                }}>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>
                        {editingTask ? 'Modifica Attività' : 'Nuova Attività'}
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--color-text-muted)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Progetto</label>
                            <select name="project" value={formData.project || 'Batoo'} onChange={handleChange} required>
                                {PROJECTS.map(proj => (
                                    <option key={proj} value={proj}>{proj}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>KPI (Opzionale)</label>
                            <input type="text" name="kpi" value={formData.kpi || ''} onChange={handleChange} placeholder="Es. Conversion Rate..." />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Giorno</label>
                        <select name="day" value={formData.day} onChange={handleChange} required>
                            {DAYS_OF_WEEK.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Fascia Oraria (es. 09:30 - 10:00, Mattina)</label>
                        <input type="text" name="time" value={formData.time} onChange={handleChange} required placeholder="Ora o periodo..." />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Attività Principale</label>
                        <input type="text" name="task" value={formData.task} onChange={handleChange} required placeholder="Cosa c'è da fare..." />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Team Coinvolto</label>
                        <input type="text" name="team" value={formData.team} onChange={handleChange} required placeholder="Es. Sales, Tech..." />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Obiettivo Pratico</label>
                        <textarea name="goal" value={formData.goal} onChange={handleChange} required rows={3} placeholder="Dettaglio o scopo dell'attività..." style={{ resize: 'vertical' }} />
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" className="btn btn-outline" onClick={onClose}>Annulla</button>
                        <button type="submit" className="btn btn-primary">
                            <Save size={18} />
                            {editingTask ? 'Salva Modifiche' : 'Aggiungi'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
