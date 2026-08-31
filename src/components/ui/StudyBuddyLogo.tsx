import React from 'react';

interface StudyBuddyLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'icon' | 'full';
  showTagline?: boolean;
}

export const StudyBuddyLogo: React.FC<StudyBuddyLogoProps> = ({
  size = 'md',
  variant = 'full',
  showTagline = true,
}) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8', text: 'text-base', badge: 'text-[9px] px-1.5' },
    md: { icon: 'w-10 h-10 sm:w-11 sm:h-11', text: 'text-lg sm:text-xl', badge: 'text-[10px] px-2' },
    lg: { icon: 'w-14 h-14 sm:w-16 sm:h-16', text: 'text-2xl sm:text-3xl', badge: 'text-xs px-2.5' },
    xl: { icon: 'w-20 h-20 sm:w-24 sm:h-24', text: 'text-4xl sm:text-5xl', badge: 'text-sm px-3' },
  }[size];

  return (
    <div className="inline-flex items-center gap-3 select-none">
      {/* Custom Vector Mascot */}
      <div
        className={`${sizeMap.icon} rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 p-1.5 flex items-center justify-center shadow-md shadow-indigo-200/80 relative overflow-hidden shrink-0 group-hover:scale-105 transition-transform`}
      >
        {/* Glow backdrop inside icon */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-white/30 pointer-events-none" />

        <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
          {/* Owl / Mascot Head */}
          <circle cx="50" cy="54" r="34" className="fill-white" />

          {/* Ears / Feather tufts */}
          <polygon points="26,30 36,44 20,44" className="fill-indigo-600" />
          <polygon points="74,30 80,44 64,44" className="fill-indigo-600" />

          {/* Graduation Cap */}
          <polygon points="50,14 84,27 50,40 16,27" className="fill-slate-900" />
          <polygon points="34,35 66,35 60,47 40,47" className="fill-slate-800" />
          {/* Gold Tassel */}
          <path d="M 50 27 L 76 34 L 78 48" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          <circle cx="78" cy="49" r="3" className="fill-amber-400" />

          {/* Friendly Glasses (Round geometric rims) */}
          <circle cx="37" cy="56" r="13" stroke="#4f46e5" strokeWidth="3.5" className="fill-indigo-50/60" />
          <circle cx="63" cy="56" r="13" stroke="#4f46e5" strokeWidth="3.5" className="fill-indigo-50/60" />
          <line x1="49" y1="56" x2="51" y2="56" stroke="#4f46e5" strokeWidth="3.5" strokeLinecap="round" />

          {/* Cheerful Eyes & Sparkle */}
          <circle cx="37" cy="56" r="6" className="fill-slate-900" />
          <circle cx="63" cy="56" r="6" className="fill-slate-900" />
          <circle cx="39" cy="54" r="2.2" className="fill-white" />
          <circle cx="65" cy="54" r="2.2" className="fill-white" />

          {/* Cute Orange Beak */}
          <polygon points="50,64 45,72 55,72" className="fill-amber-500" />

          {/* Cheerful Blush Marks */}
          <ellipse cx="23" cy="67" rx="3.5" ry="2" className="fill-rose-300/80" />
          <ellipse cx="77" cy="67" rx="3.5" ry="2" className="fill-rose-300/80" />
        </svg>
      </div>

      {/* Brand Text */}
      {variant === 'full' && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span
              className={`font-heading font-extrabold ${sizeMap.text} text-slate-900 tracking-tight leading-none`}
            >
              Study Buddy
            </span>
            <span
              className={`font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 py-0.5 rounded-full border border-indigo-100/80 ${sizeMap.badge}`}
            >
              Math
            </span>
          </div>
          {showTagline && (
            <p className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5">
              Practice smarter. Learn better.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
