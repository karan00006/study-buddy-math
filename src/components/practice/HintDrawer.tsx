import React from 'react';
import { Lightbulb, ChevronDown } from 'lucide-react';

interface HintDrawerProps {
  hints: string[];
  currentHintIndex: number;
  onRevealNextHint: () => void;
}

export const HintDrawer: React.FC<HintDrawerProps> = ({
  hints,
  currentHintIndex,
  onRevealNextHint,
}) => {
  const hasMoreHints = currentHintIndex < hints.length - 1;
  const isAnyHintRevealed = currentHintIndex >= 0;

  return (
    <div className="w-full space-y-2">
      {/* Revealed hints */}
      {isAnyHintRevealed && (
        <div className="space-y-2 animate-pop-in">
          {hints.slice(0, currentHintIndex + 1).map((hint, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-amber-50/90 border border-amber-200/90 rounded-2xl flex items-start gap-3 shadow-2xs"
            >
              <div className="p-1 bg-amber-200 text-amber-900 rounded-lg shrink-0 mt-0.5">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block mb-0.5">
                  Hint {idx + 1}
                </span>
                <p className="text-xs sm:text-sm font-medium text-amber-950 leading-relaxed">
                  {hint}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Button to reveal first or next hint */}
      {hasMoreHints ? (
        <button
          type="button"
          onClick={onRevealNextHint}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-100/70 hover:bg-amber-200/70 py-1.5 px-3 rounded-xl transition-all border border-amber-300/60 shadow-2xs"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>{currentHintIndex === -1 ? 'Need a Hint?' : 'Get Another Hint'}</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      ) : (
        isAnyHintRevealed && (
          <p className="text-[11px] font-medium text-slate-400 italic">
            All available hints revealed. Still stuck? Click "Show Me How"!
          </p>
        )
      )}
    </div>
  );
};
