'use client';
import React, { useEffect, useState } from 'react';
import { useSharedAiPlanner, Plan } from '../contexts/AiPlannerContext';
import { X, Loader2, ServerCrash, Sparkles, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({ isOpen, onClose }) => {
  const { plans, clearHistory } = useSharedAiPlanner();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const sortedPlans = React.useMemo(() => 
    [...plans].sort((a, b) => b.timestamp - a.timestamp),
  [plans]);

  useEffect(() => {
    if (isOpen && sortedPlans.length > 0 && !selectedPlanId) {
      const latestPlan = sortedPlans.find(p => p.status === 'completed');
      if (latestPlan) {
        setSelectedPlanId(latestPlan.id);
      }
    }
  }, [isOpen, sortedPlans, selectedPlanId]);

  const selectedPlan = plans.find(p => p.id === selectedPlanId);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlanId(plan.id);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to delete all your travel plans?')) {
      clearHistory();
      setSelectedPlanId(null);
    }
  };

  if (!isOpen) return null;

  const PlanCard: React.FC<{ plan: Plan; }> = ({ plan }) => (
    <div
      onClick={() => handleSelectPlan(plan)}
      className={`p-4 rounded-lg transition-colors cursor-pointer border ${
        selectedPlanId === plan.id
          ? 'bg-georgianRed/10 dark:bg-georgianRed/20 border-georgianRed'
          : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="font-bold text-gray-800 dark:text-white truncate w-48">{plan.destination}</p>
        {plan.status === 'generating' && <Loader2 className="animate-spin text-blue-500 dark:text-blue-400" size={18} />}
        {plan.status === 'error' && <ServerCrash className="text-red-500 dark:text-red-400" size={18} />}
        {plan.status === 'completed' && <Sparkles className="text-green-500 dark:text-green-400" size={18} />}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {format(new Date(plan.timestamp), 'MMM d, yyyy - h:mm a')}
      </p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-40 animate-in fade-in-0" onClick={onClose}>
      <div 
        className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white dark:bg-gray-900/95 border-l border-gray-200 dark:border-white/10 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right-10 duration-300"
        onClick={(e) => e.stopPropagation()}
       >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-white/10 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Travel Plans</h2>
          <div className="flex items-center gap-2">
            {plans.length > 0 && (
              <button
                onClick={handleClear}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            )}
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-grow flex overflow-hidden">
          <div className="w-1/3 border-r border-gray-200 dark:border-white/10 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-transparent">
            {sortedPlans.length > 0 ? (
              sortedPlans.map(plan => <PlanCard key={plan.id} plan={plan} />)
            ) : (
              <div className="text-center text-gray-500 pt-10 px-4">
                <p>You haven't planned any trips yet.</p>
              </div>
            )}
          </div>

          <div className="w-2/3 overflow-y-auto p-6">
            {selectedPlan ? (
              <article className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 !mt-0">{selectedPlan.destination}</h2>
                {selectedPlan.status === 'completed' && (
                   <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                       {selectedPlan.result}
                   </ReactMarkdown>
                )}
                {selectedPlan.status === 'generating' && <p>Dato is working on this plan...</p>}
                {selectedPlan.status === 'error' && <p className="text-red-500 dark:text-red-400">Error: {selectedPlan.result || 'An unknown error occurred.'}</p>}
              </article>
            ) : (
              <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
                <Sparkles size={48} className="mb-4 text-gray-400 dark:text-gray-600" />
                <h3 className="font-bold">Select a plan</h3>
                <p>Choose a plan from the list to see the details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
