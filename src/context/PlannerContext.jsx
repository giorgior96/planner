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
                return JSON.parse(savedTasks);
            } catch (err) {
                console.error('Failed to parse tasks from localStorage', err);
            }
        }
        return initialData;
    });

    // Save to local storage whenever tasks change
    useEffect(() => {
        localStorage.setItem('startup_planner_tasks', JSON.stringify(tasks));
    }, [tasks]);

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
    };

    return (
        <PlannerContext.Provider value={value}>
            {children}
        </PlannerContext.Provider>
    );
};
