export const PROJECTS = ['Batoo', 'Linfa', 'Altro'];

export const initialData = [
  { id: '1', day: 'Lunedì', time: '09:30 - 10:00', task: 'Stand-up Meeting di Team', team: 'Tutto il team', goal: 'Allineamento rapido: cosa si fa oggi, eventuali blocchi.', project: 'Batoo', kpi: '' },
  { id: '2', day: 'Lunedì', time: '10:00 - 11:00', task: 'Analisi Metriche (Weekly Review)', team: 'Founder, Team Lead', goal: 'Valutare i KPI della settimana precedente (nuovi broker, lead generati).', project: 'Batoo', kpi: 'Nuovi lead, Conversion rate' },
  { id: '3', day: 'Lunedì', time: 'Pomeriggio', task: 'Pianificazione Sprint', team: 'Tech, Marketing, Sales', goal: 'Definire i micro-obiettivi settimanali per ogni reparto.', project: 'Batoo', kpi: 'Task stimati vs completati' },

  { id: '4', day: 'Martedì', time: 'Mattina', task: 'Outbound Sales', team: 'Sales', goal: 'Contattare nuovi broker e presentare la piattaforma (Focus Supply).', project: 'Batoo', kpi: 'Nuovi contatti, Demo prenotate' },
  { id: '5', day: 'Martedì', time: 'Pomeriggio', task: 'Onboarding & Qualità Inventario', team: 'Sales / Account Mgt', goal: 'Aiutare i broker a caricare le barche e verificare la qualità di foto/descrizioni.', project: 'Linfa', kpi: 'Annunci caricati, Qualità immagini' },
  { id: '6', day: 'Martedì', time: 'Continuativo', task: 'Sviluppo Prodotto', team: 'Tech', goal: 'Sviluppo delle funzionalità decise il lunedì.', project: 'Batoo', kpi: 'Commit, PR chiuse' },

  { id: '7', day: 'Mercoledì', time: 'Mattina', task: 'Ottimizzazione Marketing', team: 'Marketing', goal: 'Revisione campagne Ads (Google/Meta) e ottimizzazione SEO annunci (Focus Demand).', project: 'Linfa', kpi: 'CPA, CTR, Traffico organico' },
  { id: '8', day: 'Mercoledì', time: 'Pomeriggio', task: 'Qualificazione Lead', team: 'Marketing / Tech', goal: 'Verificare che i contatti inviati ai broker siano di alta qualità (non perditempo).', project: 'Batoo', kpi: 'Lead qualificati %' },
  { id: '9', day: 'Mercoledì', time: '17:00 - 17:15', task: 'Check-in Metà Settimana', team: 'Founder, Team Lead', goal: 'Rapido controllo: siamo in linea con gli obiettivi di lunedì?', project: 'Altro', kpi: '' },

  { id: '10', day: 'Giovedì', time: 'Mattina', task: 'Interviste e Feedback Broker', team: 'Account Mgt / Sales', goal: 'Chiamare i broker attivi: capire se i lead convertono in vendite reali.', project: 'Batoo', kpi: 'Feedback raccolti, NPS' },
  { id: '11', day: 'Giovedì', time: 'Pomeriggio', task: 'Supporto Acquirenti', team: 'Customer Care / Mktg', goal: 'Analizzare dubbi degli acquirenti, migliorare i filtri di ricerca sul sito.', project: 'Linfa', kpi: 'Ticket risolti, Tempo di risposta' },
  { id: '12', day: 'Giovedì', time: 'Continuativo', task: 'Sviluppo Prodotto', team: 'Tech', goal: 'Integrazione dei feedback raccolti dai broker e risoluzione bug.', project: 'Batoo', kpi: 'Bug risolti' },

  { id: '13', day: 'Venerdì', time: 'Mattina', task: 'Deep Work & Rilascio', team: 'Tutto il team (Focus Tech)', goal: 'Chiusura dei task aperti e rilascio in produzione di nuove feature.', project: 'Batoo', kpi: 'Release effettuate' },
  { id: '14', day: 'Venerdì', time: '15:00 - 16:00', task: 'Demo / Show & Tell', team: 'Tutto il team', goal: 'Condividere i successi (nuove feature, nuovi grossi broker acquisiti, ecc.).', project: 'Altro', kpi: '' },
  { id: '15', day: 'Venerdì', time: '16:00 - 17:00', task: 'Retrospettiva', team: 'Tutto il team', goal: 'Analizzare i processi: cosa ha funzionato bene e cosa va migliorato.', project: 'Altro', kpi: '' },
  { id: '16', day: 'Venerdì', time: '17:00 in poi', task: 'Team Bonding', team: 'Tutto il team', goal: 'Aperitivo/relax per chiudere la settimana.', project: 'Altro', kpi: '' },
];

export const DAYS_OF_WEEK = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

export const DAY_THEMES = {
  'Lunedì': '#1E3A8A',      // Blu Scuro Profondo
  'Martedì': '#1E40AF',     // Blu Forte e Classico
  'Mercoledì': '#172554',   // Blu Notte
  'Giovedì': '#273A8A',     // Blu Reale Smorzato
  'Venerdì': '#0F3A66',     // Blu Oxford
  'Sabato': '#1A3E72',      // Blu Marino
  'Domenica': '#274C77'     // Blu Standard Elegante
};

export const DAY_THEMES_SOLID = { ...DAY_THEMES };

export const getCurrentDayName = () => {
  const today = new Date();
  const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
  return DAYS_OF_WEEK[dayIndex] || 'Lunedì';
};
