import React from 'react';
import { BookOpen, CheckCircle2, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-8 bg-slate-100/70 border-t border-slate-200/80 text-xs text-slate-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Study Buddy</span>
          <span>•</span>
          <span>Middle School Mathematics (Grades 6, 7 & 8)</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-medium text-slate-500">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Procedural Problem Generator
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" /> Step-by-Step Solutions
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-500" /> Smart Answer Checking
          </span>
        </div>
      </div>
    </footer>
  );
};
