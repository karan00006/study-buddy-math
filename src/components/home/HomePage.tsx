import React from 'react';
import { Grade } from '../../math-engine/types';
import { GRADE_TOPICS } from '../../math-engine';
import { StudyBuddyLogo } from '../ui/StudyBuddyLogo';
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Zap,
  Sparkles,
  Database,
  Bot,
} from 'lucide-react';

interface HomePageProps {
  onSelectGrade: (grade: Grade) => void;
  onQuickStart: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectGrade, onQuickStart }) => {
  const gradeDetails = [
    {
      grade: 6 as Grade,
      title: 'Grade 6 Math',
      badge: 'Ages 11–12',
      color: 'from-blue-500 to-indigo-600',
      borderHover: 'hover:border-indigo-400 hover:shadow-indigo-100',
      description: 'Foundations of proportional thinking, fractions, decimals, integers, and algebra.',
      topics: GRADE_TOPICS[6].slice(0, 5).map((t) => t.name),
      moreCount: 2,
    },
    {
      grade: 7 as Grade,
      title: 'Grade 7 Math',
      badge: 'Ages 12–13',
      color: 'from-violet-500 to-purple-600',
      borderHover: 'hover:border-violet-400 hover:shadow-violet-100',
      description: 'Rational operations, 2-step equations, proportions, circles, and probability.',
      topics: GRADE_TOPICS[7].slice(0, 5).map((t) => t.name),
      moreCount: 2,
    },
    {
      grade: 8 as Grade,
      title: 'Grade 8 Math',
      badge: 'Ages 13–14',
      color: 'from-teal-500 to-emerald-600',
      borderHover: 'hover:border-teal-400 hover:shadow-teal-100',
      description: 'Linear equations, exponents, functions, Pythagorean theorem, and statistics.',
      topics: GRADE_TOPICS[8].slice(0, 5).map((t) => t.name),
      moreCount: 2,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 animate-pop-in">
      {/* Hero Section */}
      <div className="text-center space-y-5 max-w-3xl mx-auto flex flex-col items-center">
        {/* Mascot Avatar Hero */}
        <div className="p-1 bg-white rounded-3xl shadow-lg border border-slate-200/80 mb-1">
          <StudyBuddyLogo size="lg" variant="icon" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Middle School Mathematics (Grades 6–8) • Free AI Tutor</span>
        </div>

        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
          Practice Smarter.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-500">
            Learn Better.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Middle-school math practice with infinite procedural questions, smart answer normalization,
          free AI tutoring, progressive hints, and an interactive scratchpad.
        </p>

        {/* Quick Start Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onQuickStart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-heading font-bold text-base shadow-lg shadow-indigo-200 transition-all cursor-pointer"
          >
            <Zap className="w-5 h-5" />
            <span>Start Practice Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grade Selection Cards */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-slate-900">
              Select Your Grade
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Choose your middle school grade level to pick topics and difficulty
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gradeDetails.map((item) => (
            <div
              key={item.grade}
              onClick={() => onSelectGrade(item.grade)}
              className={`bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer group ${item.borderHover}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-heading font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform`}
                  >
                    G{item.grade}
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Topics preview */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Topics Included
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.topics.map((top) => (
                      <span
                        key={top}
                        className="text-[11px] font-semibold bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/70"
                      >
                        {top}
                      </span>
                    ))}
                    {item.moreCount > 0 && (
                      <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100">
                        +{item.moreCount} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 group-hover:underline">
                  Select Grade {item.grade}
                </span>
                <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center text-slate-600 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="p-8 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl shadow-xl space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h3 className="font-heading font-bold text-xl sm:text-2xl">
            Why Students & Teachers Love Study Buddy
          </h3>
          <p className="text-xs sm:text-sm text-indigo-200 font-medium">
            Designed to build confidence and math mastery step by step
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/10 space-y-2">
            <div className="p-2 bg-indigo-500/30 text-indigo-300 rounded-xl inline-block">
              <Calculator className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-base">Infinite Practice</h4>
            <p className="text-xs text-slate-300 font-normal leading-relaxed">
              Procedural generators create fresh, new numbers and word problems every session.
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/10 space-y-2">
            <div className="p-2 bg-violet-500/30 text-violet-300 rounded-xl inline-block">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-base">Free AI Math Tutor</h4>
            <p className="text-xs text-slate-300 font-normal leading-relaxed">
              Ask "Buddy" questions, get real-world pizza analogies, or break down formulas step-by-step.
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/10 space-y-2">
            <div className="p-2 bg-emerald-500/30 text-emerald-300 rounded-xl inline-block">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-base">Smart Answer Normalizer</h4>
            <p className="text-xs text-slate-300 font-normal leading-relaxed">
              Understands fractions (1/2), decimals (0.5), percentages (50%), negative numbers, and variables seamlessly.
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/10 space-y-2">
            <div className="p-2 bg-teal-500/30 text-teal-300 rounded-xl inline-block">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-base">100% Database-Free</h4>
            <p className="text-xs text-slate-300 font-normal leading-relaxed">
              Runs client-side with local storage. Zero logins, zero database setups, and works offline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
