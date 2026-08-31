import React from 'react';
import { BookOpen, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-8 bg-slate-100/70 border-t border-slate-200/80 text-xs text-slate-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <span className="font-bold text-slate-700">Study Buddy</span>
          <span className="hidden sm:inline">•</span>
          <span>Middle School Mathematics (Grades 6, 7 &amp; 8)</span>
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

      {/* Made by Karan */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-4 pt-4 border-t border-slate-200/60 flex items-center justify-center">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
          Made with <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> by
          <span className="text-indigo-600 font-bold">Karan</span>
        </p>
      </div>
    </footer>
  );
};
