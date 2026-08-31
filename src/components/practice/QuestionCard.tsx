import React, { useState, useEffect, useRef } from 'react';
import { MathQuestion, ValidationResult } from '../../math-engine/types';
import { MathDisplay } from './MathDisplay';
import { MathDiagram } from './MathDiagram';
import { MathKeypad } from './MathKeypad';
import { HintDrawer } from './HintDrawer';
import { FeedbackBanner } from './FeedbackBanner';
import { Send, HelpCircle, Edit3, Bot } from 'lucide-react';

interface QuestionCardProps {
  question: MathQuestion;
  questionIndex: number;
  totalQuestions: number;
  onSubmitAnswer: (answer: string) => ValidationResult;
  onNextQuestion: () => void;
  onShowSolution: () => void;
  isLastQuestion: boolean;
  onOpenScratchpad: () => void;
  onOpenAITutor?: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  onSubmitAnswer,
  onNextQuestion,
  onShowSolution,
  isLastQuestion,
  onOpenScratchpad,
  onOpenAITutor,
}) => {
  const [userInput, setUserInput] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [hintIndex, setHintIndex] = useState(-1);
  const [isKeypadOpen, setIsKeypadOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Reset state when question changes
  useEffect(() => {
    setUserInput('');
    setValidationResult(null);
    setHintIndex(-1);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [question.id]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim()) return;

    const result = onSubmitAnswer(userInput);
    setValidationResult(result);
  };

  const handleRetry = () => {
    setValidationResult(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInsertKey = (char: string) => {
    setUserInput((prev) => prev + char);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBackspace = () => {
    setUserInput((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setUserInput('');
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-5 sm:p-8 space-y-6 animate-pop-in">
      {/* Top Header Information */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-heading font-extrabold text-base sm:text-lg text-slate-800">
            Question {questionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            Grade {question.grade}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenAITutor && (
            <button
              type="button"
              onClick={onOpenAITutor}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-bold rounded-xl border border-violet-200 shadow-2xs transition-colors cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Tutor</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenScratchpad}
            className="inline-flex sm:hidden items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
            title="Open Scratchpad"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Draw</span>
          </button>
          <span
            className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
              question.difficulty === 'easy'
                ? 'bg-emerald-100 text-emerald-800'
                : question.difficulty === 'medium'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-rose-100 text-rose-800'
            }`}
          >
            {question.difficulty}
          </span>
        </div>
      </div>

      {/* Main Question Display */}
      <div className="space-y-4">
        <h2 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 leading-snug">
          {question.prompt}
        </h2>

        {/* Optional Math Highlight Box */}
        {question.mathExpression && (
          <div className="my-2">
            <MathDisplay expression={question.mathExpression} size="large" />
          </div>
        )}

        {/* Optional Diagram Visual */}
        {question.diagram && <MathDiagram diagram={question.diagram} />}
      </div>

      {/* Answer Form */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Your Answer:
          </label>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={question.placeholder || 'Enter your answer...'}
                disabled={validationResult?.isCorrect}
                className={`w-full px-4 py-3.5 rounded-2xl border-2 font-mono-math font-bold text-lg sm:text-xl text-slate-900 bg-slate-50/70 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400 placeholder:font-normal ${
                  validationResult?.isCorrect
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : validationResult && !validationResult.isCorrect
                    ? 'border-rose-400 focus:border-rose-500'
                    : 'border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100'
                }`}
              />
              {question.unit && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 font-mono-math">
                  {question.unit}
                </span>
              )}
            </div>

            {!validationResult?.isCorrect && (
              <button
                type="submit"
                disabled={!userInput.trim()}
                className="h-[54px] px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed active:scale-95 text-white font-heading font-bold text-base shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Submit</span>
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Math Keypad */}
        {!validationResult?.isCorrect && (
          <MathKeypad
            isOpen={isKeypadOpen}
            onToggle={() => setIsKeypadOpen(!isKeypadOpen)}
            onInsert={handleInsertKey}
            onBackspace={handleBackspace}
            onClear={handleClear}
            onSubmit={handleSubmit}
          />
        )}
      </form>

      {/* Feedback Banner */}
      {validationResult && (
        <FeedbackBanner
          result={validationResult}
          onNext={onNextQuestion}
          onRetry={handleRetry}
          onShowSolution={onShowSolution}
          isLastQuestion={isLastQuestion}
        />
      )}

      {/* Hints & Solution Buttons */}
      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <HintDrawer
          hints={question.hints}
          currentHintIndex={hintIndex}
          onRevealNextHint={() => setHintIndex((prev) => prev + 1)}
        />

        <div className="flex items-center gap-2 ml-auto">
          {onOpenAITutor && (
            <button
              type="button"
              onClick={onOpenAITutor}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-800 bg-violet-50 hover:bg-violet-100 py-2 px-3.5 rounded-xl border border-violet-200 transition-colors cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask AI Tutor</span>
            </button>
          )}

          <button
            type="button"
            onClick={onShowSolution}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 py-2 px-3.5 rounded-xl border border-indigo-200 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Show Me How</span>
          </button>
        </div>
      </div>
    </div>
  );
};
