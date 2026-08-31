import React from 'react';
import { MathSolution } from '../../math-engine/types';
import { Sparkles, Lightbulb, CheckCircle2, X } from 'lucide-react';

interface SolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution: MathSolution;
  questionPrompt: string;
  mathExpression?: string;
}

export const SolutionModal: React.FC<SolutionModalProps> = ({
  isOpen,
  onClose,
  solution,
  questionPrompt,
  mathExpression,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-pop-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-heading font-bold text-lg leading-tight">Step-by-Step Solution</h3>
              <p className="text-xs text-indigo-100 font-medium">How to solve this problem</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-800 text-sm">
          {/* Question recap */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Problem
            </span>
            <p className="font-medium text-slate-700">{questionPrompt}</p>
            {mathExpression && (
              <p className="mt-1 font-mono-math font-bold text-indigo-700 bg-white inline-block px-2.5 py-0.5 rounded-lg border border-indigo-100 text-sm">
                {mathExpression}
              </p>
            )}
          </div>

          {/* Formula badge if applicable */}
          {solution.formula && (
            <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-2xl flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
                  Key Formula / Concept
                </span>
                <span className="font-mono-math font-bold text-amber-900 text-sm">
                  {solution.formula}
                </span>
              </div>
            </div>
          )}

          {/* Steps */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Solution Steps
            </span>
            <div className="space-y-2.5">
              {solution.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-indigo-50/40 rounded-2xl border border-indigo-100/60"
                >
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    {idx + 1}
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final Answer Banner */}
          <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-emerald-900 text-sm">Final Correct Answer:</span>
            </div>
            <span className="font-mono-math font-extrabold text-base text-emerald-700 bg-white px-3 py-1 rounded-xl border border-emerald-200 shadow-2xs">
              {solution.finalAnswer}
            </span>
          </div>

          {/* Tip if available */}
          {solution.tip && (
            <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              💡 <span className="font-semibold text-slate-600">Pro Tip:</span> {solution.tip}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm shadow-xs transition-all"
          >
            Got it, let's keep going!
          </button>
        </div>
      </div>
    </div>
  );
};
