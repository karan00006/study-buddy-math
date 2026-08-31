import React from 'react';
import { CheckCircle, AlertCircle, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { ValidationResult } from '../../math-engine/types';

interface FeedbackBannerProps {
  result: ValidationResult | null;
  onNext: () => void;
  onRetry: () => void;
  onShowSolution: () => void;
  isLastQuestion: boolean;
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  result,
  onNext,
  onRetry,
  onShowSolution,
  isLastQuestion,
}) => {
  if (!result) return null;

  const isCorrect = result.isCorrect;

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-2 shadow-md animate-pop-in flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isCorrect
          ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
          : 'bg-rose-50/90 border-rose-300 text-rose-950'
      }`}
    >
      <div className="flex items-start sm:items-center gap-3">
        <div
          className={`p-2 rounded-2xl shrink-0 ${
            isCorrect ? 'bg-emerald-500 text-white shadow-xs' : 'bg-rose-500 text-white shadow-xs'
          }`}
        >
          {isCorrect ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
        </div>
        <div>
          <h4 className="font-heading font-bold text-base sm:text-lg leading-tight">
            {result.feedback}
          </h4>
          {!isCorrect && (
            <p className="text-xs text-rose-700 mt-0.5">
              Review your calculation, check your format, or see step-by-step instructions.
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
        {!isCorrect && (
          <>
            <button
              type="button"
              onClick={onRetry}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-300 shadow-2xs transition-all active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
            <button
              type="button"
              onClick={onShowSolution}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 shadow-2xs transition-all active:scale-95"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Show Me How</span>
            </button>
          </>
        )}

        <button
          type="button"
          onClick={onNext}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-xl font-bold text-sm text-white shadow-xs transition-all active:scale-95 ${
            isCorrect
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-slate-800 hover:bg-slate-900'
          }`}
        >
          <span>{isLastQuestion ? 'View Results' : 'Next Question'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
