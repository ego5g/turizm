'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useSharedAiPlanner, Plan } from '../contexts/AiPlannerContext';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Loader2, ServerCrash, Sparkles, Trash2, Pencil, Share2, Download } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { plans, clearHistory, deletePlan, loadPlanForEditing } = useSharedAiPlanner();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const planContentRef = useRef<HTMLDivElement>(null);

  const sortedPlans = React.useMemo(() => 
    [...plans].sort((a, b) => b.timestamp - a.timestamp),
  [plans]);

  useEffect(() => {
    if (isOpen && sortedPlans.length > 0) {
        // If the selected plan is deleted, or no plan is selected, select the latest one.
        const selectedPlanExists = sortedPlans.some(p => p.id === selectedPlanId);
        if (!selectedPlanId || !selectedPlanExists) {
            const latestPlan = sortedPlans.find(p => p.status === 'completed');
            if (latestPlan) {
                setSelectedPlanId(latestPlan.id);
            }
        }
    }
  }, [isOpen, sortedPlans, selectedPlanId]);

  const selectedPlan = plans.find(p => p.id === selectedPlanId);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlanId(plan.id);
  };

  const handleClearHistory = () => {
    if (confirm(t.planner.deleteConfirmationMessage)) {
      clearHistory();
      setSelectedPlanId(null);
    }
  };

  const handleDeleteRequest = (planId: string) => {
    setPlanToDelete(planId);
  };

  const handleConfirmDelete = () => {
    if (planToDelete) {
      deletePlan(planToDelete);
      if (selectedPlanId === planToDelete) {
        setSelectedPlanId(null);
      }
      setPlanToDelete(null);
    }
  };

  const handleEdit = (plan: Plan) => {
    loadPlanForEditing(plan);
    onClose();
  };

  const handleDownloadPdf = async () => {
    if (!planContentRef.current || !selectedPlan) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(planContentRef.current, {
        scale: 2, // Higher scale for better quality
        backgroundColor: null, // Use element's background
        useCORS: true
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const imgWidth = pdfWidth - 20; // with margin
      const imgHeight = imgWidth / ratio;

      let heightLeft = imgHeight;
      let position = 10; // top margin

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`Travel-Plan-${selectedPlan.destination.replace(/\s+/g, '-')}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Sorry, there was an error creating the PDF.");
    } finally {
      setIsDownloading(false);
    }
  };


  if (!isOpen) return null;

  const PlanCard: React.FC<{ plan: Plan; }> = ({ plan }) => (
    <div className={`p-3 rounded-lg transition-colors border ${
        selectedPlanId === plan.id
          ? 'bg-georgianRed/10 dark:bg-georgianRed/20 border-georgianRed'
          : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10'
      }`}>
      <div onClick={() => handleSelectPlan(plan)} className="cursor-pointer">
        <div className="flex justify-between items-center mb-2">
            <p className="font-bold text-gray-800 dark:text-white truncate w-40">{plan.destination}</p>
            {plan.status === 'generating' && <Loader2 className="animate-spin text-blue-500 dark:text-blue-400" size={18} />}
            {plan.status === 'error' && <ServerCrash className="text-red-500 dark:text-red-400" size={18} />}
            {plan.status === 'completed' && <Sparkles className="text-green-500 dark:text-green-400" size={18} />}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
            {format(new Date(plan.timestamp), 'MMM d, yyyy - h:mm a')}
        </p>
      </div>
      {plan.status === 'completed' && (
        <div className="flex items-center gap-2 mt-3 border-t border-gray-200 dark:border-white/10 pt-2">
            <button onClick={() => handleEdit(plan)} className="p-1.5 text-gray-500 hover:text-blue-500 transition-colors rounded-md hover:bg-gray-200 dark:hover:bg-white/10" title={t.planner.editPlan}><Pencil size={16}/></button>
            <button onClick={() => handleDeleteRequest(plan.id)} className="p-1.5 text-gray-500 hover:text-red-500 transition-colors rounded-md hover:bg-gray-200 dark:hover:bg-white/10" title={t.planner.deletePlan}><Trash2 size={16}/></button>
            <button onClick={handleDownloadPdf} className="p-1.5 text-gray-500 hover:text-green-500 transition-colors rounded-md hover:bg-gray-200 dark:hover:bg-white/10" title={t.planner.downloadPdf}><Download size={16}/></button>
        </div>
      )}
    </div>
  );

  return (
    <>
        <div className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-40 animate-in fade-in-0" onClick={onClose}></div>
        <div 
            className="fixed top-0 right-0 h-full w-full max-w-4xl bg-white dark:bg-gray-900/95 border-l border-gray-200 dark:border-white/10 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right-10 duration-300"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-white/10 flex-shrink-0">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.planner.myPlans}</h2>
            <div className="flex items-center gap-2">
                {plans.length > 0 && (
                <button
                    onClick={handleClearHistory}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    title="Clear all history"
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

                <div className="w-2/3 overflow-y-auto" >
                    {selectedPlan ? (
                    <div ref={planContentRef} className="p-6 bg-white dark:bg-gray-900">
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
                    </div>
                    ) : (
                    <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
                        <Sparkles size={48} className="mb-4 text-gray-400 dark:text-gray-600" />
                        <h3 className="font-bold">Select a plan</h3>
                        <p>Choose a plan from the list to see the details.</p>
                    </div>
                    )}
                </div>
            </div>
            {selectedPlan && selectedPlan.status === 'completed' && (
              <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900/95 flex items-center justify-end gap-4">
                <button
                    onClick={handleDownloadPdf}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                    {isDownloading ? <Loader2 className="animate-spin"/> : <Download size={16} />}
                    {isDownloading ? 'Downloading...' : t.planner.downloadPdf}
                </button>
              </div>
            )}
        </div>

        {/* Deletion Confirmation Modal */}
        {planToDelete && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t.planner.deleteConfirmationTitle}</h3>
                    <p className="text-gray-600 dark:text-gray-300 my-4">{t.planner.deleteConfirmationMessage}</p>
                    <div className="flex justify-center gap-4">
                        <button onClick={() => setPlanToDelete(null)} className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold">{t.planner.cancel}</button>
                        <button onClick={handleConfirmDelete} className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold">{t.planner.confirm}</button>
                    </div>
                </div>
            </div>
        )}
    </>
  );
};
