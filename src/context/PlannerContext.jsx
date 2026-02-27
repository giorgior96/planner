import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data';

const PlannerContext = createContext();

export const usePlanner = () => {
    const context = useContext(PlannerContext);
    if (!context) {
        throw new Error('usePlanner must be used within a PlannerProvider');
    }
    return context;
};

export const PlannerProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('startup_planner_tasks');
        if (savedTasks) {
            try {
                const parsed = JSON.parse(savedTasks);
                // Migrate vecchi dati che non avevano i campi project o kpi
                const migratedTasks = parsed.map(task => ({
                    ...task,
                    project: task.project || 'Batoo',
                    kpi: task.kpi || ''
                }));
                return migratedTasks;
            } catch (err) {
                console.error('Failed to parse tasks from localStorage', err);
            }
        }
        return initialData;
    });

    const [completedTasks, setCompletedTasksState] = useState(() => {
        const savedCompleted = localStorage.getItem('nautica_completed_today');
        if (savedCompleted) {
            try {
                return new Set(JSON.parse(savedCompleted));
            } catch (err) {
                console.error('Failed to parse completed tasks', err);
            }
        }
        return new Set();
    });

    // Listen to localStorage changes across tabs
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'startup_planner_tasks' && e.newValue) {
                try {
                    setTasks(JSON.parse(e.newValue));
                } catch (err) { }
            }
            if (e.key === 'nautica_completed_today' && e.newValue) {
                try {
                    setCompletedTasksState(new Set(JSON.parse(e.newValue)));
                } catch (err) { }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Save to local storage whenever tasks change
    useEffect(() => {
        localStorage.setItem('startup_planner_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const setCompletedTasks = (newCompletedKeys) => {
        setCompletedTasksState(newCompletedKeys);
        localStorage.setItem('nautica_completed_today', JSON.stringify([...newCompletedKeys]));
    };

    const toggleTaskCompletion = (id) => {
        const newSet = new Set(completedTasks);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setCompletedTasks(newSet);
    };

    const addTask = (newTask) => {
        setTasks((prev) => [...prev, { ...newTask, id: Date.now().toString() }]);
    };

    const updateTask = (id, updatedFields) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, ...updatedFields } : task))
        );
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const value = {
        tasks,
        addTask,
        updateTask,
        deleteTask,
        completedTasks,
        toggleTaskCompletion
    };

    return (
        <PlannerContext.Provider value={value}>
            {children}
        </PlannerContext.Provider>
    );
};
