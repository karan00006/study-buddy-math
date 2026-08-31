import React, { useEffect, useState } from 'react';
import { PracticeSessionResult } from '../../math-engine/types';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  PlusCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  Award,
} from 'lucide-react';
import { SolutionModal } from '../practice/SolutionModal';

interface ResultsPageProps {
  results: PracticeSessionResult;
  onTryAgain: () => void;
  onNewPractice: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  results,
  onTryAgain,
  onNewPractice,
}) => {
  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState<number | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({});

  const {
    grade,
    topicName,
    difficulty,
    totalQuestions,
    correctCount,
    accuracy,
    records,
    strengths,
    growthAreas,
  } = results;

  // Trigger celebration confetti for great scores!
  useEffect(() => {
    if (accuracy >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Ignore if confetti unavailable
      }
    }
  }, [accuracy]);

  const toggleExpand = (idx: number) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const getEncouragementMessage = (acc: number) => {
    if (acc === 100) return { title: '🏆 Perfect Score! Math Wizard!', desc: 'You solved every single problem correctly. Incredible work!' };
    if (acc >= 80) return { title: '🌟 Fantastic Job!', desc: 'You have a solid grasp of this topic. Keep up the awesome momentum!' };
    if (acc >= 60) return { title: '👍 Good Effort!', desc: 'You are making steady progress. Review a few steps and try again to hit 100%!' };
    return { title: '💪 Keep Practicing!', desc: 'Mistakes are how we learn! Check out the solutions below to master each concept.' };
  };

  const encouragement = getEncouragementMessage(accuracy);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-pop-in">
      {/* Score Summary Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Background decorative glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-bold backdrop-blur-xs">
              <Award className="w-3.5 h-3.5" />
              <span>Grade {grade} • {topicName} • {difficulty.toUpperCase()}</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl tracking-tight">
              {encouragement.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              {encouragement.desc}
            </p>
          </div>

          {/* Accuracy Score Wheel / Circle */}
          <div className="shrink-0 flex flex-col items-center justify-center p-6 bg-white/10 rounded-3xl backdrop-blur-md border border-white/10 shadow-inner">
            <div className="font-heading font-extrabold text-4xl sm:text-5xl text-amber-300 tracking-tight">
              {accuracy}%
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-200 mt-1">
              Accuracy
            </span>
          </div>
        </div>

        {/* Quick Stats Counter */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/10 text-center">
          <div className="p-3 rounded-2xl bg-white/5">
            <span className="font-mono-math font-extrabold text-xl sm:text-2xl text-emerald-400">
              {correctCount}
            </span>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
              Correct
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5">
            <span className="font-mono-math font-extrabold text-xl sm:text-2xl text-rose-400">
              {totalQuestions - correctCount}
            </span>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
              Incorrect
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5">
            <span className="font-mono-math font-extrabold text-xl sm:text-2xl text-indigo-300">
              {totalQuestions}
            </span>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
              Total Questions
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onTryAgain}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-heading font-bold text-sm shadow-md shadow-indigo-200 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again (New Questions)</span>
        </button>

        <button
          type="button"
          onClick={onNewPractice}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-800 font-heading font-bold text-sm border border-slate-300/80 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Practice Session</span>
        </button>
      </div>

      {/* Areas of Mastery & Growth */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-3xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Key Strengths</span>
          </div>
          <ul className="space-y-1 text-xs text-emerald-950 font-medium">
            {strengths.map((s, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-3xl space-y-2">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
            <Target className="w-4 h-4 text-amber-600" />
            <span>Areas to Practice</span>
          </div>
          <ul className="space-y-1 text-xs text-amber-950 font-medium">
            {growthAreas.map((g, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500">•</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detailed Question Review */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-xl text-slate-900">
            Question-by-Question Review
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Click any question to view step-by-step solution
          </span>
        </div>

        <div className="space-y-3">
          {records.map((rec, idx) => {
            const isExpanded = !!expandedQuestions[idx];
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border-2 transition-all overflow-hidden ${
                  rec.isCorrect
                    ? 'border-emerald-200 hover:border-emerald-300'
                    : 'border-rose-200 hover:border-rose-300'
                }`}
              >
                {/* Header preview row */}
                <div
                  onClick={() => toggleExpand(idx)}
                  className="p-4 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-white shrink-0 shadow-2xs ${
                        rec.isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    >
                      {rec.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <span className="font-bold text-xs text-slate-400 uppercase tracking-wider block">
                        Question {idx + 1}
                      </span>
                      <p className="font-medium text-sm text-slate-800 truncate">
                        {rec.question.prompt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSolutionIndex(idx);
                      }}
                      className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 py-1.5 px-3 rounded-xl border border-indigo-100 transition-colors"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Show Solution</span>
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 bg-slate-50/50 border-t border-slate-100 space-y-3 text-xs sm:text-sm animate-pop-in">
                    <p className="font-semibold text-slate-800">{rec.question.prompt}</p>

                    {rec.question.mathExpression && (
                      <p className="font-mono-math font-bold text-indigo-700 bg-white inline-block px-2.5 py-1 rounded-lg border border-indigo-100">
                        {rec.question.mathExpression}
                      </p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <div className="p-3 bg-white rounded-xl border border-slate-200">
                        <span className="text-[11px] font-bold text-slate-400 uppercase block mb-0.5">
                          Your Answer:
                        </span>
                        <span
                          className={`font-mono-math font-bold ${
                            rec.isCorrect ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {rec.userAnswer || '(No answer entered)'}
                        </span>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200">
                        <span className="text-[11px] font-bold text-slate-400 uppercase block mb-0.5">
                          Correct Answer:
                        </span>
                        <span className="font-mono-math font-bold text-slate-800">
                          {rec.question.correctAnswer}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedSolutionIndex(idx)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-white py-1.5 px-3 rounded-xl border border-indigo-200 shadow-2xs transition-colors"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>View Full Step-by-Step Solution</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Solution Modal */}
      {selectedSolutionIndex !== null && records[selectedSolutionIndex] && (
        <SolutionModal
          isOpen={true}
          onClose={() => setSelectedSolutionIndex(null)}
          solution={records[selectedSolutionIndex].question.solution}
          questionPrompt={records[selectedSolutionIndex].question.prompt}
          mathExpression={records[selectedSolutionIndex].question.mathExpression}
        />
      )}
    </div>
  );
};
