import React from 'react';
import { Volume2, VolumeX, Edit3, Compass, Sparkles } from 'lucide-react';
import { Grade } from '../../math-engine/types';
import { StudyBuddyLogo } from '../ui/StudyBuddyLogo';

interface HeaderProps {
  currentScreen: 'home' | 'setup' | 'practice' | 'results';
  selectedGrade: Grade | null;
  onNavigateHome: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onToggleScratchpad: () => void;
  isScratchpadOpen: boolean;
  onOpenAITutor?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  selectedGrade,
  onNavigateHome,
  soundEnabled,
  onToggleSound,
  onToggleScratchpad,
  isScratchpadOpen,
  onOpenAITutor,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo with Custom Mascot */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="group text-left transition-transform active:scale-98 cursor-pointer"
        >
          <StudyBuddyLogo size="md" variant="full" showTagline={true} />
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Grade Pill */}
          {selectedGrade && currentScreen !== 'home' && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 font-bold text-xs">
              <Compass className="w-3.5 h-3.5" />
              <span>Grade {selectedGrade}</span>
            </div>
          )}

          {/* AI Tutor Button */}
          {currentScreen === 'practice' && onOpenAITutor && (
            <button
              type="button"
              onClick={onOpenAITutor}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
              title="Ask AI Math Tutor"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Tutor</span>
            </button>
          )}

          {/* Scratchpad Toggle Button */}
          {currentScreen === 'practice' && (
            <button
              type="button"
              onClick={onToggleScratchpad}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer ${
                isScratchpadOpen
                  ? 'bg-indigo-600 text-white shadow-indigo-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title="Open Scratchpad"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">Scratchpad</span>
            </button>
          )}

          {/* Audio Feedback Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            className={`p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 cursor-pointer ${
              !soundEnabled ? 'opacity-60' : ''
            }`}
            title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-indigo-600" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
