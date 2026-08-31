import React from 'react';

interface MathDisplayProps {
  expression?: string;
  size?: 'normal' | 'large' | 'hero';
}

/**
 * Renders mathematical expressions cleanly with proper typography and formatting
 */
export const MathDisplay: React.FC<MathDisplayProps> = ({ expression, size = 'normal' }) => {
  if (!expression) return null;

  const sizeClasses = {
    normal: 'text-lg sm:text-xl py-1 px-3',
    large: 'text-xl sm:text-2xl py-2 px-4',
    hero: 'text-2xl sm:text-3xl py-3 px-6',
  }[size];

  // Helper to parse simple exponents like x^2, 10^4, (x+1)^2 into <sup>
  const renderFormattedExpression = (expr: string) => {
    // Replace * with ·
    let formatted = expr.replace(/\*/g, ' · ');

    // Split by exponent patterns like a^b
    const parts = formatted.split(/(\b[a-zA-Z0-9_()]+\^[0-9a-zA-Z-()]+)/g);

    return parts.map((part, index) => {
      if (part.includes('^')) {
        const [base, exp] = part.split('^');
        return (
          <span key={index} className="inline-flex items-baseline">
            <span>{base}</span>
            <sup className="text-[0.7em] font-bold text-indigo-700 ml-0.5">{exp.replace(/[()]/g, '')}</sup>
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div
      className={`inline-flex items-center justify-center font-mono-math font-semibold bg-indigo-50/70 border border-indigo-100 text-indigo-950 rounded-xl shadow-2xs select-text ${sizeClasses}`}
    >
      {renderFormattedExpression(expression)}
    </div>
  );
};
