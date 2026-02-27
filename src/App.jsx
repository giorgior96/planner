import React, { useState } from 'react';
import { PlannerProvider } from './context/PlannerContext';
import Layout from './components/Layout';
import TodayView from './components/TodayView';
import WeeklyPlannerView from './components/WeeklyPlannerView';

function App() {
  const [currentView, setCurrentView] = useState('today'); // 'today' or 'weekly'

  return (
    <PlannerProvider>
      <Layout currentView={currentView} setCurrentView={setCurrentView}>
        {currentView === 'today' ? <TodayView /> : <WeeklyPlannerView />}
      </Layout>
    </PlannerProvider>
  );
}

export default App;
