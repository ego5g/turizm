'use client';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useLanguage } from '../contexts/LanguageContext';

export interface Plan {
  id: string;
  destination: string;
  duration: string;
  interests: string;
  result: string;
  timestamp: number;
  status: 'generating' | 'completed' | 'error';
}

export const useAiPlanner = () => {
  const { language } = useLanguage();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [planToEdit, setPlanToEdit] = useState<Plan | null>(null);

  // Load plans from localStorage on initial render
  useEffect(() => {
    try {
      const savedPlans = localStorage.getItem('ai-travel-plans');
      if (savedPlans) {
        setPlans(JSON.parse(savedPlans));
      }
    } catch (error) {
      console.error("Failed to load plans from localStorage", error);
      toast.error("Could not load saved plans.");
    }
  }, []);

  // Save plans to localStorage whenever they change
  useEffect(() => {
    try {
      if (plans.length > 0) {
        localStorage.setItem('ai-travel-plans', JSON.stringify(plans));
      } else {
        localStorage.removeItem('ai-travel-plans');
      }
    } catch (error) {
      console.error("Failed to save plans to localStorage", error);
    }
  }, [plans]);

  const generatePlan = async ({ destination, duration, interests }: { destination: string; duration: string; interests: string }) => {
    const newPlanId = uuidv4();
    const newPlan: Plan = {
      id: newPlanId,
      destination,
      duration,
      interests,
      result: '',
      timestamp: Date.now(),
      status: 'generating',
    };

    setPlans(prevPlans => [newPlan, ...prevPlans]);
    toast.loading('Dato is crafting your itinerary... ✨', { id: newPlanId });

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          duration,
          interests: interests || "general sightseeing",
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Something went wrong');
      }

      setPlans(prevPlans =>
        prevPlans.map(p =>
          p.id === newPlanId ? { ...p, result: data.itinerary, status: 'completed' } : p
        )
      );
      toast.success('Your new adventure plan is ready!', { id: newPlanId });

    } catch (err: any) {
      console.error("AI generation failed:", err);
      setPlans(prevPlans =>
        prevPlans.map(p =>
          p.id === newPlanId ? { ...p, status: 'error', result: err.message } : p
        )
      );
      toast.error(`Dato encountered an issue: ${err.message}`.substring(0, 100), { id: newPlanId });
    }
  };
  
  const clearHistory = () => {
    setPlans([]);
    toast.success('Your travel history has been cleared.');
  };

  const deletePlan = (planId: string) => {
    setPlans(prevPlans => prevPlans.filter(p => p.id !== planId));
    toast.success('Plan deleted successfully.');
  };

  const loadPlanForEditing = (plan: Plan) => {
    setPlanToEdit(plan);
  };

  const clearPlanToEdit = () => {
    setPlanToEdit(null);
  };

  return { plans, generatePlan, clearHistory, deletePlan, loadPlanForEditing, planToEdit, clearPlanToEdit };
};
