import React from 'react';
import { Delete, CornerDownLeft } from 'lucide-react';

interface MathKeypadProps {
  onInsert: (char: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  onSubmit: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const MathKeypad: React.FC<MathKeypadProps> = ({
  onInsert,
  onBackspace,
  onClear,
  onSubmit,
  isOpen,
  onToggle,
}) => {
  const quickKeys = [
    ['7', '8', '9', '/', '('],
    ['4', '5', '6', '-', ')'],
    ['1', '2', '3', '.', '%'],
    ['0', 'x', 'y', 'π', '^'],
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={onToggle}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-indigo-50/60 hover:bg-indigo-100/60 border border-indigo-200/50"
        >
          <span>{isOpen ? '▼ Hide Math Keypad' : '▲ Show Math Keypad (Fractions, Exponents, Variables)'}</span>
        </button>
      </div>

      {isOpen && (
        <div className="p-3 bg-slate-100/90 border border-slate-200 rounded-2xl shadow-inner animate-pop-in">
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {quickKeys.map((row) =>
              row.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => onInsert(key)}
                  className="h-10 sm:h-11 rounded-xl bg-white hover:bg-indigo-50 active:scale-95 text-slate-800 hover:text-indigo-600 font-mono-math font-semibold text-base sm:text-lg border border-slate-200/80 shadow-2xs transition-all flex items-center justify-center"
                >
                  {key === '^' ? 'x²' : key}
                </button>
              ))
            )}
          </div>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClear}
              className="h-10 rounded-xl bg-slate-200/70 hover:bg-slate-300 active:scale-95 text-slate-700 font-semibold text-xs transition-all"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={onBackspace}
              className="h-10 rounded-xl bg-slate-200/70 hover:bg-slate-300 active:scale-95 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1 transition-all"
              title="Backspace"
            >
              <Delete className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold text-xs flex items-center justify-center gap-1 transition-all shadow-xs"
            >
              <CornerDownLeft className="w-4 h-4" />
              <span>Submit</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
