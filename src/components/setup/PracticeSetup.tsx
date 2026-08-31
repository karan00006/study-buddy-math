import React from 'react';
import { Grade, TopicKey, Difficulty, TopicInfo } from '../../math-engine/types';
import { GRADE_TOPICS } from '../../math-engine';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  PieChart,
  Coins,
  Percent,
  Scale,
  ThermometerSnowflake,
  Variable,
  Shapes,
  Binary,
  Layers,
  Equal,
  Compass,
  BadgePercent,
  CircleDot,
  Dices,
  TrendingUp,
  Superscript,
  Workflow,
  TriangleRight,
  Box,
  BarChart3,
  Flame,
  Zap,
} from 'lucide-react';

interface PracticeSetupProps {
  grade: Grade;
  topicKey: TopicKey;
  difficulty: Difficulty;
  questionCount: number;
  onSelectGrade: (grade: Grade) => void;
  onSelectTopic: (key: TopicKey) => void;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onSelectQuestionCount: (count: number) => void;
  onStartPractice: () => void;
  onBackHome: () => void;
}

// Icon helper
function getTopicIcon(iconName: string) {
  const iconProps = { className: 'w-5 h-5' };
  switch (iconName) {
    case 'PieChart':
      return <PieChart {...iconProps} />;
    case 'Coins':
      return <Coins {...iconProps} />;
    case 'Percent':
      return <Percent {...iconProps} />;
    case 'Scale':
      return <Scale {...iconProps} />;
    case 'ThermometerSnowflake':
      return <ThermometerSnowflake {...iconProps} />;
    case 'Variable':
      return <Variable {...iconProps} />;
    case 'Shapes':
      return <Shapes {...iconProps} />;
    case 'Binary':
      return <Binary {...iconProps} />;
    case 'Layers':
      return <Layers {...iconProps} />;
    case 'Equal':
      return <Equal {...iconProps} />;
    case 'Compass':
      return <Compass {...iconProps} />;
    case 'BadgePercent':
      return <BadgePercent {...iconProps} />;
    case 'CircleDot':
      return <CircleDot {...iconProps} />;
    case 'Dices':
      return <Dices {...iconProps} />;
    case 'TrendingUp':
      return <TrendingUp {...iconProps} />;
    case 'Superscript':
      return <Superscript {...iconProps} />;
    case 'Workflow':
      return <Workflow {...iconProps} />;
    case 'TriangleRight':
      return <TriangleRight {...iconProps} />;
    case 'Box':
      return <Box {...iconProps} />;
    case 'BarChart3':
      return <BarChart3 {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
}

export const PracticeSetup: React.FC<PracticeSetupProps> = ({
  grade,
  topicKey,
  difficulty,
  questionCount,
  onSelectGrade,
  onSelectTopic,
  onSelectDifficulty,
  onSelectQuestionCount,
  onStartPractice,
  onBackHome,
}) => {
  const currentTopics = GRADE_TOPICS[grade] || GRADE_TOPICS[6];

  // Difficulty configurations
  const difficulties: { key: Difficulty; label: string; desc: string; color: string }[] = [
    {
      key: 'easy',
      label: 'Easy',
      desc: 'Build foundational skills & direct calculations',
      color: 'border-emerald-300 bg-emerald-50 text-emerald-900',
    },
    {
      key: 'medium',
      label: 'Medium',
      desc: 'Real-world word problems & multi-step thinking',
      color: 'border-amber-300 bg-amber-50 text-amber-900',
    },
    {
      key: 'hard',
      label: 'Hard',
      desc: 'Challenging multi-step mastery & algebraic reasoning',
      color: 'border-rose-300 bg-rose-50 text-rose-900',
    },
  ];

  const questionCounts = [5, 10, 15];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-pop-in">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-2xl">
          {([6, 7, 8] as Grade[]).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => onSelectGrade(g)}
              className={`px-3.5 py-1.5 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all ${
                grade === g
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Grade {g}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
          Customize Your Practice
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Select a math topic, difficulty level, and session length for Grade {grade}.
        </p>
      </div>

      {/* 1. Topic Selection Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-extrabold">
              1
            </span>
            Choose Math Topic
          </label>
          <span className="text-xs font-semibold text-indigo-600">
            {currentTopics.length} Topics Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentTopics.map((top: TopicInfo) => {
            const isSelected = topicKey === top.key;
            return (
              <div
                key={top.key}
                onClick={() => onSelectTopic(top.key)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 text-left ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/60 shadow-sm ring-2 ring-indigo-200'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl text-white bg-gradient-to-br ${top.color} shadow-xs shrink-0 mt-0.5`}
                >
                  {getTopicIcon(top.icon)}
                </div>

                <div className="min-w-0 flex-1">
                  <h3
                    className={`font-heading font-bold text-sm truncate ${
                      isSelected ? 'text-indigo-950' : 'text-slate-900'
                    }`}
                  >
                    {top.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed mt-0.5">
                    {top.shortDesc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Difficulty Selection */}
      <div className="space-y-3">
        <label className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-extrabold">
            2
          </span>
          Select Difficulty
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {difficulties.map((diff) => {
            const isSelected = difficulty === diff.key;
            return (
              <div
                key={diff.key}
                onClick={() => onSelectDifficulty(diff.key)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                  isSelected
                    ? `${diff.color} ring-2 ring-indigo-300 shadow-xs`
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-heading font-bold text-base">{diff.label}</span>
                  {diff.key === 'hard' && <Flame className="w-4 h-4 text-rose-500" />}
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Number of Questions */}
      <div className="space-y-3">
        <label className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-extrabold">
            3
          </span>
          Number of Questions
        </label>

        <div className="grid grid-cols-3 gap-3">
          {questionCounts.map((count) => {
            const isSelected = questionCount === count;
            return (
              <button
                key={count}
                type="button"
                onClick={() => onSelectQuestionCount(count)}
                className={`py-3 px-4 rounded-2xl border-2 font-heading font-bold text-sm sm:text-base transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {count} Questions
              </button>
            );
          })}
        </div>
      </div>

      {/* Start Practice CTA */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
          Grade {grade} • {currentTopics.find((t) => t.key === topicKey)?.name} • {difficulty.toUpperCase()} • {questionCount} Questions
        </div>

        <button
          type="button"
          onClick={onStartPractice}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-heading font-bold text-base shadow-lg shadow-indigo-200 transition-all cursor-pointer"
        >
          <Zap className="w-5 h-5" />
          <span>Start Practice</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
