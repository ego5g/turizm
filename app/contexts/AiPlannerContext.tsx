'use client';
import React, { createContext, useContext } from 'react';
import { useAiPlanner, Plan } from '../hooks/useAiPlanner';

// Re-export the Plan type so other components can use it
export type { Plan };

interface AiPlannerContextType {
  plans: Plan[];
  generatePlan: (args: { destination: string; duration: string; interests: string }) => Promise<void>;
  clearHistory: () => void;
}

const AiPlannerContext = createContext<AiPlannerContextType | undefined>(undefined);

export const AiPlannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const planner = useAiPlanner();
  return <AiPlannerContext.Provider value={planner}>{children}</AiPlannerContext.Provider>;
};

export const useSharedAiPlanner = () => {
  const context = useContext(AiPlannerContext);
  if (!context) {
    throw new Error('useSharedAiPlanner must be used within an AiPlannerProvider');
  }
  return context;
};
