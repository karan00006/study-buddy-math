import React, { useState } from 'react';
import { Grade, TopicKey, Difficulty, MathQuestion, PracticeSessionResult } from './math-engine/types';
import { GRADE_TOPICS, generatePracticeSet } from './math-engine';
import { useAudio } from './hooks/useAudio';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { PracticeSetup } from './components/setup/PracticeSetup';
import { PracticePage } from './components/practice/PracticePage';
import { ResultsPage } from './components/results/ResultsPage';
import { SpellitPage } from './components/spellit/SpellitPage';

type Screen = 'home' | 'setup' | 'practice' | 'results' | 'spellit';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedGrade, setSelectedGrade] = useState<Grade>(6);
  const [selectedTopic, setSelectedTopic] = useState<TopicKey>('fractions');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(5);
  const [practiceQuestions, setPracticeQuestions] = useState<MathQuestion[]>([]);
  const [sessionResults, setSessionResults] = useState<PracticeSessionResult | null>(null);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState<boolean>(false);
  const [isAITutorOpen, setIsAITutorOpen] = useState<boolean>(false);

  const { soundEnabled, toggleSound, playSuccess, playIncorrect, playClick } = useAudio();

  // Navigation handlers
  const handleSelectGradeFromHome = (grade: Grade) => {
    playClick();
    setSelectedGrade(grade);
    const defaultTopic = GRADE_TOPICS[grade][0]?.key || 'fractions';
    setSelectedTopic(defaultTopic);
    setCurrentScreen('setup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickStart = () => {
    playClick();
    setCurrentScreen('setup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGradeChange = (newGrade: Grade) => {
    playClick();
    setSelectedGrade(newGrade);
    const firstTopic = GRADE_TOPICS[newGrade][0]?.key || 'fractions';
    setSelectedTopic(firstTopic);
  };

  const handleStartPractice = () => {
    playClick();
    const questions = generatePracticeSet(
      selectedGrade,
      selectedTopic,
      selectedDifficulty,
      selectedQuestionCount
    );
    setPracticeQuestions(questions);
    setIsAITutorOpen(false);
    setCurrentScreen('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteSession = (results: PracticeSessionResult) => {
    setSessionResults(results);
    setCurrentScreen('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTryAgain = () => {
    playClick();
    const questions = generatePracticeSet(
      selectedGrade,
      selectedTopic,
      selectedDifficulty,
      selectedQuestionCount
    );
    setPracticeQuestions(questions);
    setIsAITutorOpen(false);
    setCurrentScreen('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewPractice = () => {
    playClick();
    setCurrentScreen('setup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    playClick();
    setCurrentScreen('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSpellit = () => {
    playClick();
    setCurrentScreen('spellit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Global Header */}
      <Header
        currentScreen={currentScreen}
        selectedGrade={selectedGrade}
        onNavigateHome={handleNavigateHome}
        onNavigateSpellit={handleNavigateSpellit}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onToggleScratchpad={() => setIsScratchpadOpen((prev) => !prev)}
        isScratchpadOpen={isScratchpadOpen}
        onOpenAITutor={() => setIsAITutorOpen((prev) => !prev)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 flex flex-col">
        {currentScreen === 'home' && (
          <HomePage
            onSelectGrade={handleSelectGradeFromHome}
            onQuickStart={handleQuickStart}
          />
        )}

        {currentScreen === 'setup' && (
          <PracticeSetup
            grade={selectedGrade}
            topicKey={selectedTopic}
            difficulty={selectedDifficulty}
            questionCount={selectedQuestionCount}
            onSelectGrade={handleGradeChange}
            onSelectTopic={(t) => {
              playClick();
              setSelectedTopic(t);
            }}
            onSelectDifficulty={(d) => {
              playClick();
              setSelectedDifficulty(d);
            }}
            onSelectQuestionCount={(c) => {
              playClick();
              setSelectedQuestionCount(c);
            }}
            onStartPractice={handleStartPractice}
            onBackHome={handleNavigateHome}
          />
        )}

        {currentScreen === 'practice' && practiceQuestions.length > 0 && (
          <PracticePage
            questions={practiceQuestions}
            onCompleteSession={handleCompleteSession}
            onExitSession={() => {
              playClick();
              setCurrentScreen('setup');
            }}
            playSuccess={playSuccess}
            playIncorrect={playIncorrect}
            isScratchpadOpen={isScratchpadOpen}
            onToggleScratchpad={() => setIsScratchpadOpen((prev) => !prev)}
            isAITutorOpen={isAITutorOpen}
            onToggleAITutor={() => setIsAITutorOpen((prev) => !prev)}
          />
        )}

        {currentScreen === 'results' && sessionResults && (
          <ResultsPage
            results={sessionResults}
            onTryAgain={handleTryAgain}
            onNewPractice={handleNewPractice}
          />
        )}

        {currentScreen === 'spellit' && <SpellitPage />}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default App;
