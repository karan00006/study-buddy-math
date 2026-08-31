import React, { useState } from 'react';
import {
  MathQuestion,
  ValidationResult,
  QuestionSessionRecord,
  PracticeSessionResult,
} from '../../math-engine/types';
import { checkAnswer } from '../../math-engine/normalizer';
import { QuestionCard } from './QuestionCard';
import { SolutionModal } from './SolutionModal';
import { Scratchpad } from './Scratchpad';
import { AITutorModal } from './AITutorModal';
import { ArrowLeft, Edit3 } from 'lucide-react';

interface PracticePageProps {
  questions: MathQuestion[];
  onCompleteSession: (results: PracticeSessionResult) => void;
  onExitSession: () => void;
  playSuccess: () => void;
  playIncorrect: () => void;
  isScratchpadOpen: boolean;
  onToggleScratchpad: () => void;
  isAITutorOpen?: boolean;
  onToggleAITutor?: () => void;
}

export const PracticePage: React.FC<PracticePageProps> = ({
  questions,
  onCompleteSession,
  onExitSession,
  playSuccess,
  playIncorrect,
  isScratchpadOpen,
  onToggleScratchpad,
  isAITutorOpen: externalIsAITutorOpen,
  onToggleAITutor: externalOnToggleAITutor,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [records, setRecords] = useState<QuestionSessionRecord[]>([]);
  const [isSolutionModalOpen, setIsSolutionModalOpen] = useState(false);
  const [internalIsAITutorOpen, setInternalIsAITutorOpen] = useState(false);
  const [startTime] = useState<number>(Date.now());
  const [currentAttempts, setCurrentAttempts] = useState(0);
  const [hasUsedHint, setHasUsedHint] = useState(false);
  const [hasViewedSolution, setHasViewedSolution] = useState(false);

  const isAITutorOpen = externalIsAITutorOpen !== undefined ? externalIsAITutorOpen : internalIsAITutorOpen;
  const toggleAITutor = externalOnToggleAITutor || (() => setInternalIsAITutorOpen((prev) => !prev));

  const currentQuestion = questions[currentIndex] || questions[0];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSubmitAnswer = (answer: string): ValidationResult => {
    setCurrentAttempts((prev) => prev + 1);
    const result = checkAnswer(answer, currentQuestion);

    if (result.isCorrect) {
      playSuccess();
    } else {
      playIncorrect();
    }

    // Save record for current question
    const updatedRecord: QuestionSessionRecord = {
      question: currentQuestion,
      userAnswer: answer,
      isCorrect: result.isCorrect,
      attempts: currentAttempts + 1,
      usedHint: hasUsedHint,
      viewedSolution: hasViewedSolution,
      timeSpentSeconds: Math.round((Date.now() - startTime) / 1000),
    };

    setRecords((prev) => {
      const filtered = prev.filter((r) => r.question.id !== currentQuestion.id);
      return [...filtered, updatedRecord];
    });

    return result;
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Calculate final results
      const totalQuestions = questions.length;
      const correctCount = records.filter((r) => r.isCorrect).length;
      const accuracy = Math.round((correctCount / totalQuestions) * 100);
      const timeElapsedSeconds = Math.round((Date.now() - startTime) / 1000);

      // Analyze strengths and growth areas
      const strengths: string[] = [];
      const growthAreas: string[] = [];

      if (accuracy >= 80) {
        strengths.push(`Strong mastery in ${currentQuestion.topicName} calculation!`);
      }
      if (accuracy === 100) {
        strengths.push('Flawless accuracy on all generated questions!');
      }
      if (accuracy < 70) {
        growthAreas.push(`Review foundational formulas for ${currentQuestion.topicName}.`);
        growthAreas.push('Take your time to write out scratch work before submitting.');
      }

      const finalResult: PracticeSessionResult = {
        grade: currentQuestion.grade,
        topicKey: currentQuestion.topicKey,
        topicName: currentQuestion.topicName,
        difficulty: currentQuestion.difficulty,
        totalQuestions,
        correctCount,
        accuracy,
        records,
        strengths: strengths.length > 0 ? strengths : ['Great persistence and effort!'],
        growthAreas:
          growthAreas.length > 0
            ? growthAreas
            : ['Ready to try the next difficulty level!'],
        timeElapsedSeconds,
      };

      onCompleteSession(finalResult);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setCurrentAttempts(0);
      setHasUsedHint(false);
      setHasViewedSolution(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Session Progress Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onExitSession}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>End Session</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleScratchpad}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all shadow-2xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Scratchpad</span>
            </button>

            <span className="font-heading font-bold text-xs sm:text-sm text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              {currentQuestion.topicName}
            </span>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-violet-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <QuestionCard
        question={currentQuestion}
        questionIndex={currentIndex}
        totalQuestions={questions.length}
        onSubmitAnswer={handleSubmitAnswer}
        onNextQuestion={handleNextQuestion}
        onShowSolution={() => {
          setHasViewedSolution(true);
          setIsSolutionModalOpen(true);
        }}
        isLastQuestion={isLastQuestion}
        onOpenScratchpad={onToggleScratchpad}
        onOpenAITutor={toggleAITutor}
      />

      {/* Step-by-Step Solution Modal */}
      <SolutionModal
        isOpen={isSolutionModalOpen}
        onClose={() => setIsSolutionModalOpen(false)}
        solution={currentQuestion.solution}
        questionPrompt={currentQuestion.prompt}
        mathExpression={currentQuestion.mathExpression}
      />

      {/* AI Tutor Modal */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={toggleAITutor}
        question={currentQuestion}
      />

      {/* Scratchpad Whiteboard */}
      <Scratchpad isOpen={isScratchpadOpen} onClose={onToggleScratchpad} />
    </div>
  );
};
